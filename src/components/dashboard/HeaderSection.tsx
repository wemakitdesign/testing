
import React from 'react';
import { Button } from '../ui/button';
import SearchBar from './SearchBar';
import NotificationsDropdown from './NotificationsDropdown';
import ProfileDropdown from './ProfileDropdown';

interface HeaderSectionProps {
  user: any;
  handleLogout: () => void;
}

const HeaderSection: React.FC<HeaderSectionProps> = ({ user, handleLogout }) => {
  // Hanya ambil first name tanpa embel role
  const firstName = user?.name?.split(' ')[0] || '';

  return (
    <header className="sticky top-0 z-10 flex h-16 items-center gap-4 border-b bg-background px-4 sm:px-6 lg:px-8">
      <SearchBar />
      {/* ⌘K button sudah dihapus, dan pastikan tidak muncul */}
      <div className="flex items-center gap-4">
        <NotificationsDropdown />
        {user && (
          <ProfileDropdown 
            user={{ ...user, name: firstName }} 
            handleLogout={handleLogout} 
          />
        )}
      </div>
    </header>
  );
};

export default HeaderSection;
