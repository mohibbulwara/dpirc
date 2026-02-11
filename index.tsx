
import React, { useState, useEffect } from 'react';
import ReactDOM from 'react-dom/client';
import { HashRouter as Router, Routes, Route, Link, useLocation } from 'react-router-dom';
import { motion, AnimatePresence, useMotionValue, useSpring, useTransform } from 'framer-motion';
import { 
  Cpu, Users, Calendar, BookOpen, Info, ChevronRight, Bot, Zap, Sparkles, Award
} from 'lucide-react';
import { chatWithAssistant } from './services/geminiService';

// --- SHARED COMPONENTS ---

const TelemetryItem = ({ label, value, delay = 0 }: { label: string; value: string; delay?: number }) => (
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

const PremiumButton = ({ children, to, primary = false }: any) => {
  const content = (
    <div className={`group relative px-10 py-4 rounded-sm font-black text-[9px] tracking-[0.4em] uppercase transition-all overflow-hidden inline-block ${primary ? 'bg-white text-black' : 'bg-white/5 text-white border border-white/10'}`}>
      <span className="relative z-10">{children}</span>
      <div className="absolute inset-0 bg-cyan-400 -translate-x-full group-hover:translate-x-0 transition-transform duration-500 ease-out" />
    </div>
  );
  return to ? <Link to={to}>{content}</Link> : <button>{content}</button>;
};

// --- CORE HOME COMPONENT ---

const Home = () => {
  const [chatMsg, setChatMsg] = useState('');
  const [chatResponse, setChatResponse] = useState('');
  const [loading, setLoading] = useState(false);
  
  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);
  const dx = useSpring(mouseX, { stiffness: 100, damping: 30 });
  const dy = useSpring(mouseY, { stiffness: 100, damping: 30 });

  const rotateX = useTransform(dy, [-0.5, 0.5], [12, -12]);
  const rotateY = useTransform(dx, [-0.5, 0.5], [-12, 12]);

  const handleMouseMove = (e: React.MouseEvent) => {
    const rect = e.currentTarget.getBoundingClientRect();
    mouseX.set((e.clientX - rect.left) / rect.width - 0.5);
    mouseY.set((e.clientY - rect.top) / rect.height - 0.5);
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
    <div className="relative min-h-screen">
      <section 
        onMouseMove={handleMouseMove}
        onMouseLeave={() => { mouseX.set(0); mouseY.set(0); }}
        className="relative min-h-screen flex items-center pt-32 pb-40 px-6 overflow-hidden"
      >
        <div className="absolute top-0 right-0 w-full h-full bg-[radial-gradient(circle_at_70%_30%,rgba(6,182,212,0.03),transparent_70%)] pointer-events-none" />
        
        <div className="max-w-[1500px] mx-auto w-full grid lg:grid-cols-12 gap-20 items-center relative z-10">
          <motion.div 
            initial={{ opacity: 0, x: -40 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 1 }}
            className="lg:col-span-6"
          >
            <div className="inline-flex items-center gap-4 mb-10">
              <div className="w-10 h-[1px] bg-cyan-500" />
              <span className="text-premium text-cyan-400">WP_NODE // DPIRC_LIVE</span>
            </div>
            
            <h1 className="text-[4rem] md:text-[6.5rem] font-orbitron font-black text-white leading-[0.8] mb-12 tracking-tighter">
              NEURAL<br/>
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 via-blue-500 to-purple-600">COLLECTIVE_</span>
            </h1>
            
            <p className="text-[14px] text-gray-500 max-w-lg mb-14 font-medium leading-relaxed uppercase tracking-[0.3em]">
              Architecting the nexus between synthetic intelligence and WordPress-integrated mechanical engineering.
            </p>

            <div className="flex flex-wrap gap-10 items-center">
              <PremiumButton to="/projects" primary>SYNC_NODES</PremiumButton>
              <Link to="/about" className="text-premium text-gray-500 hover:text-white transition-all border-b border-white/10 pb-2">
                ORIGIN_DATA
              </Link>
            </div>

            <div className="mt-28 grid grid-cols-3 gap-12 border-t border-white/5 pt-12">
              <TelemetryItem label="SAT_LINK" value="ACTIVE" delay={0.2} />
              <TelemetryItem label="NODES" value="ONLINE" delay={0.3} />
              <TelemetryItem label="STATUS" value="STABLE" delay={0.4} />
            </div>
          </motion.div>

          <div className="lg:col-span-6 relative flex justify-center items-center perspective-[2500px]">
            <motion.div 
              style={{ rotateX, rotateY, transformStyle: "preserve-3d" }}
              className="relative w-full max-w-[550px] aspect-square"
            >
              <div className="absolute inset-0 bg-cyan-500/5 blur-[150px] rounded-full animate-pulse" />
              <div 
                className="relative z-10 w-full h-full rounded-[60px] overflow-hidden border border-white/10 bg-black shadow-[0_40px_100px_rgba(0,0,0,0.9)] group"
                style={{ transform: "translateZ(40px)" }}
              >
                <img 
                  src="https://images.unsplash.com/photo-1546776310-eef45dd6d63c?auto=format&fit=crop&q=80&w=800" 
                  alt="DPIRC Robot"
                  className="w-full h-full object-cover grayscale brightness-110 group-hover:grayscale-0 group-hover:scale-105 transition-all duration-1000 ease-out"
                />
                <div className="absolute bottom-12 left-12 right-12">
                  <div className="flex justify-between items-end">
                    <div className="space-y-2">
                      <div className="text-premium text-cyan-400">OS_CORE_V3</div>
                      <div className="text-lg font-orbitron font-black text-white leading-none">THE GUARDIAN</div>
                    </div>
                    <Bot className="text-cyan-400 animate-pulse" size={28} />
                  </div>
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      <section className="py-40 px-6">
        <div className="max-w-4xl mx-auto glass p-16 rounded-sm relative overflow-hidden group border border-cyan-500/10">
          <div className="relative z-10">
            <h2 className="text-3xl font-orbitron font-black text-white mb-12 tracking-widest uppercase text-center">CORE_UPLINK</h2>
            <div className="space-y-10">
              <AnimatePresence mode="wait">
                {chatResponse && (
                  <motion.div 
                    initial={{ opacity: 0, x: -10 }} animate={{ opacity: 1, x: 0 }}
                    className="p-10 bg-white/5 border-l-2 border-cyan-500 font-mono text-[11px] text-gray-400 leading-loose"
                  >
                    <div className="text-premium text-cyan-400 mb-5 font-bold">DPIRC_CORE:</div>
                    {chatResponse}
                  </motion.div>
                )}
              </AnimatePresence>
              <form onSubmit={handleChat} className="flex flex-col sm:flex-row gap-5">
                <input 
                  type="text" value={chatMsg} onChange={(e) => setChatMsg(e.target.value)}
                  placeholder="TRANSMIT_INSTRUCTION..." 
                  className="flex-grow bg-white/5 border border-white/10 px-8 py-5 text-[10px] font-bold text-white uppercase tracking-[0.4em] focus:outline-none focus:border-cyan-500 rounded-sm"
                />
                <button 
                  disabled={loading}
                  className="bg-white text-black px-12 py-5 font-black text-[10px] tracking-[0.5em] uppercase hover:bg-cyan-500 transition-all"
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
};

// --- APP WRAPPER ---

const App = () => {
  const location = useLocation();

  return (
    <div className="min-h-screen flex flex-col bg-black">
      <nav className="fixed top-0 left-0 right-0 z-50 bg-black/60 backdrop-blur-xl border-b border-white/5 px-8 py-5">
        <div className="max-w-[1600px] mx-auto flex justify-between items-center">
          <Link to="/" className="flex items-center gap-3">
            <div className="w-8 h-8 bg-cyan-500 rounded-sm flex items-center justify-center"><Zap className="text-black" size={16} /></div>
            <span className="font-orbitron text-xl font-black tracking-[0.3em] text-white">DPIRC</span>
          </Link>
          <div className="hidden md:flex items-center gap-12">
            <Link to="/projects" className="text-premium hover:text-cyan-400">ARCHIVE</Link>
            <Link to="/about" className="text-premium hover:text-cyan-400">ORIGIN</Link>
            <Link to="/dashboard" className="bg-white text-black px-6 py-3 rounded-sm text-[9px] font-black tracking-[0.4em]">INIT_LINK</Link>
          </div>
        </div>
      </nav>

      <main className="flex-grow">
        <AnimatePresence mode="wait">
          <Routes location={location} key={location.pathname}>
            <Route path="/" element={<Home />} />
            <Route path="*" element={<Home />} />
          </Routes>
        </AnimatePresence>
      </main>

      <footer className="bg-black border-t border-white/5 py-12 px-8">
        <div className="max-w-[1600px] mx-auto flex justify-between items-center text-[9px] font-bold text-gray-700 tracking-[0.5em] uppercase">
          <span>© 2024 DPIRC COLLECTIVE // WP_ENGINE</span>
          <span className="flex items-center gap-2"><div className="w-1.5 h-1.5 bg-green-500 rounded-full" /> NODE_STABLE</span>
        </div>
      </footer>
    </div>
  );
};

// --- RENDER ---

const root = ReactDOM.createRoot(document.getElementById('root')!);
root.render(<Router><App /></Router>);
