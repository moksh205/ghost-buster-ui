import React, { useState, useEffect } from 'react';
import { Database, Search, ShieldAlert, X, Calendar, Globe, AlertTriangle, CheckCircle, Bug, Terminal, Activity } from 'lucide-react';
import { motion } from 'framer-motion';

const ThreatDatabase = ({ onClose }) => {
  const [reports, setReports] = useState([]);
  const [loading, setLoading] = useState(true);
  const [filter, setFilter] = useState('');

  useEffect(() => {
    fetch('http://127.0.0.1:8000/reports')
      .then(res => res.json())
      .then(data => {
        setReports(data);
        setLoading(false);
      })
      .catch(err => setLoading(false));
  }, []);

  const filteredReports = reports.filter(r => r.url.toLowerCase().includes(filter.toLowerCase()));

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/80 backdrop-blur-md p-4 animate-fade-in">
      
      {/* --- MAIN MODAL CONTAINER --- */}
      <div className="w-full max-w-7xl h-[85vh] rounded-2xl overflow-hidden shadow-[0_0_50px_rgba(0,0,0,0.8)] relative flex flex-col border border-zinc-800 bg-[#0a0a0a]">
        
        {/* ===================================================================================== */}
        {/* --- CUSTOM CSS CYBER BACKGROUND (Guaranteed to show) --- */}
        {/* ===================================================================================== */}
        <div className="absolute inset-0 z-0 pointer-events-none">
            {/* 1. Base Dark Layer */}
            <div className="absolute inset-0 bg-[#050505]"></div>
            
            {/* 2. Cyber Grid Pattern */}
            <div className="absolute inset-0 opacity-20" 
                 style={{ 
                     backgroundImage: `linear-gradient(rgba(16, 185, 129, 0.3) 1px, transparent 1px), linear-gradient(90deg, rgba(16, 185, 129, 0.3) 1px, transparent 1px)`,
                     backgroundSize: '40px 40px'
                 }}>
            </div>

            {/* 3. Radar Scanline Animation */}
            <div className="absolute inset-0 bg-gradient-to-b from-transparent via-emerald-500/5 to-transparent animate-scanline pointer-events-none"></div>
            
            {/* 4. Vignette (Dark Edges) */}
            <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,transparent_0%,#000_100%)]"></div>
        </div>
        {/* ===================================================================================== */}


        {/* --- CONTENT LAYER (Relative z-10) --- */}
        <div className="relative z-10 flex flex-col h-full">
            
            {/* Header */}
            <div className="px-8 py-6 border-b border-zinc-800 flex justify-between items-center bg-black/40 backdrop-blur-md">
                <div className="flex items-center gap-5">
                    <div className="relative p-3 bg-red-500/10 rounded-xl border border-red-500/20 shadow-[0_0_20px_rgba(239,68,68,0.2)] overflow-hidden">
                        <div className="absolute inset-0 bg-red-500/20 blur-xl"></div>
                        <Database className="relative w-8 h-8 text-red-500" />
                    </div>
                    <div>
                        <h2 className="text-2xl font-black text-white tracking-[0.2em] uppercase font-mono shadow-black drop-shadow-lg">Global Threat DB</h2>
                        <div className="flex items-center gap-3 mt-1.5">
                            <span className="relative flex h-2.5 w-2.5">
                              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
                              <span className="relative inline-flex rounded-full h-2.5 w-2.5 bg-emerald-500"></span>
                            </span>
                            <p className="text-xs text-emerald-500 font-mono font-bold tracking-widest">ENCRYPTED CONNECTION // SECURE</p>
                        </div>
                    </div>
                </div>
                <button onClick={onClose} className="p-2 hover:bg-white/10 rounded-lg transition-all border border-transparent hover:border-zinc-700 group">
                    <X className="w-6 h-6 text-zinc-500 group-hover:text-white" />
                </button>
            </div>

            {/* Search Toolbar */}
            <div className="px-8 py-5 border-b border-zinc-800 bg-zinc-900/20 flex items-center gap-4">
                <div className="relative flex-1 group">
                    <Search className="absolute left-5 top-1/2 -translate-y-1/2 w-5 h-5 text-zinc-500 group-focus-within:text-emerald-400 transition-colors" />
                    <input 
                        type="text" 
                        placeholder="SEARCH TARGETS (URL, IP, HASH)..." 
                        className="w-full bg-black/50 border border-zinc-800 text-emerald-50 pl-14 pr-6 py-4 rounded-xl outline-none focus:border-emerald-500/50 focus:bg-black/80 transition-all font-mono text-sm placeholder-zinc-600 shadow-inner"
                        value={filter}
                        onChange={(e) => setFilter(e.target.value)}
                    />
                </div>
                <div className="flex items-center gap-4 px-6 py-4 border border-zinc-800 rounded-xl bg-black/50 shadow-lg">
                    <Activity className="w-5 h-5 text-emerald-500" />
                    <div className="flex flex-col items-end leading-none">
                        <span className="text-[10px] font-bold text-zinc-500 uppercase tracking-wider">Total Threats</span>
                        <span className="text-xl font-mono font-bold text-white">{reports.length}</span>
                    </div>
                </div>
            </div>

            {/* Table Area */}
            <div className="flex-1 overflow-y-auto custom-scrollbar p-0">
                {loading ? (
                    <div className="h-full flex flex-col items-center justify-center gap-6">
                        <div className="relative">
                            <div className="w-16 h-16 border-4 border-emerald-500/20 border-t-emerald-500 rounded-full animate-spin"></div>
                            <div className="absolute inset-0 border-4 border-transparent border-b-emerald-500/50 rounded-full animate-spin-reverse"></div>
                        </div>
                        <span className="text-emerald-500 font-mono tracking-[0.2em] text-sm animate-pulse">DECRYPTING ARCHIVES...</span>
                    </div>
                ) : filteredReports.length === 0 ? (
                    <div className="h-full flex flex-col items-center justify-center text-zinc-500 gap-6">
                        <div className="p-8 rounded-full bg-zinc-900/50 border border-zinc-800 shadow-inner">
                            <Database className="w-16 h-16 opacity-30" />
                        </div>
                        <span className="font-mono text-lg tracking-widest opacity-60">NO MATCHING RECORDS FOUND</span>
                    </div>
                ) : (
                    <table className="w-full text-left border-collapse">
                        <thead className="bg-black/40 sticky top-0 backdrop-blur-xl z-20 border-b border-zinc-700 shadow-2xl">
                            <tr>
                                <th className="py-5 px-8 text-[11px] font-black text-zinc-400 uppercase tracking-[0.15em] w-[45%]">Target Entity</th>
                                <th className="py-5 px-4 text-[11px] font-black text-zinc-400 uppercase tracking-[0.15em] w-[15%]">Type</th>
                                <th className="py-5 px-4 text-[11px] font-black text-zinc-400 uppercase tracking-[0.15em] text-center w-[15%]">Verdict</th>
                                <th className="py-5 px-4 text-[11px] font-black text-zinc-400 uppercase tracking-[0.15em] text-center w-[10%]">Risk</th>
                                <th className="py-5 px-8 text-[11px] font-black text-zinc-400 uppercase tracking-[0.15em] text-right w-[15%]">Detected</th>
                            </tr>
                        </thead>
                        
                        <tbody className="divide-y divide-zinc-800/40">
                            {filteredReports.map((report, idx) => (
                                <motion.tr 
                                    key={idx} 
                                    initial={{ opacity: 0, y: 10 }}
                                    animate={{ opacity: 1, y: 0 }}
                                    transition={{ delay: idx * 0.03 }}
                                    className="group hover:bg-white/[0.02] transition-colors duration-200"
                                >
                                    {/* URL */}
                                    <td className="py-4 px-8">
                                        <div className="flex items-center gap-4">
                                            <div className="p-2 rounded-lg bg-zinc-900 border border-zinc-800 group-hover:border-emerald-500/30 group-hover:bg-emerald-500/10 transition-all">
                                                <Globe className="w-4 h-4 text-zinc-500 group-hover:text-emerald-400" />
                                            </div>
                                            <span className="text-zinc-200 font-mono text-sm font-medium truncate max-w-[380px] group-hover:text-white transition-colors">
                                                {report.url}
                                            </span>
                                        </div>
                                    </td>

                                    {/* Type */}
                                    <td className="py-4 px-4">
                                        <div className="flex items-center gap-2">
                                            <Bug className="w-4 h-4 text-zinc-600" />
                                            <span className="text-zinc-400 font-mono text-[11px] uppercase font-bold tracking-wider">
                                                {report.threat_type || "UNKNOWN"}
                                            </span>
                                        </div>
                                    </td>

                                    {/* Verdict */}
                                    <td className="py-4 px-4 text-center">
                                        <span className={`inline-flex items-center gap-2 px-3 py-1 rounded text-[10px] font-black uppercase tracking-widest border ${
                                            report.verdict === 'MALICIOUS' 
                                                ? 'bg-red-950/30 text-red-400 border-red-500/20' 
                                                : 'bg-emerald-950/30 text-emerald-400 border-emerald-500/20'
                                        }`}>
                                            {report.verdict === 'MALICIOUS' ? <ShieldAlert className="w-3 h-3" /> : <CheckCircle className="w-3 h-3" />}
                                            {report.verdict}
                                        </span>
                                    </td>

                                    {/* Risk Score */}
                                    <td className="py-4 px-4 text-center">
                                        <div className="flex flex-col items-center justify-center gap-1">
                                            <span className={`text-xs font-mono font-bold ${report.risk_score > 50 ? "text-red-500" : "text-emerald-500"}`}>
                                                {report.risk_score}%
                                            </span>
                                            <div className="w-16 h-1 bg-zinc-800/50 rounded-full overflow-hidden">
                                                <div 
                                                    className={`h-full rounded-full shadow-[0_0_8px_currentColor] ${report.risk_score > 50 ? 'bg-red-500' : 'bg-emerald-500'}`} 
                                                    style={{ width: `${report.risk_score}%` }}
                                                ></div>
                                            </div>
                                        </div>
                                    </td>

                                    {/* Timestamp */}
                                    <td className="py-4 px-8 text-right">
                                        <div className="flex items-center justify-end gap-2 text-zinc-500 group-hover:text-zinc-300">
                                            <span className="text-[11px] font-mono opacity-70">{report.timestamp}</span>
                                        </div>
                                    </td>
                                </motion.tr>
                            ))}
                        </tbody>
                    </table>
                )}
            </div>
            
            {/* Cyber Footer Bar */}
            <div className="h-1 w-full bg-gradient-to-r from-red-600 via-emerald-600 to-blue-600 opacity-50"></div>
        </div>
        
        {/* Style Injection for Animations */}
        <style>{`
            @keyframes scanline {
                0% { background-position: 0% 0%; }
                100% { background-position: 0% 100%; }
            }
            .animate-scanline {
                background: linear-gradient(to bottom, transparent 0%, rgba(16, 185, 129, 0.1) 50%, transparent 100%);
                background-size: 100% 200%;
                animation: scanline 3s linear infinite;
            }
            .animate-spin-reverse {
                animation: spin-reverse 1s linear infinite;
            }
            @keyframes spin-reverse {
                from { transform: rotate(360deg); }
                to { transform: rotate(0deg); }
            }
        `}</style>
      </div>
    </div>
  );
};

export default ThreatDatabase;