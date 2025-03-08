
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '@/contexts/AuthContext';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { ArrowLeft, Search, CheckCircle, XCircle, UserCog, Mail, Shield } from 'lucide-react';
import { 
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { mockUsers } from '@/data/mockUsers';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { toast } from 'sonner';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { User, UserRole } from '@/types';

const AdminUserManagement = () => {
  const { user } = useAuth();
  const navigate = useNavigate();
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedRole, setSelectedRole] = useState<string | null>(null);
  
  // Add more users to the mock data
  const allUsers: User[] = [
    ...mockUsers,
    {
      id: '4',
      name: 'Emily Volunteer',
      email: 'emily@example.com',
      role: 'volunteer',
      location: 'Chicago, IL',
      bio: 'Passionate about education and youth mentoring.',
      createdAt: new Date('2023-02-10'),
    },
    {
      id: '5',
      name: 'Green Earth Organization',
      email: 'info@greenearth.org',
      role: 'ngo',
      location: 'Seattle, WA',
      bio: 'Working to protect and restore natural habitats.',
      createdAt: new Date('2023-01-05'),
    }
  ];
  
  // Filter users based on search term and role
  const filteredUsers = allUsers.filter(user => {
    const matchesSearch = !searchTerm || 
      user.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      user.email.toLowerCase().includes(searchTerm.toLowerCase());
    
    const matchesRole = !selectedRole || user.role === selectedRole;
    
    return matchesSearch && matchesRole;
  });
  
  const handleRoleChange = (userId: string, newRole: UserRole) => {
    toast.success(`User role updated to ${newRole}`);
  };
  
  const handleStatusToggle = (userId: string, active: boolean) => {
    toast.success(`User ${active ? 'activated' : 'deactivated'} successfully`);
  };
  
  const handleSendMessage = (userId: string, message: string) => {
    toast.success('Message sent successfully');
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
          <h1 className="text-3xl font-bold">User Management</h1>
          <p className="text-muted-foreground">
            Manage platform users, roles, and permissions
          </p>
        </div>
        
        <Tabs defaultValue="all" className="mb-6">
          <TabsList>
            <TabsTrigger value="all" onClick={() => setSelectedRole(null)}>All Users</TabsTrigger>
            <TabsTrigger value="volunteers" onClick={() => setSelectedRole('volunteer')}>Volunteers</TabsTrigger>
            <TabsTrigger value="organizations" onClick={() => setSelectedRole('ngo')}>Organizations</TabsTrigger>
            <TabsTrigger value="admins" onClick={() => setSelectedRole('admin')}>Admins</TabsTrigger>
          </TabsList>
        </Tabs>
        
        <div className="flex flex-col md:flex-row gap-4 mb-6">
          <div className="relative flex-grow">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
            <Input 
              placeholder="Search users by name or email..."
              className="pl-10"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </div>
          <Button 
            className="bg-drop-600 hover:bg-drop-700"
            onClick={() => {
              toast.success('New user invitation sent');
            }}
          >
            Invite User
          </Button>
        </div>
        
        <Card>
          <CardHeader>
            <CardTitle>
              {selectedRole 
                ? `${selectedRole.charAt(0).toUpperCase() + selectedRole.slice(1)}s` 
                : 'All Users'} 
              ({filteredUsers.length})
            </CardTitle>
            <CardDescription>
              {selectedRole 
                ? `Manage ${selectedRole} accounts and permissions` 
                : 'Manage all user accounts on the platform'}
            </CardDescription>
          </CardHeader>
          <CardContent>
            {filteredUsers.length > 0 ? (
              <div className="space-y-4">
                {filteredUsers.map((userItem) => (
                  <div 
                    key={userItem.id} 
                    className="p-4 border rounded-md hover:border-drop-300 transition"
                  >
                    <div className="flex flex-wrap items-center gap-4">
                      <Avatar className="h-12 w-12">
                        <AvatarImage src={userItem.profileImage || undefined} alt={userItem.name} />
                        <AvatarFallback>{userItem.name.split(' ').map(n => n[0]).join('')}</AvatarFallback>
                      </Avatar>
                      
                      <div className="flex-grow">
                        <h3 className="font-semibold">{userItem.name}</h3>
                        <p className="text-sm text-muted-foreground">
                          {userItem.email} • Joined: {userItem.createdAt.toLocaleDateString()}
                        </p>
                        <div className="mt-1">
                          <span className={`inline-block px-2 py-1 text-xs rounded-full 
                            ${userItem.role === 'admin' 
                              ? 'bg-purple-100 text-purple-800' 
                              : userItem.role === 'ngo' 
                                ? 'bg-blue-100 text-blue-800' 
                                : 'bg-green-100 text-green-800'}`}>
                            {userItem.role === 'ngo' ? 'Organization' : 
                              userItem.role.charAt(0).toUpperCase() + userItem.role.slice(1)}
                          </span>
                        </div>
                      </div>
                      
                      <div className="flex space-x-2">
                        <Dialog>
                          <DialogTrigger asChild>
                            <Button variant="outline" size="sm">
                              <UserCog className="h-4 w-4 mr-1" />
                              Edit
                            </Button>
                          </DialogTrigger>
                          <DialogContent>
                            <DialogHeader>
                              <DialogTitle>Edit User</DialogTitle>
                              <DialogDescription>
                                Update user information and settings
                              </DialogDescription>
                            </DialogHeader>
                            
                            <div className="grid gap-4 py-4">
                              <div className="grid grid-cols-4 items-center gap-4">
                                <Label htmlFor="name" className="text-right">
                                  Name
                                </Label>
                                <Input
                                  id="name"
                                  defaultValue={userItem.name}
                                  className="col-span-3"
                                />
                              </div>
                              <div className="grid grid-cols-4 items-center gap-4">
                                <Label htmlFor="email" className="text-right">
                                  Email
                                </Label>
                                <Input
                                  id="email"
                                  defaultValue={userItem.email}
                                  className="col-span-3"
                                />
                              </div>
                              <div className="grid grid-cols-4 items-center gap-4">
                                <Label htmlFor="role" className="text-right">
                                  Role
                                </Label>
                                <Select defaultValue={userItem.role}>
                                  <SelectTrigger className="col-span-3">
                                    <SelectValue placeholder="Select a role" />
                                  </SelectTrigger>
                                  <SelectContent>
                                    <SelectItem value="volunteer">Volunteer</SelectItem>
                                    <SelectItem value="ngo">Organization</SelectItem>
                                    <SelectItem value="admin">Admin</SelectItem>
                                  </SelectContent>
                                </Select>
                              </div>
                            </div>
                            
                            <DialogFooter>
                              <Button variant="outline">Cancel</Button>
                              <Button 
                                className="bg-drop-600 hover:bg-drop-700"
                                onClick={() => {
                                  toast.success('User information updated');
                                }}
                              >
                                Save Changes
                              </Button>
                            </DialogFooter>
                          </DialogContent>
                        </Dialog>
                        
                        <Dialog>
                          <DialogTrigger asChild>
                            <Button variant="outline" size="sm">
                              <Mail className="h-4 w-4 mr-1" />
                              Message
                            </Button>
                          </DialogTrigger>
                          <DialogContent>
                            <DialogHeader>
                              <DialogTitle>Send Message</DialogTitle>
                              <DialogDescription>
                                Send a direct message to {userItem.name}
                              </DialogDescription>
                            </DialogHeader>
                            <div className="grid gap-4 py-4">
                              <div className="grid grid-cols-4 items-center gap-4">
                                <Label htmlFor="subject" className="text-right">
                                  Subject
                                </Label>
                                <Input
                                  id="subject"
                                  placeholder="Message subject"
                                  className="col-span-3"
                                />
                              </div>
                              <div className="grid grid-cols-4 items-center gap-4">
                                <Label htmlFor="message" className="text-right">
                                  Message
                                </Label>
                                <Input
                                  id="message"
                                  placeholder="Type your message here..."
                                  className="col-span-3"
                                />
                              </div>
                            </div>
                            <DialogFooter>
                              <Button
                                className="bg-drop-600 hover:bg-drop-700"
                                onClick={() => handleSendMessage(userItem.id, 'Mock message')}
                              >
                                Send Message
                              </Button>
                            </DialogFooter>
                          </DialogContent>
                        </Dialog>
                        
                        <Button 
                          variant={userItem.id !== '3' ? "outline" : "destructive"} 
                          size="sm"
                          onClick={() => handleStatusToggle(userItem.id, userItem.id === '3')}
                          disabled={user?.id === userItem.id}
                        >
                          {userItem.id !== '3' ? (
                            <><CheckCircle className="h-4 w-4 mr-1" />Active</>
                          ) : (
                            <><XCircle className="h-4 w-4 mr-1" />Deactivate</>
                          )}
                        </Button>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            ) : (
              <div className="text-center py-8">
                <Shield className="mx-auto h-12 w-12 text-muted-foreground" />
                <h3 className="mt-4 text-lg font-medium">No users found</h3>
                <p className="mt-2 text-muted-foreground">
                  {searchTerm 
                    ? `No users match the search "${searchTerm}"` 
                    : 'No users available in this category'}
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

export default AdminUserManagement;
