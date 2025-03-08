
import { User } from '@/types';

export const mockUsers: User[] = [
  {
    id: '1',
    name: 'John Volunteer',
    email: 'volunteer@example.com',
    role: 'volunteer',
    location: 'San Francisco, CA',
    bio: 'Passionate about helping communities and environmental causes.',
    createdAt: new Date('2023-01-15'),
  },
  {
    id: '2',
    name: 'NGO Organization',
    email: 'ngo@example.com',
    role: 'ngo',
    profileImage: '/placeholder.svg',
    location: 'New York, NY',
    bio: 'Working to provide clean water to communities in need.',
    createdAt: new Date('2022-11-23'),
  },
  {
    id: '3',
    name: 'Admin User',
    email: 'admin@example.com',
    role: 'admin',
    location: 'Chicago, IL',
    createdAt: new Date('2022-10-10'),
  },
];
