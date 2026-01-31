import React, { useState } from 'react';
import { Ghost, Zap, Search, Activity, ShieldCheck } from 'lucide-react'; // Added ShieldCheck
import { AnimatePresence } from 'framer-motion';

// Components
import Background3D from './components/Background3D';
import Terminal from './components/Terminal';
import Report from './components/Report';
import GhostRadar from './components/GhostRadar';
import BaitGenerator from './components/BaitGenerator';
import IntroScreen from './components/IntroScreen';

function App() {
  // 1. STATE: Track if the user has passed the intro screen
  const [hasEntered, setHasEntered] = useState(false);

  // App Logic
  const [url, setUrl] = useState('');
  const [isScanning, setIsScanning] = useState(false);
  const [logs, setLogs] = useState(['[SYSTEM] Ghost-Buster V1.0 initialized...', '[SYSTEM] Awaiting target URL...']);
  const [scanResult, setScanResult] = useState(null);

  const generatePoison = () => {
    const prefixes = ['admin', 'secure', 'root', 'vault', 'crypto', 'shadow'];
    const suffixes = ['_trap', '_bait', '99', '!', 'X', 'gate'];
    const domains = ['@gmail.com', '@outlook.com', '@yahoo.com', '@proton.me'];
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
    setLogs(prev => [...prev, `[INFILTRATE] Target: ${url}`, '[PROCESS] Contacting Backend HQ...']);
    try {
      const response = await fetch('http://127.0.0.1:8000/investigate', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ url: url }),
      });
      if (!response.ok) throw new Error(`Server Ghosted Us! Status: ${response.status}`);
      const data = await response.json();
      setLogs(prev => [...prev, '[ANALYSIS] Data received.', '[SUCCESS] Mission Complete.']);
      setScanResult({
        verdict: data.verdict,
        riskScore: data.risk_score, 
        threats: data.threats,
        screenshot: data.screenshot
      });
    } catch (error) {
      console.error(error);
      setLogs(prev => [...prev, `[ERROR] Connection Failed: ${error.message}`]);
    } finally {
      setIsScanning(false);
    }
  };

  return (
    <div className={`min-h-screen w-full relative overflow-x-hidden bg-black text-green-500 font-mono selection:bg-green-500 selection:text-black`}>
      
      {/* 3D Background */}
      <Background3D />

      {/* OVERLAYS */}
      <div className="fixed inset-0 z-10 pointer-events-none bg-[radial-gradient(circle_at_center,transparent_10%,#000000_100%)] opacity-80" />
      <div className="fixed inset-0 z-10 pointer-events-none bg-[linear-gradient(rgba(18,16,16,0)_50%,rgba(0,0,0,0.1)_50%)] bg-[length:100%_4px]" />

      {/* INTRO SCREEN LOGIC */}
      <AnimatePresence>
        {!hasEntered && (
            <IntroScreen onEnter={() => setHasEntered(true)} />
        )}
      </AnimatePresence>

      {/* MAIN DASHBOARD */}
      {hasEntered && (
        <div className={`relative z-20 p-4 md:p-10 animate-fade-in ${scanResult?.verdict === 'MALICIOUS' ? 'animate-shake' : ''}`}>
            
            {isScanning && (
                <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 pointer-events-none z-50 opacity-20">
                <Ghost size={300} className="animate-ping text-purple-500" />
                </div>
            )}

            {/* HEADER */}
            <header className="flex flex-col md:flex-row justify-between items-center mb-10 border-b border-green-900/50 pb-5 backdrop-blur-sm bg-black/20">
                <h1 className="text-3xl md:text-4xl font-black flex items-center gap-4 italic tracking-tighter text-white">
                  {/* Replaced Ghost with ShieldCheck for professional look */}
                  <ShieldCheck className="w-10 h-10 text-green-500 animate-pulse" />
                  
                  {/* NEW NAME */}
                  CYBER-<span className="text-transparent bg-clip-text bg-gradient-to-r from-green-400 to-emerald-600 not-italic">GHOST-BUSTER</span>
                </h1>
                
                <div className="flex gap-6 mt-4 md:mt-0 text-xs text-green-400">
                  <div className="flex items-center gap-2 font-bold border border-green-900 px-3 py-1 rounded-full bg-black/50">
                      <Activity className="w-4 h-4 animate-pulse text-green-500" /> SYSTEM: ONLINE
                  </div>
                </div>
            </header>

            {/* DASHBOARD GRID */}
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                <div className="lg:col-span-2 space-y-6">
                <div className="bg-black/30 backdrop-blur-md border border-green-500/30 p-6 shadow-[0_0_30px_rgba(34,197,94,0.1)] rounded-lg">
                    <div className="flex flex-col md:flex-row gap-6 items-center">
                        <div className="flex-1 w-full">
                            <label className="block text-sm mb-2 font-bold uppercase tracking-widest text-green-600">Target_Infiltration_Link:</label>
                            <div className="flex gap-3">
                            <input 
                                type="text" 
                                placeholder="https://suspect-site.com"
                                className="flex-1 bg-black/50 border border-green-800 p-3 outline-none focus:border-green-400 text-white placeholder-green-900 font-mono"
                                value={url}
                                onChange={(e) => setUrl(e.target.value)}
                            />
                            <button 
                                onClick={startScan} disabled={isScanning} 
                                className="bg-green-600 hover:bg-green-400 text-black px-8 py-3 font-black flex items-center gap-2 transition-all active:scale-95 disabled:opacity-50 shadow-[0_0_20px_rgba(34,197,94,0.6)]"
                            >
                                {isScanning ? <Zap className="animate-spin" /> : <Search />} SCAN
                            </button>
                            </div>
                        </div>
                        <GhostRadar isScanning={isScanning} />
                    </div>
                </div>
                
                <Terminal logs={logs} isScanning={isScanning} />
                
                {scanResult?.verdict === 'MALICIOUS' && (
                    <BaitGenerator onGenerate={generatePoison} />
                )}
                </div>

                <div className="space-y-6 h-full">
                    <Report scanResult={scanResult} isScanning={isScanning} />
                </div>
            </div>
        </div>
      )}
    </div>
  );
}

export default App;