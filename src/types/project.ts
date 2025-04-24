
export interface Designer {
  id: string;
  name: string;
  avatar?: string;
  capacity: number;
  activeProjects: number;
}

export interface Project {
  id: string;
  name: string;
  client: string;
  status: 'pending' | 'inProgress' | 'review' | 'revisions' | 'completed' | 'onHold';
  priority: 'high' | 'medium' | 'low';
  deadline: string;
  createdAt: string;
  designer?: Designer;
  completionPercentage: number;
}
