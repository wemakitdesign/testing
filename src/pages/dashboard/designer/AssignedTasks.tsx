import { useEffect, useState } from 'react';
import { useAuth } from '../../../contexts/AuthContext';
import { supabase } from '../../../lib/supabaseClient';

const AssignedTasks = () => {
  const { user } = useAuth();
  const [assignedTasks, setAssignedTasks] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchAssignedTasks = async () => {
      setLoading(true);
      if (!user?.id) return;
      const { data: tks } = await supabase.from('tasks').select('*').eq('designer_id', user.id);
      setAssignedTasks(tks || []);
      setLoading(false);
    };
    fetchAssignedTasks();
  }, [user]);

  return (
    <div>
      {/* Render your component content here */}
    </div>
  );
};

export default AssignedTasks; 