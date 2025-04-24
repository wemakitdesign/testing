
import React, { useState, useEffect } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';
import { useIsMobile } from '../../hooks/use-mobile';
import { cn } from '../../lib/utils';
import { toast } from '../ui/use-toast';
import { motion } from 'framer-motion';
import { navItems } from './dashboardConstants';
import SidebarNav from './SidebarNav';
import MobileSidebar from './MobileSidebar';
import HeaderSection from './HeaderSection';

interface DashboardLayoutProps {
  children: React.ReactNode;
}

const DashboardLayout: React.FC<DashboardLayoutProps> = ({ children }) => {
  const { user, logout } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();
  const [isSidebarOpen, setIsSidebarOpen] = useState(true);
  const isMobile = useIsMobile();
  
  useEffect(() => {
    if (isMobile) {
      setIsSidebarOpen(false);
    }
  }, [isMobile]);
  
  const filteredNavItems = navItems.filter(
    (item) => user && item.roles.includes(user.role)
  );
  
  const handleLogout = () => {
    logout();
    toast({
      title: "Logged out successfully",
      description: "You have been logged out of your account.",
    });
    navigate('/login');
  };

  const getLinkClassName = (href: string) => {
    const isActive = location.pathname === href || location.pathname.startsWith(`${href}/`);
    
    return cn(
      'flex items-center gap-3 rounded-lg px-3 py-2 text-sm transition-all',
      isActive 
        ? 'bg-wemakit-purple/10 text-wemakit-purple font-medium' 
        : 'text-muted-foreground hover:bg-muted hover:text-foreground'
    );
  };
  
  return (
    <div className="flex min-h-screen bg-background">
      <SidebarNav 
        navItems={filteredNavItems}
        isSidebarOpen={isSidebarOpen}
        setIsSidebarOpen={setIsSidebarOpen}
        isMobile={isMobile}
        user={user}
        handleLogout={handleLogout}
      />
      
      <MobileSidebar 
        navItems={filteredNavItems}
        getLinkClassName={getLinkClassName}
        user={user}
        handleLogout={handleLogout}
      />
      
      <motion.main
        initial={false}
        animate={{
          marginLeft: isSidebarOpen ? (isMobile ? "0px" : "16rem") : (isMobile ? "0px" : "5rem")
        }}
        transition={{ duration: 0.3, ease: "easeInOut" }}
        className="flex-1"
      >
        <HeaderSection user={user} handleLogout={handleLogout} />
        
        <motion.div 
          className="p-4 sm:p-6 lg:p-8"
          initial="hidden"
          animate="visible"
          variants={{
            hidden: { opacity: 0, y: 10 },
            visible: { opacity: 1, y: 0, transition: { duration: 0.3 } }
          }}
        >
          {children}
        </motion.div>
      </motion.main>
    </div>
  );
};

export default DashboardLayout;
