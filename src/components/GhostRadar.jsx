import React from 'react';

export default function GhostRadar({ isScanning }) {
  return (
    <div className="relative w-32 h-32 border-2 border-green-900 rounded-full flex items-center justify-center bg-black overflow-hidden shadow-[0_0_15px_rgba(34,197,94,0.2)]">
      {/* Background Grid */}
      <div className="absolute inset-0 border-t border-green-900/30 top-1/2 w-full h-0" />
      <div className="absolute inset-0 border-l border-green-900/30 left-1/2 w-0 h-full" />
      <div className="absolute inset-0 border-2 border-green-900/20 rounded-full scale-50" />
      
      {/* Spinning Sweeper */}
      <div className={`absolute inset-0 bg-gradient-to-tr from-transparent via-transparent to-green-500/40 rounded-full ${isScanning ? 'animate-[spin_2s_linear_infinite]' : 'opacity-0'}`} />
      
      {/* Ghost Blips */}
      {isScanning && (
        <>
          <div className="absolute top-4 right-8 w-2 h-2 bg-green-400 rounded-full animate-pulse shadow-[0_0_8px_rgba(34,197,94,1)]" />
          <div className="absolute bottom-10 left-6 w-1 h-1 bg-purple-500 rounded-full animate-ping shadow-[0_0_8px_rgba(168,85,247,1)]" />
        </>
      )}

      <div className="z-10 text-[8px] font-bold text-green-900 tracking-tighter uppercase">Radar_V2</div>
    </div>
  );
}