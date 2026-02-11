
import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Layout, Calendar, MessageSquare, Settings, Bell, ChevronRight, Zap, Plus, X, Sparkles, Shield, Fingerprint, Activity, Code } from 'lucide-react';
import { User, UserRole } from '../types';
import { mockUsers } from '../services/mockData';
import { generateProjectIdea, optimizeSchematic } from '../services/geminiService';

const MemberCard = ({ user }: { user: User }) => (
  <motion.div 
    whileHover={{ rotateY: 10, rotateX: -2, scale: 1.02 }}
    className="relative w-full h-72 rounded-sm overflow-hidden shadow-2xl transition-all duration-500 preserve-3d glass border border-white/10"
    style={{ perspective: '1200px' }}
  >
    <div className="absolute inset-0 bg-gradient-to-br from-cyan-950/40 via-black to-purple-950/40" />
    <div className="absolute inset-0 scanline opacity-20" />
    <div className="relative p-10 h-full flex flex-col justify-between z-10">
      <div className="flex justify-between items-start">
        <div className="flex items-center gap-6">
          <div className="relative">
            <img src={user.avatar} className="w-20 h-20 rounded-sm border border-cyan-500/50 p-1" />
            <div className="absolute -bottom-1 -right-1 w-4 h-4 bg-cyan-500 border-2 border-black rounded-full animate-pulse shadow-[0_0_10px_cyan]" />
          </div>
          <div>
            <div className="font-orbitron font-black text-2xl text-white tracking-[0.1em]">{user.name.toUpperCase()}</div>
            <div className="text-[10px] font-bold text-cyan-400 uppercase tracking-[0.4em] mt-2">OPERATOR_ID: {user.id}-DPIRC-9</div>
          </div>
        </div>
        <Fingerprint className="text-cyan-500/30" size={40} />
      </div>

      <div className="flex justify-between items-end">
        <div>
          <div className="text-[9px] font-bold text-gray-600 uppercase tracking-[0.4em] mb-2">ACCESS_LEVEL</div>
          <div className="flex gap-1.5">
            {[1, 2, 3, 4, 5].map(i => (
              <div key={i} className={`h-1 w-8 rounded-full ${i <= (user.role === 'ADMIN' ? 5 : 2) ? 'bg-cyan-400 shadow-[0_0_5px_cyan]' : 'bg-white/10'}`} />
            ))}
          </div>
        </div>
        <div className="text-right">
          <div className="text-[9px] font-bold text-gray-600 uppercase tracking-[0.4em] mb-1">NODE_STATUS</div>
          <div className="text-[10px] font-black text-white tracking-[0.2em] animate-pulse">ENCRYPTED_ONLINE</div>
        </div>
      </div>
    </div>
    
    <style>{`
      .preserve-3d { transform-style: preserve-3d; }
    `}</style>
  </motion.div>
);

