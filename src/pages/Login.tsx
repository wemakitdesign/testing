import React, { useState, useEffect } from 'react';
import { useNavigate, useLocation, Link } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { Button } from '../components/ui/button';
import { Input } from '../components/ui/input';
import { Label } from '../components/ui/label';
import { AlertCircle, Loader2 } from 'lucide-react';
import { Alert, AlertDescription } from '../components/ui/alert';
import Logo from '../components/Logo';
import WemakitLogo from '../assets/logo-wemakit-white.svg';

const Login = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');

  const { login, isAuthenticated, isLoading } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();

  const from = location.state?.from?.pathname || '/dashboard';

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
  
    if (!email || !password) {
      setError('Please enter both email and password.');
      return;
    }
  
    setError('');
  
    try {
      const success = await login(email, password);
      if (!success) {
        setError('Invalid email or password.');
      }
    } catch (err: any) {
      console.error('Error during login:', err.message);
      setError(err.message || 'An error occurred during login. Please try again.');
    }
  };
  

  useEffect(() => {
    if (isAuthenticated && !isLoading) {
      navigate(from, { replace: true });
    }
  }, [isAuthenticated, isLoading, navigate, from]);

  return (
    <div className="min-h-screen flex flex-row">
      {/* Left Side */}
      <div className="hidden md:flex md:w-1/2 bg-orange-500 relative overflow-hidden">
        <div 
          className="absolute inset-0"
          style={{
            backgroundImage: `url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%23ffffff' fill-opacity='0.1'%3E%3Cpath d='M36 34v-4h-2v4h-4v2h4v4h2v-4h4v-2h-4zm0-30V0h-2v4h-4v2h4v4h2V6h4V4h-4zM6 34v-4H4v4H0v2h4v4h2v-4h4v-2H6zM6 4V0H4v4H0v2h4v4h2V6h4V4H6z'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")`,
            backgroundSize: '60px 60px',
          }}
        >
          <div className="absolute inset-0 bg-orange-500/60"></div>
        </div>
        <div className="relative z-10 flex flex-col items-center justify-center w-full h-full">
          <Link to="/">
            <img src={WemakitLogo} alt="Wemakit" className="w-48 h-auto" />
          </Link>
        </div>
      </div>

      {/* Right Side */}
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
  <>
    {error.includes('verify your email') ? (
      <div className="mb-6 w-full bg-yellow-100 border border-yellow-400 text-yellow-700 px-4 py-3 rounded relative" role="alert">
        <strong className="font-bold">Almost there!</strong>
        <span className="block sm:inline ml-2">{error}</span>
      </div>
    ) : (
      <Alert variant="destructive" className="mb-6">
        <AlertCircle className="h-4 w-4" />
        <AlertDescription>{error}</AlertDescription>
      </Alert>
    )}
  </>
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
                disabled={isLoading}
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
                disabled={isLoading}
                className="h-12"
              />
            </div>

            <Button 
              type="submit" 
              className="w-full h-12 text-base bg-black hover:bg-zinc-800 text-white flex justify-center items-center gap-2"
              disabled={isLoading}
            >
              {isLoading ? (
                <>
                  <Loader2 className="h-5 w-5 animate-spin" /> Logging in...
                </>
              ) : (
                "Login"
              )}
            </Button>

            <div className="text-center mt-6">
              <p className="text-sm text-gray-600">
                Don't have an account?{' '}
                <a href="/#pricing-section" className="font-medium text-blue-600 hover:text-blue-800">
  Sign up
</a>

              </p>
            </div>
          </form>

        </div>
      </div>
    </div>
  );
};

export default Login;
