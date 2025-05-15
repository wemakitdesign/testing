import { useEffect, useState } from 'react';
import { useAuth } from '../../../contexts/AuthContext';
import { supabase } from '../../../lib/supabaseClient';

const AssignedProjects = () => {
  const { user } = useAuth();
  const [assignedProjects, setAssignedProjects] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchAssignedProjects = async () => {
      setLoading(true);
      if (!user?.id) return;
      const { data: projs } = await supabase.from('projects').select('*').eq('designer_id', user.id);
      setAssignedProjects(projs || []);
      setLoading(false);
    };
    fetchAssignedProjects();
  }, [user]);

  return (
    <div>
      {/* Render your component content here */}
    </div>
  );
};

export default AssignedProjects; 