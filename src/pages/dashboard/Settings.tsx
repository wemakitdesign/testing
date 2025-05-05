import React, { useState, useRef } from 'react';
import { useAuth } from '../../context/AuthContext';
import { Card, CardContent, CardDescription, CardHeader, CardTitle, CardFooter } from '../../components/ui/card';
import { Button } from '../../components/ui/button';
import { Input } from '../../components/ui/input';
import { Label } from '../../components/ui/label';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '../../components/ui/tabs';
import { Switch } from '../../components/ui/switch';
import { Textarea } from '../../components/ui/textarea';
import { Avatar, AvatarFallback, AvatarImage } from '../../components/ui/avatar';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '../../components/ui/select';
import { toast } from '../../hooks/use-toast';
import CheckoutButton from '../../components/ui/stripe/CheckoutButton';
import { 
  User, 
  Mail, 
  Lock, 
  Bell, 
  Shield, 
  CreditCard, 
  Upload, 
  Smartphone, 
  Globe, 
  MoonStar, 
  Sun, 
  Laptop, 
  Check,
  AlertTriangle,
  Info,
  RefreshCw,
  Eye,
  EyeOff,
  Plus
} from 'lucide-react';

const Settings = () => {
  const { user } = useAuth();
  const [profileData, setProfileData] = useState({
    name: user?.name || '',
    email: user?.email || '',
    bio: 'UI/UX Designer with a passion for creating beautiful and functional interfaces.',
    company: 'Acme Corporation',
    website: 'https://example.com',
    timezone: 'America/New_York',
  });
  
  const [notificationSettings, setNotificationSettings] = useState({
    email: {
      newMessages: true,
      projectUpdates: true,
      accountNotifications: true,
      marketingEmails: false,
    },
    push: {
      newMessages: true,
      projectUpdates: false,
      accountNotifications: true,
    }
  });
  
  const [passwordData, setPasswordData] = useState({
    currentPassword: '',
    newPassword: '',
    confirmPassword: '',
  });
  
  const [appearance, setAppearance] = useState('system');
  
  const [stripeSettings, setStripeSettings] = useState({
    publishableKey: '',
    secretKey: '',
    webhookSecret: '',
    enabled: false,
    testMode: true
  });
  
  const secretKeyRef = useRef<HTMLInputElement>(null);
  const [showSecret, setShowSecret] = useState(false);
  
  const subscriptionPlans = [
    {
      id: 'basic',
      name: 'Basic',
      amount: 999,
      description: 'Basic plan for individuals and small teams',
      features: [
        'Up to 5 projects',
        'Basic analytics',
        'Email support'
      ]
    },
    {
      id: 'premium',
      name: 'Premium',
      amount: 1999,
      description: 'Advanced features for growing businesses',
      features: [
        'Unlimited projects',
        'Advanced analytics',
        'Priority support',
        'Custom branding'
      ]
    },
    {
      id: 'enterprise',
      name: 'Enterprise',
      amount: 4999,
      description: 'Complete solution for large organizations',
      features: [
        'All Premium features',
        'Dedicated account manager',
        'Custom integrations',
        'SSO authentication'
      ]
    }
  ];
  
  const handleProfileChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setProfileData(prev => ({ ...prev, [name]: value }));
  };
  
  const handlePasswordChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setPasswordData(prev => ({ ...prev, [name]: value }));
  };
  
  const handleStripeSettingsChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setStripeSettings(prev => ({ ...prev, [name]: value }));
  };
  
  const handleToggleChange = (field: keyof typeof stripeSettings) => {
    setStripeSettings(prev => ({ ...prev, [field]: !prev[field] }));
  };
  
  const handleNotificationToggle = (category: 'email' | 'push', setting: string, value: boolean) => {
    setNotificationSettings(prev => ({
      ...prev,
      [category]: {
        ...prev[category],
        [setting]: value
      }
    }));
  };
  
  const handleProfileSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // In a real app, you would update the user profile via API
    
    toast({
      title: "Profile updated",
      description: "Your profile information has been updated successfully.",
    });
  };
  
  const handlePasswordSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (passwordData.newPassword !== passwordData.confirmPassword) {
      toast({
        title: "Passwords don't match",
        description: "New password and confirmation must match.",
        variant: "destructive",
      });
      return;
    }
    
    // In a real app, you would update the password via API
    
    toast({
      title: "Password updated",
      description: "Your password has been updated successfully.",
    });
    
    setPasswordData({
      currentPassword: '',
      newPassword: '',
      confirmPassword: '',
    });
  };
  
  const handleNotificationsSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // In a real app, you would update notification settings via API
    
    toast({
      title: "Notification settings updated",
      description: "Your notification preferences have been saved.",
    });
  };
  
  const handleStripeSettingsSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!stripeSettings.publishableKey.startsWith('pk_')) {
      toast({
        title: "Invalid publishable key",
        description: "Publishable key should start with 'pk_'",
        variant: "destructive",
      });
      return;
    }
    
    if (!stripeSettings.secretKey.startsWith('sk_')) {
      toast({
        title: "Invalid secret key",
        description: "Secret key should start with 'sk_'",
        variant: "destructive",
      });
      return;
    }
    
    toast({
      title: "Payment settings updated",
      description: "Your Stripe integration settings have been saved.",
    });
  };
  
  const handleToggleSecretVisibility = () => {
    setShowSecret(!showSecret);
  };
  
  const isAdmin = user?.role === 'admin';
  
  return (
    <div className="space-y-8">
      <div>
        <h1 className="text-3xl font-bold tracking-tight">Account Settings</h1>
        <p className="text-muted-foreground">Manage your account preferences and settings</p>
      </div>
      
      <Tabs defaultValue="profile" className="space-y-6">
        <TabsList>
          <TabsTrigger value="profile">Profile</TabsTrigger>
          <TabsTrigger value="password">Password</TabsTrigger>
          <TabsTrigger value="notifications">Notifications</TabsTrigger>
          <TabsTrigger value="appearance">Appearance</TabsTrigger>
          {isAdmin && <TabsTrigger value="payments">Payments</TabsTrigger>}
          {isAdmin && <TabsTrigger value="subscription">Subscription Plans</TabsTrigger>}
        </TabsList>
        
        <TabsContent value="profile" className="space-y-6">
          <Card>
            <form onSubmit={handleProfileSubmit}>
              <CardHeader>
                <CardTitle>Profile Information</CardTitle>
                <CardDescription>
                  Update your account profile information and settings
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="flex flex-col space-y-4 md:flex-row md:space-x-4 md:space-y-0">
                  <div className="md:w-[180px]">
                    <div className="flex flex-col items-center space-y-2">
                      <Avatar className="h-24 w-24">
                        <AvatarImage src={user?.avatar} alt={user?.name} />
                        <AvatarFallback>{user?.name?.charAt(0) || 'U'}</AvatarFallback>
                      </Avatar>
                      <Button variant="outline" size="sm" className="mt-2">
                        <Upload className="mr-2 h-4 w-4" />
                        Change Avatar
                      </Button>
                    </div>
                  </div>
                  
                  <div className="flex-1 space-y-4">
                    <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
                      <div className="space-y-2">
                        <Label htmlFor="name">Full Name</Label>
                        <Input
                          id="name"
                          name="name"
                          placeholder="Your full name"
                          value={profileData.name}
                          onChange={handleProfileChange}
                        />
                      </div>
                      <div className="space-y-2">
                        <Label htmlFor="email">Email Address</Label>
                        <Input
                          id="email"
                          name="email"
                          placeholder="Your email address"
                          type="email"
                          value={profileData.email}
                          onChange={handleProfileChange}
                        />
                      </div>
                    </div>
                    
                    <div className="space-y-2">
                      <Label htmlFor="bio">Bio</Label>
                      <Textarea
                        id="bio"
                        name="bio"
                        placeholder="Write a short bio about yourself"
                        value={profileData.bio}
                        onChange={handleProfileChange}
                      />
                    </div>
                    
                    <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
                      <div className="space-y-2">
                        <Label htmlFor="company">Company</Label>
                        <Input
                          id="company"
                          name="company"
                          placeholder="Your company name"
                          value={profileData.company}
                          onChange={handleProfileChange}
                        />
                      </div>
                      <div className="space-y-2">
                        <Label htmlFor="website">Website</Label>
                        <Input
                          id="website"
                          name="website"
                          placeholder="Your website URL"
                          type="url"
                          value={profileData.website}
                          onChange={handleProfileChange}
                        />
                      </div>
                    </div>
                    
                    <div className="space-y-2">
                      <Label htmlFor="timezone">Timezone</Label>
                      <Select
                        value={profileData.timezone}
                        onValueChange={(value) => setProfileData(prev => ({ ...prev, timezone: value }))}
                      >
                        <SelectTrigger id="timezone">
                          <SelectValue placeholder="Select your timezone" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="America/New_York">Eastern Time (ET)</SelectItem>
                          <SelectItem value="America/Chicago">Central Time (CT)</SelectItem>
                          <SelectItem value="America/Denver">Mountain Time (MT)</SelectItem>
                          <SelectItem value="America/Los_Angeles">Pacific Time (PT)</SelectItem>
                          <SelectItem value="Europe/London">Greenwich Mean Time (GMT)</SelectItem>
                          <SelectItem value="Europe/Paris">Central European Time (CET)</SelectItem>
                          <SelectItem value="Asia/Tokyo">Japan Standard Time (JST)</SelectItem>
                          <SelectItem value="Australia/Sydney">Australian Eastern Time (AET)</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                    
                    <div className="space-y-2">
                      <div className="flex items-center space-x-2">
                        <Switch id="marketing" />
                        <Label htmlFor="marketing">Receive marketing communications</Label>
                      </div>
                      <p className="text-sm text-muted-foreground">
                        We'll send you updates about new features and occasional promotions.
                      </p>
                    </div>
                  </div>
                </div>
              </CardContent>
              <CardFooter className="flex justify-end">
                <Button>Save Changes</Button>
              </CardFooter>
            </form>
          </Card>
          
          <Card>
            <CardHeader>
              <CardTitle>Connected Accounts</CardTitle>
              <CardDescription>
                Connect your account to third-party services
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="flex items-center justify-between rounded-lg border p-4">
                <div className="flex items-center space-x-4">
                  <div className="h-10 w-10 rounded-full bg-blue-100 flex items-center justify-center">
                    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-blue-600">
                      <path d="M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z" />
                    </svg>
                  </div>
                  <div>
                    <p className="font-medium">Facebook</p>
                    <p className="text-sm text-muted-foreground">Share your designs to Facebook</p>
                  </div>
                </div>
                <Button variant="outline">Connect</Button>
              </div>
              
              <div className="flex items-center justify-between rounded-lg border p-4">
                <div className="flex items-center space-x-4">
                  <div className="h-10 w-10 rounded-full bg-blue-100 flex items-center justify-center">
                    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-blue-400">
                      <path d="M22 4s-.7 2.1-2 3.4c1.6 10-9.4 17.3-18 11.6 2.2.1 4.4-.6 6-2C3 15.5.5 9.6 3 5c2.2 2.6 5.6 4.1 9 4-.9-4.2 4-6.6 7-3.8 1.1 0 3-1.2 3-1.2z" />
                    </svg>
                  </div>
                  <div>
                    <p className="font-medium">Twitter</p>
                    <p className="text-sm text-muted-foreground">Share your designs to Twitter</p>
                  </div>
                </div>
                <Button variant="outline" className="space-x-2">
                  <Check className="h-4 w-4" />
                  <span>Connected</span>
                </Button>
              </div>
              
              <div className="flex items-center justify-between rounded-lg border p-4">
                <div className="flex items-center space-x-4">
                  <div className="h-10 w-10 rounded-full bg-blue-100 flex items-center justify-center">
                    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-blue-700">
                      <path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z" />
                      <rect width="4" height="12" x="2" y="9" />
                      <circle cx="4" cy="4" r="2" />
                    </svg>
                  </div>
                  <div>
                    <p className="font-medium">LinkedIn</p>
                    <p className="text-sm text-muted-foreground">Share your designs to LinkedIn</p>
                  </div>
                </div>
                <Button variant="outline">Connect</Button>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
        
        <TabsContent value="password" className="space-y-6">
          <Card>
            <form onSubmit={handlePasswordSubmit}>
              <CardHeader>
                <CardTitle>Password</CardTitle>
                <CardDescription>
                  Update your password to keep your account secure
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="space-y-2">
                  <Label htmlFor="currentPassword">Current Password</Label>
                  <Input
                    id="currentPassword"
                    name="currentPassword"
                    type="password"
                    value={passwordData.currentPassword}
                    onChange={handlePasswordChange}
                  />
                </div>
                
                <div className="space-y-2">
                  <Label htmlFor="newPassword">New Password</Label>
                  <Input
                    id="newPassword"
                    name="newPassword"
                    type="password"
                    value={passwordData.newPassword}
                    onChange={handlePasswordChange}
                  />
                </div>
                
                <div className="space-y-2">
                  <Label htmlFor="confirmPassword">Confirm New Password</Label>
                  <Input
                    id="confirmPassword"
                    name="confirmPassword"
                    type="password"
                    value={passwordData.confirmPassword}
                    onChange={handlePasswordChange}
                  />
                </div>
                
                <div>
                  <h3 className="mb-2 text-sm font-medium">Password Requirements:</h3>
                  <ul className="text-sm text-muted-foreground space-y-1 list-disc list-inside">
                    <li>Minimum 8 characters</li>
                    <li>At least one uppercase letter</li>
                    <li>At least one number</li>
                    <li>At least one special character</li>
                  </ul>
                </div>
              </CardContent>
              <CardFooter>
                <Button>Update Password</Button>
              </CardFooter>
            </form>
          </Card>
          
          <Card>
            <CardHeader>
              <CardTitle>Two-Factor Authentication</CardTitle>
              <CardDescription>
                Add an extra layer of security to your account
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="flex items-center justify-between">
                <div className="space-y-0.5">
                  <div className="font-medium">Authenticator App</div>
                  <div className="text-sm text-muted-foreground">
                    Use an authenticator app to generate time-based one-time passwords.
                  </div>
                </div>
                <Button variant="outline">Set Up</Button>
              </div>
              
              <div className="flex items-center justify-between">
                <div className="space-y-0.5">
                  <div className="font-medium">SMS Recovery</div>
                  <div className="text-sm text-muted-foreground">
                    Use your phone as a backup method for account recovery.
                  </div>
                </div>
                <Button variant="outline">Set Up</Button>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
        
        <TabsContent value="notifications" className="space-y-6">
          <Card>
            <form onSubmit={handleNotificationsSubmit}>
              <CardHeader>
                <CardTitle>Email Notifications</CardTitle>
                <CardDescription>
                  Choose which types of emails you'd like to receive
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="flex items-center justify-between space-x-2">
                  <Label htmlFor="email-messages" className="flex flex-col space-y-1">
                    <span>New Messages</span>
                    <span className="font-normal text-xs text-muted-foreground">
                      Get notified when you receive new messages from clients or team members.
                    </span>
                  </Label>
                  <Switch
                    id="email-messages"
                    checked={notificationSettings.email.newMessages}
                    onCheckedChange={(checked) => handleNotificationToggle('email', 'newMessages', checked)}
                  />
                </div>
                
                <div className="flex items-center justify-between space-x-2">
                  <Label htmlFor="email-updates" className="flex flex-col space-y-1">
                    <span>Project Updates</span>
                    <span className="font-normal text-xs text-muted-foreground">
                      Get notified about project status changes, new comments, and task assignments.
                    </span>
                  </Label>
                  <Switch
                    id="email-updates"
                    checked={notificationSettings.email.projectUpdates}
                    onCheckedChange={(checked) => handleNotificationToggle('email', 'projectUpdates', checked)}
                  />
                </div>
                
                <div className="flex items-center justify-between space-x-2">
                  <Label htmlFor="email-account" className="flex flex-col space-y-1">
                    <span>Account Notifications</span>
                    <span className="font-normal text-xs text-muted-foreground">
                      Get important account notifications like security alerts and payment confirmations.
                    </span>
                  </Label>
                  <Switch
                    id="email-account"
                    checked={notificationSettings.email.accountNotifications}
                    onCheckedChange={(checked) => handleNotificationToggle('email', 'accountNotifications', checked)}
                  />
                </div>
                
                <div className="flex items-center justify-between space-x-2">
                  <Label htmlFor="email-marketing" className="flex flex-col space-y-1">
                    <span>Marketing Emails</span>
                    <span className="font-normal text-xs text-muted-foreground">
                      Receive news, updates, and promotional offers from Wemakit.
                    </span>
                  </Label>
                  <Switch
                    id="email-marketing"
                    checked={notificationSettings.email.marketingEmails}
                    onCheckedChange={(checked) => handleNotificationToggle('email', 'marketingEmails', checked)}
                  />
                </div>
              </CardContent>
            </form>
          </Card>
          
          <Card>
            <CardHeader>
              <CardTitle>Push Notifications</CardTitle>
              <CardDescription>
                Manage push notifications on your devices
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="flex items-center justify-between space-x-2">
                <Label htmlFor="push-messages" className="flex flex-col space-y-1">
                  <span>New Messages</span>
                  <span className="font-normal text-xs text-muted-foreground">
                    Get push notifications when you receive new messages.
                  </span>
                </Label>
                <Switch
                  id="push-messages"
                  checked={notificationSettings.push.newMessages}
                  onCheckedChange={(checked) => handleNotificationToggle('push', 'newMessages', checked)}
                />
              </div>
              
              <div className="flex items-center justify-between space-x-2">
                <Label htmlFor="push-updates" className="flex flex-col space-y-1">
                  <span>Project Updates</span>
                  <span className="font-normal text-xs text-muted-foreground">
                    Get push notifications about project activity.
                  </span>
                </Label>
                <Switch
                  id="push-updates"
                  checked={notificationSettings.push.projectUpdates}
                  onCheckedChange={(checked) => handleNotificationToggle('push', 'projectUpdates', checked)}
                />
              </div>
              
              <div className="flex items-center justify-between space-x-2">
                <Label htmlFor="push-account" className="flex flex-col space-y-1">
                  <span>Account Notifications</span>
                  <span className="font-normal text-xs text-muted-foreground">
                    Get push notifications for important account alerts.
                  </span>
                </Label>
                <Switch
                  id="push-account"
                  checked={notificationSettings.push.accountNotifications}
                  onCheckedChange={(checked) => handleNotificationToggle('push', 'accountNotifications', checked)}
                />
              </div>
              
              <div className="border-t pt-4 mt-4">
                <p className="text-sm font-medium mb-2">Connected Devices</p>
                <div className="space-y-3">
                  <div className="flex justify-between items-center p-2 rounded-md bg-muted/50">
                    <div className="flex items-center">
                      <Smartphone className="h-5 w-5 text-muted-foreground mr-3" />
                      <div>
                        <p className="text-sm font-medium">iPhone 13 Pro</p>
                        <p className="text-xs text-muted-foreground">Last active 2 hours ago</p>
                      </div>
                    </div>
                    <Button variant="ghost" size="sm">
                      Remove
                    </Button>
                  </div>
                  
                  <div className="flex justify-between items-center p-2 rounded-md bg-muted/50">
                    <div className="flex items-center">
                      <Laptop className="h-5 w-5 text-muted-foreground mr-3" />
                      <div>
                        <p className="text-sm font-medium">MacBook Pro</p>
                        <p className="text-xs text-muted-foreground">Last active just now</p>
                      </div>
                    </div>
                    <Button variant="ghost" size="sm">
                      Remove
                    </Button>
                  </div>
                </div>
              </div>
            </CardContent>
            <CardFooter>
              <Button>Save Notification Settings</Button>
            </CardFooter>
          </Card>
        </TabsContent>
        
        <TabsContent value="appearance">
          <Card>
            <CardHeader>
              <CardTitle>Appearance</CardTitle>
              <CardDescription>
                Customize how the dashboard looks on your device
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="space-y-2">
                <Label>Theme</Label>
                <div className="grid grid-cols-3 gap-4">
                  <div 
                    className={`border rounded-md p-4 cursor-pointer ${appearance === 'light' ? 'border-wemakit-purple ring-2 ring-wemakit-purple/20' : ''}`}
                    onClick={() => setAppearance('light')}
                  >
                    <div className="flex flex-col items-center space-y-2">
                      <div className="h-10 w-10 rounded-full bg-white border flex items-center justify-center">
                        <Sun className="h-5 w-5 text-orange-400" />
                      </div>
                      <span className="text-sm font-medium">Light</span>
                    </div>
                  </div>
                  
                  <div 
                    className={`border rounded-md p-4 cursor-pointer ${appearance === 'dark' ? 'border-wemakit-purple ring-2 ring-wemakit-purple/20' : ''}`}
                    onClick={() => setAppearance('dark')}
                  >
                    <div className="flex flex-col items-center space-y-2">
                      <div className="h-10 w-10 rounded-full bg-gray-900 border flex items-center justify-center">
                        <MoonStar className="h-5 w-5 text-blue-400" />
                      </div>
                      <span className="text-sm font-medium">Dark</span>
                    </div>
                  </div>
                  
                  <div 
                    className={`border rounded-md p-4 cursor-pointer ${appearance === 'system' ? 'border-wemakit-purple ring-2 ring-wemakit-purple/20' : ''}`}
                    onClick={() => setAppearance('system')}
                  >
                    <div className="flex flex-col items-center space-y-2">
                      <div className="h-10 w-10 rounded-full bg-gradient-to-br from-white to-gray-900 border flex items-center justify-center">
                        <Laptop className="h-5 w-5 text-blue-500" />
                      </div>
                      <span className="text-sm font-medium">System</span>
                    </div>
                  </div>
                </div>
              </div>
              
              <div className="space-y-2">
                <div className="flex items-center justify-between">
                  <Label htmlFor="reduce-motion" className="text-base">Reduce Animations</Label>
                  <Switch id="reduce-motion" />
                </div>
                <p className="text-sm text-muted-foreground">
                  Enable this to reduce motion effects and animations throughout the interface.
                </p>
              </div>
              
              <div className="space-y-2">
                <div className="flex items-center justify-between">
                  <Label htmlFor="high-contrast" className="text-base">High Contrast</Label>
                  <Switch id="high-contrast" />
                </div>
                <p className="text-sm text-muted-foreground">
                  Enable high contrast mode for better visibility and accessibility.
                </p>
              </div>
              
              <div className="space-y-2">
                <Label>Font Size</Label>
                <div className="flex items-center justify-between">
                  <span className="text-sm">A</span>
                  <input 
                    type="range" 
                    min="0" 
                    max="4" 
                    step="1" 
                    defaultValue="2"
                    className="w-full mx-2" 
                  />
                  <span className="text-lg">A</span>
                </div>
              </div>
            </CardContent>
            <CardFooter>
              <Button>Save Settings</Button>
            </CardFooter>
          </Card>
        </TabsContent>
        
        {isAdmin && (
          <TabsContent value="payments" className="space-y-6">
            <Card>
              <form onSubmit={handleStripeSettingsSubmit}>
                <CardHeader>
                  <CardTitle>Payment Gateway Settings</CardTitle>
                  <CardDescription>
                    Configure your Stripe integration for payment processing
                  </CardDescription>
                </CardHeader>
                <CardContent className="space-y-6">
                  <div className="p-4 border rounded-md bg-yellow-50 text-yellow-800 flex items-start gap-2">
                    <AlertTriangle className="h-5 w-5 shrink-0 mt-0.5" />
                    <div>
                      <p className="font-medium">Important Security Notice</p>
                      <p className="text-sm">
                        Keep your API keys secure and never share them publicly. In a production environment,
                        keys should be stored securely on the server side.
                      </p>
                    </div>
                  </div>
                  
                  <div className="space-y-4">
                    <div className="space-y-2">
                      <Label htmlFor="publishableKey">Stripe Publishable Key</Label>
                      <Input
                        id="publishableKey"
                        name="publishableKey"
                        placeholder="pk_test_..."
                        value={stripeSettings.publishableKey}
                        onChange={handleStripeSettingsChange}
                      />
                      <p className="text-xs text-muted-foreground">
                        Your publishable key from the Stripe dashboard. Starts with 'pk_'.
                      </p>
                    </div>
                    
                    <div className="space-y-2">
                      <Label htmlFor="secretKey">Stripe Secret Key</Label>
                      <div className="relative">
                        <Input
                          ref={secretKeyRef}
                          id="secretKey"
                          name="secretKey"
                          type={showSecret ? "text" : "password"}
                          placeholder="sk_test_..."
                          value={stripeSettings.secretKey}
                          onChange={handleStripeSettingsChange}
                        />
                        <Button
                          type="button"
                          variant="ghost"
                          size="sm"
                          className="absolute right-2 top-1/2 transform -translate-y-1/2 h-7 w-7 p-0"
                          onClick={handleToggleSecretVisibility}
                        >
                          {showSecret ? <Eye className="h-4 w-4" /> : <EyeOff className="h-4 w-4" />}
                        </Button>
                      </div>
                      <p className="text-xs text-muted-foreground">
                        Your secret key from the Stripe dashboard. Starts with 'sk_'. This key should be kept secure.
                      </p>
                    </div>
                    
                    <div className="space-y-2">
                      <Label htmlFor="webhookSecret">Webhook Secret (Optional)</Label>
                      <Input
                        id="webhookSecret"
                        name="webhookSecret"
                        placeholder="whsec_..."
                        value={stripeSettings.webhookSecret}
                        onChange={handleStripeSettingsChange}
                      />
                      <p className="text-xs text-muted-foreground">
                        Your webhook signing secret for verifying webhook events.
                      </p>
                    </div>
                    
                    <div className="flex flex-col space-y-4 pt-4">
                      <div className="flex items-center justify-between">
                        <Label htmlFor="testMode" className="flex flex-col space-y-1">
                          <span>Test Mode</span>
                          <span className="font-normal text-xs text-muted-foreground">
                            Use Stripe test environment instead of production.
                          </span>
                        </Label>
                        <Switch
                          id="testMode"
                          checked={stripeSettings.testMode}
                          onCheckedChange={() => handleToggleChange('testMode')}
                        />
                      </div>
                      
                      <div className="flex items-center justify-between">
                        <Label htmlFor="enabled" className="flex flex-col space-y-1">
                          <span>Enable Stripe Payments</span>
                          <span className="font-normal text-xs text-muted-foreground">
                            Turn on payment processing with Stripe.
                          </span>
                        </Label>
                        <Switch
                          id="enabled"
                          checked={stripeSettings.enabled}
                          onCheckedChange={() => handleToggleChange('enabled')}
                        />
                      </div>
                    </div>
                  </div>
                  
                  <div className="p-4 border rounded-md bg-blue-50 text-blue-800 flex gap-2">
                    <Info className="h-5 w-5 shrink-0 mt-0.5" />
                    <div className="text-sm">
                      <p className="font-medium">Test Mode Information</p>
                      <p>
                        In test mode, you can use Stripe's test card numbers like 4242 4242 4242 4242 with any future 
                        expiration date and any 3-digit CVC.
                      </p>
                    </div>
                  </div>
                </CardContent>
                <CardFooter className="flex justify-between">
                  <Button type="button" variant="outline" onClick={() => {
                    setStripeSettings({
                      publishableKey: '',
                      secretKey: '',
                      webhookSecret: '',
                      enabled: false,
                      testMode: true
                    });
                  }}>
                    Reset
                  </Button>
                  <Button type="submit">Save Payment Settings</Button>
                </CardFooter>
              </form>
            </Card>
            
            <Card>
              <CardHeader>
                <CardTitle>Payment History</CardTitle>
                <CardDescription>
                  View recent transactions and payment history
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="text-center py-8">
                  <CreditCard className="h-10 w-10 text-muted-foreground mx-auto mb-3" />
                  <h3 className="text-lg font-medium mb-1">No transactions yet</h3>
                  <p className="text-muted-foreground max-w-md mx-auto">
                    Once you've processed payments, they'll appear here with details about each transaction.
                  </p>
                </div>
              </CardContent>
            </Card>
          </TabsContent>
        )}
        
        {isAdmin && (
          <TabsContent value="subscription" className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle>Subscription Plans</CardTitle>
                <CardDescription>
                  Manage available subscription plans for your clients
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="grid gap-6 md:grid-cols-3">
                  {subscriptionPlans.map((plan) => (
                    <Card key={plan.id} className="overflow-hidden border-2">
                      <CardHeader className="bg-muted/30">
                        <CardTitle>{plan.name}</CardTitle>
                        <CardDescription>
                          ${(plan.amount / 100).toFixed(2)}/month
                        </CardDescription>
                      </CardHeader>
                      <CardContent className="pt-6">
                        <p className="mb-4 text-sm text-muted-foreground">{plan.description}</p>
                        <ul className="space-y-2 mb-6">
                          {plan.features.map((feature, i) => (
                            <li key={i} className="flex items-center">
                              <Check className="h-4 w-4 text-green-500 mr-2 shrink-0" />
                              <span className="text-sm">{feature}</span>
                            </li>
                          ))}
                        </ul>
                      </CardContent>
                      <CardFooter className="bg-muted/10 flex flex-col gap-3 items-stretch">
                        <Button variant="outline" size="sm" className="w-full">
                          Edit Plan
                        </Button>
                        <CheckoutButton 
                          planId={plan.id} 
                          planName={plan.name} 
                          amount={plan.amount} 
                          buttonText="Test Checkout" 
                          className="w-full"
                          onSuccess={() => {
                            toast({
                              title: "Test subscription created",
                              description: `Test subscription to ${plan.name} plan completed successfully.`
                            });
                          }}
                        />
                      </CardFooter>
                    </Card>
                  ))}
                </div>
                
                <div className="flex justify-end">
                  <Button className="bg-green-600 hover:bg-green-700">
                    <Plus className="h-4 w-4 mr-2" />
                    Add New Plan
                  </Button>
                </div>
              </CardContent>
            </Card>
            
            <Card>
              <CardHeader>
                <CardTitle>Subscription Analytics</CardTitle>
                <CardDescription>
                  Overview of subscription metrics and performance
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="grid gap-4 md:grid-cols-3">
                  <Card>
                    <CardHeader className="pb-2">
                      <CardTitle className="text-base">Active Subscriptions</CardTitle>
                    </CardHeader>
                    <CardContent>
                      <div className="text-3xl font-bold">0</div>
                    </CardContent>
                  </Card>
                  
                  <Card>
                    <CardHeader className="pb-2">
                      <CardTitle className="text-base">Monthly Recurring Revenue</CardTitle>
                    </CardHeader>
                    <CardContent>
                      <div className="text-3xl font-bold">$0.00</div>
                    </CardContent>
                  </Card>
                  
                  <Card>
                    <CardHeader className="pb-2">
                      <CardTitle className="text-base">Churn Rate</CardTitle>
                    </CardHeader>
                    <CardContent>
                      <div className="text-3xl font-bold">0%</div>
                    </CardContent>
                  </Card>
                </div>
                
                <div className="flex justify-center mt-8">
                  <Button variant="outline" className="flex items-center gap-2">
                    <RefreshCw className="h-4 w-4" />
                    Refresh Analytics
                  </Button>
                </div>
              </CardContent>
            </Card>
          </TabsContent>
        )}
      </Tabs>
      
      <Card className="border-destructive/50">
        <CardHeader>
          <CardTitle className="text-destructive">Danger Zone</CardTitle>
          <CardDescription>
            These actions are permanent and cannot be undone
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="flex items-center justify-between">
            <div className="space-y-0.5">
              <h3 className="font-medium">Export Your Data</h3>
              <p className="text-sm text-muted-foreground">
                Download a copy of your data and content.
              </p>
            </div>
            <Button variant="outline">Export Data</Button>
          </div>
          
          <div className="flex items-center justify-between">
            <div className="space-y-0.5">
              <h3 className="font-medium">Deactivate Account</h3>
              <p className="text-sm text-muted-foreground">
                Temporarily disable your account and hide your profile.
              </p>
            </div>
            <Button variant="outline">Deactivate</Button>
          </div>
          
          <div className="flex items-center justify-between">
            <div className="space-y-0.5">
              <h3 className="font-medium text-destructive">Delete Account</h3>
              <p className="text-sm text-muted-foreground">
                Permanently delete your account and all your data.
              </p>
            </div>
            <Button variant="destructive">Delete Account</Button>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default Settings;
