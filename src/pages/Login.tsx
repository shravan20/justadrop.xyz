import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
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
  const { login } = useAuth();
  const navigate = useNavigate();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    
    try {
      await login(email, password);
      
      // For test accounts, redirect based on role
      if (isTestAccount(email)) {
        const role = getTestAccountRole(email);
        
        if (role === 'admin') {
          toast.success("Logged in as Admin");
          setTimeout(() => navigate('/admin/dashboard'), 100);
        } else if (role === 'ngo') {
          toast.success("Logged in as Organization");
          setTimeout(() => navigate('/organization/dashboard'), 100);
        } else if (role === 'volunteer') {
          toast.success("Logged in as Volunteer");
          setTimeout(() => navigate('/volunteer/dashboard'), 100);
        } else {
          toast.success("Login successful");
          setTimeout(() => navigate('/'), 100);
        }
      } else {
        // For real users
        toast.success("Login successful");
        setTimeout(() => navigate('/'), 100);
      }
    } catch (error: any) {
      console.error('Login error:', error);
      toast.error(error.message || "Failed to login. Please check your credentials.");
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
          </CardHeader>
          
          <form onSubmit={handleSubmit}>
            <CardContent className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="email">Email</Label>
                <Input 
                  id="email" 
                  type="email" 
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
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
                  onChange={(e) => setPassword(e.target.value)}
                  required 
                />
              </div>
              
              <div className="pt-2 text-sm text-muted-foreground">
                <p>Test accounts available:</p>
                <ul className="list-disc pl-5 space-y-1 mt-1">
                  {isTestLoginEnabled('admin') && <li>{TEST_ACCOUNTS.ADMIN}</li>}
                  {isTestLoginEnabled('volunteer') && <li>{TEST_ACCOUNTS.VOLUNTEER}</li>}
                  {isTestLoginEnabled('ngo') && <li>{TEST_ACCOUNTS.NGO}</li>}
                  <li><span className="font-medium">Password for all:</span> password</li>
                </ul>
              </div>
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
