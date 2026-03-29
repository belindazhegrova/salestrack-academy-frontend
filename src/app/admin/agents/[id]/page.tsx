'use client';

import { useEffect, useState } from 'react';
import { getAgentCourses } from '@/features/user/user.service';
import { useParams } from 'next/navigation';

type Enrollment = {
  id: string;
  progress: number;
  quizScore?: number;
  course: {
    title: string;
  };
};

export default function AgentCoursesPage() {
  const { id } = useParams();
  const [courses, setCourses] = useState<Enrollment[]>([]);

  useEffect(() => {
    if (id) fetchCourses();
  }, [id]);

  const fetchCourses = async () => {
    try {
      const data = await getAgentCourses(id as string);
      setCourses(data);
    } catch (e) {
      console.error(e);
    }
  };

  return (
    <div className="card">
      <h2 className="section-title mb-4">Assigned Courses</h2>

      {courses.length === 0 ? (
        <p>No courses assigned</p>
      ) : (
        <table className="w-full border">
          <thead>
            <tr className="bg-gray-100 text-left">
              <th className="p-2">Course</th>
              <th className="p-2">Progress</th>
              <th className="p-2">Quiz Score</th>
            </tr>
          </thead>

          <tbody>
            {courses.map((c) => (
              <tr key={c.id} className="border-t">
                <td className="p-2">{c.course.title}</td>
                <td className="p-2">{c.progress}%</td>
                <td className="p-2">{c.quizScore ?? 0}</td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </div>
  );
}