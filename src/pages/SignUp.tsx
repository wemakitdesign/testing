
import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { Button } from '../components/ui/button';
import { Input } from '../components/ui/input';
import { Label } from '../components/ui/label';
import { AlertCircle } from 'lucide-react';
import { Alert, AlertDescription } from '../components/ui/alert';
import Logo from '../components/Logo';

const SignUp = () => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [error, setError] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  
  const { login } = useAuth();
  const navigate = useNavigate();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    // Basic validation
    if (!name || !email || !password || !confirmPassword) {
      setError('Please fill out all fields.');
      return;
    }
    
    if (password !== confirmPassword) {
      setError('Passwords do not match.');
      return;
    }
    
    setError('');
    setIsSubmitting(true);
    
    try {
      // In a real app, you would register the user here
      // For this demo, we'll simulate success and log them in as a client
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      const success = await login(email, password);
      
      if (success) {
        navigate('/dashboard', { replace: true });
      } else {
        // For demo purposes, let's suggest using one of the demo accounts
        setError('Sign up simulation complete! Please use one of the demo accounts below to log in.');
      }
    } catch (err) {
      setError('An error occurred during sign up. Please try again.');
      console.error(err);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="min-h-screen flex flex-row">
      {/* Left side - Background image with logo */}
      <div className="hidden md:flex md:w-1/2 bg-blue-600 relative overflow-hidden">
        <div 
          className="absolute inset-0 bg-gradient-to-br from-blue-700 to-blue-500"
          style={{
            backgroundImage: `url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%23ffffff' fill-opacity='0.1'%3E%3Cpath d='M36 34v-4h-2v4h-4v2h4v4h2v-4h4v-2h-4zm0-30V0h-2v4h-4v2h4v4h2V6h4V4h-4zM6 34v-4H4v4H0v2h4v4h2v-4h4v-2H6zM6 4V0H4v4H0v2h4v4h2V6h4V4H6z'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")`,
            backgroundSize: '60px 60px',
          }}
        >
          <div className="absolute inset-0 bg-blue-600/50"></div>
        </div>
        
        <div className="relative z-10 flex flex-col items-center justify-center w-full h-full p-12">
          <Link to="/" className="mb-auto">
            <Logo />
          </Link>
          <div className="flex-grow"></div>
          <div className="mb-auto w-3/4 text-white opacity-80">
            <h2 className="text-2xl font-bold mb-4">Design made easy for everyone</h2>
            <p>The right way to do design, from day one. Get started with your Wemakit account today.</p>
          </div>
        </div>
      </div>
      
      {/* Right side - Sign Up form */}
      <div className="w-full md:w-1/2 flex flex-col items-center justify-center p-8 md:p-12 bg-white">
        <div className="w-full max-w-md">
          <div className="mb-8 text-center md:hidden">
            <Link to="/">
              <Logo />
            </Link>
          </div>
          
          <div className="mb-8">
            <h1 className="text-2xl font-bold text-gray-900 mb-1">Create an account</h1>
            <p className="text-gray-600 text-sm">Sign up to get started with Wemakit</p>
          </div>
          
          {error && (
            <Alert variant="destructive" className="mb-6">
              <AlertCircle className="h-4 w-4" />
              <AlertDescription>{error}</AlertDescription>
            </Alert>
          )}
          
          <form onSubmit={handleSubmit} className="space-y-5">
            <div className="space-y-2">
              <Label htmlFor="name" className="text-sm font-medium text-gray-700">Full Name</Label>
              <Input
                id="name"
                type="text"
                placeholder="John Doe"
                value={name}
                onChange={(e) => setName(e.target.value)}
                disabled={isSubmitting}
                className="h-12"
              />
            </div>
            
            <div className="space-y-2">
              <Label htmlFor="email" className="text-sm font-medium text-gray-700">Email</Label>
              <Input
                id="email"
                type="email"
                placeholder="you@example.com"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                disabled={isSubmitting}
                className="h-12"
              />
            </div>
            
            <div className="space-y-2">
              <Label htmlFor="password" className="text-sm font-medium text-gray-700">Password</Label>
              <Input
                id="password"
                type="password"
                placeholder="••••••••"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                disabled={isSubmitting}
                className="h-12"
              />
            </div>
            
            <div className="space-y-2">
              <Label htmlFor="confirmPassword" className="text-sm font-medium text-gray-700">Confirm Password</Label>
              <Input
                id="confirmPassword"
                type="password"
                placeholder="••••••••"
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
                disabled={isSubmitting}
                className="h-12"
              />
            </div>
            
            <Button 
              type="submit" 
              className="w-full h-12 text-base bg-blue-600 hover:bg-blue-700 text-white"
              disabled={isSubmitting}
            >
              {isSubmitting ? 'Creating account...' : 'Sign Up'}
            </Button>
            
            <div className="text-center mt-6">
              <p className="text-sm text-gray-600">
                Already have an account?{' '}
                <Link to="/login" className="font-medium text-blue-600 hover:text-blue-800">
                  Log in
                </Link>
              </p>
            </div>
          </form>
          
          <div className="mt-8 p-4 bg-gray-50 rounded-lg border border-gray-100">
            <h3 className="text-sm font-medium mb-2">Demo Credentials</h3>
            <p className="text-xs text-gray-600 mb-2">Use these to test different roles:</p>
            <ul className="text-xs space-y-1 text-gray-700">
              <li><strong>Client:</strong> client@wemakit.com / password</li>
              <li><strong>Designer:</strong> designer@wemakit.com / password</li>
              <li><strong>Admin:</strong> admin@wemakit.com / password</li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SignUp;
