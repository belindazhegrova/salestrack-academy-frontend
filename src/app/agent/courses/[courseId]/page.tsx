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

  if (!courseData) return <p>Loading...</p>;

  const completedLessons = lessonProgress.filter((l) => l.completed).length;
  const totalLessons = courseData.course.lessons.length;

  const calculatedProgress = totalLessons
    ? Math.round((completedLessons / totalLessons) * 100)
    : 0;


    const handleCompleteLesson = async (lessonId: string) => {
  if (!user) return;

  await completeLesson(lessonId);

  const updated = await getCourseLessonProgress(courseId as string);
  setLessonProgress(updated);

  const completed = updated.filter((x) => x.completed).length;
  const total = courseData.course.lessons.length;
  const progress = Math.round((completed / total) * 100);

  await updateProgress(user.id, courseId as string, progress);
};


  return (
    <div className="flex gap-6">
      <div className="w-1/4">
        {courseData.course.lessons.map((l: any) => {
          const done = lessonProgress.find((x) => x.lessonId === l.id)?.completed;

          return (
            <div
              key={l.id}
              onClick={() => setSelectedLesson(l)}
              className="cursor-pointer p-3 border mb-2"
            >
              {l.title} {done && '✅'}
            </div>
          );
        })}
      </div>

      <div className="flex-1">
        <p className="mb-2 text-sm text-gray-500">
          Progress: {calculatedProgress}%
        </p>

        {selectedLesson && (
          <>
            <LessonViewerAgent lesson={selectedLesson} />

            <button
              onClick={() => handleCompleteLesson(selectedLesson.id)}
              className="mt-4 px-4 py-2 bg-green-600 text-white rounded"
            >
              Mark as Completed
            </button>
          </>
        )}

        {calculatedProgress === 100 && questions.length > 0 && user && (
          <QuizAgentSection
            questions={questions}
            courseId={courseId as string}
            onCompleted={async (score) => {
              await updateQuizScore(user.id, courseId as string, score);
            }}
          />
        )}
      </div>
    </div>
  );
}