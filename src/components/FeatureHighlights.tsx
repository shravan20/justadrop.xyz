
import React from 'react';
import { 
  UserCheck, 
  BarChart3, 
  Globe, 
  Heart, 
  Clock, 
  Shield 
} from 'lucide-react';

const features = [
  {
    icon: <UserCheck className="w-10 h-10 text-drop-600" />,
    title: 'Direct Impact',
    description: 'Connect directly with organizations making a difference in your community and beyond.'
  },
  {
    icon: <BarChart3 className="w-10 h-10 text-drop-600" />,
    title: 'Progress Tracking',
    description: 'See the impact of your contributions with transparent reporting and updates.'
  },
  {
    icon: <Globe className="w-10 h-10 text-drop-600" />,
    title: 'Global Reach',
    description: 'Support causes locally or internationally, with options for remote volunteering.'
  },
  {
    icon: <Heart className="w-10 h-10 text-drop-600" />,
    title: 'Personalized Matches',
    description: 'Find opportunities that match your skills, interests, and availability.'
  },
  {
    icon: <Clock className="w-10 h-10 text-drop-600" />,
    title: 'Flexible Commitment',
    description: 'Choose opportunities that fit your schedule, from one-time events to ongoing programs.'
  },
  {
    icon: <Shield className="w-10 h-10 text-drop-600" />,
    title: 'Vetted Organizations',
    description: 'All participating NGOs and charities are verified for legitimacy and impact.'
  }
];

const FeatureHighlights = () => {
  return (
    <section className="py-16 bg-white">
      <div className="container mx-auto px-4 md:px-6">
        <div className="text-center mb-12">
          <h2 className="text-3xl font-bold mb-4">Why Use Just A Drop?</h2>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            Our platform makes it easy to discover meaningful opportunities and connect with causes you care about.
          </p>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {features.map((feature, index) => (
            <div 
              key={index} 
              className="p-6 rounded-lg border border-gray-100 shadow-sm hover:shadow-md transition-shadow bg-white"
            >
              <div className="mb-4">{feature.icon}</div>
              <h3 className="text-xl font-semibold mb-2">{feature.title}</h3>
              <p className="text-muted-foreground">{feature.description}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default FeatureHighlights;
