'use client';

import { useState } from 'react';
import { useAgents } from '@/features/user/user.hooks';
import AgentTable from '@/components/modules/agent/AgentTable';
import CreateAgentModal from '@/components/modules/agent/CreateAgentModal';

export default function AgentsPage() {
  const { agents, loading, create } = useAgents();
  const [open, setOpen] = useState(false);

  if (loading) return <p>Loading...</p>;

  return (
    <div className="card">
      <div className="flex justify-between mb-4">
        <h2 className="section-title">Agents</h2>

        <button className="btn-primary" onClick={() => setOpen(true)}>
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