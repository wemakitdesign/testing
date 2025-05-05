
import React from 'react';
import { Designer } from '../../types/project';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '../ui/card';

interface DesignerWorkloadProps {
  designers: Designer[];
}

const DesignerWorkload: React.FC<DesignerWorkloadProps> = ({ designers }) => {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Designer Workload</CardTitle>
        <CardDescription>Current capacity and assigned projects</CardDescription>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          {designers.map(designer => (
            <div key={designer.id} className="space-y-2">
              <div className="flex justify-between items-center">
                <div className="flex items-center">
                  <div className="flex-shrink-0 h-8 w-8 rounded-full bg-muted overflow-hidden mr-2">
                    <img src={designer.avatar} alt={designer.name} />
                  </div>
                  <div>
                    <div className="font-medium">{designer.name}</div>
                    <div className="text-xs text-muted-foreground">{designer.activeProjects} active projects</div>
                  </div>
                </div>
                <div className="text-sm font-medium">{designer.capacity}%</div>
              </div>
              <div className="w-full bg-muted h-2 rounded-full">
                <div 
                  className={`h-2 rounded-full ${
                    designer.capacity > 80 ? 'bg-red-500' : 
                    designer.capacity > 60 ? 'bg-orange-500' : 
                    'bg-green-500'
                  }`}
                  style={{ width: `${designer.capacity}%` }}
                ></div>
              </div>
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  );
};

export default DesignerWorkload;
