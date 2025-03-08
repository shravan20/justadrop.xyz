
import React from 'react';
import { Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Search } from 'lucide-react';

const Hero = () => {
  return (
    <div className="relative overflow-hidden bg-drop-50 min-h-[600px] flex items-center">
      <div className="container mx-auto px-4 md:px-6 py-12 md:py-24 relative z-10">
        <div className="flex flex-col md:flex-row items-center">
          <div className="md:w-1/2 md:pr-8 mb-8 md:mb-0">
            <div className="max-w-[600px]">
              <h1 className="text-4xl md:text-5xl font-bold leading-tight mb-4 text-foreground">
                Small Actions, <span className="text-drop-600">Rippling</span> Impact
              </h1>
              <p className="text-lg md:text-xl mb-6 text-muted-foreground">
                Connect with local NGOs and charities that need your help. Every volunteer hour and donation is 
                <span className="text-drop-600 font-medium"> just a drop</span> that creates ripples of positive change.
              </p>
              <div className="flex flex-col sm:flex-row gap-4">
                <Button 
                  asChild
                  size="lg" 
                  className="bg-drop-600 hover:bg-drop-700 drop-shadow-custom"
                >
                  <Link to="/opportunities">
                    <Search className="w-4 h-4 mr-2" />
                    Find Opportunities
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
          <div className="md:w-1/2 relative">
            <div className="relative z-10 bg-white p-2 rounded-lg shadow-lg transform rotate-3 transition-transform hover:rotate-0">
              <img 
                src="https://images.unsplash.com/photo-1593113646773-028c64a8f1b8?q=80&w=1470&auto=format&fit=crop"
                alt="Volunteers working together" 
                className="rounded w-full h-auto"
              />
            </div>
            <div className="absolute top-0 left-0 w-40 h-40 bg-drop-300 rounded-full opacity-20 transform -translate-x-1/2 -translate-y-1/2"></div>
            <div className="absolute bottom-0 right-0 w-60 h-60 bg-drop-600 rounded-full opacity-10 transform translate-x-1/3 translate-y-1/3"></div>
          </div>
        </div>
      </div>
      <div className="wave-divider">
        <svg data-name="Layer 1" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1200 120" preserveAspectRatio="none">
            <path d="M321.39,56.44c58-10.79,114.16-30.13,172-41.86,82.39-16.72,168.19-17.73,250.45-.39C823.78,31,906.67,72,985.66,92.83c70.05,18.48,146.53,26.09,214.34,3V0H0V27.35A600.21,600.21,0,0,0,321.39,56.44Z" className="shape-fill"></path>
        </svg>
      </div>
    </div>
  );
};

export default Hero;
