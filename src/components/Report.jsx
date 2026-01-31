import React from 'react';
import { ShieldAlert, Image as ImageIcon, Zap, Download } from 'lucide-react';

export default function Report({ scanResult, isScanning }) {
  
  // Function to download the screenshot as evidence
  const downloadEvidence = () => {
    if (!scanResult?.screenshot) return;
    const link = document.createElement('a');
    link.href = `data:image/png;base64,${scanResult.screenshot}`;
    link.download = `GHOST_EVIDENCE_${Date.now()}.png`;
    link.click();
  };

  return (
    <div className="bg-zinc-900 border-2 border-purple-900 p-6 rounded-none relative overflow-hidden h-full shadow-[0_0_20px_rgba(168,85,247,0.1)] font-mono">
      <h2 className="text-xl font-bold mb-4 flex items-center gap-2 border-b border-purple-900 pb-2 text-purple-400">
        <ShieldAlert className="text-purple-500" /> THREAT_REPORT
      </h2>
      
      {/* Empty State */}
      {!scanResult && !isScanning && (
        <div className="flex flex-col items-center justify-center mt-20 opacity-30">
           <ImageIcon size={48} className="mb-4 text-zinc-600" />
           <p className="text-zinc-600 italic text-center text-sm tracking-widest uppercase font-black">NO DATA CAPTURED</p>
        </div>
      )}

      {/* Scanning State */}
      {isScanning && (
        <div className="flex flex-col items-center justify-center mt-10">
          <div className="w-12 h-12 border-4 border-purple-500 border-t-transparent rounded-full animate-spin mb-4" />
          <p className="animate-pulse text-purple-400 tracking-widest uppercase text-xs font-black">DECRYPTING_SITE_DATA...</p>
        </div>
      )}

      {/* Result State */}
      {scanResult && (
        <div className="space-y-6 animate-in fade-in slide-in-from-bottom-4 duration-500">
          
          {/* --- VISUAL EVIDENCE SECTION --- */}
          <div>
            <div className="flex justify-between items-center mb-2">
              <p className="text-[10px] text-zinc-500 uppercase tracking-tighter">[ Site_Evidence_Capture ]</p>
              {scanResult.screenshot && (
                <button onClick={downloadEvidence} className="text-[9px] text-purple-500 hover:text-white flex items-center gap-1 uppercase transition-colors">
                  <Download size={10} /> Save_PNG
                </button>
              )}
            </div>
            <div className="border border-zinc-700 bg-black aspect-video flex items-center justify-center relative group overflow-hidden">
              <div className="absolute inset-0 bg-purple-500/5 group-hover:bg-transparent transition-colors z-10 pointer-events-none" />
              
              {scanResult?.screenshot ? (
                <img 
                  src={`data:image/png;base64,${scanResult.screenshot}`} 
                  alt="Evidence capture" 
                  className="w-full h-full object-cover opacity-80 group-hover:opacity-100 transition-opacity"
                />
              ) : (
                <div className="text-center">
                  <ImageIcon className="mx-auto mb-2 text-zinc-800" size={32} />
                  <p className="text-[10px] text-zinc-600 uppercase font-black">Preview_Encrypted.png</p>
                </div>
              )}

              {/* Animated Scanline */}
              <div className="absolute inset-0 pointer-events-none w-full h-full z-20">
                <div className="w-full h-0.5 bg-purple-500/50 shadow-[0_0_15px_rgba(168,85,247,0.5)] animate-scan" />
              </div>
            </div>
          </div>

          {/* --- SCOREBOARD --- */}
          <div className="grid grid-cols-2 gap-4">
            <div>
              <p className="text-[10px] text-zinc-500 mb-1 uppercase tracking-widest">Verdict</p>
              <p className={`text-4xl font-black italic tracking-tighter ${scanResult.verdict === 'MALICIOUS' ? 'text-red-500 animate-glitch' : 'text-blue-500'}`}>
                {scanResult.verdict}
              </p>
            </div>
            <div className="text-right">
              <p className="text-[10px] text-zinc-500 mb-1 uppercase tracking-widest">Risk Score</p>
              <p className="text-2xl font-black text-white leading-none">
                {scanResult.riskScore}<span className="text-xs text-zinc-500">%</span>
              </p>
            </div>
          </div>

          {/* --- RISK BAR --- */}
          <div className="w-full bg-zinc-800 h-1.5 border border-zinc-700">
            <div 
              className={`h-full transition-all duration-1000 ${scanResult.riskScore >= 50 ? 'bg-red-500 shadow-[0_0_10px_rgba(239,68,68,0.5)]' : 'bg-blue-500 shadow-[0_0_10px_rgba(59,130,246,0.5)]'}`} 
              style={{ width: `${scanResult.riskScore}%` }} 
            />
          </div>

          {/* --- CLUES DETECTED --- */}
          <div>
            <p className="text-[10px] text-zinc-500 mb-2 uppercase tracking-tighter">Forensic_Clues_Detected</p>
            <ul className="space-y-1.5">
              {scanResult.threats.map((t, i) => {
                const isSafetyClue = scanResult.verdict === 'SAFE' || t.toLowerCase().includes('verified');
                return (
                  <li 
                    key={i} 
                    className={`text-[11px] p-2 border-l-2 flex items-center gap-2 transition-colors duration-300 ${
                      isSafetyClue 
                        ? 'bg-blue-900/10 border-blue-600 text-blue-200' 
                        : 'bg-red-900/10 border-red-600 text-red-200'
                    }`}
                  >
                    <span className={`w-1 h-1 rounded-full ${isSafetyClue ? 'bg-blue-500' : 'bg-red-500'}`} />
                    {t}
                  </li>
                );
              })}
            </ul>
          </div>

          {/* --- AI GHOST ANALYSIS SECTION --- */}
          {scanResult.ai_summary && (
            <div className={`mt-6 p-4 border rounded animate-in fade-in zoom-in duration-700 ${
              scanResult.verdict === 'MALICIOUS' 
                ? 'bg-red-900/10 border-red-900/50' 
                : 'bg-blue-900/10 border-blue-900/50'
            }`}>
              <p className={`text-[10px] font-black mb-2 flex items-center gap-2 uppercase tracking-widest ${
                scanResult.verdict === 'MALICIOUS' ? 'text-red-500' : 'text-blue-400'
              }`}>
                <Zap size={14} className="animate-pulse" /> AI_Deep_Analysis:
              </p>
              <p className="text-[11px] text-zinc-300 italic leading-relaxed">
                "{scanResult.ai_summary}"
              </p>
            </div>
          )}

        </div>
      )}
    </div>
  );
}