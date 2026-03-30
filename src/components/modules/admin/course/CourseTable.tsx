'use client';

import { useRouter } from 'next/navigation';
import { API_URL } from '@/config';
import type { Course } from '@/features/course/course.service';

type CourseTableProps = {
  courses: Course[];
  onDelete: (id: string) => void | Promise<void>;
};

export function CourseTable({ courses, onDelete }: CourseTableProps) {
  const router = useRouter();

  return (
    <div className="card overflow-hidden">
      <table className="table">
        <thead className="bg-gray-50">
          <tr>
            <th className="p-4 text-left">Thumbnail</th>
            <th className="p-4 text-left">Title</th>
            <th className="p-4 text-left">Description</th>
            <th className="p-4 text-right">Actions</th>
          </tr>
        </thead>

        <tbody>
          {courses.map((course) => (
            <tr key={course.id} className="border-b">
              <td className="p-4">
                {course.thumbnail ? (
                  <img
                    src={`${API_URL}${course.thumbnail}`}
                    alt={course.title}
                    className="h-10 w-16 rounded object-cover"
                  />
                ) : (
                  <span className="text-xs text-gray-400">No image</span>
                )}
              </td>

              <td className="p-4 font-medium">{course.title}</td>
              <td className="p-4 text-gray-500">{course.description}</td>

              <td className="space-x-3 p-4 text-right">
                <button
                  onClick={() => router.push(`/admin/courses/${course.id}/lessons`)}
                  className="text-blue-600 cursor-pointer"
                >
                  Manage Lesson
                </button>
                  <button
                    onClick={() =>
                      router.push(`/admin/courses/${course.id}/quiz`)
                    }
                    className="text-green-600 cursor-pointer"
                  >
                    Quiz
                  </button>

                <button
                  onClick={() => onDelete(course.id)}
                  className="text-red-500 cursor-pointer"
                >
                  Delete
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}