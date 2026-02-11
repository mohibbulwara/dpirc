
import React from 'react';
import { motion } from 'framer-motion';
import { Target, Eye, ShieldCheck, Cpu } from 'lucide-react';

// Use React.FC to properly handle intrinsic attributes like 'key'
const TeamMember: React.FC<{ name: string; role: string; image: string }> = ({ name, role, image }) => (
  <div className="text-center group">
    <div className="relative mb-4 inline-block">
      <div className="absolute inset-0 bg-cyan-500 rounded-2xl blur-lg opacity-0 group-hover:opacity-20 transition-opacity" />
      <img src={image} alt={name} className="relative w-40 h-40 object-cover rounded-2xl grayscale group-hover:grayscale-0 transition-all duration-500" />
    </div>
    <h4 className="text-white font-bold font-orbitron">{name}</h4>
    <p className="text-cyan-500 text-xs font-bold uppercase tracking-widest mt-1">{role}</p>
  </div>
);

export default function AboutPage() {
  const team = [
    { name: 'Dr. Sarah Smith', role: 'Faculty Advisor', image: 'https://picsum.photos/seed/faculty/300' },
    { name: 'James Chen', role: 'President', image: 'https://picsum.photos/seed/james/300' },
    { name: 'Elena Rodriguez', role: 'Technical Lead', image: 'https://picsum.photos/seed/elena/300' },
    { name: 'Marcus Wong', role: 'Operations', image: 'https://picsum.photos/seed/marcus/300' },
  ];

  return (
    <div className="max-w-7xl mx-auto px-4 py-16">
      <div className="text-center mb-24">
        <h1 className="text-5xl font-orbitron font-black text-white mb-8">Our Mission</h1>
        <p className="text-xl text-gray-400 max-w-3xl mx-auto leading-relaxed">
          ROBOX isn't just a club; it's an engineering sanctuary. We bridge the gap between classroom theory and mechanical reality.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-12 mb-32">
        <div className="p-10 bg-gray-900/30 border border-gray-800 rounded-3xl">
          <Target className="text-cyan-400 mb-6" size={40} />
          <h3 className="text-2xl font-orbitron font-bold text-white mb-4">The Vision</h3>
          <p className="text-gray-400 leading-relaxed">To become the world's leading university robotics collective, fostering innovation through rapid prototyping.</p>
        </div>
        <div className="p-10 bg-gray-900/30 border border-gray-800 rounded-3xl">
          <Eye className="text-cyan-400 mb-6" size={40} />
          <h3 className="text-2xl font-orbitron font-bold text-white mb-4">The Impact</h3>
          <p className="text-gray-400 leading-relaxed">Solving humanitarian crises with affordable autonomous hardware solutions.</p>
        </div>
        <div className="p-10 bg-gray-900/30 border border-gray-800 rounded-3xl">
          <ShieldCheck className="text-cyan-400 mb-6" size={40} />
          <h3 className="text-2xl font-orbitron font-bold text-white mb-4">Values</h3>
          <p className="text-gray-400 leading-relaxed">Open source, rigorous testing, and cross-disciplinary collaboration above all.</p>
        </div>
      </div>

      <div className="mb-32">
        <div className="flex flex-col lg:flex-row gap-16 items-center">
          <div className="flex-1">
            <h2 className="text-4xl font-orbitron font-bold text-white mb-8">Club History</h2>
            <div className="space-y-6 text-gray-400 leading-relaxed">
              <p>Founded in 2018 by three engineering sophomores in a garage, ROBOX started as a small group building battle bots.</p>
              <p>Today, we occupy a 2000 sq. ft. lab facility with 3D printers, CNC machines, and a specialized testing arena.</p>
              <div className="flex gap-12 pt-6">
                <div>
                  <div className="text-4xl font-black text-white">200+</div>
                  <div className="text-cyan-500 text-xs font-bold uppercase tracking-widest">Alumni</div>
                </div>
                <div>
                  <div className="text-4xl font-black text-white">50k+</div>
                  <div className="text-cyan-500 text-xs font-bold uppercase tracking-widest">Lines of Code</div>
                </div>
              </div>
            </div>
          </div>
          <div className="flex-1 grid grid-cols-2 gap-4">
             <img src="https://images.unsplash.com/photo-1531746790731-6c087fecd05a?auto=format&fit=crop&q=80&w=400" className="rounded-2xl" />
             <img src="https://images.unsplash.com/photo-1518770660439-4636190af475?auto=format&fit=crop&q=80&w=400" className="rounded-2xl mt-8" />
          </div>
        </div>
      </div>

      <div>
        <h2 className="text-4xl font-orbitron font-bold text-center text-white mb-16">The Core Team</h2>
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-12">
          {team.map(member => (
            /* Fix: Passing individual props to TeamMember, now typed as React.FC to support 'key' */
            <TeamMember 
              key={member.name} 
              name={member.name} 
              role={member.role} 
              image={member.image} 
            />
          ))}
        </div>
      </div>
    </div>
  );
}
