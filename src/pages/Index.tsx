
import React from 'react';
import Navbar from '@/components/Navbar';
import Hero from '@/components/Hero';
import FeatureHighlights from '@/components/FeatureHighlights';
import FeaturedOpportunities from '@/components/FeaturedOpportunities';
import ImpactStats from '@/components/ImpactStats';
import Testimonials from '@/components/Testimonials';
import CallToAction from '@/components/CallToAction';
import NewsletterSignup from '@/components/NewsletterSignup';
import Footer from '@/components/Footer';

const Index = () => {
  return (
    <div className="min-h-screen flex flex-col w-full">
      <Navbar />
      <div className="flex-grow">
        <Hero />
        <FeatureHighlights />
        <FeaturedOpportunities />
        <ImpactStats />
        <Testimonials />
        <CallToAction />
        <NewsletterSignup />
      </div>
      <Footer />
    </div>
  );
};

export default Index;
