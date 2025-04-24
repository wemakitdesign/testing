import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { 
  Search, 
  Filter, 
  Plus, 
  MoveHorizontal, 
  ArrowUpDown, 
  MoreHorizontal,
  ClipboardList,
  Clock as Clock8,
  Users,
  AlertTriangle,
  CheckCircle2,
  Clock,
  Calendar,
  User
} from 'lucide-react';
import { useAuth } from '../../../context/AuthContext';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '../../../components/ui/card';
import { Button } from '../../../components/ui/button';
import { Input } from '../../../components/ui/input';
import { StatusBadge } from '../../../components/ui/status-badge';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '../../../components/ui/select';
import { Designer, Project } from '../../../types/project';
import ProjectCard from '../../../components/projects/ProjectCard';
import DesignerWorkload from '../../../components/projects/DesignerWorkload';
import ProjectStatusOverview from '../../../components/projects/ProjectStatusOverview';
import { getStatusBadgeVariant, formatDate, getPriorityBadge } from '../../../utils/projectUtils';

const ProjectManagement = () => {
  const { user } = useAuth();
  const [searchQuery, setSearchQuery] = useState('');
  const [statusFilter, setStatusFilter] = useState('all');
  const [view, setView] = useState<'board' | 'list'>('board');
  
  const designers: Designer[] = [
    { id: 'd1', name: 'Jane Designer', avatar: 'https://ui-avatars.com/api/?name=Jane+Designer&background=8B56F6&color=fff', capacity: 85, activeProjects: 3 },
    { id: 'd2', name: 'Mark Visual', avatar: 'https://ui-avatars.com/api/?name=Mark+Visual&background=4299E1&color=fff', capacity: 60, activeProjects: 2 },
    { id: 'd3', name: 'Sarah Creative', avatar: 'https://ui-avatars.com/api/?name=Sarah+Creative&background=ED8936&color=fff', capacity: 40, activeProjects: 1 },
    { id: 'd4', name: 'Tom Graphic', avatar: 'https://ui-avatars.com/api/?name=Tom+Graphic&background=38A169&color=fff', capacity: 100, activeProjects: 4 },
  ];
  
  const projects: Project[] = [
    { 
      id: 'p1', 
      name: 'Website Redesign', 
      client: 'Acme Corp', 
      status: 'inProgress', 
      priority: 'high',
      deadline: '2023-05-15',
      createdAt: '2023-04-01',
      designer: designers[0],
      completionPercentage: 60
    },
    { 
      id: 'p2', 
      name: 'Logo Design', 
      client: 'Startup Inc', 
      status: 'review', 
      priority: 'medium',
      deadline: '2023-04-30',
      createdAt: '2023-04-10',
      designer: designers[1],
      completionPercentage: 90
    },
    { 
      id: 'p3', 
      name: 'Marketing Brochure', 
      client: 'Tech Solutions', 
      status: 'pending', 
      priority: 'medium',
      deadline: '2023-05-20',
      createdAt: '2023-04-15',
      completionPercentage: 0
    },
    { 
      id: 'p4', 
      name: 'Product Packaging', 
      client: 'Health Products', 
      status: 'revisions', 
      priority: 'high',
      deadline: '2023-04-25',
      createdAt: '2023-04-05',
      designer: designers[2],
      completionPercentage: 75
    },
    { 
      id: 'p5', 
      name: 'Social Media Templates', 
      client: 'Fashion Brand', 
      status: 'completed', 
      priority: 'low',
      deadline: '2023-04-18',
      createdAt: '2023-04-02',
      designer: designers[3],
      completionPercentage: 100
    },
    { 
      id: 'p6', 
      name: 'Mobile App UI', 
      client: 'Tech Startup', 
      status: 'onHold', 
      priority: 'medium',
      deadline: '2023-05-30',
      createdAt: '2023-04-08',
      designer: designers[0],
      completionPercentage: 40
    },
    { 
      id: 'p7', 
      name: 'Annual Report Design', 
      client: 'Corporate Inc', 
      status: 'pending', 
      priority: 'high',
      deadline: '2023-06-15',
      createdAt: '2023-04-18',
      completionPercentage: 0
    },
    { 
      id: 'p8', 
      name: 'E-commerce Banners', 
      client: 'Online Shop', 
      status: 'inProgress', 
      priority: 'medium',
      deadline: '2023-05-10',
      createdAt: '2023-04-12',
      designer: designers[1],
      completionPercentage: 30
    },
  ];
  
  const filteredProjects = projects.filter(project => {
    const searchMatch = 
      project.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      project.client.toLowerCase().includes(searchQuery.toLowerCase());
    
    const statusMatch = statusFilter === 'all' || project.status === statusFilter;
    
    return searchMatch && statusMatch;
  });
  
  const groupedProjects = {
    pending: filteredProjects.filter(p => p.status === 'pending'),
    inProgress: filteredProjects.filter(p => p.status === 'inProgress'),
    review: filteredProjects.filter(p => p.status === 'review'),
    revisions: filteredProjects.filter(p => p.status === 'revisions'),
    completed: filteredProjects.filter(p => p.status === 'completed'),
    onHold: filteredProjects.filter(p => p.status === 'onHold'),
  };

  const statusColumns = [
    { id: 'pending', name: 'Pending', icon: <ClipboardList className="h-4 w-4" /> },
    { id: 'inProgress', name: 'In Progress', icon: <Clock8 className="h-4 w-4" /> },
    { id: 'review', name: 'In Review', icon: <Users className="h-4 w-4" /> },
    { id: 'revisions', name: 'Revisions', icon: <AlertTriangle className="h-4 w-4" /> },
    { id: 'completed', name: 'Completed', icon: <CheckCircle2 className="h-4 w-4" /> },
    { id: 'onHold', name: 'On Hold', icon: <Clock className="h-4 w-4" /> },
  ];

  return (
    <div className="space-y-8">
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
      >
        <h1 className="text-3xl font-bold tracking-tight">Project Management</h1>
        <p className="text-muted-foreground">Manage and track all design projects</p>
      </motion.div>
      
      <motion.div 
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.2 }}
        className="flex flex-col md:flex-row md:items-center md:justify-between gap-4"
      >
        <div className="flex flex-col md:flex-row gap-4 md:items-center w-full md:w-auto">
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
          
          <Select 
            value={statusFilter} 
            onValueChange={setStatusFilter}
          >
            <SelectTrigger className="w-full md:w-[180px]">
              <SelectValue placeholder="All Statuses" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">All Statuses</SelectItem>
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
      
      {view === 'board' ? (
        <motion.div 
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.3 }}
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-6 gap-4 overflow-x-auto"
        >
          {statusColumns.map((column, columnIndex) => (
            <motion.div
              key={column.id}
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: columnIndex * 0.1 }}
              className="min-w-[250px]"
            >
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
                <motion.div
                  variants={{
                    hidden: { opacity: 0 },
                    show: {
                      opacity: 1,
                      transition: { staggerChildren: 0.1 }
                    }
                  }}
                  initial="hidden"
                  animate="show"
                >
                  {groupedProjects[column.id as keyof typeof groupedProjects].map((project) => (
                    <motion.div
                      key={project.id}
                      variants={{
                        hidden: { opacity: 0, y: 20 },
                        show: { opacity: 1, y: 0 }
                      }}
                      whileHover={{ scale: 1.02 }}
                      className="mb-3"
                    >
                      <ProjectCard project={project} />
                    </motion.div>
                  ))}
                </motion.div>
                
                <Button 
                  variant="ghost" 
                  className="w-full border border-dashed text-muted-foreground hover:text-foreground hover:bg-muted/30 transition-colors"
                >
                  <Plus className="h-4 w-4 mr-2" /> Add Project
                </Button>
              </div>
            </motion.div>
          ))}
        </motion.div>
      ) : (
        <Card>
          <CardHeader className="pb-3">
            <CardTitle>All Projects</CardTitle>
            <CardDescription>
              Showing {filteredProjects.length} of {projects.length} projects
            </CardDescription>
          </CardHeader>
          <CardContent className="p-0">
            <div className="rounded-md border">
              <div className="grid grid-cols-12 bg-muted/50 p-4 text-sm font-medium">
                <div className="col-span-3">Project</div>
                <div className="col-span-2">Client</div>
                <div className="col-span-2">Designer</div>
                <div className="col-span-1">Status</div>
                <div className="col-span-1">Priority</div>
                <div className="col-span-2">Deadline</div>
                <div className="col-span-1 text-right">Actions</div>
              </div>
              <div className="divide-y">
                {filteredProjects.length > 0 ? (
                  filteredProjects.map(project => (
                    <div key={project.id} className="grid grid-cols-12 p-4 text-sm items-center">
                      <div className="col-span-3">
                        <div className="font-medium">{project.name}</div>
                        <div className="mt-1 w-full bg-muted h-1.5 rounded-full">
                          <div 
                            className="bg-wemakit-purple h-1.5 rounded-full"
                            style={{ width: `${project.completionPercentage}%` }}
                          ></div>
                        </div>
                      </div>
                      <div className="col-span-2">{project.client}</div>
                      <div className="col-span-2">
                        {project.designer ? (
                          <div className="flex items-center">
                            <div className="flex-shrink-0 h-6 w-6 rounded-full bg-muted overflow-hidden mr-2">
                              <img src={project.designer.avatar} alt={project.designer.name} />
                            </div>
                            <span className="truncate max-w-[120px]">{project.designer.name}</span>
                          </div>
                        ) : (
                          <div className="flex items-center text-muted-foreground">
                            <User className="h-3.5 w-3.5 mr-1" />
                            Unassigned
                          </div>
                        )}
                      </div>
                      <div className="col-span-1">
                        <StatusBadge variant={getStatusBadgeVariant(project.status)}>
                          {project.status.charAt(0).toUpperCase() + project.status.slice(1)}
                        </StatusBadge>
                      </div>
                      <div className="col-span-1">
                        {getPriorityBadge(project.priority)}
                      </div>
                      <div className="col-span-2 flex items-center">
                        <Calendar className="h-3.5 w-3.5 mr-1 text-muted-foreground" />
                        {formatDate(project.deadline)}
                      </div>
                      <div className="col-span-1 flex justify-end">
                        <Button variant="ghost" size="sm" className="h-8 px-2">
                          <MoreHorizontal className="h-4 w-4" />
                        </Button>
                      </div>
                    </div>
                  ))
                ) : (
                  <div className="p-8 text-center">
                    <p className="text-muted-foreground">No projects found</p>
                    <p className="text-sm text-muted-foreground mt-1">
                      Try adjusting your filters or create a new project
                    </p>
                    <Button className="mt-4">
                      <Plus className="h-4 w-4 mr-2" /> New Project
                    </Button>
                  </div>
                )}
              </div>
            </div>
          </CardContent>
        </Card>
      )}
      
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <DesignerWorkload designers={designers} />
        <ProjectStatusOverview 
          groupedProjects={groupedProjects} 
          totalProjects={projects.length} 
        />
      </div>
    </div>
  );
};

export default ProjectManagement;
