
import React, { useState, useEffect } from 'react';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import OpportunitiesFilter, { FilterValues } from '@/components/OpportunitiesFilter';
import OpportunityCard from '@/components/OpportunityCard';
import { mockOpportunities } from '@/data/mockData';
import { Opportunity } from '@/types';
import { Button } from '@/components/ui/button';
import { Search } from 'lucide-react';

const Opportunities = () => {
  const [opportunities, setOpportunities] = useState<Opportunity[]>(mockOpportunities);
  const [filteredOpportunities, setFilteredOpportunities] = useState<Opportunity[]>(mockOpportunities);
  const [loading, setLoading] = useState<boolean>(true);

  // Simulate data loading
  useEffect(() => {
    const timer = setTimeout(() => {
      setLoading(false);
    }, 800);
    
    return () => clearTimeout(timer);
  }, []);

  const handleFilterChange = (filters: FilterValues) => {
    let filtered = [...opportunities];
    
    // Filter by search text
    if (filters.search) {
      const searchLower = filters.search.toLowerCase();
      filtered = filtered.filter(
        opp => 
          opp.title.toLowerCase().includes(searchLower) ||
          opp.description.toLowerCase().includes(searchLower) ||
          opp.organization.toLowerCase().includes(searchLower)
      );
    }
    
    // Filter by categories
    if (filters.categories.length > 0) {
      filtered = filtered.filter(opp => filters.categories.includes(opp.category));
    }
    
    // Filter by types
    if (filters.types.length > 0) {
      filtered = filtered.filter(opp => filters.types.includes(opp.type));
    }
    
    // Filter by urgency
    if (filters.urgency.length > 0) {
      filtered = filtered.filter(opp => filters.urgency.includes(opp.urgency));
    }
    
    // Filter by location
    if (filters.location) {
      filtered = filtered.filter(opp => 
        opp.location.toLowerCase().includes(filters.location.toLowerCase())
      );
    }
    
    // Filter by remote options
    if (filters.remote) {
      filtered = filtered.filter(opp => opp.isRemote);
    }
    
    setFilteredOpportunities(filtered);
  };

  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      
      <div className="bg-drop-50 py-12">
        <div className="container mx-auto px-4 md:px-6">
          <div className="max-w-4xl mx-auto text-center">
            <h1 className="text-3xl md:text-4xl font-bold mb-4">Find Opportunities to Make a Difference</h1>
            <p className="text-lg text-muted-foreground mb-6">
              Browse through volunteer opportunities and donation requests from organizations around the world.
            </p>
          </div>
        </div>
      </div>
      
      <main className="flex-grow container mx-auto px-4 md:px-6 py-8">
        <OpportunitiesFilter onFilterChange={handleFilterChange} />
        
        {loading ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {[...Array(6)].map((_, index) => (
              <div key={index} className="h-[320px] bg-gray-100 animate-pulse rounded-lg"></div>
            ))}
          </div>
        ) : filteredOpportunities.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredOpportunities.map((opportunity) => (
              <OpportunityCard key={opportunity.id} opportunity={opportunity} />
            ))}
          </div>
        ) : (
          <div className="text-center py-16">
            <div className="text-5xl mb-4">🔍</div>
            <h3 className="text-2xl font-semibold mb-2">No opportunities found</h3>
            <p className="text-muted-foreground mb-6">
              Try adjusting your filters or search criteria.
            </p>
            <Button 
              onClick={() => handleFilterChange({
                search: '',
                categories: [],
                types: [],
                urgency: [],
                location: '',
                remote: false,
              })}
              className="bg-drop-600 hover:bg-drop-700"
            >
              <Search className="w-4 h-4 mr-2" />
              View All Opportunities
            </Button>
          </div>
        )}
      </main>
      
      <Footer />
    </div>
  );
};

export default Opportunities;
