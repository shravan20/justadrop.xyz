
import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import { AuthProvider, useAuth } from "@/contexts/AuthContext";
import Index from "./pages/Index";
import Opportunities from "./pages/Opportunities";
import OpportunityDetail from "./pages/OpportunityDetail";
import Login from "./pages/Login";
import Register from "./pages/Register";
import OrganizationDashboard from "./pages/OrganizationDashboard";
import VolunteerDashboard from "./pages/VolunteerDashboard";
import AdminDashboard from "./pages/AdminDashboard";
import NotFound from "./pages/NotFound";

// Organization pages
import OrganizationCreateOpportunity from "./pages/OrganizationCreateOpportunity";
import OrganizationVolunteers from "./pages/OrganizationVolunteers";
import OrganizationApplications from "./pages/OrganizationApplications";
import OrganizationCalendar from "./pages/OrganizationCalendar";

// Volunteer pages
import VolunteerSaved from "./pages/VolunteerSaved";
import VolunteerHistory from "./pages/VolunteerHistory";

// Admin pages
import AdminUserManagement from "./pages/AdminUserManagement";
import AdminOrganizations from "./pages/AdminOrganizations";

const queryClient = new QueryClient();

// Protected route component
const ProtectedRoute = ({ children, allowedRoles }: { children: JSX.Element, allowedRoles: string[] }) => {
  const { user, isAuthenticated, loading } = useAuth();
  
  if (loading) {
    return <div>Loading...</div>;
  }
  
  if (!isAuthenticated || (allowedRoles.length > 0 && user && !allowedRoles.includes(user.role))) {
    return <Navigate to="/login" replace />;
  }
  
  return children;
};

const App = () => (
  <QueryClientProvider client={queryClient}>
    <AuthProvider>
      <TooltipProvider>
        <Toaster />
        <Sonner />
        <BrowserRouter>
          <Routes>
            {/* Public routes */}
            <Route path="/" element={<Index />} />
            <Route path="/opportunities" element={<Opportunities />} />
            <Route path="/opportunities/:id" element={<OpportunityDetail />} />
            <Route path="/login" element={<Login />} />
            <Route path="/register" element={<Register />} />
            
            {/* Protected organization routes */}
            <Route 
              path="/organization/dashboard" 
              element={
                <ProtectedRoute allowedRoles={['ngo']}>
                  <OrganizationDashboard />
                </ProtectedRoute>
              } 
            />
            <Route 
              path="/organization/create-opportunity" 
              element={
                <ProtectedRoute allowedRoles={['ngo']}>
                  <OrganizationCreateOpportunity />
                </ProtectedRoute>
              } 
            />
            <Route 
              path="/organization/volunteers" 
              element={
                <ProtectedRoute allowedRoles={['ngo']}>
                  <OrganizationVolunteers />
                </ProtectedRoute>
              } 
            />
            <Route 
              path="/organization/applications" 
              element={
                <ProtectedRoute allowedRoles={['ngo']}>
                  <OrganizationApplications />
                </ProtectedRoute>
              } 
            />
            <Route 
              path="/organization/calendar" 
              element={
                <ProtectedRoute allowedRoles={['ngo']}>
                  <OrganizationCalendar />
                </ProtectedRoute>
              } 
            />
            
            {/* Protected volunteer routes */}
            <Route 
              path="/volunteer/dashboard" 
              element={
                <ProtectedRoute allowedRoles={['volunteer']}>
                  <VolunteerDashboard />
                </ProtectedRoute>
              } 
            />
            <Route 
              path="/volunteer/saved" 
              element={
                <ProtectedRoute allowedRoles={['volunteer']}>
                  <VolunteerSaved />
                </ProtectedRoute>
              } 
            />
            <Route 
              path="/volunteer/history" 
              element={
                <ProtectedRoute allowedRoles={['volunteer']}>
                  <VolunteerHistory />
                </ProtectedRoute>
              } 
            />
            
            {/* Protected admin routes */}
            <Route 
              path="/admin/dashboard" 
              element={
                <ProtectedRoute allowedRoles={['admin']}>
                  <AdminDashboard />
                </ProtectedRoute>
              } 
            />
            <Route 
              path="/admin/users" 
              element={
                <ProtectedRoute allowedRoles={['admin']}>
                  <AdminUserManagement />
                </ProtectedRoute>
              } 
            />
            <Route 
              path="/admin/organizations" 
              element={
                <ProtectedRoute allowedRoles={['admin']}>
                  <AdminOrganizations />
                </ProtectedRoute>
              } 
            />
            
            {/* Catch-all route */}
            <Route path="*" element={<NotFound />} />
          </Routes>
        </BrowserRouter>
      </TooltipProvider>
    </AuthProvider>
  </QueryClientProvider>
);

export default App;
