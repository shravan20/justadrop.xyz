
import React from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '@/contexts/AuthContext';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { ArrowLeft, CheckCircle2, XCircle, MessageSquare } from 'lucide-react';
import { 
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Textarea } from '@/components/ui/textarea';
import { toast } from 'sonner';

const OrganizationApplications = () => {
  const { user } = useAuth();
  const navigate = useNavigate();
  
  // Mock applications data
  const applications = [
    {
      id: '1',
      applicantName: 'Robert Smith',
      applicantEmail: 'robert@example.com',
      opportunityTitle: 'Beach Cleanup Event',
      message: "I'm very interested in helping with the beach cleanup. I've participated in similar events before and have experience organizing volunteers.",
      appliedDate: '2023-07-05',
      status: 'pending',
      applicantImage: null
    },
    {
      id: '2',
      applicantName: 'Emily Johnson',
      applicantEmail: 'emily@example.com',
      opportunityTitle: 'Food Bank Assistant',
      message: "I would love to help at the food bank. I have excellent organizational skills and am available every weekend.",
      appliedDate: '2023-07-03',
      status: 'pending',
      applicantImage: null
    },
    {
      id: '3',
      applicantName: 'David Wilson',
      applicantEmail: 'david@example.com',
      opportunityTitle: 'Marketing Volunteer',
      message: "I'm a marketing professional with 5 years of experience in digital campaigns. I'd be happy to help promote your cause!",
      appliedDate: '2023-07-01',
      status: 'pending',
      applicantImage: null
    },
  ];
  
  const handleApprove = (applicationId: string) => {
    // In a real app, this would call an API
    toast.success("Application approved!");
  };
  
  const handleReject = (applicationId: string) => {
    // In a real app, this would call an API
    toast.success("Application rejected.");
  };
  
  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      
      <main className="flex-grow container mx-auto px-4 py-8">
        <div className="mb-6">
          <Button 
            variant="ghost" 
            onClick={() => navigate("/organization/dashboard")}
            className="mb-4"
          >
            <ArrowLeft className="mr-2 h-4 w-4" />
            Back to Dashboard
          </Button>
          <h1 className="text-3xl font-bold">Review Applications</h1>
          <p className="text-muted-foreground">
            Review and respond to volunteer applications for your opportunities
          </p>
        </div>
        
        <Card>
          <CardHeader>
            <CardTitle>Pending Applications</CardTitle>
            <CardDescription>
              Volunteers who have applied to your opportunities
            </CardDescription>
          </CardHeader>
          <CardContent>
            {applications.length > 0 ? (
              <div className="space-y-6">
                {applications.map((application) => (
                  <div 
                    key={application.id} 
                    className="p-4 border rounded-md hover:border-drop-300 transition"
                  >
                    <div className="flex flex-col md:flex-row md:items-start gap-4">
                      <Avatar className="h-12 w-12">
                        <AvatarImage src={application.applicantImage || undefined} alt={application.applicantName} />
                        <AvatarFallback>{application.applicantName.split(' ').map(n => n[0]).join('')}</AvatarFallback>
                      </Avatar>
                      
                      <div className="flex-grow">
                        <h3 className="font-semibold">{application.applicantName}</h3>
                        <p className="text-sm text-muted-foreground">
                          {application.applicantEmail} • Applied: {new Date(application.appliedDate).toLocaleDateString()}
                        </p>
                        <p className="text-sm font-medium mt-2">
                          Applied for: <span className="text-drop-600">{application.opportunityTitle}</span>
                        </p>
                        <p className="mt-2 text-sm bg-gray-50 p-3 rounded-md">
                          "{application.message}"
                        </p>
                      </div>
                      
                      <div className="flex space-x-2 md:flex-col md:space-x-0 md:space-y-2 mt-4 md:mt-0">
                        <Button 
                          className="bg-green-600 hover:bg-green-700 flex-1 md:flex-auto"
                          size="sm"
                          onClick={() => handleApprove(application.id)}
                        >
                          <CheckCircle2 className="mr-1 h-4 w-4" />
                          Approve
                        </Button>
                        
                        <Dialog>
                          <DialogTrigger asChild>
                            <Button 
                              variant="outline"
                              size="sm"
                              className="flex-1 md:flex-auto"
                            >
                              <MessageSquare className="mr-1 h-4 w-4" />
                              Reply
                            </Button>
                          </DialogTrigger>
                          <DialogContent>
                            <DialogHeader>
                              <DialogTitle>Reply to {application.applicantName}</DialogTitle>
                              <DialogDescription>
                                Send a message regarding their application for "{application.opportunityTitle}"
                              </DialogDescription>
                            </DialogHeader>
                            <Textarea 
                              placeholder="Type your message here..." 
                              className="min-h-[120px]"
                            />
                            <DialogFooter>
                              <Button variant="outline" onClick={() => console.log('Dialog closed')}>
                                Cancel
                              </Button>
                              <Button className="bg-drop-600 hover:bg-drop-700" onClick={() => {
                                toast.success("Message sent!");
                              }}>
                                Send Message
                              </Button>
                            </DialogFooter>
                          </DialogContent>
                        </Dialog>
                        
                        <Button 
                          variant="destructive"
                          size="sm"
                          className="flex-1 md:flex-auto"
                          onClick={() => handleReject(application.id)}
                        >
                          <XCircle className="mr-1 h-4 w-4" />
                          Reject
                        </Button>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            ) : (
              <div className="text-center py-8">
                <p className="text-muted-foreground">No pending applications at the moment.</p>
              </div>
            )}
          </CardContent>
        </Card>
      </main>
      
      <Footer />
    </div>
  );
};

export default OrganizationApplications;
