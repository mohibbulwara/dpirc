
import React, { useState, useRef } from 'react';
import { motion, AnimatePresence, useScroll, useTransform, useMotionValue, useSpring } from 'framer-motion';
import { ChevronRight, Cpu, Users, Award, Zap, Bot, Send, Terminal, Radio, Target, Sparkles } from 'lucide-react';
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
  const { scrollY } = useScroll();
  
  // 3D Parallax Mouse Control
  const x = useMotionValue(0);
  const y = useMotionValue(0);
  const mouseXSpring = useSpring(x);
  const mouseYSpring = useSpring(y);
  const rotateX = useTransform(mouseYSpring, [-0.5, 0.5], ["10deg", "-10deg"]);
  const rotateY = useTransform(mouseXSpring, [-0.5, 0.5], ["-10deg", "10deg"]);

  const handleMouseMove = (e: React.MouseEvent) => {
    const rect = e.currentTarget.getBoundingClientRect();
    const width = rect.width;
    const height = rect.height;
    const mouseX = e.clientX - rect.left;
    const mouseY = e.clientY - rect.top;
    const xPct = (mouseX / width) - 0.5;
    const yPct = (mouseY / height) - 0.5;
    x.set(xPct);
    y.set(yPct);
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
    <div className="relative">
      {/* Hero Section */}
      <section 
        onMouseMove={handleMouseMove}
        className="relative min-h-screen flex items-center pt-32 pb-40 px-6 overflow-hidden"
      >
        <div className="absolute top-0 right-0 w-1/2 h-full bg-gradient-to-l from-cyan-500/5 to-transparent pointer-events-none" />
        
        <div className="max-w-[1400px] mx-auto w-full grid lg:grid-cols-12 gap-20 items-center relative z-10">
          
          {/* Text Content */}
          <motion.div 
            initial={{ opacity: 0, x: -50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8 }}
            className="lg:col-span-6"
          >
            <div className="inline-flex items-center gap-4 mb-10">
              <span className="h-[1px] w-8 bg-cyan-500" />
              <span className="text-premium text-cyan-400">NODE ID // DPIRC_001</span>
            </div>
            
            <h1 className="text-[4rem] md:text-[6.2rem] font-orbitron font-black text-white leading-[0.8] mb-12 tracking-tight">
              NEURAL<br/>
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-cyan-300 via-blue-500 to-purple-600">INTEL_</span>
            </h1>
            
            <p className="text-[15px] text-gray-500 max-w-lg mb-12 font-medium leading-relaxed uppercase tracking-widest">
              Architecting the nexus between synthetic intelligence and high-precision mechanical motion.
            </p>

            <div className="flex flex-wrap gap-10 items-center">
              <Link to="/projects" className="group relative bg-white text-black px-12 py-5 rounded-sm font-black text-[9px] tracking-[0.4em] uppercase transition-all hover:bg-cyan-500">
                <span className="relative z-10">INIT_ACCESS</span>
                <div className="absolute inset-0 bg-cyan-400 scale-x-0 group-hover:scale-x-100 origin-left transition-transform duration-500" />
              </Link>
              <Link to="/dashboard" className="text-premium text-gray-400 hover:text-white transition-colors border-b border-white/5 pb-2">
                COLLECTIVE_SYNC
              </Link>
            </div>

            <div className="mt-20 grid grid-cols-3 gap-8 border-t border-white/5 pt-12">
              <TelemetryItem label="CORE_LATENCY" value="0.04 MS" delay={0.2} />
              <TelemetryItem label="SYNAPTIC_LINK" value="ENCRYPTED" delay={0.3} />
              <TelemetryItem label="U_CLASS" value="A-9" delay={0.4} />
            </div>
          </motion.div>

          {/* Enhanced 3D Mascot Section */}
          <motion.div 
            style={{ rotateX, rotateY, transformStyle: "preserve-3d" }}
            className="lg:col-span-6 relative flex justify-center"
          >
            <div className="relative w-full max-w-[550px] aspect-square">
              {/* Floating UI Elements (Parallax Layers) */}
              <motion.div 
                animate={{ y: [-10, 10, -10] }}
                transition={{ duration: 4, repeat: Infinity }}
                style={{ translateZ: "100px" }}
                className="absolute top-10 -left-10 z-20 glass p-4 rounded-sm border-l-2 border-cyan-500"
              >
                <div className="text-[8px] font-black text-cyan-400 tracking-widest mb-1">UNIT_READY</div>
                <div className="text-[10px] text-white font-orbitron">DP-7 COMPANION</div>
              </motion.div>

              <motion.div 
                animate={{ y: [10, -10, 10] }}
                transition={{ duration: 5, repeat: Infinity }}
                style={{ translateZ: "50px" }}
                className="absolute bottom-20 -right-4 z-20 glass p-4 rounded-sm"
              >
                <div className="flex gap-1">
                  {[1, 2, 3, 4].map(i => <div key={i} className="w-1 h-3 bg-cyan-500/50 rounded-full animate-pulse" />)}
                </div>
              </motion.div>
              
              {/* Main 3D Mascot Container */}
              <div className="relative z-10 w-full h-full rounded-[40px] overflow-hidden scanline glow-cyan border border-white/10 group">
                <img 
                  src="https://images.unsplash.com/photo-1546776310-eef45dd6d63c?auto=format&fit=crop&q=80&w=800" 
                  alt="DPIRC Cute Robot"
                  className="w-full h-full object-cover grayscale brightness-125 group-hover:grayscale-0 group-hover:scale-110 transition-all duration-1000 ease-out"
                />
                
                {/* HUD Overlay */}
                <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-black/40 pointer-events-none" />
                <div className="absolute bottom-8 left-8 right-8">
                  <div className="flex justify-between items-end">
                    <div>
                      <div className="text-premium text-cyan-400 mb-1">MASCOT_OS_V2</div>
                      <div className="text-xs font-black tracking-widest text-white">THE LITTLE BUILDER</div>
                    </div>
                    <Bot size={20} className="text-cyan-400 animate-pulse" />
                  </div>
                </div>
              </div>

              {/* Orbital Rings */}
              <div className="absolute inset-0 border border-cyan-500/5 rounded-full animate-[spin_60s_linear_infinite] scale-110" />
              <div className="absolute inset-0 border border-dashed border-white/5 rounded-full animate-[spin_30s_linear_reverse_infinite] scale-125" />
            </div>
          </motion.div>
        </div>
      </section>

      {/* Luxury Stats Bar */}
      <section className="py-20 border-y border-white/5 bg-black/40 overflow-hidden">
        <div className="max-w-[1400px] mx-auto px-6">
          <div className="flex flex-wrap justify-between gap-12">
            {[
              { label: 'MEMBERS', value: '1.2K', icon: Users },
              { label: 'PROJECTS', value: '458', icon: Cpu },
              { label: 'AWARDS', value: '12', icon: Award },
              { label: 'NODES', value: '04', icon: Target },
            ].map((stat, i) => (
              <div key={i} className="flex items-center gap-6">
                <div className="w-12 h-12 glass flex items-center justify-center rounded-sm"><stat.icon size={18} className="text-cyan-400" /></div>
                <div>
                  <div className="text-premium opacity-40 mb-1">{stat.label}</div>
                  <div className="text-xl font-orbitron font-black text-white">{stat.value}</div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Neural Core Interface */}
      <section className="py-40 px-6">
        <div className="max-w-4xl mx-auto glass p-16 rounded-sm relative overflow-hidden group border border-cyan-500/10">
          <div className="absolute top-0 right-0 p-12 opacity-5 group-hover:opacity-20 transition-opacity">
            <Sparkles size={180} className="text-cyan-400" />
          </div>
          
          <div className="relative z-10">
            <div className="flex items-center gap-3 mb-8">
               <div className="w-2 h-2 bg-cyan-500 rounded-full animate-ping" />
               <span className="text-premium text-cyan-400">CORE_INTERFACE_SECURE</span>
            </div>
            <h2 className="text-3xl font-orbitron font-black text-white mb-10 tracking-widest uppercase">DPIRC_TERMINAL_V7</h2>
            
            <div className="space-y-8">
              <AnimatePresence>
                {chatResponse && (
                  <motion.div 
                    initial={{ opacity: 0, x: -10 }}
                    animate={{ opacity: 1, x: 0 }}
                    className="p-8 glass font-mono text-[11px] text-gray-400 leading-loose border-l-2 border-cyan-500"
                  >
                    <div className="text-premium text-cyan-400 mb-4 opacity-100">DPIRC_CORE_RESPONSE:</div>
                    {chatResponse}
                  </motion.div>
                )}
              </AnimatePresence>

              <form onSubmit={handleChat} className="flex flex-col sm:flex-row gap-5">
                <input 
                  type="text" 
                  value={chatMsg}
                  onChange={(e) => setChatMsg(e.target.value)}
                  placeholder="TRANSMIT_COMMAND_..." 
                  className="flex-grow bg-white/5 border border-white/5 px-8 py-5 text-[10px] font-bold text-white uppercase tracking-[0.3em] focus:outline-none focus:border-cyan-500/50 transition-all rounded-sm"
                />
                <button 
                  disabled={loading}
                  className="bg-white text-black px-12 py-5 font-black text-[10px] tracking-[0.4em] uppercase hover:bg-cyan-500 transition-all rounded-sm"
                >
                  {loading ? 'BUSY' : 'EXECUTE'}
                </button>
              </form>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
