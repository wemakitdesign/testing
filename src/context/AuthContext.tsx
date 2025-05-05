import React, { createContext, useContext, useState, useEffect } from 'react';
import { createClient } from '@supabase/supabase-js';
import { AuthState, CustomUser } from '../types/auth';

const supabase = createClient(
  import.meta.env.VITE_SUPABASE_URL!,
  import.meta.env.VITE_SUPABASE_ANON_KEY!
);

interface AuthContextType extends AuthState {
  login: (email: string, password: string) => Promise<boolean>;
  logout: () => Promise<void>;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [authState, setAuthState] = useState<AuthState>({
    user: null,
    isAuthenticated: false,
    isLoading: true,
  });

  const fetchUserProfile = async (uid: string) => {
    try {
      const { data: client } = await supabase
        .from('clients')
        .select('*')
        .eq('auth_uid', uid)
        .maybeSingle();

      if (client) {
        const fullUser: CustomUser = {
          id: client.id,
          auth_uid: client.auth_uid,
          email: client.email,
          name: client.name,
          company: client.company,
          website: client.website,
          role: 'client',
        };
        setAuthState({ user: fullUser, isAuthenticated: true, isLoading: false });
        localStorage.setItem('wemakit_user', JSON.stringify(fullUser));
        return;
      }

      const { data: designer } = await supabase
        .from('designers')
        .select('*')
        .eq('auth_uid', uid)
        .maybeSingle();

      if (designer) {
        const fullUser: CustomUser = {
          id: designer.id,
          auth_uid: designer.auth_uid,
          email: designer.email,
          name: designer.name,
          avatar: designer.avatar,
          capacity: designer.capacity,
          role: 'designer',
        };
        setAuthState({ user: fullUser, isAuthenticated: true, isLoading: false });
        localStorage.setItem('wemakit_user', JSON.stringify(fullUser));
        return;
      }

      const { data: admin } = await supabase
        .from('admins')
        .select('*')
        .eq('auth_uid', uid)
        .maybeSingle();

      if (admin) {
        const fullUser: CustomUser = {
          id: admin.id,
          auth_uid: admin.auth_uid,
          email: admin.email,
          name: admin.name,
          role: 'admin',
        };
        setAuthState({ user: fullUser, isAuthenticated: true, isLoading: false });
        localStorage.setItem('wemakit_user', JSON.stringify(fullUser));
        return;
      }

      console.error('No matching profile found for UID:', uid);
      await logout();
    } catch (err) {
      console.error('Error fetching user profile:', err);
      await logout();
    }
  };

  const fetchUserSession = async () => {
    const { data: { session }, error } = await supabase.auth.getSession();
    const user = session?.user;

    if (error || !user?.id) {
      console.error('No valid session found:', error);
      setAuthState({ user: null, isAuthenticated: false, isLoading: false });
      return;
    }

    await fetchUserProfile(user.id);
  };

  useEffect(() => {
    const cached = localStorage.getItem('wemakit_user');
    if (cached) {
      setAuthState({ user: JSON.parse(cached), isAuthenticated: true, isLoading: true });
    }

    fetchUserSession();

    const { data: listener } = supabase.auth.onAuthStateChange((event) => {
      if (event === 'SIGNED_IN' || event === 'TOKEN_REFRESHED') {
        fetchUserSession();
      } else if (event === 'SIGNED_OUT') {
        setAuthState({ user: null, isAuthenticated: false, isLoading: false });
        localStorage.removeItem('wemakit_user');
      }
    });

    return () => {
      listener.subscription.unsubscribe();
    };
  }, []);

  const login = async (email: string, password: string) => {
    setAuthState(prev => ({ ...prev, isLoading: true }));
    const { error } = await supabase.auth.signInWithPassword({ email, password });

    if (error) {
      console.error('Login error:', error);
      setAuthState(prev => ({ ...prev, isLoading: false }));
      return false;
    }

    await fetchUserSession();
    return true;
  };

  const logout = async () => {
    await supabase.auth.signOut();
    localStorage.clear();
    sessionStorage.clear();
    setAuthState({ user: null, isAuthenticated: false, isLoading: false });
  };

  return (
    <AuthContext.Provider value={{ ...authState, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) throw new Error('useAuth must be used within an AuthProvider');
  return context;
};
