
import React from 'react';
import { Link } from 'react-router-dom';
import { UserRole } from '../../types/auth';
import { cn } from '../../lib/utils';
import { motion } from 'framer-motion';
import { Sheet, SheetContent, SheetTrigger } from '../ui/sheet';
import { Button } from '../ui/button';
import { Separator } from '../ui/separator';
import { Menu, LogOut } from 'lucide-react';
import { Avatar, AvatarFallback, AvatarImage } from '../ui/avatar';
import Logo from '../Logo';

interface NavItem {
  title: string;
  href: string;
  icon: React.ElementType;
  roles: UserRole[];
}

interface MobileSidebarProps {
  navItems: NavItem[];
  getLinkClassName: (href: string) => string;
  user: any;
  handleLogout: () => void;
}

const MobileSidebar: React.FC<MobileSidebarProps> = ({
  navItems,
  getLinkClassName,
  user,
  handleLogout
}) => {
  const fadeInVariants = {
    hidden: { opacity: 0, y: 10 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.3 } }
  };

  return (
    <Sheet>
      <SheetTrigger asChild>
        <Button
          variant="ghost"
          size="icon"
          className="lg:hidden absolute left-4 top-3 z-10"
        >
          <Menu className="h-5 w-5" />
        </Button>
      </SheetTrigger>
      <SheetContent side="left" className="w-64 p-0">
        <motion.div
          initial="hidden"
          animate="visible"
          variants={fadeInVariants}
          className="flex h-16 items-center px-4 border-b"
        >
          <Logo />
        </motion.div>
        <motion.div 
          className="flex flex-col gap-1 p-4"
          initial="hidden"
          animate="visible"
          variants={fadeInVariants}
        >
          {navItems.map((item, index) => (
            <motion.div
              key={index}
              variants={{
                hidden: { opacity: 0, x: -20 },
                visible: {
                  opacity: 1,
                  x: 0,
                  transition: {
                    delay: index * 0.1
                  }
                }
              }}
            >
              <Link 
                to={item.href}
                className={getLinkClassName(item.href)}
              >
                <item.icon className="h-5 w-5" />
                <span>{item.title}</span>
              </Link>
            </motion.div>
          ))}
        </motion.div>
        <Separator />
        <motion.div 
          className="p-4"
          initial="hidden"
          animate="visible"
          variants={fadeInVariants}
        >
          {user && (
            <div className="flex items-center gap-3 mb-4">
              <Avatar className="h-8 w-8">
                <AvatarImage src={user.avatar} alt={user.name} />
                <AvatarFallback>{user.name.charAt(0)}</AvatarFallback>
              </Avatar>
              <div className="flex flex-col space-y-0.5">
                <span className="text-sm font-medium">{user.name}</span>
                <span className="text-xs text-muted-foreground capitalize">{user.role}</span>
              </div>
            </div>
          )}
          <Button
            variant="outline"
            className="w-full justify-start"
            onClick={handleLogout}
          >
            <LogOut className="mr-2 h-4 w-4" />
            Log out
          </Button>
        </motion.div>
      </SheetContent>
    </Sheet>
  );
};

export default MobileSidebar;
