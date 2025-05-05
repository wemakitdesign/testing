
import React, { useState } from 'react';
import { useAuth } from '../../../context/AuthContext';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '../../../components/ui/card';
import { Button } from '../../../components/ui/button';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '../../../components/ui/tabs';
import { Separator } from '../../../components/ui/separator';
import { Badge } from '../../../components/ui/badge';
import { StatusBadge } from '../../../components/ui/status-badge';
import { Input } from '../../../components/ui/input';
import { Label } from '../../../components/ui/label';
import { toast } from '../../../hooks/use-toast';
import { 
  CheckCircle2, 
  CreditCard, 
  Download, 
  FileText, 
  Calendar, 
  Clock, 
  Shield, 
  ChevronsUpDown,
  Star,
  Zap,
  CheckCheck
} from 'lucide-react';
import StripeProvider from '../../../components/ui/stripe/StripeProvider';
import CardElement from '../../../components/ui/stripe/CardElement';
import CheckoutButton from '../../../components/ui/stripe/CheckoutButton';

interface PlanFeature {
  name: string;
  included: boolean;
}

interface Plan {
  id: string;
  name: string;
  price: number;
  description: string;
  features: PlanFeature[];
  popular?: boolean;
}

interface Invoice {
  id: string;
  number: string;
  date: string;
  amount: number;
  status: 'paid' | 'pending' | 'failed';
  downloadUrl: string;
}

