'use client';

import { useEffect, useState } from 'react';
import {
  getAgents,
  type Agent,
} from '@/features/user/user.service';
import {
  getCourses,
  assignCourse,
  type Course,
} from '@/features/course/course.service';

export default function AssignCourse() {
  const [agents, setAgents] = useState<Agent[]>([]);
  const [courses, setCourses] = useState<Course[]>([]);
  const [userId, setUserId] = useState('');
  const [courseId, setCourseId] = useState('');
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    loadData();
  }, []);

  const loadData = async () => {
    try {
      const [agentsData, coursesData] = await Promise.all([
        getAgents(),
        getCourses(),
      ]);

      setAgents(agentsData);
      setCourses(coursesData);
    } catch (e) {
      console.error(e);
    }
  };

  const handleAssign = async () => {
    if (!userId || !courseId) {
      alert('Select both agent and course');
      return;
    }
    try {
      setLoading(true);
      await assignCourse({ userId, courseId });

      setUserId('');
      setCourseId('');

      alert('Assigned successfully!');
    } catch (e) {
      console.error(e);
      alert('Something went wrong');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="card w-full space-y-6">
      <h2 className="section-title">Assign Course</h2>
      <div className="space-y-1">
        <label className="text-sm text-gray-600">Agent</label>
        <select
          value={userId}
          onChange={(e) => setUserId(e.target.value)}
          className="input"
        >
          <option value="">Select Agent</option>
          {agents.map((agent) => (
            <option key={agent.id} value={agent.id}>
              {agent.email}
            </option>
          ))}
        </select>
      </div>

      <div className="space-y-1">
        <label className="text-sm text-gray-600">Course</label>
        <select
          value={courseId}
          onChange={(e) => setCourseId(e.target.value)}
          className="input"
        >
          <option value="">Select Course</option>
          {courses.map((course) => (
            <option key={course.id} value={course.id}>
              {course.title}
            </option>
          ))}
        </select>
      </div>

      <div className="flex justify-end">
        <button
          onClick={handleAssign}
          disabled={loading}
          className="btn btn-primary min-w-[120px]"
        >
          {loading ? 'Assigning...' : 'Assign'}
        </button>
      </div>
    </div>
  );
}