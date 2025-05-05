import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import { UserRole } from '../../types/auth';
import { cn } from '../../lib/utils';
import { motion } from 'framer-motion';
import logo from '@/assets/logo-wemakit.svg';
import { Avatar, AvatarFallback, AvatarImage } from '../ui/avatar';
import { Button } from '../ui/button';
import { X, Menu, LogOut } from 'lucide-react';

interface NavItem {
  title: string;
  href: string;
  icon: React.ElementType;
  roles: UserRole[];
}

interface SidebarNavProps {
  navItems: NavItem[];
  isSidebarOpen: boolean;
  setIsSidebarOpen: React.Dispatch<React.SetStateAction<boolean>>;
  isMobile: boolean;
  user: any;
  handleLogout: () => void;
}

const SidebarNav: React.FC<SidebarNavProps> = ({
  navItems,
  isSidebarOpen,
  setIsSidebarOpen,
  isMobile,
  user,
  handleLogout
}) => {
  const location = useLocation();

  const getLinkClassName = (href: string) => {
    const isActive = location.pathname === href || location.pathname.startsWith(`${href}/`);
    
    return cn(
      'flex items-center gap-3 rounded-lg px-3 py-2 text-sm transition-all',
      isActive 
        ? 'bg-wemakit-purple/10 text-wemakit-purple font-medium' 
        : 'text-muted-foreground hover:bg-muted hover:text-foreground'
    );
  };

  const sidebarVariants = {
    open: {
      width: isMobile ? "100%" : "16rem",
      transition: { duration: 0.3, ease: "easeInOut" }
    },
    closed: {
      width: isMobile ? "0" : "5rem",
      transition: { duration: 0.3, ease: "easeInOut" }
    }
  };

  const fadeInVariants = {
    hidden: { opacity: 0, y: 10 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.3 } }
  };

  return (
    <motion.aside
      initial={false}
      animate={isSidebarOpen ? "open" : "closed"}
      variants={sidebarVariants}
      className={cn(
        "fixed inset-y-0 z-20 flex h-full flex-col border-r bg-background transition-all duration-300 ease-in-out lg:left-0",
        isMobile && !isSidebarOpen && "hidden"
      )}
    >
      <motion.div 
        className="flex h-16 items-center justify-between px-4"
        initial="hidden"
        animate="visible"
        variants={fadeInVariants}
      >
        <div className={cn("flex items-center", !isSidebarOpen && "lg:justify-center")}>
        {isSidebarOpen ? (
  <img src={logo} alt="Wemakit Logo" className="h-8 w-auto" />
) : (
  <div className="w-8 h-8 gradient-bg-hero rounded-md flex items-center justify-center text-white font-bold">
    W
  </div>
)}

        </div>
        <Button
          variant="ghost"
          size="icon"
          className="hidden lg:flex"
          onClick={() => setIsSidebarOpen(!isSidebarOpen)}
        >
          <motion.div
            initial={false}
            animate={{ rotate: isSidebarOpen ? 180 : 0 }}
            transition={{ duration: 0.3 }}
          >
            {isSidebarOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
          </motion.div>
        </Button>
      </motion.div>
      
      <div className="flex flex-1 flex-col gap-1 overflow-y-auto px-3 py-4">
        {navItems.map((item, index) => (
          <motion.div
            key={index}
            initial="hidden"
            animate="visible"
            variants={{
              hidden: { opacity: 0, x: -20 },
              visible: {
                opacity: 1,
                x: 0,
                transition: {
                  delay: index * 0.1,
                  duration: 0.3
                }
              }
            }}
          >
            <Link 
              to={item.href}
              className={getLinkClassName(item.href)}
            >
              <item.icon className="h-5 w-5" />
              {isSidebarOpen && <span>{item.title}</span>}
            </Link>
          </motion.div>
        ))}
      </div>
      
      <motion.div 
        className="mt-auto border-t"
        initial="hidden"
        animate="visible"
        variants={fadeInVariants}
      >
        <div className={cn(
          "p-4 flex",
          isSidebarOpen ? "justify-between" : "lg:justify-center"
        )}>
          {isSidebarOpen && user ? (
            <div className="flex items-center gap-3">
              <Avatar className="h-8 w-8">
                <AvatarImage src={user.avatar} alt={user.name} />
                <AvatarFallback>{user.name.charAt(0)}</AvatarFallback>
              </Avatar>
              <div className="flex flex-col space-y-0.5">
                <span className="text-sm font-medium">{user.name}</span>
                <span className="text-xs text-muted-foreground capitalize">{user.role}</span>
              </div>
            </div>
          ) : (
            user && (
              <Avatar className="h-8 w-8">
                <AvatarImage src={user.avatar} alt={user.name} />
                <AvatarFallback>{user.name.charAt(0)}</AvatarFallback>
              </Avatar>
            )
          )}
          <Button
            variant="ghost"
            size="icon"
            onClick={handleLogout}
            title="Log out"
          >
            <LogOut className="h-5 w-5" />
          </Button>
        </div>
      </motion.div>
    </motion.aside>
  );
};

export default SidebarNav;
