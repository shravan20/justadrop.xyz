
import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '@/contexts/AuthContext';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { ArrowLeft, Search, Mail, ThumbsUp, ThumbsDown } from 'lucide-react';

const OrganizationVolunteers = () => {
  const { user } = useAuth();
  const navigate = useNavigate();
  
  // Mock volunteers data
  const volunteers = [
    {
      id: '1',
      name: 'Alice Johnson',
      email: 'alice@example.com',
      status: 'active',
      joinedDate: '2023-05-12',
      skills: ['Teaching', 'Web Design'],
      opportunities: 3,
      profileImage: null
    },
    {
      id: '2',
      name: 'Michael Chen',
      email: 'michael@example.com',
      status: 'active',
      joinedDate: '2023-06-15',
      skills: ['Event Planning', 'Photography'],
      opportunities: 2,
      profileImage: null
    },
    {
      id: '3',
      name: 'Sarah Miller',
      email: 'sarah@example.com',
      status: 'inactive',
      joinedDate: '2023-04-03',
      skills: ['Fundraising', 'Social Media'],
      opportunities: 1,
      profileImage: null
    },
  ];
  
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
          <h1 className="text-3xl font-bold">Manage Volunteers</h1>
          <p className="text-muted-foreground">
            View and interact with volunteers associated with your organization
          </p>
        </div>
        
        <div className="flex flex-col md:flex-row gap-4 mb-6">
          <div className="relative flex-grow">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
            <Input 
              placeholder="Search volunteers by name or skills..."
              className="pl-10"
            />
          </div>
          <Button variant="outline">
            Filter
          </Button>
          <Button
            className="bg-drop-600 hover:bg-drop-700"
            onClick={() => alert('This would allow sending a message to multiple volunteers')}
          >
            <Mail className="mr-2 h-4 w-4" />
            Message All
          </Button>
        </div>
        
        <Card>
          <CardHeader>
            <CardTitle>Volunteers</CardTitle>
            <CardDescription>
              Volunteers who have participated in your opportunities
            </CardDescription>
          </CardHeader>
          <CardContent>
            {volunteers.length > 0 ? (
              <div className="space-y-6">
                {volunteers.map((volunteer) => (
                  <div 
                    key={volunteer.id} 
                    className="p-4 border rounded-md hover:border-drop-300 transition"
                  >
                    <div className="flex flex-wrap items-center gap-4">
                      <Avatar className="h-12 w-12">
                        <AvatarImage src={volunteer.profileImage || undefined} alt={volunteer.name} />
                        <AvatarFallback>{volunteer.name.split(' ').map(n => n[0]).join('')}</AvatarFallback>
                      </Avatar>
                      
                      <div className="flex-grow">
                        <h3 className="font-semibold">{volunteer.name}</h3>
                        <p className="text-sm text-muted-foreground">
                          {volunteer.email} • Joined: {new Date(volunteer.joinedDate).toLocaleDateString()}
                        </p>
                        <div className="mt-1">
                          <span className="text-sm">Skills: </span>
                          {volunteer.skills.map((skill, i) => (
                            <span key={i} className="inline-block text-xs bg-drop-100 text-drop-800 px-2 py-1 rounded-full mr-1">
                              {skill}
                            </span>
                          ))}
                        </div>
                      </div>
                      
                      <div className="text-center text-sm">
                        <div className="text-lg font-semibold">{volunteer.opportunities}</div>
                        <div className="text-muted-foreground">Activities</div>
                      </div>
                      
                      <div>
                        <span className={`inline-block px-2 py-1 text-xs rounded-full 
                          ${volunteer.status === 'active' ? 'bg-green-100 text-green-800' : 'bg-gray-100 text-gray-800'}`}>
                          {volunteer.status === 'active' ? 'Active' : 'Inactive'}
                        </span>
                      </div>
                      
                      <div className="flex space-x-2">
                        <Button 
                          size="sm" 
                          variant="outline"
                          onClick={() => alert(`Message sent to ${volunteer.name}`)}
                        >
                          <Mail className="h-4 w-4" />
                        </Button>
                        <Button 
                          size="sm" 
                          variant="outline"
                          onClick={() => alert(`${volunteer.name} endorsed`)}
                        >
                          <ThumbsUp className="h-4 w-4" />
                        </Button>
                        <Button 
                          size="sm" 
                          variant="outline"
                          onClick={() => alert(`${volunteer.name} blocked`)}
                        >
                          <ThumbsDown className="h-4 w-4" />
                        </Button>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            ) : (
              <div className="text-center py-8">
                <p className="text-muted-foreground mb-4">No volunteers have signed up for your opportunities yet.</p>
                <Button asChild className="bg-drop-600 hover:bg-drop-700">
                  <Link to="/organization/create-opportunity">Create an opportunity</Link>
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

export default OrganizationVolunteers;
