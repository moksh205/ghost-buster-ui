import React, { useState } from 'react';
import { Ghost, Zap, Search, Activity } from 'lucide-react';
import Terminal from './components/Terminal';
import Report from './components/Report';
import GhostRadar from './components/GhostRadar';
import BaitGenerator from './components/BaitGenerator';

function App() {
  const [url, setUrl] = useState('');
  const [isScanning, setIsScanning] = useState(false);
  const [logs, setLogs] = useState(['[SYSTEM] Ghost-Buster V1.0 initialized...', '[SYSTEM] Awaiting target URL...']);
  const [scanResult, setScanResult] = useState(null);

  const startScan = () => {
    if (!url) return;
    setIsScanning(true);
    setScanResult(null);
    setLogs(prev => [...prev, `[INFILTRATE] Target: ${url}`, '[PROCESS] Deploying Ghost Agent...']);

    setTimeout(() => {
      setIsScanning(false);
      setLogs(prev => [...prev, '[ANALYSIS] Threats identified.', '[SUCCESS] Complete.']);
      setScanResult({
        verdict: 'MALICIOUS',
        riskScore: 88,
        threats: ['Credential Harvesting', 'Fake Login CSS', 'Suspicious Domain'],
      });
    }, 3000);
  };

  return (
    <div className={`min-h-screen w-full overflow-x-hidden bg-black text-green-500 p-4 md:p-10 font-mono selection:bg-green-500 selection:text-black crt-overlay relative ${scanResult?.verdict === 'MALICIOUS' ? 'animate-shake' : ''}`}>
      
      {isScanning && (
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 pointer-events-none z-50 opacity-20">
          <Ghost size={300} className="animate-ping text-purple-500" />
        </div>
      )}

      <header className="flex flex-col md:flex-row justify-between items-center mb-10 border-b border-green-900 pb-5 relative z-10">
        <h1 className="text-4xl font-black flex items-center gap-4 italic tracking-tighter">
          <Ghost className="w-10 h-10 animate-pulse text-purple-500" />
          GHOST-BUSTER <span className="text-white bg-green-900 px-2 not-italic">AGENCY</span>
        </h1>
        <div className="flex gap-6 mt-4 md:mt-0 text-xs text-green-800">
          <div className="flex items-center gap-2 font-bold"><Activity className="w-4 h-4 animate-pulse" /> SYSTEM: ONLINE</div>
          <div className="text-purple-400 font-bold underline decoration-purple-900">HAKIN' WINTER 2.0</div>
        </div>
      </header>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 relative z-10">
        {/* LEFT COLUMN: Input, Radar, Terminal, AND NOW BAIT GENERATOR */}
        <div className="lg:col-span-2 space-y-6">
          <div className="bg-zinc-900 border-2 border-green-900 p-6 shadow-[4px_4px_0px_0px_rgba(34,197,94,1)] glow-green transition-all duration-500">
            <div className="flex flex-col md:flex-row gap-6 items-center">
              <div className="flex-1 w-full">
                <label className="block text-sm mb-2 font-bold uppercase underline text-green-800 tracking-widest">Target_Infiltration_Link:</label>
                <div className="flex gap-3">
                  <input 
                    type="text" 
                    placeholder="https://suspect-site.com"
                    className="flex-1 bg-black border border-green-800 p-3 outline-none focus:border-green-400 text-white placeholder:text-zinc-900"
                    value={url}
                    onChange={(e) => setUrl(e.target.value)}
                  />
                  <button 
                    onClick={startScan} 
                    disabled={isScanning} 
                    className="bg-green-600 hover:bg-green-400 text-black px-8 py-3 font-black flex items-center gap-2 transition-all active:scale-95 disabled:opacity-50 shadow-[0_0_10px_rgba(34,197,94,0.5)]"
                  >
                    {isScanning ? <Zap className="animate-spin" /> : <Search />} SCAN
                  </button>
                </div>
              </div>
              <GhostRadar isScanning={isScanning} />
            </div>
          </div>
          
          <Terminal logs={logs} isScanning={isScanning} />

          {/* MOVED HERE: Wider layout for the Bait Generator */}
          {scanResult?.verdict === 'MALICIOUS' && <BaitGenerator />}
        </div>

        {/* RIGHT COLUMN: Just the Report now */}
        <div className="space-y-6 h-full">
          <Report scanResult={scanResult} isScanning={isScanning} />
        </div>
      </div>
    </div>
  );
}

export default App;