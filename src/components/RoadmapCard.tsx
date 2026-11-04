// ==========================================
// SECTION 4: ROADMAP CARD COMPONENT
// ==========================================
// Renders an individual milestone card with:
// 1. Regional indicators (Lagos, Abuja, Pan-Nigeria)
// 2. Interactive task checklist (check/uncheck updates progress!)
// 3. Status switcher (Completed, In Progress, Planned)
// 4. Endorsement / Upvote button with live counter
// 5. Dynamic gradient progress bar

import React, { useState } from 'react';
import { 
  MapPin, 
  Calendar, 
  CheckCircle2, 
  Clock, 
  Compass, 
  ChevronDown, 
  ChevronUp, 
  ThumbsUp, 
  CheckSquare, 
  Square,
  Train,
  Building2,
  Globe2,
  Share2
} from 'lucide-react';
import type { RoadmapItem, RoadmapStatus } from '../types/roadmap';

interface RoadmapCardProps {
  item: RoadmapItem;
  onToggleTask: (itemId: string, taskId: string) => void;
  onChangeStatus: (itemId: string, nextStatus: RoadmapStatus) => void;
  onVote: (itemId: string) => void;
}

export const RoadmapCard: React.FC<RoadmapCardProps> = ({
  item,
  onToggleTask,
  onChangeStatus,
  onVote,
}) => {
  const [isTasksOpen, setIsTasksOpen] = useState(true);
  const [copied, setCopied] = useState(false);

  // Calculate task completion percentage
  const totalTasks = item.tasks.length;
  const completedTasks = item.tasks.filter((t) => t.completed).length;
  const percentComplete = totalTasks > 0 ? Math.round((completedTasks / totalTasks) * 100) : 0;

  // Next status toggle sequence
  const getNextStatus = (current: RoadmapStatus): RoadmapStatus => {
    if (current === 'planned') return 'in-progress';
    if (current === 'in-progress') return 'completed';
    return 'planned';
  };

  // Region Icon and Badge Color
  const getRegionIcon = () => {
    switch (item.region) {
      case 'Lagos':
        return <Train className="w-3.5 h-3.5 text-blue-500" />;
      case 'Abuja':
        return <Building2 className="w-3.5 h-3.5 text-purple-500" />;
      case 'Lagos-Abuja Corridor':
        return <MapPin className="w-3.5 h-3.5 text-amber-500" />;
      default:
        return <Globe2 className="w-3.5 h-3.5 text-emerald-500" />;
    }
  };

  // Status icon and color scheme
  const renderStatusBadge = () => {
    switch (item.status) {
      case 'completed':
        return (
          <span className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full text-xs font-semibold bg-emerald-500/15 text-emerald-700 dark:text-emerald-300 border border-emerald-500/30">
            <CheckCircle2 className="w-3 h-3 text-emerald-600 dark:text-emerald-400" />
            <span>Completed</span>
          </span>
        );
      case 'in-progress':
        return (
          <span className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full text-xs font-semibold bg-blue-500/15 text-blue-700 dark:text-blue-300 border border-blue-500/30">
            <Clock className="w-3 h-3 text-blue-600 dark:text-blue-400 animate-spin" />
            <span>In Progress</span>
          </span>
        );
      case 'planned':
        return (
          <span className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full text-xs font-semibold bg-purple-500/15 text-purple-700 dark:text-purple-300 border border-purple-500/30">
            <Compass className="w-3 h-3 text-purple-600 dark:text-purple-400" />
            <span>Planned</span>
          </span>
        );
    }
  };

  // Copy share link helper
  const handleShare = () => {
    navigator.clipboard?.writeText(window.location.href);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div
      className={`group relative overflow-hidden rounded-xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 p-3.5 sm:p-4 shadow-xs transition-all duration-300 ${item.gradientTheme.borderGlow}`}
    >
      {/* Top Gradient Ambient Accent */}
      <div 
        className={`absolute top-0 left-0 right-0 h-1 bg-gradient-to-r ${item.gradientTheme.progressGradient}`} 
      />

      {/* Card Header: Location & Status */}
      <div className="flex flex-wrap items-center justify-between gap-1.5 mb-2">
        {/* Region & Sector Badges */}
        <div className="flex flex-wrap items-center gap-1.5">
          <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded-md text-[11px] font-semibold bg-slate-100 dark:bg-slate-800 text-slate-700 dark:text-slate-200 border border-slate-200/60 dark:border-slate-700/60">
            {getRegionIcon()}
            <span>{item.region}</span>
          </span>

          <span className="px-1.5 py-0.5 rounded text-[10px] font-medium bg-slate-100 dark:bg-slate-800 text-slate-500 dark:text-slate-400">
            {item.sector}
          </span>
        </div>

        {/* Status Badge (Click to toggle status) */}
        <button
          onClick={() => onChangeStatus(item.id, getNextStatus(item.status))}
          title="Click to toggle status"
          className="transition-transform active:scale-95 cursor-pointer"
        >
          {renderStatusBadge()}
        </button>
      </div>

      {/* Landmark / Specific Location Detail */}
      <div className="flex items-center gap-1 text-[11px] text-slate-500 dark:text-slate-400 mb-1.5">
        <MapPin className="w-3 h-3 text-slate-400 flex-shrink-0" />
        <span className="font-medium text-slate-600 dark:text-slate-300">
          {item.locationDetails}
        </span>
      </div>

      {/* Title & Phase */}
      <div className="mb-1.5">
        <div className="text-[10px] font-mono font-semibold uppercase tracking-wider text-slate-400 mb-0.5">
          {item.phase} • {item.quarter}
        </div>
        <h3 className="text-base sm:text-lg font-bold text-slate-900 dark:text-slate-100 group-hover:text-emerald-600 dark:group-hover:text-emerald-400 transition-colors leading-snug">
          {item.title}
        </h3>
      </div>

      {/* Description */}
      <p className="text-xs text-slate-600 dark:text-slate-400 leading-relaxed mb-3">
        {item.description}
      </p>

      {/* ------------------------------------------ */}
      {/* PROGRESS BAR                               */}
      {/* ------------------------------------------ */}
      <div className="mb-2.5">
        <div className="flex items-center justify-between text-[11px] mb-1 font-medium">
          <span className="text-slate-500 dark:text-slate-400">
            Progress ({completedTasks}/{totalTasks} tasks)
          </span>
          <span className="font-bold text-slate-800 dark:text-slate-200">
            {percentComplete}%
          </span>
        </div>
        <div className="w-full h-1.5 rounded-full bg-slate-100 dark:bg-slate-800 overflow-hidden">
          <div
            className={`h-full rounded-full bg-gradient-to-r ${item.gradientTheme.progressGradient} transition-all duration-500 ease-out`}
            style={{ width: `${percentComplete}%` }}
          />
        </div>
      </div>

      {/* ------------------------------------------ */}
      {/* INTERACTIVE TASK CHECKLIST                 */}
      {/* ------------------------------------------ */}
      <div className="border-t border-slate-100 dark:border-slate-800 pt-2">
        <button
          onClick={() => setIsTasksOpen(!isTasksOpen)}
          type="button"
          className="w-full flex items-center justify-between py-0.5 text-[11px] font-semibold text-slate-700 dark:text-slate-300 hover:text-emerald-600 dark:hover:text-emerald-400 transition-colors cursor-pointer"
        >
          <span>Key Deliverables ({item.tasks.length})</span>
          {isTasksOpen ? <ChevronUp className="w-3.5 h-3.5" /> : <ChevronDown className="w-3.5 h-3.5" />}
        </button>

        {isTasksOpen && (
          <div className="mt-1.5 grid grid-cols-1 md:grid-cols-2 gap-1.5">
            {item.tasks.map((task) => (
              <button
                key={task.id}
                onClick={() => onToggleTask(item.id, task.id)}
                type="button"
                className="w-full flex items-start gap-2 text-left p-1.5 rounded-md bg-slate-50 dark:bg-slate-800/40 hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors cursor-pointer group/task"
              >
                <div className="pt-0.5 text-slate-400 group-hover/task:text-emerald-500 transition-colors flex-shrink-0">
                  {task.completed ? (
                    <CheckSquare className="w-3.5 h-3.5 text-emerald-500" />
                  ) : (
                    <Square className="w-3.5 h-3.5" />
                  )}
                </div>
                <span
                  className={`text-[11px] leading-snug transition-all ${
                    task.completed
                      ? 'line-through text-slate-400 dark:text-slate-500'
                      : 'text-slate-700 dark:text-slate-200'
                  }`}
                >
                  {task.title}
                </span>
              </button>
            ))}
          </div>
        )}
      </div>

      {/* ------------------------------------------ */}
      {/* CARD FOOTER: DATE, UPVOTE & SHARE          */}
      {/* ------------------------------------------ */}
      <div className="mt-2.5 pt-2 border-t border-slate-100 dark:border-slate-800 flex items-center justify-between text-xs text-slate-500">
        
        {/* Target Date */}
        <div className="flex items-center gap-1 text-[11px] text-slate-500 dark:text-slate-400">
          <Calendar className="w-3 h-3 text-slate-400" />
          <span>{item.targetDate}</span>
        </div>

        {/* Upvote & Share Actions */}
        <div className="flex items-center gap-1.5">
          {/* Endorse / Upvote */}
          <button
            onClick={() => onVote(item.id)}
            type="button"
            className={`inline-flex items-center gap-1 px-2 py-0.5 rounded-md text-[11px] font-medium transition-all cursor-pointer ${
              item.hasVoted
                ? 'bg-emerald-500 text-white shadow-xs'
                : 'bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-300 hover:bg-slate-200 dark:hover:bg-slate-700'
            }`}
          >
            <ThumbsUp className={`w-3 h-3 ${item.hasVoted ? 'fill-current' : ''}`} />
            <span>{item.votes}</span>
          </button>

          {/* Quick Share */}
          <button
            onClick={handleShare}
            type="button"
            title="Share roadmap link"
            className="p-1 rounded-md bg-slate-100 dark:bg-slate-800 text-slate-500 hover:text-slate-800 dark:hover:text-slate-200 transition-colors cursor-pointer"
          >
            <Share2 className="w-3 h-3" />
          </button>
        </div>

      </div>

      {/* Copied toast notification */}
      {copied && (
        <div className="absolute bottom-2 left-1/2 -translate-x-1/2 px-2.5 py-0.5 rounded-full bg-slate-900 text-white text-[10px] shadow-md animate-fade-in">
          Link copied!
        </div>
      )}

    </div>
  );
};
