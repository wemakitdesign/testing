import { useEffect, useState } from 'react';
import { supabase } from '../../../lib/supabaseClient';
import { useAuth } from '../../../contexts/AuthContext';

const ProjectList = () => {
  const { user } = useAuth();
  const [projects, setProjects] = useState<any[]>([]);
  const [tasks, setTasks] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchProjectsAndTasks = async () => {
      setLoading(true);
      if (!user?.id) return;
      const { data: projs } = await supabase.from('projects').select('*').eq('designer_id', user.id);
      setProjects(projs || []);
      const { data: tks } = await supabase.from('tasks').select('*').eq('designer_id', user.id);
      setTasks(tks || []);
      setLoading(false);
    };
    fetchProjectsAndTasks();
  }, [user]);

  return (
    <div>
      {/* Render your project list components here */}
    </div>
  );
};

export default ProjectList; 