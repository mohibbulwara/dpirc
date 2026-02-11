
import React from 'react';
import { motion } from 'framer-motion';
import { BookOpen, Calendar, User, ArrowRight } from 'lucide-react';
import { mockPosts } from '../services/mockData';

export default function BlogPage() {
  return (
    <div className="max-w-7xl mx-auto px-4 py-12">
      <div className="mb-12 flex justify-between items-end">
        <div>
          <h1 className="text-4xl font-orbitron font-bold text-white mb-4">Tech Insights</h1>
          <p className="text-gray-400">Deep dives into the tech stack of our latest machines.</p>
        </div>
        <div className="hidden md:block">
          <div className="flex items-center gap-2 px-4 py-2 bg-cyan-600/10 border border-cyan-500/30 rounded-full text-cyan-400 text-sm">
            <BookOpen size={16} /> 12 Articles Published
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
        {mockPosts.map((post, idx) => (
          <motion.article 
            key={post.id}
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: idx * 0.1 }}
            className="group relative"
          >
            <div className="aspect-[16/9] overflow-hidden rounded-3xl mb-6">
              <img src={post.imageUrl} alt={post.title} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700" />
            </div>
            <div className="flex items-center gap-6 text-sm text-gray-500 mb-4 font-bold uppercase tracking-tighter">
              <span className="flex items-center gap-2"><Calendar size={14} /> {post.date}</span>
              <span className="flex items-center gap-2"><User size={14} /> {post.author}</span>
            </div>
            <h2 className="text-3xl font-orbitron font-bold text-white mb-4 group-hover:text-cyan-400 transition-colors">
              {post.title}
            </h2>
            <p className="text-gray-400 leading-relaxed mb-6 line-clamp-2">
              {post.content}
            </p>
            <button className="flex items-center gap-2 text-cyan-400 font-bold hover:gap-4 transition-all">
              Read Article <ArrowRight size={20} />
            </button>
          </motion.article>
        ))}
      </div>

      {/* Featured Secondary Posts */}
      <div className="mt-24 grid grid-cols-1 md:grid-cols-3 gap-8">
        {[1, 2, 3].map(i => (
          <div key={i} className="p-6 bg-gray-900/30 border border-gray-800 rounded-2xl">
            <div className="text-[10px] font-bold text-cyan-500 uppercase tracking-widest mb-4">Tutorial</div>
            <h4 className="text-lg font-bold text-white mb-4 leading-tight">Setting up ROS2 Humble on Raspberry Pi 4</h4>
            <div className="text-gray-500 text-xs flex items-center justify-between">
              <span>By Elena Rodriguez</span>
              <span>5 min read</span>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
