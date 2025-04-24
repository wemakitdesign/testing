
import React, { useState } from 'react';
import { useAuth } from '../../../context/AuthContext';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '../../../components/ui/card';
import { Button } from '../../../components/ui/button';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '../../../components/ui/tabs';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '../../../components/ui/select';
import { 
  ArrowDown, 
  ArrowUp, 
  BarChart3, 
  Calendar, 
  Download, 
  LineChart, 
  PieChart, 
  TrendingUp, 
  Users,
  DollarSign,
  Clock,
  CheckCircle2,
  FileText
} from 'lucide-react';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, LineChart as RechartsLineChart, Line, PieChart as RechartsPieChart, Pie, Cell, Legend } from 'recharts';

// Mock data for charts
const revenueData = [
  { month: 'Jan', revenue: 24000 },
  { month: 'Feb', revenue: 26000 },
  { month: 'Mar', revenue: 32000 },
  { month: 'Apr', revenue: 28000 },
  { month: 'May', revenue: 36000 },
  { month: 'Jun', revenue: 42000 },
  { month: 'Jul', revenue: 38000 },
  { month: 'Aug', revenue: 44000 },
  { month: 'Sep', revenue: 48000 },
  { month: 'Oct', revenue: 52000 },
  { month: 'Nov', revenue: 45000 },
  { month: 'Dec', revenue: 58000 },
];

const projectsData = [
  { month: 'Jan', completed: 12, new: 15 },
  { month: 'Feb', completed: 14, new: 16 },
  { month: 'Mar', completed: 16, new: 20 },
  { month: 'Apr', completed: 19, new: 18 },
  { month: 'May', completed: 15, new: 21 },
  { month: 'Jun', completed: 20, new: 22 },
  { month: 'Jul', completed: 22, new: 20 },
  { month: 'Aug', completed: 24, new: 25 },
  { month: 'Sep', completed: 26, new: 27 },
  { month: 'Oct', completed: 23, new: 26 },
  { month: 'Nov', completed: 25, new: 24 },
  { month: 'Dec', completed: 28, new: 30 },
];

const clientRetentionData = [
  { name: 'Retained Clients', value: 75 },
  { name: 'New Clients', value: 15 },
  { name: 'Lost Clients', value: 10 },
];

const projectTypeData = [
  { name: 'Website Design', value: 35 },
  { name: 'Logo Design', value: 20 },
  { name: 'Branding', value: 15 },
  { name: 'Mobile UI', value: 18 },
  { name: 'Print Design', value: 12 },
];

const COLORS = ['#9b87f5', '#38bdf8', '#10b981', '#fb923c', '#f43f5e'];

