# Temporary Login Implementation for Testing

## Overview
We need to implement temporary login capabilities for admin, volunteer, and NGO users for testing purposes. Only the admin login will remain permanently, while the others are temporary until actual users are onboarded.

## Implementation Plan

### 1. Update AuthContext.tsx

Modify the login function in AuthContext.tsx to handle special test accounts directly:

```typescript
const login = async (email: string, password: string) => {
  try {
    setLoading(true);
    
    // Special handling for test accounts
    if (email === 'admin@justadrop.org' || email === 'volunteer@justadrop.org' || email === 'ngo@justadrop.org') {
      // Determine role based on email
      let role: UserRole = 'volunteer';
      if (email === 'admin@justadrop.org') role = 'admin';
      if (email === 'ngo@justadrop.org') role = 'ngo';
      
      // Create a mock user object
      const mockUser: User = {
        id: `mock-${Date.now()}`, // Generate a unique ID
        name: email.split('@')[0].charAt(0).toUpperCase() + email.split('@')[0].slice(1), // Capitalize first letter
        email: email,
        role: role,
        createdAt: new Date(),
      };
      
      // Set user in state and local storage
      setUser(mockUser);
      localStorage.setItem(USER_STORAGE_KEY, JSON.stringify(mockUser));
      return;
    }
    
    // For real users, use normal Supabase authentication
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
```

### 2. Update Login.tsx

Add test account information to the login page:

```typescript
// Add this to the Login component JSX, within the CardContent
<div className="pt-2 text-sm text-muted-foreground">
  <p>Test accounts available:</p>
  <ul className="list-disc pl-5 space-y-1 mt-1">
    <li>admin@justadrop.org</li>
    <li>volunteer@justadrop.org</li>
    <li>ngo@justadrop.org</li>
    <li><span className="font-medium">Password:</span> any value works</li>
  </ul>
</div>
```

Also, update the handleSubmit function to redirect based on role:

```typescript
const handleSubmit = async (e: React.FormEvent) => {
  e.preventDefault();
  setIsLoading(true);
  
  try {
    await login(email, password);
    
    // Redirect based on email for test accounts
    if (email === 'admin@justadrop.org') {
      toast.success("Logged in as Admin");
      setTimeout(() => navigate('/admin/dashboard'), 100);
    } else if (email === 'ngo@justadrop.org') {
      toast.success("Logged in as Organization");
      setTimeout(() => navigate('/organization/dashboard'), 100);
    } else if (email === 'volunteer@justadrop.org') {
      toast.success("Logged in as Volunteer");
      setTimeout(() => navigate('/volunteer/dashboard'), 100);
    } else {
      // Default redirect
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
```

### 3. Update ProtectedRoute Component in App.tsx

Ensure the protected route component properly checks for user roles:

```typescript
const ProtectedRoute = ({ children, allowedRoles }: { children: JSX.Element, allowedRoles: string[] }) => {
  const { user, isAuthenticated, loading } = useAuth();
  
  if (loading) {
    return <div className="flex items-center justify-center min-h-screen">
      <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-drop-600"></div>
    </div>;
  }
  
  if (!isAuthenticated || (allowedRoles.length > 0 && user && !allowedRoles.includes(user.role))) {
    return <Navigate to="/login" replace />;
  }
  
  return children;
};
```

### 4. Update Navbar.tsx for Role-Based Navigation

Make sure the navbar shows different navigation options based on user role:

```typescript
const getDashboardLink = () => {
  if (!user) return '/login';
  
  switch (user.role) {
    case 'admin':
      return '/admin/dashboard';
    case 'ngo':
      return '/organization/dashboard';
    case 'volunteer':
      return '/volunteer/dashboard';
    default:
      return '/login';
  }
};
```

### 5. Create a Toggle for Production Mode (for Admin Login Permanence)

Add a utility function for determining which logins are available:

```typescript
// src/utils/authUtils.ts
export const isTestLoginEnabled = (role: UserRole): boolean => {
  // In production, only allow admin test login
  if (import.meta.env.PROD) {
    return role === 'admin';
  }
  
  // In development, allow all test logins
  return true;
};
```

Then use this in the login function:

```typescript
// In AuthContext.tsx
import { isTestLoginEnabled } from '@/utils/authUtils';

// Inside login function
if (
  (email === 'admin@justadrop.org' && isTestLoginEnabled('admin')) || 
  (email === 'volunteer@justadrop.org' && isTestLoginEnabled('volunteer')) || 
  (email === 'ngo@justadrop.org' && isTestLoginEnabled('ngo'))
) {
  // Handle test login...
}
```

### 6. Update Login.tsx to Show Available Test Accounts

Update the test accounts section to only show available accounts:

```typescript
// In Login.tsx
import { isTestLoginEnabled } from '@/utils/authUtils';

// In the component
<div className="pt-2 text-sm text-muted-foreground">
  <p>Test accounts available:</p>
  <ul className="list-disc pl-5 space-y-1 mt-1">
    {isTestLoginEnabled('admin') && <li>admin@justadrop.org</li>}
    {isTestLoginEnabled('volunteer') && <li>volunteer@justadrop.org</li>}
    {isTestLoginEnabled('ngo') && <li>ngo@justadrop.org</li>}
    <li><span className="font-medium">Password:</span> any value works</li>
  </ul>
</div>
```

## Implementation Notes

1. The mock user objects are created client-side and stored in localStorage, which means they won't persist across different browsers or devices.
2. This implementation bypasses the Supabase authentication for test accounts, making them work even if the backend is not completely set up.
3. All test accounts can use any password value since we're doing direct object creation rather than password validation.
4. Using environment variables controls which test accounts are available in different environments.
5. When transitioning to production, you can either remove the test login code completely or keep the admin login capability by using the isTestLoginEnabled utility.
