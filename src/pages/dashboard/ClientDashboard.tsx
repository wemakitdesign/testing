
import React from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Button } from '@/components/ui/button';
import { PlusSquare, MessageSquare } from 'lucide-react';
import { useAuth } from '@/context/AuthContext';
import DashboardStats from '@/components/dashboard/client/DashboardStats';
import QuickActions from '@/components/dashboard/client/QuickActions';
import ActiveRequests from '@/components/dashboard/client/ActiveRequests';
import DashboardSearch from '@/components/dashboard/client/DashboardSearch';

const ClientDashboard = () => {
  const { user } = useAuth();

  // Extract only the first name
  const firstName = user?.name?.split(" ")[0] || "";

  // Mock data
  const activeRequests = [
    { id: '1', title: 'Website Redesign', status: 'inProgress', createdAt: '2023-05-15', eta: '2023-06-01', progress: 65 },
    { id: '2', title: 'Logo Design', status: 'pending', createdAt: '2023-05-20', eta: '2023-05-25', progress: 0 },
  ];

  const completedRequests = [
    { id: '3', title: 'Business Card Design', status: 'completed', createdAt: '2023-04-10', completedAt: '2023-04-15' },
  ];

  const handleMessageDesigner = () => {
    // Fungsi untuk memanggil message designer (contoh: redirect ke chat page)
    window.location.href = '/dashboard/messages'; // Ganti sesuai fitur chat Anda
  };

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1
      }
    }
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        type: "spring",
        stiffness: 100
      }
    }
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
          {/* Perbaiki penulisan dan tambahkan spasi */}
          <h1 className="text-3xl font-bold tracking-tight">
            Welcome back,{' '}
            <span className="bg-gradient-to-r from-wemakit-purple to-blue-500 text-transparent bg-clip-text">
              {user?.name}
            </span>
          </h1>
          <p className="text-muted-foreground">
            Here&apos;s an overview of your design requests and account.
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

      <QuickActions />

      <ActiveRequests requests={activeRequests} />
    </motion.div>
  );
};

export default ClientDashboard;

