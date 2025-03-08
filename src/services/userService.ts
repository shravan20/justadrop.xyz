
import { supabase } from "@/lib/supabase";
import { Interest, Opportunity, User, UserRole } from "@/types";

export const fetchUserProfile = async (userId: string) => {
  const { data, error } = await supabase
    .from('users')
    .select('*')
    .eq('id', userId)
    .single();

  if (error) {
    console.error(`Error fetching user with ID ${userId}:`, error);
    throw error;
  }

  if (!data) return null;

  // Convert to application model
  return {
    id: data.id,
    name: data.name,
    email: data.email,
    role: data.role as UserRole,
    profileImage: data.profile_image || undefined,
    location: data.location || undefined,
    bio: data.bio || undefined,
    createdAt: new Date(data.created_at),
  } as User;
};

export const updateUserProfile = async (userId: string, userData: Partial<Omit<User, 'id' | 'email' | 'role' | 'createdAt'>>) => {
  const dbUser: any = {};
  
  if (userData.name !== undefined) dbUser.name = userData.name;
  if (userData.profileImage !== undefined) dbUser.profile_image = userData.profileImage;
  if (userData.location !== undefined) dbUser.location = userData.location;
  if (userData.bio !== undefined) dbUser.bio = userData.bio;

  const { data, error } = await supabase
    .from('users')
    .update(dbUser)
    .eq('id', userId)
    .select()
    .single();

  if (error) {
    console.error(`Error updating user with ID ${userId}:`, error);
    throw error;
  }

  return data;
};

export const fetchUsers = async (filters?: { role?: UserRole, approved?: boolean }) => {
  let query = supabase
    .from('users')
    .select('*')
    .order('created_at', { ascending: false });

  if (filters) {
    if (filters.role) {
      query = query.eq('role', filters.role);
    }
    if (filters.approved !== undefined) {
      query = query.eq('approved', filters.approved);
    }
  }

  const { data, error } = await query;

  if (error) {
    console.error('Error fetching users:', error);
    throw error;
  }

  return data.map(item => ({
    id: item.id,
    name: item.name,
    email: item.email,
    role: item.role as UserRole,
    profileImage: item.profile_image || undefined,
    location: item.location || undefined,
    bio: item.bio || undefined,
    createdAt: new Date(item.created_at),
  })) as User[];
};

export const approveNGO = async (userId: string) => {
  const { data, error } = await supabase
    .from('users')
    .update({ approved: true })
    .eq('id', userId)
    .eq('role', 'ngo')
    .select()
    .single();

  if (error) {
    console.error(`Error approving NGO with ID ${userId}:`, error);
    throw error;
  }

  return data;
};

export const fetchSavedOpportunities = async (userId: string) => {
  const { data, error } = await supabase
    .from('saved_opportunities')
    .select('*, opportunities(*)')
    .eq('user_id', userId);

  if (error) {
    console.error(`Error fetching saved opportunities for user ${userId}:`, error);
    throw error;
  }

  return data.map(item => ({
    id: item.opportunities.id,
    title: item.opportunities.title,
    description: item.opportunities.description,
    organization: item.opportunities.organization,
    organizationId: item.opportunities.organization_id,
    organizationLogo: item.opportunities.organization_logo,
    type: item.opportunities.type,
    category: item.opportunities.category,
    location: item.opportunities.location,
    isRemote: item.opportunities.is_remote,
    startDate: item.opportunities.start_date ? new Date(item.opportunities.start_date) : undefined,
    endDate: item.opportunities.end_date ? new Date(item.opportunities.end_date) : undefined,
    urgency: item.opportunities.urgency,
    status: item.opportunities.status,
    requiredSkills: item.opportunities.required_skills,
    items: item.opportunities.items,
    contactEmail: item.opportunities.contact_email,
    contactPhone: item.opportunities.contact_phone,
    createdAt: new Date(item.opportunities.created_at),
    updatedAt: new Date(item.opportunities.updated_at),
  })) as Opportunity[];
};

export const saveOpportunity = async (userId: string, opportunityId: string) => {
  const { data, error } = await supabase
    .from('saved_opportunities')
    .insert({
      user_id: userId,
      opportunity_id: opportunityId,
      created_at: new Date().toISOString()
    })
    .select();

  if (error) {
    console.error(`Error saving opportunity ${opportunityId} for user ${userId}:`, error);
    throw error;
  }

  return data;
};

export const removeSavedOpportunity = async (userId: string, opportunityId: string) => {
  const { error } = await supabase
    .from('saved_opportunities')
    .delete()
    .eq('user_id', userId)
    .eq('opportunity_id', opportunityId);

  if (error) {
    console.error(`Error removing saved opportunity ${opportunityId} for user ${userId}:`, error);
    throw error;
  }

  return true;
};

export const expressInterest = async (userId: string, opportunityId: string, message?: string) => {
  const { data, error } = await supabase
    .from('interests')
    .insert({
      user_id: userId,
      opportunity_id: opportunityId,
      message: message || null,
      status: 'pending',
      created_at: new Date().toISOString()
    })
    .select();

  if (error) {
    console.error(`Error expressing interest in opportunity ${opportunityId} for user ${userId}:`, error);
    throw error;
  }

  return data;
};

export const fetchUserInterests = async (userId: string) => {
  const { data, error } = await supabase
    .from('interests')
    .select('*, opportunities(*)')
    .eq('user_id', userId);

  if (error) {
    console.error(`Error fetching interests for user ${userId}:`, error);
    throw error;
  }

  return data.map(item => ({
    id: item.id,
    userId: item.user_id,
    opportunityId: item.opportunity_id,
    message: item.message || undefined,
    status: item.status,
    createdAt: new Date(item.created_at),
    opportunity: {
      id: item.opportunities.id,
      title: item.opportunities.title,
      organization: item.opportunities.organization,
      // Add other opportunity fields as needed
    }
  })) as (Interest & { opportunity: Partial<Opportunity> })[];
};

export const fetchOpportunityInterests = async (opportunityId: string) => {
  const { data, error } = await supabase
    .from('interests')
    .select('*, users(id, name, email, profile_image)')
    .eq('opportunity_id', opportunityId);

  if (error) {
    console.error(`Error fetching interests for opportunity ${opportunityId}:`, error);
    throw error;
  }

  return data.map(item => ({
    id: item.id,
    userId: item.user_id,
    opportunityId: item.opportunity_id,
    message: item.message || undefined,
    status: item.status,
    createdAt: new Date(item.created_at),
    user: {
      id: item.users.id,
      name: item.users.name,
      email: item.users.email,
      profileImage: item.users.profile_image,
    }
  })) as (Interest & { user: Partial<User> })[];
};

export const updateInterestStatus = async (interestId: string, status: 'accepted' | 'declined') => {
  const { data, error } = await supabase
    .from('interests')
    .update({ status })
    .eq('id', interestId)
    .select();

  if (error) {
    console.error(`Error updating interest ${interestId} status to ${status}:`, error);
    throw error;
  }

  return data;
};
