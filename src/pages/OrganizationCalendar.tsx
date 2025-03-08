
import React from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '@/contexts/AuthContext';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Calendar as CalendarIcon, ArrowLeft, Plus, Users, MapPin, Clock } from 'lucide-react';
import { Calendar } from '@/components/ui/calendar';
import { cn } from '@/lib/utils';

const OrganizationCalendar = () => {
  const { user } = useAuth();
  const navigate = useNavigate();
  const [date, setDate] = React.useState<Date | undefined>(new Date());
  
  // Mock events data for the selected date
  const events = [
    {
      id: '1',
      title: 'Beach Cleanup',
      date: new Date(),
      startTime: '09:00 AM',
      endTime: '12:00 PM',
      location: 'Ocean Beach',
      volunteers: 12
    },
    {
      id: '2',
      title: 'Food Bank Shift',
      date: new Date(),
      startTime: '02:00 PM',
      endTime: '05:00 PM',
      location: 'Community Center',
      volunteers: 8
    },
    {
      id: '3',
      title: 'Virtual Fundraiser Meeting',
      date: new Date(new Date().setDate(new Date().getDate() + 1)),
      startTime: '11:00 AM',
      endTime: '12:30 PM',
      location: 'Online',
      volunteers: 5
    },
  ];
  
  // Filter events for the selected date
  const selectedDateEvents = events.filter(
    event => date && event.date.toDateString() === date.toDateString()
  );
  
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
          <div className="flex flex-wrap justify-between items-center gap-4">
            <div>
              <h1 className="text-3xl font-bold">Organization Calendar</h1>
              <p className="text-muted-foreground">
                Track your organization's schedule and activities
              </p>
            </div>
            <Button 
              className="bg-drop-600 hover:bg-drop-700"
              onClick={() => navigate("/organization/create-opportunity")}
            >
              <Plus className="mr-2 h-4 w-4" />
              Add Event
            </Button>
          </div>
        </div>
        
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          <Card className="lg:col-span-1">
            <CardHeader>
              <CardTitle>Calendar</CardTitle>
              <CardDescription>
                Select a date to view events
              </CardDescription>
            </CardHeader>
            <CardContent>
              <Calendar
                mode="single"
                selected={date}
                onSelect={setDate}
                className={cn("rounded-md border")}
                classNames={{
                  day_today: "bg-drop-100 text-drop-800 font-bold",
                  day_selected: "bg-drop-600 text-white",
                }}
              />
            </CardContent>
          </Card>
          
          <Card className="lg:col-span-2">
            <CardHeader>
              <CardTitle>
                Events for {date ? date.toLocaleDateString('en-US', { 
                  weekday: 'long', 
                  month: 'long', 
                  day: 'numeric',
                  year: 'numeric'
                }) : 'Selected Date'}
              </CardTitle>
              <CardDescription>
                Scheduled activities and volunteer opportunities
              </CardDescription>
            </CardHeader>
            <CardContent>
              {selectedDateEvents.length > 0 ? (
                <div className="space-y-4">
                  {selectedDateEvents.map((event) => (
                    <div 
                      key={event.id} 
                      className="p-4 border rounded-md hover:border-drop-300 transition"
                    >
                      <div className="flex justify-between items-start">
                        <h3 className="font-semibold">{event.title}</h3>
                        <Button 
                          variant="ghost" 
                          size="sm"
                          className="h-6 text-drop-600"
                          onClick={() => alert('Edit event')}
                        >
                          Edit
                        </Button>
                      </div>
                      <div className="mt-2 space-y-1 text-sm">
                        <div className="flex items-center text-muted-foreground">
                          <Clock className="mr-2 h-4 w-4" />
                          {event.startTime} - {event.endTime}
                        </div>
                        <div className="flex items-center text-muted-foreground">
                          <MapPin className="mr-2 h-4 w-4" />
                          {event.location}
                        </div>
                        <div className="flex items-center text-muted-foreground">
                          <Users className="mr-2 h-4 w-4" />
                          {event.volunteers} volunteers
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              ) : (
                <div className="text-center py-12">
                  <CalendarIcon className="mx-auto h-12 w-12 text-muted-foreground" />
                  <h3 className="mt-4 text-lg font-medium">No events planned</h3>
                  <p className="mt-2 text-muted-foreground">
                    There are no events scheduled for this date.
                  </p>
                  <Button 
                    className="mt-4 bg-drop-600 hover:bg-drop-700"
                    onClick={() => navigate("/organization/create-opportunity")}
                  >
                    <Plus className="mr-2 h-4 w-4" />
                    Create Event
                  </Button>
                </div>
              )}
            </CardContent>
          </Card>
        </div>
      </main>
      
      <Footer />
    </div>
  );
};

export default OrganizationCalendar;
