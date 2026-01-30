import React from 'react';
import { ShieldAlert, Image as ImageIcon } from 'lucide-react';

export default function Report({ scanResult, isScanning }) {
  return (
    <div className="bg-zinc-900 border-2 border-purple-900 p-6 rounded-none relative overflow-hidden h-full">
      <h2 className="text-xl font-bold mb-4 flex items-center gap-2 border-b border-purple-900 pb-2 text-purple-400 font-mono">
        <ShieldAlert className="text-purple-500" /> THREAT_REPORT
      </h2>
      
      {!scanResult && !isScanning && (
        <div className="flex flex-col items-center justify-center mt-20 opacity-30">
           <ImageIcon size={48} className="mb-4 text-zinc-600" />
           <p className="text-zinc-600 italic text-center font-mono uppercase text-sm tracking-widest">NO DATA CAPTURED</p>
        </div>
      )}

      {isScanning && (
        <div className="flex flex-col items-center justify-center mt-10 font-mono">
          <div className="w-12 h-12 border-4 border-purple-500 border-t-transparent rounded-full animate-spin mb-4" />
          <p className="animate-pulse text-purple-400 tracking-widest">DECRYPTING...</p>
        </div>
      )}

      {scanResult && (
        <div className="space-y-6 animate-in fade-in slide-in-from-bottom-4 duration-500 font-mono">
          {/* Visual Evidence Section */}
        {/* Visual Evidence Section */}
<div>
  <p className="text-[10px] text-zinc-500 mb-2 uppercase tracking-tighter">[ Site_Evidence_Capture ]</p>
  <div className="mt-2 border border-zinc-700 bg-black aspect-video flex items-center justify-center relative group overflow-hidden">
    <div className="absolute inset-0 bg-purple-500/5 group-hover:bg-transparent transition-colors" />
    
    <div className="text-center">
      <ImageIcon className="mx-auto mb-2 text-zinc-800" size={32} />
      <p className="text-[10px] text-zinc-600 uppercase font-black">
        Preview_Encrypted.png
      </p>
    </div>

    {/* FIX: The Animated Scanline */}
    <div className="absolute inset-0 pointer-events-none w-full h-full">
      <div className="w-full h-0.5 bg-purple-500/50 shadow-[0_0_15px_rgba(168,85,247,0.5)] animate-scan" />
    </div>
  </div>
</div>

          <div className="grid grid-cols-2 gap-4">
            <div>
              <p className="text-[10px] text-zinc-500 mb-1 uppercase">Verdict</p>
              <p className={`text-4xl font-black ${scanResult.verdict === 'MALICIOUS' ? 'text-red-500 animate-glitch' : 'text-blue-500'}`}>
  {scanResult.verdict}
</p>
            </div>
            <div>
              <p className="text-[10px] text-zinc-500 mb-1 uppercase text-right">Risk Score</p>
              <p className="text-2xl font-black text-white text-right leading-none">
                {scanResult.riskScore}<span className="text-xs text-zinc-500">%</span>
              </p>
            </div>
          </div>

          <div>
            <div className="w-full bg-zinc-800 h-2 border border-zinc-700">
              <div 
                className={`h-full transition-all duration-1000 ${scanResult.riskScore > 70 ? 'bg-red-500' : 'bg-blue-500'}`} 
                style={{ width: `${scanResult.riskScore}%` }} 
              />
            </div>
          </div>

          <div>
            <p className="text-[10px] text-zinc-500 mb-2 uppercase">Clues Detected</p>
            <ul className="space-y-1">
              {scanResult.threats.map((t, i) => (
                <li key={i} className="text-[11px] bg-red-900/10 border-l-2 border-red-900 p-2 text-red-200 flex items-center gap-2">
                  <span className="w-1 h-1 bg-red-500 rounded-full" />
                  {t}
                </li>
              ))}
            </ul>
          </div>
        </div>
      )}
    </div>
  );
}