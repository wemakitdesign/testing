import React, { useState, useEffect } from 'react';
import { useAuth } from '../../../context/AuthContext';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '../../../components/ui/card';
import { Button } from '../../../components/ui/button';
import { Input } from '../../../components/ui/input';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '../../../components/ui/tabs';
import { StatusBadge } from '../../../components/ui/status-badge';
import { Avatar, AvatarFallback, AvatarImage } from '../../../components/ui/avatar';
import { 
  Search, 
  Plus, 
  MoreHorizontal, 
  Mail, 
  Calendar, 
  User, 
  UserCheck, 
  Shield, 
  Ban, 
  Check, 
  X, 
  Edit, 
  Trash2, 
  Download,
  Clock
} from 'lucide-react';
import { supabase } from '../../../lib/supabaseClient';

interface UserData {
  id: string;
  name: string;
  email: string;
  avatar?: string;
  role: 'client' | 'designer' | 'admin';
  status: 'active' | 'inactive' | 'pending';
  lastActive?: string;
  createdAt: string;
  projectsCount?: number;
  company?: string;
}

const UserManagement = () => {
  const { user } = useAuth();
  const [searchQuery, setSearchQuery] = useState('');
  const [roleFilter, setRoleFilter] = useState('all');
  const [statusFilter, setStatusFilter] = useState('all');
  const [users, setUsers] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  
  useEffect(() => {
    const fetchUsers = async () => {
      setLoading(true);
      // Fetch all users from clients, designers, admins
      const { data: clients } = await supabase.from('clients').select('*');
      const { data: designers } = await supabase.from('designers').select('*');
      const { data: admins } = await supabase.from('users').select('*').eq('role', 'admin');
      setUsers([...(clients || []), ...(designers || []), ...(admins || [])]);
      setLoading(false);
    };
    fetchUsers();
  }, []);
  
  // Filter users
  const filteredUsers = users.filter(user => {
    const searchMatch = 
      user.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      user.email.toLowerCase().includes(searchQuery.toLowerCase()) ||
      (user.company && user.company.toLowerCase().includes(searchQuery.toLowerCase()));
    
    const roleMatch = roleFilter === 'all' || user.role === roleFilter;
    const statusMatch = statusFilter === 'all' || user.status === statusFilter;
    
    return searchMatch && roleMatch && statusMatch;
  });
  
  // Filter users by role for tabs
  const clients = filteredUsers.filter(user => user.role === 'client');
  const designers = filteredUsers.filter(user => user.role === 'designer');
  const admins = filteredUsers.filter(user => user.role === 'admin');
  
  // Format date
  const formatDate = (dateString?: string) => {
    if (!dateString) return 'Never';
    
    const date = new Date(dateString);
    return date.toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'short',
      day: 'numeric'
    });
  };
  
  // Format time ago
  const getTimeAgo = (dateString?: string) => {
    if (!dateString) return 'Never';
    
    const date = new Date(dateString);
    const now = new Date();
    const diffMs = now.getTime() - date.getTime();
    const diffMins = Math.floor(diffMs / (1000 * 60));
    
    if (diffMins < 60) {
      return `${diffMins} minutes ago`;
    } else if (diffMins < 24 * 60) {
      const hours = Math.floor(diffMins / 60);
      return `${hours} hours ago`;
    } else {
      const days = Math.floor(diffMins / (60 * 24));
      return `${days} days ago`;
    }
  };
  
  // Status badge variant
  const getStatusBadgeVariant = (status: string) => {
    switch (status) {
      case 'active': return 'success';
      case 'inactive': return 'cancelled';
      case 'pending': return 'pending';
      default: return 'default';
    }
  };
  
  // Status badge label
  const getStatusBadgeLabel = (status: string) => {
    switch (status) {
      case 'active': return 'Active';
      case 'inactive': return 'Inactive';
      case 'pending': return 'Pending';
      default: return status;
    }
  };
  
  // Role badge variant
  const getRoleBadgeVariant = (role: string) => {
    switch (role) {
      case 'client': return 'default';
      case 'designer': return 'info';
      case 'admin': return 'warning';
      default: return 'default';
    }
  };
  
  // Role badge label and icon
  const getRoleBadgeWithIcon = (role: string) => {
    switch (role) {
      case 'client':
        return (
          <div className="flex items-center gap-1 bg-blue-100 text-blue-800 px-2 py-0.5 rounded-full text-xs">
            <User className="h-3 w-3" />
            <span>Client</span>
          </div>
        );
      case 'designer':
        return (
          <div className="flex items-center gap-1 bg-purple-100 text-purple-800 px-2 py-0.5 rounded-full text-xs">
            <UserCheck className="h-3 w-3" />
            <span>Designer</span>
          </div>
        );
      case 'admin':
        return (
          <div className="flex items-center gap-1 bg-orange-100 text-orange-800 px-2 py-0.5 rounded-full text-xs">
            <Shield className="h-3 w-3" />
            <span>Admin</span>
          </div>
        );
      default:
        return null;
    }
  };
  
  return (
    <div className="space-y-8">
      <div>
        <h1 className="text-3xl font-bold tracking-tight">User Management</h1>
        <p className="text-muted-foreground">Manage clients, designers, and administrators</p>
      </div>
      
      <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
        <div className="flex flex-col md:flex-row gap-4 md:items-center w-full md:w-auto">
          <div className="relative w-full md:w-64">
            <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
            <Input
              type="search"
              placeholder="Search users..."
              className="w-full pl-8"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
          </div>
          
          <div className="flex flex-col md:flex-row gap-2 w-full md:w-auto">
            <select
              className="flex h-10 w-full md:w-[140px] rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
              value={roleFilter}
              onChange={(e) => setRoleFilter(e.target.value)}
            >
              <option value="all">All Roles</option>
              <option value="client">Clients</option>
              <option value="designer">Designers</option>
              <option value="admin">Admins</option>
            </select>
            
            <select
              className="flex h-10 w-full md:w-[140px] rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
              value={statusFilter}
              onChange={(e) => setStatusFilter(e.target.value)}
            >
              <option value="all">All Statuses</option>
              <option value="active">Active</option>
              <option value="inactive">Inactive</option>
              <option value="pending">Pending</option>
            </select>
          </div>
        </div>
        
        <div className="flex items-center gap-2">
          <Button variant="outline">
            <Download className="h-4 w-4 mr-2" /> Export
          </Button>
          <Button>
            <Plus className="h-4 w-4 mr-2" /> Add User
          </Button>
        </div>
      </div>
      
      <Tabs defaultValue="all" className="space-y-6">
        <TabsList>
          <TabsTrigger value="all">All Users ({filteredUsers.length})</TabsTrigger>
          <TabsTrigger value="clients">Clients ({clients.length})</TabsTrigger>
          <TabsTrigger value="designers">Designers ({designers.length})</TabsTrigger>
          <TabsTrigger value="admins">Admins ({admins.length})</TabsTrigger>
        </TabsList>
        
        <TabsContent value="all">
          <UserTable users={filteredUsers} />
        </TabsContent>
        
        <TabsContent value="clients">
          <UserTable users={clients} />
        </TabsContent>
        
        <TabsContent value="designers">
          <UserTable users={designers} />
        </TabsContent>
        
        <TabsContent value="admins">
          <UserTable users={admins} />
        </TabsContent>
      </Tabs>
      
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <Card>
          <CardHeader>
            <CardTitle>User Statistics</CardTitle>
            <CardDescription>Overview of user accounts</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <div className="flex items-center">
                  <User className="h-5 w-5 mr-2 text-blue-500" />
                  <span>Total Clients</span>
                </div>
                <span className="text-2xl font-bold">{users.filter(u => u.role === 'client').length}</span>
              </div>
              
              <div className="flex items-center justify-between">
                <div className="flex items-center">
                  <UserCheck className="h-5 w-5 mr-2 text-purple-500" />
                  <span>Total Designers</span>
                </div>
                <span className="text-2xl font-bold">{users.filter(u => u.role === 'designer').length}</span>
              </div>
              
              <div className="flex items-center justify-between">
                <div className="flex items-center">
                  <Shield className="h-5 w-5 mr-2 text-orange-500" />
                  <span>Total Admins</span>
                </div>
                <span className="text-2xl font-bold">{users.filter(u => u.role === 'admin').length}</span>
              </div>
              
              <div className="pt-2 border-t mt-4">
                <div className="flex items-center justify-between">
                  <span className="text-muted-foreground">Active Users</span>
                  <span className="font-medium">{users.filter(u => u.status === 'active').length}</span>
                </div>
                
                <div className="flex items-center justify-between mt-2">
                  <span className="text-muted-foreground">Inactive Users</span>
                  <span className="font-medium">{users.filter(u => u.status === 'inactive').length}</span>
                </div>
                
                <div className="flex items-center justify-between mt-2">
                  <span className="text-muted-foreground">Pending Users</span>
                  <span className="font-medium">{users.filter(u => u.status === 'pending').length}</span>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>
        
        <Card>
          <CardHeader>
            <CardTitle>Recently Active</CardTitle>
            <CardDescription>Users with recent activity</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {users
                .filter(u => u.lastActive)
                .sort((a, b) => new Date(b.lastActive || '').getTime() - new Date(a.lastActive || '').getTime())
                .slice(0, 5)
                .map(user => (
                  <div key={user.id} className="flex items-center justify-between">
                    <div className="flex items-center">
                      <Avatar className="h-8 w-8 mr-2">
                        <AvatarImage src={user.avatar} alt={user.name} />
                        <AvatarFallback>{user.name.charAt(0)}</AvatarFallback>
                      </Avatar>
                      <div>
                        <div className="font-medium">{user.name}</div>
                        <div className="text-xs text-muted-foreground">{user.email}</div>
                      </div>
                    </div>
                    <div className="text-xs text-muted-foreground">
                      {getTimeAgo(user.lastActive)}
                    </div>
                  </div>
                ))}
            </div>
          </CardContent>
        </Card>
        
        <Card>
          <CardHeader>
            <CardTitle>Pending Approvals</CardTitle>
            <CardDescription>Users awaiting account activation</CardDescription>
          </CardHeader>
          <CardContent>
            {users.filter(u => u.status === 'pending').length > 0 ? (
              <div className="space-y-4">
                {users
                  .filter(u => u.status === 'pending')
                  .map(user => (
                    <div key={user.id} className="p-3 border rounded-md">
                      <div className="flex justify-between items-start">
                        <div className="flex items-center">
                          <Avatar className="h-8 w-8 mr-2">
                            <AvatarImage src={user.avatar} alt={user.name} />
                            <AvatarFallback>{user.name.charAt(0)}</AvatarFallback>
                          </Avatar>
                          <div>
                            <div className="font-medium">{user.name}</div>
                            <div className="text-xs text-muted-foreground">{user.email}</div>
                            <div className="text-xs text-muted-foreground mt-1">
                              Registered: {formatDate(user.createdAt)}
                            </div>
                          </div>
                        </div>
                        {getRoleBadgeWithIcon(user.role)}
                      </div>
                      <div className="flex items-center gap-2 mt-3">
                        <Button variant="outline" size="sm" className="w-full bg-muted/20 justify-center">
                          <X className="h-4 w-4 mr-1 text-destructive" /> Reject
                        </Button>
                        <Button size="sm" className="w-full justify-center">
                          <Check className="h-4 w-4 mr-1" /> Approve
                        </Button>
                      </div>
                    </div>
                  ))}
              </div>
            ) : (
              <div className="text-center py-8">
                <Check className="h-8 w-8 text-green-500 mx-auto mb-2" />
                <p className="text-muted-foreground">No pending approvals</p>
              </div>
            )}
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

// User table component
const UserTable = ({ users }: { users: UserData[] }) => {
  return (
    <Card>
      <CardContent className="p-0">
        <div className="rounded-md border">
          <div className="grid grid-cols-12 bg-muted/50 p-4 text-sm font-medium">
            <div className="col-span-3">Name</div>
            <div className="col-span-2">Role</div>
            <div className="col-span-2">Status</div>
            <div className="col-span-2">Last Active</div>
            <div className="col-span-2">Joined</div>
            <div className="col-span-1 text-right">Actions</div>
          </div>
          <div className="divide-y">
            {users.length > 0 ? (
              users.map(user => (
                <div key={user.id} className="grid grid-cols-12 p-4 text-sm items-center">
                  <div className="col-span-3">
                    <div className="flex items-center">
                      <Avatar className="h-8 w-8 mr-2">
                        <AvatarImage src={user.avatar} alt={user.name} />
                        <AvatarFallback>{user.name.charAt(0)}</AvatarFallback>
                      </Avatar>
                      <div>
                        <div className="font-medium">{user.name}</div>
                        <div className="flex items-center text-xs text-muted-foreground">
                          <Mail className="h-3 w-3 mr-1" /> {user.email}
                        </div>
                      </div>
                    </div>
                  </div>
                  <div className="col-span-2">
                    <div className="capitalize">{user.role}</div>
                    {user.projectsCount !== undefined && (
                      <div className="text-xs text-muted-foreground">
                        {user.projectsCount} {user.projectsCount === 1 ? 'project' : 'projects'}
                      </div>
                    )}
                    {user.company && (
                      <div className="text-xs text-muted-foreground">
                        {user.company}
                      </div>
                    )}
                  </div>
                  <div className="col-span-2">
                    <StatusBadge 
                      variant={
                        user.status === 'active' 
                          ? 'success' 
                          : user.status === 'inactive' 
                            ? 'cancelled'
                            : 'pending'
                      }
                    >
                      {user.status.charAt(0).toUpperCase() + user.status.slice(1)}
                    </StatusBadge>
                  </div>
                  <div className="col-span-2 text-sm text-muted-foreground">
                    {user.lastActive ? (
                      <div className="flex items-center">
                        <Clock className="h-3.5 w-3.5 mr-1" />
                        {new Date(user.lastActive).toLocaleDateString()}
                      </div>
                    ) : (
                      <span>Never</span>
                    )}
                  </div>
                  <div className="col-span-2 text-sm text-muted-foreground">
                    <div className="flex items-center">
                      <Calendar className="h-3.5 w-3.5 mr-1" />
                      {new Date(user.createdAt).toLocaleDateString()}
                    </div>
                  </div>
                  <div className="col-span-1 flex justify-end gap-1">
                    <Button variant="ghost" size="sm" className="h-8 w-8 p-0">
                      <span className="sr-only">Edit</span>
                      <Edit className="h-4 w-4" />
                    </Button>
                    <Button variant="ghost" size="sm" className="h-8 w-8 p-0">
                      <span className="sr-only">Delete</span>
                      <Trash2 className="h-4 w-4" />
                    </Button>
                  </div>
                </div>
              ))
            ) : (
              <div className="p-8 text-center">
                <p className="text-muted-foreground">No users found</p>
                <p className="text-sm text-muted-foreground mt-1">
                  Try adjusting your filters or create a new user
                </p>
                <Button className="mt-4">
                  <Plus className="h-4 w-4 mr-2" /> Add User
                </Button>
              </div>
            )}
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default UserManagement;
