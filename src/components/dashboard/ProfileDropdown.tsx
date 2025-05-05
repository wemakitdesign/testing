
import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { 
  LogOut,
  User,
  Settings,
  HelpCircle 
} from 'lucide-react';
import { Avatar, AvatarFallback, AvatarImage } from '../ui/avatar';
import { 
  DropdownMenu, 
  DropdownMenuContent, 
  DropdownMenuItem, 
  DropdownMenuLabel, 
  DropdownMenuSeparator, 
  DropdownMenuTrigger 
} from '../ui/dropdown-menu';

interface ProfileDropdownProps {
  user: any;
  handleLogout: () => void;
}

const ProfileDropdown: React.FC<ProfileDropdownProps> = ({ user, handleLogout }) => {
  const [isProfileOpen, setIsProfileOpen] = useState(false);

  // Hanya tampilkan first name
  const displayName = (user?.name?.split(" ")[0] || "");

  const dropdownAnimation = {
    hidden: { opacity: 0, scale: 0.95, y: -5 },
    visible: { 
      opacity: 1, 
      scale: 1, 
      y: 0, 
      transition: { 
        type: "spring", 
        stiffness: 300, 
        damping: 20 
      } 
    },
    exit: { 
      opacity: 0, 
      scale: 0.95, 
      y: -5, 
      transition: { 
        duration: 0.2 
      } 
    }
  };

  return (
    <DropdownMenu open={isProfileOpen} onOpenChange={setIsProfileOpen}>
      <DropdownMenuTrigger asChild>
        <motion.button 
          className="flex items-center gap-3 rounded-full hover:bg-muted p-1.5 transition-colors cursor-pointer focus:outline-none"
          whileHover={{ scale: 1.02 }}
          whileTap={{ scale: 0.98 }}
        >
          <Avatar className="h-8 w-8 ring-2 ring-offset-2 ring-wemakit-purple/30">
            <AvatarImage src={user.avatar} alt={displayName} />
            <AvatarFallback className="bg-wemakit-purple/10 text-wemakit-purple">
              {displayName.charAt(0)}
            </AvatarFallback>
          </Avatar>
          <div className="flex flex-col space-y-0.5 hidden md:block">
            <span className="text-sm font-medium leading-none">{displayName}</span>
            {/* role string dihilangkan */}
          </div>
        </motion.button>
      </DropdownMenuTrigger>
      <DropdownMenuContent 
        align="end" 
        className="w-56 p-2 border border-muted/20 shadow-lg"
        asChild
      >
        <motion.div
          initial="hidden"
          animate="visible"
          exit="exit"
          variants={dropdownAnimation}
        >
          <DropdownMenuLabel className="px-4 py-2">
            <div className="flex flex-col space-y-1">
              <span className="text-sm font-semibold">{displayName}</span>
              <span className="text-xs text-muted-foreground">{user.email || "user@example.com"}</span>
            </div>
          </DropdownMenuLabel>
          <DropdownMenuSeparator />
          <DropdownMenuItem className="px-4 py-2 cursor-pointer" asChild>
            <Link to="/dashboard/user/profile" className="flex items-center gap-2 w-full">
              <User className="h-4 w-4" />
              <span>Profile</span>
            </Link>
          </DropdownMenuItem>
          <DropdownMenuItem className="px-4 py-2 cursor-pointer" asChild>
            <Link to="/dashboard/settings" className="flex items-center gap-2 w-full">
              <Settings className="h-4 w-4" />
              <span>Settings</span>
            </Link>
          </DropdownMenuItem>
          <DropdownMenuItem className="px-4 py-2 cursor-pointer" asChild>
            <Link to="/dashboard/help" className="flex items-center gap-2 w-full">
              <HelpCircle className="h-4 w-4" />
              <span>Help</span>
            </Link>
          </DropdownMenuItem>
          <DropdownMenuSeparator />
          <DropdownMenuItem 
            className="px-4 py-2 cursor-pointer text-red-500 hover:text-red-600 hover:bg-red-50 dark:hover:bg-red-950/20"
            onClick={handleLogout}
          >
            <div className="flex items-center gap-2">
              <LogOut className="h-4 w-4" />
              <span>Logout</span>
            </div>
          </DropdownMenuItem>
        </motion.div>
      </DropdownMenuContent>
    </DropdownMenu>
  );
};

export default ProfileDropdown;
