'use client';

import { useEffect, useState, useCallback } from 'react';
import {
  DndContext,
  closestCenter,
  type DragEndEvent,
} from '@dnd-kit/core';

import {
  arrayMove,
  SortableContext,
  verticalListSortingStrategy,
} from '@dnd-kit/sortable';

import type { Lesson } from '@/features/lesson/lesson.service';
import { reorderLessons } from '@/features/lesson/lesson.service';
import SortableRow from './SortableRow';

type LessonTableProps = {
  lessons: Lesson[];
  onDelete: (id: string) => void | Promise<void>;
};

export function LessonTable({ lessons, onDelete }: LessonTableProps) {
  const [items, setItems] = useState<Lesson[]>(lessons);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    setItems(lessons);
  }, [lessons]);

  const handleDragEnd = useCallback(async (event: DragEndEvent) => {
    const { active, over } = event;

    if (!over || active.id === over.id) return;

    const oldIndex = items.findIndex((i) => i.id === active.id);
    const newIndex = items.findIndex((i) => i.id === over.id);

    const updated = arrayMove(items, oldIndex, newIndex);
    setItems(updated);

    const payload = updated.map((item, index) => ({
      id: item.id,
      order: index + 1,
    }));

    try {
      setLoading(true);
      await reorderLessons(payload);
    } catch (err) {
      console.error('Reorder failed', err);
    } finally {
      setLoading(false);
    }
  }, [items]);

  return (
    <div className="card overflow-hidden">
      {loading && (
        <div className="p-2 text-sm text-gray-500">
          Saving order...
        </div>
      )}

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