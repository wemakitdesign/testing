import React from 'react';
import { Link } from 'react-router-dom';
import { Card, CardContent } from '@/components/ui/card';
import { StatusBadge } from '@/components/ui/status-badge';
import { Progress } from '@/components/ui/progress';
import { Calendar, User } from 'lucide-react';

interface ProjectCardProps {
  project: {
    id: string;
    name: string;
    status: string;
    createdAt: string;
    deadline?: string;
    completionPercentage: number;
    designer?: {
      id: string;
      name: string;
      avatar?: string;
    };
  };
}

const ProjectCard: React.FC<ProjectCardProps> = ({ project }) => {
  return (
    <Link to={`/dashboard/projects/${project.id}`} className="block group focus:outline-none focus:ring-2 focus:ring-wemakit-purple rounded-lg">
      <Card className="overflow-hidden hover:shadow-md transition-all cursor-pointer group-hover:shadow-lg">
        <CardContent className="p-4 space-y-3">
          <div className="flex items-center justify-between">
            <h4 className="font-semibold text-lg line-clamp-1 group-hover:text-wemakit-purple transition-colors">{project.name}</h4>
            <StatusBadge variant={project.status === 'inProgress' ? 'inProgress' : 'pending'}>
              {project.status.charAt(0).toUpperCase() + project.status.slice(1)}
            </StatusBadge>
          </div>

          {project.designer ? (
            <div className="flex items-center text-xs text-muted-foreground gap-2">
              {project.designer.avatar ? (
                <img src={project.designer.avatar} alt={project.designer.name} className="w-5 h-5 rounded-full object-cover" />
              ) : (
                <User className="h-4 w-4" />
              )}
              <span className="truncate">{project.designer.name}</span>
            </div>
          ) : (
            <div className="flex items-center text-xs text-muted-foreground gap-2">
              <User className="h-4 w-4" />
              <span>Unassigned</span>
            </div>
          )}

          <div className="flex items-center text-xs text-muted-foreground gap-2">
            <Calendar className="h-4 w-4" />
            <span>{project.deadline ? new Date(project.deadline).toLocaleDateString() : 'No Deadline'}</span>
          </div>

          <div>
            <Progress value={project.completionPercentage} className="h-2" />
            <p className="text-xs text-muted-foreground text-right mt-1">
              {project.completionPercentage}% Complete
            </p>
          </div>
        </CardContent>
      </Card>
    </Link>
  );
};

export default ProjectCard;
