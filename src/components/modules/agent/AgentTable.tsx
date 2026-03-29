'use client';

import { useRouter } from 'next/navigation';

type Agent = {
  id: string;
  email: string;
  createdAt: string;
};

export default function AgentTable({ agents }: { agents: Agent[] }) {
  const router = useRouter();

  if (!agents.length) return <p>No agents found</p>;

  return (
    <table className="w-full border">
      <thead>
        <tr className="bg-gray-100 text-left">
          <th className="p-2">Email</th>
          <th className="p-2">Created</th>
          <th className="p-2">Actions</th>
        </tr>
      </thead>

      <tbody>
        {agents.map((agent) => (
          <tr key={agent.id} className="border-t">
            <td className="p-2">{agent.email}</td>

            <td className="p-2">
              {new Date(agent.createdAt).toLocaleDateString()}
            </td>

            <td className="p-2">
              <button
                className="btn-primary"
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