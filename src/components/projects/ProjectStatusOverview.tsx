
import React from 'react';
import { 
  ClipboardList,
  Clock as Clock8,
  Users,
  AlertTriangle,
  CheckCircle2,
  Clock 
} from 'lucide-react';
import { Project } from '../../types/project';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '../ui/card';
import { getStatusColor } from '../../utils/projectUtils';

interface ProjectStatusOverviewProps {
  groupedProjects: {
    [key: string]: Project[];
  };
  totalProjects: number;
}

const statusColumns = [
  { id: 'pending', name: 'Pending', icon: <ClipboardList className="h-4 w-4" /> },
  { id: 'inProgress', name: 'In Progress', icon: <Clock8 className="h-4 w-4" /> },
  { id: 'review', name: 'In Review', icon: <Users className="h-4 w-4" /> },
  { id: 'revisions', name: 'Revisions', icon: <AlertTriangle className="h-4 w-4" /> },
  { id: 'completed', name: 'Completed', icon: <CheckCircle2 className="h-4 w-4" /> },
  { id: 'onHold', name: 'On Hold', icon: <Clock className="h-4 w-4" /> },
];

const ProjectStatusOverview: React.FC<ProjectStatusOverviewProps> = ({ groupedProjects, totalProjects }) => {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Project Status Overview</CardTitle>
        <CardDescription>At a glance statistics</CardDescription>
      </CardHeader>
      <CardContent>
        <div className="grid grid-cols-2 gap-4">
          {statusColumns.map(column => {
            const count = groupedProjects[column.id]?.length || 0;
            const percentage = Math.round((count / totalProjects) * 100);
            
            return (
              <div key={column.id} className="p-4 border rounded-md bg-muted/20">
                <div className="flex justify-between items-start">
                  <div className="flex items-center">
                    <div className={`p-2 rounded-full ${getStatusColor(column.id)}`}>
                      {column.icon}
                    </div>
                    <h3 className="font-medium ml-2">{column.name}</h3>
                  </div>
                  <span className="text-2xl font-bold">{count}</span>
                </div>
                <div className="mt-2 w-full bg-muted h-1.5 rounded-full">
                  <div 
                    className="bg-wemakit-purple h-1.5 rounded-full transition-all duration-500"
                    style={{ width: `${percentage}%` }}
                  ></div>
                </div>
                <p className="text-xs text-right text-muted-foreground mt-1">{percentage}% of projects</p>
              </div>
            );
          })}
        </div>
      </CardContent>
    </Card>
  );
};

export default ProjectStatusOverview;
