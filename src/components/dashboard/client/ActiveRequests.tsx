import React, { useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Clock, ChevronRight } from 'lucide-react';
import RequestCard from './RequestCard';
import EmptyState from './EmptyState';
import { ContextMenu, ContextMenuContent, ContextMenuItem, ContextMenuSeparator, ContextMenuTrigger } from '@/components/ui/context-menu';
import { toast } from '@/components/ui/use-toast';
import { supabase } from '@/lib/supabaseClient';

interface Request {
  id: string;
  title: string;
  status: string;
  createdAt: string;
  eta?: string;
  progress?: number;
}

const ActiveRequests: React.FC = () => {
  const [requests, setRequests] = useState<Request[]>([]);

  useEffect(() => {
    const fetchRequests = async () => {
      try {
        const { data: userData, error: userError } = await supabase.auth.getUser();
        if (userError) throw userError;
  
        const authId = userData.user?.id;
        if (!authId) return;
  
        // Ambil client berdasarkan auth_uid
        const { data: clientData, error: clientError } = await supabase
          .from('clients')
          .select('id')
          .eq('auth_uid', authId)
          .single();
  
        if (clientError || !clientData) throw clientError;
        const clientId = clientData.id;
  
        // Ambil tasks milik client ini
        const { data, error } = await supabase
          .from('tasks')
          .select('*')
          .eq('client_id', clientId)
          .order('created_at', { ascending: false });
  
        if (error) throw error;
  
        const active = (data || [])
          .filter(task => task.status !== 'completed')
          .map(task => ({
            id: task.id,
            title: task.title,
            status: task.status,
            createdAt: task.created_at,
            eta: task.deadline || '',
            progress: task.progress || 0,
          }));
  
        setRequests(active);
      } catch (error) {
        console.error('Error fetching tasks:', error);
      }
    };
  
    fetchRequests();
  }, []);
  

  const handleViewDetails = (id: string) => {
    window.location.href = `/dashboard/requests/${id}`;
  };

  const handleMessageDesigner = (id: string) => {
    toast({
      title: 'Message Designer',
      description: 'Opening chat with assigned designer...',
    });
  };

  const handleCancelRequest = (id: string) => {
    toast({
      title: 'Request Cancelled',
      description: 'The request has been cancelled successfully.',
    });
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: 0.2 }}
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
            variants={{ hidden: { opacity: 0 }, visible: { opacity: 1, transition: { staggerChildren: 0.1 } } }}
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
                  <ContextMenuItem onClick={() => handleViewDetails(request.id)}>View Details</ContextMenuItem>
                  <ContextMenuItem onClick={() => handleMessageDesigner(request.id)}>Message Designer</ContextMenuItem>
                  <ContextMenuSeparator />
                  <ContextMenuItem onClick={() => handleCancelRequest(request.id)} className="text-red-500 hover:bg-red-50 dark:hover:bg-red-950/20">
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
