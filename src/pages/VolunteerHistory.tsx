
import React from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '@/contexts/AuthContext';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { ArrowLeft, Clock, MapPin, Award, Star } from 'lucide-react';
import { DialogTrigger, DialogTitle, DialogDescription, DialogHeader, DialogFooter, DialogContent, Dialog } from '@/components/ui/dialog';
import { Textarea } from '@/components/ui/textarea';
import { toast } from 'sonner';

const VolunteerHistory = () => {
  const { user } = useAuth();
  const navigate = useNavigate();
  
  // Mock volunteer history
  const volunteerHistory = [
    {
      id: '1',
      title: 'Beach Cleanup',
      organization: 'Ocean Conservation Alliance',
      date: '2023-06-15',
      hours: 4,
      location: 'Malibu Beach, CA',
      impact: 'Helped remove 50lbs of trash from the shoreline',
      status: 'completed',
      feedback: null
    },
    {
      id: '2',
      title: 'Food Bank Assistant',
      organization: 'City Food Bank',
      date: '2023-05-22',
      hours: 3,
      location: 'Downtown Community Center',
      impact: 'Packaged meals for 200+ families',
      status: 'completed',
      feedback: 'Great job! Thanks for your help.'
    },
    {
      id: '3',
      title: 'Tree Planting Event',
      organization: 'Green Earth Initiative',
      date: '2023-04-10',
      hours: 5,
      location: 'City Park',
      impact: 'Planted 15 native trees',
      status: 'completed',
      feedback: null
    },
  ];
  
  // Calculate total stats
  const totalHours = volunteerHistory.reduce((sum, activity) => sum + activity.hours, 0);
  const totalActivities = volunteerHistory.length;
  
  const handleFeedbackSubmit = (id: string, feedback: string) => {
    toast.success("Feedback submitted successfully!");
  };
  
  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      
      <main className="flex-grow container mx-auto px-4 py-8">
        <div className="mb-6">
          <Button 
            variant="ghost" 
            onClick={() => navigate("/volunteer/dashboard")}
            className="mb-4"
          >
            <ArrowLeft className="mr-2 h-4 w-4" />
            Back to Dashboard
          </Button>
          <h1 className="text-3xl font-bold">Volunteer History</h1>
          <p className="text-muted-foreground">
            Review your past volunteer activities and impact
          </p>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
          <Card>
            <CardHeader className="pb-2">
              <CardTitle className="text-lg">Total Hours</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-3xl font-bold">{totalHours}</p>
              <p className="text-sm text-muted-foreground">Hours contributed</p>
            </CardContent>
          </Card>
          
          <Card>
            <CardHeader className="pb-2">
              <CardTitle className="text-lg">Activities</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-3xl font-bold">{totalActivities}</p>
              <p className="text-sm text-muted-foreground">Activities completed</p>
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
        
        <Card>
          <CardHeader>
            <CardTitle>Past Activities</CardTitle>
            <CardDescription>
              Your volunteer activities and contributions
            </CardDescription>
          </CardHeader>
          <CardContent>
            {volunteerHistory.length > 0 ? (
              <div className="space-y-6">
                {volunteerHistory.map((activity) => (
                  <div 
                    key={activity.id} 
                    className="p-4 border rounded-md hover:border-drop-300 transition"
                  >
                    <div className="flex justify-between items-start">
                      <div>
                        <h3 className="font-semibold">{activity.title}</h3>
                        <p className="text-sm text-muted-foreground">
                          {activity.organization} • {new Date(activity.date).toLocaleDateString()}
                        </p>
                      </div>
                      <div>
                        <span className="inline-block px-2 py-1 text-xs rounded-full bg-green-100 text-green-800">
                          Completed
                        </span>
                      </div>
                    </div>
                    
                    <div className="mt-2 grid grid-cols-1 md:grid-cols-2 gap-2">
                      <div className="text-sm flex items-center text-muted-foreground">
                        <Clock className="mr-2 h-4 w-4" />
                        {activity.hours} hours
                      </div>
                      <div className="text-sm flex items-center text-muted-foreground">
                        <MapPin className="mr-2 h-4 w-4" />
                        {activity.location}
                      </div>
                    </div>
                    
                    <div className="mt-3 p-3 bg-gray-50 rounded-md">
                      <p className="text-sm font-medium">Your Impact:</p>
                      <p className="text-sm">{activity.impact}</p>
                    </div>
                    
                    {activity.feedback ? (
                      <div className="mt-3 p-3 bg-drop-50 rounded-md">
                        <div className="flex items-center">
                          <Star className="h-4 w-4 text-yellow-500 mr-2" />
                          <p className="text-sm font-medium">Organizer Feedback:</p>
                        </div>
                        <p className="text-sm mt-1">{activity.feedback}</p>
                      </div>
                    ) : (
                      <div className="mt-3 flex justify-between">
                        <Dialog>
                          <DialogTrigger asChild>
                            <Button variant="outline" size="sm">
                              <Star className="mr-2 h-4 w-4" />
                              Leave Feedback
                            </Button>
                          </DialogTrigger>
                          <DialogContent>
                            <DialogHeader>
                              <DialogTitle>Leave Feedback</DialogTitle>
                              <DialogDescription>
                                Share your experience volunteering for {activity.title} with {activity.organization}
                              </DialogDescription>
                            </DialogHeader>
                            <Textarea 
                              placeholder="What did you enjoy about this opportunity? Any suggestions for improvement?"
                              className="min-h-[120px]"
                            />
                            <DialogFooter>
                              <Button variant="outline">Cancel</Button>
                              <Button 
                                className="bg-drop-600 hover:bg-drop-700"
                                onClick={() => handleFeedbackSubmit(activity.id, "Great experience!")}
                              >
                                Submit Feedback
                              </Button>
                            </DialogFooter>
                          </DialogContent>
                        </Dialog>
                        
                        <Button variant="outline" size="sm">
                          <Award className="mr-2 h-4 w-4" />
                          View Certificate
                        </Button>
                      </div>
                    )}
                  </div>
                ))}
              </div>
            ) : (
              <div className="text-center py-8">
                <p className="text-muted-foreground mb-4">You haven't participated in any volunteer activities yet.</p>
                <Button asChild className="bg-drop-600 hover:bg-drop-700">
                  <a href="/opportunities">Browse Opportunities</a>
                </Button>
              </div>
            )}
          </CardContent>
        </Card>
      </main>
      
      <Footer />
    </div>
  );
};

export default VolunteerHistory;
