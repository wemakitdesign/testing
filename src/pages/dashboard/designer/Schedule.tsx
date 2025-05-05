
import React, { useState, useEffect } from 'react';
import { Bell, Calendar, Filter, CalendarDays, Search, Plus } from 'lucide-react';
import { useAuth } from '../../../context/AuthContext';
import { Button } from '../../../components/ui/button';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '../../../components/ui/tabs';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '../../../components/ui/card';
import { Input } from '../../../components/ui/input';
import { toast } from '../../../hooks/use-toast';
import { WeekView } from '../../../components/schedule/WeekView';
import { DayView } from '../../../components/schedule/DayView';
import { TaskCard } from '../../../components/schedule/TaskCard';
import { getStartOfWeek, formatTime, formatDate } from '../../../utils/dateUtils';
import { getStatusBadge } from '../../../utils/projectUtils';
import type { ScheduleTask, DaySchedule } from '../../../types/schedule';
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from '../../../components/ui/dropdown-menu';

const Schedule = () => {
  const { user } = useAuth();
  const [currentWeekStart, setCurrentWeekStart] = useState<Date>(() => getStartOfWeek(new Date()));
  const [viewMode, setViewMode] = useState<'week' | 'day'>('week');
  const [selectedDay, setSelectedDay] = useState<Date>(() => new Date());
  const [showNotifications, setShowNotifications] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const [filterPriority, setFilterPriority] = useState<string | null>(null);
  const [filterStatus, setFilterStatus] = useState<string | null>(null);
  
  const scheduledTasks: ScheduleTask[] = [
    {
      id: '1',
      title: 'Website Homepage Redesign',
      client: 'Acme Corp',
      startTime: '2023-04-17T09:00:00',
      endTime: '2023-04-17T12:00:00',
      status: 'completed',
      priority: 'high',
      description: 'Complete the homepage redesign with new branding elements and improved user experience.',
      hasNotification: false
    },
    {
      id: '2',
      title: 'Logo Concept Review',
      client: 'Startup Inc',
      startTime: '2023-04-17T13:00:00',
      endTime: '2023-04-17T14:30:00',
      status: 'completed',
      priority: 'medium',
      description: 'Review the proposed logo concepts with the client and gather feedback.',
      hasNotification: false
    },
    {
      id: '3',
      title: 'Mobile App UI Design',
      client: 'Health App',
      startTime: '2023-04-18T10:00:00',
      endTime: '2023-04-18T15:00:00',
      status: 'inProgress',
      priority: 'high',
      description: 'Design the user interface for the mobile health application following the provided requirements.',
      hasNotification: true
    },
    {
      id: '4',
      title: 'Product Page Layouts',
      client: 'Acme Corp',
      startTime: '2023-04-19T09:30:00',
      endTime: '2023-04-19T12:30:00',
      status: 'upcoming',
      priority: 'medium',
      description: 'Create layout designs for product pages based on the new brand guidelines.',
      hasNotification: true
    },
    {
      id: '5',
      title: 'Brochure Design',
      client: 'Tech Solutions',
      startTime: '2023-04-19T14:00:00',
      endTime: '2023-04-19T17:00:00',
      status: 'upcoming',
      priority: 'low',
      description: 'Design a trifold brochure highlighting company services and benefits.',
      hasNotification: false
    },
    {
      id: '6',
      title: 'Marketing Materials',
      client: 'Tech Solutions',
      startTime: '2023-04-20T11:00:00',
      endTime: '2023-04-20T16:00:00',
      status: 'upcoming',
      priority: 'medium',
      description: 'Create various marketing materials including social media graphics and email templates.',
      hasNotification: true
    },
    {
      id: '7',
      title: 'Client Presentation',
      client: 'Startup Inc',
      startTime: '2023-04-21T15:00:00',
      endTime: '2023-04-21T16:00:00',
      status: 'upcoming',
      priority: 'high',
      description: 'Prepare and present design concepts to client stakeholders.',
      hasNotification: true
    }
  ];
  
  // Filter tasks based on search query and filters
  const filteredTasks = scheduledTasks.filter(task => {
    // Apply search filter
    if (searchQuery && !task.title.toLowerCase().includes(searchQuery.toLowerCase()) && 
        !task.client.toLowerCase().includes(searchQuery.toLowerCase())) {
      return false;
    }
    
    // Apply priority filter
    if (filterPriority && task.priority !== filterPriority) {
      return false;
    }
    
    // Apply status filter
    if (filterStatus && task.status !== filterStatus) {
      return false;
    }
    
    return true;
  });
  
  const daysInWeek: DaySchedule[] = Array.from({ length: 7 }).map((_, index) => {
    const date = new Date(currentWeekStart);
    date.setDate(currentWeekStart.getDate() + index);
    
    const today = new Date();
    const isToday = 
      date.getDate() === today.getDate() && 
      date.getMonth() === today.getMonth() && 
      date.getFullYear() === today.getFullYear();
    
    return {
      date: date.toISOString().split('T')[0],
      dayName: date.toLocaleDateString('en-US', { weekday: 'short' }),
      fullDate: date.toLocaleDateString('en-US', { month: 'short', day: 'numeric' }),
      isToday,
      tasks: filteredTasks.filter(task => {
        const taskDate = new Date(task.startTime).toISOString().split('T')[0];
        return taskDate === date.toISOString().split('T')[0];
      })
    };
  });
  
  const goToPreviousWeek = () => {
    const newWeekStart = new Date(currentWeekStart);
    newWeekStart.setDate(newWeekStart.getDate() - 7);
    setCurrentWeekStart(newWeekStart);
  };
  
  const goToNextWeek = () => {
    const newWeekStart = new Date(currentWeekStart);
    newWeekStart.setDate(newWeekStart.getDate() + 7);
    setCurrentWeekStart(newWeekStart);
  };
  
  const goToToday = () => {
    setCurrentWeekStart(getStartOfWeek(new Date()));
    setSelectedDay(new Date());
  };
  
  const toggleNotification = (taskId: string) => {
    toast({
      title: "Notification settings updated",
      description: "You will receive reminders for this task's deadline.",
    });
  };
  
  const selectedDayTasks = filteredTasks.filter(task => {
    const taskDate = new Date(task.startTime).toISOString().split('T')[0];
    const selectedDateStr = selectedDay.toISOString().split('T')[0];
    return taskDate === selectedDateStr;
  });
  
  const formattedSelectedDate = formatDate(selectedDay);
  
  const today = new Date().toISOString().split('T')[0];
  const todayTasks = filteredTasks.filter(task => {
    const taskDate = new Date(task.startTime).toISOString().split('T')[0];
    return taskDate === today;
  });
  
  const upcomingTasks = filteredTasks.filter(task => {
    const taskDate = new Date(task.startTime);
    const now = new Date();
    const sevenDaysLater = new Date();
    sevenDaysLater.setDate(now.getDate() + 7);
    
    return taskDate > now && taskDate <= sevenDaysLater;
  });
  
  const tasksWithNotifications = filteredTasks.filter(task => task.hasNotification);
  
  const clearFilters = () => {
    setSearchQuery('');
    setFilterPriority(null);
    setFilterStatus(null);
  };
  
  useEffect(() => {
    const now = new Date();
    const tomorrow = new Date(now);
    tomorrow.setHours(now.getHours() + 24);
    
    const urgentTasks = scheduledTasks.filter(task => {
      const taskDate = new Date(task.startTime);
      return taskDate > now && taskDate <= tomorrow && task.status !== 'completed';
    });
    
    urgentTasks.forEach(task => {
      toast({
        title: "Upcoming deadline!",
        description: `"${task.title}" is due ${formatTime(task.startTime)} on ${new Date(task.startTime).toLocaleDateString()}`,
        variant: "default",
      });
    });
  }, []);
  
  return (
    <div className="space-y-8">
      {/* Header Section */}
      <div className="flex flex-col md:flex-row md:justify-between md:items-center gap-4">
        <div>
          <h1 className="text-3xl font-bold tracking-tight flex items-center gap-2">
            <Calendar className="h-8 w-8 text-wemakit-purple" />
            Schedule
          </h1>
          <p className="text-muted-foreground">Manage your design tasks and appointments</p>
        </div>
        <div className="flex items-center gap-3">
          <Button 
            variant="outline" 
            className="relative"
            onClick={() => setShowNotifications(!showNotifications)}
          >
            <Bell className="h-5 w-5" />
            {tasksWithNotifications.length > 0 && (
              <span className="absolute -top-1 -right-1 bg-red-500 text-white text-xs rounded-full h-5 w-5 flex items-center justify-center">
                {tasksWithNotifications.length}
              </span>
            )}
          </Button>
          <Button className="bg-wemakit-purple hover:bg-wemakit-purple/90 gap-1">
            <Plus className="h-4 w-4" /> New Task
          </Button>
        </div>
      </div>
      
      {/* Search and Filter Bar */}
      <div className="bg-white dark:bg-gray-800 p-4 rounded-lg border shadow-sm flex flex-col md:flex-row gap-4 items-center">
        <div className="relative w-full md:w-72">
          <Search className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
          <Input 
            placeholder="Search tasks or clients..." 
            className="pl-10"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />
        </div>
        <div className="flex gap-2 items-center w-full md:w-auto">
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="outline" size="sm" className="h-10 gap-1">
                <Filter className="h-4 w-4" /> Priority
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent>
              <DropdownMenuItem onClick={() => setFilterPriority('high')}>
                High Priority
              </DropdownMenuItem>
              <DropdownMenuItem onClick={() => setFilterPriority('medium')}>
                Medium Priority
              </DropdownMenuItem>
              <DropdownMenuItem onClick={() => setFilterPriority('low')}>
                Low Priority
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
          
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="outline" size="sm" className="h-10 gap-1">
                <Filter className="h-4 w-4" /> Status
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent>
              <DropdownMenuItem onClick={() => setFilterStatus('upcoming')}>
                Upcoming
              </DropdownMenuItem>
              <DropdownMenuItem onClick={() => setFilterStatus('inProgress')}>
                In Progress
              </DropdownMenuItem>
              <DropdownMenuItem onClick={() => setFilterStatus('completed')}>
                Completed
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
          
          {(searchQuery || filterPriority || filterStatus) && (
            <Button variant="ghost" size="sm" onClick={clearFilters} className="h-10">
              Clear Filters
            </Button>
          )}
        </div>
      </div>
      
      {/* Notification Panel */}
      {showNotifications && (
        <Card className="border-wemakit-purple/20 animate-fade-in shadow-md">
          <CardHeader className="pb-3">
            <CardTitle className="text-lg flex items-center gap-2">
              <Bell className="h-5 w-5 text-wemakit-purple" />
              Notifications
            </CardTitle>
            <CardDescription>Task deadlines and reminders</CardDescription>
          </CardHeader>
          <CardContent>
            {tasksWithNotifications.length > 0 ? (
              <div className="space-y-3">
                {tasksWithNotifications.map(task => (
                  <TaskCard key={task.id} task={task} variant="compact" showNotificationToggle={false} />
                ))}
              </div>
            ) : (
              <div className="text-center py-6">
                <p className="text-muted-foreground">No notifications at this time</p>
              </div>
            )}
          </CardContent>
        </Card>
      )}
      
      {/* View Controls and Tabs */}
      <div className="flex flex-col md:flex-row md:justify-between md:items-center gap-4 animate-fade-in">
        <Tabs 
          defaultValue="week" 
          value={viewMode}
          onValueChange={(value) => setViewMode(value as 'week' | 'day')}
          className="w-full"
        >
          <div className="flex flex-col md:flex-row md:justify-between md:items-center gap-4 w-full">
            <TabsList className="grid w-full grid-cols-2 md:w-[200px]">
              <TabsTrigger value="week" className="flex items-center gap-1">
                <CalendarDays className="h-4 w-4" /> Week
              </TabsTrigger>
              <TabsTrigger value="day" className="flex items-center gap-1">
                <Calendar className="h-4 w-4" /> Day
              </TabsTrigger>
            </TabsList>
            
            <div className="flex items-center gap-2">
              <Button 
                variant="outline" 
                size="sm" 
                onClick={viewMode === 'week' ? goToPreviousWeek : () => {
                  const prevDay = new Date(selectedDay);
                  prevDay.setDate(prevDay.getDate() - 1);
                  setSelectedDay(prevDay);
                }}
                className="md:h-9"
              >
                Previous {viewMode === 'week' ? 'Week' : 'Day'}
              </Button>
              
              <Button 
                variant="outline" 
                size="sm" 
                onClick={goToToday}
                className="md:h-9"
              >
                Today
              </Button>
              
              <Button 
                variant="outline" 
                size="sm" 
                onClick={viewMode === 'week' ? goToNextWeek : () => {
                  const nextDay = new Date(selectedDay);
                  nextDay.setDate(nextDay.getDate() + 1);
                  setSelectedDay(nextDay);
                }}
                className="md:h-9"
              >
                Next {viewMode === 'week' ? 'Week' : 'Day'}
              </Button>
            </div>
          </div>
          
          {/* Main View Area */}
          <TabsContent value="week" className="mt-4 animate-fade-in">
            <WeekView
              currentWeekStart={currentWeekStart}
              daysInWeek={daysInWeek}
              onDaySelect={(date) => {
                setSelectedDay(date);
                setViewMode('day');
              }}
              toggleNotification={toggleNotification}
              formatTime={formatTime}
            />
          </TabsContent>
          
          <TabsContent value="day" className="mt-4 animate-fade-in">
            <DayView 
              selectedDate={formattedSelectedDate}
              tasks={selectedDayTasks}
            />
          </TabsContent>
        </Tabs>
      </div>
      
      {/* Task Summary Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 animate-fade-in">
        <Card className="shadow-md border-t-4 border-t-wemakit-purple/60">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Calendar className="h-5 w-5 text-wemakit-purple" />
              Today's Tasks
            </CardTitle>
            <CardDescription>Your schedule for today</CardDescription>
          </CardHeader>
          <CardContent>
            {todayTasks.length > 0 ? (
              <div className="space-y-3">
                {todayTasks.map(task => (
                  <TaskCard key={task.id} task={task} variant="compact" />
                ))}
              </div>
            ) : (
              <div className="text-center py-8 bg-muted/10 rounded-lg border border-dashed">
                <p className="text-muted-foreground">No tasks scheduled for today</p>
              </div>
            )}
          </CardContent>
        </Card>
        
        <Card className="shadow-md border-t-4 border-t-wemakit-purple/60">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Calendar className="h-5 w-5 text-wemakit-purple" />
              Upcoming Tasks
            </CardTitle>
            <CardDescription>Tasks scheduled for the next 7 days</CardDescription>
          </CardHeader>
          <CardContent>
            {upcomingTasks.length > 0 ? (
              <div className="space-y-3">
                {upcomingTasks.map(task => (
                  <TaskCard key={task.id} task={task} variant="compact" />
                ))}
              </div>
            ) : (
              <div className="text-center py-8 bg-muted/10 rounded-lg border border-dashed">
                <p className="text-muted-foreground">No upcoming tasks scheduled</p>
              </div>
            )}
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default Schedule;
