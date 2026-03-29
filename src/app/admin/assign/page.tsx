'use client';

import { useEffect, useState } from 'react';
import { getAgents, type Agent } from '@/features/user/user.service';
import { getCourses, assignCourse, type Course } from '@/features/course/course.service';

export default function AssignPage() {
  const [agents, setAgents] = useState<Agent[]>([]);
  const [courses, setCourses] = useState<Course[]>([]);
  const [userId, setUserId] = useState('');
  const [courseId, setCourseId] = useState('');

  useEffect(() => {
    loadData();
  }, []);

  const loadData = async () => {
    const agentsData = await getAgents();
    const coursesData = await getCourses();

    setAgents(agentsData);
    setCourses(coursesData);
  };

  const handleAssign = async () => {
    if (!userId || !courseId) {
      alert('Select both');
      return;
    }

    await assignCourse({ userId, courseId });
    alert('Assigned!');
  };

  return (
    <div className="card space-y-3">
      <h2 className="section-title">Assign Course</h2>

      <select
        value={userId}
        onChange={(e) => setUserId(e.target.value)}
        className="w-full rounded border p-2"
      >
        <option value="">Select Agent</option>
        {agents.map((agent) => (
          <option key={agent.id} value={agent.id}>
            {agent.email}
          </option>
        ))}
      </select>

      <select
        value={courseId}
        onChange={(e) => setCourseId(e.target.value)}
        className="w-full rounded border p-2"
      >
        <option value="">Select Course</option>
        {courses.map((course) => (
          <option key={course.id} value={course.id}>
            {course.title}
          </option>
        ))}
      </select>

      <button onClick={handleAssign} className="btn-primary">
        Assign
      </button>
    </div>
  );
}