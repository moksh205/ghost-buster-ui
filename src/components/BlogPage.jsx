import React from 'react';
import { Bug, ShieldCheck } from 'lucide-react';

// Reusable Card Component for consistent styling
const BlogCard = ({ icon: Icon, title, description, children, iconColor = "text-red-500", borderColor = "border-red-500/20" }) => {
  return (
    <div className={`relative group rounded-3xl border ${borderColor} bg-[#09090b] p-6 md:p-8 transition-all duration-500 shadow-2xl border-zinc-800 hover:border-emerald-500/60 hover:shadow-[0_0_40px_rgba(16,185,129,0.3)]`}>
      <div className="flex items-start gap-6">
        <div className={`p-4 rounded-2xl border hidden md:block ${borderColor.replace('border', 'bg')}/10 ${borderColor}`}>
          <Icon className={`w-8 h-8 ${iconColor}`} />
        </div>
        <div className="space-y-4">
          <h2 className="text-2xl font-bold text-white flex items-center gap-3">
            <Icon className={`w-6 h-6 ${iconColor} md:hidden`} />
            {title}
          </h2>
          <p className="text-zinc-400 leading-relaxed">{description}</p>
          {children}
        </div>
      </div>
    </div>
  );
};

const BlogPage = () => {
  return (
    <div className="min-h-screen bg-transparent text-white py-12 px-4 sm:px-6 lg:px-8 relative overflow-hidden">
      {/* Background Elements */}
      <div className="fixed inset-0 z-0 pointer-events-none bg-[radial-gradient(circle_at_top,rgba(16,185,129,0.08)_0%,rgba(0,0,0,0)_80%)]" />
      <div className="absolute inset-0 bg-[url('https://grainy-gradients.vercel.app/noise.svg')] opacity-10 brightness-50 contrast-150 pointer-events-none"></div>

      <div className="max-w-4xl mx-auto space-y-12 relative z-10">
        {/* Header */}
        <div className="text-center space-y-4">
          <h1 className="text-4xl md:text-6xl font-black tracking-tighter uppercase text-white">
            <span className="text-emerald-500">Zero-Day</span> Knowledge Base
          </h1>
          <p className="text-zinc-400 text-lg max-w-2xl mx-auto">
            Understanding the mechanics of modern cyber-attacks and establishing defense protocols.
          </p>
        </div>

        {/* Section 1: Why Attacks Happen */}
        <BlogCard
          icon={Bug}
          title="Why Attacks Happen?"
          description="Attackers exploit trust, urgency, and fear to bypass human firewalls. It's often not about breaking the system, but breaking the person using it."
          iconColor="text-red-500"
          borderColor="border-red-500/20"
        >
          <ul className="space-y-3 mt-4">
            {[
              { title: "Social Engineering", desc: "Manipulating individuals into performing actions or divulging information." },
              { title: "Zero-Day Exploits", desc: "Targeting unknown vulnerabilities before developers can create a patch." },
              { title: "Credential Harvesting", desc: "Gathering login information through fake login pages or malware." },
            ].map((item, index) => (
              <li key={index} className="flex items-center gap-3 text-zinc-300 bg-zinc-900/50 p-3 rounded-lg border border-zinc-800">
                <span className="text-red-500 font-mono">0{index + 1}.</span>
                <span><strong>{item.title}:</strong> {item.desc}</span>
              </li>
            ))}
          </ul>
        </BlogCard>

        {/* Section 2: Defense Protocols */}
        <BlogCard
          icon={ShieldCheck}
          title="Defense Protocols"
          description="Security is an active, layered process. No single solution provides complete protection, so a defense-in-depth approach is crucial."
          iconColor="text-emerald-500"
          borderColor="border-emerald-500/20"
        >
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-4">
            {[
              { title: "Multi-Factor Auth", desc: "A critical layer that stops 99.9% of automated attacks." },
              { title: "Regular Updates", desc: "Patching software vulnerabilities before they can be exploited." },
              { title: "Phishing Training", desc: "Educating employees to recognize and report suspicious activity." },
              { title: "Endpoint Security", desc: "Using advanced EDR/XDR solutions to detect and block threats." },
            ].map((item, index) => (
              <div key={index} className="p-4 bg-emerald-500/5 border border-emerald-500/10 rounded-xl hover:bg-emerald-500/10 transition-colors">
                <h3 className="font-bold text-emerald-400 mb-2">{item.title}</h3>
                <p className="text-sm text-zinc-500">{item.desc}</p>
              </div>
            ))}
          </div>
        </BlogCard>
      </div>
      
      {/* Footer */}
      <div className="mt-20 py-8 text-center border-t border-zinc-900/50 relative z-10">
        <p className="text-zinc-700 text-xs">© 2026 CYBER-GHOST-BUSTER. All rights reserved. <span className="text-zinc-600">System V3.4.0</span></p>
      </div>
    </div>
  );
};

export default BlogPage;