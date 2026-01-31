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

  // --- THE POISON LOGIC ---
  const generatePoison = () => {
    const prefixes = ['admin', 'secure', 'root', 'vault', 'crypto', 'shadow'];
    const suffixes = ['_trap', '_bait', '99', '!', 'X', 'gate'];
    const domains = ['@gmail.com', '@outlook.com', '@yahoo.com', '@proton.me'];
    
    const randomPrefix = prefixes[Math.floor(Math.random() * prefixes.length)];
    const randomSuffix = suffixes[Math.floor(Math.random() * suffixes.length)];
    const randomDomain = domains[Math.floor(Math.random() * domains.length)];
    
    const poisonedEmail = `${randomPrefix}${randomSuffix}${Math.random().toString(36).substring(7)}${randomDomain}`;
    const poisonedPass = Math.random().toString(36).slice(-10) + "!" + (Math.floor(Math.random() * 900) + 100);

    // FIX: Use the current 'url' state for the log
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

      if (!response.ok) {
        throw new Error(`Server Ghosted Us! Status: ${response.status}`);
      }

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
    <div className={`min-h-screen w-full overflow-x-hidden bg-black text-green-500 p-4 md:p-10 font-mono selection:bg-green-500 selection:text-black crt-overlay relative ${scanResult?.verdict === 'MALICIOUS' ? 'animate-shake' : ''}`}>
      
      {isScanning && (
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 pointer-events-none z-50 opacity-20">
          <Ghost size={300} className="animate-ping text-purple-500" />
        </div>
      )}

      <header className="flex flex-col md:flex-row justify-between items-center mb-10 border-b border-green-900 pb-5 relative z-10">
        <h1 className="text-4xl font-black flex items-center gap-4 italic tracking-tighter text-green-500">
          <Ghost className="w-10 h-10 animate-pulse text-purple-500" />
          GHOST-BUSTER <span className="text-white bg-green-900 px-2 not-italic">AGENCY</span>
        </h1>
        <div className="flex gap-6 mt-4 md:mt-0 text-xs text-green-800">
          <div className="flex items-center gap-2 font-bold"><Activity className="w-4 h-4 animate-pulse" /> SYSTEM: ONLINE</div>
          <div className="text-purple-400 font-bold underline decoration-purple-900">HAKIN' WINTER 2.0</div>
        </div>
      </header>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 relative z-10">
        <div className="lg:col-span-2 space-y-6">
          <div className="bg-zinc-900 border-2 border-green-900 p-6 shadow-[4px_4px_0px_0px_rgba(34,197,94,1)] glow-green">
            <div className="flex flex-col md:flex-row gap-6 items-center">
              <div className="flex-1 w-full">
                <label className="block text-sm mb-2 font-bold uppercase underline text-green-800 tracking-widest">Target_Infiltration_Link:</label>
                <div className="flex gap-3">
                  <input 
                    type="text" 
                    placeholder="https://suspect-site.com"
                    className="flex-1 bg-black border border-green-800 p-3 outline-none focus:border-green-400 text-white"
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

          {/* Connects to your styled component below */}
          {scanResult?.verdict === 'MALICIOUS' && (
            <BaitGenerator onGenerate={generatePoison} />
          )}
        </div>

        <div className="space-y-6 h-full">
          <Report scanResult={scanResult} isScanning={isScanning} />
        </div>
      </div>
    </div>
  );
}

export default App;