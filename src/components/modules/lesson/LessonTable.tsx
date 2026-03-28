'use client';

import {
  DndContext,
  closestCenter,
} from '@dnd-kit/core';

import {
  arrayMove,
  SortableContext,
  useSortable,
  verticalListSortingStrategy,
} from '@dnd-kit/sortable';

import { CSS } from '@dnd-kit/utilities';
import { useEffect, useState } from 'react';

import type { Lesson } from '@/features/lesson/lesson.service';
import { reorderLessons } from '@/features/lesson/lesson.service';

type LessonTableProps = {
  lessons: Lesson[];
  onDelete: (id: string) => void | Promise<void>;
};

export function LessonTable({ lessons, onDelete }: LessonTableProps) {
  const [items, setItems] = useState(lessons);

  useEffect(() => {
    setItems(lessons);
  }, [lessons]);

  const handleDragEnd = async (event: any) => {
    const { active, over } = event;

    if (!over || active.id === over.id) return;

    const oldIndex = items.findIndex((i) => i.id === active.id);
    const newIndex = items.findIndex((i) => i.id === over.id);

    const newItems = arrayMove(items, oldIndex, newIndex);

    setItems(newItems);

    const payload = newItems.map((item, index) => ({
      id: item.id,
      order: index + 1,
    }));

    try {
      await reorderLessons(payload);
    } catch (err) {
      console.error('Reorder failed', err);
    }
  };

  return (
    <div className="card overflow-hidden">
      <DndContext collisionDetection={closestCenter} onDragEnd={handleDragEnd}>
        <SortableContext
          items={items.map((i) => i.id)}
          strategy={verticalListSortingStrategy}
        >
          <table className="table">
            <thead>
              <tr>
                <th>Order</th>
                <th>Title</th>
                <th>Type</th>
                <th className="text-right">Actions</th>
              </tr>
            </thead>

            <tbody>
              {items.map((lesson, index) => (
                <SortableRow
                  key={lesson.id}
                  lesson={lesson}
                  index={index}
                  onDelete={onDelete}
                />
              ))}
            </tbody>
          </table>
        </SortableContext>
      </DndContext>
    </div>
  );
}

function SortableRow({
  lesson,
  index,
  onDelete,
}: {
  lesson: Lesson;
  index: number;
  onDelete: (id: string) => void;
}) {
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
      className="cursor-grab active:cursor-grabbing"
    >

      <td {...listeners}>☰ {index + 1}</td>

      <td>{lesson.title}</td>

      <td>
        <span className="badge">{lesson.type}</span>
      </td>

      <td className="text-right">
        <button
          onClick={() => onDelete(lesson.id)}
          className="text-red-500"
        >
          Delete
        </button>
      </td>
    </tr>
  );
}