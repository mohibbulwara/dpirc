
import { User, UserRole, Project, ClubEvent, BlogPost } from '../types';

export const mockUsers: User[] = [
  {
    id: 'u1',
    name: 'Alex Rivera',
    email: 'admin@robox.edu',
    role: UserRole.ADMIN,
    avatar: 'https://picsum.photos/seed/alex/200',
    joinedAt: '2023-01-15',
    enrolledEvents: ['e1']
  },
  {
    id: 'u2',
    name: 'Sarah Chen',
    email: 'sarah@robox.edu',
    role: UserRole.MEMBER,
    avatar: 'https://picsum.photos/seed/sarah/200',
    joinedAt: '2023-05-20',
    enrolledEvents: []
  }
];

export const mockProjects: Project[] = [
  {
    id: 'p1',
    title: 'Alpha-X Humanoid',
    description: 'A low-cost, open-source humanoid robot capable of advanced spatial mapping and bipedal walking using reinforcement learning.',
    category: 'Robotics',
    imageUrl: 'https://images.unsplash.com/photo-1485827404703-89b55fcc595e?auto=format&fit=crop&q=80&w=800',
    githubUrl: 'https://github.com/robox/alpha-x',
    demoUrl: 'https://youtube.com',
    authorId: 'u1',
    status: 'Featured',
    tags: ['ROS2', 'Python', 'Mechatronics']
  },
  {
    id: 'p2',
    title: 'Smart Agribot',
    description: 'Autonomous agricultural robot for precise weeding and pest detection using edge-AI cameras.',
    category: 'AI',
    imageUrl: 'https://images.unsplash.com/photo-1593508512255-86ab42a8e620?auto=format&fit=crop&q=80&w=800',
    githubUrl: 'https://github.com/robox/agribot',
    authorId: 'u2',
    status: 'Published',
    tags: ['YOLOv8', 'Arduino', 'IoT']
  },
  {
    id: 'p3',
    title: 'Swarm Drones',
    description: 'Coordinated drone navigation using decentralized communication protocols for search and rescue operations.',
    category: 'Automation',
    imageUrl: 'https://images.unsplash.com/photo-1508614589041-895b88991e3e?auto=format&fit=crop&q=80&w=800',
    authorId: 'u1',
    status: 'Published',
    tags: ['C++', 'PX4', 'Communication']
  }
];

export const mockEvents: ClubEvent[] = [
  {
    id: 'e1',
    title: 'RoboWars 2024',
    date: '2024-11-20T10:00:00Z',
    location: 'University Arena',
    description: 'The flagship combat robotics tournament. 3kg and 15kg weight categories.',
    imageUrl: 'https://images.unsplash.com/photo-1581092160562-40aa08e78837?auto=format&fit=crop&q=80&w=800',
    registeredUsers: ['u1'],
    capacity: 50
  },
  {
    id: 'e2',
    title: 'ROS2 Fundamentals Workshop',
    date: '2024-12-05T14:30:00Z',
    location: 'Lab 402',
    description: 'Hands-on session for beginners to learn Robot Operating System 2.',
    imageUrl: 'https://images.unsplash.com/photo-1531746790731-6c087fecd05a?auto=format&fit=crop&q=80&w=800',
    registeredUsers: [],
    capacity: 20
  }
];

export const mockPosts: BlogPost[] = [
  {
    id: 'b1',
    title: 'The Future of Edge AI in Robotics',
    content: 'Edge AI is revolutionizing how robots perceive the world...',
    author: 'Alex Rivera',
    date: '2024-10-10',
    imageUrl: 'https://images.unsplash.com/photo-1677442136019-21780ecad995?auto=format&fit=crop&q=80&w=800',
    tags: ['AI', 'Robotics', 'Hardware'],
    slug: 'future-of-edge-ai'
  }
];
