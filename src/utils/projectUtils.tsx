import { Project } from '../types/project';
import { StatusBadge } from '../components/ui/status-badge';
import React from 'react';
import { Flag } from 'lucide-react';

export const getStatusColor = (status: string) => {
  switch (status) {
    case 'pending': return 'bg-yellow-100 text-yellow-800';
    case 'inProgress': return 'bg-blue-100 text-blue-800';
    case 'review': return 'bg-purple-100 text-purple-800';
    case 'revisions': return 'bg-orange-100 text-orange-800';
    case 'completed': return 'bg-green-100 text-green-800';
    case 'onHold': return 'bg-gray-100 text-gray-800';
    default: return 'bg-gray-100 text-gray-800';
  }
};

export const formatDate = (dateString: string) => {
  const date = new Date(dateString);
  return date.toLocaleDateString('en-US', {
    year: 'numeric',
    month: 'short',
    day: 'numeric'
  });
};

export const getStatusBadgeVariant = (status: string) => {
  switch (status) {
    case 'pending': return 'pending';
    case 'inProgress': return 'inProgress';
    case 'review': return 'info';
    case 'revisions': return 'warning';
    case 'completed': return 'completed';
    case 'onHold': return 'cancelled';
    default: return 'default';
  }
};

export const getPriorityBadge = (priority: string) => {
  switch (priority) {
    case 'high':
      return <StatusBadge variant="highPriority" icon={<Flag className="h-3 w-3" />}>High</StatusBadge>;
    case 'medium':
      return <StatusBadge variant="mediumPriority" icon={<Flag className="h-3 w-3" />}>Medium</StatusBadge>;
    case 'low':
      return <StatusBadge variant="lowPriority" icon={<Flag className="h-3 w-3" />}>Low</StatusBadge>;
    default:
      return null;
  }
};

export const calculateTaskCompletion = (tasks: any[]) => {
  if (!tasks || tasks.length === 0) return 0;
  const completedTasks = tasks.filter(task => task.status === 'completed').length;
  return Math.round((completedTasks / tasks.length) * 100);
};

export const formatCurrency = (amount: number) => {
  return new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency: 'USD',
    minimumFractionDigits: 2
  }).format(amount);
};

export const getDueDateStatus = (dueDate: string) => {
  const today = new Date();
  const due = new Date(dueDate);
  
  // Clear time component for accurate date comparison
  today.setHours(0, 0, 0, 0);
  due.setHours(0, 0, 0, 0);
  
  if (due < today) {
    return 'overdue';
  } else if (due.getTime() === today.getTime()) {
    return 'dueToday';
  } else {
    const diffTime = Math.abs(due.getTime() - today.getTime());
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
    
    if (diffDays <= 3) {
      return 'dueSoon';
    } else {
      return 'upcoming';
    }
  }
};

export const getTaskPriorityLevel = (priority: string) => {
  switch (priority) {
    case 'high': return 3;
    case 'medium': return 2;
    case 'low': return 1;
    default: return 0;
  }
};

export const sortTasksByPriority = (tasks: any[]) => {
  return [...tasks].sort((a, b) => {
    const priorityA = getTaskPriorityLevel(a.priority);
    const priorityB = getTaskPriorityLevel(b.priority);
    
    // Sort by priority descending
    if (priorityA !== priorityB) {
      return priorityB - priorityA;
    }
    
    // If priority is the same, sort by due date
    const dateA = new Date(a.dueDate || a.startTime);
    const dateB = new Date(b.dueDate || b.startTime);
    return dateA.getTime() - dateB.getTime();
  });
};

export const getStatusBadge = (status: string, priority: string) => {
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
