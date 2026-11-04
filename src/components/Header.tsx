// ==========================================
// SECTION 1: HEADER COMPONENT (NIGERIA EDITION)
// ==========================================
// This component displays the top hero section:
// - Highlights Lagos & Abuja strategic development
// - Nigerian green and vibrant gradient accent styling
// - Real-time counters for Lagos, Abuja, and completed milestones
// - Button to launch the "+ Add Milestone" modal

import React from 'react';
import { MapPin, Plus, Sparkles, Train, Building2, Zap } from 'lucide-react';

interface HeaderProps {
  onOpenAddModal: () => void;
  totalMilestones: number;
  completedMilestones: number;
  lagosCount: number;
  abujaCount: number;
}

export const Header: React.FC<HeaderProps> = ({
  onOpenAddModal,
  totalMilestones,
  completedMilestones,
  lagosCount,
  abujaCount,
}) => {
  return (
    <header className="relative overflow-hidden rounded-2xl bg-slate-900 text-white shadow-xl p-4 sm:p-6 mb-4 border border-slate-800">
      {/* Background Gradient Ambience (Nigerian Emerald & Electric Violet Glow) */}
      <div className="absolute -top-24 -left-24 w-60 h-60 bg-emerald-500/20 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute -bottom-24 -right-24 w-60 h-60 bg-purple-500/20 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute top-1/3 right-1/4 w-52 h-52 bg-cyan-500/10 rounded-full blur-3xl pointer-events-none" />

      {/* Hero Content */}
      <div className="relative z-10 flex flex-col lg:flex-row lg:items-center lg:justify-between gap-4">
        
        {/* Left Side: Headline & Regional Context */}
        <div className="flex-1 space-y-2">
          
          {/* Top Pill / Badge */}
          <div className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full text-[11px] font-semibold bg-gradient-to-r from-emerald-500/20 via-teal-500/20 to-green-500/20 text-emerald-300 border border-emerald-500/30">
            <span className="flex h-1.5 w-1.5 relative">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
              <span className="relative inline-flex rounded-full h-1.5 w-1.5 bg-emerald-500"></span>
            </span>
            <Sparkles className="w-3 h-3 text-emerald-400" />
            <span>Nigeria Strategic Rollout • Lagos & Abuja Focus</span>
          </div>

          {/* Main Gradient Headline */}
          <h1 className="text-2xl sm:text-3xl lg:text-4xl font-extrabold tracking-tight leading-tight">
            Nigeria Infrastructure & Tech{' '}
            <span className="bg-gradient-to-r from-emerald-400 via-teal-300 to-cyan-400 bg-clip-text text-transparent">
              Roadmap 2026
            </span>
          </h1>

          {/* Subtitle / Description */}
          <p className="text-slate-300 text-xs sm:text-sm leading-relaxed max-w-4xl">
            A real-time, interactive blueprint for high-impact transit, fintech, clean energy, and tech hub deployments across <span className="text-emerald-300 font-medium">Lagos</span>, <span className="text-purple-300 font-medium">Abuja</span>, and interstate corridors.
          </p>

          {/* Regional Quick Metrics Badges */}
          <div className="flex flex-wrap items-center gap-2 pt-1 text-[11px]">
            {/* Lagos Hub Tag */}
            <div className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-md bg-blue-500/10 text-blue-300 border border-blue-500/20">
              <Train className="w-3 h-3 text-blue-400" />
              <span className="font-semibold">{lagosCount}</span> Lagos Initiatives
            </div>

            {/* Abuja Hub Tag */}
            <div className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-md bg-purple-500/10 text-purple-300 border border-purple-500/20">
              <Building2 className="w-3 h-3 text-purple-400" />
              <span className="font-semibold">{abujaCount}</span> Abuja Initiatives
            </div>

            {/* Total Milestones */}
            <div className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-md bg-slate-800 text-slate-300 border border-slate-700">
              <MapPin className="w-3 h-3 text-emerald-400" />
              <span>{totalMilestones} Milestones</span>
            </div>

            {/* Completed */}
            <div className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-md bg-emerald-500/10 text-emerald-300 border border-emerald-500/20">
              <Zap className="w-3 h-3 text-emerald-400" />
              <span>{completedMilestones} Operational</span>
            </div>
          </div>
        </div>

        {/* Right Side: Action Button */}
        <div className="flex items-center pt-1 lg:pt-0">
          <button
            onClick={onOpenAddModal}
            type="button"
            className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-4 py-2 rounded-xl font-semibold text-xs text-slate-900 bg-gradient-to-r from-emerald-400 via-teal-300 to-cyan-300 hover:from-emerald-300 hover:to-cyan-200 shadow-md shadow-emerald-500/20 transition-all duration-200 active:scale-95 cursor-pointer"
          >
            <Plus className="w-3.5 h-3.5 stroke-[2.5]" />
            <span>Add Milestone</span>
          </button>
        </div>

      </div>
    </header>
  );
};
