
import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '@/contexts/AuthContext';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { ArrowLeft, Heart, Clock, MapPin, Trash2 } from 'lucide-react';
import { Opportunity } from '@/types';
import { toast } from 'sonner';
import { fetchSavedOpportunities, removeSavedOpportunity } from '@/services/userService';
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';

const VolunteerSaved = () => {
  const { user } = useAuth();
  const navigate = useNavigate();
  const queryClient = useQueryClient();
  
  const { data: savedOpportunities, isLoading, error } = useQuery({
    queryKey: ['savedOpportunities', user?.id],
    queryFn: () => fetchSavedOpportunities(user?.id || ''),
    enabled: !!user,
  });
  
  const removeMutation = useMutation({
    mutationFn: (opportunityId: string) => 
      removeSavedOpportunity(user?.id || '', opportunityId),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['savedOpportunities', user?.id] });
      toast.success("Opportunity removed from saved list");
    },
    onError: (error) => {
      console.error('Error removing saved opportunity:', error);
      toast.error("Failed to remove opportunity. Please try again.");
    }
  });
  
  const handleRemove = (id: string) => {
    removeMutation.mutate(id);
  };
  
  const handleApply = (id: string) => {
    navigate(`/opportunities/${id}`);
  };
  
  if (isLoading) {
    return (
      <div className="min-h-screen flex flex-col">
        <Navbar />
        <main className="flex-grow container mx-auto px-4 py-8">
          <div className="flex justify-center items-center h-64">
            <p>Loading your saved opportunities...</p>
          </div>
        </main>
        <Footer />
      </div>
    );
  }
  
  if (error) {
    return (
      <div className="min-h-screen flex flex-col">
        <Navbar />
        <main className="flex-grow container mx-auto px-4 py-8">
          <div className="flex justify-center items-center h-64 flex-col">
            <p className="text-red-500 mb-4">Error loading saved opportunities</p>
            <Button onClick={() => navigate("/volunteer/dashboard")}>
              Return to Dashboard
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
          <h1 className="text-3xl font-bold">Saved Opportunities</h1>
          <p className="text-muted-foreground">
            Opportunities you've saved for later
          </p>
        </div>
        
        <Card>
          <CardHeader>
            <CardTitle>Your Saved List</CardTitle>
            <CardDescription>
              Opportunities you've marked as interesting
            </CardDescription>
          </CardHeader>
          <CardContent>
            {savedOpportunities && savedOpportunities.length > 0 ? (
              <div className="space-y-4">
                {savedOpportunities.map((opportunity) => (
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
                      <Button 
                        variant="ghost" 
                        size="icon"
                        className="text-red-500 hover:text-red-700 hover:bg-red-50"
                        onClick={() => handleRemove(opportunity.id)}
                      >
                        <Trash2 className="h-5 w-5" />
                      </Button>
                    </div>
                    <div className="mt-2 space-y-2">
                      <div className="text-sm flex items-center text-muted-foreground">
                        <MapPin className="mr-2 h-4 w-4" />
                        {opportunity.location} {opportunity.isRemote && '(Remote available)'}
                      </div>
                      {opportunity.startDate && (
                        <div className="text-sm flex items-center text-muted-foreground">
                          <Clock className="mr-2 h-4 w-4" />
                          Starts: {opportunity.startDate.toLocaleDateString()}
                        </div>
                      )}
                      <div className="mt-2">
                        <span className={`inline-block px-2 py-1 text-xs rounded-full 
                          ${opportunity.urgency === 'high' || opportunity.urgency === 'critical' 
                            ? 'bg-red-100 text-red-800' 
                            : 'bg-blue-100 text-blue-800'}`}>
                          {opportunity.urgency.charAt(0).toUpperCase() + opportunity.urgency.slice(1)} priority
                        </span>
                      </div>
                    </div>
                    <div className="mt-3 flex space-x-2">
                      <Button 
                        className="bg-drop-600 hover:bg-drop-700"
                        onClick={() => handleApply(opportunity.id)}
                      >
                        Apply Now
                      </Button>
                      <Button 
                        variant="outline"
                        onClick={() => navigate(`/opportunities/${opportunity.id}`)}
                      >
                        View Details
                      </Button>
                    </div>
                  </div>
                ))}
              </div>
            ) : (
              <div className="text-center py-8">
                <Heart className="mx-auto h-12 w-12 text-muted-foreground" />
                <h3 className="mt-4 text-lg font-medium">No saved opportunities</h3>
                <p className="mt-2 text-muted-foreground">
                  You haven't saved any opportunities yet.
                </p>
                <Button 
                  asChild
                  className="mt-4 bg-drop-600 hover:bg-drop-700"
                >
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

export default VolunteerSaved;
