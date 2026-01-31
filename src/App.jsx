import React, { useState, useEffect } from 'react';
import { Ghost, Zap, Search, Activity, ShieldCheck, Terminal as TerminalIcon, Cpu, Globe, Lock, ArrowRight, Server } from 'lucide-react';
import { AnimatePresence, motion } from 'framer-motion';

// Components
import Background3D from './components/Background3D';
import Terminal from './components/Terminal';
import Report from './components/Report';
import GhostRadar from './components/GhostRadar';
import BaitGenerator from './components/BaitGenerator';
import IntroScreen from './components/IntroScreen';

// --- SUB-COMPONENT: Capability Card ---
const FeatureCard = ({ icon: Icon, title, desc, delay }) => (
    <motion.div 
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay }}
        className="bg-zinc-900/40 backdrop-blur-md border border-white/5 p-5 rounded-2xl flex flex-col gap-3 hover:bg-zinc-800/40 hover:border-emerald-500/30 transition-all group"
    >
        <div className="bg-emerald-500/10 w-10 h-10 rounded-lg flex items-center justify-center border border-emerald-500/20 group-hover:scale-110 transition-transform">
            <Icon className="w-5 h-5 text-emerald-400" />
        </div>
        <div>
            <h3 className="text-zinc-100 font-bold text-sm tracking-wide mb-1">{title}</h3>
            <p className="text-zinc-500 text-xs leading-relaxed">{desc}</p>
        </div>
    </motion.div>
);

