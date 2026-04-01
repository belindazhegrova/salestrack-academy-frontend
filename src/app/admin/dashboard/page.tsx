'use client';

import { useEffect, useState } from 'react';
import { getStats } from '@/features/enrollment/enrollment.service';

export default function DashboardPage() {
  const [stats, setStats] = useState<any>(null);

  useEffect(() => {
    load();
  }, []);

  const load = async () => {
    const data = await getStats();
    setStats(data);
  };

 if (!stats) {
   return (
      <div className="w-full">
        <div className="h-1.5 w-full overflow-hidden rounded-full bg-gray-200">
          <div className="h-full w-1/3 rounded-full bg-[var(--primary)] animate-progress" />
        </div>
      </div>
    );
}

  return (
    <div className="grid grid-cols-4 gap-4">
      <Card title="Agents" value={stats.totalAgents} />
      <Card title="Courses" value={stats.totalCourses} />
      <Card title="Assignments" value={stats.totalAssignments} />
      <Card title="Completed" value={stats.completedCourses} />
    </div>
  );
}

function Card({ title, value }: any) {
  return (
    <div className="card text-center">
      <p className="text-gray-500">{title}</p>
      <h2 className="text-2xl font-bold">{value}</h2>
    </div>
  );
}