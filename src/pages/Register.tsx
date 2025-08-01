import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Label } from '@/components/ui/label';
import { Card, CardHeader, CardTitle, CardDescription, CardContent, CardFooter } from '@/components/ui/card';
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group';
import { UserRole } from '@/types';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import { useAuth } from '@/contexts/AuthContext';
import { toast } from 'sonner';
import { Loader2, Mail, CheckCircle } from 'lucide-react';

const Register = () => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [role, setRole] = useState<UserRole>('volunteer');
  const [isLoading, setIsLoading] = useState(false);
  const [registrationSuccess, setRegistrationSuccess] = useState(false);
  const { register } = useAuth();
  const navigate = useNavigate();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    
    if (password !== confirmPassword) {
      toast.error("Passwords do not match. Please try again.");
      setIsLoading(false);
      return;
    }
    
    try {
      await register(email, password, name, role);
      setRegistrationSuccess(true);
      
      // Redirect to login after showing success message for a few seconds
      setTimeout(() => {
        navigate('/login');
      }, 4000);
    } catch (error: any) {
      console.error('Registration error:', error);
      toast.error(error.message || "Failed to register. Please try again.");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      
      <main className="flex-grow flex items-center justify-center px-4 py-12">
        <Card className="w-full max-w-md">
          {registrationSuccess ? (
            // Success State
            <div className="text-center p-6">
              <div className="mb-6">
                <CheckCircle className="mx-auto h-16 w-16 text-green-500 mb-4" />
                <CardTitle className="text-2xl text-green-700 mb-2">Registration Successful! 🎉</CardTitle>
                <CardDescription className="text-base">
                  Welcome to Just A Drop! We're excited to have you join our community.
                </CardDescription>
              </div>
              
              <div className="bg-blue-50 border border-blue-200 rounded-lg p-4 mb-6">
                <Mail className="mx-auto h-8 w-8 text-blue-500 mb-2" />
                <h3 className="font-semibold text-blue-800 mb-2">Check Your Email</h3>
                <p className="text-blue-700 text-sm">
                  We've sent a verification link to <strong>{email}</strong>. 
                  Please click the link in your email to verify your account before logging in.
                </p>
              </div>
              
              <div className="space-y-3 text-sm text-gray-600">
                <p>📧 Check your inbox (and spam folder)</p>
                <p>🔗 Click the verification link</p>
                <p>🚀 Come back and login to get started</p>
              </div>
              
              <div className="mt-6">
                <p className="text-sm text-gray-500 mb-3">
                  Redirecting to login page in a few seconds...
                </p>
                <Link to="/login" className="text-drop-600 hover:underline font-medium">
                  Go to Login Now →
                </Link>
              </div>
            </div>
          ) : (
            // Registration Form
            <>
              <CardHeader className="text-center">
                <CardTitle className="text-2xl">Create your account</CardTitle>
                <CardDescription>Join Just A Drop and start making a difference</CardDescription>
              </CardHeader>
          
          <form onSubmit={handleSubmit}>
            <CardContent className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="name">Full Name</Label>
                <Input 
                  id="name" 
                  type="text" 
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  placeholder="John Doe" 
                  required 
                />
              </div>
              
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
                <Label htmlFor="password">Password</Label>
                <Input 
                  id="password" 
                  type="password" 
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  required 
                />
              </div>
              
              <div className="space-y-2">
                <Label htmlFor="confirmPassword">Confirm Password</Label>
                <Input 
                  id="confirmPassword" 
                  type="password" 
                  value={confirmPassword}
                  onChange={(e) => setConfirmPassword(e.target.value)}
                  required 
                />
              </div>
              
              <div className="space-y-2">
                <Label>I am registering as a</Label>
                <RadioGroup value={role} onValueChange={(value) => setRole(value as UserRole)} className="flex flex-col space-y-2">
                  <div className="flex items-center space-x-2">
                    <RadioGroupItem value="volunteer" id="volunteer" />
                    <Label htmlFor="volunteer" className="cursor-pointer">Volunteer / Supporter</Label>
                  </div>
                  <div className="flex items-center space-x-2">
                    <RadioGroupItem value="ngo" id="ngo" />
                    <Label htmlFor="ngo" className="cursor-pointer">Organization / NGO</Label>
                  </div>
                </RadioGroup>
                {role === 'ngo' && (
                  <p className="text-sm text-muted-foreground mt-2">
                    Your organization will need to be approved by an admin before you can post opportunities.
                  </p>
                )}
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
                    Creating account...
                  </>
                ) : 'Create account'}
              </Button>
              
              <div className="text-center text-sm">
                Already have an account?{' '}
                <Link to="/login" className="text-drop-600 hover:underline">
                  Sign in
                </Link>
              </div>
            </CardFooter>
          </form>
            </>
          )}
        </Card>
      </main>
      
      <Footer />
    </div>
  );
};

export default Register;
