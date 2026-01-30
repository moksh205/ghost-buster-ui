import React, { useEffect, useRef } from 'react';
import { Terminal as TerminalIcon } from 'lucide-react';

export default function Terminal({ logs, isScanning }) {
  const scrollRef = useRef(null);

  // This automatically scrolls to the bottom every time a new log is added
  useEffect(() => {
    if (scrollRef.current) {
      scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
    }
  }, [logs]);

  return (
    <div 
      ref={scrollRef} 
      className="bg-black border border-green-900 p-4 h-64 overflow-y-auto rounded shadow-inner scroll-smooth"
    >
      <div className="flex items-center gap-2 text-xs text-green-800 mb-3 sticky top-0 bg-black">
        <TerminalIcon size={14} /> LIVE_SATELLITE_FEED
      </div>
      {logs.map((log, i) => (
        <p key={i} className="text-sm mb-1 leading-relaxed">
          <span className="text-green-900">{'>'}</span> {log}
        </p>
      ))}
      {isScanning && (
        <div className="w-2 h-5 bg-green-500 animate-pulse inline-block ml-1" />
      )}
    </div>
  );
}