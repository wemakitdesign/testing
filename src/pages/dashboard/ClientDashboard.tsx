import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Button } from '@/components/ui/button';
import { PlusSquare, MessageSquare } from 'lucide-react';
import { useAuth } from '@/context/AuthContext';
import DashboardStats from '@/components/dashboard/client/DashboardStats';
import QuickActions from '@/components/dashboard/client/QuickActions';
import ActiveRequests from '@/components/dashboard/client/ActiveRequests';
import DashboardSearch from '@/components/dashboard/client/DashboardSearch';
import { getProjects } from '@/utils/supabase';

const ClientDashboard = () => {
  const { user } = useAuth();
  const firstName = user?.name?.split(' ')[0] || '';

  const [activeRequests, setActiveRequests] = useState([]);
  const [completedRequests, setCompletedRequests] = useState([]);

  useEffect(() => {
    const fetchProjects = async () => {
      try {
        const projects = await getProjects();
        console.log("🔥 Data project dari Supabase:", projects);

        const active = projects.filter((p: any) => p.status !== 'completed');
        const completed = projects.filter((p: any) => p.status === 'completed');
        setActiveRequests(active);
        setCompletedRequests(completed);
      } catch (err) {
        console.error('Error fetching projects:', err);
      }
    };
    fetchProjects();
  }, []);

  const handleMessageDesigner = () => {
    window.location.href = '/dashboard/messages';
  };

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
      },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { type: 'spring', stiffness: 100 },
    },
  };

  return (
    <motion.div 
      className="p-6 space-y-8 max-w-7xl mx-auto"
      variants={containerVariants}
      initial="hidden"
      animate="visible"
    >
      <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
        <motion.div variants={itemVariants}>
          <h1 className="text-3xl font-bold tracking-tight">
            Welcome back,{' '}
            <span className="bg-gradient-to-r from-wemakit-purple to-blue-500 text-transparent bg-clip-text">
              {firstName}
            </span>
          </h1>
          <p className="text-muted-foreground">
            Here's an overview of your design requests and account.
          </p>
        </motion.div>

        <div className="flex items-center gap-3">
          <DashboardSearch />
          <Button onClick={handleMessageDesigner} variant="outline">
            <MessageSquare className="h-4 w-4" />
            <span className="hidden md:inline ml-2">Message Designer</span>
          </Button>
          <Button asChild>
            <Link to="/dashboard/requests/new">
              <PlusSquare className="h-4 w-4" />
              <span className="hidden md:inline ml-2">New Request</span>
            </Link>
          </Button>
        </div>
      </div>

      <DashboardStats 
        activeRequests={activeRequests.length} 
        completedRequests={completedRequests.length} 
        unreadMessages={3} 
      />

<div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
  <div className="lg:col-span-2">
    <ActiveRequests requests={activeRequests} />
  </div>
  <div className="lg:col-span-1">
    {/* Changed to vertical layout with full height */}
    <div className="flex flex-col gap-4 h-full">
      <QuickActions className="grid grid-cols-1 gap-4" />
    </div>
  </div>
</div>
    </motion.div>
  );
};

export default ClientDashboard;
