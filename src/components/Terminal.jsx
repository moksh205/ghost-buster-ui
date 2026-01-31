import React, { useEffect, useRef } from 'react';
import { Terminal as TerminalIcon, Radio } from 'lucide-react';

export default function Terminal({ logs, isScanning }) {
  const scrollRef = useRef(null);

  // Auto-scroll to bottom on new logs
  useEffect(() => {
    if (scrollRef.current) {
      scrollRef.current.scrollTo({
        top: scrollRef.current.scrollHeight,
        behavior: 'smooth'
      });
    }
  }, [logs]);

  return (
    <div 
      ref={scrollRef} 
      className="relative h-full w-full bg-[#050505] overflow-y-auto font-mono custom-scrollbar selection:bg-emerald-500/30"
    >
      {/* 1. Glass Sticky Header */}
      <div className="sticky top-0 z-10 flex items-center justify-between bg-black/80 backdrop-blur-md px-4 py-3 border-b border-white/5">
        <div className="flex items-center gap-2 text-[10px] font-black text-emerald-500 tracking-[0.2em] uppercase italic">
          <Radio size={12} className={isScanning ? "animate-pulse" : ""} /> 
          LIVE_SATELLITE_FEED
        </div>
        <div className="flex gap-1.5">
          <div className="w-1.5 h-1.5 rounded-full bg-zinc-800" />
          <div className="w-1.5 h-1.5 rounded-full bg-zinc-800" />
        </div>
      </div>

      {/* 2. Main Log Content */}
      <div className="p-6 space-y-2 relative">
        {/* Vertical Accent Line */}
        <div className="absolute left-0 top-0 bottom-0 w-[2px] bg-emerald-500/10 ml-4" />

        {logs.map((log, i) => (
          <div key={i} className="flex gap-3 pl-4 animate-in fade-in slide-in-from-left-2 duration-300">
            <span className="text-emerald-900 font-bold select-none">❯</span>
            <p className="text-xs md:text-sm text-zinc-300 leading-relaxed tracking-wide break-all">
              {log}
            </p>
          </div>
        ))}

        {/* 3. Animated Cursor */}
        {isScanning && (
          <div className="flex gap-3 pl-4 items-center">
            <span className="text-emerald-500 font-bold animate-pulse">❯</span>
            <div className="w-2 h-4 bg-emerald-500 shadow-[0_0_8px_#10b981] animate-pulse" />
          </div>
        )}
      </div>

      {/* 4. Bottom Fade Overlay */}
      <div className="sticky bottom-0 left-0 w-full h-8 bg-gradient-to-t from-black to-transparent pointer-events-none" />
    </div>
  );
}