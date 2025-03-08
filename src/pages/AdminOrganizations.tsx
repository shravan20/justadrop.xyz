
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '@/contexts/AuthContext';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { ArrowLeft, Search, Building, CheckCircle2, XCircle, AlertTriangle, Eye, FileText } from 'lucide-react';
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
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';

const AdminOrganizations = () => {
  const { user } = useAuth();
  const navigate = useNavigate();
  const [searchTerm, setSearchTerm] = useState('');
  const [activeTab, setActiveTab] = useState('pending');
  
  // Mock organizations data
  const organizations = [
    {
      id: '1',
      name: 'EcoRestore Foundation',
      email: 'contact@ecorestore.org',
      status: 'pending',
      appliedOn: '2023-06-15',
      location: 'San Francisco, CA',
      verificationDocuments: ['501c3.pdf', 'bylaws.pdf'],
      description: 'Working to protect and restore natural ecosystems through community action and education.'
    },
    {
      id: '2',
      name: 'Children First Alliance',
      email: 'info@childrenalliance.org',
      status: 'pending',
      appliedOn: '2023-06-17',
      location: 'New York, NY',
      verificationDocuments: ['nonprofit_status.pdf'],
      description: 'Dedicated to improving the lives of children through education, healthcare, and social services.'
    },
    {
      id: '3',
      name: 'Ocean Conservation Alliance',
      email: 'hello@oceanalliance.org',
      status: 'approved',
      appliedOn: '2023-05-20',
      approvedOn: '2023-05-25',
      location: 'Miami, FL',
      verificationDocuments: ['501c3.pdf', 'annual_report.pdf'],
      description: 'Protecting marine ecosystems and promoting sustainable ocean practices.'
    },
    {
      id: '4',
      name: 'City Food Bank',
      email: 'info@cityfoodbank.org',
      status: 'approved',
      appliedOn: '2023-05-10',
      approvedOn: '2023-05-15',
      location: 'Chicago, IL',
      verificationDocuments: ['nonprofit_status.pdf', 'financial_report.pdf'],
      description: 'Addressing food insecurity through community-based initiatives and partnerships.'
    },
    {
      id: '5',
      name: 'Suspicious Charity Ltd',
      email: 'contact@suspiciouscharity.com',
      status: 'rejected',
      appliedOn: '2023-06-01',
      rejectedOn: '2023-06-05',
      location: 'Online',
      verificationDocuments: ['unclear_document.pdf'],
      rejectionReason: 'Unable to verify nonprofit status. Documentation provided was incomplete or insufficient.',
      description: 'Claims to support various global causes but provided vague information about operations and impact.'
    },
  ];
  
  // Filter organizations based on search term and status
  const filteredOrganizations = organizations.filter(org => {
    const matchesSearch = !searchTerm || 
      org.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      org.email.toLowerCase().includes(searchTerm.toLowerCase());
    
    const matchesStatus = org.status === activeTab || activeTab === 'all';
    
    return matchesSearch && matchesStatus;
  });
  
  const handleApprove = (orgId: string) => {
    toast.success('Organization approved successfully');
  };
  
  const handleReject = (orgId: string, reason: string) => {
    toast.success('Organization rejected');
  };
  
  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      
      <main className="flex-grow container mx-auto px-4 py-8">
        <div className="mb-6">
          <Button 
            variant="ghost" 
            onClick={() => navigate("/admin/dashboard")}
            className="mb-4"
          >
            <ArrowLeft className="mr-2 h-4 w-4" />
            Back to Dashboard
          </Button>
          <h1 className="text-3xl font-bold">Organization Management</h1>
          <p className="text-muted-foreground">
            Review and manage organizations on the platform
          </p>
        </div>
        
        <Tabs defaultValue="pending" onValueChange={setActiveTab} className="mb-6">
          <TabsList>
            <TabsTrigger value="all">All</TabsTrigger>
            <TabsTrigger value="pending">Pending ({organizations.filter(o => o.status === 'pending').length})</TabsTrigger>
            <TabsTrigger value="approved">Approved</TabsTrigger>
            <TabsTrigger value="rejected">Rejected</TabsTrigger>
          </TabsList>
        </Tabs>
        
        <div className="flex flex-col md:flex-row gap-4 mb-6">
          <div className="relative flex-grow">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
            <Input 
              placeholder="Search organizations..."
              className="pl-10"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </div>
        </div>
        
        <Card>
          <CardHeader>
            <CardTitle>
              {activeTab === 'pending' ? 'Pending Approval' : 
               activeTab === 'approved' ? 'Approved Organizations' : 
               activeTab === 'rejected' ? 'Rejected Organizations' : 
               'All Organizations'} ({filteredOrganizations.length})
            </CardTitle>
            <CardDescription>
              {activeTab === 'pending' ? 'Organizations waiting for verification and approval' : 
               activeTab === 'approved' ? 'Organizations that have been verified and approved' : 
               activeTab === 'rejected' ? 'Organizations that have been rejected' : 
               'All organizations on the platform'}
            </CardDescription>
          </CardHeader>
          <CardContent>
            {filteredOrganizations.length > 0 ? (
              <div className="space-y-6">
                {filteredOrganizations.map((org) => (
                  <div 
                    key={org.id} 
                    className="p-4 border rounded-md hover:border-drop-300 transition"
                  >
                    <div className="flex justify-between items-start flex-wrap gap-4">
                      <div>
                        <h3 className="font-semibold">{org.name}</h3>
                        <p className="text-sm text-muted-foreground">
                          {org.email} • {org.location}
                        </p>
                        <p className="text-sm text-muted-foreground">
                          Applied: {new Date(org.appliedOn).toLocaleDateString()}
                          {org.approvedOn && ` • Approved: ${new Date(org.approvedOn).toLocaleDateString()}`}
                          {org.rejectedOn && ` • Rejected: ${new Date(org.rejectedOn).toLocaleDateString()}`}
                        </p>
                        
                        <div className="mt-2">
                          <span className={`inline-block px-2 py-1 text-xs rounded-full 
                            ${org.status === 'approved' 
                              ? 'bg-green-100 text-green-800' 
                              : org.status === 'rejected'
                                ? 'bg-red-100 text-red-800'
                                : 'bg-yellow-100 text-yellow-800'}`}>
                            {org.status.charAt(0).toUpperCase() + org.status.slice(1)}
                          </span>
                        </div>
                        
                        {org.rejectionReason && (
                          <div className="mt-2 p-2 bg-red-50 rounded-md">
                            <div className="flex items-center">
                              <AlertTriangle className="h-4 w-4 text-red-500 mr-2" />
                              <p className="text-sm font-medium text-red-700">Rejection Reason:</p>
                            </div>
                            <p className="text-sm mt-1 text-red-600">{org.rejectionReason}</p>
                          </div>
                        )}
                      </div>
                      
                      <div className="flex flex-wrap gap-2">
                        <Dialog>
                          <DialogTrigger asChild>
                            <Button variant="outline" size="sm">
                              <Eye className="mr-1 h-4 w-4" />
                              View Details
                            </Button>
                          </DialogTrigger>
                          <DialogContent className="max-w-md">
                            <DialogHeader>
                              <DialogTitle>{org.name}</DialogTitle>
                              <DialogDescription>
                                Organization details and documentation
                              </DialogDescription>
                            </DialogHeader>
                            
                            <div className="space-y-4 py-4">
                              <div>
                                <h4 className="text-sm font-medium">Description</h4>
                                <p className="text-sm text-muted-foreground mt-1">{org.description}</p>
                              </div>
                              
                              <div>
                                <h4 className="text-sm font-medium">Contact Information</h4>
                                <p className="text-sm text-muted-foreground mt-1">{org.email}</p>
                                <p className="text-sm text-muted-foreground">{org.location}</p>
                              </div>
                              
                              <div>
                                <h4 className="text-sm font-medium">Verification Documents</h4>
                                <ul className="mt-1 space-y-1">
                                  {org.verificationDocuments.map((doc, index) => (
                                    <li key={index} className="flex items-center">
                                      <FileText className="h-4 w-4 mr-2 text-drop-600" />
                                      <span className="text-sm">{doc}</span>
                                    </li>
                                  ))}
                                </ul>
                              </div>
                            </div>
                          </DialogContent>
                        </Dialog>
                        
                        {org.status === 'pending' && (
                          <>
                            <Button 
                              className="bg-green-600 hover:bg-green-700"
                              size="sm"
                              onClick={() => handleApprove(org.id)}
                            >
                              <CheckCircle2 className="mr-1 h-4 w-4" />
                              Approve
                            </Button>
                            
                            <Dialog>
                              <DialogTrigger asChild>
                                <Button 
                                  variant="destructive"
                                  size="sm"
                                >
                                  <XCircle className="mr-1 h-4 w-4" />
                                  Reject
                                </Button>
                              </DialogTrigger>
                              <DialogContent>
                                <DialogHeader>
                                  <DialogTitle>Reject Organization</DialogTitle>
                                  <DialogDescription>
                                    Please provide a reason for rejecting this organization.
                                  </DialogDescription>
                                </DialogHeader>
                                <Textarea 
                                  placeholder="Reason for rejection..."
                                  className="min-h-[100px]"
                                />
                                <DialogFooter>
                                  <Button variant="outline">Cancel</Button>
                                  <Button 
                                    variant="destructive"
                                    onClick={() => handleReject(org.id, 'Rejection reason')}
                                  >
                                    Confirm Rejection
                                  </Button>
                                </DialogFooter>
                              </DialogContent>
                            </Dialog>
                          </>
                        )}
                        
                        {org.status === 'approved' && (
                          <Button 
                            variant="destructive"
                            size="sm"
                            onClick={() => {
                              toast.success('Organization deactivated');
                            }}
                          >
                            <XCircle className="mr-1 h-4 w-4" />
                            Deactivate
                          </Button>
                        )}
                        
                        {org.status === 'rejected' && (
                          <Button 
                            className="bg-green-600 hover:bg-green-700"
                            size="sm"
                            onClick={() => {
                              toast.success('Organization review reopened');
                            }}
                          >
                            <CheckCircle2 className="mr-1 h-4 w-4" />
                            Reconsider
                          </Button>
                        )}
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            ) : (
              <div className="text-center py-8">
                <Building className="mx-auto h-12 w-12 text-muted-foreground" />
                <h3 className="mt-4 text-lg font-medium">No organizations found</h3>
                <p className="mt-2 text-muted-foreground">
                  {searchTerm 
                    ? `No organizations match the search "${searchTerm}"` 
                    : `No ${activeTab} organizations available`}
                </p>
              </div>
            )}
          </CardContent>
        </Card>
      </main>
      
      <Footer />
    </div>
  );
};

export default AdminOrganizations;
