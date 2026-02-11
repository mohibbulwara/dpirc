
import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  Users, 
  Package, 
  Calendar, 
  FileText, 
  CheckCircle, 
  Clock, 
  Trash2, 
  Plus, 
  BarChart2,
  Edit2,
  ExternalLink
} from 'lucide-react';
import { mockUsers, mockProjects, mockEvents, mockPosts } from '../services/mockData';

const AdminStat = ({ label, value, icon: Icon, color }: any) => (
  <div className="bg-gray-900/50 border border-gray-800 p-6 rounded-2xl">
    <div className="flex justify-between items-start mb-4">
      <div className={`p-3 rounded-xl bg-${color}-900/20 text-${color}-400`}>
        <Icon size={24} />
      </div>
      <div className="text-xs text-gray-500 font-bold">+12%</div>
    </div>
    <div className="text-3xl font-orbitron font-black text-white">{value}</div>
    <div className="text-xs text-gray-500 uppercase tracking-widest mt-1">{label}</div>
  </div>
);

export default function AdminPage() {
  const [activeTab, setActiveTab] = useState<'users' | 'projects' | 'blog'>('users');

  return (
    <div className="max-w-7xl mx-auto px-4 py-12">
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-6 mb-12">
        <div>
          <h1 className="text-4xl font-orbitron font-bold text-white mb-2">Command Center</h1>
          <p className="text-gray-400 text-sm">Central control for all club resources.</p>
        </div>
        <div className="flex gap-3">
          <button className="bg-cyan-600 hover:bg-cyan-500 text-white font-bold px-6 py-2 rounded-xl text-sm flex items-center gap-2">
            <Plus size={18} /> NEW {activeTab === 'blog' ? 'POST' : activeTab === 'projects' ? 'PROJECT' : 'EVENT'}
          </button>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-12">
        <AdminStat label="Total Users" value={mockUsers.length.toString()} icon={Users} color="blue" />
        <AdminStat label="Live Projects" value={mockProjects.length.toString()} icon={Package} color="cyan" />
        <AdminStat label="Events Held" value="28" icon={Calendar} color="purple" />
        <AdminStat label="Storage Used" value="4.2 GB" icon={BarChart2} color="green" />
      </div>

      {/* Tabs */}
      <div className="flex border-b border-gray-800 mb-8 overflow-x-auto">
        {[
          { id: 'users', label: 'Members', icon: Users },
          { id: 'projects', label: 'Projects', icon: Package },
          { id: 'blog', label: 'Blog Posts', icon: FileText }
        ].map(tab => (
          <button
            key={tab.id}
            onClick={() => setActiveTab(tab.id as any)}
            className={`flex items-center gap-2 px-8 py-4 text-sm font-bold uppercase tracking-widest transition-all border-b-2 ${
              activeTab === tab.id 
                ? 'border-cyan-500 text-cyan-400 bg-cyan-500/5' 
                : 'border-transparent text-gray-500 hover:text-white'
            }`}
          >
            <tab.icon size={16} />
            {tab.label}
          </button>
        ))}
      </div>

      <AnimatePresence mode="wait">
        {activeTab === 'users' && (
          <motion.div 
            key="users"
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            className="grid grid-cols-1 lg:grid-cols-3 gap-8"
          >
            <div className="lg:col-span-2 bg-gray-900/30 border border-gray-800 rounded-3xl overflow-hidden">
              <div className="p-6 border-b border-gray-800 flex justify-between items-center">
                <h3 className="font-orbitron font-bold text-white uppercase tracking-widest text-sm">Registration Queue</h3>
                <span className="px-2 py-0.5 bg-yellow-900/30 text-yellow-400 text-[10px] font-bold rounded border border-yellow-500/20">4 PENDING</span>
              </div>
              <div className="divide-y divide-gray-800">
                {mockUsers.map(user => (
                  <div key={user.id} className="p-4 flex items-center justify-between hover:bg-white/5 transition-colors">
                    <div className="flex items-center gap-4">
                      <img src={user.avatar} className="w-10 h-10 rounded-full" />
                      <div>
                        <div className="text-sm font-bold text-white">{user.name}</div>
                        <div className="text-[10px] text-gray-500 uppercase">{user.email}</div>
                      </div>
                    </div>
                    <div className="flex gap-2">
                      <button className="p-2 text-green-400 hover:bg-green-400/10 rounded-lg"><CheckCircle size={18} /></button>
                      <button className="p-2 text-red-400 hover:bg-red-400/10 rounded-lg"><Trash2 size={18} /></button>
                    </div>
                  </div>
                ))}
              </div>
            </div>
            <div className="bg-gray-900/30 border border-gray-800 rounded-3xl p-6">
               <h3 className="font-orbitron font-bold text-white mb-6 uppercase tracking-widest text-xs">Recent Logs</h3>
               <div className="space-y-4">
                 {[1, 2, 3, 4].map(i => (
                   <div key={i} className="flex gap-3 text-[10px]">
                     <div className="w-1 h-1 bg-cyan-500 rounded-full mt-1.5" />
                     <div className="text-gray-400">User <span className="text-white font-bold">alex@robox.edu</span> logged in from 192.168.1.1</div>
                   </div>
                 ))}
               </div>
            </div>
          </motion.div>
        )}

        {activeTab === 'projects' && (
          <motion.div 
            key="projects"
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            className="bg-gray-900/30 border border-gray-800 rounded-3xl overflow-hidden"
          >
            <table className="w-full text-left">
              <thead>
                <tr className="border-b border-gray-800 bg-black/20 font-orbitron text-[10px] text-gray-500 uppercase tracking-widest">
                  <th className="px-6 py-4">Project</th>
                  <th className="px-6 py-4">Author</th>
                  <th className="px-6 py-4">Status</th>
                  <th className="px-6 py-4 text-right">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-800">
                {mockProjects.map(proj => (
                  <tr key={proj.id} className="hover:bg-white/5 transition-colors group">
                    <td className="px-6 py-4">
                      <div className="flex items-center gap-3">
                        <img src={proj.imageUrl} className="w-10 h-10 rounded-lg object-cover" />
                        <div className="text-sm font-bold text-white">{proj.title}</div>
                      </div>
                    </td>
                    <td className="px-6 py-4 text-sm text-gray-400">ID: {proj.authorId}</td>
                    <td className="px-6 py-4">
                      <span className={`px-2 py-0.5 rounded text-[10px] font-bold ${
                        proj.status === 'Featured' ? 'bg-cyan-500/10 text-cyan-400' : 'bg-gray-800 text-gray-400'
                      }`}>
                        {proj.status}
                      </span>
                    </td>
                    <td className="px-6 py-4 text-right">
                      <div className="flex justify-end gap-2 opacity-0 group-hover:opacity-100 transition-opacity">
                        <button className="p-2 text-gray-400 hover:text-white"><Edit2 size={16} /></button>
                        <button className="p-2 text-red-500 hover:bg-red-500/10 rounded-lg"><Trash2 size={16} /></button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </motion.div>
        )}

        {/* Fix: Simplified duplicated logic and corrected broken parentheses/brackets */}
        {activeTab === 'blog' && (
          <motion.div 
            key="blog"
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"
          >
            {mockPosts.map(post => (
              <div key={post.id} className="bg-gray-900/30 border border-gray-800 rounded-2xl overflow-hidden p-6 group">
                <h4 className="font-bold text-white mb-2 line-clamp-1">{post.title}</h4>
                <div className="text-[10px] text-gray-500 uppercase tracking-tighter mb-4">{post.date} • {post.author}</div>
                <div className="flex justify-between items-center">
                  <div className="flex gap-2">
                    <button className="text-xs text-cyan-400 font-bold hover:underline">Edit</button>
                    <button className="text-xs text-red-500 font-bold hover:underline">Delete</button>
                  </div>
                  <ExternalLink size={14} className="text-gray-600" />
                </div>
              </div>
            ))}
            <button className="border-2 border-dashed border-gray-800 rounded-2xl flex flex-col items-center justify-center p-6 text-gray-600 hover:text-cyan-500 hover:border-cyan-500 transition-all">
              <Plus size={32} className="mb-2" />
              <span className="text-sm font-bold uppercase tracking-widest">Create New Article</span>
            </button>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
