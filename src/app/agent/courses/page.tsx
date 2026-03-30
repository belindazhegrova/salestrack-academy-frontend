'use client';

import { useEffect, useState } from 'react';
import { getMyCourses } from '@/features/enrollment/enrollment.service';
import { useRouter } from 'next/navigation';
import { getFileUrl } from '@/utils/fileUrl';

export default function AgentCourses() {
  const [courses, setCourses] = useState<any[]>([]);
  const router = useRouter();

  useEffect(() => {
    getMyCourses().then(setCourses);
  }, []);

  return (
    <div>
      <h1 className="text-2xl font-bold mb-6">My Courses</h1>
      <div className="grid grid-cols-3 gap-4">
        {courses.map((c) => (
          <div
            key={c.id}
            onClick={() => router.push(`/agent/courses/${c.course.id}`)}
            className="cursor-pointer bg-white p-4 rounded-lg border"
          >
            {c.course.thumbnail ? (
              <img
                src={getFileUrl(c.course.thumbnail)}
                className="w-full h-40 object-cover rounded"
                alt={c.course.title}
              />
            ) : (
              <div className="w-full h-40 rounded bg-gray-200 flex items-center justify-center text-gray-500">
                No image
              </div>
            )}
            <h2 className="mt-3 font-semibold">{c.course.title}</h2>
            <p className="text-sm text-gray-500">
              Progress: {c.progress}%
            </p>
          </div>
        ))}
      </div>
    </div>
  );
}