const Analytics = () => {
  const { user } = useAuth();
  const [timeRange, setTimeRange] = useState('year');
  
  // Top metrics
  const topMetrics = [
    {
      title: 'Total Revenue',
      value: '$473,000',
      change: '+12.5%',
      trend: 'up',
      icon: <DollarSign className="h-5 w-5" />,
      color: 'bg-green-500',
    },
    {
      title: 'Active Projects',
      value: '42',
      change: '+8.2%',
      trend: 'up',
      icon: <FileText className="h-5 w-5" />,
      color: 'bg-blue-500',
    },
    {
      title: 'Completed Projects',
      value: '245',
      change: '+15.3%',
      trend: 'up',
      icon: <CheckCircle2 className="h-5 w-5" />,
      color: 'bg-purple-500',
    },
    {
      title: 'Average Completion Time',
      value: '12.5 days',
      change: '-2.3%',
      trend: 'down',
      icon: <Clock className="h-5 w-5" />,
      color: 'bg-orange-500',
    },
  ];
  
  // Client acquisition channels
  const acquisitionData = [
    { name: 'Referrals', value: 40 },
    { name: 'Organic Search', value: 25 },
    { name: 'Social Media', value: 15 },
    { name: 'Paid Ads', value: 12 },
    { name: 'Direct', value: 8 },
  ];
  
  // Designer productivity
  const designerData = [
    { name: 'Jane Designer', projects: 32, clients: 18, revenue: 85000 },
    { name: 'Mark Visual', projects: 28, clients: 15, revenue: 72000 },
    { name: 'Sarah Creative', projects: 24, clients: 12, revenue: 64000 },
    { name: 'Tom Graphic', projects: 22, clients: 10, revenue: 58000 },
  ];
  
  // Format currency
  const formatCurrency = (value: number) => {
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'USD',
      minimumFractionDigits: 0,
      maximumFractionDigits: 0,
    }).format(value);
  };
  
  return (
    <div className="space-y-8">
      <div>
        <h1 className="text-3xl font-bold tracking-tight">Analytics</h1>
        <p className="text-muted-foreground">Business insights and performance metrics</p>
      </div>
      
      <div className="flex justify-between items-center">
        <Select value={timeRange} onValueChange={setTimeRange}>
          <SelectTrigger className="w-[180px]">
            <SelectValue placeholder="Time Range" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="month">Last Month</SelectItem>
            <SelectItem value="quarter">Last Quarter</SelectItem>
            <SelectItem value="year">Last Year</SelectItem>
            <SelectItem value="all">All Time</SelectItem>
          </SelectContent>
        </Select>
        
        <Button variant="outline">
          <Download className="h-4 w-4 mr-2" /> Export Report
        </Button>
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {topMetrics.map((metric, index) => (
          <Card key={index}>
            <CardContent className="p-6">
              <div className="flex justify-between items-start">
                <div>
                  <p className="text-sm text-muted-foreground">{metric.title}</p>
                  <p className="text-3xl font-bold">{metric.value}</p>
                </div>
                <div className={`rounded-full p-2 ${metric.color}`}>
                  {metric.icon}
                </div>
              </div>
              <div className="flex items-center mt-2">
                {metric.trend === 'up' ? (
                  <ArrowUp className="h-4 w-4 text-green-500 mr-1" />
                ) : (
                  <ArrowDown className="h-4 w-4 text-red-500 mr-1" />
                )}
                <span className={metric.trend === 'up' ? 'text-green-500' : 'text-red-500'}>
                  {metric.change}
                </span>
                <span className="text-xs text-muted-foreground ml-1">vs previous period</span>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
      
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <Card>
          <CardHeader>
            <CardTitle>Revenue Trends</CardTitle>
            <CardDescription>Monthly revenue performance</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="h-[300px]">
              <ResponsiveContainer width="100%" height="100%">
                <BarChart
                  data={revenueData}
                  margin={{ top: 20, right: 30, left: 20, bottom: 5 }}
                >
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="month" />
                  <YAxis 
                    tickFormatter={(value) => `$${value / 1000}k`}
                  />
                  <Tooltip 
                    formatter={(value) => [`$${value}`, 'Revenue']}
                    labelFormatter={(label) => `Month: ${label}`}
                  />
                  <Bar dataKey="revenue" fill="#9b87f5" radius={[4, 4, 0, 0]} />
                </BarChart>
              </ResponsiveContainer>
            </div>
          </CardContent>
        </Card>
        
        <Card>
          <CardHeader>
            <CardTitle>Project Metrics</CardTitle>
            <CardDescription>New vs completed projects</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="h-[300px]">
              <ResponsiveContainer width="100%" height="100%">
                <RechartsLineChart
                  data={projectsData}
                  margin={{ top: 20, right: 30, left: 20, bottom: 5 }}
                >
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="month" />
                  <YAxis />
                  <Tooltip />
                  <Legend />
                  <Line 
                    type="monotone" 
                    dataKey="new" 
                    stroke="#10b981" 
                    activeDot={{ r: 8 }} 
                    name="New Projects"
                  />
                  <Line 
                    type="monotone" 
                    dataKey="completed" 
                    stroke="#9b87f5" 
                    name="Completed Projects"
                  />
                </RechartsLineChart>
              </ResponsiveContainer>
            </div>
          </CardContent>
        </Card>
      </div>
      
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <Card>
          <CardHeader>
            <CardTitle>Client Retention</CardTitle>
            <CardDescription>Client status distribution</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="h-[300px]">
              <ResponsiveContainer width="100%" height="100%">
                <RechartsPieChart>
                  <Pie
                    data={clientRetentionData}
                    cx="50%"
                    cy="50%"
                    innerRadius={60}
                    outerRadius={90}
                    paddingAngle={2}
                    dataKey="value"
                    label={({name, percent}) => `${name}: ${(percent * 100).toFixed(0)}%`}
                  >
                    {clientRetentionData.map((entry, index) => (
                      <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                    ))}
                  </Pie>
                  <Tooltip 
                    formatter={(value) => [`${value}%`, 'Percentage']}
                  />
                </RechartsPieChart>
              </ResponsiveContainer>
            </div>
          </CardContent>
        </Card>
        
        <Card>
          <CardHeader>
            <CardTitle>Project Types</CardTitle>
            <CardDescription>Distribution by design category</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="h-[300px]">
              <ResponsiveContainer width="100%" height="100%">
                <RechartsPieChart>
                  <Pie
                    data={projectTypeData}
                    cx="50%"
                    cy="50%"
                    innerRadius={60}
                    outerRadius={90}
                    paddingAngle={2}
                    dataKey="value"
                    label={({name, percent}) => `${name}: ${(percent * 100).toFixed(0)}%`}
                  >
                    {projectTypeData.map((entry, index) => (
                      <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                    ))}
                  </Pie>
                  <Tooltip 
                    formatter={(value) => [`${value}%`, 'Percentage']}
                  />
                </RechartsPieChart>
              </ResponsiveContainer>
            </div>
          </CardContent>
        </Card>
        
        <Card>
          <CardHeader>
            <CardTitle>Client Acquisition</CardTitle>
            <CardDescription>How clients found us</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="h-[300px]">
              <ResponsiveContainer width="100%" height="100%">
                <BarChart
                  layout="vertical"
                  data={acquisitionData}
                  margin={{ top: 20, right: 30, left: 40, bottom: 5 }}
                >
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis type="number" />
                  <YAxis dataKey="name" type="category" />
                  <Tooltip />
                  <Bar dataKey="value" fill="#9b87f5" radius={[0, 4, 4, 0]} />
                </BarChart>
              </ResponsiveContainer>
            </div>
          </CardContent>
        </Card>
      </div>
      
      <Card>
        <CardHeader>
          <CardTitle>Designer Performance</CardTitle>
          <CardDescription>Key metrics by designer</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="rounded-md border">
            <div className="grid grid-cols-4 bg-muted/50 p-4 text-sm font-medium">
              <div>Designer</div>
              <div>Projects Completed</div>
              <div>Clients Served</div>
              <div>Revenue Generated</div>
            </div>
            <div className="divide-y">
              {designerData.map((designer, index) => (
                <div key={index} className="grid grid-cols-4 p-4 text-sm items-center">
                  <div className="font-medium">{designer.name}</div>
                  <div>{designer.projects}</div>
                  <div>{designer.clients}</div>
                  <div className="font-medium">{formatCurrency(designer.revenue)}</div>
                </div>
              ))}
            </div>
          </div>
        </CardContent>
      </Card>
      
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <Card>
          <CardHeader>
            <CardTitle>Monthly Active Users</CardTitle>
            <CardDescription>Client platform engagement</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="h-[250px]">
              <ResponsiveContainer width="100%" height="100%">
                <RechartsLineChart
                  data={[
                    { month: 'Jan', users: 120 },
                    { month: 'Feb', users: 132 },
                    { month: 'Mar', users: 145 },
                    { month: 'Apr', users: 160 },
                    { month: 'May', users: 178 },
                    { month: 'Jun', users: 190 },
                    { month: 'Jul', users: 205 },
                    { month: 'Aug', users: 220 },
                    { month: 'Sep', users: 215 },
                    { month: 'Oct', users: 230 },
                    { month: 'Nov', users: 245 },
                    { month: 'Dec', users: 260 },
                  ]}
                  margin={{ top: 20, right: 30, left: 20, bottom: 5 }}
                >
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="month" />
                  <YAxis />
                  <Tooltip />
                  <Line 
                    type="monotone" 
                    dataKey="users" 
                    stroke="#38bdf8" 
                    strokeWidth={2}
                    activeDot={{ r: 8 }} 
                    name="Active Users"
                  />
                </RechartsLineChart>
              </ResponsiveContainer>
            </div>
          </CardContent>
        </Card>
        
        <Card>
          <CardHeader>
            <CardTitle>Average Project Value</CardTitle>
            <CardDescription>Revenue per project type</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="h-[250px]">
              <ResponsiveContainer width="100%" height="100%">
                <BarChart
                  data={[
                    { type: 'Website', value: 8500 },
                    { type: 'Logo', value: 2500 },
                    { type: 'Branding', value: 6000 },
                    { type: 'Mobile UI', value: 5500 },
                    { type: 'Print', value: 3000 },
                  ]}
                  margin={{ top: 20, right: 30, left: 20, bottom: 5 }}
                >
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="type" />
                  <YAxis tickFormatter={(value) => `$${value/1000}k`} />
                  <Tooltip formatter={(value) => [`$${value}`, 'Average Value']} />
                  <Bar dataKey="value" fill="#f59e0b" radius={[4, 4, 0, 0]} />
                </BarChart>
              </ResponsiveContainer>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default Analytics;
