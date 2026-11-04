// ==========================================
// SECTION 2: STATS OVERVIEW COMPONENT
// ==========================================
// Displays real-time progress metrics for the Nigerian roadmap:
// 1. Overall Completion Progress Bar with animated gradient
// 2. Metric cards with subtle gradient borders & icons
// 3. Status breakdown (Completed, In Progress, Planned)

import React from 'react';
import { CheckCircle2, Clock, Compass, Target, TrendingUp } from 'lucide-react';
import type { RoadmapItem } from '../types/roadmap';

interface StatsOverviewProps {
  items: RoadmapItem[];
}

export const StatsOverview: React.FC<StatsOverviewProps> = ({ items }) => {
  // Calculate milestone status counts
  const totalItems = items.length;
  const completedCount = items.filter((i) => i.status === 'completed').length;
  const inProgressCount = items.filter((i) => i.status === 'in-progress').length;
  const plannedCount = items.filter((i) => i.status === 'planned').length;

  // Calculate total subtasks completed across all milestones
  const allTasks = items.flatMap((i) => i.tasks);
  const totalTasksCount = allTasks.length;
  const completedTasksCount = allTasks.filter((t) => t.completed).length;

  // Overall percentage based on subtasks
  const overallPercentage = totalTasksCount > 0 
    ? Math.round((completedTasksCount / totalTasksCount) * 100) 
    : 0;

  return (
    <section className="mb-4 space-y-2.5">
      {/* ------------------------------------------ */}
      {/* OVERALL PROGRESS BAR CONTAINER             */}
      {/* ------------------------------------------ */}
      <div className="p-3.5 sm:p-4 rounded-xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 shadow-sm">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-1.5 mb-2">
          <div className="flex items-center gap-2">
            <div className="p-1.5 rounded-lg bg-emerald-500/10 text-emerald-600 dark:text-emerald-400">
              <TrendingUp className="w-4 h-4" />
            </div>
            <div>
              <h2 className="font-bold text-slate-800 dark:text-slate-100 text-sm">
                National Rollout Execution Velocity
              </h2>
              <p className="text-[11px] text-slate-500 dark:text-slate-400">
                {completedTasksCount} of {totalTasksCount} sub-initiatives executed across Lagos & Abuja
              </p>
            </div>
          </div>

          <div className="flex items-baseline gap-1">
            <span className="text-xl font-black bg-gradient-to-r from-emerald-600 via-teal-500 to-cyan-500 bg-clip-text text-transparent">
              {overallPercentage}%
            </span>
            <span className="text-[10px] font-semibold text-slate-400 uppercase tracking-wider">Achieved</span>
          </div>
        </div>

        {/* Gradient Progress Bar */}
        <div className="w-full h-2 bg-slate-100 dark:bg-slate-800 rounded-full overflow-hidden p-0.5 border border-slate-200/50 dark:border-slate-700/50">
          <div
            className="h-full rounded-full bg-gradient-to-r from-emerald-500 via-teal-400 to-cyan-400 transition-all duration-700 ease-out"
            style={{ width: `${overallPercentage}%` }}
          />
        </div>
      </div>

      {/* ------------------------------------------ */}
      {/* 4 SUMMARY STAT CARDS WITH GRADIENT THEMES  */}
      {/* ------------------------------------------ */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-2.5">
        
        {/* CARD 1: Total Milestones */}
        <div className="relative overflow-hidden p-3 rounded-xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 shadow-sm hover:border-slate-300 dark:hover:border-slate-700 transition-all">
          <div className="absolute top-0 right-0 w-16 h-16 bg-gradient-to-br from-indigo-500/10 to-transparent rounded-bl-full pointer-events-none" />
          <div className="flex items-center justify-between mb-1">
            <span className="text-[10px] font-semibold uppercase tracking-wider text-slate-500 dark:text-slate-400">
              Total Goals
            </span>
            <div className="p-1 rounded-lg bg-indigo-50 dark:bg-indigo-950/50 text-indigo-600 dark:text-indigo-400">
              <Target className="w-3.5 h-3.5" />
            </div>
          </div>
          <p className="text-xl sm:text-2xl font-extrabold text-slate-800 dark:text-slate-100">
            {totalItems}
          </p>
          <p className="text-[10px] text-slate-500 dark:text-slate-400">Across 4 Quarters</p>
        </div>

        {/* CARD 2: Completed (Green / Emerald Gradient) */}
        <div className="relative overflow-hidden p-3 rounded-xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 shadow-sm hover:border-emerald-500/40 transition-all">
          <div className="absolute top-0 right-0 w-16 h-16 bg-gradient-to-br from-emerald-500/10 to-transparent rounded-bl-full pointer-events-none" />
          <div className="flex items-center justify-between mb-1">
            <span className="text-[10px] font-semibold uppercase tracking-wider text-emerald-600 dark:text-emerald-400">
              Completed
            </span>
            <div className="p-1 rounded-lg bg-emerald-50 dark:bg-emerald-950/50 text-emerald-600 dark:text-emerald-400">
              <CheckCircle2 className="w-3.5 h-3.5" />
            </div>
          </div>
          <p className="text-xl sm:text-2xl font-extrabold text-emerald-600 dark:text-emerald-400">
            {completedCount}
          </p>
          <p className="text-[10px] text-slate-500 dark:text-slate-400">Live & Operational</p>
        </div>

        {/* CARD 3: In Progress (Blue / Cyan Gradient) */}
        <div className="relative overflow-hidden p-3 rounded-xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 shadow-sm hover:border-blue-500/40 transition-all">
          <div className="absolute top-0 right-0 w-16 h-16 bg-gradient-to-br from-blue-500/10 to-transparent rounded-bl-full pointer-events-none" />
          <div className="flex items-center justify-between mb-1">
            <span className="text-[10px] font-semibold uppercase tracking-wider text-blue-600 dark:text-blue-400">
              In Progress
            </span>
            <div className="p-1 rounded-lg bg-blue-50 dark:bg-blue-950/50 text-blue-600 dark:text-blue-400">
              <Clock className="w-3.5 h-3.5" />
            </div>
          </div>
          <p className="text-xl sm:text-2xl font-extrabold text-blue-600 dark:text-blue-400">
            {inProgressCount}
          </p>
          <p className="text-[10px] text-slate-500 dark:text-slate-400">Active deployment</p>
        </div>

        {/* CARD 4: Planned (Purple / Amber Gradient) */}
        <div className="relative overflow-hidden p-3 rounded-xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 shadow-sm hover:border-purple-500/40 transition-all">
          <div className="absolute top-0 right-0 w-16 h-16 bg-gradient-to-br from-purple-500/10 to-transparent rounded-bl-full pointer-events-none" />
          <div className="flex items-center justify-between mb-1">
            <span className="text-[10px] font-semibold uppercase tracking-wider text-purple-600 dark:text-purple-400">
              Planned
            </span>
            <div className="p-1 rounded-lg bg-purple-50 dark:bg-purple-950/50 text-purple-600 dark:text-purple-400">
              <Compass className="w-3.5 h-3.5" />
            </div>
          </div>
          <p className="text-xl sm:text-2xl font-extrabold text-purple-600 dark:text-purple-400">
            {plannedCount}
          </p>
          <p className="text-[10px] text-slate-500 dark:text-slate-400">Scheduled for rollout</p>
        </div>

      </div>
    </section>
  );
};
