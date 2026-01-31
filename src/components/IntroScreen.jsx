import React, { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { Ghost, Cpu, Zap, Lock } from "lucide-react"; 

const IntroScreen = ({ onEnter }) => {
  const [progress, setProgress] = useState(0);

  // AUTO-REDIRECT LOGIC
  useEffect(() => {
    // Fill the bar over 2 seconds
    const interval = setInterval(() => {
      setProgress((prev) => {
        if (prev >= 100) {
          clearInterval(interval);
          setTimeout(onEnter, 200); // Small delay at 100% before switch
          return 100;
        }
        return prev + 6;
      });
    }, 30); 

    return () => clearInterval(interval);
  }, [onEnter]);

  return (
    <motion.div
      initial={{ opacity: 1 }}
      exit={{ opacity: 0, scale: 1.1, filter: "blur(20px)" }} // Cool exit effect
      transition={{ duration: 0.8 }}
      className="fixed inset-0 z-50 flex flex-col items-center justify-center bg-black/90 backdrop-blur-xl font-sans"
    >
      {/* Background Grid */}
      <div className="absolute inset-0 bg-[linear-gradient(rgba(34,197,94,0.05)_1px,transparent_1px),linear-gradient(90deg,rgba(34,197,94,0.05)_1px,transparent_1px)] bg-[length:60px_60px] pointer-events-none" />

      <div className="z-10 relative flex flex-col items-center max-w-3xl w-full mx-4 text-center">
        
        {/* LOGO AREA - Ghost Icon is Back */}
        <motion.div 
          initial={{ y: 20, opacity: 0 }} 
          animate={{ y: 0, opacity: 1 }} 
          transition={{ duration: 0.6 }}
        >
            <div className="flex justify-center mb-6">
                <div className="p-4 bg-green-500/10 rounded-full border border-green-500/20 shadow-[0_0_30px_rgba(34,197,94,0.3)] animate-pulse">
                    <Ghost size={64} className="text-green-400" />
                </div>
            </div>
            
            {/* --- NAME: CYBER-GHOST-BUSTER --- */}
            <h1 className="text-4xl md:text-6xl font-black tracking-tight text-white mb-2 uppercase">
                CYBER-<span className="text-transparent bg-clip-text bg-gradient-to-r from-green-400 to-emerald-600">GHOST-BUSTER</span>
            </h1>
            
            <p className="text-green-100/60 text-lg md:text-xl font-light tracking-wide mb-10">
                Automated Phishing Defense System
            </p>
        </motion.div>

        {/* LOADING BAR CONTAINER */}
        <div className="w-full max-w-md space-y-2">
            
            {/* Progress Bar Track */}
            <div className="h-2 w-full bg-green-900/30 rounded-full overflow-hidden border border-green-900/50">
                {/* The Moving Bar */}
                <motion.div 
                    className="h-full bg-green-500 shadow-[0_0_15px_#22c55e]"
                    style={{ width: `${progress}%` }}
                />
            </div>

            {/* Loading Status Text */}
            <div className="flex justify-between text-[10px] font-mono text-green-500/80 uppercase tracking-widest">
                <span>{progress < 100 ? "Initializing Core..." : "System Ready"}</span>
                <span>{progress}%</span>
            </div>
        </div>

        {/* Feature Pills */}
        <motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: 0.5 }}
            transition={{ delay: 0.5 }}
            className="flex flex-wrap justify-center gap-4 mt-12 opacity-50"
        >
            <div className="flex items-center gap-2 text-[10px] font-bold text-green-700 uppercase tracking-widest">
                <Cpu size={12} /> AI Heuristics
            </div>
            <div className="flex items-center gap-2 text-[10px] font-bold text-green-700 uppercase tracking-widest">
                <Zap size={12} /> Live Scan
            </div>
            <div className="flex items-center gap-2 text-[10px] font-bold text-green-700 uppercase tracking-widest">
                <Lock size={12} /> Secure
            </div>
        </motion.div>

      </div>
    </motion.div>
  );
};

export default IntroScreen;