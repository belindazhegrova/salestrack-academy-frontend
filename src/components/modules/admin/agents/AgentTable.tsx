'use client';

import { useRouter } from 'next/navigation';
import React from 'react';

type Agent = {
  id: string;
  email: string;
  createdAt: string;
};

function AgentTable({ agents }: { agents: Agent[] }) {
  const router = useRouter();

  if (!agents.length) return <p>No agents found</p>;

  return (
    <table className="table">
      <thead>
        <tr>
          <th>Email</th>
          <th>Created</th>
          <th>Actions</th>
        </tr>
      </thead>

      <tbody>
        {agents.map((agent) => (
          <tr key={agent.id}>
            <td>{agent.email}</td>

            <td>
              {new Date(agent.createdAt).toLocaleDateString()}
            </td>

            <td>
              <button
                className="btn btn-primary text-sm px-3 py-1"
                onClick={() => router.push(`/admin/agents/${agent.id}`)}
              >
                View Courses
              </button>
            </td>
          </tr>
        ))}
      </tbody>
    </table>
  );
}

export default React.memo(AgentTable);