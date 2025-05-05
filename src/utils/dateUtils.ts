
export const formatTime = (timeString: string) => {
  return new Date(timeString).toLocaleTimeString('en-US', { 
    hour: 'numeric', 
    minute: '2-digit',
    hour12: true
  });
};

export const getStartOfWeek = (date: Date): Date => {
  const now = new Date(date);
  const dayOfWeek = now.getDay();
  const diff = now.getDate() - dayOfWeek;
  return new Date(now.setDate(diff));
};

export const formatDate = (date: Date): string => {
  return date.toLocaleDateString('en-US', {
    weekday: 'long',
    month: 'long',
    day: 'numeric',
    year: 'numeric'
  });
};

export const getRelativeTimeDescription = (dateString: string): string => {
  const today = new Date();
  const date = new Date(dateString);
  
  // Reset time parts for accurate date comparison
  today.setHours(0, 0, 0, 0);
  date.setHours(0, 0, 0, 0);
  
  const diffTime = date.getTime() - today.getTime();
  const diffDays = Math.round(diffTime / (1000 * 60 * 60 * 24));
  
  if (diffDays === 0) return "Today";
  if (diffDays === 1) return "Tomorrow";
  if (diffDays === -1) return "Yesterday";
  if (diffDays > 1 && diffDays < 7) return `In ${diffDays} days`;
  if (diffDays < 0 && diffDays > -7) return `${Math.abs(diffDays)} days ago`;
  
  // For dates further in the past or future, return formatted date
  return date.toLocaleDateString('en-US', { month: 'short', day: 'numeric' });
};

export const groupTasksByDate = (tasks: any[]) => {
  const grouped = tasks.reduce((acc, task) => {
    const date = new Date(task.startTime).toISOString().split('T')[0];
    if (!acc[date]) {
      acc[date] = [];
    }
    acc[date].push(task);
    return acc;
  }, {});
  
  return Object.entries(grouped).map(([date, dateTasks]) => ({
    date,
    tasks: dateTasks
  }));
};
