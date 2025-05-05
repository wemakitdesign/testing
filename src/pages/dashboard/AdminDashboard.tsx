import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { StatusBadge } from '@/components/ui/status-badge';
import { ActionCard } from '@/components/ui/action-card';
import { 
  BarChart3, 
  Users, 
  CreditCard, 
  Kanban, 
  ArrowUpRight,
  ArrowDownRight,
  Clock
} from 'lucide-react';
import { supabase } from '@/lib/supabaseClient';
import { useAuth } from '@/context/AuthContext';

const AdminDashboard: React.FC = () => {
  const { user } = useAuth();

  const [kpiData, setKpiData] = useState({
    activeProjects: 0,
    activeProjectsChange: 0,
    designers: 0,
    designersChange: 0,
    clients: 0,
    clientsChange: 0,
    revenue: 0,
    revenueChange: 0,
  });

  const [recentActivity, setRecentActivity] = useState<
    { id: string; action: string; subject: string; user: string; time: string }[]
  >([]);

  useEffect(() => {
    const fetchDashboardData = async () => {
      try {
        const { data: tasks } = await supabase.from('tasks').select('*');
        const { data: designers } = await supabase.from('designers').select('*');
        const { data: clients } = await supabase.from('clients').select('*');

        const activeProjects = (tasks || []).filter(t => t.status !== 'completed').length;
        const activeDesigners = (designers || []).length;
        const activeClients = (clients || []).length;

        setKpiData(prev => ({
          ...prev,
          activeProjects,
          designers: activeDesigners,
          clients: activeClients,
          // Revenue dan Change mockup sementara
          revenue: 48250,
          activeProjectsChange: 5,
          designersChange: 2,
          clientsChange: 4,
          revenueChange: 3,
        }));

        setRecentActivity([
          {
            id: '1',
            action: 'Task Created',
            subject: 'Landing Page Redesign',
            user: 'Client A',
            time: '2 hours ago'
          },
          {
            id: '2',
            action: 'Designer Assigned',
            subject: 'Website Revamp',
            user: 'Designer B',
            time: '4 hours ago'
          },
          {
            id: '3',
            action: 'Project Completed',
            subject: 'Logo Revamp',
            user: 'Designer C',
            time: '1 day ago'
          },
          {
            id: '4',
            action: 'Payment Received',
            subject: '$2,500 for Branding',
            user: 'Client X',
            time: '2 days ago'
          },
        ]);
      } catch (error) {
        console.error('Error loading dashboard data', error);
      }
    };

    fetchDashboardData();
  }, []);

  const firstName = user?.name?.split(' ')[0] || '';

  return (
    <div className="space-y-8">
      <div>
        <h1 className="text-3xl font-bold tracking-tight">
          Welcome back, {firstName}
        </h1>
        <p className="text-muted-foreground">Here's an overview of your design agency.</p>
      </div>

      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        {/* Active Projects */}
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-base">Active Projects</CardTitle>
            <CardDescription>Current design works</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="flex items-center justify-between">
              <div className="text-2xl font-bold">{kpiData.activeProjects}</div>
              <div className={`flex items-center text-xs ${kpiData.activeProjectsChange >= 0 ? 'text-success' : 'text-destructive'}`}>
                {kpiData.activeProjectsChange >= 0 ? <ArrowUpRight className="h-3 w-3 mr-1" /> : <ArrowDownRight className="h-3 w-3 mr-1" />}
                {Math.abs(kpiData.activeProjectsChange)}%
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Designers */}
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-base">Active Designers</CardTitle>
            <CardDescription>Team members</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="flex items-center justify-between">
              <div className="text-2xl font-bold">{kpiData.designers}</div>
              <div className={`flex items-center text-xs ${kpiData.designersChange >= 0 ? 'text-success' : 'text-destructive'}`}>
                {kpiData.designersChange >= 0 ? <ArrowUpRight className="h-3 w-3 mr-1" /> : <ArrowDownRight className="h-3 w-3 mr-1" />}
                {Math.abs(kpiData.designersChange)}%
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Clients */}
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-base">Active Clients</CardTitle>
            <CardDescription>Customer accounts</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="flex items-center justify-between">
              <div className="text-2xl font-bold">{kpiData.clients}</div>
              <div className={`flex items-center text-xs ${kpiData.clientsChange >= 0 ? 'text-success' : 'text-destructive'}`}>
                {kpiData.clientsChange >= 0 ? <ArrowUpRight className="h-3 w-3 mr-1" /> : <ArrowDownRight className="h-3 w-3 mr-1" />}
                {Math.abs(kpiData.clientsChange)}%
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Revenue */}
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-base">Monthly Revenue</CardTitle>
            <CardDescription>Current month</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="flex items-center justify-between">
              <div className="text-2xl font-bold">${kpiData.revenue.toLocaleString()}</div>
              <div className={`flex items-center text-xs ${kpiData.revenueChange >= 0 ? 'text-success' : 'text-destructive'}`}>
                {kpiData.revenueChange >= 0 ? <ArrowUpRight className="h-3 w-3 mr-1" /> : <ArrowDownRight className="h-3 w-3 mr-1" />}
                {Math.abs(kpiData.revenueChange)}%
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Quick Actions */}
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
            icon={<Users className="h-6 w-6 text-blue-500" />}
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

      {/* Recent Activity */}
      <div>
        <h2 className="text-xl font-semibold mb-4">Recent Activity</h2>
        <Card>
          <CardContent className="p-4">
            <div className="divide-y">
              {recentActivity.map((activity, idx) => (
                <div key={activity.id} className={`py-3 ${idx === 0 ? 'pt-0' : ''} ${idx === recentActivity.length - 1 ? 'pb-0' : ''}`}>
                  <div className="flex items-start gap-3">
                    <div className="rounded-full p-1.5 bg-muted">
                      <Clock className="h-4 w-4 text-muted-foreground" />
                    </div>
                    <div>
                      <div className="flex items-center gap-2">
                        <StatusBadge variant="info">{activity.action}</StatusBadge>
                        <span className="text-xs text-muted-foreground">{activity.time}</span>
                      </div>
                      <p className="text-sm font-medium mt-1">{activity.subject}</p>
                      <p className="text-xs text-muted-foreground">by {activity.user}</p>
                    </div>
                  </div>
                </div>
              ))}
            </div>
            <div className="mt-4 text-center">
              <Link to="/dashboard/activity" className="text-xs text-wemakit-purple hover:underline">
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
