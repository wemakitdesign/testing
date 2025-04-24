
import React from 'react';
import { Link } from 'react-router-dom';
import { Button } from '../../components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '../../components/ui/card';
import { Bell, Calendar, Clock } from 'lucide-react';
import { DaySchedule } from '../../types/schedule';
import { StatusBadge } from '../../components/ui/status-badge';

interface WeekViewProps {
  currentWeekStart: Date;
  daysInWeek: DaySchedule[];
  onDaySelect: (date: Date) => void;
  toggleNotification: (taskId: string) => void;
  formatTime: (time: string) => string;
}

export const WeekView = ({ 
  currentWeekStart, 
  daysInWeek, 
  onDaySelect,
  toggleNotification,
  formatTime 
}: WeekViewProps) => {
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

  return (
    <Card className="shadow-md">
      <CardHeader className="pb-3">
        <div className="flex justify-between items-center">
          <div>
            <CardTitle className="flex items-center">
              <Calendar className="h-5 w-5 mr-2 text-wemakit-purple" />
              Weekly Schedule
            </CardTitle>
            <CardDescription>
              {currentWeekStart.toLocaleDateString('en-US', { month: 'long', day: 'numeric' })} - 
              {(() => {
                const weekEnd = new Date(currentWeekStart);
                weekEnd.setDate(weekEnd.getDate() + 6);
                return weekEnd.toLocaleDateString('en-US', { month: 'long', day: 'numeric', year: 'numeric' });
              })()}
            </CardDescription>
          </div>
        </div>
      </CardHeader>
      <CardContent>
        <div className="grid grid-cols-1 md:grid-cols-7 gap-4">
          {daysInWeek.map((day) => (
            <div 
              key={day.date}
              className={`border rounded-lg overflow-hidden hover:shadow-md transition-all animate-fade-in ${day.isToday ? 'ring-2 ring-wemakit-purple border-wemakit-purple' : ''}`}
            >
              <div className={`p-2 text-center ${day.isToday ? 'bg-wemakit-purple text-white' : 'bg-muted/30'}`}>
                <div className="font-medium">{day.dayName}</div>
                <div className={`text-sm ${day.isToday ? 'text-white/80' : 'text-muted-foreground'}`}>{day.fullDate}</div>
              </div>
              
              <div className="p-3 min-h-[280px] bg-white dark:bg-gray-800">
                {day.tasks.length > 0 ? (
                  <div className="space-y-3">
                    {day.tasks.map(task => (
                      <div 
                        key={task.id}
                        className="p-3 border rounded-lg bg-muted/5 hover:bg-muted/10 transition-all space-y-1 relative overflow-hidden"
                      >
                        <div className="absolute top-0 left-0 h-full w-1" 
                          style={{ 
                            backgroundColor: 
                              task.priority === 'high' ? '#ea384c' : 
                              task.priority === 'medium' ? '#f97316' : 
                              '#3b82f6'
                          }}
                        />
                        <div className="flex justify-between items-start pl-2">
                          <Link 
                            to={`/dashboard/tasks/${task.id}`}
                            className="font-medium text-sm hover:text-wemakit-purple transition-colors truncate max-w-[120px]"
                          >
                            {task.title}
                          </Link>
                          {getStatusBadge(task.status, task.priority)}
                        </div>
                        <div className="text-xs text-muted-foreground pl-2">{task.client}</div>
                        <div className="flex items-center text-xs text-muted-foreground pl-2">
                          <Clock className="h-3 w-3 mr-1" />
                          {formatTime(task.startTime)} - {formatTime(task.endTime)}
                        </div>
                        <div className="flex items-center gap-1 mt-1 pl-2">
                          <Button 
                            variant="ghost" 
                            size="sm" 
                            className="h-6 w-6 p-0"
                            onClick={() => toggleNotification(task.id)}
                            aria-label={task.hasNotification ? "Notifications enabled" : "Enable notifications"}
                          >
                            <Bell 
                              className={`h-3.5 w-3.5 ${task.hasNotification ? 'text-wemakit-purple' : 'text-muted-foreground'}`} 
                              fill={task.hasNotification ? "currentColor" : "none"}
                            />
                          </Button>
                        </div>
                      </div>
                    ))}
                  </div>
                ) : (
                  <div className="h-full flex items-center justify-center text-sm text-muted-foreground">
                    No tasks scheduled
                  </div>
                )}
              </div>
              
              <div className="p-2 border-t bg-muted/5">
                <Button 
                  variant="ghost" 
                  size="sm" 
                  className="w-full h-7 text-xs hover:bg-wemakit-purple/10 hover:text-wemakit-purple transition-colors"
                  onClick={() => {
                    const date = new Date(day.date);
                    onDaySelect(date);
                  }}
                >
                  View Details
                </Button>
              </div>
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  );
};
