import React, { useState, useEffect } from 'react';
import { Filter, X, ChevronDown, ChevronUp, Calendar } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { categoryOptions, typeOptions, urgencyOptions, locationOptions } from '@/data/mockData';
import { Checkbox } from '@/components/ui/checkbox';
import { Label } from '@/components/ui/label';
import { toast } from '@/components/ui/use-toast';
import { Popover, PopoverContent, PopoverTrigger } from '@/components/ui/popover';
import { format } from 'date-fns';
import { DateRange } from 'react-day-picker';
import { Calendar as CalendarComponent } from '@/components/ui/calendar';

interface FilterProps {
  onFilterChange: (filters: FilterValues) => void;
}

export interface FilterValues {
  search: string;
  categories: string[];
  types: string[];
  urgency: string[];
  location: string;
  remote: boolean;
  dateRange: DateRange | undefined;
  showPastEvents: boolean;
}

const OpportunitiesFilter: React.FC<FilterProps> = ({ onFilterChange }) => {
  const [isOpen, setIsOpen] = useState(false);
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

  const activeFilterCount = 
    (filters.categories?.length || 0) + 
    (filters.types?.length || 0) + 
    (filters.urgency?.length || 0) + 
    (filters.location ? 1 : 0) + 
    (filters.remote ? 1 : 0) + 
    (filters.dateRange ? 1 : 0) +
    (filters.showPastEvents ? 1 : 0);

  useEffect(() => {
    onFilterChange(filters);
  }, [filters, onFilterChange]);

  const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFilters(prev => ({
      ...prev,
      search: e.target.value
    }));
  };

  const handleCategoryChange = (category: string) => {
    setFilters(prev => {
      const currentCategories = Array.isArray(prev.categories) ? prev.categories : [];
      
      if (currentCategories.includes(category)) {
        return {
          ...prev,
          categories: currentCategories.filter(c => c !== category)
        };
      } else {
        return {
          ...prev,
          categories: [...currentCategories, category]
        };
      }
    });
  };

  const handleTypeChange = (type: string) => {
    setFilters(prev => {
      const currentTypes = Array.isArray(prev.types) ? prev.types : [];
      
      if (currentTypes.includes(type)) {
        return {
          ...prev,
          types: currentTypes.filter(t => t !== type)
        };
      } else {
        return {
          ...prev,
          types: [...currentTypes, type]
        };
      }
    });
  };

  const handleUrgencyChange = (urgency: string) => {
    setFilters(prev => {
      const currentUrgency = Array.isArray(prev.urgency) ? prev.urgency : [];
      
      if (currentUrgency.includes(urgency)) {
        return {
          ...prev,
          urgency: currentUrgency.filter(u => u !== urgency)
        };
      } else {
        return {
          ...prev,
          urgency: [...currentUrgency, urgency]
        };
      }
    });
  };

  const handleLocationChange = (location: string) => {
    setFilters(prev => ({
      ...prev,
      location
    }));
  };

  const handleRemoteChange = (checked: boolean | string) => {
    const isRemote = typeof checked === 'string' ? checked === 'true' : !!checked;
    
    setFilters(prev => ({
      ...prev,
      remote: isRemote
    }));
  };

  const handleDateRangeChange = (range: DateRange | undefined) => {
    setFilters(prev => ({
      ...prev,
      dateRange: range
    }));
  };

  const handlePastEventsChange = (checked: boolean | string) => {
    const showPast = typeof checked === 'string' ? checked === 'true' : !!checked;
    
    setFilters(prev => ({
      ...prev,
      showPastEvents: showPast
    }));
  };

  const clearFilters = () => {
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
    
    toast({
      title: "Filters Cleared",
      description: "All filters have been cleared"
    });
  };
  
  const applyFilters = () => {
    toast({
      title: "Filters Applied", 
      description: `${activeFilterCount} filters applied`
    });
    
    setIsOpen(false);
  };

  const toggleFilterPanel = () => {
    setIsOpen(prev => !prev);
  };

  return (
    <div className="mb-6">
      <div className="flex flex-col md:flex-row gap-3 md:items-center">
        <div className="relative flex-grow">
          <Input
            placeholder="Search opportunities..."
            value={filters.search || ''}
            onChange={handleSearchChange}
            className="w-full pr-10"
          />
        </div>
        <div className="flex gap-2">
          <Button
            variant="outline"
            onClick={toggleFilterPanel}
            className="flex items-center gap-2 transition-all duration-200 border border-drop-200 hover:bg-drop-100"
            type="button"
          >
            <Filter size={16} className="text-drop-600" />
            Filters
            {isOpen ? <ChevronUp size={14} /> : <ChevronDown size={14} />}
            {activeFilterCount > 0 && (
              <span className="ml-1 w-5 h-5 bg-drop-500 text-white rounded-full text-xs flex items-center justify-center">
                {activeFilterCount}
              </span>
            )}
          </Button>
          {activeFilterCount > 0 && (
            <Button
              variant="ghost"
              onClick={clearFilters}
              size="icon"
              className="h-10 w-10 hover:bg-red-100 hover:text-red-600 transition-colors"
              title="Clear all filters"
              type="button"
            >
              <X size={16} />
            </Button>
          )}
        </div>
      </div>

      {isOpen && (
        <div className="mt-4 bg-white p-5 rounded-lg border shadow-sm animate-in fade-in-50 slide-in-from-top-5 duration-300">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
            <div>
              <h3 className="font-medium mb-3 text-drop-800">Categories</h3>
              <div className="space-y-2">
                {categoryOptions.map((category) => (
                  <div key={category.value} className="flex items-center space-x-2">
                    <Checkbox 
                      id={`category-${category.value}`} 
                      checked={Array.isArray(filters.categories) && filters.categories.includes(category.value)}
                      onCheckedChange={() => handleCategoryChange(category.value)}
                      className="text-drop-600 border-drop-300 focus:ring-drop-500"
                    />
                    <Label 
                      htmlFor={`category-${category.value}`}
                      className="text-sm font-normal cursor-pointer"
                    >
                      {category.label}
                    </Label>
                  </div>
                ))}
              </div>
            </div>
            
            <div>
              <h3 className="font-medium mb-3 text-drop-800">Opportunity Type</h3>
              <div className="space-y-2">
                {typeOptions.map((type) => (
                  <div key={type.value} className="flex items-center space-x-2">
                    <Checkbox 
                      id={`type-${type.value}`} 
                      checked={Array.isArray(filters.types) && filters.types.includes(type.value)}
                      onCheckedChange={() => handleTypeChange(type.value)}
                      className="text-drop-600 border-drop-300 focus:ring-drop-500"
                    />
                    <Label 
                      htmlFor={`type-${type.value}`}
                      className="text-sm font-normal cursor-pointer"
                    >
                      {type.label}
                    </Label>
                  </div>
                ))}
              </div>
            </div>
            
            <div>
              <h3 className="font-medium mb-3 text-drop-800">Urgency</h3>
              <div className="space-y-2">
                {urgencyOptions.map((urgency) => (
                  <div key={urgency.value} className="flex items-center space-x-2">
                    <Checkbox 
                      id={`urgency-${urgency.value}`} 
                      checked={Array.isArray(filters.urgency) && filters.urgency.includes(urgency.value)}
                      onCheckedChange={() => handleUrgencyChange(urgency.value)}
                      className="text-drop-600 border-drop-300 focus:ring-drop-500"
                    />
                    <Label 
                      htmlFor={`urgency-${urgency.value}`}
                      className="text-sm font-normal cursor-pointer"
                    >
                      {urgency.label}
                    </Label>
                  </div>
                ))}
              </div>
            </div>
            
            <div>
              <h3 className="font-medium mb-3 text-drop-800">Location</h3>
              <Select 
                value={filters.location || ''}
                onValueChange={handleLocationChange}
              >
                <SelectTrigger className="w-full">
                  <SelectValue placeholder="Any location" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="">Any location</SelectItem>
                  {locationOptions.map((location) => (
                    <SelectItem key={location.value} value={location.value}>
                      {location.label}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
              
              <div className="mt-4 flex items-center space-x-2">
                <Checkbox 
                  id="remote" 
                  checked={!!filters.remote}
                  onCheckedChange={handleRemoteChange}
                  className="text-drop-600 border-drop-300 focus:ring-drop-500"
                />
                <Label 
                  htmlFor="remote"
                  className="text-sm font-normal cursor-pointer"
                >
                  Remote/Virtual only
                </Label>
              </div>
            </div>
          </div>
          
          <div className="mt-6 border-t pt-4">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <h3 className="font-medium mb-3 text-drop-800">Date Range</h3>
                <Popover>
                  <PopoverTrigger asChild>
                    <Button
                      variant="outline"
                      className="w-full justify-start text-left font-normal"
                      type="button"
                    >
                      <Calendar className="mr-2 h-4 w-4" />
                      {filters.dateRange?.from ? (
                        filters.dateRange.to ? (
                          <>
                            {format(filters.dateRange.from, "LLL dd, yyyy")} -{" "}
                            {format(filters.dateRange.to, "LLL dd, yyyy")}
                          </>
                        ) : (
                          format(filters.dateRange.from, "LLL dd, yyyy")
                        )
                      ) : (
                        <span>Pick a date range</span>
                      )}
                    </Button>
                  </PopoverTrigger>
                  <PopoverContent className="w-auto p-0" align="start">
                    <CalendarComponent
                      initialFocus
                      mode="range"
                      defaultMonth={filters.dateRange?.from}
                      selected={filters.dateRange}
                      onSelect={handleDateRangeChange}
                      numberOfMonths={2}
                    />
                  </PopoverContent>
                </Popover>
              </div>
              
              <div className="flex items-end">
                <div className="mt-4 flex items-center space-x-2">
                  <Checkbox 
                    id="past-events" 
                    checked={!!filters.showPastEvents}
                    onCheckedChange={handlePastEventsChange}
                    className="text-drop-600 border-drop-300 focus:ring-drop-500"
                  />
                  <Label 
                    htmlFor="past-events"
                    className="text-sm font-normal cursor-pointer"
                  >
                    Include past events
                  </Label>
                </div>
              </div>
            </div>
          </div>
          
          <div className="mt-6 flex justify-end space-x-2 border-t pt-4">
            <Button 
              variant="outline" 
              onClick={() => setIsOpen(false)}
              className="border-drop-200 text-drop-700 hover:bg-drop-50"
              type="button"
            >
              Cancel
            </Button>
            <Button 
              onClick={applyFilters}
              className="bg-drop-600 hover:bg-drop-700 text-white"
              type="button"
            >
              Apply Filters
            </Button>
          </div>
        </div>
      )}
    </div>
  );
};

export default OpportunitiesFilter;
