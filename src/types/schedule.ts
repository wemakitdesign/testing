
export interface ScheduleTask {
  id: string;
  title: string;
  client: string;
  startTime: string;
  endTime: string;
  status: 'upcoming' | 'inProgress' | 'completed';
  priority: 'high' | 'medium' | 'low';
  description?: string;
  hasNotification?: boolean;
}

export interface DaySchedule {
  date: string;
  dayName: string;
  fullDate: string;
  tasks: ScheduleTask[];
  isToday: boolean;
}
