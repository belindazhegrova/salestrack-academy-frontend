'use client';

import { useSortable } from '@dnd-kit/sortable';
import { CSS } from '@dnd-kit/utilities';
import Link from 'next/link';

import type { Lesson } from '@/features/lesson/lesson.service';

type Props = {
  lesson: Lesson;
  index: number;
  onDelete: (id: string) => void;
};

export default function SortableRow({ lesson, index, onDelete }: Props) {
  const {
    attributes,
    listeners,
    setNodeRef,
    transform,
    transition,
  } = useSortable({ id: lesson.id });

  const style = {
    transform: CSS.Transform.toString(transform),
    transition,
  };

  return (
    <tr
      ref={setNodeRef}
      style={style}
      {...attributes}
      className="cursor-grab active:cursor-grabbing hover:bg-gray-50"
    >
      <td {...listeners} className="w-16">
        ☰ {index + 1}
      </td>

      <td>{lesson.title}</td>

      <td>
        <span className="badge">{lesson.type}</span>
      </td>

      <td className="text-right space-x-3">
  

        <button
          onClick={() => onDelete(lesson.id)}
          className="text-red-500 hover:underline cursor-pointer"
        >
          Delete
        </button>
      </td>
    </tr>
  );
}