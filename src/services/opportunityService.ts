
import { supabase } from "@/integrations/supabase/client";
import { Opportunity, OpportunityCategory, OpportunityType, OpportunityUrgency } from "@/types";

export const fetchOpportunities = async (
  filters?: {
    category?: OpportunityCategory;
    type?: OpportunityType;
    location?: string;
    isRemote?: boolean;
    urgency?: OpportunityUrgency;
    organizationId?: string;
  }
) => {
  let query = supabase
    .from('opportunities')
    .select('*')
    .eq('status', 'active')
    .order('created_at', { ascending: false });

  // Apply filters
  if (filters) {
    if (filters.category) {
      query = query.eq('category', filters.category);
    }
    if (filters.type) {
      query = query.eq('type', filters.type);
    }
    if (filters.location) {
      query = query.ilike('location', `%${filters.location}%`);
    }
    if (filters.isRemote !== undefined) {
      query = query.eq('is_remote', filters.isRemote);
    }
    if (filters.urgency) {
      query = query.eq('urgency', filters.urgency);
    }
    if (filters.organizationId) {
      query = query.eq('organization_id', filters.organizationId);
    }
  }

  const { data, error } = await query;

  if (error) {
    console.error('Error fetching opportunities:', error);
    throw error;
  }

  // Convert snake_case to camelCase for frontend types
  return data.map(item => ({
    id: item.id,
    title: item.title,
    description: item.description,
    organization: item.organization,
    organizationId: item.organization_id,
    organizationLogo: item.organization_logo,
    type: item.type,
    category: item.category as OpportunityCategory,
    location: item.location,
    isRemote: item.is_remote,
    startDate: item.start_date ? new Date(item.start_date) : undefined,
    endDate: item.end_date ? new Date(item.end_date) : undefined,
    urgency: item.urgency,
    status: item.status,
    requiredSkills: item.required_skills,
    items: item.items,
    contactEmail: item.contact_email,
    contactPhone: item.contact_phone,
    createdAt: new Date(item.created_at),
    updatedAt: new Date(item.updated_at),
  })) as Opportunity[];
};

export const fetchOpportunityById = async (id: string) => {
  const { data, error } = await supabase
    .from('opportunities')
    .select('*')
    .eq('id', id)
    .single();

  if (error) {
    console.error(`Error fetching opportunity with ID ${id}:`, error);
    throw error;
  }

  if (!data) return null;

  // Convert to application model
  return {
    id: data.id,
    title: data.title,
    description: data.description,
    organization: data.organization,
    organizationId: data.organization_id,
    organizationLogo: data.organization_logo,
    type: data.type,
    category: data.category as OpportunityCategory,
    location: data.location,
    isRemote: data.is_remote,
    startDate: data.start_date ? new Date(data.start_date) : undefined,
    endDate: data.end_date ? new Date(data.end_date) : undefined,
    urgency: data.urgency,
    status: data.status,
    requiredSkills: data.required_skills,
    items: data.items,
    contactEmail: data.contact_email,
    contactPhone: data.contact_phone,
    createdAt: new Date(data.created_at),
    updatedAt: new Date(data.updated_at),
  } as Opportunity;
};

export const createOpportunity = async (opportunity: Omit<Opportunity, 'id' | 'createdAt' | 'updatedAt'>) => {
  // Convert from camelCase to snake_case for the database
  const dbOpportunity = {
    title: opportunity.title,
    description: opportunity.description,
    organization: opportunity.organization,
    organization_id: opportunity.organizationId,
    organization_logo: opportunity.organizationLogo,
    type: opportunity.type,
    category: opportunity.category,
    location: opportunity.location,
    is_remote: opportunity.isRemote,
    start_date: opportunity.startDate?.toISOString(),
    end_date: opportunity.endDate?.toISOString(),
    urgency: opportunity.urgency,
    status: opportunity.status || 'active',
    required_skills: opportunity.requiredSkills,
    items: opportunity.items,
    contact_email: opportunity.contactEmail,
    contact_phone: opportunity.contactPhone,
    created_at: new Date().toISOString(),
    updated_at: new Date().toISOString(),
  };

  const { data, error } = await supabase
    .from('opportunities')
    .insert(dbOpportunity)
    .select()
    .single();

  if (error) {
    console.error('Error creating opportunity:', error);
    throw error;
  }

  return data;
};

export const updateOpportunity = async (id: string, opportunity: Partial<Omit<Opportunity, 'id' | 'createdAt' | 'updatedAt'>>) => {
  // Convert from camelCase to snake_case for the database
  const dbOpportunity: any = {};
  
  if (opportunity.title !== undefined) dbOpportunity.title = opportunity.title;
  if (opportunity.description !== undefined) dbOpportunity.description = opportunity.description;
  if (opportunity.organization !== undefined) dbOpportunity.organization = opportunity.organization;
  if (opportunity.organizationId !== undefined) dbOpportunity.organization_id = opportunity.organizationId;
  if (opportunity.organizationLogo !== undefined) dbOpportunity.organization_logo = opportunity.organizationLogo;
  if (opportunity.type !== undefined) dbOpportunity.type = opportunity.type;
  if (opportunity.category !== undefined) dbOpportunity.category = opportunity.category;
  if (opportunity.location !== undefined) dbOpportunity.location = opportunity.location;
  if (opportunity.isRemote !== undefined) dbOpportunity.is_remote = opportunity.isRemote;
  if (opportunity.startDate !== undefined) dbOpportunity.start_date = opportunity.startDate?.toISOString();
  if (opportunity.endDate !== undefined) dbOpportunity.end_date = opportunity.endDate?.toISOString();
  if (opportunity.urgency !== undefined) dbOpportunity.urgency = opportunity.urgency;
  if (opportunity.status !== undefined) dbOpportunity.status = opportunity.status;
  if (opportunity.requiredSkills !== undefined) dbOpportunity.required_skills = opportunity.requiredSkills;
  if (opportunity.items !== undefined) dbOpportunity.items = opportunity.items;
  if (opportunity.contactEmail !== undefined) dbOpportunity.contact_email = opportunity.contactEmail;
  if (opportunity.contactPhone !== undefined) dbOpportunity.contact_phone = opportunity.contactPhone;
  
  // Always update the updated_at timestamp
  dbOpportunity.updated_at = new Date().toISOString();

  const { data, error } = await supabase
    .from('opportunities')
    .update(dbOpportunity)
    .eq('id', id)
    .select()
    .single();

  if (error) {
    console.error(`Error updating opportunity with ID ${id}:`, error);
    throw error;
  }

  return data;
};

export const deleteOpportunity = async (id: string) => {
  const { error } = await supabase
    .from('opportunities')
    .delete()
    .eq('id', id);

  if (error) {
    console.error(`Error deleting opportunity with ID ${id}:`, error);
    throw error;
  }

  return true;
};
