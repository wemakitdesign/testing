import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Search, MoveHorizontal, ArrowUpDown, ClipboardList, Clock as ClockIcon, Users, AlertTriangle, CheckCircle2, Calendar, User, Plus } from 'lucide-react';
import { useAuth } from '@/context/AuthContext';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { StatusBadge } from '@/components/ui/status-badge';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import ProjectCard from '@/components/projects/ProjectCard';
import { useAdminTasks } from '@/hooks/tasks/use-admin-tasks'; // 🚀 Pake hook
import { supabase } from '../../../lib/supabaseClient';

const ProjectManagement: React.FC = () => {
  const { user } = useAuth();
  const { tasks: adminTasks, isLoading } = useAdminTasks();

  const [searchQuery, setSearchQuery] = useState('');
  const [statusFilter, setStatusFilter] = useState('all');
  const [view, setView] = useState<'board' | 'list'>('board');
  const [projects, setProjects] = useState<any[]>([]);
  const [tasks, setTasks] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  const filteredProjects = adminTasks.filter((task) => {
    const searchMatch = task.title.toLowerCase().includes(searchQuery.toLowerCase());
    const statusMatch = statusFilter === 'all' || task.status === statusFilter;
    return searchMatch && statusMatch;
  });

  const groupedProjects = {
    unassigned: filteredProjects.filter(p => p.status === 'unassigned'),
    pending: filteredProjects.filter(p => p.status === 'pending'),
    inProgress: filteredProjects.filter(p => p.status === 'inProgress'),
    review: filteredProjects.filter(p => p.status === 'review'),
    revisions: filteredProjects.filter(p => p.status === 'revisions'),
    completed: filteredProjects.filter(p => p.status === 'completed'),
    onHold: filteredProjects.filter(p => p.status === 'onHold'),
  };

  const statusColumns = [
    { id: 'unassigned', name: 'Unassigned', icon: <User className="h-4 w-4" /> },
    { id: 'pending', name: 'Pending', icon: <ClipboardList className="h-4 w-4" /> },
    { id: 'inProgress', name: 'In Progress', icon: <ClockIcon className="h-4 w-4" /> },
    { id: 'review', name: 'In Review', icon: <Users className="h-4 w-4" /> },
    { id: 'revisions', name: 'Revisions', icon: <AlertTriangle className="h-4 w-4" /> },
    { id: 'completed', name: 'Completed', icon: <CheckCircle2 className="h-4 w-4" /> },
    { id: 'onHold', name: 'On Hold', icon: <ClockIcon className="h-4 w-4" /> },
  ];

  useEffect(() => {
    const fetchProjectsAndTasks = async () => {
      setLoading(true);
      const { data: projs } = await supabase.from('projects').select('*');
      setProjects(projs || []);
      const { data: tks } = await supabase.from('tasks').select('*');
      setTasks(tks || []);
      setLoading(false);
    };
    fetchProjectsAndTasks();
  }, []);

  if (isLoading) {
    return (
      <div className="flex justify-center items-center min-h-[70vh]">
        <p className="text-muted-foreground text-sm">Loading projects...</p>
      </div>
    );
  }

  return (
    <div className="space-y-8">
      <motion.div initial={{ opacity: 0, y: -20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5 }}>
        <h1 className="text-3xl font-bold tracking-tight">Project Management</h1>
        <p className="text-muted-foreground">Manage and track all design projects</p>
      </motion.div>

      {/* Search & Filter */}
      <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.2 }} className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
        <div className="flex flex-col md:flex-row gap-4 w-full md:w-auto">
          <div className="relative w-full md:w-64">
            <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
            <Input
              type="search"
              placeholder="Search projects..."
              className="w-full pl-8"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
          </div>
          <Select value={statusFilter} onValueChange={setStatusFilter}>
            <SelectTrigger className="w-full md:w-[180px]">
              <SelectValue placeholder="All Statuses" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">All Statuses</SelectItem>
              <SelectItem value="unassigned">Unassigned</SelectItem>
              <SelectItem value="pending">Pending</SelectItem>
              <SelectItem value="inProgress">In Progress</SelectItem>
              <SelectItem value="review">In Review</SelectItem>
              <SelectItem value="revisions">Revisions</SelectItem>
              <SelectItem value="completed">Completed</SelectItem>
              <SelectItem value="onHold">On Hold</SelectItem>
            </SelectContent>
          </Select>
        </div>

        <div className="flex items-center gap-2">
          <div className="border rounded-md p-1 flex">
            <Button
              variant={view === 'board' ? "default" : "ghost"}
              size="sm"
              className="h-8 px-2"
              onClick={() => setView('board')}
            >
              <MoveHorizontal className="h-4 w-4" />
              <span className="sr-only md:not-sr-only md:ml-2">Board</span>
            </Button>
            <Button
              variant={view === 'list' ? "default" : "ghost"}
              size="sm"
              className="h-8 px-2"
              onClick={() => setView('list')}
            >
              <ArrowUpDown className="h-4 w-4" />
              <span className="sr-only md:not-sr-only md:ml-2">List</span>
            </Button>
          </div>
          <Button>
            <Plus className="h-4 w-4 mr-2" /> New Project
          </Button>
        </div>
      </motion.div>

      {/* Board View */}
      {view === 'board' ? (
        <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.3 }} className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-6 gap-4 overflow-x-auto">
          {statusColumns.map((column, index) => (
            <motion.div key={column.id} initial={{ opacity: 0, x: -20 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: index * 0.1 }} className="min-w-[250px]">
              <div className="bg-muted/40 rounded-t-md p-3 flex items-center justify-between">
                <div className="flex items-center">
                  {column.icon}
                  <h3 className="font-medium text-sm ml-2">{column.name}</h3>
                </div>
                <div className="bg-muted rounded-full h-6 min-w-[24px] px-2 flex items-center justify-center text-xs font-medium">
                  {groupedProjects[column.id as keyof typeof groupedProjects].length}
                </div>
              </div>
              <div className="bg-muted/20 p-3 rounded-b-md min-h-[70vh]">
              {groupedProjects[column.id as keyof typeof groupedProjects]?.map(task => (
  <ProjectCard 
    key={task.id} 
    project={{
      id: task.id,
      name: task.title, // title jadi name
      client: 'Client', // temporary
      designer: task.designer,
      completionPercentage: task.progress || 0,
      status: task.status,
      priority: task.priority || 'medium',
      deadline: task.deadline,
    }} 
  />
))}

              </div>
            </motion.div>
          ))}
        </motion.div>
      ) : (
        <div> {/* 👇 nanti lanjut tabel view di next step */}</div>
      )}
    </div>
  );
};

export default ProjectManagement;
