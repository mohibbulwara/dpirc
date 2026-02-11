
import React, { useState } from 'react';
import { motion, AnimatePresence, useMotionValue, useSpring, useTransform } from 'framer-motion';
import { Cpu, Users, Award, Bot, Sparkles, Target, Zap } from 'lucide-react';
import { Link } from 'react-router-dom';
import { chatWithAssistant } from '../services/geminiService';

const TelemetryItem = ({ label, value, delay = 0 }: any) => (
  <motion.div 
    initial={{ opacity: 0, x: -10 }}
    whileInView={{ opacity: 1, x: 0 }}
    transition={{ delay }}
    className="flex flex-col gap-1"
  >
    <span className="text-premium opacity-40">{label}</span>
    <span className="text-[11px] font-orbitron font-bold text-cyan-400">{value}</span>
  </motion.div>
);

export default function HomePage() {
  const [chatMsg, setChatMsg] = useState('');
  const [chatResponse, setChatResponse] = useState('');
  const [loading, setLoading] = useState(false);
  
  // High-performance 3D Mouse Tracking
  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);

  const springConfig = { stiffness: 100, damping: 30 };
  const dx = useSpring(mouseX, springConfig);
  const dy = useSpring(mouseY, springConfig);

  const rotateX = useTransform(dy, [-0.5, 0.5], [15, -15]);
  const rotateY = useTransform(dx, [-0.5, 0.5], [-15, 15]);

  const handleMouseMove = (e: React.MouseEvent) => {
    const rect = e.currentTarget.getBoundingClientRect();
    const x = (e.clientX - rect.left) / rect.width - 0.5;
    const y = (e.clientY - rect.top) / rect.height - 0.5;
    mouseX.set(x);
    mouseY.set(y);
  };

  const handleChat = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!chatMsg.trim()) return;
    setLoading(true);
    const res = await chatWithAssistant(chatMsg);
    setChatResponse(res);
    setLoading(false);
    setChatMsg('');
  };

  return (
    <div className="relative min-h-screen bg-black">
      {/* 3D Hero Section */}
      <section 
        onMouseMove={handleMouseMove}
        onMouseLeave={() => { mouseX.set(0); mouseY.set(0); }}
        className="relative min-h-screen flex items-center pt-24 pb-32 px-6 overflow-hidden"
      >
        <div className="absolute top-0 right-0 w-full h-full bg-[radial-gradient(circle_at_70%_30%,rgba(6,182,212,0.05),transparent_70%)] pointer-events-none" />
        
        <div className="max-w-[1400px] mx-auto w-full grid lg:grid-cols-12 gap-12 items-center relative z-10">
          
          {/* Neural Branding */}
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="lg:col-span-6"
          >
            <div className="inline-flex items-center gap-4 mb-8">
              <div className="w-8 h-[1px] bg-cyan-500/50" />
              <span className="text-premium text-cyan-400">INITIATING_SEQUENCE_092</span>
            </div>
            
            <h1 className="text-[4.5rem] md:text-[7.5rem] font-orbitron font-black text-white leading-[0.8] mb-12 tracking-tighter">
              NEURAL<br/>
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 via-blue-500 to-purple-600">SYMPHONY_</span>
            </h1>
            
            <p className="text-[14px] text-gray-500 max-w-lg mb-12 font-medium leading-relaxed uppercase tracking-[0.3em]">
              The nexus of synthetic intelligence and high-torque mechanical engineering. 
              <span className="text-white"> Join the collective.</span>
            </p>

            <div className="flex flex-wrap gap-8 items-center">
              <Link to="/projects" className="group relative bg-white text-black px-12 py-5 rounded-sm font-black text-[10px] tracking-[0.5em] uppercase transition-all overflow-hidden">
                <span className="relative z-10">SYNC_CORE</span>
                <div className="absolute inset-0 bg-cyan-400 -translate-x-full group-hover:translate-x-0 transition-transform duration-500" />
              </Link>
              <Link to="/about" className="text-premium text-gray-500 hover:text-white transition-all border-b border-white/10 pb-2">
                ORIGIN_DATA
              </Link>
            </div>

            <div className="mt-24 grid grid-cols-3 gap-10 border-t border-white/5 pt-12">
              <TelemetryItem label="SAT_LINK" value="ACTIVE" delay={0.2} />
              <TelemetryItem label="NODES" value="128/256" delay={0.3} />
              <TelemetryItem label="STABLE" value="0.999" delay={0.4} />
            </div>
          </motion.div>

          {/* 3D Mascot Interactive Engine */}
          <div className="lg:col-span-6 relative flex justify-center items-center perspective-[2000px]">
            <motion.div 
              style={{ rotateX, rotateY, transformStyle: "preserve-3d" }}
              className="relative w-full max-w-[500px] aspect-square"
            >
              {/* Outer Glow Halo */}
              <div className="absolute inset-0 bg-cyan-500/10 blur-[120px] rounded-full animate-pulse" />
              
              {/* Depth Layer 3 (Back) */}
              <div 
                className="absolute inset-0 border border-cyan-500/10 rounded-full animate-[spin_40s_linear_infinite]" 
                style={{ transform: "translateZ(-150px)" }}
              />
              
              {/* Depth Layer 2 (Middle) */}
              <motion.div 
                className="absolute -top-10 -right-10 z-20 glass p-5 rounded-sm border-r-2 border-purple-500"
                style={{ transform: "translateZ(80px)" }}
              >
                <div className="text-[8px] font-black text-purple-400 tracking-widest mb-1">UNIT_CLASS_A</div>
                <div className="text-[11px] text-white font-orbitron font-bold">DP-7 SCOUT</div>
              </motion.div>

              {/* Main Mascot Container (Layer 1) */}
              <div 
                className="relative z-10 w-full h-full rounded-[60px] overflow-hidden border border-white/10 bg-black group shadow-[0_50px_100px_rgba(0,0,0,0.8)]"
                style={{ transform: "translateZ(30px)" }}
              >
                <div className="absolute inset-0 bg-gradient-to-br from-cyan-500/10 to-transparent opacity-50" />
                <img 
                  src="https://images.unsplash.com/photo-1546776310-eef45dd6d63c?auto=format&fit=crop&q=80&w=800" 
                  alt="DPIRC 3D Robot"
                  className="w-full h-full object-cover grayscale brightness-110 group-hover:grayscale-0 group-hover:scale-105 transition-all duration-1000 ease-out"
                />
                
                {/* HUD Scan Overlay */}
                <div className="absolute inset-0 scanline opacity-30" />
                <div className="absolute bottom-10 left-10 right-10">
                  <div className="flex justify-between items-end">
                    <div className="space-y-1">
                      <div className="text-[8px] font-bold text-cyan-400 tracking-[0.4em]">SYSTEM_VERSION_2.5</div>
                      <div className="text-sm font-black text-white tracking-widest uppercase">Intelligent Companion</div>
                    </div>
                    <Bot className="text-cyan-400 animate-pulse" size={24} />
                  </div>
                </div>
              </div>

              {/* Depth Layer 0 (Front-most) */}
              <motion.div 
                className="absolute -bottom-6 -left-6 z-30 glass p-4 border-l-2 border-cyan-500"
                style={{ transform: "translateZ(150px)" }}
              >
                <div className="flex items-center gap-3">
                  <div className="flex gap-1">
                    {[1, 2, 3].map(i => <div key={i} className="w-1 h-3 bg-cyan-400 rounded-full animate-bounce" style={{ animationDelay: `${i * 0.2}s` }} />)}
                  </div>
                  <span className="text-[9px] font-black text-white tracking-widest uppercase">SIGNAL_STRENGTH_MAX</span>
                </div>
              </motion.div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Terminal Interface */}
      <section className="py-32 px-6">
        <div className="max-w-4xl mx-auto glass p-12 rounded-sm border border-cyan-500/10 relative overflow-hidden">
          <div className="absolute top-0 right-0 p-8 opacity-5">
            <Sparkles size={120} className="text-cyan-400" />
          </div>

          <div className="relative z-10">
            <div className="flex items-center gap-3 mb-8">
              <div className="w-2 h-2 bg-cyan-500 rounded-full animate-ping" />
              <span className="text-premium text-cyan-400">SECURE_CORE_SYNC</span>
            </div>
            
            <h2 className="text-2xl font-orbitron font-black text-white mb-10 tracking-[0.2em] uppercase">DPIRC_TERMINAL_ACCESS</h2>
            
            <div className="space-y-8">
              <AnimatePresence mode="wait">
                {chatResponse && (
                  <motion.div 
                    initial={{ opacity: 0, x: -10 }}
                    animate={{ opacity: 1, x: 0 }}
                    className="p-8 bg-white/5 border-l-2 border-cyan-500 font-mono text-[11px] text-gray-400 leading-relaxed"
                  >
                    <div className="text-premium text-cyan-400 mb-4 opacity-100 font-bold">CORE_RESPONSE:</div>
                    {chatResponse}
                  </motion.div>
                )}
              </AnimatePresence>

              <form onSubmit={handleChat} className="flex flex-col sm:flex-row gap-4">
                <input 
                  type="text" 
                  value={chatMsg}
                  onChange={(e) => setChatMsg(e.target.value)}
                  placeholder="TRANSMIT_INSTRUCTION..." 
                  className="flex-grow bg-white/5 border border-white/10 px-6 py-4 text-[10px] font-bold text-white uppercase tracking-[0.3em] focus:outline-none focus:border-cyan-500 transition-all"
                />
                <button 
                  disabled={loading}
                  className="bg-white text-black px-10 py-4 font-black text-[10px] tracking-[0.5em] uppercase hover:bg-cyan-500 transition-all disabled:opacity-50"
                >
                  {loading ? 'BUSY' : 'EXECUTE'}
                </button>
              </form>
            </div>
          </div>
        </div>
      </section>

      {/* Stats Cluster */}
      <section className="py-24 border-y border-white/5 bg-black/50">
        <div className="max-w-[1400px] mx-auto px-6 grid grid-cols-2 lg:grid-cols-4 gap-12">
          {[
            { label: 'MEMBERS', value: '1,402', icon: Users },
            { label: 'HARDWARE', value: '458', icon: Cpu },
            { label: 'AWARDS', value: '12', icon: Award },
            { label: 'UPTIME', value: '99.9%', icon: Target },
          ].map((stat, i) => (
            <div key={i} className="flex flex-col gap-4">
              <div className="w-10 h-10 glass flex items-center justify-center rounded-sm">
                <stat.icon size={18} className="text-cyan-400" />
              </div>
              <div>
                <div className="text-premium opacity-40 mb-1">{stat.label}</div>
                <div className="text-2xl font-orbitron font-black text-white">{stat.value}</div>
              </div>
            </div>
          ))}
        </div>
      </section>
    </div>
  );
}
