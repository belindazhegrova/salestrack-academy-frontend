'use client';

import { useEffect, useState } from 'react';
import { useParams } from 'next/navigation';

import {
  getMyCourseDetails,
  updateProgress,
  updateQuizScore,
} from '@/features/enrollment/enrollment.service';

import {
  getCourseLessonProgress,
  completeLesson,
} from '@/features/lesson-progress/lessonProgress.service';

import { getQuestions } from '@/features/quiz/quiz.service';
import LessonViewerAgent from '@/components/modules/agent/lesson/LessonViewer';
import { useAuth } from '@/features/auth/useAuth.hook';
import QuizAgentSection from '@/components/modules/agent/quiz/QuizSection';

export default function CoursePage() {
  const { courseId } = useParams();
  const { user } = useAuth();

  const [courseData, setCourseData] = useState<any>(null);
  const [selectedLesson, setSelectedLesson] = useState<any>(null);
  const [lessonProgress, setLessonProgress] = useState<any[]>([]);
  const [questions, setQuestions] = useState<any[]>([]);

 
  useEffect(() => {
    const load = async () => {
      const course = await getMyCourseDetails(courseId as string);
      setCourseData(course);
      setSelectedLesson(course.course.lessons?.[0] || null);

      const progress = await getCourseLessonProgress(courseId as string);
      setLessonProgress(progress);

      const q = await getQuestions(courseId as string);
      setQuestions(q);
    };

    load();
  }, [courseId]);

  if (!courseData)   
    return (
      <div className="w-full">
        <div className="h-1.5 w-full overflow-hidden rounded-full bg-gray-200">
          <div className="h-full w-1/3 rounded-full bg-[var(--agent)] animate-progress" />
        </div>
      </div>
    );


  const completedLessons = lessonProgress.filter((l) => l.completed).length;
  const totalLessons = courseData.course.lessons.length;

  const calculatedProgress = totalLessons
    ? Math.round((completedLessons / totalLessons) * 100)
    : 0;


  const handleCompleteLesson = async (lessonId: string) => {
    if (!user?.userId) return;


    setLessonProgress((prev) => {
      const exists = prev.find((x) => x.lessonId === lessonId);

      if (exists) {
        return prev.map((x) =>
          x.lessonId === lessonId ? { ...x, completed: true } : x
        );
      }

      return [...prev, { lessonId, completed: true }];
    });

  
    await completeLesson(lessonId);

  
    const updated = await getCourseLessonProgress(courseId as string);
    setLessonProgress(updated);

   
    const completed = updated.filter((x) => x.completed).length;
    const total = courseData.course.lessons.length;
    const progress = Math.round((completed / total) * 100);

    await updateProgress(user.userId, courseId as string, progress);

  
    const currentIndex = courseData.course.lessons.findIndex(
      (l: any) => l.id === lessonId
    );

    const nextLesson = courseData.course.lessons[currentIndex + 1];
    if (nextLesson) setSelectedLesson(nextLesson);
  };

  return (
    <div className="flex gap-6">
      <div className="w-1/4">
        {courseData.course.lessons.map((l: any) => {
          const done = lessonProgress.find(
            (x) => x.id === l.id
          )?.completed;
          
          const isActive = selectedLesson?.id === l.id;

          return (
            <div
              key={l.id}
              onClick={() => setSelectedLesson(l)}
              className={`cursor-pointer p-3 border mb-2 rounded flex justify-between items-center transition

                ${isActive ? 'bg-blue-100 border-blue-500' : ''}
                ${done ? 'bg-green-100 border-green-500' : 'bg-white'}
              `}
            >
              <div className="flex flex-col">
                <span className="font-medium">{l.title}</span>

                <span
                  className={`text-xs ${
                    done ? 'text-green-600' : 'text-gray-500'
                  }`}
                >
                  {done ? 'Completed' : 'Not completed'}
                </span>
              </div>

              {done && (
                <span className="text-green-600 font-bold text-lg">✓</span>
              )}
            </div>
          );
        })}
      </div>

  
      <div className="flex-1">
        <p className="mb-4 text-sm text-gray-600 font-medium">
          Progress: {calculatedProgress}%
        </p>

        {selectedLesson && (
          <>
            <LessonViewerAgent lesson={selectedLesson} />
            {(() => {
              const isCompleted = lessonProgress.find(
                (x) => x.lessonId === selectedLesson.id
              )?.completed;

              return (
                <button
                  disabled={isCompleted}
                  onClick={() =>
                    handleCompleteLesson(selectedLesson.id)
                  }
                  className={`mt-4 px-4 py-2 rounded transition
                    ${
                      isCompleted
                        ? 'bg-gray-400 cursor-not-allowed'
                        : 'bg-green-600 text-white hover:bg-green-700'
                    }
                  `}
                >
                  {isCompleted ? 'Completed' : 'Mark as Completed'}
                </button>
              );
            })()}
          </>
        )}

        {calculatedProgress === 100 && questions.length > 0 && user && (
          <div className="mt-8">
            <QuizAgentSection
              questions={questions}
              courseId={courseId as string}
              onCompleted={async (score) => {
                await updateQuizScore(
                  user.userId,
                  courseId as string,
                  score
                );
              }}
            />
          </div>
        )}
      </div>
    </div>
  );
}