const ClientBilling = () => {
  const { user } = useAuth();
  const [selectedPlanId, setSelectedPlanId] = useState('pro');
  const [paymentMethod, setPaymentMethod] = useState({
    cardNumber: '•••• •••• •••• 4242',
    cardExpiry: '12/25',
    cardName: 'John Client',
  });
  const [isEditingPayment, setIsEditingPayment] = useState(false);
  const [newPaymentMethod, setNewPaymentMethod] = useState({
    cardNumber: '',
    cardExpiry: '',
    cardName: '',
    cardCvc: '',
  });
  
  // Mock plans
  const plans: Plan[] = [
    {
      id: 'basic',
      name: 'Basic',
      price: 99,
      description: 'Essential design services for small businesses',
      features: [
        { name: '3 Design Requests', included: true },
        { name: 'Logo Design', included: true },
        { name: 'Social Media Design', included: true },
        { name: 'Business Card Design', included: true },
        { name: 'Priority Support', included: false },
        { name: 'Website Design', included: false },
        { name: 'Unlimited Revisions', included: false },
        { name: 'Brand Guidelines', included: false },
      ],
    },
    {
      id: 'pro',
      name: 'Professional',
      price: 199,
      description: 'Comprehensive design services for growing businesses',
      popular: true,
      features: [
        { name: '10 Design Requests', included: true },
        { name: 'Logo Design', included: true },
        { name: 'Social Media Design', included: true },
        { name: 'Business Card Design', included: true },
        { name: 'Priority Support', included: true },
        { name: 'Website Design', included: true },
        { name: 'Unlimited Revisions', included: false },
        { name: 'Brand Guidelines', included: false },
      ],
    },
    {
      id: 'enterprise',
      name: 'Enterprise',
      price: 499,
      description: 'Complete design solution for established businesses',
      features: [
        { name: 'Unlimited Design Requests', included: true },
        { name: 'Logo Design', included: true },
        { name: 'Social Media Design', included: true },
        { name: 'Business Card Design', included: true },
        { name: 'Priority Support', included: true },
        { name: 'Website Design', included: true },
        { name: 'Unlimited Revisions', included: true },
        { name: 'Brand Guidelines', included: true },
      ],
    },
  ];
  
  // Mock invoices
  const invoices: Invoice[] = [
    { 
      id: 'inv_1001', 
      number: 'INV-1001', 
      date: '2023-04-01T00:00:00Z', 
      amount: 199, 
      status: 'paid',
      downloadUrl: '#',
    },
    { 
      id: 'inv_1002', 
      number: 'INV-1002', 
      date: '2023-03-01T00:00:00Z', 
      amount: 199, 
      status: 'paid',
      downloadUrl: '#',
    },
    { 
      id: 'inv_1003', 
      number: 'INV-1003', 
      date: '2023-02-01T00:00:00Z', 
      amount: 99, 
      status: 'paid',
      downloadUrl: '#',
    },
    { 
      id: 'inv_1004', 
      number: 'INV-1004', 
      date: '2023-01-01T00:00:00Z', 
      amount: 99, 
      status: 'paid',
      downloadUrl: '#',
    },
  ];
  
  // Current active plan
  const currentPlan = {
    id: 'pro',
    name: 'Professional',
    price: 199,
    billingCycle: 'monthly',
    startDate: '2023-03-01T00:00:00Z',
    nextBillingDate: '2023-05-01T00:00:00Z',
    status: 'active' as const,
  };
  
  const getCurrentPlanLabel = (planId: string) => {
    if (planId === currentPlan.id) {
      return 'Current Plan';
    }
    return planId === 'basic' ? 'Downgrade' : 'Upgrade';
  };
  
  const handlePlanChange = (planId: string) => {
    setSelectedPlanId(planId);
    
    // In a real app, this would trigger a modal confirmation
    if (planId !== currentPlan.id) {
      toast({
        title: `Plan selected: ${plans.find(p => p.id === planId)?.name}`,
        description: "You can review and confirm your selection below.",
      });
    }
  };
  
  const handlePaymentUpdate = (e: React.FormEvent) => {
    e.preventDefault();
    
    // In a real app, you would validate and process the payment method update
    setTimeout(() => {
      setPaymentMethod({
        cardNumber: '•••• •••• •••• ' + newPaymentMethod.cardNumber.slice(-4),
        cardExpiry: newPaymentMethod.cardExpiry,
        cardName: newPaymentMethod.cardName,
      });
      
      setIsEditingPayment(false);
      setNewPaymentMethod({
        cardNumber: '',
        cardExpiry: '',
        cardName: '',
        cardCvc: '',
      });
      
      toast({
        title: "Payment method updated",
        description: "Your card information has been updated successfully.",
      });
    }, 1000);
  };
  
  const handlePlanSubscriptionChange = () => {
    // In a real app, this would call your API to change the subscription
    
    if (selectedPlanId === currentPlan.id) {
      toast({
        title: "No changes made",
        description: "You are already subscribed to this plan.",
      });
      return;
    }
    
    const newPlan = plans.find(p => p.id === selectedPlanId);
    
    toast({
      title: `Subscription updated to ${newPlan?.name}`,
      description: `Your subscription has been changed to the ${newPlan?.name} plan. The changes will be reflected in your next billing cycle.`,
    });
  };
  
  return (
    <div className="space-y-8">
      <div>
        <h1 className="text-3xl font-bold tracking-tight">Billing & Subscription</h1>
        <p className="text-muted-foreground">Manage your subscription and payment methods</p>
      </div>
      
      <Tabs defaultValue="subscription" className="space-y-6">
        <TabsList>
          <TabsTrigger value="subscription">Subscription</TabsTrigger>
          <TabsTrigger value="payment-methods">Payment Methods</TabsTrigger>
          <TabsTrigger value="invoices">Invoices</TabsTrigger>
        </TabsList>
        
        {/* Subscription Tab */}
        <TabsContent value="subscription" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>Current Plan</CardTitle>
              <CardDescription>Your current subscription details</CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="flex flex-col md:flex-row md:justify-between md:items-center gap-4">
                <div>
                  <h3 className="text-xl font-bold text-wemakit-purple">{currentPlan.name}</h3>
                  <p className="text-muted-foreground">${currentPlan.price}/month</p>
                </div>
                
                <div className="space-y-1">
                  <StatusBadge variant="success" className="gap-1">
                    <CheckCircle2 className="h-3.5 w-3.5" />
                    Active
                  </StatusBadge>
                  <p className="text-xs text-muted-foreground mt-1">
                    Renews on {new Date(currentPlan.nextBillingDate).toLocaleDateString()}
                  </p>
                </div>
              </div>
              
              <Separator />
              
              <div className="space-y-2">
                <div className="flex justify-between">
                  <span className="text-sm text-muted-foreground">Billing Cycle</span>
                  <span className="text-sm capitalize">{currentPlan.billingCycle}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-sm text-muted-foreground">Started On</span>
                  <span className="text-sm">{new Date(currentPlan.startDate).toLocaleDateString()}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-sm text-muted-foreground">Next Billing Date</span>
                  <span className="text-sm">{new Date(currentPlan.nextBillingDate).toLocaleDateString()}</span>
                </div>
              </div>
            </CardContent>
          </Card>
          
          <Card>
            <CardHeader>
              <CardTitle>Available Plans</CardTitle>
              <CardDescription>Choose the plan that fits your needs</CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="grid gap-6 md:grid-cols-3">
                {plans.map((plan) => (
                  <div 
                    key={plan.id}
                    className={`border rounded-lg overflow-hidden transition-all ${
                      selectedPlanId === plan.id 
                        ? 'border-wemakit-purple ring-2 ring-wemakit-purple/20' 
                        : 'border-border hover:border-wemakit-purple/50'
                    } ${plan.popular ? 'relative' : ''}`}
                  >
                    {plan.popular && (
                      <div className="absolute top-0 right-0">
                        <div className="bg-wemakit-purple text-white text-xs font-medium px-3 py-1 rounded-bl-lg flex items-center">
                          <Star className="h-3.5 w-3.5 mr-1" fill="currentColor" />
                          Popular
                        </div>
                      </div>
                    )}
                    
                    <div className="p-6">
                      <h3 className="text-lg font-bold">{plan.name}</h3>
                      <div className="mt-2 mb-4">
                        <span className="text-3xl font-bold">${plan.price}</span>
                        <span className="text-muted-foreground">/month</span>
                      </div>
                      <p className="text-sm text-muted-foreground mb-6">{plan.description}</p>
                      
                      <Button 
                        variant={selectedPlanId === plan.id ? "default" : "outline"}
                        className="w-full mb-6"
                        onClick={() => handlePlanChange(plan.id)}
                      >
                        {getCurrentPlanLabel(plan.id)}
                      </Button>
                      
                      <div className="space-y-3">
                        {plan.features.map((feature, index) => (
                          <div key={index} className="flex items-start">
                            <div className={`flex-shrink-0 ${feature.included ? 'text-green-500' : 'text-muted-foreground'}`}>
                              {feature.included ? (
                                <CheckCircle2 className="h-5 w-5" />
                              ) : (
                                <div className="h-5 w-5 rounded-full border-2 border-muted-foreground/30" />
                              )}
                            </div>
                            <span className={`ml-3 text-sm ${!feature.included ? 'text-muted-foreground' : ''}`}>
                              {feature.name}
                            </span>
                          </div>
                        ))}
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
            <CardFooter>
              {selectedPlanId === currentPlan.id ? (
                <Button disabled className="ml-auto">Current Plan</Button>
              ) : (
                <CheckoutButton
                  planId={selectedPlanId}
                  planName={plans.find(p => p.id === selectedPlanId)?.name || ''}
                  amount={plans.find(p => p.id === selectedPlanId)?.price || 0}
                  buttonText={selectedPlanId === 'basic' ? 'Downgrade to Basic' : `Upgrade to ${plans.find(p => p.id === selectedPlanId)?.name}`}
                  className="ml-auto"
                  onSuccess={() => {
                    // Update UI after successful checkout
                    toast({
                      title: `Subscription updated to ${plans.find(p => p.id === selectedPlanId)?.name}`,
                      description: `Your subscription has been changed. The changes will be reflected in your next billing cycle.`,
                    });
                  }}
                />
              )}
            </CardFooter>
          </Card>
        </TabsContent>
        
        {/* Payment Methods Tab */}
        <TabsContent value="payment-methods" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>Payment Methods</CardTitle>
              <CardDescription>Manage your payment methods</CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="p-4 bg-blue-50 border border-blue-200 rounded-md mb-6">
                <h3 className="font-medium text-blue-800 mb-2">Test Cards for Stripe</h3>
                <p className="text-sm text-blue-700 mb-1">For testing payments, use one of these cards:</p>
                <ul className="text-xs space-y-1 text-blue-600">
                  <li><strong>Visa (Success):</strong> 4242 4242 4242 4242</li>
                  <li><strong>Mastercard (Success):</strong> 5555 5555 5555 4444</li>
                  <li><strong>Visa (Decline):</strong> 4000 0000 0000 0002</li>
                  <li>Any future date for expiry (MM/YY) and any 3 digits for CVC</li>
                </ul>
              </div>
              {!isEditingPayment ? (
                <div className="border rounded-lg p-6 space-y-4">
                  <div className="flex justify-between items-center">
                    <div className="flex items-center">
                      <div className="h-10 w-16 bg-gradient-to-r from-blue-600 to-blue-800 rounded mr-4 flex items-center justify-center text-white text-xl font-bold">
                        Visa
                      </div>
                      <div>
                        <p className="font-medium">{paymentMethod.cardNumber}</p>
                        <p className="text-sm text-muted-foreground">Expires {paymentMethod.cardExpiry}</p>
                      </div>
                    </div>
                    <StatusBadge variant="success">Default</StatusBadge>
                  </div>
                  
                  <div className="flex justify-end gap-2">
                    <Button variant="outline" size="sm" onClick={() => setIsEditingPayment(true)}>
                      Update
                    </Button>
                  </div>
                </div>
              ) : (
                <div className="space-y-6">
                  <div>
                    <Label htmlFor="cardName">Name on Card</Label>
                    <Input
                      id="cardName"
                      placeholder="John Doe"
                      value={newPaymentMethod.cardName}
                      onChange={(e) => setNewPaymentMethod({...newPaymentMethod, cardName: e.target.value})}
                      required
                      className="mb-4"
                    />
                  </div>
                  
                  <StripeProvider>
                    <CardElement 
                      onSuccess={() => {
                        setPaymentMethod({
                          cardNumber: '•••• •••• •••• 4242',
                          cardExpiry: '12/25',
                          cardName: newPaymentMethod.cardName || 'John Client',
                        });
                        setIsEditingPayment(false);
                        setNewPaymentMethod({
                          cardNumber: '',
                          cardExpiry: '',
                          cardName: '',
                          cardCvc: '',
                        });
                      }}
                      onCancel={() => setIsEditingPayment(false)}
                      buttonText="Save Payment Method"
                    />
                  </StripeProvider>
                  
                  <div className="flex items-center p-4 bg-muted/30 rounded-lg">
                    <Shield className="h-5 w-5 text-wemakit-purple mr-3" />
                    <span className="text-sm">Your payment information is secured with Stripe</span>
                  </div>
                </div>
              )}
            </CardContent>
          </Card>
        </TabsContent>
        
        {/* Invoices Tab */}
        <TabsContent value="invoices" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>Invoice History</CardTitle>
              <CardDescription>View and download your past invoices</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="rounded-md border">
                <div className="grid grid-cols-5 bg-muted/50 p-4 text-sm font-medium">
                  <div>Invoice</div>
                  <div>Date</div>
                  <div>Amount</div>
                  <div>Status</div>
                  <div className="text-right">Actions</div>
                </div>
                <div className="divide-y">
                  {invoices.map(invoice => (
                    <div key={invoice.id} className="grid grid-cols-5 p-4 text-sm">
                      <div className="font-medium">{invoice.number}</div>
                      <div>{new Date(invoice.date).toLocaleDateString()}</div>
                      <div>${invoice.amount.toFixed(2)}</div>
                      <div>
                        <StatusBadge 
                          variant={invoice.status === 'paid' ? 'success' : (invoice.status === 'pending' ? 'warning' : 'danger')}
                          className="gap-1"
                        >
                          {invoice.status === 'paid' && <CheckCheck className="h-3 w-3" />}
                          <span className="capitalize">{invoice.status}</span>
                        </StatusBadge>
                      </div>
                      <div className="text-right">
                        <Button variant="outline" size="sm" className="h-8">
                          <Download className="h-3.5 w-3.5 mr-2" /> Download
                        </Button>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default ClientBilling;
