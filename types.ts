
export enum UserRole {
  ADMIN = 'ADMIN',
  MEMBER = 'MEMBER',
  VISITOR = 'VISITOR'
}

export interface User {
  id: string;
  name: string;
  email: string;
  role: UserRole;
  avatar: string;
  joinedAt: string;
  enrolledEvents: string[];
}

export interface Project {
  id: string;
  title: string;
  description: string;
  category: 'AI' | 'IoT' | 'Automation' | 'Robotics';
  imageUrl: string;
  githubUrl?: string;
  demoUrl?: string;
  authorId: string;
  status: 'Draft' | 'Published' | 'Featured';
  tags: string[];
}

export interface ClubEvent {
  id: string;
  title: string;
  date: string;
  location: string;
  description: string;
  imageUrl: string;
  registeredUsers: string[];
  capacity: number;
}

export interface BlogPost {
  id: string;
  title: string;
  content: string;
  author: string;
  date: string;
  imageUrl: string;
  tags: string[];
  slug: string;
}

export interface ContactMessage {
  id: string;
  name: string;
  email: string;
  message: string;
  timestamp: string;
}
