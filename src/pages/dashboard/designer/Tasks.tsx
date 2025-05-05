import React, { useEffect, useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '../../../components/ui/card';
import { Button } from '../../../components/ui/button';
import { StatusBadge } from '../../../components/ui/status-badge';
import { Clock, Calendar, FileText, CheckCircle2, AlertTriangle, User } from 'lucide-react';
import { motion } from 'framer-motion';
import { useAuth } from '../../../context/AuthContext';
import { supabase } from '../../../lib/supabaseClient';
import { Link } from 'react-router-dom';

interface Task {
  id: string;
  title: string;
  description: string;
  deadline: string;
  status: 'inProgress' | 'pending' | 'completed';
  priority: 'high' | 'medium' | 'low';
  client: string;
}

const Tasks = () => {
  const { user } = useAuth();
  const [tasks, setTasks] = useState<Task[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchTasks = async () => {
      setLoading(true);
      setError(null);
      try {
        if (!user?.id) {
          setError('User belum login');
          setLoading(false);
          return;
        }
        const { data, error } = await supabase
          .from('tasks')
          .select(`id, title, description, deadline, status, priority, client:client_id`)
          .eq('designer_id', user.id)
          .in('status', ['pending', 'inProgress'])
          .order('created_at', { ascending: false });
        if (error) throw error;
        // Map client name jika perlu
        const mapped = (data || []).map((t: any) => ({
          ...t,
          client: typeof t.client === 'object' && t.client?.name ? t.client.name : t.client || '-',
        }));
        setTasks(mapped);
      } catch (err: any) {
        setError(err.message || 'Gagal mengambil data task');
      } finally {
        setLoading(false);
      }
    };
    fetchTasks();
  }, [user?.id]);

  const container = {
    hidden: { opacity: 0 },
    show: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1
      }
    }
  };

  const item = {
    hidden: { opacity: 0, y: 20 },
    show: { opacity: 1, y: 0 }
  };

  if (loading) {
    return <div className="flex justify-center items-center min-h-[40vh] text-muted-foreground">Memuat data tugas...</div>;
  }
  if (error) {
    return <div className="flex justify-center items-center min-h-[40vh] text-destructive">{error}</div>;
  }
  if (tasks.length === 0) {
    return <div className="flex justify-center items-center min-h-[40vh] text-muted-foreground">Belum ada tugas yang di-assign ke Anda.</div>;
  }

  return (
    <div className="space-y-6">
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
      >
        <h1 className="text-3xl font-bold tracking-tight">Tugas Saya</h1>
        <p className="text-muted-foreground">Kelola dan pantau tugas desain Anda</p>
      </motion.div>

      <motion.div
        variants={container}
        initial="hidden"
        animate="show"
        className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"
      >
        {tasks.map((task) => (
          <motion.div key={task.id} variants={item} whileHover={{ scale: 1.02 }}>
            <Card className="h-full transition-shadow hover:shadow-lg">
              <CardHeader>
                <CardTitle className="line-clamp-2">{task.title}</CardTitle>
                <CardDescription>{task.client}</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <p className="text-sm text-muted-foreground line-clamp-2">
                    {task.description}
                  </p>
                  <div className="flex flex-wrap gap-2">
                    <StatusBadge variant={task.status === 'inProgress' ? 'inProgress' : task.status === 'completed' ? 'completed' : 'pending'}>
                      {task.status}
                    </StatusBadge>
                    <StatusBadge 
                      variant={
                        task.priority === 'high' 
                          ? 'highPriority' 
                          : task.priority === 'medium' 
                            ? 'mediumPriority' 
                            : 'lowPriority'
                      }
                    >
                      {task.priority}
                    </StatusBadge>
                  </div>
                  <div className="flex items-center text-sm text-muted-foreground">
                    <Calendar className="h-4 w-4 mr-1" />
                    Due: {task.deadline ? new Date(task.deadline).toLocaleDateString() : '-'}
                  </div>
                  <Button asChild className="w-full mt-4 group">
                    <Link to={`/dashboard/tasks/${task.id}`}>
                      Lihat Detail
                      <FileText className="ml-2 h-4 w-4 transition-transform group-hover:translate-x-1" />
                    </Link>
                  </Button>
                </div>
              </CardContent>
            </Card>
          </motion.div>
        ))}
      </motion.div>
    </div>
  );
};

export default Tasks;
