
import { createClient } from '@supabase/supabase-js';
import type { Project, Designer } from '../types/project';
import type { ScheduleTask } from '../types/schedule';

// Initialize Supabase client
const supabase = createClient(
  import.meta.env.VITE_SUPABASE_URL,
  import.meta.env.VITE_SUPABASE_ANON_KEY
);

// Projects
export const getProjects = async () => {
  const { data, error } = await supabase
    .from('projects')
    .select(`
      *,
      clients (name),
      designers (name, avatar, capacity, active_projects)
    `);

  if (error) {
    console.error("🔥 Supabase error getProjects:", error);
    throw error;
  }

  return data;
};

export const getProjectById = async (id: string) => {
  const { data, error } = await supabase
    .from('projects')
    .select(`
      *,
      clients (name),
      designers (name, avatar, capacity, active_projects)
    `)
    .eq('id', id)
    .single();
  
  if (error) throw error;
  return data;
};

// Tasks
export const getTasks = async () => {
  const { data, error } = await supabase
    .from('tasks')
    .select(`
      *,
      projects (name),
      designers (name)
    `);
  
  if (error) throw error;
  return data;
};

export const getTaskById = async (id: string) => {
  const { data, error } = await supabase
    .from('tasks')
    .select(`
      *,
      projects (name),
      designers (name)
    `)
    .eq('id', id)
    .single();
  
  if (error) throw error;
  return data;
};

// Designers
export const getDesigners = async () => {
  const { data, error } = await supabase
    .from('designers')
    .select('*');
  
  if (error) throw error;
  return data;
};

