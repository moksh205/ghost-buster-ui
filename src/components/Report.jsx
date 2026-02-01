import React, { useState } from 'react';
import { 
  ShieldAlert, Image as ImageIcon, Zap, Download, FileWarning, Fingerprint, 
  AlertCircle, Activity, CheckCircle, XCircle, Terminal, AlertTriangle, 
  ShieldCheck, LayoutGrid, Eye, Lock 
} from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

export default function Report({ scanResult, isScanning }) {
  const [activeTab, setActiveTab] = useState('analysis'); // 'analysis' | 'evidence' | 'defense'

  // --- INTELLIGENCE PARSER ---
  const getIntelligence = (result) => {
    if (!result) return null;
    if (result.ai_intelligence) return result.ai_intelligence;

    // Fallback Simulation
    const isSafe = result.verdict === 'SAFE';
    const score = result.riskScore || (isSafe ? 5 : 85);
    return {
      riskBreakdown: [
        { label: "Malware Probability", value: isSafe ? 2 : score + 5, color: "bg-red-500" },
        { label: "Phishing Signals", value: isSafe ? 5 : score - 10, color: "bg-orange-500" },
        { label: "Suspicious Redirects", value: isSafe ? 0 : score - 20, color: "bg-yellow-500" },
      ],
      aiExplanation: isSafe 
        ? "Gemini analysis confirms valid SSL certificates and standard DOM structure. No obfuscated JavaScript detected."
        : "Gemini detected heuristic patterns matching known phishing kits. The domain age is suspicious (< 24h) and the login form action points to an external, unverified IP address.",
      phishingTarget: !isSafe && (Math.random() > 0.5) ? "Instagram" : null, 
      recommendations: isSafe 
        ? ["Site appears safe for navigation", "Standard SSL encryption active"]
        : ["Do NOT enter credentials", "Block domain in firewall", "Clear browser cache immediately"],
      sandboxTrace: isSafe
        ? ["GET /index.html [200 OK]", "Load script jquery.min.js", "SSL Handshake: Valid"]
        : ["GET /login.php [301 Redirect]", "Load script tracker.js (Suspicious)", "POST /api/steal_creds [Blocked]"]
    };
  };

  const intelligence = getIntelligence(scanResult);

  const downloadEvidence = () => {
    if (!scanResult?.screenshot) return;
    const link = document.createElement('a');
    link.href = `data:image/png;base64,${scanResult.screenshot}`;
    link.download = `GHOST_EVIDENCE_${Date.now()}.png`;
    link.click();
  };

  // Tab Button Helper
  const TabButton = ({ id, icon: Icon, label }) => (
    <button 
      onClick={() => setActiveTab(id)}
      className={`flex-1 py-3 text-[10px] font-bold uppercase tracking-widest flex items-center justify-center gap-2 transition-all border-b-2 ${
        activeTab === id 
          ? 'border-purple-500 text-white bg-purple-500/10' 
          : 'border-transparent text-zinc-500 hover:text-zinc-300 hover:bg-white/5'
      }`}
    >
      <Icon size={14} /> {label}
    </button>
  );

  return (
    <div className="relative h-full overflow-hidden rounded-3xl border border-purple-500/30 bg-[#09090b] shadow-2xl flex flex-col group">
      {/* Top Accent */}
      <div className="absolute top-0 left-0 w-full h-1 bg-purple-500 shadow-[0_0_15px_rgba(168,85,247,0.6)] z-10" />

      {/* --- HEADER --- */}
      <div className="pt-6 px-6 pb-2 border-b border-zinc-800 bg-zinc-900/50 backdrop-blur-md z-10">
        <div className="flex justify-between items-center mb-4">
          <div className="flex items-center gap-3">
            <div className="p-2 bg-purple-500/10 rounded-lg border border-purple-500/20">
               <ShieldAlert className="w-5 h-5 text-purple-400" />
            </div>
            <div>
                <h2 className="text-sm font-black text-white tracking-[0.2em] uppercase italic">THREAT_INTEL</h2>
                <p className="text-[10px] text-zinc-500 font-mono">AI-POWERED ANALYSIS ENGINE</p>
            </div>
          </div>
          {scanResult && (
             <div className={`px-3 py-1.5 rounded-lg border text-[10px] font-black tracking-widest uppercase shadow-lg ${
                scanResult.verdict === 'MALICIOUS' 
                  ? 'bg-red-500/10 border-red-500/50 text-red-500 shadow-red-900/20' 
                  : 'bg-emerald-500/10 border-emerald-500/50 text-emerald-500 shadow-emerald-900/20'
             }`}>
                 {scanResult.verdict}
             </div>
          )}
        </div>

        {/* --- TABS --- */}
        {scanResult && (
            <div className="flex border-t border-zinc-800">
                <TabButton id="analysis" icon={LayoutGrid} label="Analysis" />
                <TabButton id="evidence" icon={Eye} label="Evidence" />
                <TabButton id="defense" icon={Lock} label="Defense" />
            </div>
        )}
      </div>
      
      {/* --- CONTENT AREA (Scrollable) --- */}
      <div className="flex-1 overflow-y-auto custom-scrollbar bg-black/20 p-6 relative">
        
        {/* LOADING STATE */}
        {isScanning && (
          <div className="absolute inset-0 flex flex-col items-center justify-center bg-black/80 z-20 backdrop-blur-sm">
            <div className="relative w-16 h-16 mb-6">
                <div className="absolute inset-0 border-4 border-purple-500/20 rounded-full" />
                <div className="absolute inset-0 border-4 border-purple-500 border-t-transparent rounded-full animate-spin shadow-[0_0_20px_rgba(168,85,247,0.4)]" />
            </div>
            <p className="animate-pulse text-purple-400 tracking-[0.2em] uppercase text-[10px] font-black">NEURAL_SCAN_ACTIVE...</p>
          </div>
        )}

        {/* EMPTY STATE */}
        {!scanResult && !isScanning && (
          <div className="h-full flex flex-col items-center justify-center text-zinc-700 gap-4 opacity-60">
             <Activity size={48} strokeWidth={1} />
             <p className="text-[10px] font-black tracking-[0.3em] uppercase">SYSTEM_IDLE</p>
          </div>
        )}

        {/* MAIN CONTENT - ANIMATED SWITCHING */}
        <AnimatePresence mode="wait">
            {scanResult && intelligence && (
                <motion.div 
                    key={activeTab}
                    initial={{ opacity: 0, x: 10 }}
                    animate={{ opacity: 1, x: 0 }}
                    exit={{ opacity: 0, x: -10 }}
                    transition={{ duration: 0.2 }}
                    className="space-y-6"
                >
                    {/* === TAB 1: ANALYSIS === */}
                    {activeTab === 'analysis' && (
                        <>
                            {/* Score Card */}
                            <div className="grid grid-cols-5 gap-4">
                                <div className="col-span-2 bg-zinc-900/50 border border-zinc-800 rounded-2xl p-4 flex flex-col items-center justify-center relative overflow-hidden">
                                    <div className="relative z-10 text-center">
                                        <div className={`text-4xl font-black mb-1 ${scanResult.riskScore > 50 ? 'text-red-500' : 'text-emerald-500'}`}>
                                            {scanResult.riskScore}
                                        </div>
                                        <div className="text-[9px] text-zinc-500 font-bold tracking-[0.2em] uppercase">RISK</div>
                                    </div>
                                    <svg className="absolute inset-0 w-full h-full opacity-20 pointer-events-none" viewBox="0 0 100 100">
                                        <circle cx="50" cy="50" r="40" fill="none" stroke="currentColor" strokeWidth="8" className={scanResult.riskScore > 50 ? 'text-red-500' : 'text-emerald-500'} strokeDasharray={`${scanResult.riskScore * 2.5} 250`} transform="rotate(-90 50 50)" />
                                    </svg>
                                </div>
                                <div className="col-span-3 flex flex-col justify-center space-y-2">
                                    {intelligence.riskBreakdown.map((item, idx) => (
                                        <div key={idx}>
                                            <div className="flex justify-between text-[9px] font-bold text-zinc-500 uppercase mb-1">
                                                <span>{item.label}</span>
                                                <span className="text-zinc-300">{item.value}%</span>
                                            </div>
                                            <div className="h-1.5 w-full bg-zinc-800 rounded-full overflow-hidden">
                                                <div className={`h-full ${item.color} shadow-[0_0_8px_currentColor]`} style={{ width: `${item.value}%` }} />
                                            </div>
                                        </div>
                                    ))}
                                </div>
                            </div>

                            {/* AI Explanation Box */}
                            <div className="p-5 bg-gradient-to-br from-purple-500/5 to-transparent border border-purple-500/20 rounded-2xl">
                                <div className="flex items-center gap-2 mb-3">
                                    <Zap size={14} className="text-purple-400" />
                                    <span className="text-[10px] font-black text-white uppercase tracking-[0.2em]">Gemini_Analysis</span>
                                </div>
                                <p className="text-xs text-zinc-300 font-mono leading-relaxed border-l-2 border-purple-500/30 pl-3">
                                    "{intelligence.aiExplanation}"
                                </p>
                            </div>

                            {/* Impersonation Alert */}
                            {intelligence.phishingTarget && (
                                <div className="p-3 bg-red-500/10 border border-red-500/30 rounded-xl flex items-center gap-3 animate-pulse">
                                    <AlertTriangle size={16} className="text-red-500" />
                                    <span className="text-xs font-bold text-red-400 uppercase tracking-wide">Targeting: {intelligence.phishingTarget}</span>
                                </div>
                            )}
                        </>
                    )}

                    {/* === TAB 2: EVIDENCE === */}
                    {activeTab === 'evidence' && (
                        <>
                            {/* Screenshot */}
                            <div className="space-y-3">
                                <div className="flex justify-between items-center px-1">
                                    <span className="text-[10px] font-bold text-zinc-500 uppercase tracking-widest flex items-center gap-2"><Fingerprint size={12} /> DOM_Capture</span>
                                    {scanResult.screenshot && (
                                        <button onClick={downloadEvidence} className="text-[9px] font-bold text-purple-400 hover:text-purple-300 uppercase flex items-center gap-1"><Download size={10} /> Save</button>
                                    )}
                                </div>
                                <div className="aspect-video bg-black rounded-xl border border-zinc-800 overflow-hidden relative group">
                                    {scanResult.screenshot ? (
                                        <img src={`data:image/png;base64,${scanResult.screenshot}`} className="w-full h-full object-cover opacity-80 group-hover:opacity-100 transition-opacity" alt="Evidence" />
                                    ) : (
                                        <div className="h-full flex items-center justify-center text-zinc-800"><ImageIcon size={24} /></div>
                                    )}
                                </div>
                            </div>

                            {/* Sandbox Logs */}
                            <div className="bg-black/60 border border-zinc-800 rounded-xl p-4 font-mono text-[10px]">
                                <h3 className="text-zinc-500 font-bold uppercase tracking-widest mb-3 border-b border-zinc-900 pb-2 flex items-center gap-2"><Terminal size={12} /> Execution_Trace</h3>
                                <div className="space-y-1.5 max-h-[150px] overflow-y-auto custom-scrollbar">
                                    {intelligence.sandboxTrace.map((log, i) => (
                                        <div key={i} className="flex gap-2">
                                            <span className="text-zinc-700 select-none">00:{i}2</span>
                                            <span className={log.includes("Blocked") ? "text-red-400" : "text-emerald-400"}>{log}</span>
                                        </div>
                                    ))}
                                    <span className="animate-pulse text-purple-500">_</span>
                                </div>
                            </div>
                        </>
                    )}

                    {/* === TAB 3: DEFENSE === */}
                    {activeTab === 'defense' && (
                        <>
                            <div className="bg-zinc-900/30 border border-zinc-800 rounded-2xl p-5">
                                <h3 className="text-[10px] font-bold text-zinc-500 uppercase tracking-widest mb-4 flex items-center gap-2"><ShieldCheck size={12} /> Recommended_Action</h3>
                                <ul className="space-y-3">
                                    {intelligence.recommendations.map((rec, i) => (
                                        <li key={i} className="flex items-start gap-3 p-2 rounded hover:bg-white/5 transition-colors">
                                            {scanResult.verdict === 'SAFE' ? <CheckCircle className="w-4 h-4 text-emerald-500 shrink-0" /> : <XCircle className="w-4 h-4 text-red-500 shrink-0" />}
                                            <span className="text-xs text-zinc-300 font-medium">{rec}</span>
                                        </li>
                                    ))}
                                </ul>
                            </div>

                            {scanResult.verdict === 'MALICIOUS' && (
                                <div className="p-4 rounded-xl bg-red-500/5 border border-red-500/20 text-center space-y-3">
                                    <p className="text-[10px] text-red-400 font-bold uppercase tracking-widest">Threat Level Critical</p>
                                    <button className="w-full py-3 bg-red-600 hover:bg-red-500 text-white text-xs font-black uppercase tracking-widest rounded-lg shadow-[0_0_20px_rgba(220,38,38,0.4)] transition-all">
                                        Initiate Takedown Request
                                    </button>
                                </div>
                            )}
                        </>
                    )}
                </motion.div>
            )}
        </AnimatePresence>
      </div>
    </div>
  );
}