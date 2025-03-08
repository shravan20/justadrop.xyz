
import React from 'react';

const stats = [
  { number: '200+', label: 'Active Organizations', icon: '🏢' },
  { number: '5,000+', label: 'Volunteers', icon: '👥' },
  { number: '8,500+', label: 'Opportunities Posted', icon: '📋' },
  { number: '$1.2M+', label: 'Donations Facilitated', icon: '💰' },
];

const ImpactStats = () => {
  return (
    <section className="py-16 bg-drop-600 text-white">
      <div className="container mx-auto px-4 md:px-6">
        <div className="text-center mb-12">
          <h2 className="text-3xl font-bold mb-4">Our Collective Impact</h2>
          <p className="text-xl opacity-90 max-w-2xl mx-auto">
            Together, we're creating positive change one drop at a time.
          </p>
        </div>
        
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
          {stats.map((stat, index) => (
            <div 
              key={index} 
              className="text-center p-6 rounded-lg bg-white/10 backdrop-blur-md"
            >
              <div className="text-4xl mb-2">{stat.icon}</div>
              <div className="text-4xl font-bold mb-2">{stat.number}</div>
              <div className="text-lg opacity-90">{stat.label}</div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default ImpactStats;
