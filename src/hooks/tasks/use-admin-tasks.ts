// src/hooks/tasks/use-admin-tasks.ts
import { useState, useEffect } from 'react';
import { supabase } from '@/lib/supabaseClient';

export interface AdminTask {
  id: string;
  title: string;
  status: string;
  deadline?: string;
  created_at: string;
  progress: number;
  assigned_to?: string;
  files?: string[];
  priority?: string;
  client_id?: string;
}

export const useAdminTasks = () => {
  const [tasks, setTasks] = useState<AdminTask[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchTasks = async () => {
      setIsLoading(true);
      const { data, error } = await supabase
        .from('tasks')
        .select('id, title, status, deadline, created_at, progress, assigned_to, files, priority, client_id')
        .in('status', ['unassigned', 'pending', 'inProgress']);

      if (error) {
        console.error('Error fetching tasks:', error.message);
      } else {
        setTasks(data || []);
      }
      setIsLoading(false);
    };

    fetchTasks();
  }, []);

  return { tasks, isLoading };
};
