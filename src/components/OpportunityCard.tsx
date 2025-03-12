
import React from 'react';
import { Link } from 'react-router-dom';
import { MapPin, Calendar } from 'lucide-react';
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
  // Check if opportunity is expired
  const isExpired = opportunity.endDate && new Date() > opportunity.endDate;
  
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
          <div className="flex items-center gap-2">
            {isExpired && (
              <Badge variant="outline" className="bg-gray-100 text-gray-600 border-gray-300">
                Expired
              </Badge>
            )}
            <Badge variant="outline" className={getUrgencyColor(opportunity.urgency)}>
              {opportunity.urgency.charAt(0).toUpperCase() + opportunity.urgency.slice(1)} priority
            </Badge>
          </div>
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
              <span className={isExpired ? "text-gray-500" : ""}>
                {formatDateRange(opportunity.startDate, opportunity.endDate)}
                {isExpired && " (Past)"}
              </span>
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
          <Button 
            size="sm" 
            className={isExpired ? "bg-gray-500 hover:bg-gray-600" : "bg-drop-600 hover:bg-drop-700"}
            asChild
          >
            <Link to={`/opportunities/${opportunity.id}?action=${opportunity.type === 'volunteer' ? 'volunteer' : 'donate'}`}>
              {opportunity.type === 'volunteer' ? 'Volunteer' : 'Donate'}
            </Link>
          </Button>
        </div>
      </CardFooter>
    </Card>
  );
};

export default OpportunityCard;
