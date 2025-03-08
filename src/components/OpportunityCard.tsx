
import React from 'react';
import { Link } from 'react-router-dom';
import { MapPin, Calendar, ExternalLink } from 'lucide-react';
import { Opportunity } from '@/types';
import { 
  formatDateRange, 
  getCategoryColor,
  getUrgencyColor,
  getTypeIcon,
  truncateText
} from '@/utils/formatters';
import { Button } from '@/components/ui/button';
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
} from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';

interface OpportunityCardProps {
  opportunity: Opportunity;
}

const OpportunityCard: React.FC<OpportunityCardProps> = ({ opportunity }) => {
  return (
    <Card className="h-full flex flex-col overflow-hidden hover:shadow-md transition-shadow">
      <CardHeader className="pb-2">
        <div className="flex items-start justify-between">
          <div className="flex items-center space-x-2">
            <div className="w-8 h-8 flex items-center justify-center rounded-full bg-drop-100">
              <span className="text-xl">{getTypeIcon(opportunity.type)}</span>
            </div>
            <div>
              <Badge variant="outline" className={getCategoryColor(opportunity.category)}>
                {opportunity.category.charAt(0).toUpperCase() + opportunity.category.slice(1)}
              </Badge>
            </div>
          </div>
          <Badge variant="outline" className={getUrgencyColor(opportunity.urgency)}>
            {opportunity.urgency.charAt(0).toUpperCase() + opportunity.urgency.slice(1)} priority
          </Badge>
        </div>
        <h3 className="text-lg font-semibold mt-2 line-clamp-2">{opportunity.title}</h3>
        <div className="flex items-center text-sm text-muted-foreground">
          <img 
            src={opportunity.organizationLogo || '/placeholder.svg'} 
            alt={opportunity.organization} 
            className="w-5 h-5 rounded-full mr-2"
          />
          {opportunity.organization}
        </div>
      </CardHeader>
      <CardContent className="flex-grow">
        <p className="text-sm text-muted-foreground mb-4 line-clamp-3">
          {truncateText(opportunity.description, 150)}
        </p>
        <div className="space-y-2">
          <div className="flex items-center text-sm">
            <MapPin size={14} className="mr-2 text-muted-foreground" />
            <span>{opportunity.isRemote ? 'Remote/Virtual' : opportunity.location}</span>
          </div>
          {(opportunity.startDate || opportunity.endDate) && (
            <div className="flex items-center text-sm">
              <Calendar size={14} className="mr-2 text-muted-foreground" />
              <span>{formatDateRange(opportunity.startDate, opportunity.endDate)}</span>
            </div>
          )}
        </div>
      </CardContent>
      <CardFooter className="pt-2">
        <div className="w-full flex items-center justify-between">
          <Button variant="ghost" size="sm" asChild>
            <Link to={`/opportunities/${opportunity.id}`}>
              See details
            </Link>
          </Button>
          <Button size="sm" className="bg-drop-600 hover:bg-drop-700">
            <Link to={`/opportunities/${opportunity.id}`}>
              {opportunity.type === 'volunteer' ? 'Volunteer' : 'Donate'}
            </Link>
          </Button>
        </div>
      </CardFooter>
    </Card>
  );
};

export default OpportunityCard;
