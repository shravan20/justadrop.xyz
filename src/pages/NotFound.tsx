
import React from 'react';
import { Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { ChevronLeft } from 'lucide-react';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';

const NotFound = () => {
  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      
      <main className="flex-grow flex items-center justify-center py-16">
        <div className="container px-4 text-center">
          <div className="max-w-md mx-auto">
            <div className="text-7xl font-bold text-drop-600 mb-4">404</div>
            <h1 className="text-3xl font-bold mb-4">Page Not Found</h1>
            <p className="text-lg text-muted-foreground mb-8">
              The page you are looking for doesn't exist or has been moved.
            </p>
            <Button asChild className="bg-drop-600 hover:bg-drop-700">
              <Link to="/" className="flex items-center gap-2">
                <ChevronLeft className="h-4 w-4" />
                Return to Home
              </Link>
            </Button>
          </div>
        </div>
      </main>
      
      <Footer />
    </div>
  );
};

export default NotFound;
