
-- Create tables if they don't exist already
CREATE TABLE IF NOT EXISTS users (
  id UUID PRIMARY KEY,
  name TEXT NOT NULL,
  email TEXT UNIQUE NOT NULL,
  role TEXT NOT NULL CHECK (role IN ('admin', 'volunteer', 'ngo')),
  profile_image TEXT,
  location TEXT,
  bio TEXT,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  approved BOOLEAN DEFAULT FALSE
);

CREATE TABLE IF NOT EXISTS opportunities (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  title TEXT NOT NULL,
  description TEXT NOT NULL,
  organization TEXT NOT NULL,
  organization_id UUID REFERENCES users(id),
  organization_logo TEXT,
  type TEXT NOT NULL CHECK (type IN ('volunteer', 'donation')),
  category TEXT NOT NULL,
  location TEXT,
  is_remote BOOLEAN DEFAULT FALSE,
  start_date TIMESTAMP WITH TIME ZONE,
  end_date TIMESTAMP WITH TIME ZONE,
  urgency TEXT NOT NULL CHECK (urgency IN ('low', 'medium', 'high', 'critical')),
  status TEXT NOT NULL DEFAULT 'active',
  required_skills TEXT[],
  items TEXT[],
  contact_email TEXT NOT NULL,
  contact_phone TEXT,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

CREATE TABLE IF NOT EXISTS saved_opportunities (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  user_id UUID REFERENCES users(id) NOT NULL,
  opportunity_id UUID REFERENCES opportunities(id) NOT NULL,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  UNIQUE (user_id, opportunity_id)
);

CREATE TABLE IF NOT EXISTS interests (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  user_id UUID REFERENCES users(id) NOT NULL,
  opportunity_id UUID REFERENCES opportunities(id) NOT NULL,
  message TEXT,
  status TEXT NOT NULL DEFAULT 'pending' CHECK (status IN ('pending', 'accepted', 'declined')),
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  UNIQUE (user_id, opportunity_id)
);

-- Insert test users
INSERT INTO auth.users (id, email, role)
VALUES 
  ('00000000-0000-0000-0000-000000000001', 'admin@gmail.com', 'admin'),
  ('00000000-0000-0000-0000-000000000002', 'volunteer@gmail.com', 'volunteer'),
  ('00000000-0000-0000-0000-000000000003', 'ngo@gmail.com', 'ngo')
ON CONFLICT (id) DO NOTHING;

-- Update or create authentication users
INSERT INTO users (id, name, email, role, location, bio, created_at, approved)
VALUES 
  ('00000000-0000-0000-0000-000000000001', 'Admin User', 'admin@gmail.com', 'admin', 'Chicago, IL', 'Platform administrator', '2022-10-10', true),
  ('00000000-0000-0000-0000-000000000002', 'John Volunteer', 'volunteer@gmail.com', 'volunteer', 'San Francisco, CA', 'Passionate about helping communities and environmental causes.', '2023-01-15', true),
  ('00000000-0000-0000-0000-000000000003', 'NGO Organization', 'ngo@gmail.com', 'ngo', 'New York, NY', 'Working to provide clean water to communities in need.', '2022-11-23', true)
ON CONFLICT (id) DO UPDATE SET
  name = EXCLUDED.name,
  location = EXCLUDED.location,
  bio = EXCLUDED.bio,
  approved = EXCLUDED.approved;

-- Insert mock opportunities
INSERT INTO opportunities (id, title, description, organization, organization_id, organization_logo, type, category, location, is_remote, start_date, end_date, urgency, status, required_skills, items, contact_email, contact_phone, created_at, updated_at)
VALUES
  -- Past opportunities
  ('00000000-0000-0000-0000-000000000101', 'Volunteer Teachers for After-School Program (Past)', 'We need volunteer teachers to help children with homework and educational activities in our after-school program. The program runs Monday to Friday from 3 PM to 5 PM. Volunteers can choose to participate on any day(s) of the week.', 'Bright Future Foundation', '00000000-0000-0000-0000-000000000003', '/placeholder.svg', 'volunteer', 'education', 'New York, NY', false, '2022-10-01', '2023-06-30', 'medium', 'active', ARRAY['Teaching', 'Patience', 'Communication'], NULL, 'volunteer@brightfuture.org', '212-555-0101', '2022-09-15', '2022-09-15'),
  
  ('00000000-0000-0000-0000-000000000102', 'Emergency Food Supplies for Flood Victims (Past)', 'Following the recent floods, we are collecting non-perishable food items to support affected families. Priority items include canned goods, rice, pasta, baby food, and bottled water.', 'Crisis Relief Network', '00000000-0000-0000-0000-000000000003', '/placeholder.svg', 'donation', 'crisis', 'Houston, TX', false, '2023-01-10', '2023-02-15', 'critical', 'active', NULL, ARRAY['Canned goods', 'Rice', 'Pasta', 'Baby food', 'Bottled water'], 'donations@crisisrelief.org', '713-555-0202', '2023-01-05', '2023-01-05'),
  
  -- Current opportunities (before March 8, 2025)
  ('00000000-0000-0000-0000-000000000103', 'Virtual Mentorship for Youth', 'Become a virtual mentor for underprivileged teenagers. Our program pairs mentors with teens for weekly video calls to provide guidance, support, and inspiration. This is a 6-month commitment.', 'Youth Empowerment Alliance', '00000000-0000-0000-0000-000000000003', '/placeholder.svg', 'volunteer', 'community', 'Chicago, IL', true, CURRENT_DATE, '2025-01-31', 'medium', 'active', ARRAY['Mentoring', 'Empathy', 'Active listening'], NULL, 'mentors@youthempowerment.org', '312-555-0303', '2023-09-25', '2023-09-25'),
  
  ('00000000-0000-0000-0000-000000000104', 'Beach Cleanup Volunteers Needed', 'Join our weekend beach cleanup initiative to remove plastic waste and debris from coastal areas. All equipment will be provided. Volunteers should wear suitable clothing and footwear.', 'Ocean Conservation Society', '00000000-0000-0000-0000-000000000003', '/placeholder.svg', 'volunteer', 'environment', 'San Diego, CA', false, '2024-06-07', '2025-02-28', 'low', 'active', ARRAY['Environmental awareness', 'Teamwork'], NULL, 'cleanup@oceanconservation.org', '619-555-0404', '2024-05-28', '2024-05-28'),
  
  ('00000000-0000-0000-0000-000000000105', 'Winter Coat Drive for Homeless Shelter', 'Help us collect winter coats and warm clothing for local homeless shelters. We are looking for new or gently used coats, gloves, scarves, and hats for all ages.', 'Community Outreach Initiative', '00000000-0000-0000-0000-000000000003', '/placeholder.svg', 'donation', 'poverty', 'Boston, MA', false, '2024-10-15', '2025-03-05', 'high', 'active', NULL, ARRAY['Winter coats', 'Gloves', 'Scarves', 'Hats', 'Warm socks'], 'donations@communityoutreach.org', '617-555-0505', '2024-09-30', '2024-09-30'),
  
  -- Future opportunities (after March 8, 2025)
  ('00000000-0000-0000-0000-000000000106', 'Mobile Clinic Medical Volunteers (Future)', 'Medical professionals needed for our mobile clinic serving rural communities. We seek doctors, nurses, pharmacists, and administrative support. Services include basic health checks, vaccinations, and consultations.', 'Healthcare Without Boundaries', '00000000-0000-0000-0000-000000000003', '/placeholder.svg', 'volunteer', 'health', 'Atlanta, GA', false, '2025-04-05', '2025-04-12', 'high', 'active', ARRAY['Medical qualifications', 'Compassion', 'Reliability'], NULL, 'medical@healthcarewithoutboundaries.org', '404-555-0606', '2025-03-01', '2025-03-01'),
  
  ('00000000-0000-0000-0000-000000000107', 'Animal Shelter Support and Pet Supplies (Future)', 'Our animal shelter is at capacity and needs volunteers to help with daily care, as well as donations of pet food, bedding, and toys. Any time you can spare would be greatly appreciated.', 'Paws & Hearts Rescue', '00000000-0000-0000-0000-000000000003', '/placeholder.svg', 'volunteer', 'animals', 'Denver, CO', false, '2025-05-15', '2025-06-15', 'medium', 'active', ARRAY['Animal handling', 'Compassion', 'Reliability'], ARRAY['Pet food', 'Bedding', 'Toys', 'Cleaning supplies'], 'help@pawsandhearts.org', '303-555-0707', '2025-05-01', '2025-05-01'),
  
  ('00000000-0000-0000-0000-000000000108', 'Community Garden Project (Future)', 'Help transform an abandoned lot into a thriving community garden. We need volunteers for site preparation, planting, and ongoing maintenance. All skill levels welcome!', 'Urban Green Spaces', '00000000-0000-0000-0000-000000000003', '/placeholder.svg', 'volunteer', 'environment', 'Portland, OR', false, '2025-07-21', '2025-09-15', 'low', 'active', ARRAY['Gardening (optional)', 'Enthusiasm', 'Teamwork'], NULL, 'garden@urbangreen.org', '503-555-0808', '2025-07-05', '2025-07-05')
ON CONFLICT (id) DO UPDATE SET
  title = EXCLUDED.title,
  description = EXCLUDED.description,
  organization = EXCLUDED.organization,
  organization_id = EXCLUDED.organization_id,
  organization_logo = EXCLUDED.organization_logo,
  type = EXCLUDED.type,
  category = EXCLUDED.category,
  location = EXCLUDED.location,
  is_remote = EXCLUDED.is_remote,
  start_date = EXCLUDED.start_date,
  end_date = EXCLUDED.end_date,
  urgency = EXCLUDED.urgency,
  status = EXCLUDED.status,
  required_skills = EXCLUDED.required_skills,
  items = EXCLUDED.items,
  contact_email = EXCLUDED.contact_email,
  contact_phone = EXCLUDED.contact_phone;

-- Set up auth passwords (need to be run in separate SQL statements)
-- Note: For a real environment, passwords should be handled through Supabase Auth UI or API
-- This is a simplification for testing purposes
