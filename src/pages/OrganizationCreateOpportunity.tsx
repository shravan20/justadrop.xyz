
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '@/contexts/AuthContext';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Label } from '@/components/ui/label';
import { 
  Select, 
  SelectContent, 
  SelectItem, 
  SelectTrigger, 
  SelectValue 
} from '@/components/ui/select';
import { Checkbox } from '@/components/ui/checkbox';
import { CalendarIcon, ArrowLeft, Save } from 'lucide-react';
import { OpportunityCategory, OpportunityType, OpportunityUrgency } from '@/types';
import { format } from 'date-fns';
import { Calendar } from '@/components/ui/calendar';
import { Popover, PopoverContent, PopoverTrigger } from '@/components/ui/popover';
import { cn } from '@/lib/utils';
import { toast } from 'sonner';
import { createOpportunity } from '@/services/opportunityService';
import { useMutation } from '@tanstack/react-query';

const OrganizationCreateOpportunity = () => {
  const { user } = useAuth();
  const navigate = useNavigate();
  
  // Form state
  const [formData, setFormData] = useState({
    title: '',
    description: '',
    type: 'volunteer' as OpportunityType,
    category: 'community' as OpportunityCategory,
    location: '',
    isRemote: false,
    startDate: null as Date | null,
    endDate: null as Date | null,
    urgency: 'medium' as OpportunityUrgency,
    requiredSkills: '',
    items: '',
    contactEmail: user?.email || '',
    contactPhone: '',
  });

  const createMutation = useMutation({
    mutationFn: async () => {
      if (!user) throw new Error('User not authenticated');
      
      // Process skills and items from string to array
      const requiredSkills = formData.requiredSkills
        ? formData.requiredSkills.split(',').map(skill => skill.trim())
        : [];
        
      const items = formData.items
        ? formData.items.split(',').map(item => item.trim())
        : [];
      
      return createOpportunity({
        title: formData.title,
        description: formData.description,
        organization: user.name,
        organizationId: user.id,
        type: formData.type,
        category: formData.category,
        location: formData.location,
        isRemote: formData.isRemote,
        startDate: formData.startDate,
        endDate: formData.endDate,
        urgency: formData.urgency,
        status: 'active',
        requiredSkills,
        items,
        contactEmail: formData.contactEmail,
        contactPhone: formData.contactPhone || undefined,
      });
    },
    onSuccess: () => {
      toast.success("Opportunity created successfully!");
      navigate("/organization/dashboard");
    },
    onError: (error: any) => {
      console.error('Error creating opportunity:', error);
      toast.error(error.message || "Failed to create opportunity. Please try again.");
    }
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    // Validation
    if (!formData.title || !formData.description || !formData.location || !formData.contactEmail) {
      toast.error("Please fill in all required fields");
      return;
    }

    createMutation.mutate();
  };

  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      
      <main className="flex-grow container mx-auto px-4 py-8">
        <div className="mb-4">
          <Button 
            variant="ghost" 
            onClick={() => navigate("/organization/dashboard")}
            className="mb-4"
          >
            <ArrowLeft className="mr-2 h-4 w-4" />
            Back to Dashboard
          </Button>
          <h1 className="text-3xl font-bold">Create New Opportunity</h1>
          <p className="text-muted-foreground">
            Post a new volunteer opportunity or donation request
          </p>
        </div>
        
        <Card>
          <form onSubmit={handleSubmit}>
            <CardHeader>
              <CardTitle>Opportunity Details</CardTitle>
              <CardDescription>
                Provide information about your opportunity to attract the right volunteers or donors
              </CardDescription>
            </CardHeader>
            
            <CardContent className="space-y-6">
              <div className="space-y-4">
                <div>
                  <Label htmlFor="title" className="text-base">Title <span className="text-red-500">*</span></Label>
                  <Input
                    id="title"
                    name="title"
                    placeholder="E.g., Beach Cleanup Volunteers Needed"
                    value={formData.title}
                    onChange={handleChange}
                    className="mt-1"
                    required
                  />
                </div>
                
                <div>
                  <Label htmlFor="description" className="text-base">Description <span className="text-red-500">*</span></Label>
                  <Textarea
                    id="description"
                    name="description"
                    placeholder="Provide details about the opportunity, required commitment, and expected impact..."
                    value={formData.description}
                    onChange={handleChange}
                    className="mt-1 min-h-[120px]"
                    required
                  />
                </div>
                
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <Label htmlFor="type" className="text-base">Opportunity Type</Label>
                    <Select
                      value={formData.type}
                      onValueChange={(value) => setFormData(prev => ({ ...prev, type: value as OpportunityType }))}
                    >
                      <SelectTrigger id="type" className="mt-1">
                        <SelectValue placeholder="Select type" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="volunteer">Volunteer Work</SelectItem>
                        <SelectItem value="donation">Donation Request</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                  
                  <div>
                    <Label htmlFor="category" className="text-base">Category</Label>
                    <Select
                      value={formData.category}
                      onValueChange={(value) => setFormData(prev => ({ ...prev, category: value as OpportunityCategory }))}
                    >
                      <SelectTrigger id="category" className="mt-1">
                        <SelectValue placeholder="Select category" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="education">Education</SelectItem>
                        <SelectItem value="health">Health</SelectItem>
                        <SelectItem value="environment">Environment</SelectItem>
                        <SelectItem value="poverty">Poverty Reduction</SelectItem>
                        <SelectItem value="crisis">Crisis Response</SelectItem>
                        <SelectItem value="community">Community Development</SelectItem>
                        <SelectItem value="arts">Arts & Culture</SelectItem>
                        <SelectItem value="animals">Animal Welfare</SelectItem>
                        <SelectItem value="other">Other</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                </div>
                
                <div>
                  <Label htmlFor="location" className="text-base">Location <span className="text-red-500">*</span></Label>
                  <Input
                    id="location"
                    name="location"
                    placeholder="E.g., San Francisco, CA"
                    value={formData.location}
                    onChange={handleChange}
                    className="mt-1"
                    required
                  />
                  <div className="flex items-center space-x-2 mt-2">
                    <Checkbox
                      id="isRemote"
                      checked={formData.isRemote}
                      onCheckedChange={(checked) => 
                        setFormData(prev => ({ ...prev, isRemote: checked === true }))
                      }
                    />
                    <label
                      htmlFor="isRemote"
                      className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                    >
                      This opportunity can be done remotely
                    </label>
                  </div>
                </div>
                
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <Label htmlFor="startDate" className="text-base">Start Date</Label>
                    <div className="mt-1">
                      <Popover>
                        <PopoverTrigger asChild>
                          <Button
                            variant={"outline"}
                            className={cn(
                              "w-full justify-start text-left font-normal",
                              !formData.startDate && "text-muted-foreground"
                            )}
                          >
                            <CalendarIcon className="mr-2 h-4 w-4" />
                            {formData.startDate ? format(formData.startDate, "PPP") : <span>Pick a date</span>}
                          </Button>
                        </PopoverTrigger>
                        <PopoverContent className="w-auto p-0">
                          <Calendar
                            mode="single"
                            selected={formData.startDate || undefined}
                            onSelect={(date) => setFormData(prev => ({ ...prev, startDate: date }))}
                            initialFocus
                          />
                        </PopoverContent>
                      </Popover>
                    </div>
                  </div>
                  
                  <div>
                    <Label htmlFor="endDate" className="text-base">End Date</Label>
                    <div className="mt-1">
                      <Popover>
                        <PopoverTrigger asChild>
                          <Button
                            variant={"outline"}
                            className={cn(
                              "w-full justify-start text-left font-normal",
                              !formData.endDate && "text-muted-foreground"
                            )}
                          >
                            <CalendarIcon className="mr-2 h-4 w-4" />
                            {formData.endDate ? format(formData.endDate, "PPP") : <span>Pick a date</span>}
                          </Button>
                        </PopoverTrigger>
                        <PopoverContent className="w-auto p-0">
                          <Calendar
                            mode="single"
                            selected={formData.endDate || undefined}
                            onSelect={(date) => setFormData(prev => ({ ...prev, endDate: date }))}
                            initialFocus
                          />
                        </PopoverContent>
                      </Popover>
                    </div>
                  </div>
                </div>
                
                <div>
                  <Label htmlFor="urgency" className="text-base">Urgency Level</Label>
                  <Select
                    value={formData.urgency}
                    onValueChange={(value) => setFormData(prev => ({ ...prev, urgency: value as OpportunityUrgency }))}
                  >
                    <SelectTrigger id="urgency" className="mt-1">
                      <SelectValue placeholder="Select urgency" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="low">Low - Flexible timeline</SelectItem>
                      <SelectItem value="medium">Medium - Needed soon</SelectItem>
                      <SelectItem value="high">High - Urgent need</SelectItem>
                      <SelectItem value="critical">Critical - Immediate response required</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                
                {formData.type === 'volunteer' && (
                  <div>
                    <Label htmlFor="requiredSkills" className="text-base">Required Skills (optional)</Label>
                    <Textarea
                      id="requiredSkills"
                      name="requiredSkills"
                      placeholder="List any specific skills needed, separated by commas (e.g., teaching, social media, Spanish)"
                      value={formData.requiredSkills}
                      onChange={handleChange}
                      className="mt-1"
                    />
                  </div>
                )}
                
                {formData.type === 'donation' && (
                  <div>
                    <Label htmlFor="items" className="text-base">Requested Items (optional)</Label>
                    <Textarea
                      id="items"
                      name="items"
                      placeholder="List specific items needed, separated by commas (e.g., canned food, warm clothing, school supplies)"
                      value={formData.items}
                      onChange={handleChange}
                      className="mt-1"
                    />
                  </div>
                )}
                
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <Label htmlFor="contactEmail" className="text-base">Contact Email <span className="text-red-500">*</span></Label>
                    <Input
                      id="contactEmail"
                      name="contactEmail"
                      type="email"
                      placeholder="contact@organization.org"
                      value={formData.contactEmail}
                      onChange={handleChange}
                      className="mt-1"
                      required
                    />
                  </div>
                  
                  <div>
                    <Label htmlFor="contactPhone" className="text-base">Contact Phone (optional)</Label>
                    <Input
                      id="contactPhone"
                      name="contactPhone"
                      placeholder="(123) 456-7890"
                      value={formData.contactPhone}
                      onChange={handleChange}
                      className="mt-1"
                    />
                  </div>
                </div>
              </div>
            </CardContent>
            
            <CardFooter className="flex justify-between">
              <Button 
                variant="outline" 
                type="button"
                onClick={() => navigate("/organization/dashboard")}
              >
                Cancel
              </Button>
              <Button 
                type="submit" 
                className="bg-drop-600 hover:bg-drop-700"
                disabled={createMutation.isPending}
              >
                <Save className="mr-2 h-4 w-4" />
                {createMutation.isPending ? "Creating..." : "Create Opportunity"}
              </Button>
            </CardFooter>
          </form>
        </Card>
      </main>
      
      <Footer />
    </div>
  );
};

export default OrganizationCreateOpportunity;
