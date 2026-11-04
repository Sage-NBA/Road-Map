// ==========================================
// SECTION 5: ROADMAP TIMELINE COMPONENT
// ==========================================
// Renders the chronological Timeline View:
// 1. Grouped by Quarter & Phase
// 2. Connected vertical line with gradient styling
// 3. Status node indicators (completed checkmark, in-progress pulse, planned dot)
// 4. Milestone cards placed along the timeline

import React from 'react';
import { 
  Calendar, 
  CheckCircle2, 
  Clock, 
  Compass, 
  Milestone 
} from 'lucide-react';
import type { RoadmapItem, RoadmapStatus } from '../types/roadmap';
import { RoadmapCard } from './RoadmapCard';

interface RoadmapTimelineProps {
  items: RoadmapItem[];
  onToggleTask: (itemId: string, taskId: string) => void;
  onChangeStatus: (itemId: string, nextStatus: RoadmapStatus) => void;
  onVote: (itemId: string) => void;
}

export const RoadmapTimeline: React.FC<RoadmapTimelineProps> = ({
  items,
  onToggleTask,
  onChangeStatus,
  onVote,
}) => {
  // Group items by Quarter (e.g. 'Q1 2026', 'Q2 2026', etc.)
  const quarters = Array.from(new Set(items.map((i) => i.quarter)));

  if (items.length === 0) {
    return (
      <div className="text-center py-16 px-4 rounded-3xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800">
        <Milestone className="w-12 h-12 text-slate-300 dark:text-slate-600 mx-auto mb-3" />
        <h3 className="text-lg font-bold text-slate-700 dark:text-slate-200">No milestones found</h3>
        <p className="text-sm text-slate-500 max-w-sm mx-auto mt-1">
          Try adjusting your search query, region filter, or sector filter to see matching milestones.
        </p>
      </div>
    );
  }

  return (
    <div className="space-y-6 sm:space-y-8">
      {quarters.map((quarter) => {
        const quarterItems = items.filter((i) => i.quarter === quarter);
        const phaseName = quarterItems[0]?.phase || 'Development Phase';

        return (
          <section key={quarter} className="relative">
            
            {/* ------------------------------------------ */}
            {/* QUARTER / PHASE HEADER BADGE               */}
            {/* ------------------------------------------ */}
            <div className="sticky top-2 z-20 flex items-center gap-2.5 mb-3">
              <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-bold tracking-wide text-white bg-gradient-to-r from-slate-900 to-slate-800 dark:from-slate-800 dark:to-slate-700 shadow-sm border border-slate-700">
                <Calendar className="w-3 h-3 text-emerald-400" />
                <span>{quarter}</span>
                <span className="text-slate-400 font-normal">•</span>
                <span className="text-slate-300 font-medium">{phaseName}</span>
              </div>
              <div className="h-px flex-1 bg-gradient-to-r from-slate-300 dark:from-slate-700 to-transparent" />
            </div>

            {/* ------------------------------------------ */}
            {/* VERTICAL TIMELINE CONTAINER                */}
            {/* ------------------------------------------ */}
            <div className="relative pl-5 sm:pl-7 space-y-3.5">
              
              {/* Vertical Gradient Connecting Line */}
              <div className="absolute left-2 sm:left-3 top-2 bottom-2 w-0.5 bg-gradient-to-b from-emerald-500 via-teal-500 to-cyan-500 rounded-full" />

              {quarterItems.map((item) => {
                // Determine timeline indicator node
                const renderNodeIcon = () => {
                  if (item.status === 'completed') {
                    return (
                      <div className="w-5 h-5 rounded-full bg-emerald-500 text-white flex items-center justify-center ring-3 ring-emerald-500/20 shadow-xs">
                        <CheckCircle2 className="w-3 h-3" />
                      </div>
                    );
                  }
                  if (item.status === 'in-progress') {
                    return (
                      <div className="w-5 h-5 rounded-full bg-blue-500 text-white flex items-center justify-center ring-3 ring-blue-500/20 shadow-xs animate-pulse">
                        <Clock className="w-3 h-3" />
                      </div>
                    );
                  }
                  return (
                    <div className="w-5 h-5 rounded-full bg-slate-300 dark:bg-slate-700 text-slate-700 dark:text-slate-300 flex items-center justify-center ring-3 ring-slate-400/20">
                      <Compass className="w-3 h-3" />
                    </div>
                  );
                };

                return (
                  <div key={item.id} className="relative group">
                    {/* Node on the vertical timeline */}
                    <div className="absolute -left-5 sm:-left-7 top-4 -translate-x-1/2 z-10">
                      {renderNodeIcon()}
                    </div>

                    {/* Milestone Card */}
                    <RoadmapCard
                      item={item}
                      onToggleTask={onToggleTask}
                      onChangeStatus={onChangeStatus}
                      onVote={onVote}
                    />
                  </div>
                );
              })}
            </div>

          </section>
        );
      })}
    </div>
  );
};
