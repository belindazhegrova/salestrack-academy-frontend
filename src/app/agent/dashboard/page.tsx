'use client';

import { useEffect, useState } from 'react';
import { getMyCourses } from '@/features/enrollment/enrollment.service';

export default function AgentDashboard() {
  const [courses, setCourses] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchCourses = async () => {
      try {
        const data = await getMyCourses();
        setCourses(data);
      } finally {
        setLoading(false);
      }
    };

    fetchCourses();
  }, []);

  if (loading) return <p>Loading...</p>;

  const total = courses.length;
  const completed = courses.filter((c) => c.completed).length;
  const inProgress = courses.filter(
    (c) => c.progress > 0 && !c.completed
  ).length;

  return (
    <div>
      <h1 className="text-2xl font-bold mb-6">My Dashboard</h1>

      <div className="grid grid-cols-3 gap-4">
        <Card title="Total Courses" value={total} />
        <Card title="In Progress" value={inProgress} />
        <Card title="Completed" value={completed} />
      </div>
    </div>
  );
}

function Card({ title, value }: { title: string; value: number }) {
  return (
    <div className="bg-white p-6 rounded-lg border">
      <p className="text-gray-500">{title}</p>
      <p className="text-2xl font-bold">{value}</p>
    </div>
  );
}