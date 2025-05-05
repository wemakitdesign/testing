
import React from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { StatusBadge } from '@/components/ui/status-badge';
import { Clock, Eye, Calendar, ArrowRight } from 'lucide-react';
import { Progress } from '@/components/ui/progress';

interface Request {
  id: string;
  title: string;
  status: string;
  createdAt: string;
  eta: string;
  progress: number;
}

interface RequestCardProps {
  request: Request;
}

const RequestCard: React.FC<RequestCardProps> = ({ request }) => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -20 }}
      whileHover={{ scale: 1.01 }}
      className="group"
    >
      <Card className="overflow-hidden hover:shadow-lg transition-all duration-300 border-l-4 border-l-wemakit-purple">
        <CardContent className="p-4">
          <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
            <div className="space-y-2">
              <Link 
                to={`/dashboard/requests/${request.id}`}
                className="text-lg font-medium group-hover:text-wemakit-purple transition-colors hover:underline"
              >
                {request.title}
              </Link>
              <div className="flex flex-wrap items-center gap-2">
                <StatusBadge 
                  variant={request.status === 'inProgress' ? 'inProgress' : 'pending'}
                  pulse={request.status === 'inProgress'}
                >
                  {request.status === 'inProgress' ? 'In Progress' : 'Pending'}
                </StatusBadge>
                <span className="text-xs text-muted-foreground flex items-center gap-1">
                  <Calendar className="h-3 w-3" />
                  {new Date(request.createdAt).toLocaleDateString()}
                </span>
              </div>
            </div>
            
            <div className="flex flex-col items-end gap-2">
              <div className="flex items-center text-sm text-muted-foreground">
                <Clock className="h-4 w-4 mr-1" />
                Est. completion: {new Date(request.eta).toLocaleDateString()}
              </div>
              
              {request.status === 'inProgress' && (
                <div className="w-full max-w-[200px]">
                  <Progress 
                    value={request.progress} 
                    className="h-2" 
                  />
                  <p className="text-xs text-muted-foreground text-right mt-1">
                    {request.progress}% Complete
                  </p>
                </div>
              )}
              
              <Button
                asChild
                variant="outline"
                size="sm"
                className="group-hover:bg-wemakit-purple group-hover:text-white transition-colors"
              >
                <Link to={`/dashboard/requests/${request.id}`} className="flex items-center">
                  <Eye className="h-4 w-4 mr-2" />
                  View details
                  <ArrowRight className="h-3 w-3 ml-2 opacity-0 group-hover:opacity-100 group-hover:translate-x-1 transition-all" />
                </Link>
              </Button>
            </div>
          </div>
        </CardContent>
      </Card>
    </motion.div>
  );
};

export default RequestCard;
