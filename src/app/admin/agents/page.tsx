'use client';

import { useState } from 'react';
import { useAgents } from '@/features/user/user.hooks';
import AgentTable from '@/components/modules/admin/agents/AgentTable';
import CreateAgentModal from '@/components/modules/admin/agents/CreateAgentModal';

export default function AgentsPage() {
  const { agents, loading, create } = useAgents();
  const [open, setOpen] = useState(false);

  if (loading)   return (
      <div className="w-full">
        <div className="h-1.5 w-full overflow-hidden rounded-full bg-gray-200">
          <div className="h-full w-1/3 rounded-full bg-[var(--primary)] animate-progress" />
        </div>
      </div>
    );

  return (
    <div className="card">
      <div className="flex items-center justify-between mb-6">
        <h2 className="section-title">Agents</h2>

        <button
          className="btn btn-primary"
          onClick={() => setOpen(true)}
        >
          + Create Agent
        </button>
      </div>

      <AgentTable agents={agents} />

      {open && (
        <CreateAgentModal
          onClose={() => setOpen(false)}
          onCreate={create}
        />
      )}
    </div>
  );
}