export default function DashboardPage({ currentUser, onLogin }: { currentUser: User | null; onLogin: (user: User) => void }) {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showSubmitModal, setShowSubmitModal] = useState(false);
  const [aiLoading, setAiLoading] = useState(false);
  const [optimization, setOptimization] = useState('');

  const [formData, setFormData] = useState({
    title: '',
    description: '',
    category: 'Robotics',
    tags: ''
  });

  const handleDemoLogin = (role: UserRole) => {
    const user = role === UserRole.ADMIN ? mockUsers[0] : mockUsers[1];
    onLogin(user);
  };

  const handleOptimize = async () => {
    if (!formData.description) return;
    setAiLoading(true);
    const res = await optimizeSchematic(formData.description);
    setOptimization(res || '');
    setAiLoading(false);
  };

  if (!currentUser) {
    return (
      <div className="min-h-screen flex items-center justify-center px-6 bg-grid">
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="max-w-md w-full glass p-12 rounded-sm relative overflow-hidden"
        >
          <div className="absolute top-0 left-0 w-full h-[2px] bg-gradient-to-r from-transparent via-cyan-500 to-transparent" />
          <div className="text-center mb-12">
            <h2 className="text-3xl font-orbitron font-black text-white mb-3 tracking-widest uppercase">NODE LOGIN</h2>
            <div className="text-premium text-cyan-400">Verifying Operator Identity</div>
          </div>

          <div className="space-y-8">
            <div>
              <label className="text-premium block mb-4">ACCESS_DOMAIN</label>
              <input 
                type="email" 
                className="w-full bg-white/5 border border-white/10 px-6 py-5 text-[10px] font-bold text-white tracking-widest focus:outline-none focus:border-cyan-500 transition-all rounded-sm" 
                placeholder="ADDRESS@DPIRC.CORE"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
            </div>
            <div>
              <label className="text-premium block mb-4">ENCRYPTION_KEY</label>
              <input 
                type="password" 
                className="w-full bg-white/5 border border-white/10 px-6 py-5 text-[10px] font-bold text-white tracking-widest focus:outline-none focus:border-cyan-500 transition-all rounded-sm" 
                placeholder="••••••••"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />
            </div>
            <button className="w-full bg-white text-black py-6 rounded-sm font-black text-[10px] tracking-[0.5em] uppercase hover:bg-cyan-500 transition-all">
              INITIALIZE_SYNC
            </button>
          </div>

          <div className="mt-16 pt-8 border-t border-white/5 grid grid-cols-2 gap-4">
            <button onClick={() => handleDemoLogin(UserRole.ADMIN)} className="text-[9px] font-bold text-gray-600 hover:text-cyan-400 uppercase tracking-widest">DEBUG_ADMIN</button>
            <button onClick={() => handleDemoLogin(UserRole.MEMBER)} className="text-[9px] font-bold text-gray-600 hover:text-cyan-400 uppercase tracking-widest">DEBUG_OPERATOR</button>
          </div>
        </motion.div>
      </div>
    );
  }

  return (
    <div className="max-w-[1400px] mx-auto px-6 py-24">
      <div className="flex flex-col lg:flex-row gap-16">
        <aside className="lg:w-96 space-y-10">
          <MemberCard user={currentUser} />
          
          <div className="glass p-8 rounded-sm">
            <div className="text-premium text-white mb-8 flex items-center gap-3">
              <Activity size={14} className="text-cyan-500" /> SYSTEM_VITALITY
            </div>
            <div className="space-y-8">
              {[
                { label: 'NEURAL_LINK', val: '99.2%', color: 'bg-cyan-400' },
                { label: 'HARDWARE_SYNC', val: 'TIER_01', color: 'bg-blue-400' },
                { label: 'LATENCY_MAP', val: '1.2MS', color: 'bg-purple-400' },
              ].map(stat => (
                <div key={stat.label}>
                   <div className="flex justify-between text-[10px] font-black text-gray-500 mb-3 tracking-widest">
                     <span>{stat.label}</span>
                     <span className="text-white">{stat.val}</span>
                   </div>
                   <div className="h-[2px] w-full bg-white/5 rounded-full overflow-hidden">
                     <div className={`h-full ${stat.color} w-11/12 animate-pulse`} />
                   </div>
                </div>
              ))}
            </div>
          </div>
        </aside>

        <main className="flex-grow space-y-16">
          <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-8">
            <div>
              <h2 className="text-4xl font-orbitron font-black text-white tracking-widest uppercase">OPERATOR_LOG<span className="text-cyan-400 animate-pulse">_</span></h2>
              <div className="text-premium mt-4 text-cyan-400">Node Secure // Active Session Established</div>
            </div>
            <button 
              onClick={() => setShowSubmitModal(true)}
              className="bg-white text-black font-black text-[10px] tracking-[0.4em] px-10 py-5 rounded-sm hover:bg-cyan-500 transition-all shadow-2xl"
            >
              UPLOAD_SCHEMATIC
            </button>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-10">
             <div className="glass p-10 rounded-sm relative overflow-hidden group">
                <div className="absolute top-0 left-0 w-[2px] h-full bg-cyan-500" />
                <h3 className="text-premium text-white mb-10">MISSION_DIRECTIVES</h3>
                <div className="space-y-10">
                  <div className="flex gap-6 items-start">
                    <div className="w-12 h-12 bg-white/5 flex items-center justify-center text-cyan-400 border border-white/10"><Calendar size={24} /></div>
                    <div>
                      <div className="text-xs font-black text-white tracking-widest uppercase mb-1">CYBER_QUALIFIERS</div>
                      <div className="text-[10px] text-gray-500 font-bold uppercase tracking-widest">T-MINUS 12:44:02</div>
                    </div>
                  </div>
                  <div className="flex gap-6 items-start">
                    <div className="w-12 h-12 bg-white/5 flex items-center justify-center text-purple-400 border border-white/10"><Shield size={24} /></div>
                    <div>
                      <div className="text-xs font-black text-white tracking-widest uppercase mb-1">CORE_CALIBRATION</div>
                      <div className="text-[10px] text-gray-500 font-bold uppercase tracking-widest">STATUS: IN_PROGRESS</div>
                    </div>
                  </div>
                </div>
             </div>

             <div className="glass p-10 rounded-sm">
                <h3 className="text-premium text-white mb-10 flex items-center gap-3">
                  <Activity className="text-cyan-400" size={16} /> SYSTEM_TELEMETRY
                </h3>
                <div className="space-y-4">
                  <div className="flex items-center justify-between p-5 bg-white/5 rounded-sm border border-white/5">
                    <span className="text-[10px] font-black text-white tracking-widest uppercase">ALPHA_UNIT_SYNC</span>
                    <span className="text-[9px] text-cyan-400 font-bold tracking-[0.3em]">98%</span>
                  </div>
                  <div className="flex items-center justify-between p-5 bg-white/5 rounded-sm border border-white/5 opacity-50">
                    <span className="text-[10px] font-black text-white tracking-widest uppercase">GAMMA_NODE_BUSY</span>
                    <span className="text-[9px] text-yellow-500 font-bold tracking-[0.3em]">WAIT</span>
                  </div>
                </div>
             </div>
          </div>
        </main>
      </div>

      <AnimatePresence>
        {showSubmitModal && (
          <motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-[100] flex items-center justify-center p-6 bg-black/95 backdrop-blur-3xl"
          >
            <motion.div 
              initial={{ scale: 0.98, y: 10 }}
              animate={{ scale: 1, y: 0 }}
              className="glass max-w-2xl w-full rounded-sm p-12 relative overflow-hidden"
            >
              <div className="flex justify-between items-center mb-12">
                <div className="text-4xl font-orbitron font-black text-white tracking-tighter uppercase">INPUT_SYSTEM</div>
                <button onClick={() => setShowSubmitModal(false)} className="text-gray-500 hover:text-white transition-colors"><X size={32} /></button>
              </div>

              <div className="space-y-10">
                <div className="grid grid-cols-2 gap-8">
                  <div>
                    <label className="text-premium block mb-4">VECTOR_ID</label>
                    <input 
                      type="text" 
                      className="w-full bg-white/5 border border-white/10 px-6 py-5 text-[10px] font-bold text-white tracking-widest focus:outline-none focus:border-cyan-500 transition-all rounded-sm" 
                      value={formData.title}
                      onChange={e => setFormData({...formData, title: e.target.value})}
                    />
                  </div>
                  <div>
                    <label className="text-premium block mb-4">SYSTEM_CLASS</label>
                    <select 
                      className="w-full bg-white/5 border border-white/10 px-6 py-5 text-[10px] font-bold text-white tracking-widest focus:outline-none focus:border-cyan-500 transition-all appearance-none rounded-sm"
                      value={formData.category}
                      onChange={e => setFormData({...formData, category: e.target.value})}
                    >
                      <option>ROBOTICS</option>
                      <option>AI</option>
                      <option>IOT</option>
                    </select>
                  </div>
                </div>

                <div>
                  <div className="flex justify-between items-center mb-4">
                    <label className="text-premium">TECHNICAL_SCHEMA</label>
                    <button 
                      onClick={handleOptimize}
                      disabled={aiLoading || !formData.description}
                      className="flex items-center gap-2 text-[9px] font-black text-cyan-400 hover:text-white transition-all uppercase disabled:opacity-30 tracking-[0.2em]"
                    >
                      {aiLoading ? "PROCESSING..." : <><Sparkles size={12} /> CORE_OPTIMIZER</>}
                    </button>
                  </div>
                  <textarea 
                    rows={4}
                    className="w-full bg-white/5 border border-white/10 px-6 py-5 text-[10px] font-bold text-white tracking-widest focus:outline-none focus:border-cyan-500 resize-none rounded-sm leading-relaxed" 
                    value={formData.description}
                    onChange={e => setFormData({...formData, description: e.target.value})}
                  />
                  {optimization && (
                    <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="mt-6 p-6 bg-cyan-500/5 border-l-2 border-cyan-500 text-[10px] font-mono text-gray-400 leading-loose">
                      <strong className="text-cyan-400">CORE_SYNC_RECOMMENDATION:</strong><br/> {optimization}
                    </motion.div>
                  )}
                </div>

                <button 
                  onClick={() => setShowSubmitModal(false)}
                  className="w-full bg-white text-black py-6 rounded-sm font-black text-[10px] tracking-[0.5em] uppercase hover:bg-cyan-500 transition-all"
                >
                  TRANSMIT_TO_COLLECTIVE
                </button>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
