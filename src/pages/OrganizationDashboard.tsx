
import React from 'react';
import { Link } from 'react-router-dom';
import { useAuth } from '@/contexts/AuthContext';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { PlusCircle, Users, Settings, Calendar, ClipboardList } from 'lucide-react';
import { mockOpportunities } from '@/data/mockData';

const OrganizationDashboard = () => {
  const { user } = useAuth();
  
  // Filter opportunities to show only those created by this organization
  // In a real app, this would come from an API request with proper filtering
  const orgOpportunities = mockOpportunities.slice(0, 2); // Just showing 2 for demo
  
  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      
      <main className="flex-grow container mx-auto px-4 py-8">
        <div className="mb-8">
          <h1 className="text-3xl font-bold">Organization Dashboard</h1>
          <p className="text-muted-foreground">
            Welcome back, {user?.name || 'Organization'}! Manage your opportunities and volunteers.
          </p>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          <Card>
            <CardHeader className="pb-2">
              <CardTitle className="text-lg">Total Opportunities</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-3xl font-bold">{orgOpportunities.length}</p>
            </CardContent>
          </Card>
          
          <Card>
            <CardHeader className="pb-2">
              <CardTitle className="text-lg">Active Volunteers</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-3xl font-bold">12</p>
            </CardContent>
          </Card>
          
          <Card>
            <CardHeader className="pb-2">
              <CardTitle className="text-lg">Pending Applications</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-3xl font-bold">5</p>
            </CardContent>
          </Card>
          
          <Card>
            <CardHeader className="pb-2">
              <CardTitle className="text-lg">Impact Score</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-3xl font-bold">87</p>
            </CardContent>
          </Card>
        </div>
        
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-8">
          <div className="col-span-2">
            <Card className="h-full">
              <CardHeader>
                <div className="flex justify-between items-center">
                  <CardTitle>Your Opportunities</CardTitle>
                  <Button asChild className="bg-drop-600 hover:bg-drop-700">
                    <Link to="/organization/create-opportunity">
                      <PlusCircle className="mr-2 h-4 w-4" />
                      New Opportunity
                    </Link>
                  </Button>
                </div>
                <CardDescription>Manage your volunteer and donation needs</CardDescription>
              </CardHeader>
              <CardContent>
                {orgOpportunities.length > 0 ? (
                  <div className="space-y-4">
                    {orgOpportunities.map((opportunity) => (
                      <div 
                        key={opportunity.id} 
                        className="p-4 border rounded-md hover:border-drop-300 transition"
                      >
                        <div className="flex justify-between items-start">
                          <div>
                            <h3 className="font-semibold">{opportunity.title}</h3>
                            <p className="text-sm text-muted-foreground">
                              {opportunity.type} • {opportunity.category} • {opportunity.urgency} priority
                            </p>
                          </div>
                          <div>
                            <span className={`inline-block px-2 py-1 text-xs rounded-full 
                              ${opportunity.status === 'active' ? 'bg-green-100 text-green-800' : 
                                opportunity.status === 'completed' ? 'bg-blue-100 text-blue-800' : 
                                'bg-orange-100 text-orange-800'}`}>
                              {opportunity.status.charAt(0).toUpperCase() + opportunity.status.slice(1)}
                            </span>
                          </div>
                        </div>
                        <div className="mt-2 text-sm">
                          {opportunity.description.substring(0, 100)}...
                        </div>
                        <div className="mt-3">
                          <Link 
                            to={`/opportunities/${opportunity.id}`} 
                            className="text-drop-600 hover:underline text-sm mr-4"
                          >
                            View details
                          </Link>
                          <Link 
                            to={`/organization/edit-opportunity/${opportunity.id}`} 
                            className="text-drop-600 hover:underline text-sm"
                          >
                            Edit
                          </Link>
                        </div>
                      </div>
                    ))}
                  </div>
                ) : (
                  <div className="text-center py-8">
                    <p className="text-muted-foreground mb-4">You haven't created any opportunities yet.</p>
                    <Button asChild className="bg-drop-600 hover:bg-drop-700">
                      <Link to="/organization/create-opportunity">Create your first opportunity</Link>
                    </Button>
                  </div>
                )}
              </CardContent>
              {orgOpportunities.length > 0 && (
                <CardFooter>
                  <Button asChild variant="outline" className="w-full">
                    <Link to="/organization/opportunities">View all opportunities</Link>
                  </Button>
                </CardFooter>
              )}
            </Card>
          </div>
          
          <div>
            <Card className="h-full">
              <CardHeader>
                <CardTitle>Quick Actions</CardTitle>
                <CardDescription>Common tasks for your organization</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <Button asChild variant="outline" className="w-full justify-start">
                  <Link to="/organization/create-opportunity">
                    <PlusCircle className="mr-2 h-4 w-4" />
                    Create new opportunity
                  </Link>
                </Button>
                <Button asChild variant="outline" className="w-full justify-start">
                  <Link to="/organization/volunteers">
                    <Users className="mr-2 h-4 w-4" />
                    Manage volunteers
                  </Link>
                </Button>
                <Button asChild variant="outline" className="w-full justify-start">
                  <Link to="/organization/applications">
                    <ClipboardList className="mr-2 h-4 w-4" />
                    Review applications
                  </Link>
                </Button>
                <Button asChild variant="outline" className="w-full justify-start">
                  <Link to="/organization/calendar">
                    <Calendar className="mr-2 h-4 w-4" />
                    View schedule
                  </Link>
                </Button>
                <Button asChild variant="outline" className="w-full justify-start">
                  <Link to="/organization/settings">
                    <Settings className="mr-2 h-4 w-4" />
                    Organization settings
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

export default OrganizationDashboard;
