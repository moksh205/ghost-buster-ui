import React from 'react';
import { ShieldAlert, Image as ImageIcon, Zap, Download, FileWarning, Fingerprint, AlertCircle } from 'lucide-react';

export default function Report({ scanResult, isScanning }) {
  
  // Function to download evidence capture
  const downloadEvidence = () => {
    if (!scanResult?.screenshot) return;
    const link = document.createElement('a');
    link.href = `data:image/png;base64,${scanResult.screenshot}`;
    link.download = `GHOST_EVIDENCE_${Date.now()}.png`;
    link.click();
  };

  return (
    // Updated to Solid Matte Black with Purple accent line
    <div className="relative h-full overflow-hidden rounded-3xl border border-purple-500/30 bg-zinc-950 shadow-2xl transition-all duration-300 hover:border-purple-500/50 group">
      
      {/* Top Purple Accent Line */}
      <div className="absolute top-0 left-0 w-full h-1 bg-purple-500 shadow-[0_0_15px_rgba(168,85,247,0.5)]" />

      <div className="p-6 md:p-8 flex flex-col h-full">
        {/* Header */}
        <div className="flex items-center gap-3 mb-6 pb-4 border-b border-purple-500/20">
          <ShieldAlert className="w-5 h-5 text-purple-400 neon-glow" />
          <h2 className="text-sm font-black text-white tracking-[0.2em] uppercase italic">
            THREAT_REPORT
          </h2>
        </div>
        
        {/* Empty State */}
        {!scanResult && !isScanning && (
          <div className="flex-1 flex flex-col items-center justify-center text-purple-300/20 gap-4 py-10">
             <div className="w-20 h-20 rounded-2xl border-2 border-dashed border-purple-500/20 flex items-center justify-center animate-pulse">
                <ImageIcon size={40} />
             </div>
             <p className="text-[10px] font-black tracking-[0.3em] uppercase">NO_DATA_CAPTURED</p>
          </div>
        )}

        {/* Scanning State */}
        {isScanning && (
          <div className="flex-1 flex flex-col items-center justify-center py-10">
            <div className="relative w-16 h-16 mb-6">
                <div className="absolute inset-0 border-4 border-purple-500/20 rounded-full" />
                <div className="absolute inset-0 border-4 border-purple-500 border-t-transparent rounded-full animate-spin shadow-[0_0_15px_rgba(168,85,247,0.4)]" />
            </div>
            <p className="animate-pulse text-purple-400 tracking-[0.2em] uppercase text-[10px] font-black">
                DECRYPTING_SITE_DATA...
            </p>
          </div>
        )}

        {/* Result State */}
        {scanResult && (
          <div className="space-y-6 animate-in fade-in slide-in-from-bottom-4 duration-500 flex-1">
            
            {/* --- VISUAL EVIDENCE SECTION --- */}
            <div className="space-y-3">
              <div className="flex justify-between items-center">
                <div className="flex items-center gap-2 text-[10px] text-zinc-500 font-bold uppercase tracking-widest">
                    <Fingerprint size={12} className="text-purple-500" /> Site_Capture
                </div>
                {scanResult.screenshot && (
                  <button 
                    onClick={downloadEvidence} 
                    className="px-3 py-1 rounded-full bg-purple-500/10 border border-purple-500/30 text-[9px] text-purple-400 hover:bg-purple-500 hover:text-black transition-all flex items-center gap-1.5 uppercase font-bold"
                  >
                    <Download size={10} /> Save_PNG
                  </button>
                )}
              </div>
              
              <div className="border border-zinc-800 bg-black aspect-video rounded-xl relative group overflow-hidden shadow-inner">
                {scanResult?.screenshot ? (
                  <img 
                    src={`data:image/png;base64,${scanResult.screenshot}`} 
                    alt="Evidence capture" 
                    className="w-full h-full object-cover opacity-70 group-hover:opacity-100 transition-opacity duration-500"
                  />
                ) : (
                  <div className="h-full flex flex-col items-center justify-center text-zinc-800">
                    <ImageIcon size={32} className="mb-2" />
                    <p className="text-[9px] font-black uppercase tracking-widest">Encrypted_Preview</p>
                  </div>
                )}

                {/* Animated Scanline Overlay */}
                <div className="absolute inset-0 pointer-events-none z-20">
                  <div className="w-full h-1 bg-purple-500/30 shadow-[0_0_20px_rgba(168,85,247,0.5)] animate-scan" />
                  <div className="absolute inset-0 bg-gradient-to-b from-transparent via-purple-500/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity" />
                </div>
              </div>
            </div>

            {/* --- SCOREBOARD --- */}
            <div className="grid grid-cols-2 gap-4 bg-zinc-900/50 p-4 rounded-2xl border border-white/5">
              <div className="space-y-1">
                <p className="text-[9px] text-zinc-500 font-bold uppercase tracking-[0.2em]">Verdict</p>
                <p className={`text-2xl font-black italic tracking-tighter ${
                  scanResult.verdict === 'MALICIOUS' ? 'text-red-500 animate-pulse' : 'text-emerald-400'
                }`}>
                  {scanResult.verdict}
                </p>
              </div>
              <div className="text-right space-y-1">
                <p className="text-[9px] text-zinc-500 font-bold uppercase tracking-[0.2em]">Risk Score</p>
                <p className="text-2xl font-black text-white tabular-nums">
                  {scanResult.riskScore}<span className="text-xs text-zinc-600 ml-1">%</span>
                </p>
              </div>
            </div>

            {/* --- FORENSIC CLUES --- */}
            <div className="space-y-3">
              <p className="text-[10px] text-zinc-500 font-bold uppercase tracking-widest flex items-center gap-2">
                <AlertCircle size={12} className="text-purple-500" /> Forensic_Logs
              </p>
              <div className="space-y-2 max-h-[120px] overflow-y-auto pr-2 custom-scrollbar">
                {scanResult.threats.map((t, i) => {
                  const isSafe = scanResult.verdict === 'SAFE' || t.toLowerCase().includes('verified');
                  return (
                    <div 
                      key={i} 
                      className={`text-[10px] p-3 rounded-xl border flex items-center gap-3 transition-all ${
                        isSafe 
                          ? 'bg-emerald-500/5 border-emerald-500/20 text-emerald-200' 
                          : 'bg-red-500/5 border-red-500/20 text-red-200'
                      }`}
                    >
                      <div className={`w-1.5 h-1.5 rounded-full ${isSafe ? 'bg-emerald-500 shadow-[0_0_8px_emerald]' : 'bg-red-500 shadow-[0_0_8px_red]'}`} />
                      <span className="font-medium tracking-wide">{t}</span>
                    </div>
                  );
                })}
              </div>
            </div>

            {/* --- AI DEEP ANALYSIS --- */}
            {scanResult.ai_summary && (
              <div className={`p-4 rounded-2xl border bg-black/40 relative overflow-hidden ${
                scanResult.verdict === 'MALICIOUS' ? 'border-red-500/30' : 'border-emerald-500/30'
              }`}>
                <div className="flex items-center gap-2 mb-2">
                    <Zap size={12} className={scanResult.verdict === 'MALICIOUS' ? 'text-red-400' : 'text-emerald-400'} />
                    <span className="text-[9px] font-black text-white uppercase tracking-[0.2em]">AI_Core_Conclusion</span>
                </div>
                <p className="text-[11px] text-zinc-400 italic leading-relaxed">
                  "{scanResult.ai_summary}"
                </p>
              </div>
            )}

          </div>
        )}
      </div>
    </div>
  );
}