function App() {
  const [hasEntered, setHasEntered] = useState(false);
  const [url, setUrl] = useState('');
  const [isScanning, setIsScanning] = useState(false);
  const [logs, setLogs] = useState(['[SYSTEM] Cyber-Sentinel V3.0 initialized...', '[SYSTEM] Awaiting target URL...']);
  const [scanResult, setScanResult] = useState(null);

  // --- LOGIC ---
  const generatePoison = () => {
    const prefixes = ['admin', 'secure', 'root', 'vault'];
    const suffixes = ['_trap', '_bait', '99', '!'];
    const domains = ['@gmail.com', '@outlook.com'];
    const randomPrefix = prefixes[Math.floor(Math.random() * prefixes.length)];
    const randomSuffix = suffixes[Math.floor(Math.random() * suffixes.length)];
    const randomDomain = domains[Math.floor(Math.random() * domains.length)];
    const poisonedEmail = `${randomPrefix}${randomSuffix}${Math.random().toString(36).substring(7)}${randomDomain}`;
    const poisonedPass = Math.random().toString(36).slice(-10) + "!" + (Math.floor(Math.random() * 900) + 100);
    setLogs(prev => [...prev, `[BAIT] Generated toxic payload for ${url || 'target'}`]);
    return { email: poisonedEmail, password: poisonedPass };
  };

  const startScan = async () => {
    if (!url) return;
    setIsScanning(true);
    setScanResult(null);
    setLogs(prev => [...prev, `[TARGET] Analyzing: ${url}`, '[NETWORK] Handshaking with HQ...']);
    try {
      const response = await fetch('http://127.0.0.1:8000/investigate', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ url: url }),
      });
      if (!response.ok) throw new Error(`API Error: ${response.status}`);
      const data = await response.json();
      setLogs(prev => [...prev, '[200] Data packet received.', '[COMPLETE] Analysis finished.']);
      setScanResult({
        verdict: data.verdict,
        riskScore: data.risk_score, 
        threats: data.threats,
        screenshot: data.screenshot
      });
    } catch (error) {
      console.error(error);
      setLogs(prev => [...prev, `[ERR] Connection Failed: ${error.message}`]);
    } finally {
      setIsScanning(false);
    }
  };

  return (
    <div className={`min-h-screen w-full relative overflow-x-hidden bg-zinc-950 text-zinc-100 font-sans selection:bg-emerald-500/30`}>
      
      {/* 3D Background */}
      <div className="opacity-40 fixed inset-0 pointer-events-none">
         <Background3D />
      </div>

      {/* Gradients */}
      <div className="fixed inset-0 z-10 pointer-events-none bg-[radial-gradient(circle_at_top,rgba(16,185,129,0.12)_0%,rgba(9,9,11,1)_90%)]" />

      {/* Intro Screen */}
      <AnimatePresence>
        {!hasEntered && <IntroScreen onEnter={() => setHasEntered(true)} />}
      </AnimatePresence>

      {/* MAIN CONTENT */}
      {hasEntered && (
        <div className="relative z-20 max-w-7xl mx-auto p-6 md:p-12 animate-fade-in">
            
            {/* === NAVBAR === */}
            <nav className="flex justify-between items-center mb-20">
                <div className="flex items-center gap-3">
                    <div className="bg-emerald-500/10 p-2 rounded-xl border border-emerald-500/20 backdrop-blur-md shadow-[0_0_15px_rgba(16,185,129,0.2)]">
                        <Ghost className="w-6 h-6 text-emerald-400" />
                    </div>
                    <span className="text-xl font-bold tracking-tight text-white">
                        CYBER<span className="text-zinc-600 mx-1">/</span>GHOST<span className="text-zinc-600 mx-1">/</span>BUSTER
                    </span>
                </div>
                <div className="hidden md:flex items-center gap-6 text-xs font-medium text-zinc-400">
                    <div className="flex items-center gap-2">
                        <Globe className="w-3 h-3" /> Global Threats: <span className="text-white">14,203</span>
                    </div>
                    <div className="flex items-center gap-2">
                        <Cpu className="w-3 h-3" /> AI Engine: <span className="text-emerald-400">ONLINE</span>
                    </div>
                </div>
            </nav>

            {/* === HERO SECTION === */}
            <div className="flex flex-col items-center justify-center text-center mb-16 max-w-3xl mx-auto">
                <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-emerald-500/10 border border-emerald-500/20 text-emerald-400 text-xs font-bold mb-6 tracking-wide uppercase">
                    <Zap className="w-3 h-3" /> V3.0 Now Live
                </div>
                
                <h1 className="text-5xl md:text-6xl font-extrabold tracking-tight mb-6 text-white drop-shadow-2xl">
                    Defend against the <span className="text-transparent bg-clip-text bg-gradient-to-r from-emerald-400 to-teal-500">invisible.</span>
                </h1>
                
                <p className="text-zinc-400 mb-10 text-lg md:text-xl max-w-2xl leading-relaxed">
                    The first automated phishing investigation platform that doesn't just scan threats—it <span className="text-zinc-200 font-semibold">neutralizes</span> them using offensive AI counter-measures.
                </p>

                {/* --- SPOTLIGHT INPUT --- */}
                <div className="w-full max-w-2xl relative group z-30">
                    <div className="absolute -inset-0.5 bg-gradient-to-r from-emerald-500 to-cyan-500 rounded-2xl blur opacity-30 group-hover:opacity-60 transition duration-500"></div>
                    <div className="relative flex items-center bg-zinc-900 border border-zinc-700 hover:border-zinc-500 rounded-2xl p-2 shadow-2xl transition-all">
                        <div className="pl-4 pr-3 text-emerald-500">
                            <Search className="w-6 h-6" />
                        </div>
                        <input 
                            type="text" 
                            placeholder="Enter suspicious URL to investigate..."
                            className="flex-1 bg-transparent text-white placeholder-zinc-500 outline-none h-14 text-lg font-medium font-sans"
                            value={url}
                            onChange={(e) => setUrl(e.target.value)}
                            onKeyDown={(e) => e.key === 'Enter' && startScan()}
                        />
                        <button 
                            onClick={startScan} 
                            disabled={isScanning} 
                            className="bg-zinc-100 hover:bg-white text-black px-8 py-3 rounded-xl font-bold text-sm transition-all active:scale-95 disabled:opacity-50 flex items-center gap-2"
                        >
                            {isScanning ? <Zap className="w-4 h-4 animate-spin" /> : 'Run Scan'}
                            {!isScanning && <ArrowRight className="w-4 h-4" />}
                        </button>
                    </div>
                </div>

                {/* --- BRIEF INTRODUCTION / CAPABILITIES --- */}
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4 w-full max-w-4xl mt-12">
                    <FeatureCard 
                        icon={ShieldCheck} 
                        title="AI-Powered Detection" 
                        desc="Uses machine learning to analyze heuristics, domains, and HTML structure in real-time."
                        delay={0.2}
                    />
                    <FeatureCard 
                        icon={Server} 
                        title="Forensic Analysis" 
                        desc="Traces server origin, captures screenshots, and checks global blacklists instantly."
                        delay={0.4}
                    />
                    <FeatureCard 
                        icon={Lock} 
                        title="Active Defense" 
                        desc="Automated bait generator floods attacker databases with dummy credentials."
                        delay={0.6}
                    />
                </div>
            </div>

            {/* === DASHBOARD GRID (Visible only when scanning or idle) === */}
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 border-t border-white/5 pt-12">

                {/* LEFT: TERMINAL (7 Cols) */}
                <div className="lg:col-span-7 flex flex-col gap-6">
                    <div className="flex items-center justify-between px-2">
                        <h3 className="text-sm font-bold text-zinc-400 flex items-center gap-2">
                            <TerminalIcon className="w-4 h-4" /> LIVE EXECUTION LOGS
                        </h3>
                        <div className="flex gap-2">
                            <div className="w-2 h-2 rounded-full bg-zinc-800" />
                            <div className="w-2 h-2 rounded-full bg-zinc-800" />
                        </div>
                    </div>
                    <div className="bg-zinc-900/50 backdrop-blur-md border border-white/5 rounded-3xl p-1 h-[400px] shadow-inner">
                         <div className="h-full w-full bg-black/40 rounded-[20px] overflow-hidden p-4">
                            <Terminal logs={logs} isScanning={isScanning} />
                         </div>
                    </div>
                </div>

                {/* RIGHT: WIDGETS (5 Cols) */}
                <div className="lg:col-span-5 flex flex-col gap-6">
                    
                    {/* RADAR */}
                    <div className="bg-zinc-900/50 backdrop-blur-md border border-white/5 rounded-3xl p-6 relative overflow-hidden h-[250px] flex items-center justify-center">
                        <div className="absolute top-6 left-6 z-10">
                            <span className="text-xs font-bold text-emerald-500 tracking-wider uppercase flex items-center gap-2">
                                <Activity className="w-3 h-3" /> Active Scan
                            </span>
                        </div>
                        <GhostRadar isScanning={isScanning} />
                    </div>

                    {/* RESULTS AREA */}
                    <div className="flex-1 min-h-[100px]">
                        <Report scanResult={scanResult} isScanning={isScanning} />
                    </div>

                    {/* BAIT (Conditional) */}
                    {scanResult?.verdict === 'MALICIOUS' && (
                        <motion.div 
                            initial={{ opacity: 0, y: 10 }}
                            animate={{ opacity: 1, y: 0 }}
                            className="bg-red-500/5 border border-red-500/20 rounded-3xl p-2"
                        >
                            <BaitGenerator onGenerate={generatePoison} />
                        </motion.div>
                    )}
                </div>

            </div>

        </div>
      )}
    </div>
  );
}

export default App;