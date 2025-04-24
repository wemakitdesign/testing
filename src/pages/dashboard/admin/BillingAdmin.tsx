
import React, { useState } from 'react';
import { useAuth } from '../../../context/AuthContext';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '../../../components/ui/card';
import { Button } from '../../../components/ui/button';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '../../../components/ui/tabs';
import { StatusBadge } from '../../../components/ui/status-badge';
import { Badge } from '../../../components/ui/badge';
import { Input } from '../../../components/ui/input';
import { Textarea } from '../../../components/ui/textarea';
import { Label } from '../../../components/ui/label';
import { Switch } from '../../../components/ui/switch';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '../../../components/ui/select';
import { toast } from '../../../hooks/use-toast';
import { 
  Search, 
  ArrowUpDown, 
  CreditCard, 
  DollarSign, 
  Tag, 
  Calendar, 
  Plus, 
  PenSquare, 
  Ban, 
  ArrowUp, 
  ArrowDown, 
  AlertTriangle, 
  CheckCircle2, 
  RefreshCcw, 
  Download
} from 'lucide-react';

interface Subscription {
  id: string;
  planName: string;
  clientName: string;
  clientEmail: string;
  status: 'active' | 'cancelled' | 'past_due' | 'trialing';
  amount: number;
  interval: 'month' | 'year';
  startDate: string;
  nextBillingDate: string;
  cancelAtPeriodEnd?: boolean;
}

interface PaymentMethod {
  id: string;
  clientName: string;
  clientEmail: string;
  brand: string;
  last4: string;
  expMonth: number;
  expYear: number;
  isDefault: boolean;
}

interface Invoice {
  id: string;
  number: string;
  clientName: string;
  clientEmail: string;
  amount: number;
  status: 'paid' | 'open' | 'uncollectible' | 'void';
  date: string;
  dueDate: string;
}

interface Plan {
  id: string;
  name: string;
  description: string;
  price: number;
  interval: 'month' | 'year';
  features: string[];
  isPopular?: boolean;
  isArchived?: boolean;
}

