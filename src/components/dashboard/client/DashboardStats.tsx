
import React from 'react';
import { motion } from 'framer-motion';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { StatusBadge } from '@/components/ui/status-badge';
import { Sparkles, CheckCircle2, MessageSquare, Gauge } from 'lucide-react';

interface DashboardStatsProps {
  activeRequests: number;
  completedRequests: number;
  unreadMessages: number;
}

const DashboardStats = ({ activeRequests, completedRequests, unreadMessages }: DashboardStatsProps) => {
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
    <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
      <motion.div 
        variants={itemVariants} 
        whileHover={{ y: -5 }}
        className="group"
      >
        <Card className="hover:shadow-lg transition-shadow duration-300 hover:border-wemakit-purple/50">
          <CardHeader className="pb-2">
            <CardTitle className="text-base flex items-center gap-2">
              <Sparkles className="h-5 w-5 text-wemakit-purple" />
              Active Requests
            </CardTitle>
            <CardDescription>Your ongoing design requests</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="text-3xl font-bold text-wemakit-purple">{activeRequests}</div>
          </CardContent>
        </Card>
      </motion.div>
      
      <motion.div 
        variants={itemVariants} 
        whileHover={{ y: -5 }}
        className="group"
      >
        <Card className="hover:shadow-lg transition-shadow duration-300 hover:border-green-500/50">
          <CardHeader className="pb-2">
            <CardTitle className="text-base flex items-center gap-2">
              <CheckCircle2 className="h-5 w-5 text-green-500" />
              Completed Projects
            </CardTitle>
            <CardDescription>Successfully finished designs</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="text-3xl font-bold text-green-500">{completedRequests}</div>
          </CardContent>
        </Card>
      </motion.div>
      
      <motion.div 
        variants={itemVariants} 
        whileHover={{ y: -5 }}
        className="group"
      >
        <Card className="hover:shadow-lg transition-shadow duration-300 hover:border-blue-500/50">
          <CardHeader className="pb-2">
            <CardTitle className="text-base flex items-center gap-2">
              <MessageSquare className="h-5 w-5 text-blue-500" />
              Messages
            </CardTitle>
            <CardDescription>Unread designer messages</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="text-3xl font-bold text-blue-500">{unreadMessages}</div>
          </CardContent>
        </Card>
      </motion.div>
      
      <motion.div 
        variants={itemVariants} 
        whileHover={{ y: -5 }}
        className="group"
      >
        <Card className="hover:shadow-lg transition-shadow duration-300 hover:border-purple-500/50">
          <CardHeader className="pb-2">
            <CardTitle className="text-base flex items-center gap-2">
              <Gauge className="h-5 w-5 text-purple-500" />
              Subscription Status
            </CardTitle>
            <CardDescription>Your current plan</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="flex items-center justify-between">
              <StatusBadge variant="success" className="gap-1">
                <CheckCircle2 className="h-3 w-3" />
                Active
              </StatusBadge>
              <span className="text-sm font-medium text-purple-500">Premium Plan</span>
            </div>
          </CardContent>
        </Card>
      </motion.div>
    </div>
  );
};

export default DashboardStats;
