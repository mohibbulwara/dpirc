
import React from 'react';
import { motion } from 'framer-motion';
import { Calendar, MapPin, Users, ChevronRight } from 'lucide-react';
import { mockEvents } from '../services/mockData';

export default function EventsPage() {
  return (
    <div className="max-w-7xl mx-auto px-4 py-12">
      <div className="mb-12">
        <h1 className="text-4xl font-orbitron font-bold text-white mb-4">Upcoming Events</h1>
        <p className="text-gray-400">Join our workshops, hackathons, and tournaments.</p>
      </div>

      <div className="space-y-8">
        {mockEvents.map((event, idx) => (
          <motion.div
            key={event.id}
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: idx * 0.1 }}
            className="flex flex-col lg:flex-row gap-8 bg-gray-900/30 border border-gray-800 rounded-3xl p-6 hover:border-cyan-500/30 transition-all"
          >
            <div className="lg:w-1/3 aspect-video lg:aspect-square overflow-hidden rounded-2xl">
              <img src={event.imageUrl} alt={event.title} className="w-full h-full object-cover" />
            </div>
            <div className="lg:w-2/3 flex flex-col">
              <div className="flex-grow">
                <div className="flex items-center gap-4 text-cyan-400 text-sm font-semibold mb-4">
                  <span className="flex items-center gap-1.5"><Calendar size={16} /> {new Date(event.date).toLocaleDateString()}</span>
                  <span className="flex items-center gap-1.5"><MapPin size={16} /> {event.location}</span>
                </div>
                <h3 className="text-3xl font-orbitron font-bold text-white mb-4">{event.title}</h3>
                <p className="text-gray-400 leading-relaxed mb-6">
                  {event.description}
                </p>
                <div className="flex items-center gap-2 mb-8 text-sm text-gray-500">
                  <Users size={16} />
                  <span>{event.registeredUsers.length} / {event.capacity} registered</span>
                </div>
              </div>
              <div className="flex gap-4">
                <button className="bg-cyan-600 hover:bg-cyan-500 text-white font-bold px-8 py-3 rounded-xl transition-all">
                  Register Now
                </button>
                <button className="border border-gray-800 hover:bg-gray-800 text-white font-bold px-8 py-3 rounded-xl transition-all">
                  View Details
                </button>
              </div>
            </div>
          </motion.div>
        ))}
      </div>

      {/* Past Events */}
      <div className="mt-24">
        <h2 className="text-2xl font-orbitron font-bold text-white mb-8 border-l-4 border-cyan-500 pl-4">Past Sessions</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {[1, 2, 3].map(i => (
            <div key={i} className="p-6 bg-gray-900/20 border border-gray-800 rounded-2xl opacity-60">
              <div className="text-xs text-gray-500 mb-2">October 15, 2023</div>
              <h4 className="font-bold text-white mb-4">PCB Design 101</h4>
              <button className="text-cyan-400 text-sm font-bold flex items-center gap-1">Recap <ChevronRight size={14} /></button>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