const BillingAdmin = () => {
  const { user } = useAuth();
  const [searchQuery, setSearchQuery] = useState('');
  const [statusFilter, setStatusFilter] = useState('all');
  const [sortDirection, setSortDirection] = useState<'asc' | 'desc'>('desc');
  const [selectedPlan, setSelectedPlan] = useState<Plan | null>(null);
  const [isEditingPlan, setIsEditingPlan] = useState(false);
  
  // Mock subscription data
  const subscriptions: Subscription[] = [
    {
      id: 'sub_1',
      planName: 'Professional',
      clientName: 'John Client',
      clientEmail: 'john@acmecorp.com',
      status: 'active',
      amount: 199,
      interval: 'month',
      startDate: '2023-01-15T00:00:00Z',
      nextBillingDate: '2023-05-15T00:00:00Z',
    },
    {
      id: 'sub_2',
      planName: 'Basic',
      clientName: 'Sarah Smith',
      clientEmail: 'sarah@startupinc.com',
      status: 'active',
      amount: 99,
      interval: 'month',
      startDate: '2023-02-08T00:00:00Z',
      nextBillingDate: '2023-05-08T00:00:00Z',
    },
    {
      id: 'sub_3',
      planName: 'Enterprise',
      clientName: 'Robert Johnson',
      clientEmail: 'robert@techsolutions.com',
      status: 'past_due',
      amount: 499,
      interval: 'month',
      startDate: '2023-01-20T00:00:00Z',
      nextBillingDate: '2023-04-20T00:00:00Z',
    },
    {
      id: 'sub_4',
      planName: 'Professional',
      clientName: 'Emily Davis',
      clientEmail: 'emily@fashionbrand.com',
      status: 'trialing',
      amount: 0,
      interval: 'month',
      startDate: '2023-04-10T00:00:00Z',
      nextBillingDate: '2023-05-10T00:00:00Z',
    },
    {
      id: 'sub_5',
      planName: 'Enterprise',
      clientName: 'Michael Brown',
      clientEmail: 'michael@enterprise.com',
      status: 'active',
      amount: 499,
      interval: 'month',
      startDate: '2023-03-05T00:00:00Z',
      nextBillingDate: '2023-05-05T00:00:00Z',
    },
    {
      id: 'sub_6',
      planName: 'Professional',
      clientName: 'Jessica Wilson',
      clientEmail: 'jessica@agency.com',
      status: 'cancelled',
      amount: 199,
      interval: 'month',
      startDate: '2023-02-01T00:00:00Z',
      nextBillingDate: '2023-04-01T00:00:00Z',
      cancelAtPeriodEnd: true
    },
  ];
  
  // Mock payment methods
  const paymentMethods: PaymentMethod[] = [
    {
      id: 'pm_1',
      clientName: 'John Client',
      clientEmail: 'john@acmecorp.com',
      brand: 'visa',
      last4: '4242',
      expMonth: 12,
      expYear: 2025,
      isDefault: true
    },
    {
      id: 'pm_2',
      clientName: 'Sarah Smith',
      clientEmail: 'sarah@startupinc.com',
      brand: 'mastercard',
      last4: '5555',
      expMonth: 10,
      expYear: 2024,
      isDefault: true
    },
    {
      id: 'pm_3',
      clientName: 'Robert Johnson',
      clientEmail: 'robert@techsolutions.com',
      brand: 'amex',
      last4: '6789',
      expMonth: 8,
      expYear: 2023,
      isDefault: true
    },
    {
      id: 'pm_4',
      clientName: 'Emily Davis',
      clientEmail: 'emily@fashionbrand.com',
      brand: 'discover',
      last4: '1234',
      expMonth: 6,
      expYear: 2024,
      isDefault: true
    },
  ];
  
  // Mock invoices
  const invoices: Invoice[] = [
    {
      id: 'inv_1',
      number: 'INV-001',
      clientName: 'John Client',
      clientEmail: 'john@acmecorp.com',
      amount: 199,
      status: 'paid',
      date: '2023-04-15T00:00:00Z',
      dueDate: '2023-04-15T00:00:00Z'
    },
    {
      id: 'inv_2',
      number: 'INV-002',
      clientName: 'Sarah Smith',
      clientEmail: 'sarah@startupinc.com',
      amount: 99,
      status: 'paid',
      date: '2023-04-08T00:00:00Z',
      dueDate: '2023-04-08T00:00:00Z'
    },
    {
      id: 'inv_3',
      number: 'INV-003',
      clientName: 'Robert Johnson',
      clientEmail: 'robert@techsolutions.com',
      amount: 499,
      status: 'open',
      date: '2023-04-20T00:00:00Z',
      dueDate: '2023-05-04T00:00:00Z'
    },
    {
      id: 'inv_4',
      number: 'INV-004',
      clientName: 'Michael Brown',
      clientEmail: 'michael@enterprise.com',
      amount: 499,
      status: 'paid',
      date: '2023-04-05T00:00:00Z',
      dueDate: '2023-04-05T00:00:00Z'
    },
    {
      id: 'inv_5',
      number: 'INV-005',
      clientName: 'Jessica Wilson',
      clientEmail: 'jessica@agency.com',
      amount: 199,
      status: 'uncollectible',
      date: '2023-04-01T00:00:00Z',
      dueDate: '2023-04-15T00:00:00Z'
    },
    {
      id: 'inv_6',
      number: 'INV-006',
      clientName: 'John Client',
      clientEmail: 'john@acmecorp.com',
      amount: 199,
      status: 'paid',
      date: '2023-03-15T00:00:00Z',
      dueDate: '2023-03-15T00:00:00Z'
    },
    {
      id: 'inv_7',
      number: 'INV-007',
      clientName: 'Sarah Smith',
      clientEmail: 'sarah@startupinc.com',
      amount: 99,
      status: 'paid',
      date: '2023-03-08T00:00:00Z',
      dueDate: '2023-03-08T00:00:00Z'
    },
    {
      id: 'inv_8',
      number: 'INV-008',
      clientName: 'Robert Johnson',
      clientEmail: 'robert@techsolutions.com',
      amount: 499,
      status: 'void',
      date: '2023-03-20T00:00:00Z',
      dueDate: '2023-04-03T00:00:00Z'
    },
  ];
  
  // Mock plans
  const plans: Plan[] = [
    {
      id: 'plan_basic',
      name: 'Basic',
      description: 'Essential design services for small businesses',
      price: 99,
      interval: 'month',
      features: [
        '3 Design Requests',
        'Logo Design',
        'Social Media Design',
        'Business Card Design',
      ],
    },
    {
      id: 'plan_professional',
      name: 'Professional',
      description: 'Comprehensive design services for growing businesses',
      price: 199,
      interval: 'month',
      features: [
        '10 Design Requests',
        'Logo Design',
        'Social Media Design',
        'Business Card Design',
        'Priority Support',
        'Website Design',
      ],
      isPopular: true,
    },
    {
      id: 'plan_enterprise',
      name: 'Enterprise',
      description: 'Complete design solution for established businesses',
      price: 499,
      interval: 'month',
      features: [
        'Unlimited Design Requests',
        'Logo Design',
        'Social Media Design',
        'Business Card Design',
        'Priority Support',
        'Website Design',
        'Unlimited Revisions',
        'Brand Guidelines',
      ],
    },
    {
      id: 'plan_starter',
      name: 'Starter',
      description: 'Introductory plan for minimal design needs',
      price: 49,
      interval: 'month',
      features: [
        '1 Design Request',
        'Logo Design',
        'Basic Support',
      ],
      isArchived: true,
    },
  ];
  
  // Filter subscriptions
  const filteredSubscriptions = subscriptions
    .filter(subscription => {
      const searchMatch = 
        subscription.clientName.toLowerCase().includes(searchQuery.toLowerCase()) ||
        subscription.clientEmail.toLowerCase().includes(searchQuery.toLowerCase()) ||
        subscription.planName.toLowerCase().includes(searchQuery.toLowerCase());
      
      const statusMatch = statusFilter === 'all' || subscription.status === statusFilter;
      
      return searchMatch && statusMatch;
    })
    .sort((a, b) => {
      const dateA = new Date(a.nextBillingDate).getTime();
      const dateB = new Date(b.nextBillingDate).getTime();
      return sortDirection === 'asc' ? dateA - dateB : dateB - dateA;
    });
  
  // Filter invoices
  const filteredInvoices = invoices
    .filter(invoice => {
      const searchMatch = 
        invoice.clientName.toLowerCase().includes(searchQuery.toLowerCase()) ||
        invoice.clientEmail.toLowerCase().includes(searchQuery.toLowerCase()) ||
        invoice.number.toLowerCase().includes(searchQuery.toLowerCase());
      
      return searchMatch;
    })
    .sort((a, b) => {
      const dateA = new Date(a.date).getTime();
      const dateB = new Date(b.date).getTime();
      return sortDirection === 'asc' ? dateA - dateB : dateB - dateA;
    });
  
  // Status badge variant
  const getStatusBadgeVariant = (status: string) => {
    switch (status) {
      case 'active': return 'success';
      case 'cancelled': return 'cancelled';
      case 'past_due': return 'danger';
      case 'trialing': return 'info';
      case 'paid': return 'success';
      case 'open': return 'pending';
      case 'uncollectible': return 'danger';
      case 'void': return 'cancelled';
      default: return 'default';
    }
  };
  
  // Format date
  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'short',
      day: 'numeric'
    });
  };
  
  // Status label
  const getStatusLabel = (status: string) => {
    switch (status) {
      case 'active': return 'Active';
      case 'cancelled': return 'Cancelled';
      case 'past_due': return 'Past Due';
      case 'trialing': return 'Trial';
      case 'paid': return 'Paid';
      case 'open': return 'Open';
      case 'uncollectible': return 'Failed';
      case 'void': return 'Void';
      default: return status;
    }
  };
  
  // Payment method icon
  const getPaymentMethodIcon = (brand: string) => {
    switch (brand.toLowerCase()) {
      case 'visa':
        return <div className="bg-blue-500 text-white text-xs font-medium rounded px-1.5 py-0.5">VISA</div>;
      case 'mastercard':
        return <div className="bg-orange-500 text-white text-xs font-medium rounded px-1.5 py-0.5">MC</div>;
      case 'amex':
        return <div className="bg-indigo-500 text-white text-xs font-medium rounded px-1.5 py-0.5">AMEX</div>;
      case 'discover':
        return <div className="bg-gray-500 text-white text-xs font-medium rounded px-1.5 py-0.5">DISC</div>;
      default:
        return <div className="bg-gray-300 text-gray-800 text-xs font-medium rounded px-1.5 py-0.5">CARD</div>;
    }
  };
  
  // Active plans (not archived)
  const activePlans = plans.filter(plan => !plan.isArchived);
  
  // Archived plans
  const archivedPlans = plans.filter(plan => plan.isArchived);
  
  // Edit plan
  const handleEditPlan = (plan: Plan) => {
    setSelectedPlan(plan);
    setIsEditingPlan(true);
  };
  
  // Cancel edit
  const handleCancelEdit = () => {
    setSelectedPlan(null);
    setIsEditingPlan(false);
  };
  
  // Save plan changes
  const handleSavePlan = () => {
    // In a real app, you would save changes to the API
    
    toast({
      title: "Plan updated",
      description: `${selectedPlan?.name} plan has been updated successfully.`,
    });
    
    setSelectedPlan(null);
    setIsEditingPlan(false);
  };
  
  // Create a new plan
  const handleCreatePlan = () => {
    setSelectedPlan({
      id: '',
      name: 'New Plan',
      description: 'Description of the new plan',
      price: 0,
      interval: 'month',
      features: ['Feature 1', 'Feature 2'],
    });
    setIsEditingPlan(true);
  };
  
  return (
    <div className="space-y-8">
      <div>
        <h1 className="text-3xl font-bold tracking-tight">Billing Admin</h1>
        <p className="text-muted-foreground">Manage subscriptions, plans, and payments</p>
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <Card>
          <CardHeader className="pb-3">
            <CardTitle>Monthly Recurring Revenue</CardTitle>
            <CardDescription>Current MRR</CardDescription>
          </CardHeader>
          <CardContent className="space-y-1">
            <div className="flex justify-between items-center">
              <h3 className="text-3xl font-bold">$4,782</h3>
              <div className="flex items-center text-sm text-success">
                <ArrowUp className="h-4 w-4 mr-1" />
                <span>12.5%</span>
              </div>
            </div>
            <p className="text-sm text-muted-foreground">From 24 active subscriptions</p>
          </CardContent>
        </Card>
        
        <Card>
          <CardHeader className="pb-3">
            <CardTitle>Payment Collection</CardTitle>
            <CardDescription>Current month</CardDescription>
          </CardHeader>
          <CardContent className="space-y-1">
            <div className="flex justify-between items-center">
              <h3 className="text-3xl font-bold">98.2%</h3>
              <div className="flex items-center text-sm text-success">
                <ArrowUp className="h-4 w-4 mr-1" />
                <span>3.1%</span>
              </div>
            </div>
            <p className="text-sm text-muted-foreground">$97 in failed payments</p>
          </CardContent>
        </Card>
        
        <Card>
          <CardHeader className="pb-3">
            <CardTitle>New Subscriptions</CardTitle>
            <CardDescription>Last 30 days</CardDescription>
          </CardHeader>
          <CardContent className="space-y-1">
            <div className="flex justify-between items-center">
              <h3 className="text-3xl font-bold">+7</h3>
              <div className="flex items-center text-sm text-destructive">
                <ArrowDown className="h-4 w-4 mr-1" />
                <span>2.3%</span>
              </div>
            </div>
            <p className="text-sm text-muted-foreground">2 cancelled in same period</p>
          </CardContent>
        </Card>
      </div>
      
      <Tabs defaultValue="subscriptions" className="space-y-6">
        <TabsList>
          <TabsTrigger value="subscriptions">Subscriptions</TabsTrigger>
          <TabsTrigger value="plans">Subscription Plans</TabsTrigger>
          <TabsTrigger value="payment-methods">Payment Methods</TabsTrigger>
          <TabsTrigger value="invoices">Invoices</TabsTrigger>
        </TabsList>
        
        <TabsContent value="subscriptions" className="space-y-6">
          <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
            <div className="relative w-full md:w-64">
              <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
              <Input
                type="search"
                placeholder="Search subscriptions..."
                className="w-full pl-8"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
              />
            </div>
            
            <div className="flex flex-col md:flex-row gap-2 w-full md:w-auto">
              <Select 
                value={statusFilter} 
                onValueChange={setStatusFilter}
              >
                <SelectTrigger className="w-full md:w-[180px]">
                  <SelectValue placeholder="All Statuses" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All Statuses</SelectItem>
                  <SelectItem value="active">Active</SelectItem>
                  <SelectItem value="cancelled">Cancelled</SelectItem>
                  <SelectItem value="past_due">Past Due</SelectItem>
                  <SelectItem value="trialing">Trial</SelectItem>
                </SelectContent>
              </Select>
              
              <Button 
                variant="outline" 
                size="icon"
                onClick={() => setSortDirection(prev => prev === 'asc' ? 'desc' : 'asc')}
                className="h-10 w-10"
              >
                {sortDirection === 'asc' ? (
                  <ArrowUpDown className="h-4 w-4 rotate-180" />
                ) : (
                  <ArrowUpDown className="h-4 w-4" />
                )}
              </Button>
            </div>
          </div>
          
          <Card>
            <CardContent className="p-0">
              <div className="rounded-md border">
                <div className="grid grid-cols-12 bg-muted/50 p-4 text-sm font-medium">
                  <div className="col-span-3">Client</div>
                  <div className="col-span-2">Plan</div>
                  <div className="col-span-2">Price</div>
                  <div className="col-span-2">Status</div>
                  <div className="col-span-2">Next Billing</div>
                  <div className="col-span-1 text-right">Actions</div>
                </div>
                <div className="divide-y">
                  {filteredSubscriptions.length > 0 ? (
                    filteredSubscriptions.map(subscription => (
                      <div key={subscription.id} className="grid grid-cols-12 p-4 text-sm items-center">
                        <div className="col-span-3">
                          <div className="font-medium">{subscription.clientName}</div>
                          <div className="text-xs text-muted-foreground">{subscription.clientEmail}</div>
                        </div>
                        <div className="col-span-2">
                          <div className="font-medium">{subscription.planName}</div>
                          <div className="text-xs text-muted-foreground capitalize">
                            {subscription.interval}ly
                          </div>
                        </div>
                        <div className="col-span-2">
                          ${subscription.amount}
                          <span className="text-xs text-muted-foreground">/{subscription.interval}</span>
                        </div>
                        <div className="col-span-2">
                          <StatusBadge variant={getStatusBadgeVariant(subscription.status)}>
                            {getStatusLabel(subscription.status)}
                          </StatusBadge>
                          {subscription.cancelAtPeriodEnd && (
                            <div className="text-xs text-muted-foreground mt-1">
                              Cancels at period end
                            </div>
                          )}
                        </div>
                        <div className="col-span-2">
                          <div className="flex items-center">
                            <Calendar className="h-3.5 w-3.5 mr-1 text-muted-foreground" />
                            {formatDate(subscription.nextBillingDate)}
                          </div>
                        </div>
                        <div className="col-span-1 flex justify-end">
                          <Button variant="ghost" size="sm" className="h-8 w-8 p-0">
                            <span className="sr-only">More options</span>
                            <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="h-4 w-4">
                              <circle cx="12" cy="12" r="1" />
                              <circle cx="12" cy="5" r="1" />
                              <circle cx="12" cy="19" r="1" />
                            </svg>
                          </Button>
                        </div>
                      </div>
                    ))
                  ) : (
                    <div className="p-8 text-center">
                      <p className="text-muted-foreground">No subscriptions found</p>
                      <p className="text-sm text-muted-foreground mt-1">
                        Try adjusting your filters or create a new subscription
                      </p>
                    </div>
                  )}
                </div>
              </div>
            </CardContent>
          </Card>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <Card>
              <CardHeader>
                <CardTitle>Past Due Subscriptions</CardTitle>
                <CardDescription>Subscriptions with payment issues</CardDescription>
              </CardHeader>
              <CardContent>
                {subscriptions.filter(sub => sub.status === 'past_due').length > 0 ? (
                  <div className="space-y-4">
                    {subscriptions
                      .filter(sub => sub.status === 'past_due')
                      .map(subscription => (
                        <div key={subscription.id} className="p-4 border rounded-md bg-destructive/5">
                          <div className="flex justify-between items-start">
                            <div>
                              <div className="font-medium">{subscription.clientName}</div>
                              <div className="text-xs text-muted-foreground">{subscription.clientEmail}</div>
                              <div className="flex items-center mt-1 text-xs text-muted-foreground">
                                <Tag className="h-3 w-3 mr-1" />
                                {subscription.planName} (${subscription.amount}/{subscription.interval})
                              </div>
                            </div>
                            <StatusBadge variant="danger">
                              {getStatusLabel(subscription.status)}
                            </StatusBadge>
                          </div>
                          <div className="mt-3 flex items-center justify-between">
                            <div className="flex items-center text-xs text-muted-foreground">
                              <AlertTriangle className="h-3.5 w-3.5 mr-1 text-destructive" />
                              Payment failed on {formatDate(subscription.nextBillingDate)}
                            </div>
                            <Button size="sm" variant="outline" className="h-8">
                              <RefreshCcw className="h-3.5 w-3.5 mr-1" /> Retry Payment
                            </Button>
                          </div>
                        </div>
                      ))
                    }
                  </div>
                ) : (
                  <div className="text-center py-6">
                    <CheckCircle2 className="h-8 w-8 text-success mx-auto mb-2" />
                    <p className="text-muted-foreground">No past due subscriptions</p>
                  </div>
                )}
              </CardContent>
            </Card>
            
            <Card>
              <CardHeader>
                <CardTitle>Upcoming Renewals</CardTitle>
                <CardDescription>Subscriptions renewing in the next 7 days</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {subscriptions
                    .filter(sub => {
                      const nextBilling = new Date(sub.nextBillingDate);
                      const today = new Date();
                      const in7Days = new Date();
                      in7Days.setDate(today.getDate() + 7);
                      return sub.status === 'active' && nextBilling >= today && nextBilling <= in7Days;
                    })
                    .map(subscription => (
                      <div key={subscription.id} className="p-4 border rounded-md">
                        <div className="flex justify-between items-start">
                          <div>
                            <div className="font-medium">{subscription.clientName}</div>
                            <div className="text-xs text-muted-foreground">{subscription.clientEmail}</div>
                          </div>
                          <div className="text-sm font-medium">${subscription.amount}</div>
                        </div>
                        <div className="mt-2 flex justify-between items-center">
                          <div className="flex items-center text-xs text-muted-foreground">
                            <Calendar className="h-3.5 w-3.5 mr-1" />
                            Renews on {formatDate(subscription.nextBillingDate)}
                          </div>
                          <div className="text-xs font-medium capitalize">
                            {subscription.planName}
                          </div>
                        </div>
                      </div>
                    ))
                  }
                  
                  {subscriptions.filter(sub => {
                    const nextBilling = new Date(sub.nextBillingDate);
                    const today = new Date();
                    const in7Days = new Date();
                    in7Days.setDate(today.getDate() + 7);
                    return sub.status === 'active' && nextBilling >= today && nextBilling <= in7Days;
                  }).length === 0 && (
                    <div className="text-center py-6">
                      <Calendar className="h-8 w-8 text-muted-foreground mx-auto mb-2" />
                      <p className="text-muted-foreground">No upcoming renewals in the next 7 days</p>
                    </div>
                  )}
                </div>
              </CardContent>
            </Card>
          </div>
        </TabsContent>
        
        <TabsContent value="plans" className="space-y-6">
          <div className="flex items-center justify-between">
            <h2 className="text-lg font-semibold">Active Plans</h2>
            <Button onClick={handleCreatePlan}>
              <Plus className="h-4 w-4 mr-2" /> New Plan
            </Button>
          </div>
          
          {isEditingPlan && selectedPlan ? (
            <Card>
              <CardHeader>
                <CardTitle>{selectedPlan.id ? 'Edit Plan' : 'Create Plan'}</CardTitle>
                <CardDescription>
                  {selectedPlan.id ? 'Modify existing subscription plan' : 'Add a new subscription plan'}
                </CardDescription>
              </CardHeader>
              <CardContent>
                <form className="space-y-6">
                  <div className="space-y-4">
                    <div className="grid grid-cols-2 gap-4">
                      <div className="space-y-2">
                        <Label htmlFor="planName">Plan Name</Label>
                        <Input 
                          id="planName" 
                          value={selectedPlan.name}
                          onChange={(e) => setSelectedPlan({...selectedPlan, name: e.target.value})}
                        />
                      </div>
                      <div className="space-y-2">
                        <Label htmlFor="planPrice">Price</Label>
                        <Input 
                          id="planPrice" 
                          type="number"
                          value={selectedPlan.price}
                          onChange={(e) => setSelectedPlan({...selectedPlan, price: parseFloat(e.target.value)})}
                        />
                      </div>
                    </div>
                    
                    <div className="space-y-2">
                      <Label htmlFor="planDescription">Description</Label>
                      <Textarea 
                        id="planDescription"
                        value={selectedPlan.description}
                        onChange={(e) => setSelectedPlan({...selectedPlan, description: e.target.value})}
                      />
                    </div>
                    
                    <div className="grid grid-cols-2 gap-4">
                      <div className="space-y-2">
                        <Label htmlFor="planInterval">Billing Interval</Label>
                        <Select
                          value={selectedPlan.interval}
                          onValueChange={(value) => setSelectedPlan({...selectedPlan, interval: value as 'month' | 'year'})}
                        >
                          <SelectTrigger id="planInterval">
                            <SelectValue placeholder="Select an interval" />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectItem value="month">Monthly</SelectItem>
                            <SelectItem value="year">Yearly</SelectItem>
                          </SelectContent>
                        </Select>
                      </div>
                      <div className="space-y-2">
                        <Label className="mb-2 block">Options</Label>
                        <div className="flex items-center space-x-2">
                          <Switch 
                            id="isPopular"
                            checked={selectedPlan.isPopular || false}
                            onCheckedChange={(checked) => setSelectedPlan({...selectedPlan, isPopular: checked})}
                          />
                          <Label htmlFor="isPopular">Mark as Popular</Label>
                        </div>
                      </div>
                    </div>
                    
                    <div className="space-y-2">
                      <Label>Features (one per line)</Label>
                      <Textarea 
                        value={selectedPlan.features.join('\n')}
                        onChange={(e) => setSelectedPlan({...selectedPlan, features: e.target.value.split('\n')})}
                        placeholder="Add one feature per line"
                        rows={5}
                      />
                    </div>
                  </div>
                  
                  <div className="flex justify-end gap-2">
                    <Button variant="outline" type="button" onClick={handleCancelEdit}>
                      Cancel
                    </Button>
                    <Button type="button" onClick={handleSavePlan}>
                      {selectedPlan.id ? 'Update Plan' : 'Create Plan'}
                    </Button>
                  </div>
                </form>
              </CardContent>
            </Card>
          ) : (
            <>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                {activePlans.map(plan => (
                  <Card key={plan.id} className={plan.isPopular ? 'border-wemakit-purple' : ''}>
                    <CardHeader>
                      <div className="flex justify-between items-start">
                        <div>
                          <CardTitle>{plan.name}</CardTitle>
                          <CardDescription>{plan.description}</CardDescription>
                        </div>
                        <Button variant="ghost" size="sm" onClick={() => handleEditPlan(plan)}>
                          <PenSquare className="h-4 w-4" />
                        </Button>
                      </div>
                    </CardHeader>
                    <CardContent>
                      <div className="mb-4">
                        <span className="text-3xl font-bold">${plan.price}</span>
                        <span className="text-muted-foreground">/{plan.interval}</span>
                      </div>
                      
                      <div className="space-y-2">
                        {plan.features.map((feature, index) => (
                          <div key={index} className="flex items-center">
                            <CheckCircle2 className="h-4 w-4 text-wemakit-purple mr-2" />
                            <span className="text-sm">{feature}</span>
                          </div>
                        ))}
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>
              
              {archivedPlans.length > 0 && (
                <>
                  <div className="mt-8 mb-4">
                    <h2 className="text-lg font-semibold">Archived Plans</h2>
                    <p className="text-sm text-muted-foreground">These plans are no longer available for new subscriptions</p>
                  </div>
                  
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                    {archivedPlans.map(plan => (
                      <Card key={plan.id} className="bg-muted/20">
                        <CardHeader>
                          <div className="flex justify-between items-start">
                            <div>
                              <CardTitle className="flex items-center gap-2">
                                {plan.name}
                                <Badge variant="outline">Archived</Badge>
                              </CardTitle>
                              <CardDescription>{plan.description}</CardDescription>
                            </div>
                            <Button variant="ghost" size="sm" onClick={() => handleEditPlan(plan)}>
                              <PenSquare className="h-4 w-4" />
                            </Button>
                          </div>
                        </CardHeader>
                        <CardContent>
                          <div className="mb-4">
                            <span className="text-3xl font-bold">${plan.price}</span>
                            <span className="text-muted-foreground">/{plan.interval}</span>
                          </div>
                          
                          <div className="space-y-2">
                            {plan.features.map((feature, index) => (
                              <div key={index} className="flex items-center">
                                <CheckCircle2 className="h-4 w-4 text-muted-foreground mr-2" />
                                <span className="text-sm">{feature}</span>
                              </div>
                            ))}
                          </div>
                        </CardContent>
                      </Card>
                    ))}
                  </div>
                </>
              )}
            </>
          )}
        </TabsContent>
        
        <TabsContent value="payment-methods">
          <Card>
            <CardHeader>
              <CardTitle>Payment Methods</CardTitle>
              <CardDescription>Payment methods registered by clients</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="rounded-md border">
                <div className="grid grid-cols-6 bg-muted/50 p-4 text-sm font-medium">
                  <div className="col-span-2">Client</div>
                  <div className="col-span-2">Card Details</div>
                  <div className="col-span-1">Expires</div>
                  <div className="col-span-1">Status</div>
                </div>
                <div className="divide-y">
                  {paymentMethods.map(method => (
                    <div key={method.id} className="grid grid-cols-6 p-4 text-sm items-center">
                      <div className="col-span-2">
                        <div className="font-medium">{method.clientName}</div>
                        <div className="text-xs text-muted-foreground">{method.clientEmail}</div>
                      </div>
                      <div className="col-span-2 flex items-center">
                        {getPaymentMethodIcon(method.brand)}
                        <span className="ml-2">•••• {method.last4}</span>
                      </div>
                      <div className="col-span-1">
                        {method.expMonth.toString().padStart(2, '0')}/{method.expYear.toString().slice(-2)}
                      </div>
                      <div className="col-span-1">
                        {method.isDefault ? (
                          <StatusBadge variant="success">Default</StatusBadge>
                        ) : (
                          <span className="text-xs text-muted-foreground">Backup</span>
                        )}
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
        
        <TabsContent value="invoices" className="space-y-6">
          <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
            <div className="relative w-full md:w-64">
              <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
              <Input
                type="search"
                placeholder="Search invoices..."
                className="w-full pl-8"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
              />
            </div>
            
            <div className="flex items-center gap-2">
              <Button 
                variant="outline" 
                size="icon"
                onClick={() => setSortDirection(prev => prev === 'asc' ? 'desc' : 'asc')}
                className="h-10 w-10"
              >
                {sortDirection === 'asc' ? (
                  <ArrowUpDown className="h-4 w-4 rotate-180" />
                ) : (
                  <ArrowUpDown className="h-4 w-4" />
                )}
              </Button>
              
              <Button variant="outline">
                <Download className="h-4 w-4 mr-2" /> Export
              </Button>
            </div>
          </div>
          
          <Card>
            <CardContent className="p-0">
              <div className="rounded-md border">
                <div className="grid grid-cols-12 bg-muted/50 p-4 text-sm font-medium">
                  <div className="col-span-2">Invoice</div>
                  <div className="col-span-3">Client</div>
                  <div className="col-span-2">Amount</div>
                  <div className="col-span-2">Status</div>
                  <div className="col-span-2">Date</div>
                  <div className="col-span-1 text-right">Actions</div>
                </div>
                <div className="divide-y">
                  {filteredInvoices.length > 0 ? (
                    filteredInvoices.map(invoice => (
                      <div key={invoice.id} className="grid grid-cols-12 p-4 text-sm items-center">
                        <div className="col-span-2 font-medium">
                          {invoice.number}
                        </div>
                        <div className="col-span-3">
                          <div className="font-medium">{invoice.clientName}</div>
                          <div className="text-xs text-muted-foreground">{invoice.clientEmail}</div>
                        </div>
                        <div className="col-span-2 font-medium">
                          ${invoice.amount.toFixed(2)}
                        </div>
                        <div className="col-span-2">
                          <StatusBadge variant={getStatusBadgeVariant(invoice.status) as any}>
                            {getStatusLabel(invoice.status)}
                          </StatusBadge>
                        </div>
                        <div className="col-span-2">
                          <div className="flex items-center">
                            <Calendar className="h-3.5 w-3.5 mr-1 text-muted-foreground" />
                            {formatDate(invoice.date)}
                          </div>
                        </div>
                        <div className="col-span-1 flex justify-end gap-1">
                          <Button variant="ghost" size="sm" className="h-8 w-8 p-0">
                            <span className="sr-only">Download</span>
                            <Download className="h-4 w-4" />
                          </Button>
                          <Button variant="ghost" size="sm" className="h-8 w-8 p-0">
                            <span className="sr-only">More options</span>
                            <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="h-4 w-4">
                              <circle cx="12" cy="12" r="1" />
                              <circle cx="12" cy="5" r="1" />
                              <circle cx="12" cy="19" r="1" />
                            </svg>
                          </Button>
                        </div>
                      </div>
                    ))
                  ) : (
                    <div className="p-8 text-center">
                      <p className="text-muted-foreground">No invoices found</p>
                      <p className="text-sm text-muted-foreground mt-1">
                        Try adjusting your search
                      </p>
                    </div>
                  )}
                </div>
              </div>
            </CardContent>
          </Card>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <Card>
              <CardHeader>
                <CardTitle>Monthly Revenue</CardTitle>
                <CardDescription>Revenue for the current month</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div className="flex justify-between items-center">
                    <span className="text-muted-foreground">Invoiced</span>
                    <span className="font-medium">$5,240.00</span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-muted-foreground">Collected</span>
                    <span className="font-medium">$4,782.00</span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-muted-foreground">Outstanding</span>
                    <span className="font-medium">$458.00</span>
                  </div>
                  
                  <div className="h-1 w-full bg-muted rounded-full mt-2">
                    <div 
                      className="h-1 bg-wemakit-purple rounded-full" 
                      style={{ width: '91.3%' }}
                    />
                  </div>
                  <p className="text-xs text-right text-muted-foreground">91.3% collection rate</p>
                </div>
              </CardContent>
            </Card>
            
            <Card>
              <CardHeader>
                <CardTitle>Payment Issues</CardTitle>
                <CardDescription>Invoices requiring attention</CardDescription>
              </CardHeader>
              <CardContent>
                {invoices.filter(inv => inv.status === 'open' || inv.status === 'uncollectible').length > 0 ? (
                  <div className="space-y-4">
                    {invoices
                      .filter(inv => inv.status === 'open' || inv.status === 'uncollectible')
                      .map(invoice => (
                        <div key={invoice.id} className="p-3 border rounded-md">
                          <div className="flex justify-between items-start">
                            <div>
                              <div className="font-medium flex items-center gap-2">
                                {invoice.number}
                                <StatusBadge 
                                  variant={invoice.status === 'open' ? 'pending' : 'danger'} 
                                  className="ml-2"
                                >
                                  {getStatusLabel(invoice.status)}
                                </StatusBadge>
                              </div>
                              <div className="text-xs text-muted-foreground mt-1">
                                {invoice.clientName} - ${invoice.amount.toFixed(2)}
                              </div>
                            </div>
                            <div className="text-sm">
                              <div className="flex items-center text-xs text-muted-foreground">
                                <Calendar className="h-3.5 w-3.5 mr-1" />
                                {formatDate(invoice.dueDate)}
                              </div>
                            </div>
                          </div>
                          <div className="mt-2 flex justify-end">
                            <Button size="sm" variant="outline" className="h-7 text-xs">
                              {invoice.status === 'open' ? 'Send Reminder' : 'Retry Payment'}
                            </Button>
                          </div>
                        </div>
                      ))
                    }
                  </div>
                ) : (
                  <div className="text-center py-6">
                    <CheckCircle2 className="h-8 w-8 text-success mx-auto mb-2" />
                    <p className="text-muted-foreground">No payment issues found</p>
                  </div>
                )}
              </CardContent>
            </Card>
          </div>
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default BillingAdmin;
