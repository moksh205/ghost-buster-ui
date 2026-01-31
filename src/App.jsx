import React, { useState, useEffect, useRef } from 'react';
import { Ghost, Zap, Search, Activity, ShieldCheck, Terminal as TerminalIcon, Cpu, Globe, Lock, Server, ArrowRight, FileWarning } from 'lucide-react';
import { AnimatePresence, motion } from 'framer-motion';

// Components
import Background3D from './components/Background3D';
import Terminal from './components/Terminal';
import Report from './components/Report';
import GhostRadar from './components/GhostRadar';
import BaitGenerator from './components/BaitGenerator';
import IntroScreen from './components/IntroScreen';

// --- 1. INJECT CUSTOM ANIMATION STYLES ---
const styles = `
  @keyframes border-flow {
    0% { background-position: 0% 50%; }
    50% { background-position: 100% 50%; }
    100% { background-position: 0% 50%; }
  }
  .animate-snake-border {
    background-size: 300% 300%;
    animation: border-flow 3s linear infinite;
  }
  .neon-glow {
    filter: drop-shadow(0 0 5px rgba(16, 185, 129, 0.8));
  }
  html {
    scroll-behavior: smooth;
  }
`;

// --- 2. SPOTLIGHT CARD (Updated for High-Intensity Constant Glow) ---
const SpotlightCard = ({ children, className = "", noPadding = false, isScanning = false, scanColor = "emerald" }) => {
  const divRef = useRef(null);
  const [position, setPosition] = useState({ x: 0, y: 0 });
  const [opacity, setOpacity] = useState(0);

  const handleMouseMove = (e) => {
    if (!divRef.current) return;
    const rect = divRef.current.getBoundingClientRect();
    setPosition({ x: e.clientX - rect.left, y: e.clientY - rect.top });
  };

  // Intense Scanning State Logic
  const glowStyles = isScanning 
    ? scanColor === "emerald" 
      ? "border-emerald-500/60 shadow-[0_0_40px_rgba(16,185,129,0.3)] bg-[#0c120e]" 
      : "border-purple-500/60 shadow-[0_0_40px_rgba(168,85,247,0.3)] bg-[#0f0a1f]"
    : "border-zinc-800 bg-[#09090b]";

  return (
    <div className={`relative group rounded-3xl ${className}`}>
        {/* Snake Border Layer - Forced visible during scanning */}
        <div className={`absolute -inset-[1px] rounded-3xl transition-opacity duration-500 bg-gradient-to-r from-transparent ${scanColor === "emerald" ? "via-emerald-500" : "via-purple-500"} to-transparent animate-snake-border blur-sm ${isScanning ? 'opacity-100' : 'opacity-0 group-hover:opacity-100'}`} />
        
        <div
            ref={divRef}
            onMouseMove={handleMouseMove}
            onMouseEnter={() => setOpacity(1)}
            onMouseLeave={() => setOpacity(0)}
            className={`relative h-full overflow-hidden rounded-3xl border transition-all duration-500 shadow-2xl ${glowStyles} ${noPadding ? 'p-0' : 'p-6 md:p-8'}`}
        >
            {/* Spotlight Gradient - Forced partially visible during scan to enhance glowness */}
            <div
                className="pointer-events-none absolute -inset-px transition duration-300 z-0"
                style={{
                opacity: isScanning ? 0.3 : opacity,
                background: `radial-gradient(600px circle at ${isScanning ? '50%' : position.x + 'px'} ${isScanning ? '50%' : position.y + 'px'}, ${scanColor === "emerald" ? "rgba(16, 185, 129, 0.15)" : "rgba(168, 85, 247, 0.15)"}, transparent 40%)`,
                }}
            />
            <div className="relative z-10 h-full">{children}</div>
        </div>
    </div>
  );
};

// --- 3. ANIMATED TEXT COMPONENT ---
const GradientText = ({ children, className = "" }) => (
  <span className={`bg-gradient-to-r from-emerald-400 via-teal-200 to-emerald-500 bg-[length:200%_auto] bg-clip-text text-transparent animate-gradient ${className}`}>
    {children}
  </span>
);

