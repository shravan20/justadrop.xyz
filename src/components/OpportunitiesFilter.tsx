
import React, { useState } from 'react';
import { Filter, X } from 'lucide-react';
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
  });

  const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newFilters = { ...filters, search: e.target.value };
    setFilters(newFilters);
    onFilterChange(newFilters);
  };

  const handleCategoryChange = (category: string) => {
    let newCategories: string[];
    if (filters.categories.includes(category)) {
      newCategories = filters.categories.filter(c => c !== category);
    } else {
      newCategories = [...filters.categories, category];
    }
    
    const newFilters = { ...filters, categories: newCategories };
    setFilters(newFilters);
    onFilterChange(newFilters);
  };

  const handleTypeChange = (type: string) => {
    let newTypes: string[];
    if (filters.types.includes(type)) {
      newTypes = filters.types.filter(t => t !== type);
    } else {
      newTypes = [...filters.types, type];
    }
    
    const newFilters = { ...filters, types: newTypes };
    setFilters(newFilters);
    onFilterChange(newFilters);
  };

  const handleUrgencyChange = (urgency: string) => {
    let newUrgency: string[];
    if (filters.urgency.includes(urgency)) {
      newUrgency = filters.urgency.filter(u => u !== urgency);
    } else {
      newUrgency = [...filters.urgency, urgency];
    }
    
    const newFilters = { ...filters, urgency: newUrgency };
    setFilters(newFilters);
    onFilterChange(newFilters);
  };

  const handleLocationChange = (location: string) => {
    const newFilters = { ...filters, location };
    setFilters(newFilters);
    onFilterChange(newFilters);
  };

  const handleRemoteChange = (checked: boolean) => {
    const newFilters = { ...filters, remote: checked };
    setFilters(newFilters);
    onFilterChange(newFilters);
  };

  const clearFilters = () => {
    const newFilters = {
      search: '',
      categories: [],
      types: [],
      urgency: [],
      location: '',
      remote: false,
    };
    setFilters(newFilters);
    onFilterChange(newFilters);
  };

  return (
    <div className="mb-6">
      <div className="flex flex-col md:flex-row gap-3 md:items-center">
        <div className="relative flex-grow">
          <Input
            placeholder="Search opportunities..."
            value={filters.search}
            onChange={handleSearchChange}
            className="w-full pr-10"
          />
        </div>
        <div className="flex gap-2">
          <Button
            variant="outline"
            onClick={() => setIsOpen(!isOpen)}
            className="flex items-center gap-2"
          >
            <Filter size={16} />
            Filters
            {(filters.categories.length > 0 || 
              filters.types.length > 0 || 
              filters.urgency.length > 0 || 
              filters.location || 
              filters.remote) && (
              <span className="ml-1 w-5 h-5 bg-drop-500 text-white rounded-full text-xs flex items-center justify-center">
                {filters.categories.length + 
                  filters.types.length + 
                  filters.urgency.length + 
                  (filters.location ? 1 : 0) + 
                  (filters.remote ? 1 : 0)}
              </span>
            )}
          </Button>
          {(filters.categories.length > 0 || 
            filters.types.length > 0 || 
            filters.urgency.length > 0 || 
            filters.location || 
            filters.remote) && (
            <Button
              variant="ghost"
              onClick={clearFilters}
              size="icon"
              className="h-10 w-10"
            >
              <X size={16} />
            </Button>
          )}
        </div>
      </div>

      {isOpen && (
        <div className="mt-4 bg-white p-5 rounded-lg border shadow-sm">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
            {/* Categories */}
            <div>
              <h3 className="font-medium mb-3">Categories</h3>
              <div className="space-y-2">
                {categoryOptions.map((category) => (
                  <div key={category.value} className="flex items-center space-x-2">
                    <Checkbox 
                      id={`category-${category.value}`} 
                      checked={filters.categories.includes(category.value)}
                      onCheckedChange={() => handleCategoryChange(category.value)}
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
            
            {/* Opportunity Type */}
            <div>
              <h3 className="font-medium mb-3">Opportunity Type</h3>
              <div className="space-y-2">
                {typeOptions.map((type) => (
                  <div key={type.value} className="flex items-center space-x-2">
                    <Checkbox 
                      id={`type-${type.value}`} 
                      checked={filters.types.includes(type.value)}
                      onCheckedChange={() => handleTypeChange(type.value)}
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
            
            {/* Urgency */}
            <div>
              <h3 className="font-medium mb-3">Urgency</h3>
              <div className="space-y-2">
                {urgencyOptions.map((urgency) => (
                  <div key={urgency.value} className="flex items-center space-x-2">
                    <Checkbox 
                      id={`urgency-${urgency.value}`} 
                      checked={filters.urgency.includes(urgency.value)}
                      onCheckedChange={() => handleUrgencyChange(urgency.value)}
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
            
            {/* Location */}
            <div>
              <h3 className="font-medium mb-3">Location</h3>
              <Select 
                value={filters.location} 
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
                  checked={filters.remote}
                  onCheckedChange={(checked) => handleRemoteChange(checked as boolean)}
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
        </div>
      )}
    </div>
  );
};

export default OpportunitiesFilter;
