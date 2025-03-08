
import React from 'react';
import { Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';

const CallToAction = () => {
  return (
    <section className="py-16 bg-drop-50">
      <div className="container mx-auto px-4 md:px-6">
        <div className="bg-white rounded-lg shadow-lg p-8 md:p-12 max-w-4xl mx-auto relative overflow-hidden">
          <div className="absolute top-0 right-0 w-1/2 h-full opacity-10">
            <div className="absolute top-0 right-0 w-40 h-40 bg-drop-300 rounded-full transform translate-x-1/4 -translate-y-1/4"></div>
            <div className="absolute bottom-0 right-0 w-60 h-60 bg-drop-600 rounded-full transform translate-x-1/3 translate-y-1/3"></div>
          </div>
          
          <div className="relative z-10">
            <h2 className="text-3xl font-bold mb-4 text-center">Ready to Make a Difference?</h2>
            <p className="text-lg text-muted-foreground mb-8 text-center max-w-2xl mx-auto">
              Whether you want to volunteer, donate, or register your organization, there's a place for you in our community.
            </p>
            
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <Button 
                asChild
                size="lg" 
                className="bg-drop-600 hover:bg-drop-700"
              >
                <Link to="/opportunities">
                  Browse Opportunities
                </Link>
              </Button>
              
              <Button 
                asChild
                variant="outline" 
                size="lg"
                className="border-drop-600 text-drop-600 hover:bg-drop-50"
              >
                <Link to="/register">
                  Create Account
                </Link>
              </Button>
              
              <Button 
                asChild
                variant="outline" 
                size="lg"
                className="border-drop-600 text-drop-600 hover:bg-drop-50"
              >
                <Link to="/ngo/register">
                  Register Organization
                </Link>
              </Button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default CallToAction;
