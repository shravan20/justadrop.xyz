
import React, { createContext, useState, useContext, useEffect } from 'react';
import { User, UserRole } from '@/types';
import { supabase } from '@/lib/supabase';
import { toast } from 'sonner';

type AuthContextType = {
  user: User | null;
  isAuthenticated: boolean;
  login: (email: string, password: string) => Promise<void>;
  register: (email: string, password: string, name: string, role: UserRole) => Promise<void>;
  logout: () => Promise<void>;
  loading: boolean;
};

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Check for session on initial load
    const initializeAuth = async () => {
      try {
        setLoading(true);
        
        // Get session
        const { data: { session } } = await supabase.auth.getSession();
        
        if (session) {
          // Get user profile data
          const { data: userData, error: userError } = await supabase
            .from('users')
            .select('*')
            .eq('id', session.user.id)
            .single();
            
          if (userError) throw userError;
          
          // Transform to our application's User type
          const appUser: User = {
            id: userData.id,
            name: userData.name,
            email: userData.email,
            role: userData.role,
            profileImage: userData.profile_image || undefined,
            location: userData.location || undefined,
            bio: userData.bio || undefined,
            createdAt: new Date(userData.created_at),
          };
          
          setUser(appUser);
        }
      } catch (error) {
        console.error('Error initializing auth:', error);
        setUser(null);
      } finally {
        setLoading(false);
      }
    };

    // Listen for auth changes
    const { data: { subscription } } = supabase.auth.onAuthStateChange(
      async (event, session) => {
        if (event === 'SIGNED_IN' && session) {
          // Get user profile data
          const { data: userData, error: userError } = await supabase
            .from('users')
            .select('*')
            .eq('id', session.user.id)
            .single();
            
          if (userError) {
            console.error('Error getting user data:', userError);
            return;
          }
          
          const appUser: User = {
            id: userData.id,
            name: userData.name,
            email: userData.email,
            role: userData.role,
            profileImage: userData.profile_image || undefined,
            location: userData.location || undefined,
            bio: userData.bio || undefined,
            createdAt: new Date(userData.created_at),
          };
          
          setUser(appUser);
        } else if (event === 'SIGNED_OUT') {
          setUser(null);
        }
      }
    );

    initializeAuth();

    // Cleanup subscription
    return () => {
      subscription.unsubscribe();
    };
  }, []);

  const login = async (email: string, password: string) => {
    try {
      setLoading(true);
      
      const { error } = await supabase.auth.signInWithPassword({
        email,
        password,
      });
      
      if (error) throw error;
      
    } catch (error: any) {
      toast.error(`Login failed: ${error.message}`);
      throw error;
    } finally {
      setLoading(false);
    }
  };

  const register = async (email: string, password: string, name: string, role: UserRole) => {
    try {
      setLoading(true);
      
      // Sign up user
      const { data, error } = await supabase.auth.signUp({
        email,
        password,
      });
      
      if (error) throw error;
      
      if (data.user) {
        // Create user profile
        const { error: profileError } = await supabase
          .from('users')
          .insert({
            id: data.user.id,
            name,
            email,
            role,
            created_at: new Date().toISOString(),
            approved: role === 'volunteer' // Auto-approve volunteers, NGOs need admin approval
          });
        
        if (profileError) throw profileError;
        
        toast.success("Registration successful! You can now login.");
      }
    } catch (error: any) {
      toast.error(`Registration failed: ${error.message}`);
      throw error;
    } finally {
      setLoading(false);
    }
  };

  const logout = async () => {
    try {
      setLoading(true);
      await supabase.auth.signOut();
      setUser(null);
      toast.success("Logged out successfully");
    } catch (error: any) {
      toast.error(`Logout failed: ${error.message}`);
    } finally {
      setLoading(false);
    }
  };

  return (
    <AuthContext.Provider value={{ user, isAuthenticated: !!user, login, register, logout, loading }}>
      {children}
    </AuthContext.Provider>
  );
};