function App() {
  const [hasEntered, setHasEntered] = useState(false);
  const [url, setUrl] = useState('');
  const [isScanning, setIsScanning] = useState(false);
  const [logs, setLogs] = useState(['[SYSTEM] Cyber-Sentinel V3.0 initialized...', '[SYSTEM] Awaiting target URL...']);
  const [scanResult, setScanResult] = useState(null);
  const [globalThreats, setGlobalThreats] = useState(15210); 

  const dashboardRef = useRef(null);

  useEffect(() => {
    const interval = setInterval(() => {
      setGlobalThreats(prev => prev + Math.floor(Math.random() * 15) + 1);
    }, 2000);
    return () => clearInterval(interval);
  }, []);

  const generatePoison = () => {
    const prefixes = ['admin', 'secure', 'root', 'vault'];
    const suffixes = ['_trap', '_bait', '99', '!'];
    const domains = ['@gmail.com', '@outlook.com'];
    const randomPrefix = prefixes[Math.floor(Math.random() * prefixes.length)];
    const randomSuffix = suffixes[Math.floor(Math.random() * suffixes.length)];
    const randomDomain = domains[Math.floor(Math.random() * domains.length)];
    const poisonedEmail = `${randomPrefix}${randomSuffix}${Math.random().toString(36).substring(7)}${randomDomain}`;
    const poisonedPass = Math.random().toString(36).slice(-10) + "!" + (Math.floor(Math.random() * 900) + 100);
    setLogs(prev => [...prev, `[BAIT] Generated toxic payload for target`]);
    return { email: poisonedEmail, password: poisonedPass };
  };

  const startScan = async () => {
    if (!url) return;
    setIsScanning(true);
    setScanResult(null);
    setLogs(prev => [...prev, `[TARGET] Analyzing: ${url}`, '[NETWORK] Handshaking with HQ...']);

    setTimeout(() => {
        if (dashboardRef.current) {
            dashboardRef.current.scrollIntoView({ behavior: 'smooth', block: 'start' });
        }
    }, 100);
    
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
    <>
      <style>{styles}</style>
      
      <div className={`min-h-screen w-full relative overflow-x-hidden bg-black text-zinc-100 font-sans selection:bg-emerald-500/30`}>
        <div className="opacity-40 fixed inset-0 pointer-events-none"><Background3D /></div>
        <div className="fixed inset-0 z-10 pointer-events-none bg-[radial-gradient(circle_at_top,rgba(16,185,129,0.08)_0%,rgba(0,0,0,0)_80%)]" />

        <AnimatePresence>{!hasEntered && <IntroScreen onEnter={() => setHasEntered(true)} />}</AnimatePresence>

        {hasEntered && (
          <div className="relative z-20 max-w-7xl mx-auto px-4 py-6 md:px-8 md:py-8 animate-fade-in">
              <nav className="flex flex-col md:flex-row justify-between items-center mb-16 md:mb-24 pt-4 gap-6 md:gap-0 text-center md:text-left">
                  <div className="flex items-center gap-4">
                      <div className="bg-emerald-500/10 p-2 rounded-xl border border-emerald-500/20 shadow-[0_0_20px_rgba(16,185,129,0.2)]">
                          <Ghost className="w-6 h-6 text-emerald-400" />
                      </div>
                      <span className="text-xl md:text-2xl font-black tracking-tighter text-white uppercase">
                          CYBER<span className="text-zinc-600 mx-2">/</span>GHOST<span className="text-zinc-600 mx-2">/</span>BUSTER
                      </span>
                  </div>
                  <div className="flex flex-wrap justify-center items-center gap-4 md:gap-8 text-xs font-medium tracking-wide text-zinc-400">
                      <div className="flex items-center gap-2">
                          <Globe className="w-3 h-3 text-zinc-500" /> 
                          Global Threats: <span className="text-white font-bold tabular-nums">{globalThreats.toLocaleString()}</span>
                      </div>
                      <div className="flex items-center gap-2">
                          <Cpu className="w-3 h-3 text-zinc-500" /> 
                          AI Engine: <span className="text-emerald-400 font-bold drop-shadow-[0_0_8px_rgba(52,211,153,0.5)]">ONLINE</span>
                      </div>
                  </div>
              </nav>

              <div className="flex flex-col items-center justify-center text-center mb-28 max-w-4xl mx-auto relative px-2">
                  <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[300px] md:w-[600px] h-[300px] md:h-[400px] bg-emerald-500/20 blur-[120px] rounded-full pointer-events-none -z-10"></div>
                  
                
                  <h1 className="text-3xl md:text-6xl font-extrabold tracking-tight mb-8 text-white leading-tight">
                      Defend against the <br className="hidden md:block"/> <GradientText>invisible.</GradientText>
                  </h1>
                  
                  <p className="text-zinc-400 mb-12 text-sm md:text-lg max-w-2xl leading-relaxed">
                      The first automated phishing investigation platform that doesn't just scan threats—it <span className="text-zinc-200 font-semibold">neutralizes</span> them using offensive AI counter-measures.
                  </p>

                  <div className="w-full max-w-2xl relative group z-30">
                      <div className="absolute -inset-1 bg-emerald-500/30 rounded-2xl blur-xl opacity-70 group-hover:opacity-100 transition duration-500"></div>
                      <div className="relative flex flex-col md:flex-row items-center bg-[#09090b] border border-zinc-800 hover:border-zinc-700 rounded-2xl p-2 shadow-2xl transition-all gap-2 md:gap-0">
                          <div className="pl-4 pr-3 text-zinc-500 hidden md:block"><Search className="w-6 h-6" /></div>
                          <input type="text" placeholder="Enter suspicious URL to investigate..." className="w-full md:flex-1 bg-transparent text-white placeholder-zinc-600 outline-none h-12 md:h-14 text-base md:text-lg font-medium font-sans min-w-0 px-4 md:px-0 text-center md:text-left" value={url} onChange={(e) => setUrl(e.target.value)} onKeyDown={(e) => e.key === 'Enter' && startScan()} />
                          
                          <button onClick={startScan} disabled={isScanning} className="w-full md:w-auto bg-emerald-500 hover:bg-emerald-400 text-black px-8 py-4 rounded-xl font-bold text-sm transition-all active:scale-95 disabled:opacity-50 flex items-center justify-center gap-2 whitespace-nowrap shadow-[0_0_20px_rgba(16,185,129,0.4)]">
                              {isScanning ? <Zap className="w-4 h-4 animate-spin" /> : 'Run Scan'}
                              {!isScanning && <ArrowRight className="w-4 h-4" />}
                          </button>
                      </div>
                  </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-32">
                  <SpotlightCard>
                      <div className="bg-zinc-900/50 w-14 h-14 rounded-2xl flex items-center justify-center mb-6 border border-zinc-800"><ShieldCheck className="w-7 h-7 text-emerald-500 neon-glow" /></div>
                      <h3 className="text-lg font-bold text-white mb-3">AI-Powered Detection</h3>
                      <p className="text-zinc-500 leading-relaxed text-sm">Uses machine learning to analyze heuristics, domains, and HTML structure in real-time.</p>
                  </SpotlightCard>
                  <SpotlightCard>
                      <div className="bg-zinc-900/50 w-14 h-14 rounded-2xl flex items-center justify-center mb-6 border border-zinc-800"><Server className="w-7 h-7 text-blue-500 neon-glow" /></div>
                      <h3 className="text-lg font-bold text-white mb-3">Forensic Analysis</h3>
                      <p className="text-zinc-500 leading-relaxed text-sm">Traces server origin, captures screenshots, and checks global blacklists instantly.</p>
                  </SpotlightCard>
                  <SpotlightCard>
                      <div className="bg-zinc-900/50 w-14 h-14 rounded-2xl flex items-center justify-center mb-6 border border-zinc-800"><Lock className="w-7 h-7 text-orange-500 neon-glow" /></div>
                      <h3 className="text-lg font-bold text-white mb-3">Active Defense</h3>
                      <p className="text-zinc-500 leading-relaxed text-sm">Automated bait generator floods attacker databases with dummy credentials.</p>
                  </SpotlightCard>
              </div>

              <div ref={dashboardRef} className="grid grid-cols-1 lg:grid-cols-12 gap-6 pt-12 border-t border-zinc-900 scroll-mt-6">
                  
                  {/* LEFT: TERMINAL + BAITGENERATOR */}
                  <div className="lg:col-span-7 flex flex-col gap-6">
                      <div className="flex flex-col gap-3">
                        <div className="flex items-center gap-2 px-1">
                            <TerminalIcon className="w-4 h-4 text-zinc-500" />
                            <h3 className="text-xs font-bold text-zinc-500 uppercase tracking-widest">LIVE EXECUTION LOGS</h3>
                        </div>
                        <SpotlightCard isScanning={isScanning} scanColor="emerald" className="h-[400px] md:h-[520px]" noPadding={true}>
                            <div className="h-full w-full p-4 md:p-6 overflow-hidden relative flex flex-col">
                                <div className={`absolute left-0 top-0 bottom-0 w-1 transition-colors duration-500 ${isScanning ? "bg-emerald-500" : "bg-emerald-500/20"}`}></div>
                                <Terminal logs={logs} isScanning={isScanning} />
                            </div>
                        </SpotlightCard>
                      </div>

                      <AnimatePresence>
                        {scanResult?.verdict === 'MALICIOUS' && (
                          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="w-full">
                            <BaitGenerator onGenerate={generatePoison} />
                          </motion.div>
                        )}
                      </AnimatePresence>
                  </div>

                  {/* RIGHT: WIDGETS */}
                  <div className="lg:col-span-5 flex flex-col gap-6">
                      <div className="flex flex-col gap-3">
                        <div className="flex items-center gap-2 px-1">
                            <Activity className="w-4 h-4 text-emerald-500" />
                            <h3 className="text-xs font-bold text-emerald-600 uppercase tracking-widest">ACTIVE SCAN</h3>
                        </div>
                        <SpotlightCard isScanning={isScanning} scanColor="emerald" className="h-[280px]" noPadding={true}>
                             <div className="h-full w-full flex items-center justify-center relative bg-black/20">
                                <GhostRadar isScanning={isScanning} />
                             </div>
                        </SpotlightCard>
                      </div>

                      <div className="flex-1 min-h-[200px] flex flex-col gap-3">
                           <div className="flex items-center gap-2 px-1">
                              <FileWarning className="w-4 h-4 text-purple-500" />
                              <h3 className="text-xs font-bold text-purple-500 uppercase tracking-widest">THREAT INTELLIGENCE</h3>
                           </div>
                           
                           <SpotlightCard isScanning={isScanning} scanColor="purple" noPadding={true} className="flex-1">
                              <div className="p-6 h-full flex flex-col relative">
                                  <div className={`absolute top-0 left-0 w-full h-1 bg-purple-500 transition-opacity duration-500 ${isScanning ? "opacity-100" : "opacity-50"}`}></div>
                                  <div className="flex items-center gap-3 mb-4 pb-4 border-b border-purple-500/20">
                                      <ShieldCheck className="w-5 h-5 text-purple-400" />
                                      <span className="text-sm font-bold text-white tracking-wider uppercase">THREAT_REPORT</span>
                                  </div>

                                  <div className="flex-1 flex flex-col items-center justify-center text-purple-300/30 gap-3 min-h-[120px]">
                                      {scanResult ? (
                                          <Report scanResult={scanResult} isScanning={isScanning} />
                                      ) : (
                                          <>
                                            <div className={`w-16 h-16 rounded-xl border-2 border-dashed flex items-center justify-center transition-colors duration-500 ${isScanning ? "border-purple-500 animate-pulse shadow-[0_0_15px_rgba(168,85,247,0.4)]" : "border-purple-500/30"}`}>
                                                <div className="w-2 h-2 bg-purple-500/30 rounded-full"></div>
                                            </div>
                                            <span className="text-[10px] font-mono tracking-widest uppercase">
                                              {isScanning ? "PROCESSING_SATELLITE_DATA" : "NO_DATA_CAPTURED"}
                                            </span>
                                          </>
                                      )}
                                  </div>
                              </div>
                           </SpotlightCard>
                      </div>
                  </div>
              </div>
              
              <div className="mt-20 py-8 text-center border-t border-zinc-900/50">
                  <p className="text-zinc-700 text-xs">
                      © 2026 CYBER-GHOST-BUSTER. All rights reserved. <span className="text-zinc-600">System V3.4.0</span>
                  </p>
              </div>
          </div>
        )}
      </div>
    </>
  );
}

export default App;