
import React, { useState, useEffect } from 'react';
import { HashRouter as Router, Routes, Route, Link, useLocation } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  Cpu, 
  Users, 
  Calendar, 
  Layout, 
  BookOpen, 
  Home as HomeIcon, 
  Info, 
  Menu, 
  X,
  User as UserIcon,
  LogOut,
  ChevronRight,
  Bot,
  Zap
} from 'lucide-react';
import { User, UserRole } from './types';
import { mockUsers } from './services/mockData';
import HomePage from './pages/HomePage';
import ProjectsPage from './pages/ProjectsPage';
import EventsPage from './pages/EventsPage';
import BlogPage from './pages/BlogPage';
import DashboardPage from './pages/DashboardPage';
import AdminPage from './pages/AdminPage';
import AboutPage from './pages/AboutPage';

const Navbar = ({ currentUser, onLogout }: { currentUser: User | null; onLogout: () => void }) => {
  const [isOpen, setIsOpen] = useState(false);
  const location = useLocation();

  const navLinks = [
    { name: 'ARCHIVE', path: '/projects', icon: Cpu },
    { name: 'CHRONO', path: '/events', icon: Calendar },
    { name: 'INTEL', path: '/blog', icon: BookOpen },
    { name: 'ORIGIN', path: '/about', icon: Info },
  ];

  return (
    <nav className="fixed top-0 left-0 right-0 z-50 bg-black/40 backdrop-blur-xl border-b border-white/5 px-6 py-4">
      <div className="max-w-[1600px] mx-auto flex justify-between items-center">
        <Link to="/" className="flex items-center gap-3 group">
          <div className="w-8 h-8 bg-cyan-500 rounded-sm flex items-center justify-center group-hover:rotate-[90deg] transition-all duration-500 shadow-[0_0_20px_rgba(6,182,212,0.5)]">
            <Zap className="text-black" size={16} fill="currentColor" />
          </div>
          <span className="font-orbitron text-xl font-black tracking-[0.2em] text-white">
            DPIRC<span className="text-cyan-400">.</span>
          </span>
        </Link>

        {/* Desktop Nav */}
        <div className="hidden md:flex items-center gap-10">
          {navLinks.map((link) => (
            <Link 
              key={link.path} 
              to={link.path} 
              className={`text-premium transition-all hover:text-cyan-400 ${
                location.pathname === link.path ? 'text-cyan-400' : ''
              }`}
            >
              {link.name}
            </Link>
          ))}
          <div className="h-4 w-[1px] bg-white/10" />
          {currentUser ? (
            <div className="flex items-center gap-6">
              <Link to="/dashboard" className="flex items-center gap-3 group">
                <div className="text-right">
                  <div className="text-[9px] font-bold text-gray-500 uppercase tracking-widest leading-none">OPERATOR</div>
                  <div className="text-xs font-black text-white">{currentUser.name.toUpperCase()}</div>
                </div>
                <img src={currentUser.avatar} alt="User" className="w-9 h-9 rounded-full ring-1 ring-cyan-500/50 group-hover:ring-cyan-400 transition-all p-0.5" />
              </Link>
              <button onClick={onLogout} className="text-gray-500 hover:text-red-500 transition-colors">
                <LogOut size={16} />
              </button>
            </div>
          ) : (
            <Link to="/dashboard" className="bg-white text-black px-6 py-2.5 rounded-sm text-[10px] font-black tracking-[0.3em] transition-all hover:bg-cyan-500 hover:shadow-[0_0_25px_rgba(6,182,212,0.4)]">
              INITIALIZE
            </Link>
          )}
        </div>

        {/* Mobile Toggle */}
        <button className="md:hidden text-white" onClick={() => setIsOpen(!isOpen)}>
          {isOpen ? <X size={24} /> : <Menu size={24} />}
        </button>
      </div>

      <AnimatePresence>
        {isOpen && (
          <motion.div 
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            className="md:hidden absolute top-full left-0 w-full bg-black border-b border-white/5 p-8 flex flex-col gap-6"
          >
            {navLinks.map((link) => (
              <Link 
                key={link.path} 
                to={link.path} 
                onClick={() => setIsOpen(false)}
                className="text-premium text-lg"
              >
                {link.name}
              </Link>
            ))}
          </motion.div>
        )}
      </AnimatePresence>
    </nav>
  );
};

