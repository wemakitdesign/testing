import React from 'react';
import { Link } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '../../components/ui/card';
import { StatusBadge } from '../../components/ui/status-badge';
import { ActionCard } from '../../components/ui/action-card';
import { 
  BarChart3, 
  Users, 
  CreditCard, 
  Kanban, 
  TrendingUp, 
  UserCog, 
  ArrowUpRight,
  ArrowDownRight,
  Clock
} from 'lucide-react';

const AdminDashboard = () => {
  const { user } = useAuth();

  // Ambil hanya nama depan tanpa embel-embel
  const firstName = user?.name?.split(" ")[0] || "";
  
  // Mock data
  const kpiData = {
    activeProjects: 12,
    activeProjectsChange: 3,
    designers: 8,
    designersChange: 1,
    clients: 24,
    clientsChange: 5,
    revenue: 48250,
    revenueChange: -2,
  };
  
  const recentActivity = [
    {
      id: '1',
      action: 'Project Created',
      subject: 'Website Redesign for Acme Corp',
      user: 'John Smith',
      time: '2 hours ago',
    },
    {
      id: '2',
      action: 'Designer Assigned',
      subject: 'Logo Design Project',
      user: 'Jane Designer',
      time: '3 hours ago',
    },
    {
      id: '3',
      action: 'Payment Received',
      subject: '$1,200.00 for Branding Package',
      user: 'Acme Corporation',
      time: '5 hours ago',
    },
    {
      id: '4',
      action: 'Project Completed',
      subject: 'Business Card Design',
      user: 'John Client',
      time: '1 day ago',
    },
  ];

  return (
    <div className="space-y-8">
      <div>
        <h1 className="text-3xl font-bold tracking-tight">
          Welcome back, {user?.name}
        </h1>
        <p className="text-muted-foreground">
          Here&apos;s an overview of your design agency.
        </p>
      </div>
      
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-base">Active Projects</CardTitle>
            <CardDescription>Current design works</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="flex items-center justify-between">
              <div className="text-2xl font-bold">{kpiData.activeProjects}</div>
              <div className={`flex items-center text-xs ${kpiData.activeProjectsChange >= 0 ? 'text-success' : 'text-destructive'}`}>
                {kpiData.activeProjectsChange >= 0 ? (
                  <ArrowUpRight className="mr-1 h-3 w-3" />
                ) : (
                  <ArrowDownRight className="mr-1 h-3 w-3" />
                )}
                {Math.abs(kpiData.activeProjectsChange)}%
              </div>
            </div>
          </CardContent>
        </Card>
        
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-base">Active Designers</CardTitle>
            <CardDescription>Team members</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="flex items-center justify-between">
              <div className="text-2xl font-bold">{kpiData.designers}</div>
              <div className={`flex items-center text-xs ${kpiData.designersChange >= 0 ? 'text-success' : 'text-destructive'}`}>
                {kpiData.designersChange >= 0 ? (
                  <ArrowUpRight className="mr-1 h-3 w-3" />
                ) : (
                  <ArrowDownRight className="mr-1 h-3 w-3" />
                )}
                {Math.abs(kpiData.designersChange)}%
              </div>
            </div>
          </CardContent>
        </Card>
        
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-base">Active Clients</CardTitle>
            <CardDescription>Customer accounts</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="flex items-center justify-between">
              <div className="text-2xl font-bold">{kpiData.clients}</div>
              <div className={`flex items-center text-xs ${kpiData.clientsChange >= 0 ? 'text-success' : 'text-destructive'}`}>
                {kpiData.clientsChange >= 0 ? (
                  <ArrowUpRight className="mr-1 h-3 w-3" />
                ) : (
                  <ArrowDownRight className="mr-1 h-3 w-3" />
                )}
                {Math.abs(kpiData.clientsChange)}%
              </div>
            </div>
          </CardContent>
        </Card>
        
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-base">Monthly Revenue</CardTitle>
            <CardDescription>Current month</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="flex items-center justify-between">
              <div className="text-2xl font-bold">${kpiData.revenue.toLocaleString()}</div>
              <div className={`flex items-center text-xs ${kpiData.revenueChange >= 0 ? 'text-success' : 'text-destructive'}`}>
                {kpiData.revenueChange >= 0 ? (
                  <ArrowUpRight className="mr-1 h-3 w-3" />
                ) : (
                  <ArrowDownRight className="mr-1 h-3 w-3" />
                )}
                {Math.abs(kpiData.revenueChange)}%
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
      
      <div>
        <h2 className="text-xl font-semibold mb-4">Quick Actions</h2>
        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
          <ActionCard
            as={Link}
            to="/dashboard/projects"
            icon={<Kanban className="h-6 w-6 text-wemakit-purple" />}
            title="Projects"
            description="Manage design projects"
            variant="purple"
          />
          
          <ActionCard
            as={Link}
            to="/dashboard/users"
            icon={<UserCog className="h-6 w-6 text-blue-500" />}
            title="User Management"
            description="Manage clients and designers"
            variant="blue"
          />
          
          <ActionCard
            as={Link}
            to="/dashboard/analytics"
            icon={<BarChart3 className="h-6 w-6 text-green-500" />}
            title="Analytics"
            description="Business insights and reports"
            variant="green"
          />
          
          <ActionCard
            as={Link}
            to="/dashboard/billing-admin"
            icon={<CreditCard className="h-6 w-6 text-orange-500" />}
            title="Billing"
            description="Manage subscriptions and payments"
            variant="orange"
          />
        </div>
      </div>
      
      <div>
        <h2 className="text-xl font-semibold mb-4">Recent Activity</h2>
        <Card>
          <CardContent className="p-4">
            <div className="divide-y">
              {recentActivity.map((activity, index) => (
                <div key={activity.id} className={`py-3 ${index === 0 ? 'pt-0' : ''} ${index === recentActivity.length - 1 ? 'pb-0' : ''}`}>
                  <div className="flex items-start gap-3">
                    <div className="rounded-full p-1.5 bg-muted">
                      <Clock className="h-4 w-4 text-muted-foreground" />
                    </div>
                    <div>
                      <div className="flex items-center gap-2">
                        <StatusBadge variant="info">
                          {activity.action}
                        </StatusBadge>
                        <span className="text-xs text-muted-foreground">
                          {activity.time}
                        </span>
                      </div>
                      <p className="text-sm font-medium mt-1">{activity.subject}</p>
                      <p className="text-xs text-muted-foreground">by {activity.user}</p>
                    </div>
                  </div>
                </div>
              ))}
            </div>
            <div className="mt-4 text-center">
              <Link 
                to="/dashboard/activity"
                className="text-xs text-wemakit-purple hover:underline"
              >
                View all activity
              </Link>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default AdminDashboard;
