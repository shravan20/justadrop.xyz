
import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { ArrowRight, Loader2 } from 'lucide-react';
import { Button } from '@/components/ui/button';
import OpportunityCard from './OpportunityCard';
import { Opportunity } from '@/types';
import { fetchOpportunities } from '@/services/opportunityService';
import { useQuery } from '@tanstack/react-query';

const FeaturedOpportunities = () => {
  const { data: opportunities, isLoading, error } = useQuery({
    queryKey: ['featuredOpportunities'],
    queryFn: async () => {
      const allOpportunities = await fetchOpportunities();
      // Get 3 random active opportunities to feature
      const activeOpps = allOpportunities.filter(opp => 
        opp.status === 'active' && 
        (!opp.endDate || new Date(opp.endDate) >= new Date())
      );
      return activeOpps.sort(() => 0.5 - Math.random()).slice(0, 3);
    }
  });

  if (isLoading) {
    return (
      <section className="py-16 bg-gray-50">
        <div className="container mx-auto px-4 md:px-6">
          <div className="flex flex-col md:flex-row md:items-end justify-between mb-8">
            <div>
              <h2 className="text-3xl font-bold mb-2">Featured Opportunities</h2>
              <p className="text-muted-foreground max-w-2xl">
                These opportunities need your help right now. Every contribution matters.
              </p>
            </div>
          </div>
          <div className="flex items-center justify-center py-12">
            <Loader2 className="h-8 w-8 animate-spin" />
            <span className="ml-2">Loading opportunities...</span>
          </div>
        </div>
      </section>
    );
  }

  if (error || !opportunities || opportunities.length === 0) {
    return (
      <section className="py-16 bg-gray-50">
        <div className="container mx-auto px-4 md:px-6">
          <div className="flex flex-col md:flex-row md:items-end justify-between mb-8">
            <div>
              <h2 className="text-3xl font-bold mb-2">Featured Opportunities</h2>
              <p className="text-muted-foreground max-w-2xl">
                Check back soon for featured opportunities.
              </p>
            </div>
            <Button 
              asChild
              variant="ghost" 
              className="mt-4 md:mt-0 self-start md:self-auto"
            >
              <Link to="/opportunities" className="flex items-center">
                View all opportunities
                <ArrowRight className="ml-2 h-4 w-4" />
              </Link>
            </Button>
          </div>
        </div>
      </section>
    );
  }

  return (
    <section className="py-16 bg-gray-50">
      <div className="container mx-auto px-4 md:px-6">
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-8">
          <div>
            <h2 className="text-3xl font-bold mb-2">Featured Opportunities</h2>
            <p className="text-muted-foreground max-w-2xl">
              These opportunities need your help right now. Every contribution matters.
            </p>
          </div>
          <Button 
            asChild
            variant="ghost" 
            className="mt-4 md:mt-0 self-start md:self-auto"
          >
            <Link to="/opportunities" className="flex items-center">
              View all opportunities
              <ArrowRight className="ml-2 h-4 w-4" />
            </Link>
          </Button>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {opportunities.map((opportunity) => (
            <OpportunityCard key={opportunity.id} opportunity={opportunity} />
          ))}
        </div>
      </div>
    </section>
  );
};

export default FeaturedOpportunities;
