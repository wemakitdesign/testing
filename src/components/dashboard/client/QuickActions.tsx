
import React from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { ActionCard } from '@/components/ui/action-card';
import { PlusSquare, History, CreditCard } from 'lucide-react';

const QuickActions = () => {
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
    <motion.div variants={itemVariants}>
      <h2 className="text-xl font-semibold mb-4 flex items-center gap-2">
        <PlusSquare className="h-5 w-5 text-wemakit-purple" />
        Quick Actions
      </h2>
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
        <motion.div whileHover={{ scale: 1.02 }} whileTap={{ scale: 0.98 }}>
          <ActionCard
            as={Link}
            to="/dashboard/requests/new"
            icon={<PlusSquare className="h-6 w-6 text-wemakit-purple" />}
            title="Create New Request"
            description="Submit a new design request"
            variant="purple"
          />
        </motion.div>
        
        <motion.div whileHover={{ scale: 1.02 }} whileTap={{ scale: 0.98 }}>
          <ActionCard
            as={Link}
            to="/dashboard/requests/history"
            icon={<History className="h-6 w-6 text-blue-500" />}
            title="View Request History"
            description="Review all your past requests"
            variant="blue"
          />
        </motion.div>
        
        <motion.div whileHover={{ scale: 1.02 }} whileTap={{ scale: 0.98 }}>
          <ActionCard
            as={Link}
            to="/dashboard/billing"
            icon={<CreditCard className="h-6 w-6 text-green-500" />}
            title="Manage Billing"
            description="Update payment methods and view invoices"
            variant="green"
          />
        </motion.div>
      </div>
    </motion.div>
  );
};

export default QuickActions;
