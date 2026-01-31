import React, { useState } from 'react';
import { Skull, Copy, RefreshCw, Radio, Check } from 'lucide-react';

export default function BaitGenerator({ onGenerate }) {
  const [bait, setBait] = useState(null);
  const [copied, setCopied] = useState(null); 

  const handleGenerate = () => {
    // Call the function passed from App.jsx
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
    <div className="bg-zinc-900 border-2 border-purple-900 p-6 glow-purple animate-in slide-in-from-bottom-10 duration-500 font-mono">
      <div className="flex justify-between items-start mb-4">
        <h3 className="text-purple-500 font-black text-xs flex items-center gap-2 tracking-widest italic">
          <Skull size={16} className="animate-pulse" /> RADIOACTIVE_BAIT_ACTIVE
        </h3>
        {bait && <span className="text-[10px] text-purple-800 font-mono">ID: #{bait.id}</span>}
      </div>

      {!bait ? (
        <button 
          onClick={handleGenerate}
          className="w-full bg-purple-900/20 border border-purple-500 py-4 text-purple-400 font-bold text-xs hover:bg-purple-500 hover:text-black transition-all flex items-center justify-center gap-2"
        >
          <Radio size={14} /> GENERATE POISONED CREDENTIALS
        </button>
      ) : (
        <div className="space-y-4 font-mono">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            
            {/* Username Box */}
            <div 
              onClick={() => copyToClipboard(bait.user, 'user')}
              className="bg-black border border-purple-900 p-3 flex justify-between items-center group cursor-pointer hover:border-purple-400 hover:bg-purple-900/10 transition-colors"
            >
               <div className="flex flex-col">
                 <span className="text-[10px] text-purple-800 font-bold mb-1 uppercase tracking-tighter">Toxic_Username</span>
                 <span className="text-sm text-purple-200">{bait.user}</span>
               </div>
               {copied === 'user' ? <Check size={16} className="text-green-500" /> : <Copy size={16} className="text-purple-600 group-hover:text-purple-300" />}
            </div>

            {/* Password Box */}
            <div 
              onClick={() => copyToClipboard(bait.pass, 'pass')}
              className="bg-black border border-purple-900 p-3 flex justify-between items-center group cursor-pointer hover:border-purple-400 hover:bg-purple-900/10 transition-colors"
            >
               <div className="flex flex-col">
                 <span className="text-[10px] text-purple-800 font-bold mb-1 uppercase tracking-tighter">Poison_Password</span>
                 <span className="text-sm text-purple-200">{bait.pass}</span>
               </div>
               {copied === 'pass' ? <Check size={16} className="text-green-500" /> : <Copy size={16} className="text-purple-600 group-hover:text-purple-300" />}
            </div>
          </div>

          <button onClick={handleGenerate} className="w-full text-center py-2 text-xs text-purple-700 underline flex items-center justify-center gap-2 hover:text-purple-400">
            <RefreshCw size={12} /> REGENERATE_NEW_LOAD
          </button>
        </div>
      )}
    </div>
  );
}