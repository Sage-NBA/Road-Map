// ==========================================
// SECTION 8: FOOTER COMPONENT
// ==========================================
// Renders the bottom section:
// 1. Status guide and color legend
// 2. Nigerian technology ecosystem tribute
// 3. Clean gradient border accents

import React from 'react';
import { CheckCircle2, Clock, Compass } from 'lucide-react';

export const Footer: React.FC = () => {
  return (
    <footer className="mt-8 pt-4 pb-6 border-t border-slate-200 dark:border-slate-800 text-xs text-slate-500">
      <div className="flex flex-col md:flex-row items-center justify-between gap-3">
        
        {/* Left: Info & Region Highlights */}
        <div className="space-y-0.5 text-center md:text-left">
          <p className="font-semibold text-slate-800 dark:text-slate-200 text-xs">
            Nigeria Infrastructure & Tech Roadmap (Lagos & Abuja)
          </p>
          <p className="text-slate-400 text-[11px]">
            Empowering Nigeria's commercial capital (Lagos) and federal capital (Abuja) with modern infrastructure.
          </p>
        </div>

        {/* Center / Right: Status Legend */}
        <div className="flex flex-wrap items-center justify-center gap-3 text-[11px]">
          <div className="flex items-center gap-1">
            <CheckCircle2 className="w-3 h-3 text-emerald-500" />
            <span className="text-slate-600 dark:text-slate-400">Completed</span>
          </div>
          <div className="flex items-center gap-1">
            <Clock className="w-3 h-3 text-blue-500" />
            <span className="text-slate-600 dark:text-slate-400">In Progress</span>
          </div>
          <div className="flex items-center gap-1">
            <Compass className="w-3 h-3 text-purple-500" />
            <span className="text-slate-600 dark:text-slate-400">Planned</span>
          </div>
        </div>

      </div>

      {/* Bottom Sub-credit */}
      <div className="mt-3 pt-3 border-t border-slate-100 dark:border-slate-800/60 flex items-center justify-center gap-1.5 text-slate-400 text-[10px]">
        <span>Crafted for high performance in Nigeria</span>
        <span>•</span>
        <span className="inline-flex items-center gap-1 text-emerald-600 dark:text-emerald-400 font-medium">
          Lagos <span className="text-slate-400">&</span> Abuja
        </span>
      </div>
    </footer>
  );
};
