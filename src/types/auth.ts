export interface CustomUser {
  id: string;
  auth_uid: string;
  email: string;
  name: string;
  company?: string;
  website?: string;
  avatar?: string;
  capacity?: number;
  role: 'client' | 'designer' | 'admin';
}

export interface AuthState {
  user: CustomUser | null;
  isAuthenticated: boolean;
  isLoading: boolean;
}
