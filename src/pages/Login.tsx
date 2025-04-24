
import React, { useState } from 'react';
import { useNavigate, useLocation, Link } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { Button } from '../components/ui/button';
import { Input } from '../components/ui/input';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '../components/ui/card';
import { Label } from '../components/ui/label';
import { AlertCircle } from 'lucide-react';
import { Alert, AlertDescription } from '../components/ui/alert';
import Logo from '../components/Logo';
import WemakitLogo from '../assets/logo-wemakit-white.svg'; // Import SVG

const Login = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  
  const { login } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();
  
  const from = location.state?.from?.pathname || '/dashboard';

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    // Basic validation
    if (!email || !password) {
      setError('Please enter both email and password.');
      return;
    }
    
    setError('');
    setIsSubmitting(true);
    
    try {
      const success = await login(email, password);
      
      if (success) {
        navigate(from, { replace: true });
      } else {
        setError('Invalid email or password. Try client@wemakit.com, designer@wemakit.com, or admin@wemakit.com with password "password".');
      }
    } catch (err) {
      setError('An error occurred during login. Please try again.');
      console.error(err);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="min-h-screen flex flex-row">
      {/* Left side - Background image with logo */}
<div className="hidden md:flex md:w-1/2 bg-orange-500 relative overflow-hidden"> {/* Ganti bg-blue ke orange */}
  <div 
    className="absolute inset-0"
    style={{
      backgroundImage: `url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%23ffffff' fill-opacity='0.1'%3E%3Cpath d='M36 34v-4h-2v4h-4v2h4v4h2v-4h4v-2h-4zm0-30V0h-2v4h-4v2h4v4h2V6h4V4h-4zM6 34v-4H4v4H0v2h4v4h2v-4h4v-2H6zM6 4V0H4v4H0v2h4v4h2V6h4V4H6z'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")`,
      backgroundSize: '60px 60px',
    }}
  >
    <div className="absolute inset-0 bg-orange-500/60"></div> {/* Tambahan overlay orange */}
  </div>

  {/* Centered & Enlarged Logo */}
  <div className="relative z-10 flex flex-col items-center justify-center w-full h-full">
    <Link to="/">
      <img
        src={WemakitLogo}
        alt="Wemakit"
        className="w-48 h-auto" // bisa adjust scale sesuai logo
      />
    </Link>
  </div>
</div>

      
      {/* Right side - Login form */}
      <div className="w-full md:w-1/2 flex flex-col items-center justify-center p-8 md:p-12 bg-white">
        <div className="w-full max-w-md">
          <div className="mb-8 text-center md:hidden">
            <Link to="/">
              <Logo />
            </Link>
          </div>
          
          <div className="mb-8">
            <h1 className="text-2xl font-bold text-gray-900 mb-1">Login</h1>
            <p className="text-gray-600 text-sm">Log in to manage your account</p>
          </div>
          
          {error && (
            <Alert variant="destructive" className="mb-6">
              <AlertCircle className="h-4 w-4" />
              <AlertDescription>{error}</AlertDescription>
            </Alert>
          )}
          
          <form onSubmit={handleSubmit} className="space-y-5">
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
              <div className="flex items-center justify-between">
                <Label htmlFor="password" className="text-sm font-medium text-gray-700">Password</Label>
                <Link to="/forgot-password" className="text-sm font-medium text-blue-600 hover:text-blue-800">
                  Forgot password?
                </Link>
              </div>
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
            
            <Button 
  type="submit" 
  className="w-full h-12 text-base bg-black hover:bg-zinc-800 text-white"
  disabled={isSubmitting}
>
  {isSubmitting ? 'Logging in...' : 'Login'}
</Button>

            
            <div className="text-center mt-6">
              <p className="text-sm text-gray-600">
                Don't have an account?{' '}
                <Link to="/signup" className="font-medium text-blue-600 hover:text-blue-800">
                  Sign up
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

export default Login;
