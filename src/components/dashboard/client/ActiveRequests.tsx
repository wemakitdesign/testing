
import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Clock, ChevronRight } from 'lucide-react';
import RequestCard from './RequestCard';
import EmptyState from './EmptyState';
import { 
  ContextMenu, 
  ContextMenuContent, 
  ContextMenuItem, 
  ContextMenuSeparator, 
  ContextMenuTrigger 
} from '@/components/ui/context-menu';
import { toast } from '@/components/ui/use-toast';

interface Request {
  id: string;
  title: string;
  status: string;
  createdAt: string;
  eta: string;
  progress: number;
}

interface ActiveRequestsProps {
  requests: Request[];
}

const ActiveRequests: React.FC<ActiveRequestsProps> = ({ requests }) => {
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1
      }
    }
  };

  const handleViewDetails = (id: string) => {
    // Navigate to details page or show details modal
    window.location.href = `/dashboard/requests/${id}`;
  };

  const handleMessageDesigner = (id: string) => {
    // Open message composer or navigate to messages
    toast({
      title: "Message composer opened",
      description: "You can now chat with your designer.",
    });
  };

  const handleCancelRequest = (id: string) => {
    // Show confirmation dialog and handle cancellation
    toast({
      title: "Request cancelled",
      description: "Your request has been cancelled successfully.",
    });
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: 0.2, duration: 0.4 }}
      className="rounded-lg p-6 bg-gradient-to-br from-white to-gray-50 dark:from-gray-900 dark:to-gray-950 shadow-sm border border-muted/20 hover:shadow-md transition-shadow"
    >
      <div className="flex items-center justify-between mb-6 pb-2 border-b">
        <h2 className="text-xl font-semibold flex items-center gap-2">
          <Clock className="h-5 w-5 text-wemakit-purple" />
          Active Requests
          <span className="ml-2 text-sm font-normal text-muted-foreground">
            {requests.length > 0 ? `(${requests.length})` : '(None)'}
          </span>
        </h2>
        
        {requests.length > 0 && (
          <motion.button 
            className="text-sm text-wemakit-purple flex items-center gap-1 hover:underline"
            whileHover={{ x: 3 }}
            whileTap={{ x: -1 }}
            onClick={() => window.location.href = '/dashboard/requests/history'}
          >
            View all
            <ChevronRight className="h-4 w-4" />
          </motion.button>
        )}
      </div>
      
      <AnimatePresence>
        {requests.length > 0 ? (
          <motion.div 
            className="space-y-4"
            variants={containerVariants}
            initial="hidden"
            animate="visible"
          >
            {requests.map(request => (
              <ContextMenu key={request.id}>
                <ContextMenuTrigger>
                  <div onClick={() => handleViewDetails(request.id)} className="cursor-pointer">
                    <RequestCard request={request} />
                  </div>
                </ContextMenuTrigger>
                <ContextMenuContent className="w-56 p-1.5">
                  <ContextMenuItem 
                    className="cursor-pointer flex items-center gap-2 text-sm p-2 rounded-md hover:bg-muted transition-colors"
                    onClick={() => handleViewDetails(request.id)}
                  >
                    View Details
                  </ContextMenuItem>
                  <ContextMenuItem 
                    className="cursor-pointer flex items-center gap-2 text-sm p-2 rounded-md hover:bg-muted transition-colors"
                    onClick={() => handleMessageDesigner(request.id)}
                  >
                    Message Designer
                  </ContextMenuItem>
                  <ContextMenuSeparator />
                  <ContextMenuItem 
                    className="cursor-pointer flex items-center gap-2 text-sm p-2 rounded-md text-red-500 hover:bg-red-50 dark:hover:bg-red-950/20 hover:text-red-600 transition-colors"
                    onClick={() => handleCancelRequest(request.id)}
                  >
                    Cancel Request
                  </ContextMenuItem>
                </ContextMenuContent>
              </ContextMenu>
            ))}
          </motion.div>
        ) : (
          <EmptyState />
        )}
      </AnimatePresence>
    </motion.div>
  );
};

export default ActiveRequests;
