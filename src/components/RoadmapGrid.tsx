// ==========================================
// SECTION 6: ROADMAP GRID COMPONENT
// ==========================================
// Renders the responsive Grid / Board View:
// 1. Multi-column layout (1 col mobile, 2 col tablet, 3 col desktop)
// 2. Ideal for broad visual scanning of Lagos & Abuja milestones

import React from 'react';
import { Milestone } from 'lucide-react';
import type { RoadmapItem, RoadmapStatus } from '../types/roadmap';
import { RoadmapCard } from './RoadmapCard';

interface RoadmapGridProps {
  items: RoadmapItem[];
  onToggleTask: (itemId: string, taskId: string) => void;
  onChangeStatus: (itemId: string, nextStatus: RoadmapStatus) => void;
  onVote: (itemId: string) => void;
}

export const RoadmapGrid: React.FC<RoadmapGridProps> = ({
  items,
  onToggleTask,
  onChangeStatus,
  onVote,
}) => {
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
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
      {items.map((item) => (
        <RoadmapCard
          key={item.id}
          item={item}
          onToggleTask={onToggleTask}
          onChangeStatus={onChangeStatus}
          onVote={onVote}
        />
      ))}
    </div>
  );
};
