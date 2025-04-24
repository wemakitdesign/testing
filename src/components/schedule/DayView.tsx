
import React from 'react';
import { FileText, ArrowRight, Clock } from 'lucide-react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '../../components/ui/card';
import { Button } from '../../components/ui/button';
import { TaskCard } from './TaskCard';
import { ScheduleTask } from '../../types/schedule';
import { formatTime } from '../../utils/dateUtils';

interface DayViewProps {
  selectedDate: string;
  tasks: ScheduleTask[];
}

export const DayView = ({ selectedDate, tasks }: DayViewProps) => {
  // Group tasks by time period (morning, afternoon, evening)
  const morningTasks = tasks.filter(task => {
    const hour = new Date(task.startTime).getHours();
    return hour >= 0 && hour < 12;
  });
  
  const afternoonTasks = tasks.filter(task => {
    const hour = new Date(task.startTime).getHours();
    return hour >= 0 && hour < 17;
  });
  
  const eveningTasks = tasks.filter(task => {
    const hour = new Date(task.startTime).getHours();
    return hour >= 17 && hour < 24;
  });
  
  // Render time block with tasks
  const renderTimeBlock = (title: string, periodTasks: ScheduleTask[], icon: JSX.Element) => {
    if (periodTasks.length === 0) return null;
    
    return (
      <div className="mb-6 animate-fade-in">
        <div className="flex items-center mb-3">
          <div className="bg-wemakit-purple/10 p-2 rounded-full mr-3">
            {icon}
          </div>
          <h3 className="text-lg font-medium">{title}</h3>
        </div>
        <div className="border-l-2 border-wemakit-purple/30 pl-4 space-y-4 ml-5">
          {periodTasks.map((task) => (
            <div key={task.id} className="relative animate-fade-in">
              <div className="absolute -left-6 top-1.5 w-3 h-3 rounded-full bg-wemakit-purple"></div>
              <div className="text-sm text-muted-foreground mb-1 flex items-center">
                <Clock className="h-3.5 w-3.5 mr-1" />
                {formatTime(task.startTime)} - {formatTime(task.endTime)}
              </div>
              <TaskCard task={task} />
            </div>
          ))}
        </div>
      </div>
    );
  };

  return (
    <Card className="shadow-md border-t-4 border-t-wemakit-purple">
      <CardHeader className="pb-3">
        <CardTitle className="flex items-center">
          <span className="text-2xl font-bold">{selectedDate}</span>
        </CardTitle>
        <CardDescription>Daily schedule and tasks</CardDescription>
      </CardHeader>
      <CardContent>
        {tasks.length > 0 ? (
          <div className="space-y-6">
            {renderTimeBlock("Morning", morningTasks, <Clock className="h-5 w-5 text-wemakit-purple" />)}
            {renderTimeBlock("Afternoon", afternoonTasks, <Clock className="h-5 w-5 text-wemakit-purple" />)}
            {renderTimeBlock("Evening", eveningTasks, <Clock className="h-5 w-5 text-wemakit-purple" />)}
          </div>
        ) : (
          <div className="text-center py-16 bg-muted/10 rounded-lg border-2 border-dashed animate-fade-in">
            <FileText className="h-12 w-12 text-muted-foreground mx-auto mb-3" />
            <h3 className="text-xl font-medium">No tasks scheduled</h3>
            <p className="text-muted-foreground mb-6 max-w-md mx-auto">
              There are no tasks scheduled for this day. You can create a new task or check another date.
            </p>
            <Button className="bg-wemakit-purple hover:bg-wemakit-purple/90">Schedule a Task</Button>
          </div>
        )}
      </CardContent>
    </Card>
  );
};
