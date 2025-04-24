
import React from 'react';
import { Bell } from 'lucide-react';
import { motion } from 'framer-motion';
import { Button } from '../ui/button';
import { Popover, PopoverContent, PopoverTrigger } from '../ui/popover';

const NotificationsDropdown: React.FC = () => {
  return (
    <Popover>
      <PopoverTrigger asChild>
        <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
          <Button
            variant="ghost"
            size="icon"
            className="relative"
            aria-label="Notifications"
          >
            <Bell className="h-5 w-5" />
            <motion.span
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
              className="absolute right-1.5 top-1.5 h-2 w-2 rounded-full bg-wemakit-purple"
            />
          </Button>
        </motion.div>
      </PopoverTrigger>
      <PopoverContent className="w-80 p-0" align="end">
        <div className="px-4 py-3 border-b">
          <h3 className="text-sm font-medium">Notifications</h3>
        </div>
        <div className="py-2 max-h-[300px] overflow-y-auto">
          <div className="px-4 py-2 hover:bg-muted transition-colors cursor-pointer">
            <p className="text-sm font-medium">Design request approved</p>
            <p className="text-xs text-muted-foreground">Just now</p>
          </div>
          <div className="px-4 py-2 hover:bg-muted transition-colors cursor-pointer">
            <p className="text-sm font-medium">Designer has been assigned</p>
            <p className="text-xs text-muted-foreground">2 hours ago</p>
          </div>
        </div>
        <div className="px-4 py-2 border-t text-center">
          <Button variant="ghost" size="sm" className="w-full text-xs">
            View all notifications
          </Button>
        </div>
      </PopoverContent>
    </Popover>
  );
};

export default NotificationsDropdown;
