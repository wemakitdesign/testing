import { useEffect, useState } from 'react';
import { supabase } from '../../../lib/supabaseClient';
import { useAuth } from '../../../contexts/AuthContext';

const AnalyticsDesigner = () => {
  const { user } = useAuth();
  const [analyticsData, setAnalyticsData] = useState<any>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchAnalytics = async () => {
      setLoading(true);
      if (!user?.id) return;
      const { data: tasks } = await supabase.from('tasks').select('*').eq('designer_id', user.id);
      const { data: timeLogs } = await supabase.from('time_logs').select('*').eq('designer_id', user.id);
      setAnalyticsData({
        totalTasks: tasks?.length || 0,
        totalHours: timeLogs?.reduce((sum, log) => sum + (log.hours || 0), 0) || 0,
      });
      setLoading(false);
    };
    fetchAnalytics();
  }, [user]);

  return (
    <div>
      {/* Render your component content here */}
    </div>
  );
};

export default AnalyticsDesigner; 