import React, { useState, useRef } from 'react';
import { Skull, Copy, RefreshCw, Radio, Check, Zap } from 'lucide-react';

export default function BaitGenerator({ onGenerate }) {
  const [bait, setBait] = useState(null);
  const [copied, setCopied] = useState(null);

  // Spotlight Logic
  const divRef = useRef(null);
  const [position, setPosition] = useState({ x: 0, y: 0 });
  const [opacity, setOpacity] = useState(0);

  const handleMouseMove = (e) => {
    if (!divRef.current) return;
    const rect = divRef.current.getBoundingClientRect();
    setPosition({ x: e.clientX - rect.left, y: e.clientY - rect.top });
  };

  const handleGenerate = () => {
    const newData = onGenerate();
    setBait({
      user: newData.email,
      pass: newData.password,
      id: Math.floor(Math.random() * 10000)
    });
    setCopied(null);
  };

  const copyToClipboard = (text, field) => {
    navigator.clipboard.writeText(text);
    setCopied(field);
    setTimeout(() => setCopied(null), 2000);
  };

  return (
    <div className="relative group rounded-3xl p-[1px] overflow-hidden">
      {/* Snake Border Effect (Purple for Threat Neutralization) */}
      <div className="absolute -inset-[1px] rounded-3xl opacity-0 group-hover:opacity-100 transition-opacity duration-500 bg-gradient-to-r from-transparent via-purple-500 to-transparent animate-snake-border blur-sm" />

      {/* Main Container */}
      <div 
        ref={divRef}
        onMouseMove={handleMouseMove}
        onMouseEnter={() => setOpacity(1)}
        onMouseLeave={() => setOpacity(0)}
        className="relative bg-zinc-950 border border-zinc-800 p-6 rounded-3xl shadow-2xl transition-all duration-300 group-hover:border-purple-500/30"
      >
        {/* Spotlight Effect */}
        <div
          className="pointer-events-none absolute -inset-px opacity-0 transition duration-300 z-0"
          style={{
            opacity,
            background: `radial-gradient(400px circle at ${position.x}px ${position.y}px, rgba(168, 85, 247, 0.1), transparent 40%)`,
          }}
        />

        <div className="relative z-10">
          {/* Header */}
          <div className="flex justify-between items-center mb-6">
            <h3 className="text-purple-400 font-bold text-[10px] flex items-center gap-2 tracking-[0.2em] uppercase">
              <Skull size={14} className="animate-pulse" /> Threat Neutralizer
            </h3>
            {bait && (
              <span className="text-[10px] text-zinc-600 font-mono bg-zinc-900 px-2 py-1 rounded border border-zinc-800">
                PAYLOAD_ID: #{bait.id}
              </span>
            )}
          </div>

          {!bait ? (
            <button 
              onClick={handleGenerate}
              className="w-full bg-purple-500/10 border border-purple-500/20 py-4 rounded-xl text-purple-400 font-bold text-xs hover:bg-purple-500 hover:text-black transition-all flex items-center justify-center gap-3 group/btn"
            >
              <Radio size={16} className="group-hover/btn:animate-spin" /> 
              GENERATE_POISONED_CREDENTIALS
            </button>
          ) : (
            <div className="space-y-4 animate-in fade-in slide-in-from-bottom-2 duration-300">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                
                {/* Username Box */}
                <div 
                  onClick={() => copyToClipboard(bait.user, 'user')}
                  className="bg-black border border-zinc-800 p-4 rounded-2xl flex justify-between items-center group/item cursor-pointer hover:border-purple-500/50 hover:bg-purple-500/5 transition-all"
                >
                   <div className="flex flex-col min-w-0">
                     <span className="text-[9px] text-zinc-500 font-bold mb-1 uppercase tracking-tighter">Decoy_User</span>
                     <span className="text-sm text-zinc-200 truncate pr-2 font-mono">{bait.user}</span>
                   </div>
                   <div className="shrink-0">
                    {copied === 'user' ? <Check size={16} className="text-emerald-500" /> : <Copy size={16} className="text-zinc-600 group-hover/item:text-purple-400 transition-colors" />}
                   </div>
                </div>

                {/* Password Box */}
                <div 
                  onClick={() => copyToClipboard(bait.pass, 'pass')}
                  className="bg-black border border-zinc-800 p-4 rounded-2xl flex justify-between items-center group/item cursor-pointer hover:border-purple-500/50 hover:bg-purple-500/5 transition-all"
                >
                   <div className="flex flex-col min-w-0">
                     <span className="text-[9px] text-zinc-500 font-bold mb-1 uppercase tracking-tighter">Toxic_Pass</span>
                     <span className="text-sm text-zinc-200 truncate pr-2 font-mono">{bait.pass}</span>
                   </div>
                   <div className="shrink-0">
                    {copied === 'pass' ? <Check size={16} className="text-emerald-500" /> : <Copy size={16} className="text-zinc-600 group-hover/item:text-purple-400 transition-colors" />}
                   </div>
                </div>
              </div>

              <div className="flex items-center gap-4">
                <button 
                  onClick={handleGenerate} 
                  className="flex-1 text-center py-3 rounded-xl bg-zinc-900 text-zinc-500 text-[10px] font-bold tracking-widest uppercase flex items-center justify-center gap-2 hover:bg-zinc-800 hover:text-purple-400 transition-all border border-zinc-800"
                >
                  <RefreshCw size={12} /> Cycle Payload
                </button>
                <div className="flex items-center gap-2 text-[10px] text-emerald-500/50 font-bold animate-pulse">
                  <Zap size={10} /> READY_TO_INJECT
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}