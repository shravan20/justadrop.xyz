
import React from 'react';
import { Link } from 'react-router-dom';
import { useAuth } from '@/contexts/AuthContext';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { CheckCircle2, XCircle, Users, Shield, Settings, BarChart } from 'lucide-react';
import { mockOpportunities } from '@/data/mockData';

const AdminDashboard = () => {
  const { user } = useAuth();
  
  // In a real app, this would come from an API request
  const pendingOrganizations = [
    { id: '1', name: 'EcoRestore Foundation', email: 'contact@ecorestore.org', appliedOn: '2023-06-15' },
    { id: '2', name: 'Children First Alliance', email: 'info@childrenalliance.org', appliedOn: '2023-06-17' },
  ];
  
  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      
      <main className="flex-grow container mx-auto px-4 py-8">
        <div className="mb-8">
          <h1 className="text-3xl font-bold">Admin Dashboard</h1>
          <p className="text-muted-foreground">
            Welcome back, {user?.name || 'Admin'}! Manage the platform and monitor activities.
          </p>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          <Card>
            <CardHeader className="pb-2">
              <CardTitle className="text-lg">Total Users</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-3xl font-bold">248</p>
            </CardContent>
          </Card>
          
          <Card>
            <CardHeader className="pb-2">
              <CardTitle className="text-lg">Organizations</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-3xl font-bold">37</p>
            </CardContent>
          </Card>
          
          <Card>
            <CardHeader className="pb-2">
              <CardTitle className="text-lg">Active Opportunities</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-3xl font-bold">{mockOpportunities.length}</p>
            </CardContent>
          </Card>
          
          <Card>
            <CardHeader className="pb-2">
              <CardTitle className="text-lg">Pending Approvals</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-3xl font-bold">{pendingOrganizations.length}</p>
            </CardContent>
          </Card>
        </div>
        
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-8">
          <div className="col-span-2">
            <Card className="h-full">
              <CardHeader>
                <CardTitle>Pending Organization Approvals</CardTitle>
                <CardDescription>Organizations waiting for verification</CardDescription>
              </CardHeader>
              <CardContent>
                {pendingOrganizations.length > 0 ? (
                  <div className="space-y-4">
                    {pendingOrganizations.map((org) => (
                      <div 
                        key={org.id} 
                        className="p-4 border rounded-md hover:border-drop-300 transition"
                      >
                        <div className="flex justify-between items-start">
                          <div>
                            <h3 className="font-semibold">{org.name}</h3>
                            <p className="text-sm text-muted-foreground">
                              {org.email} • Applied: {org.appliedOn}
                            </p>
                          </div>
                          <div className="flex space-x-2">
                            <Button 
                              size="sm" 
                              className="bg-green-600 hover:bg-green-700"
                              onClick={() => {
                                // In a real app, this would call an API
                                alert(`Approved ${org.name}`);
                              }}
                            >
                              <CheckCircle2 className="h-4 w-4 mr-1" />
                              Approve
                            </Button>
                            <Button 
                              size="sm" 
                              variant="destructive"
                              onClick={() => {
                                // In a real app, this would call an API
                                alert(`Rejected ${org.name}`);
                              }}
                            >
                              <XCircle className="h-4 w-4 mr-1" />
                              Reject
                            </Button>
                          </div>
                        </div>
                        <div className="mt-2">
                          <Link 
                            to={`/admin/organization/${org.id}`} 
                            className="text-drop-600 hover:underline text-sm"
                          >
                            View details
                          </Link>
                        </div>
                      </div>
                    ))}
                  </div>
                ) : (
                  <div className="text-center py-8">
                    <p className="text-muted-foreground">No pending organization approvals.</p>
                  </div>
                )}
              </CardContent>
              {pendingOrganizations.length > 0 && (
                <CardFooter>
                  <Button asChild variant="outline" className="w-full">
                    <Link to="/admin/organizations">View all organizations</Link>
                  </Button>
                </CardFooter>
              )}
            </Card>
          </div>
          
          <div>
            <Card className="h-full">
              <CardHeader>
                <CardTitle>Admin Controls</CardTitle>
                <CardDescription>Platform management tools</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <Button asChild variant="outline" className="w-full justify-start">
                  <Link to="/admin/users">
                    <Users className="mr-2 h-4 w-4" />
                    User Management
                  </Link>
                </Button>
                <Button asChild variant="outline" className="w-full justify-start">
                  <Link to="/admin/organizations">
                    <Shield className="mr-2 h-4 w-4" />
                    Organizations
                  </Link>
                </Button>
                <Button asChild variant="outline" className="w-full justify-start">
                  <Link to="/admin/content">
                    <BarChart className="mr-2 h-4 w-4" />
                    Content & Reports
                  </Link>
                </Button>
                <Button asChild variant="outline" className="w-full justify-start">
                  <Link to="/admin/settings">
                    <Settings className="mr-2 h-4 w-4" />
                    Platform Settings
                  </Link>
                </Button>
              </CardContent>
            </Card>
          </div>
        </div>
      </main>
      
      <Footer />
    </div>
  );
};

export default AdminDashboard;
