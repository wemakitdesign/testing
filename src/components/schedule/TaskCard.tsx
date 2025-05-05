
import React from 'react';
import { Link } from 'react-router-dom';
import { Button } from '../../components/ui/button';
import { Bell, Clock, User, ChevronRight } from 'lucide-react';
import { StatusBadge } from '../../components/ui/status-badge';
import { toast } from '../../hooks/use-toast';
import { formatTime } from '../../utils/dateUtils';

interface TaskCardProps {
  task: {
    id: string;
    title: string;
    client: string;
    startTime: string;
    endTime: string;
    status: 'upcoming' | 'inProgress' | 'completed';
    priority: 'high' | 'medium' | 'low';
    description?: string;
    hasNotification?: boolean;
  };
  variant?: 'compact' | 'full';
  showNotificationToggle?: boolean;
}

export const TaskCard = ({ task, variant = 'full', showNotificationToggle = true }: TaskCardProps) => {
  const toggleNotification = (taskId: string) => {
    toast({
      title: "Notification settings updated",
      description: "You will receive reminders for this task's deadline.",
    });
  };

  const getStatusBadge = (status: string, priority: string) => {
    if (status === 'completed') {
      return <StatusBadge variant="completed">Completed</StatusBadge>;
    } else if (status === 'inProgress') {
      return <StatusBadge variant="inProgress" pulse>In Progress</StatusBadge>;
    } else {
      if (priority === 'high') {
        return <StatusBadge variant="highPriority">High Priority</StatusBadge>;
      } else if (priority === 'medium') {
        return <StatusBadge variant="mediumPriority">Medium Priority</StatusBadge>;
      } else {
        return <StatusBadge variant="lowPriority">Low Priority</StatusBadge>;
      }
    }
  };

  if (variant === 'compact') {
    return (
      <div className="flex items-center justify-between p-3 border rounded-lg shadow-sm hover:shadow-md transition-all bg-white dark:bg-gray-800">
        <div>
          <Link 
            to={`/dashboard/tasks/${task.id}`}
            className="font-medium hover:text-wemakit-purple transition-colors"
          >
            {task.title}
          </Link>
          <div className="flex items-center text-xs text-muted-foreground mt-1">
            <Clock className="h-3 w-3 mr-1" />
            {formatTime(task.startTime)} - {formatTime(task.endTime)}
          </div>
          <div className="text-xs text-muted-foreground mt-1">
            <User className="h-3 w-3 inline mr-1" />
            {task.client}
          </div>
        </div>
        <div className="flex flex-col items-end gap-2">
          {getStatusBadge(task.status, task.priority)}
          {task.hasNotification && (
            <Bell 
              className="h-3.5 w-3.5 text-wemakit-purple" 
              fill="currentColor"
              aria-label="Reminder set"
            />
          )}
        </div>
      </div>
    );
  }

  return (
    <div className="relative p-4 border rounded-lg shadow-sm hover:shadow-md transition-all bg-white dark:bg-gray-800">
      <div className="absolute top-0 left-0 h-full w-1.5 rounded-l-lg" 
        style={{ 
          backgroundColor: 
            task.priority === 'high' ? '#ea384c' : 
            task.priority === 'medium' ? '#f97316' : 
            '#3b82f6'
        }}
      />
      
      <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-3 pl-2">
        <div>
          <h3 className="font-medium text-lg">
            <Link 
              to={`/dashboard/tasks/${task.id}`}
              className="hover:text-wemakit-purple transition-colors"
            >
              {task.title}
            </Link>
          </h3>
          <p className="text-sm text-muted-foreground flex items-center mt-1">
            <User className="h-3.5 w-3.5 mr-1.5" />
            {task.client}
          </p>
          <div className="flex items-center text-sm text-muted-foreground mt-1">
            <Clock className="h-3.5 w-3.5 mr-1.5" />
            {formatTime(task.startTime)} - {formatTime(task.endTime)}
          </div>
        </div>
        <div className="md:text-right">
          <div className="mt-1">
            {getStatusBadge(task.status, task.priority)}
          </div>
        </div>
      </div>
      
      {task.description && (
        <div className="mt-3 text-sm text-muted-foreground pl-2 border-l-2 border-wemakit-purple/20 ml-2">
          {task.description}
        </div>
      )}
      
      <div className="mt-4 flex justify-between items-center">
        {showNotificationToggle && (
          <Button 
            variant={task.hasNotification ? "secondary" : "outline"}
            size="sm" 
            className={`h-8 flex items-center gap-1.5 ${task.hasNotification ? 'bg-wemakit-purple/10 text-wemakit-purple border-wemakit-purple/30' : ''}`}
            onClick={() => toggleNotification(task.id)}
          >
            <Bell className={`h-3.5 w-3.5 ${task.hasNotification ? 'text-wemakit-purple' : ''}`} />
            {task.hasNotification ? 'Notifications On' : 'Set Reminder'}
          </Button>
        )}
        
        <Button 
          variant="outline" 
          size="sm" 
          className="h-8 flex items-center gap-1.5"
          asChild
        >
          <Link to={`/dashboard/tasks/${task.id}`}>
            View Task <ChevronRight className="h-3.5 w-3.5" />
          </Link>
        </Button>
      </div>
    </div>
  );
};
