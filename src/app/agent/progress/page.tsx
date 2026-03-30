'use client';

import { useEffect, useState } from 'react';
import { getMyCourses, EnrollmentCourse } from '@/features/enrollment/enrollment.service';

export default function AgentProgressPage() {
  const [courses, setCourses] = useState<EnrollmentCourse[]>([]);

  useEffect(() => {
    getMyCourses().then(setCourses);
  }, []);

  return (
    <div>
      <h1 className="text-2xl font-bold mb-6">My Progress</h1>

      <div className="space-y-4">
        {courses.map((item) => {
          const totalLessons = item.course.lessons.length;

          const completedLessons = Math.round(
            (item.progress / 100) * totalLessons
          );

          const status = item.completed
            ? 'Completed'
            : item.progress > 0
            ? 'In Progress'
            : 'Not Started';

          const passed = (item.quizScore ?? 0) >= 80;

          return (
       <div
            key={item.id}
            className="border rounded-lg p-4 bg-white shadow"
            >
            <h2 className="text-lg font-semibold">{item.course.title}</h2>

            <div className="w-full bg-gray-200 rounded h-2 mt-3 mb-2">
                <div
                className="bg-blue-600 h-2 rounded"
                style={{ width: `${item.progress}%` }}
                />
            </div>

            <p>Progress: {item.progress}%</p>
            <p>Status: {status}</p>
            <p>
                Lessons: {completedLessons} / {totalLessons}
            </p>

            {item.quizScore !== null && item.quizScore !== undefined && (
                <>
                <p>Quiz Score: {item.quizScore}%</p>
                <p className={passed ? 'text-green-600' : 'text-red-600'}>
                    {passed ? 'Passed ✅' : 'Failed ❌'}
                </p>
                </>
            )}
            </div>
          );
        })}
      </div>
    </div>
  );
}