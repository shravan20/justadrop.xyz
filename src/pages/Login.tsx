import React, { useState, useEffect } from 'react';
import { Link, useNavigate, useLocation } from 'react-router-dom';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Label } from '@/components/ui/label';
import { Card, CardHeader, CardTitle, CardDescription, CardContent, CardFooter } from '@/components/ui/card';
import { useAuth } from '@/contexts/AuthContext';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import { toast } from 'sonner';
import { Loader2 } from 'lucide-react';
import { TEST_ACCOUNTS, isTestAccount, getTestAccountRole, isTestLoginEnabled } from '@/utils/authUtils';

const Login = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');
  const { login, user, isAuthenticated } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();

  // Redirect if already authenticated
  useEffect(() => {
    if (isAuthenticated && user) {
      const from = location.state?.from?.pathname || getDefaultRedirect(user.role);
      navigate(from, { replace: true });
    }
  }, [isAuthenticated, user, navigate, location]);

  const getDefaultRedirect = (role: string) => {
    switch (role) {
      case 'admin':
        return '/admin/dashboard';
      case 'ngo':
        return '/organization/dashboard';
      case 'volunteer':
        return '/volunteer/dashboard';
      default:
        return '/';
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!email.trim() || !password) {
      setErrorMessage("Please enter both email and password");
      toast.error("Please enter both email and password");
      return;
    }

    setIsLoading(true);
    setErrorMessage(''); // Clear any previous errors
    
    try {
      await login(email, password);
      
      // Note: Redirect will be handled by the useEffect above
      // after the user state is updated by the AuthContext
      
    } catch (error: any) {
      console.error('Login error:', error);
      
      // Handle specific error messages
      let errorMessage = "Failed to login. Please check your credentials.";
      
      if (error.message?.includes('Invalid login credentials')) {
        errorMessage = "❌ Invalid email or password. Please try again.";
      } else if (error.message?.includes('Email not confirmed')) {
        errorMessage = "📧 Please check your email and click the verification link before logging in.";
      } else if (error.message?.includes('Too many requests')) {
        errorMessage = "⏰ Too many login attempts. Please wait a moment and try again.";
      } else if (error.message?.includes('User not found')) {
        errorMessage = "❌ No account found with this email address.";
      } else if (error.message?.includes('Wrong password')) {
        errorMessage = "❌ Incorrect password. Please try again.";
      } else if (error.message?.includes('Missing Supabase environment variables')) {
        errorMessage = "⚠️ Application not configured. Please contact support.";
      } else if (error.message) {
        errorMessage = error.message;
      }
      
      setErrorMessage(errorMessage);
      toast.error(errorMessage);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      
      <main className="flex-grow flex items-center justify-center px-4 py-12">
        <Card className="w-full max-w-md">
          <CardHeader className="text-center">
            <CardTitle className="text-2xl">Login to Just A Drop</CardTitle>
            <CardDescription>Enter your credentials to access your account</CardDescription>
            {errorMessage && (
              <div className="mt-4 p-3 bg-red-50 border border-red-200 rounded-md text-red-700 text-sm">
                {errorMessage}
              </div>
            )}
          </CardHeader>
          
          <form onSubmit={handleSubmit}>
            <CardContent className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="email">Email</Label>
                <Input 
                  id="email" 
                  type="email" 
                  value={email}
                  onChange={(e) => {
                    setEmail(e.target.value);
                    if (errorMessage) setErrorMessage('');
                  }}
                  placeholder="you@example.com" 
                  required 
                />
              </div>
              
              <div className="space-y-2">
                <div className="flex items-center justify-between">
                  <Label htmlFor="password">Password</Label>
                  <Link to="/forgot-password" className="text-sm text-drop-600 hover:underline">
                    Forgot password?
                  </Link>
                </div>
                <Input 
                  id="password" 
                  type="password" 
                  value={password}
                  onChange={(e) => {
                    setPassword(e.target.value);
                    if (errorMessage) setErrorMessage('');
                  }}
                  required 
                />
              </div>
              
              {(isTestLoginEnabled('admin') || isTestLoginEnabled('volunteer') || isTestLoginEnabled('ngo')) && (
                <div className="pt-2 text-sm text-muted-foreground">
                  <p>Test accounts available:</p>
                  <ul className="list-disc pl-5 space-y-1 mt-1">
                    {isTestLoginEnabled('admin') && <li>{TEST_ACCOUNTS.ADMIN} (Admin)</li>}
                    {isTestLoginEnabled('volunteer') && <li>{TEST_ACCOUNTS.VOLUNTEER} (Volunteer)</li>}
                    {isTestLoginEnabled('ngo') && <li>{TEST_ACCOUNTS.NGO} (Organization)</li>}
                    <li><span className="font-medium">Password for all:</span> password</li>
                  </ul>
                </div>
              )}
            </CardContent>
            
            <CardFooter className="flex flex-col space-y-4">
              <Button 
                type="submit" 
                className="w-full bg-drop-600 hover:bg-drop-700" 
                disabled={isLoading}
              >
                {isLoading ? (
                  <>
                    <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                    Signing in...
                  </>
                ) : 'Sign in'}
              </Button>
              
              <div className="text-center text-sm">
                Don't have an account?{' '}
                <Link to="/register" className="text-drop-600 hover:underline">
                  Register
                </Link>
              </div>
            </CardFooter>
          </form>
        </Card>
      </main>
      
      <Footer />
    </div>
  );
};

export default Login;
