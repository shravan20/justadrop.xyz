import React, { useState } from 'react';
import { useParams, Link, useNavigate } from 'react-router-dom';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import { 
  formatDateRange, 
  getCategoryColor,
  getUrgencyColor,
} from '@/utils/formatters';
import { Button } from '@/components/ui/button';
import { Textarea } from '@/components/ui/textarea';
import { Input } from '@/components/ui/input';
import { Badge } from '@/components/ui/badge';
import {
  MapPin,
  Calendar,
  Clock,
  Mail,
  Phone,
  Share2,
  ChevronLeft,
  Heart,
  Loader2
} from 'lucide-react';
import { toast } from '@/components/ui/use-toast';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
  DialogFooter,
} from '@/components/ui/dialog';
import { fetchOpportunityById } from '@/services/opportunityService';
import { expressInterest, saveOpportunity } from '@/services/userService';
import { useQuery, useMutation } from '@tanstack/react-query';
import { useAuth } from '@/contexts/AuthContext';

const OpportunityDetail = () => {
  const { id } = useParams<{ id: string }>();
  const { user } = useAuth();
  const navigate = useNavigate();
  
  const [showInterestDialog, setShowInterestDialog] = useState(false);
  const [showDonateDialog, setShowDonateDialog] = useState(false);
  const [name, setName] = useState(user?.name || '');
  const [email, setEmail] = useState(user?.email || '');
  const [message, setMessage] = useState('');
  
  const { data: opportunity, isLoading, error } = useQuery({
    queryKey: ['opportunity', id],
    queryFn: () => fetchOpportunityById(id!),
    enabled: !!id,
  });
  
  const interestMutation = useMutation({
    mutationFn: () => {
      if (!user) {
        throw new Error('You must be logged in to express interest');
      }
      return expressInterest(user.id, id!, message);
    },
    onSuccess: () => {
      toast("Interest submitted! The organization will contact you soon.");
      setShowInterestDialog(false);
      setMessage('');
    },
    onError: (error: any) => {
      toast(error.message || 'Failed to submit interest. Please try again.');
    }
  });
  
  const saveMutation = useMutation({
    mutationFn: () => {
      if (!user) {
        throw new Error('You must be logged in to save an opportunity');
      }
      return saveOpportunity(user.id, id!);
    },
    onSuccess: () => {
      toast("Opportunity saved to your list!");
    },
    onError: (error: any) => {
      toast(error.message || 'Failed to save opportunity. Please try again.');
    }
  });
  
  const handleShare = () => {
    if (navigator.share) {
      navigator.share({
        title: opportunity?.title,
        text: opportunity?.description,
        url: window.location.href,
      })
      .catch(error => console.log('Error sharing:', error));
    } else {
      navigator.clipboard.writeText(window.location.href);
      toast("Link copied to clipboard");
    }
  };
  
  const handleSubmitInterest = (e: React.FormEvent) => {
    e.preventDefault();
    interestMutation.mutate();
  };
  
  const handleSubmitDonation = (e: React.FormEvent) => {
    e.preventDefault();
    interestMutation.mutate();
  };
  
  const handleSave = () => {
    if (!user) {
      toast('Please log in to save this opportunity');
      navigate('/login');
      return;
    }
    saveMutation.mutate();
  };
  
  if (isLoading) {
    return (
      <div className="min-h-screen flex flex-col">
        <Navbar />
        <main className="flex-grow container mx-auto px-4 md:px-6 py-16 flex items-center justify-center">
          <div className="text-center">
            <Loader2 className="h-8 w-8 animate-spin mx-auto mb-4" />
            <p>Loading opportunity details...</p>
          </div>
        </main>
        <Footer />
      </div>
    );
  }
  
  if (error || !opportunity) {
    return (
      <div className="min-h-screen flex flex-col">
        <Navbar />
        <main className="flex-grow container mx-auto px-4 md:px-6 py-16 flex items-center justify-center">
          <div className="text-center">
            <h1 className="text-3xl font-bold mb-4">Opportunity Not Found</h1>
            <p className="text-lg text-muted-foreground mb-6">
              The opportunity you're looking for doesn't exist or has been removed.
            </p>
            <Button asChild>
              <Link to="/opportunities">
                <ChevronLeft className="mr-2 h-4 w-4" />
                Back to Opportunities
              </Link>
            </Button>
          </div>
        </main>
        <Footer />
      </div>
    );
  }
  
  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      
      <main className="flex-grow container mx-auto px-4 md:px-6 py-8">
        <div className="mb-6">
          <Button variant="ghost" asChild className="pl-0">
            <Link to="/opportunities" className="flex items-center">
              <ChevronLeft className="mr-1 h-4 w-4" />
              Back to Opportunities
            </Link>
          </Button>
        </div>
        
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          <div className="lg:col-span-2">
            <div className="flex flex-wrap items-center gap-2 mb-4">
              <Badge variant="outline" className={getCategoryColor(opportunity.category)}>
                {opportunity.category.charAt(0).toUpperCase() + opportunity.category.slice(1)}
              </Badge>
              
              <Badge variant="outline" className={getUrgencyColor(opportunity.urgency)}>
                {opportunity.urgency.charAt(0).toUpperCase() + opportunity.urgency.slice(1)} priority
              </Badge>
              
              <Badge variant="outline">
                {opportunity.type === 'volunteer' ? 'Volunteer Opportunity' : 'Donation Request'}
              </Badge>
            </div>
            
            <h1 className="text-3xl font-bold mb-4">{opportunity.title}</h1>
            
            <div className="flex items-center mb-6">
              <img 
                src={opportunity.organizationLogo || '/placeholder.svg'} 
                alt={opportunity.organization} 
                className="w-10 h-10 rounded-full mr-3"
              />
              <div>
                <div className="font-medium">{opportunity.organization}</div>
                <div className="text-sm text-muted-foreground">
                  {opportunity.status === 'active' ? 'Actively recruiting' : opportunity.status}
                </div>
              </div>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-8">
              <div className="flex items-center">
                <MapPin className="h-5 w-5 mr-2 text-muted-foreground" />
                <span>{opportunity.isRemote ? 'Remote/Virtual' : opportunity.location}</span>
              </div>
              
              {(opportunity.startDate || opportunity.endDate) && (
                <div className="flex items-center">
                  <Calendar className="h-5 w-5 mr-2 text-muted-foreground" />
                  <span>{formatDateRange(opportunity.startDate, opportunity.endDate)}</span>
                </div>
              )}
              
              <div className="flex items-center">
                <Clock className="h-5 w-5 mr-2 text-muted-foreground" />
                <span>Posted {opportunity.createdAt.toLocaleDateString()}</span>
              </div>
              
              <div className="flex items-center">
                <Mail className="h-5 w-5 mr-2 text-muted-foreground" />
                <a href={`mailto:${opportunity.contactEmail}`} className="text-drop-600 hover:underline">
                  {opportunity.contactEmail}
                </a>
              </div>
              
              {opportunity.contactPhone && (
                <div className="flex items-center">
                  <Phone className="h-5 w-5 mr-2 text-muted-foreground" />
                  <a href={`tel:${opportunity.contactPhone}`} className="text-drop-600 hover:underline">
                    {opportunity.contactPhone}
                  </a>
                </div>
              )}
            </div>
            
            <div className="mb-8">
              <h2 className="text-xl font-semibold mb-4">About This Opportunity</h2>
              <div className="prose max-w-none">
                <p className="whitespace-pre-line">{opportunity.description}</p>
              </div>
            </div>
            
            {opportunity.requiredSkills && opportunity.requiredSkills.length > 0 && (
              <div className="mb-8">
                <h2 className="text-xl font-semibold mb-4">Required Skills</h2>
                <div className="flex flex-wrap gap-2">
                  {opportunity.requiredSkills.map((skill, index) => (
                    <Badge key={index} variant="secondary">
                      {skill}
                    </Badge>
                  ))}
                </div>
              </div>
            )}
            
            {opportunity.items && opportunity.items.length > 0 && (
              <div className="mb-8">
                <h2 className="text-xl font-semibold mb-4">Requested Items</h2>
                <ul className="list-disc pl-5 space-y-1">
                  {opportunity.items.map((item, index) => (
                    <li key={index}>{item}</li>
                  ))}
                </ul>
              </div>
            )}
          </div>
          
          <div className="lg:col-span-1">
            <div className="bg-white rounded-lg border p-6 sticky top-20">
              <h2 className="text-xl font-semibold mb-6">
                {opportunity.type === 'volunteer' ? 'Volunteer for This Opportunity' : 'Support This Cause'}
              </h2>
              
              {opportunity.type === 'volunteer' ? (
                <Button 
                  className="w-full mb-4 bg-drop-600 hover:bg-drop-700"
                  onClick={() => setShowInterestDialog(true)}
                  disabled={interestMutation.isPending}
                >
                  <Heart className="mr-2 h-4 w-4" />
                  {interestMutation.isPending ? 'Submitting...' : 'I\'m Interested'}
                </Button>
              ) : (
                <Button 
                  className="w-full mb-4 bg-drop-600 hover:bg-drop-700"
                  onClick={() => setShowDonateDialog(true)}
                  disabled={interestMutation.isPending}
                >
                  {interestMutation.isPending ? 'Submitting...' : 'Donate Items'}
                </Button>
              )}
              
              <Button 
                variant="outline" 
                className="w-full mb-4"
                onClick={handleShare}
              >
                <Share2 className="mr-2 h-4 w-4" />
                Share This Opportunity
              </Button>
              
              <Button 
                variant="outline" 
                className="w-full"
                onClick={handleSave}
                disabled={saveMutation.isPending}
              >
                <Heart className={`mr-2 h-4 w-4 ${saveMutation.isPending ? 'animate-pulse' : ''}`} />
                {saveMutation.isPending ? 'Saving...' : 'Save for Later'}
              </Button>
              
              <div className="mt-6 pt-6 border-t">
                <h3 className="font-medium mb-4">About {opportunity.organization}</h3>
                <p className="text-sm text-muted-foreground mb-4">
                  This opportunity is provided by {opportunity.organization}, a verified organization on our platform.
                </p>
                <Link 
                  to={`/organizations/${opportunity.organizationId}`} 
                  className="text-drop-600 hover:underline text-sm font-medium flex items-center"
                >
                  View organization profile
                  <ChevronLeft className="ml-1 h-4 w-4 rotate-180" />
                </Link>
              </div>
            </div>
          </div>
        </div>
      </main>
      
      {/* Interest Dialog */}
      <Dialog open={showInterestDialog} onOpenChange={setShowInterestDialog}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Express Interest</DialogTitle>
            <DialogDescription>
              Let the organization know you're interested in this volunteer opportunity.
            </DialogDescription>
          </DialogHeader>
          
          <form onSubmit={handleSubmitInterest}>
            <div className="grid gap-4 py-4">
              {!user && (
                <>
                  <div className="grid gap-2">
                    <label htmlFor="name" className="text-sm font-medium">
                      Your Name
                    </label>
                    <Input
                      id="name"
                      placeholder="Enter your full name"
                      value={name}
                      onChange={(e) => setName(e.target.value)}
                      required
                    />
                  </div>
                  
                  <div className="grid gap-2">
                    <label htmlFor="email" className="text-sm font-medium">
                      Email Address
                    </label>
                    <Input
                      id="email"
                      type="email"
                      placeholder="Enter your email address"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      required
                    />
                  </div>
                </>
              )}
              
              <div className="grid gap-2">
                <label htmlFor="message" className="text-sm font-medium">
                  Message
                </label>
                <Textarea
                  id="message"
                  placeholder="Share why you're interested or ask any questions"
                  value={message}
                  onChange={(e) => setMessage(e.target.value)}
                  rows={4}
                  required
                />
              </div>
            </div>
            
            <DialogFooter>
              <Button 
                type="button"
                variant="outline"
                onClick={() => setShowInterestDialog(false)}
                disabled={interestMutation.isPending}
              >
                Cancel
              </Button>
              <Button 
                type="submit"
                className="bg-drop-600 hover:bg-drop-700"
                disabled={interestMutation.isPending}
              >
                {interestMutation.isPending ? "Submitting..." : "Submit Interest"}
              </Button>
            </DialogFooter>
          </form>
        </DialogContent>
      </Dialog>
      
      {/* Donate Dialog */}
      <Dialog open={showDonateDialog} onOpenChange={setShowDonateDialog}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Donate Items</DialogTitle>
            <DialogDescription>
              Let the organization know you'd like to donate the requested items.
            </DialogDescription>
          </DialogHeader>
          
          <form onSubmit={handleSubmitDonation}>
            <div className="grid gap-4 py-4">
              {!user && (
                <>
                  <div className="grid gap-2">
                    <label htmlFor="donate-name" className="text-sm font-medium">
                      Your Name
                    </label>
                    <Input
                      id="donate-name"
                      placeholder="Enter your full name"
                      value={name}
                      onChange={(e) => setName(e.target.value)}
                      required
                    />
                  </div>
                  
                  <div className="grid gap-2">
                    <label htmlFor="donate-email" className="text-sm font-medium">
                      Email Address
                    </label>
                    <Input
                      id="donate-email"
                      type="email"
                      placeholder="Enter your email address"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      required
                    />
                  </div>
                </>
              )}
              
              <div className="grid gap-2">
                <label htmlFor="donate-message" className="text-sm font-medium">
                  Message
                </label>
                <Textarea
                  id="donate-message"
                  placeholder="List the items you'd like to donate and any questions"
                  value={message}
                  onChange={(e) => setMessage(e.target.value)}
                  rows={4}
                  required
                />
              </div>
            </div>
            
            <DialogFooter>
              <Button 
                type="button"
                variant="outline"
                onClick={() => setShowDonateDialog(false)}
                disabled={interestMutation.isPending}
              >
                Cancel
              </Button>
              <Button 
                type="submit"
                className="bg-drop-600 hover:bg-drop-700"
                disabled={interestMutation.isPending}
              >
                {interestMutation.isPending ? "Submitting..." : "Submit Donation Offer"}
              </Button>
            </DialogFooter>
          </form>
        </DialogContent>
      </Dialog>
      
      <Footer />
    </div>
  );
};

export default OpportunityDetail;
