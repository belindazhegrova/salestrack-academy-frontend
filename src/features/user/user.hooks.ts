'use client';

import { useEffect, useState, useCallback } from 'react';
import { getAgents, createAgent } from './user.service';

type Agent = {
  id: string;
  email: string;
  createdAt: string;
};

export function useAgents() {
  const [agents, setAgents] = useState<Agent[]>([]);
  const [loading, setLoading] = useState(true);

  const fetchAgents = useCallback(async () => {
    try {
      setLoading(true);
      const data = await getAgents();
      setAgents(data);
    } catch (e) {
      console.error('Failed to fetch agents', e);
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchAgents();
  }, [fetchAgents]);

  const create = async (email: string, password: string) => {
    try {
      await createAgent({ email, password });
      await fetchAgents();
    } catch (e) {
      console.error('Create agent failed', e);
      throw e;
    }
  };

  return { agents, loading, create, refetch: fetchAgents };
}