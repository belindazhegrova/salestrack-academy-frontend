'use client';

import { useEffect } from 'react';
import { useParams } from 'next/navigation';
import { useLessons } from '@/features/lesson/lesson.hook';
import { LessonForm } from '@/components/forms/LessonForm';
import { LessonTable } from '@/components/modules/lesson/LessonTable';

export default function Page() {
  const params = useParams();
  const courseId = params.id as string;

  const { lessons, fetchLessons, create, remove } = useLessons(courseId);

  useEffect(() => {
    if (courseId) fetchLessons();
  }, [courseId]);

  return (
    <div className="space-y-6">
      <LessonForm courseId={courseId} onSubmit={create} />
      <LessonTable lessons={lessons} onDelete={remove} />
    </div>
  );
}