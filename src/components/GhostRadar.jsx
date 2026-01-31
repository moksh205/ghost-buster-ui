import React from 'react';

export default function GhostRadar({ isScanning }) {
  return (
    <div className="relative w-48 h-48 rounded-full flex items-center justify-center bg-[#050505] overflow-hidden border border-zinc-800/50 shadow-[inset_0_0_30px_rgba(16,185,129,0.05)] group">
      
      {/* 1. Static Radar Circles */}
      <div className="absolute inset-0 border border-emerald-500/10 rounded-full scale-[0.3]" />
      <div className="absolute inset-0 border border-emerald-500/10 rounded-full scale-[0.6]" />
      <div className="absolute inset-0 border border-emerald-500/10 rounded-full scale-[0.9]" />

      {/* 2. Tactical Crosshairs */}
      <div className="absolute w-full h-[1px] bg-emerald-500/20 top-1/2 -translate-y-1/2" />
      <div className="absolute h-full w-[1px] bg-emerald-500/20 left-1/2 -translate-x-1/2" />

      {/* 3. Sweeping Scanner Beam */}
      <div className={`absolute inset-0 bg-[conic-gradient(from_0deg,transparent_0deg,rgba(16,185,129,0.2)_90deg,transparent_91deg)] rounded-full ${isScanning ? 'animate-[spin_3s_linear_infinite]' : 'opacity-0'} transition-opacity duration-500`} />
      
      {/* 4. Scanning Overlay Glow */}
      {isScanning && (
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(16,185,129,0.05)_0%,transparent_70%)] animate-pulse" />
      )}

      {/* 5. Threat Blips */}
      {isScanning && (
        <>
          {/* Emerald Blip */}
          <div className="absolute top-[20%] right-[30%] w-2 h-2 bg-emerald-400 rounded-full animate-pulse shadow-[0_0_12px_#34d399]" />
          
          {/* Purple Threat Blip */}
          <div className="absolute bottom-[25%] left-[20%] w-1.5 h-1.5 bg-purple-500 rounded-full animate-ping shadow-[0_0_12px_#a855f7]" />
        </>
      )}

      {/* 6. Center Branding */}
      <div className="z-10 bg-black/80 px-2 py-1 rounded border border-zinc-800">
        <span className="text-[9px] font-black text-emerald-500/60 tracking-[0.2em] uppercase italic">
          Radar_V3
        </span>
      </div>

      {/* 7. Corner Indicators */}
      <div className="absolute top-2 right-4 text-[7px] font-mono text-zinc-700 font-bold uppercase tracking-widest">
        Dist: 0.4km
      </div>
    </div>
  );
}