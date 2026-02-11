
import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ExternalLink, Github, Search, Filter, X, ChevronRight } from 'lucide-react';
import { mockProjects } from '../services/mockData';
import { Project } from '../types';

export default function ProjectsPage() {
  const [filter, setFilter] = useState('All');
  const [search, setSearch] = useState('');
  const [selectedProject, setSelectedProject] = useState<Project | null>(null);

  const categories = ['All', 'AI', 'Robotics', 'Automation', 'IoT'];

  const filtered = mockProjects.filter(p => {
    const matchesFilter = filter === 'All' || p.category === filter;
    const matchesSearch = p.title.toLowerCase().includes(search.toLowerCase()) || 
                          p.tags.some(t => t.toLowerCase().includes(search.toLowerCase()));
    return matchesFilter && matchesSearch;
  });

  return (
    <div className="max-w-7xl mx-auto px-4 py-12">
      <div className="mb-12">
        <h1 className="text-4xl font-orbitron font-bold text-white mb-4">Project Gallery</h1>
        <p className="text-gray-400">Discover what we've been building in the lab.</p>
      </div>

      <div className="flex flex-col md:flex-row gap-6 mb-12">
        <div className="relative flex-grow">
          <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-500" size={20} />
          <input 
            type="text" 
            placeholder="Search robots, tech stacks, or authors..." 
            className="w-full bg-gray-900/50 border border-gray-800 rounded-xl pl-12 pr-4 py-3 focus:outline-none focus:border-cyan-500 text-white"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
          />
        </div>
        <div className="flex items-center gap-2 overflow-x-auto pb-2 md:pb-0">
          <Filter size={20} className="text-cyan-500 hidden md:block" />
          {categories.map(cat => (
            <button
              key={cat}
              onClick={() => setFilter(cat)}
              className={`px-4 py-2 rounded-lg text-sm font-semibold transition-all whitespace-nowrap ${
                filter === cat ? 'bg-cyan-600 text-white' : 'bg-gray-900 text-gray-400 hover:bg-gray-800'
              }`}
            >
              {cat}
            </button>
          ))}
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        <AnimatePresence>
          {filtered.map((project, idx) => (
            <motion.div
              key={project.id}
              layout
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.9 }}
              transition={{ delay: idx * 0.05 }}
              className="group bg-gray-900/40 border border-gray-800 rounded-2xl overflow-hidden hover:border-cyan-500/50 transition-all cursor-pointer"
              onClick={() => setSelectedProject(project)}
            >
              <div className="aspect-video overflow-hidden relative">
                <img 
                  src={project.imageUrl} 
                  alt={project.title} 
                  className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500" 
                />
                <div className="absolute top-4 left-4">
                  <span className="px-3 py-1 bg-black/60 backdrop-blur-md rounded-full text-[10px] font-bold text-cyan-400 border border-cyan-500/30 uppercase tracking-tighter">
                    {project.category}
                  </span>
                </div>
              </div>
              <div className="p-6">
                <h3 className="text-xl font-orbitron font-bold text-white mb-2">{project.title}</h3>
                <p className="text-gray-400 text-sm line-clamp-2 mb-4">
                  {project.description}
                </p>
                <div className="flex flex-wrap gap-2 mb-6">
                  {project.tags.slice(0, 3).map(tag => (
                    <span key={tag} className="text-[10px] text-gray-500 bg-gray-800 px-2 py-1 rounded">#{tag}</span>
                  ))}
                  {project.tags.length > 3 && <span className="text-[10px] text-gray-600">+{project.tags.length - 3}</span>}
                </div>
                <div className="flex items-center justify-between">
                  <div className="flex gap-4">
                    {project.githubUrl && <Github size={18} className="text-gray-500" />}
                  </div>
                  <span className="text-cyan-400 text-sm font-bold flex items-center gap-1 group-hover:gap-2 transition-all">
                    View Details <ChevronRight size={16} />
                  </span>
                </div>
              </div>
            </motion.div>
          ))}
        </AnimatePresence>
      </div>

      {/* Project Detail Modal */}
      <AnimatePresence>
        {selectedProject && (
          <motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-[60] flex items-center justify-center p-4 bg-black/90 backdrop-blur-sm"
            onClick={() => setSelectedProject(null)}
          >
            <motion.div 
              initial={{ scale: 0.9, y: 20 }}
              animate={{ scale: 1, y: 0 }}
              exit={{ scale: 0.9, y: 20 }}
              className="bg-gray-900 border border-cyan-900/50 max-w-4xl w-full rounded-3xl overflow-hidden shadow-[0_0_50px_rgba(8,145,178,0.2)]"
              onClick={e => e.stopPropagation()}
            >
              <div className="relative aspect-video md:aspect-[21/9]">
                <img src={selectedProject.imageUrl} className="w-full h-full object-cover" />
                <button 
                  onClick={() => setSelectedProject(null)}
                  className="absolute top-4 right-4 p-2 bg-black/50 hover:bg-black rounded-full text-white transition-colors"
                >
                  <X size={24} />
                </button>
              </div>
              <div className="p-8 md:p-12">
                <div className="flex flex-wrap items-center gap-4 mb-6">
                   <span className="px-4 py-1 bg-cyan-900/30 text-cyan-400 text-xs font-bold rounded-full border border-cyan-500/30 uppercase tracking-widest">
                     {selectedProject.category}
                   </span>
                   <div className="flex gap-2">
                     {selectedProject.tags.map(t => <span key={t} className="text-xs text-gray-500">#{t}</span>)}
                   </div>
                </div>
                <h2 className="text-3xl md:text-5xl font-orbitron font-black text-white mb-6">{selectedProject.title}</h2>
                <p className="text-gray-300 text-lg leading-relaxed mb-8">
                  {selectedProject.description}
                </p>
                <div className="flex flex-col sm:flex-row gap-4 pt-8 border-t border-gray-800">
                  {selectedProject.githubUrl && (
                    <a href={selectedProject.githubUrl} target="_blank" className="flex items-center justify-center gap-2 bg-gray-800 hover:bg-gray-700 text-white px-8 py-3 rounded-xl font-bold transition-all">
                      <Github size={20} /> Repository
                    </a>
                  )}
                  {selectedProject.demoUrl && (
                    <a href={selectedProject.demoUrl} target="_blank" className="flex items-center justify-center gap-2 bg-cyan-600 hover:bg-cyan-500 text-white px-8 py-3 rounded-xl font-bold transition-all">
                      <ExternalLink size={20} /> Live Demo
                    </a>
                  )}
                </div>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