const Footer = () => (
  <footer className="bg-[#030303] border-t border-white/5 pt-24 pb-12 px-6">
    <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-4 gap-16">
      <div className="col-span-1 md:col-span-2">
        <div className="flex items-center gap-3 mb-8">
          <Zap className="text-cyan-400" size={28} />
          <span className="font-orbitron text-2xl font-black tracking-[0.3em] text-white">DPIRC</span>
        </div>
        <p className="text-gray-500 text-sm max-w-sm leading-relaxed mb-8">
          The Digital Prototype & Intelligent Robotics Collective. Sculpting the future of autonomous systems through neural-link engineering.
        </p>
        <div className="flex gap-6">
          {['X', 'INST', 'GH', 'LI'].map((social) => (
            <a key={social} href="#" className="text-premium hover:text-cyan-400 transition-colors">{social}</a>
          ))}
        </div>
      </div>
      <div>
        <div className="text-premium mb-8 text-white">DIRECTIVES</div>
        <ul className="space-y-4 text-[11px] font-bold text-gray-500 uppercase tracking-widest">
          <li><Link to="/projects" className="hover:text-cyan-400">System Archive</Link></li>
          <li><Link to="/events" className="hover:text-cyan-400">Chrono Log</Link></li>
          <li><Link to="/blog" className="hover:text-cyan-400">Neural Intel</Link></li>
        </ul>
      </div>
      <div>
        <div className="text-premium mb-8 text-white">ENCRYPTED MAIL</div>
        <div className="flex gap-2 p-1 bg-white/5 border border-white/10 rounded-sm">
          <input type="email" placeholder="ADDRESS@CORE" className="bg-transparent px-4 py-2 text-[10px] w-full focus:outline-none" />
          <button className="bg-cyan-500 px-3 py-2 text-black"><ChevronRight size={16} /></button>
        </div>
      </div>
    </div>
    <div className="max-w-7xl mx-auto mt-24 pt-8 border-t border-white/5 flex justify-between items-center text-[9px] font-bold text-gray-700 tracking-[0.4em] uppercase">
      <span>© 2024 DPIRC COLLECTIVE</span>
      <span>SYSTEM STATUS: STABLE</span>
    </div>
  </footer>
);

export default function App() {
  const [currentUser, setCurrentUser] = useState<User | null>(null);

  useEffect(() => {
    const saved = localStorage.getItem('robox_user');
    if (saved) setCurrentUser(JSON.parse(saved));
  }, []);

  const handleLogout = () => {
    setCurrentUser(null);
    localStorage.removeItem('robox_user');
  };

  const handleLogin = (user: User) => {
    setCurrentUser(user);
    localStorage.setItem('robox_user', JSON.stringify(user));
  };

  return (
    <Router>
      <div className="min-h-screen flex flex-col selection:bg-cyan-500/30">
        <Navbar currentUser={currentUser} onLogout={handleLogout} />
        
        <main className="flex-grow">
          <AnimatePresence mode="wait">
            <Routes>
              <Route path="/" element={<HomePage />} />
              <Route path="/about" element={<AboutPage />} />
              <Route path="/projects" element={<ProjectsPage />} />
              <Route path="/events" element={<EventsPage />} />
              <Route path="/blog" element={<BlogPage />} />
              <Route 
                path="/dashboard" 
                element={<DashboardPage currentUser={currentUser} onLogin={handleLogin} />} 
              />
              <Route 
                path="/admin" 
                element={currentUser?.role === UserRole.ADMIN ? <AdminPage /> : <HomePage />} 
              />
            </Routes>
          </AnimatePresence>
        </main>

        <Footer />
      </div>
    </Router>
  );
}
