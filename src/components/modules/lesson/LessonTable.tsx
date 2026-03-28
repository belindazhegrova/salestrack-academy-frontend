'use client';

import type { Lesson } from '@/features/lesson/lesson.service';

type LessonTableProps = {
  lessons: Lesson[];
  onDelete: (id: string) => void | Promise<void>;
};

export function LessonTable({ lessons, onDelete }: LessonTableProps) {
  return (
    <div className="card overflow-hidden">
      <table className="table">
        <thead className="bg-gray-50">
          <tr>
            <th className="p-3 text-left">Order</th>
            <th className="p-3 text-left">Title</th>
            <th className="p-3 text-left">Type</th>
            <th className="p-3 text-right">Actions</th>
          </tr>
        </thead>

        <tbody>
          {lessons.map((lesson) => (
            <tr key={lesson.id} className="border-b">
              <td className="p-3">{lesson.order}</td>
              <td className="p-3">{lesson.title}</td>

              <td className="p-3">
                <span className="badge">{lesson.type}</span>
              </td>

              <td className="p-3 text-right">
                <button
                  onClick={() => onDelete(lesson.id)}
                  className="text-red-500"
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