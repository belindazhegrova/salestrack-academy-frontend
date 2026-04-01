'use client';

import { useEffect ,useState} from 'react';
import { useParams } from 'next/navigation';
import { useLessons } from '@/features/lesson/lesson.hook';
import { LessonForm } from '@/components/forms/LessonForm';
import { LessonTable } from '@/components/modules/admin/lesson/LessonTable';
export default function Page() {
  const params = useParams();
  const courseId = params.id as string;

  const { lessons, fetchLessons, create, remove } = useLessons(courseId);

  const [creating, setCreating] = useState(false);

  useEffect(() => {
    if (courseId) fetchLessons();
  }, [courseId]);

  const handleCreate = async (data: any) => {
    try {
      setCreating(true);

      await create(data);

      await fetchLessons();
    } catch (err) {
      console.error(err);
    } finally {
      setCreating(false);
    }
  };

  return (
    <div className="space-y-6">
      <LessonForm courseId={courseId} onSubmit={handleCreate} />

   {creating && (
  <div className="flex justify-center py-4">
    <div className="w-6 h-6 border-4 border-gray-300 border-t-blue-600 rounded-full animate-spin" />
  </div>
)}

      <LessonTable lessons={lessons} onDelete={remove} />
    </div>
  );
}