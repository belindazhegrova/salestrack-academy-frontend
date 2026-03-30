'use client';

import { useEffect, useState } from 'react';
import {
  getMyCourses,
  EnrollmentCourse,
} from '@/features/enrollment/enrollment.service';
import { downloadCertificate } from '@/features/enrollment/enrollment.service';

export default function AgentProgressPage() {
  const [courses, setCourses] = useState<EnrollmentCourse[]>([]);

  useEffect(() => {
    getMyCourses().then(setCourses);
  }, []);

  const totalCourses = courses.length;
  const completedCourses = courses.filter((c) => c.completed).length;
  const avgProgress =
    courses.length > 0
      ? Math.round(
          courses.reduce((acc, c) => acc + c.progress, 0) / courses.length
        )
      : 0;

  return (
    <div className="space-y-6">
      <h1 className="text-2xl font-bold">My Progress</h1>
      <div className="grid grid-cols-3 gap-4">
        <div className="card">
          <p className="text-sm text-gray-500">Total Courses</p>
          <p className="text-2xl font-bold">{totalCourses}</p>
        </div>

        <div className="card">
          <p className="text-sm text-gray-500">Completed</p>
          <p className="text-2xl font-bold text-green-600">
            {completedCourses}
          </p>
        </div>

        <div className="card">
          <p className="text-sm text-gray-500">Avg Progress</p>
          <p className="text-2xl font-bold text-agent">
            {avgProgress}%
          </p>
        </div>
      </div>

  
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

          const canDownload =
           item.completed && (item.quizScore ?? 0) >= 80;

          return (
            <div key={item.id} className="card">
              <div className="flex justify-between items-center">
                <h2 className="text-lg font-semibold">
                  {item.course.title}
                </h2>

                <span
                  className={`text-sm font-medium ${
                    item.completed
                      ? 'text-green-600'
                      : 'text-gray-500'
                  }`}
                >
                  {status}
                </span>
              </div>

              <div className="w-full bg-gray-200 rounded h-2 mt-3 mb-3">
                <div
                  className="h-2 rounded"
                  style={{
                    width: `${item.progress}%`,
                    backgroundColor: 'var(--agent)',
                  }}
                />
              </div>

              <div className="grid grid-cols-3 gap-4 text-sm">
                <p>
                  <span className="text-gray-500">Progress:</span>{' '}
                  <span className="font-medium text-agent">
                    {item.progress}%
                  </span>
                </p>

                <p>
                  <span className="text-gray-500">Lessons:</span>{' '}
                  {completedLessons} / {totalLessons}
                </p>

                {item.quizScore !== null &&
                  item.quizScore !== undefined && (
                    <p>
                      <span className="text-gray-500">
                        Quiz:
                      </span>{' '}
                      <span
                        className={
                          passed
                            ? 'text-green-600 font-medium'
                            : 'text-red-600 font-medium'
                        }
                      >
                        {item.quizScore}% ({passed ? 'Passed' : 'Failed'})
                      </span>
                    </p>
                  )}
              </div>
                  {canDownload && (
                    <div className="mt-3 flex justify-end">
                      <button
                        onClick={() => downloadCertificate(item.id)}
                        className="px-3 py-1 text-sm bg-green-600 text-white rounded hover:bg-green-700 cursor-pointer"
                      >
                        Download Certificate
                      </button>
                    </div>
                  )}
            </div>
          );
        })}
      </div>
    </div>
  );
}