import React from 'react';
import { Calendar, MoreHorizontal, User } from 'lucide-react';
import { Project } from '../../types/project';
import { formatDate, getPriorityBadge } from '../../utils/projectUtils';
import { StatusBadge } from '../ui/status-badge';
import { motion } from 'framer-motion';

interface ProjectCardProps {
  project: Project;
}

const ProjectCard: React.FC<ProjectCardProps> = ({ project }) => (
  <div 
    className="border rounded-md bg-card p-3 mb-3 shadow-sm hover:shadow-md transition-shadow cursor-move"
    draggable
  >
    <div className="flex justify-between items-start">
      <h3 className="font-medium truncate max-w-[170px]">{project.name}</h3>
      <div className="flex">
        <button className="text-muted-foreground rounded-full h-6 w-6 inline-flex items-center justify-center hover:bg-muted">
          <MoreHorizontal className="h-4 w-4" />
        </button>
      </div>
    </div>
    <p className="text-xs text-muted-foreground mt-1">{project.client}</p>
    
    <div className="mt-3 space-y-2">
      <div className="flex justify-between items-center text-xs">
        <div className="flex items-center text-muted-foreground">
          <Calendar className="h-3.5 w-3.5 mr-1" />
          Due: {formatDate(project.deadline)}
        </div>
        {getPriorityBadge(project.priority)}
      </div>
      
      {project.designer ? (
        <div className="flex items-center mt-2">
          <div className="flex-shrink-0 h-6 w-6 rounded-full bg-muted overflow-hidden mr-2">
            <img src={project.designer.avatar} alt={project.designer.name} />
          </div>
          <span className="text-xs truncate max-w-[150px]">{project.designer.name}</span>
        </div>
      ) : (
        <div className="flex items-center text-xs text-muted-foreground mt-2">
          <User className="h-3.5 w-3.5 mr-1" />
          No designer assigned
        </div>
      )}
      
      <div>
        <div className="w-full bg-muted h-1.5 rounded-full mt-2">
          <div 
            className="bg-wemakit-purple h-1.5 rounded-full"
            style={{ width: `${project.completionPercentage}%` }}
          ></div>
        </div>
        <div className="flex justify-end mt-1">
          <span className="text-xs text-muted-foreground">{project.completionPercentage}%</span>
        </div>
      </div>
    </div>
  </div>
);

export default ProjectCard;
