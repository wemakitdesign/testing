
import React from 'react';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '../../../components/ui/card';
import { Button } from '../../../components/ui/button';
import { StatusBadge } from '../../../components/ui/status-badge';
import { Clock, Calendar, FileText, CheckCircle2, AlertTriangle, User } from 'lucide-react';
import { motion } from 'framer-motion';

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
  const tasks: Task[] = [
    {
      id: '1',
      title: 'Website Redesign for Acme Corp',
      description: 'Complete homepage and about page redesign',
      deadline: '2024-04-30',
      status: 'inProgress',
      priority: 'high',
      client: 'Acme Corporation'
    },
    // Add more mock tasks as needed
  ];

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

  return (
    <div className="space-y-6">
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
      >
        <h1 className="text-3xl font-bold tracking-tight">My Tasks</h1>
        <p className="text-muted-foreground">Manage and track your design tasks</p>
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
                    Due: {new Date(task.deadline).toLocaleDateString()}
                  </div>
                  <Button className="w-full mt-4 group">
                    View Details
                    <FileText className="ml-2 h-4 w-4 transition-transform group-hover:translate-x-1" />
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
