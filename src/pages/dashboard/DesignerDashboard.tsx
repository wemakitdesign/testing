import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '../../components/ui/card';
import { StatusBadge } from '../../components/ui/status-badge';
import { ActionCard } from '../../components/ui/action-card';
import { Clock, CheckCircle2, AlertTriangle, FileText, Calendar, Timer, AlertCircle, Flag } from 'lucide-react';
import { supabase } from '../../lib/supabaseClient';

const DesignerDashboard = () => {
  const { user } = useAuth();
  const [assignedTasks, setAssignedTasks] = useState<any[]>([]);
  const [completedTasks, setCompletedTasks] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchTasks = async () => {
      setLoading(true);
      if (!user?.id) return;
      const { data, error } = await supabase
        .from('tasks')
        .select('*')
        .eq('designer_id', user.id)
        .in('status', ['pending', 'inProgress']);
      if (!error) setAssignedTasks(data || []);
      // Fetch completed tasks
      const { data: completed, error: completedError } = await supabase
        .from('tasks')
        .select('*')
        .eq('designer_id', user.id)
        .eq('status', 'completed');
      if (!completedError) setCompletedTasks(completed || []);
      setLoading(false);
    };
    fetchTasks();
  }, [user?.id]);

  // Ambil hanya nama depan tanpa embel-embel
  const firstName = user?.name?.split(" ")[0] || "";

  // Today's schedule
  const todayTasks = assignedTasks.filter(task => {
    if (!task.deadline) return false;
    const dueDate = new Date(task.deadline);
    const today = new Date();
    return dueDate.toDateString() === today.toDateString();
  });

  return (
    <div className="space-y-8">
      <div>
        <h1 className="text-3xl font-bold tracking-tight">
          Welcome back, {user?.name}
        </h1>
        <p className="text-muted-foreground">
          Here&apos;s your design workload and schedule for today.
        </p>
      </div>
      
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-base">Assigned Tasks</CardTitle>
            <CardDescription>Active design projects</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{assignedTasks.length}</div>
          </CardContent>
        </Card>
        
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-base">Completed Projects</CardTitle>
            <CardDescription>Successfully delivered designs</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{completedTasks.length}</div>
          </CardContent>
        </Card>
        
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-base">Tasks Due Today</CardTitle>
            <CardDescription>Urgent attention needed</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{todayTasks.length}</div>
          </CardContent>
        </Card>
      </div>
      
      <div>
        <h2 className="text-xl font-semibold mb-4">Quick Actions</h2>
        <div className="grid gap-4 md:grid-cols-3">
          <ActionCard
            as={Link}
            to="/dashboard/tasks"
            icon={<FileText className="h-6 w-6 text-wemakit-purple" />}
            title="View All Tasks"
            description="See all your assigned work"
            variant="purple"
          />
          
          <ActionCard
            as={Link}
            to="/dashboard/schedule"
            icon={<Calendar className="h-6 w-6 text-blue-500" />}
            title="Schedule"
            description="Check your upcoming deadlines"
            variant="blue"
          />
          
          <ActionCard
            as={Link}
            to="/dashboard/time-tracking"
            icon={<Timer className="h-6 w-6 text-green-500" />}
            title="Time Tracking"
            description="Log and view your working hours"
            variant="green"
          />
        </div>
      </div>
      
      <div>
        <h2 className="text-xl font-semibold mb-4">Assigned Tasks</h2>
        {assignedTasks.length > 0 ? (
          <div className="space-y-4">
            {assignedTasks.map(task => (
              <Card key={task.id}>
                <CardContent className="p-4">
                  <div className="flex justify-between items-start mb-2">
                    <div>
                      <h3 className="font-medium">{task.title}</h3>
                      <p className="text-sm text-muted-foreground">Client: {task.client}</p>
                    </div>
                    <div className="flex gap-2">
                      <StatusBadge 
                        variant={task.status === 'inProgress' ? 'inProgress' : 'pending'}
                        pulse={task.status === 'inProgress'}
                      >
                        {task.status === 'inProgress' ? 'In Progress' : 'Pending'}
                      </StatusBadge>
                      
                      <StatusBadge 
                        variant={
                          task.priority === 'high' 
                            ? 'highPriority' 
                            : task.priority === 'medium' 
                              ? 'mediumPriority' 
                              : 'lowPriority'
                        }
                        icon={<Flag className="h-3 w-3" />}
                      >
                        {task.priority.charAt(0).toUpperCase() + task.priority.slice(1)}
                      </StatusBadge>
                    </div>
                  </div>
                  
                  <div className="flex justify-between items-center">
                    <div className="flex items-center">
                      <Clock className="h-3 w-3 mr-1 text-muted-foreground" />
                      <span className="text-xs text-muted-foreground">
                        Due: {new Date(task.deadline).toLocaleDateString()}
                      </span>
                    </div>
                    <Link 
                      to={`/dashboard/tasks/${task.id}`}
                      className="text-xs text-wemakit-purple hover:underline"
                    >
                      View details
                    </Link>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        ) : (
          <Card>
            <CardContent className="p-6 text-center">
              <div className="flex justify-center mb-2">
                <CheckCircle2 className="h-8 w-8 text-success" />
              </div>
              <h3 className="font-medium mb-1">All caught up!</h3>
              <p className="text-sm text-muted-foreground">
                You don't have any assigned tasks right now.
              </p>
            </CardContent>
          </Card>
        )}
      </div>
      
      <div>
        <h2 className="text-xl font-semibold mb-4">Today's Schedule</h2>
        {todayTasks.length > 0 ? (
          <Card>
            <CardContent className="p-4">
              <div className="divide-y">
                {todayTasks.map((task, index) => (
                  <div key={task.id} className={`py-3 ${index === 0 ? 'pt-0' : ''} ${index === todayTasks.length - 1 ? 'pb-0' : ''}`}>
                    <div className="flex items-center justify-between">
                      <div className="flex items-center">
                        <div className="mr-3 p-1.5 rounded-full bg-wemakit-purple/10">
                          <FileText className="h-4 w-4 text-wemakit-purple" />
                        </div>
                        <div>
                          <p className="font-medium text-sm">{task.title}</p>
                          <p className="text-xs text-muted-foreground">Client: {task.client}</p>
                        </div>
                      </div>
                      <StatusBadge 
                        variant={
                          task.priority === 'high' 
                            ? 'highPriority' 
                            : task.priority === 'medium' 
                              ? 'mediumPriority' 
                              : 'lowPriority'
                        }
                      >
                        {task.priority.charAt(0).toUpperCase() + task.priority.slice(1)}
                      </StatusBadge>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        ) : (
          <Card>
            <CardContent className="p-6 text-center">
              <div className="flex justify-center mb-2">
                <CheckCircle2 className="h-8 w-8 text-success" />
              </div>
              <h3 className="font-medium mb-1">No tasks due today</h3>
              <p className="text-sm text-muted-foreground">
                You don't have any deadlines scheduled for today.
              </p>
            </CardContent>
          </Card>
        )}
      </div>
    </div>
  );
};

export default DesignerDashboard;
