
import React from 'react';
import { Link } from 'react-router-dom';
import { useAuth } from '@/contexts/AuthContext';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Search, Heart, Clock, Star, Award, Calendar } from 'lucide-react';
import { mockOpportunities } from '@/data/mockData';

const VolunteerDashboard = () => {
  const { user } = useAuth();
  
  // In a real app, this would come from an API request with proper filtering
  const upcomingOpportunities = mockOpportunities.slice(0, 2); // Just showing 2 for demo
  
  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      
      <main className="flex-grow container mx-auto px-4 py-8">
        <div className="mb-8">
          <h1 className="text-3xl font-bold">Volunteer Dashboard</h1>
          <p className="text-muted-foreground">
            Welcome back, {user?.name || 'Volunteer'}! Track your activities and find new opportunities.
          </p>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          <Card>
            <CardHeader className="pb-2">
              <CardTitle className="text-lg">Hours Volunteered</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-3xl font-bold">24</p>
              <p className="text-sm text-muted-foreground">This month</p>
            </CardContent>
          </Card>
          
          <Card>
            <CardHeader className="pb-2">
              <CardTitle className="text-lg">Participations</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-3xl font-bold">7</p>
              <p className="text-sm text-muted-foreground">Total events</p>
            </CardContent>
          </Card>
          
          <Card>
            <CardHeader className="pb-2">
              <CardTitle className="text-lg">Skill Badges</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-3xl font-bold">3</p>
              <p className="text-sm text-muted-foreground">Earned</p>
            </CardContent>
          </Card>
          
          <Card>
            <CardHeader className="pb-2">
              <CardTitle className="text-lg">Impact Score</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-3xl font-bold">92</p>
              <p className="text-sm text-muted-foreground">Community impact</p>
            </CardContent>
          </Card>
        </div>
        
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-8">
          <div className="col-span-2">
            <Card className="h-full">
              <CardHeader>
                <div className="flex justify-between items-center">
                  <CardTitle>Your Upcoming Activities</CardTitle>
                  <Button asChild className="bg-drop-600 hover:bg-drop-700">
                    <Link to="/opportunities">
                      <Search className="mr-2 h-4 w-4" />
                      Find Opportunities
                    </Link>
                  </Button>
                </div>
                <CardDescription>Activities you've signed up for</CardDescription>
              </CardHeader>
              <CardContent>
                {upcomingOpportunities.length > 0 ? (
                  <div className="space-y-4">
                    {upcomingOpportunities.map((opportunity) => (
                      <div 
                        key={opportunity.id} 
                        className="p-4 border rounded-md hover:border-drop-300 transition"
                      >
                        <div className="flex justify-between items-start">
                          <div>
                            <h3 className="font-semibold">{opportunity.title}</h3>
                            <p className="text-sm text-muted-foreground">
                              {opportunity.organization} • {opportunity.type} • {opportunity.category}
                            </p>
                          </div>
                          <div>
                            <span className={`inline-block px-2 py-1 text-xs rounded-full bg-drop-100 text-drop-800`}>
                              Confirmed
                            </span>
                          </div>
                        </div>
                        <div className="mt-2 text-sm">
                          {opportunity.description.substring(0, 100)}...
                        </div>
                        <div className="mt-2 text-sm">
                          <Clock className="inline-block w-4 h-4 mr-1" />
                          {opportunity.startDate ? new Date(opportunity.startDate).toLocaleDateString() : 'Flexible dates'}
                        </div>
                        <div className="mt-3">
                          <Link 
                            to={`/opportunities/${opportunity.id}`} 
                            className="text-drop-600 hover:underline text-sm mr-4"
                          >
                            View details
                          </Link>
                        </div>
                      </div>
                    ))}
                  </div>
                ) : (
                  <div className="text-center py-8">
                    <p className="text-muted-foreground mb-4">You haven't signed up for any opportunities yet.</p>
                    <Button asChild className="bg-drop-600 hover:bg-drop-700">
                      <Link to="/opportunities">Browse opportunities</Link>
                    </Button>
                  </div>
                )}
              </CardContent>
              {upcomingOpportunities.length > 0 && (
                <CardFooter>
                  <Button asChild variant="outline" className="w-full">
                    <Link to="/volunteer/activities">View all activities</Link>
                  </Button>
                </CardFooter>
              )}
            </Card>
          </div>
          
          <div>
            <Card className="h-full">
              <CardHeader>
                <CardTitle>Quick Actions</CardTitle>
                <CardDescription>Tools and resources for volunteers</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <Button asChild variant="outline" className="w-full justify-start">
                  <Link to="/opportunities">
                    <Search className="mr-2 h-4 w-4" />
                    Browse opportunities
                  </Link>
                </Button>
                <Button asChild variant="outline" className="w-full justify-start">
                  <Link to="/volunteer/saved">
                    <Heart className="mr-2 h-4 w-4" />
                    Saved opportunities
                  </Link>
                </Button>
                <Button asChild variant="outline" className="w-full justify-start">
                  <Link to="/volunteer/history">
                    <Clock className="mr-2 h-4 w-4" />
                    Volunteer history
                  </Link>
                </Button>
                <Button asChild variant="outline" className="w-full justify-start">
                  <Link to="/volunteer/skills">
                    <Star className="mr-2 h-4 w-4" />
                    My skills & interests
                  </Link>
                </Button>
                <Button asChild variant="outline" className="w-full justify-start">
                  <Link to="/volunteer/badges">
                    <Award className="mr-2 h-4 w-4" />
                    Achievements & badges
                  </Link>
                </Button>
                <Button asChild variant="outline" className="w-full justify-start">
                  <Link to="/volunteer/calendar">
                    <Calendar className="mr-2 h-4 w-4" />
                    My schedule
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

export default VolunteerDashboard;
