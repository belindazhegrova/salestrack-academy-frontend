'use client';

import { useEffect, useState } from 'react';
import {
  getMyCourses,
  EnrollmentCourse,
} from '@/features/enrollment/enrollment.service';
import StatCard from '@/components/modules/agent/progress/StatCard';
import CourseCard from '@/components/modules/agent/progress/CourseCard';

export default function AgentProgressPage() {
  const [courses, setCourses] = useState<EnrollmentCourse[]>([]);
  const [loading, setLoading] = useState(true);
  const [downloadingId, setDownloadingId] = useState<string | null>(null);

  useEffect(() => {
    getMyCourses()
      .then(setCourses)
      .finally(() => setLoading(false));
  }, []);

  const stats = {
    total: courses.length,
    completed: courses.filter((c) => c.completed).length,
    avg:
      courses.length > 0
        ? Math.round(
            courses.reduce((acc, c) => acc + c.progress, 0) /
              courses.length
          )
        : 0,
  };

  const handleDownload = async (id: string) => {
    try {
      setDownloadingId(id);
      const { downloadCertificate } = await import(
        '@/features/enrollment/enrollment.service'
      );
      await downloadCertificate(id);
    } finally {
      setDownloadingId(null);
    }
  };


  if (loading) {
    return (
      <div className="flex justify-center items-center h-60">
        <div className="w-10 h-10 border-4 border-gray-300 border-t-agent rounded-full animate-spin" />
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <h1 className="text-2xl font-bold">My Progress</h1>
      <div className="grid grid-cols-3 gap-4">
        <StatCard label="Total Courses" value={stats.total} />
        <StatCard
          label="Completed"
          value={stats.completed}
          className="text-green-600"
        />
        <StatCard
          label="Avg Progress"
          value={`${stats.avg}%`}
          className="text-agent"
        />
      </div>

      <div className="space-y-4">
        {courses.map((item) => (
          <CourseCard
            key={item.id}
            item={item}
            downloadingId={downloadingId}
            onDownload={handleDownload}
          />
        ))}
      </div>
    </div>
  );
}