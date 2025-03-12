import React, { useState, useEffect, useMemo } from 'react';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import OpportunitiesFilter, { FilterValues } from '@/components/OpportunitiesFilter';
import OpportunityCard from '@/components/OpportunityCard';
import { Opportunity } from '@/types';
import { Button } from '@/components/ui/button';
import { Search, Loader2 } from 'lucide-react';
import { toast } from '@/components/ui/use-toast';
import { fetchOpportunities } from '@/services/opportunityService';
import { mockOpportunities } from '@/data/mockData';

const Opportunities = () => {
  const [opportunities, setOpportunities] = useState<Opportunity[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  
  const [filters, setFilters] = useState<FilterValues>({
    search: '',
    categories: [],
    types: [],
    urgency: [],
    location: '',
    remote: false,
    dateRange: undefined,
    showPastEvents: false,
  });

  const activeFilters = 
    (filters.categories?.length || 0) + 
    (filters.types?.length || 0) + 
    (filters.urgency?.length || 0) + 
    (filters.location ? 1 : 0) + 
    (filters.remote ? 1 : 0) + 
    (filters.dateRange ? 1 : 0) +
    (filters.showPastEvents ? 1 : 0);

  useEffect(() => {
    const loadOpportunities = async () => {
      setIsLoading(true);
      try {
        const fetchedOpportunities = await fetchOpportunities().catch(() => null);
        
        if (fetchedOpportunities && fetchedOpportunities.length > 0) {
          setOpportunities(fetchedOpportunities);
        } else {
          console.log("Using mock data for opportunities");
          setOpportunities(mockOpportunities);
        }
      } catch (error) {
        console.error("Error fetching opportunities:", error);
        setOpportunities(mockOpportunities);
      } finally {
        setIsLoading(false);
      }
    };

    loadOpportunities();
  }, []);

  const handleFilterChange = (newFilters: FilterValues) => {
    setFilters(newFilters);
  };

  const resetFilters = () => {
    setFilters({
      search: '',
      categories: [],
      types: [],
      urgency: [],
      location: '',
      remote: false,
      dateRange: undefined,
      showPastEvents: false,
    });
  };

  const filteredOpportunities = React.useMemo(() => {
    if (!opportunities || opportunities.length === 0) return [];
    
    try {
      let filtered = [...opportunities];
      
      if (filters.search) {
        const searchLower = filters.search.toLowerCase();
        filtered = filtered.filter(
          opp => 
            (opp.title && opp.title.toLowerCase().includes(searchLower)) ||
            (opp.description && opp.description.toLowerCase().includes(searchLower)) ||
            (opp.organization && opp.organization.toLowerCase().includes(searchLower))
        );
      }
      
      if (Array.isArray(filters.categories) && filters.categories.length > 0) {
        filtered = filtered.filter(opp => opp.category && filters.categories.includes(opp.category));
      }
      
      if (Array.isArray(filters.types) && filters.types.length > 0) {
        filtered = filtered.filter(opp => opp.type && filters.types.includes(opp.type));
      }
      
      if (Array.isArray(filters.urgency) && filters.urgency.length > 0) {
        filtered = filtered.filter(opp => opp.urgency && filters.urgency.includes(opp.urgency));
      }
      
      if (filters.location && filters.location !== '') {
        filtered = filtered.filter(opp => 
          opp.location && opp.location.toLowerCase().includes(filters.location.toLowerCase())
        );
      }
      
      if (filters.remote) {
        filtered = filtered.filter(opp => opp.isRemote === true);
      }
      
      if (filters.dateRange) {
        if (filters.dateRange.from) {
          const fromDate = new Date(filters.dateRange.from);
          fromDate.setHours(0, 0, 0, 0);
          
          filtered = filtered.filter(opp => {
            const oppStartDate = opp.startDate || opp.createdAt;
            return oppStartDate && oppStartDate >= fromDate;
          });
        }
        
        if (filters.dateRange.to) {
          const toDate = new Date(filters.dateRange.to);
          toDate.setHours(23, 59, 59, 999);
          
          filtered = filtered.filter(opp => {
            const oppEndDate = opp.endDate || opp.startDate || opp.createdAt;
            return oppEndDate && oppEndDate <= toDate;
          });
        }
      }
      
      if (!filters.showPastEvents) {
        const today = new Date();
        today.setHours(0, 0, 0, 0);
        
        filtered = filtered.filter(opp => {
          if (!opp.endDate && opp.startDate) {
            return opp.startDate >= today;
          }
          if (opp.endDate) {
            return opp.endDate >= today;
          }
          return true;
        });
      }
      
      return filtered;
    } catch (error) {
      console.error("Error applying filters:", error);
      return opportunities;
    }
  }, [opportunities, filters]);

  const currentDate = new Date();

  const activeOpportunities = React.useMemo(() => {
    return filteredOpportunities.filter(opp => 
      !opp.endDate || opp.endDate >= currentDate
    );
  }, [filteredOpportunities, currentDate]);

  const pastOpportunities = React.useMemo(() => {
    return filteredOpportunities.filter(opp => 
      opp.endDate && opp.endDate < currentDate
    );
  }, [filteredOpportunities, currentDate]);

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
        
        {isLoading ? (
          <div className="flex flex-col items-center justify-center py-16">
            <Loader2 className="h-10 w-10 animate-spin mb-4 text-drop-600" />
            <p>Loading opportunities...</p>
          </div>
        ) : filteredOpportunities.length > 0 ? (
          <>
            <p className="text-sm text-muted-foreground mb-4">
              Showing {filteredOpportunities.length} {filteredOpportunities.length === 1 ? 'opportunity' : 'opportunities'}
              {activeFilters > 0 && ` with ${activeFilters} active ${activeFilters === 1 ? 'filter' : 'filters'}`}
            </p>
            
            {activeOpportunities.length > 0 && (
              <div className="mb-10">
                <h2 className="text-2xl font-bold mb-5">Available Opportunities</h2>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                  {activeOpportunities.map((opportunity) => (
                    <OpportunityCard key={opportunity.id} opportunity={opportunity} />
                  ))}
                </div>
              </div>
            )}
            
            {pastOpportunities.length > 0 && (
              <div>
                <h2 className="text-2xl font-bold mb-5">Past Opportunities</h2>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                  {pastOpportunities.map((opportunity) => (
                    <OpportunityCard key={opportunity.id} opportunity={opportunity} />
                  ))}
                </div>
              </div>
            )}
          </>
        ) : (
          <div className="text-center py-16">
            <div className="text-5xl mb-4">🔍</div>
            <h3 className="text-2xl font-semibold mb-2">No opportunities found</h3>
            <p className="text-muted-foreground mb-6">
              Try adjusting your filters or search criteria.
            </p>
            <Button 
              onClick={resetFilters}
              className="bg-drop-600 hover:bg-drop-700"
              type="button"
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
