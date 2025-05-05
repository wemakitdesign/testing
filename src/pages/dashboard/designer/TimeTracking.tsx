
import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { useAuth } from '../../../context/AuthContext';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '../../../components/ui/card';
import { Button } from '../../../components/ui/button';
import { Input } from '../../../components/ui/input';
import { Label } from '../../../components/ui/label';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '../../../components/ui/tabs';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '../../../components/ui/select';
import { StatusBadge } from '../../../components/ui/status-badge';
import { toast } from '../../../hooks/use-toast';
import { 
  Clock, 
  Calendar, 
  Search, 
  Plus, 
  ChevronDown, 
  Play, 
  Pause, 
  ArrowUpDown, 
  BarChart3, 
  Download
} from 'lucide-react';

interface TimeEntry {
  id: string;
  date: string;
  project: {
    id: string;
    name: string;
    client: string;
  };
  task: string;
  hours: number;
  description: string;
}

interface Project {
  id: string;
  name: string;
  client: string;
}

interface WeeklySummary {
  weekStart: string;
  weekEnd: string;
  totalHours: number;
  byProject: {
    id: string;
    name: string;
    hours: number;
    percentage: number;
  }[];
  byDay: {
    date: string;
    dayName: string;
    hours: number;
  }[];
}

const TimeTracking = () => {
  const { user } = useAuth();
  const [timer, setTimer] = useState({ 
    isRunning: false, 
    projectId: '',
    description: '',
    startTime: null as Date | null,
    elapsedTime: 0 // in seconds
  });
  const [newEntry, setNewEntry] = useState({
    date: new Date().toISOString().split('T')[0],
    projectId: '',
    description: '',
    hours: ''
  });
  const [searchQuery, setSearchQuery] = useState('');
  const [projectFilter, setProjectFilter] = useState('all');
  const [dateRangeFilter, setDateRangeFilter] = useState('this-week');
  
  // Mock projects
  const projects: Project[] = [
    { id: 'p1', name: 'Website Redesign', client: 'Acme Corp' },
    { id: 'p2', name: 'Logo Design', client: 'Startup Inc' },
    { id: 'p3', name: 'Marketing Materials', client: 'Tech Solutions' },
    { id: 'p4', name: 'Mobile App UI', client: 'Health App' },
  ];
  
  // Mock time entries
  const timeEntries: TimeEntry[] = [
    { 
      id: 'e1', 
      date: '2023-04-17', 
      project: { id: 'p1', name: 'Website Redesign', client: 'Acme Corp' },
      task: 'Homepage design',
      hours: 3.5,
      description: 'Created high-fidelity mockups for the homepage'
    },
    { 
      id: 'e2', 
      date: '2023-04-17', 
      project: { id: 'p2', name: 'Logo Design', client: 'Startup Inc' },
      task: 'Initial concepts',
      hours: 2,
      description: 'Developed initial logo concepts and color schemes'
    },
    { 
      id: 'e3', 
      date: '2023-04-16', 
      project: { id: 'p1', name: 'Website Redesign', client: 'Acme Corp' },
      task: 'User research',
      hours: 4,
      description: 'Analyzed user feedback and created user personas'
    },
    { 
      id: 'e4', 
      date: '2023-04-15', 
      project: { id: 'p3', name: 'Marketing Materials', client: 'Tech Solutions' },
      task: 'Brochure design',
      hours: 2.5,
      description: 'Designed product brochure layout and graphics'
    },
    { 
      id: 'e5', 
      date: '2023-04-14', 
      project: { id: 'p4', name: 'Mobile App UI', client: 'Health App' },
      task: 'UI components',
      hours: 5,
      description: 'Created reusable UI component library for the app'
    },
    { 
      id: 'e6', 
      date: '2023-04-13', 
      project: { id: 'p1', name: 'Website Redesign', client: 'Acme Corp' },
      task: 'Responsive layouts',
      hours: 3,
      description: 'Adapted designs for mobile and tablet viewports'
    },
    { 
      id: 'e7', 
      date: '2023-04-12', 
      project: { id: 'p2', name: 'Logo Design', client: 'Startup Inc' },
      task: 'Revisions',
      hours: 1.5,
      description: 'Implemented client feedback on logo designs'
    },
  ];
  
  // Mock weekly summary
  const weeklySummary: WeeklySummary = {
    weekStart: '2023-04-16',
    weekEnd: '2023-04-22',
    totalHours: 21.5,
    byProject: [
      { id: 'p1', name: 'Website Redesign', hours: 10.5, percentage: 49 },
      { id: 'p2', name: 'Logo Design', hours: 3.5, percentage: 16 },
      { id: 'p3', name: 'Marketing Materials', hours: 2.5, percentage: 12 },
      { id: 'p4', name: 'Mobile App UI', hours: 5, percentage: 23 },
    ],
    byDay: [
      { date: '2023-04-16', dayName: 'Sun', hours: 4 },
      { date: '2023-04-17', dayName: 'Mon', hours: 5.5 },
      { date: '2023-04-18', dayName: 'Tue', hours: 6 },
      { date: '2023-04-19', dayName: 'Wed', hours: 3 },
      { date: '2023-04-20', dayName: 'Thu', hours: 1 },
      { date: '2023-04-21', dayName: 'Fri', hours: 2 },
      { date: '2023-04-22', dayName: 'Sat', hours: 0 },
    ]
  };
  
  // Filter time entries
  const filteredEntries = timeEntries
    .filter(entry => {
      // Search filter
      const searchMatch = 
        entry.project.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        entry.task.toLowerCase().includes(searchQuery.toLowerCase()) ||
        entry.description.toLowerCase().includes(searchQuery.toLowerCase());
      
      // Project filter
      const projectMatch = projectFilter === 'all' || entry.project.id === projectFilter;
      
      // Date range filter
      let dateMatch = true;
      const entryDate = new Date(entry.date);
      const today = new Date();
      
      if (dateRangeFilter === 'today') {
        dateMatch = entryDate.toDateString() === today.toDateString();
      } else if (dateRangeFilter === 'this-week') {
        const weekStart = new Date(today);
        weekStart.setDate(today.getDate() - today.getDay());
        const weekEnd = new Date(weekStart);
        weekEnd.setDate(weekStart.getDate() + 6);
        dateMatch = entryDate >= weekStart && entryDate <= weekEnd;
      } else if (dateRangeFilter === 'this-month') {
        dateMatch = 
          entryDate.getMonth() === today.getMonth() && 
          entryDate.getFullYear() === today.getFullYear();
      }
      
      return searchMatch && projectMatch && dateMatch;
    })
    .sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime());
  
  // Total hours for filtered entries
  const totalFilteredHours = filteredEntries.reduce((sum, entry) => sum + entry.hours, 0);
  
  // Handle timer start/stop
  const toggleTimer = () => {
    if (timer.isRunning) {
      // Stop timer
      const elapsedSeconds = Math.floor((new Date().getTime() - (timer.startTime?.getTime() || 0)) / 1000);
      const totalElapsedSeconds = timer.elapsedTime + elapsedSeconds;
      const hours = (totalElapsedSeconds / 3600).toFixed(2);
      
      // In a real app, you would save this time entry
      toast({
        title: "Time tracked",
        description: `${hours} hours logged to ${projects.find(p => p.id === timer.projectId)?.name}`,
      });
      
      setTimer({
        isRunning: false,
        projectId: '',
        description: '',
        startTime: null,
        elapsedTime: 0
      });
    } else {
      // Start timer
      if (!timer.projectId) {
        toast({
          title: "Project required",
          description: "Please select a project before starting the timer",
          variant: "destructive",
        });
        return;
      }
      
      setTimer({
        ...timer,
        isRunning: true,
        startTime: new Date(),
        elapsedTime: 0
      });
      
      toast({
        title: "Timer started",
        description: `Tracking time for ${projects.find(p => p.id === timer.projectId)?.name}`,
      });
    }
  };
  
  // Format elapsed time
  const formatElapsedTime = () => {
    if (!timer.isRunning || !timer.startTime) return "00:00:00";
    
    const elapsedSeconds = Math.floor((new Date().getTime() - timer.startTime.getTime()) / 1000) + timer.elapsedTime;
    const hours = Math.floor(elapsedSeconds / 3600).toString().padStart(2, '0');
    const minutes = Math.floor((elapsedSeconds % 3600) / 60).toString().padStart(2, '0');
    const seconds = (elapsedSeconds % 60).toString().padStart(2, '0');
    
    return `${hours}:${minutes}:${seconds}`;
  };
  
  // Add manual time entry
  const handleAddTimeEntry = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!newEntry.projectId || !newEntry.hours || !newEntry.date) {
      toast({
        title: "Missing information",
        description: "Please fill in all required fields",
        variant: "destructive",
      });
      return;
    }
    
    // In a real app, you would save this to your API
    console.log('Adding time entry:', newEntry);
    
    toast({
      title: "Time entry added",
      description: `${newEntry.hours} hours logged to ${projects.find(p => p.id === newEntry.projectId)?.name}`,
    });
    
    setNewEntry({
      date: new Date().toISOString().split('T')[0],
      projectId: '',
      description: '',
      hours: ''
    });
  };
  
  // Generate percentage bar styles
  const getPercentageBarStyles = (percentage: number) => {
    return {
      width: `${percentage}%`,
      height: '8px',
      backgroundColor: '#9b87f5',
      borderRadius: '4px',
    };
  };
  
  return (
    <div className="space-y-8">
      <div>
        <h1 className="text-3xl font-bold tracking-tight">Time Tracking</h1>
        <p className="text-muted-foreground">Log and manage your time on projects</p>
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {/* Timer Card */}
        <Card className="md:col-span-1">
          <CardHeader className="pb-3">
            <CardTitle>Time Tracker</CardTitle>
            <CardDescription>Track time as you work</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="timerProject">Project</Label>
              <Select
                value={timer.projectId}
                onValueChange={(value) => setTimer({ ...timer, projectId: value })}
                disabled={timer.isRunning}
              >
                <SelectTrigger id="timerProject">
                  <SelectValue placeholder="Select a project" />
                </SelectTrigger>
                <SelectContent>
                  {projects.map(project => (
                    <SelectItem key={project.id} value={project.id}>
                      {project.name} ({project.client})
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
            
            <div className="space-y-2">
              <Label htmlFor="timerDescription">Description (optional)</Label>
              <Input
                id="timerDescription"
                placeholder="What are you working on?"
                value={timer.description}
                onChange={(e) => setTimer({ ...timer, description: e.target.value })}
                disabled={timer.isRunning}
              />
            </div>
            
            <div className="border rounded-md p-6 text-center">
              <div className="text-4xl font-mono font-bold mb-4">
                {formatElapsedTime()}
              </div>
              <Button
                onClick={toggleTimer}
                className={`w-full ${timer.isRunning ? 'bg-orange-500 hover:bg-orange-600' : 'bg-green-500 hover:bg-green-600'}`}
                variant="default"
              >
                {timer.isRunning ? (
                  <>
                    <Pause className="mr-2 h-4 w-4" /> Pause Timer
                  </>
                ) : (
                  <>
                    <Play className="mr-2 h-4 w-4" /> Start Timer
                  </>
                )}
              </Button>
            </div>
          </CardContent>
        </Card>
        
        {/* Manual Entry Card */}
        <Card className="md:col-span-2">
          <CardHeader className="pb-3">
            <CardTitle>Manual Time Entry</CardTitle>
            <CardDescription>Add time for completed work</CardDescription>
          </CardHeader>
          <CardContent>
            <form onSubmit={handleAddTimeEntry} className="space-y-4">
              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="entryDate">Date</Label>
                  <Input
                    id="entryDate"
                    type="date"
                    value={newEntry.date}
                    onChange={(e) => setNewEntry({ ...newEntry, date: e.target.value })}
                    required
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="entryHours">Hours</Label>
                  <Input
                    id="entryHours"
                    type="number"
                    step="0.25"
                    min="0.25"
                    placeholder="0.00"
                    value={newEntry.hours}
                    onChange={(e) => setNewEntry({ ...newEntry, hours: e.target.value })}
                    required
                  />
                </div>
              </div>
              
              <div className="space-y-2">
                <Label htmlFor="entryProject">Project</Label>
                <Select
                  value={newEntry.projectId}
                  onValueChange={(value) => setNewEntry({ ...newEntry, projectId: value })}
                  required
                >
                  <SelectTrigger id="entryProject">
                    <SelectValue placeholder="Select a project" />
                  </SelectTrigger>
                  <SelectContent>
                    {projects.map(project => (
                      <SelectItem key={project.id} value={project.id}>
                        {project.name} ({project.client})
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
              
              <div className="space-y-2">
                <Label htmlFor="entryDescription">Description (optional)</Label>
                <Input
                  id="entryDescription"
                  placeholder="Describe what you worked on"
                  value={newEntry.description}
                  onChange={(e) => setNewEntry({ ...newEntry, description: e.target.value })}
                />
              </div>
              
              <Button type="submit" className="w-full">
                <Plus className="mr-2 h-4 w-4" /> Add Time Entry
              </Button>
            </form>
          </CardContent>
        </Card>
      </div>
      
      <Tabs defaultValue="entries" className="space-y-6">
        <TabsList>
          <TabsTrigger value="entries">Time Entries</TabsTrigger>
          <TabsTrigger value="summary">Weekly Summary</TabsTrigger>
        </TabsList>
        
        <TabsContent value="entries" className="space-y-6">
          <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
            <div className="relative w-full md:w-64">
              <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
              <Input
                type="search"
                placeholder="Search time entries..."
                className="w-full pl-8"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
              />
            </div>
            
            <div className="flex items-center gap-2">
              <Select value={projectFilter} onValueChange={setProjectFilter}>
                <SelectTrigger className="w-[180px]">
                  <SelectValue placeholder="All Projects" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All Projects</SelectItem>
                  {projects.map(project => (
                    <SelectItem key={project.id} value={project.id}>
                      {project.name}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
              
              <Select value={dateRangeFilter} onValueChange={setDateRangeFilter}>
                <SelectTrigger className="w-[150px]">
                  <SelectValue placeholder="This Week" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="today">Today</SelectItem>
                  <SelectItem value="this-week">This Week</SelectItem>
                  <SelectItem value="this-month">This Month</SelectItem>
                  <SelectItem value="all">All Time</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>
          
          <Card>
            <CardContent className="p-0">
              <div className="rounded-md border">
                <div className="grid grid-cols-10 bg-muted/50 p-4 text-sm font-medium">
                  <div className="col-span-2">Date</div>
                  <div className="col-span-2">Project</div>
                  <div className="col-span-3">Task</div>
                  <div className="col-span-1 text-right">Hours</div>
                  <div className="col-span-2 text-right">Actions</div>
                </div>
                <div className="divide-y">
                  {filteredEntries.length > 0 ? (
                    filteredEntries.map(entry => (
                      <div key={entry.id} className="grid grid-cols-10 p-4 text-sm items-center">
                        <div className="col-span-2 flex items-center">
                          <Calendar className="h-4 w-4 mr-2 text-muted-foreground" />
                          {new Date(entry.date).toLocaleDateString()}
                        </div>
                        <div className="col-span-2">
                          <div className="font-medium">{entry.project.name}</div>
                          <div className="text-xs text-muted-foreground">{entry.project.client}</div>
                        </div>
                        <div className="col-span-3">
                          <div className="font-medium">{entry.task}</div>
                          <div className="text-xs text-muted-foreground truncate max-w-xs">
                            {entry.description}
                          </div>
                        </div>
                        <div className="col-span-1 text-right font-medium">
                          {entry.hours.toFixed(2)}
                        </div>
                        <div className="col-span-2 flex justify-end gap-2">
                          <Button variant="ghost" size="sm" className="h-8 w-8 p-0">
                            <span className="sr-only">Edit</span>
                            <Clock className="h-4 w-4" />
                          </Button>
                          <Button variant="ghost" size="sm" className="h-8 w-8 p-0">
                            <span className="sr-only">Delete</span>
                            <Clock className="h-4 w-4" />
                          </Button>
                        </div>
                      </div>
                    ))
                  ) : (
                    <div className="p-8 text-center">
                      <p className="text-muted-foreground">No time entries found</p>
                      <p className="text-sm text-muted-foreground mt-1">
                        Try adjusting your filters or add a new time entry
                      </p>
                    </div>
                  )}
                </div>
                
                {filteredEntries.length > 0 && (
                  <div className="bg-muted/30 p-4 flex justify-between items-center">
                    <div className="text-sm font-medium">
                      {filteredEntries.length} entries
                    </div>
                    <div className="text-sm font-medium">
                      Total: {totalFilteredHours.toFixed(2)} hours
                    </div>
                  </div>
                )}
              </div>
            </CardContent>
          </Card>
        </TabsContent>
        
        <TabsContent value="summary" className="space-y-6">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            <Card>
              <CardHeader>
                <CardTitle>Weekly Summary</CardTitle>
                <CardDescription>
                  {new Date(weeklySummary.weekStart).toLocaleDateString()} - {new Date(weeklySummary.weekEnd).toLocaleDateString()}
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="flex justify-between items-center">
                  <h3 className="text-lg font-medium">Total Hours</h3>
                  <span className="text-2xl font-bold">{weeklySummary.totalHours.toFixed(1)}</span>
                </div>
                
                <div className="space-y-4">
                  <h4 className="text-sm font-medium flex items-center">
                    <BarChart3 className="h-4 w-4 mr-2" />
                    Hours by Day
                  </h4>
                  <div className="grid grid-cols-7 gap-2">
                    {weeklySummary.byDay.map(day => (
                      <div key={day.date} className="text-center">
                        <div className="text-xs font-medium mb-1">{day.dayName}</div>
                        <div className="h-24 bg-muted rounded-md relative flex flex-col justify-end mx-auto w-full">
                          <div 
                            className="bg-wemakit-purple w-full rounded-md transition-all duration-500"
                            style={{ height: `${(day.hours / 8) * 100}%` }}
                          ></div>
                        </div>
                        <div className="text-xs mt-1">{day.hours.toFixed(1)}h</div>
                      </div>
                    ))}
                  </div>
                </div>
                
                <div className="pt-4 flex justify-end">
                  <Button variant="outline" size="sm">
                    <Download className="h-4 w-4 mr-2" /> Export Report
                  </Button>
                </div>
              </CardContent>
            </Card>
            
            <Card>
              <CardHeader>
                <CardTitle>Project Breakdown</CardTitle>
                <CardDescription>Hours by project this week</CardDescription>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="space-y-4">
                  {weeklySummary.byProject.map(project => (
                    <div key={project.id} className="space-y-2">
                      <div className="flex justify-between items-center">
                        <span className="font-medium">{project.name}</span>
                        <div className="flex items-center gap-2">
                          <span className="text-sm">{project.hours.toFixed(1)}h</span>
                          <span className="text-xs text-muted-foreground">{project.percentage}%</span>
                        </div>
                      </div>
                      <div className="w-full bg-muted rounded-full h-2">
                        <div 
                          className="bg-wemakit-purple h-2 rounded-full transition-all duration-500" 
                          style={{ width: `${project.percentage}%` }} 
                        />
                      </div>
                    </div>
                  ))}
                </div>
                
                <div className="p-4 bg-muted/30 rounded-lg">
                  <div className="flex justify-between items-center mb-2">
                    <span className="text-sm font-medium">Weekly Target</span>
                    <span className="text-sm font-medium">{weeklySummary.totalHours} / 40 hours</span>
                  </div>
                  <div className="w-full bg-muted rounded-full h-2.5">
                    <div 
                      className="bg-green-500 h-2.5 rounded-full" 
                      style={{ width: `${Math.min((weeklySummary.totalHours / 40) * 100, 100)}%` }} 
                    />
                  </div>
                  <p className="text-xs text-muted-foreground mt-2 text-right">
                    {(40 - weeklySummary.totalHours).toFixed(1)} hours remaining this week
                  </p>
                </div>
                
                <div className="pt-4 flex justify-end">
                  <Button asChild variant="outline" size="sm">
                    <Link to="/dashboard/tasks">View All Tasks</Link>
                  </Button>
                </div>
              </CardContent>
            </Card>
          </div>
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default TimeTracking;
