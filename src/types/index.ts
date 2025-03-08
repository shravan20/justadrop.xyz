
export type UserRole = 'volunteer' | 'ngo' | 'admin';

export type User = {
  id: string;
  name: string;
  email: string;
  role: UserRole;
  profileImage?: string;
  location?: string;
  bio?: string;
  createdAt: Date;
};

export type OpportunityCategory = 
  | 'education' 
  | 'health' 
  | 'environment' 
  | 'poverty' 
  | 'crisis' 
  | 'community' 
  | 'arts' 
  | 'animals' 
  | 'other';

export type OpportunityType = 'volunteer' | 'donation';

export type OpportunityStatus = 'active' | 'completed' | 'cancelled';

export type OpportunityUrgency = 'low' | 'medium' | 'high' | 'critical';

export type Opportunity = {
  id: string;
  title: string;
  description: string;
  organization: string;
  organizationId: string;
  organizationLogo?: string;
  type: OpportunityType;
  category: OpportunityCategory;
  location: string;
  isRemote: boolean;
  startDate?: Date;
  endDate?: Date;
  urgency: OpportunityUrgency;
  status: OpportunityStatus;
  requiredSkills?: string[];
  items?: string[];
  contactEmail: string;
  contactPhone?: string;
  createdAt: Date;
  updatedAt: Date;
};

export type Interest = {
  id: string;
  userId: string;
  opportunityId: string;
  message?: string;
  status: 'pending' | 'accepted' | 'declined';
  createdAt: Date;
};
