// ==========================================
// SECTION 7: ADD MILESTONE MODAL
// ==========================================
// Interactive modal allowing users to create custom milestones
// for Lagos, Abuja, or corridor projects with:
// - Title & description
// - Location details (e.g., Ikeja, Wuse II, Maitama)
// - Region & Sector selectors
// - Subtasks checklist creation

import React, { useState } from 'react';
import { X, Plus, Sparkles } from 'lucide-react';
import type { 
  RoadmapItem, 
  NigeriaSector, 
  RoadmapStatus 
} from '../types/roadmap';

interface AddMilestoneModalProps {
  isOpen: boolean;
  onClose: () => void;
  onAdd: (newItem: RoadmapItem) => void;
}

export const AddMilestoneModal: React.FC<AddMilestoneModalProps> = ({
  isOpen,
  onClose,
  onAdd,
}) => {
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [region, setRegion] = useState<'Lagos' | 'Abuja' | 'Lagos-Abuja Corridor' | 'Pan-Nigeria'>('Lagos');
  const [sector, setSector] = useState<NigeriaSector>('Transport & Mobility');
  const [locationDetails, setLocationDetails] = useState('');
  const [quarter, setQuarter] = useState('Q2 2026');
  const [phase, setPhase] = useState('Phase 2: Growth & Expansion');
  const [targetDate, setTargetDate] = useState('Apr - Jun 2026');
  const [status, setStatus] = useState<RoadmapStatus>('planned');
  const [tasksInput, setTasksInput] = useState('');

  if (!isOpen) return null;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!title.trim() || !description.trim()) return;

    // Parse subtasks line by line
    const parsedTasks = tasksInput
      .split('\n')
      .map((t) => t.trim())
      .filter((t) => t.length > 0)
      .map((t, idx) => ({
        id: `custom-task-${Date.now()}-${idx}`,
        title: t,
        completed: false,
      }));

    // Choose gradient theme based on region
    const gradientTheme = region === 'Lagos'
      ? {
          badgeBg: 'bg-blue-500/15 text-blue-600 dark:text-blue-400 border border-blue-500/30',
          badgeText: 'text-blue-600 dark:text-blue-400',
          borderGlow: 'hover:border-blue-500/60 hover:shadow-blue-500/15',
          progressGradient: 'from-blue-600 to-cyan-500',
          iconGradient: 'from-blue-600 to-cyan-500',
          cardAccent: 'from-blue-500/20 via-transparent to-transparent',
        }
      : region === 'Abuja'
      ? {
          badgeBg: 'bg-purple-500/15 text-purple-600 dark:text-purple-400 border border-purple-500/30',
          badgeText: 'text-purple-600 dark:text-purple-400',
          borderGlow: 'hover:border-purple-500/60 hover:shadow-purple-500/15',
          progressGradient: 'from-purple-600 to-pink-500',
          iconGradient: 'from-purple-600 to-pink-500',
          cardAccent: 'from-purple-500/20 via-transparent to-transparent',
        }
      : {
          badgeBg: 'bg-emerald-500/15 text-emerald-600 dark:text-emerald-400 border border-emerald-500/30',
          badgeText: 'text-emerald-600 dark:text-emerald-400',
          borderGlow: 'hover:border-emerald-500/60 hover:shadow-emerald-500/15',
          progressGradient: 'from-emerald-500 via-teal-500 to-cyan-500',
          iconGradient: 'from-emerald-600 to-teal-500',
          cardAccent: 'from-emerald-500/20 via-transparent to-transparent',
        };

    const newItem: RoadmapItem = {
      id: `milestone-${Date.now()}`,
      title: title.trim(),
      description: description.trim(),
      quarter,
      phase,
      status,
      region,
      sector,
      locationDetails: locationDetails.trim() || (region === 'Lagos' ? 'Lagos Hub' : 'Abuja Hub'),
      targetDate: targetDate.trim() || '2026 Rollout',
      tasks: parsedTasks.length > 0 ? parsedTasks : [
        { id: `t-${Date.now()}-1`, title: 'Feasibility & engineering review', completed: false },
        { id: `t-${Date.now()}-2`, title: 'Public pilot deployment', completed: false },
      ],
      votes: 1,
      hasVoted: true,
      gradientTheme,
    };

    onAdd(newItem);
    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-3 bg-slate-950/70 backdrop-blur-sm animate-fade-in">
      <div className="relative w-full max-w-lg max-h-[92vh] overflow-y-auto rounded-2xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 shadow-2xl p-4 sm:p-5">
        
        {/* Close Button */}
        <button
          onClick={onClose}
          type="button"
          className="absolute right-4 top-4 p-1.5 rounded-lg text-slate-400 hover:text-slate-600 dark:hover:text-slate-200 hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors cursor-pointer"
        >
          <X className="w-4 h-4" />
        </button>

        {/* Modal Header */}
        <div className="mb-4">
          <div className="inline-flex items-center gap-1 px-2 py-0.5 rounded-full text-[11px] font-semibold bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 border border-emerald-500/20 mb-1">
            <Sparkles className="w-3 h-3" />
            <span>New Milestone Initiative</span>
          </div>
          <h2 className="text-lg sm:text-xl font-bold text-slate-900 dark:text-white">
            Add Roadmap Milestone
          </h2>
          <p className="text-[11px] sm:text-xs text-slate-500 dark:text-slate-400 mt-0.5">
            Specify goals, location landmarks in Lagos/Abuja, and deliverable subtasks.
          </p>
        </div>

        {/* Form Body */}
        <form onSubmit={handleSubmit} className="space-y-3">
          
          {/* Milestone Title */}
          <div>
            <label className="block text-[11px] font-semibold text-slate-700 dark:text-slate-300 mb-1">
              Milestone Title *
            </label>
            <input
              type="text"
              required
              placeholder="e.g. Lekki Deep Sea Port Smart Clearing API"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              className="w-full px-3 py-1.5 rounded-lg text-xs bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 text-slate-900 dark:text-slate-100 focus:outline-none focus:ring-1 focus:ring-emerald-500"
            />
          </div>

          {/* Description */}
          <div>
            <label className="block text-[11px] font-semibold text-slate-700 dark:text-slate-300 mb-1">
              Summary & Objectives *
            </label>
            <textarea
              required
              rows={2}
              placeholder="Detail what this milestone accomplishes and who it benefits..."
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              className="w-full px-3 py-1.5 rounded-lg text-xs bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 text-slate-900 dark:text-slate-100 focus:outline-none focus:ring-1 focus:ring-emerald-500 resize-none"
            />
          </div>

          {/* Region & Sector Row */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
            <div>
              <label className="block text-[11px] font-semibold text-slate-700 dark:text-slate-300 mb-1">
                Nigeria Location / Focus
              </label>
              <select
                value={region}
                onChange={(e) => setRegion(e.target.value as any)}
                className="w-full px-2.5 py-1.5 rounded-lg text-xs bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 text-slate-900 dark:text-slate-100"
              >
                <option value="Lagos">Lagos (Mainland & Island)</option>
                <option value="Abuja">Abuja (FCT & CBD)</option>
                <option value="Lagos-Abuja Corridor">Lagos-Abuja Corridor</option>
                <option value="Pan-Nigeria">Pan-Nigeria</option>
              </select>
            </div>

            <div>
              <label className="block text-[11px] font-semibold text-slate-700 dark:text-slate-300 mb-1">
                Sector / Domain
              </label>
              <select
                value={sector}
                onChange={(e) => setSector(e.target.value as any)}
                className="w-full px-2.5 py-1.5 rounded-lg text-xs bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 text-slate-900 dark:text-slate-100"
              >
                <option value="Transport & Mobility">Transport & Mobility</option>
                <option value="Fintech & Naira Payments">Fintech & Naira Payments</option>
                <option value="Infrastructure & Clean Energy">Infrastructure & Clean Energy</option>
                <option value="Tech Hubs & Innovation">Tech Hubs & Innovation</option>
                <option value="Commerce & Logistics">Commerce & Logistics</option>
                <option value="Civic & FCT Services">Civic & FCT Services</option>
              </select>
            </div>
          </div>

          {/* Location Specifics & Quarter */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
            <div>
              <label className="block text-[11px] font-semibold text-slate-700 dark:text-slate-300 mb-1">
                Landmarks / Areas
              </label>
              <input
                type="text"
                placeholder="e.g. Yaba, Marina, Wuse II"
                value={locationDetails}
                onChange={(e) => setLocationDetails(e.target.value)}
                className="w-full px-3 py-1.5 rounded-lg text-xs bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 text-slate-900 dark:text-slate-100"
              />
            </div>

            <div>
              <label className="block text-[11px] font-semibold text-slate-700 dark:text-slate-300 mb-1">
                Quarter Schedule
              </label>
              <select
                value={quarter}
                onChange={(e) => {
                  const q = e.target.value;
                  setQuarter(q);
                  if (q === 'Q1 2026') setPhase('Phase 1: Foundation');
                  else if (q === 'Q2 2026') setPhase('Phase 2: Growth & Collaboration');
                  else if (q === 'Q3 2026') setPhase('Phase 3: Scale & Ecosystem');
                  else setPhase('Phase 4: Enterprise Scale');
                }}
                className="w-full px-2.5 py-1.5 rounded-lg text-xs bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 text-slate-900 dark:text-slate-100"
              >
                <option value="Q1 2026">Q1 2026</option>
                <option value="Q2 2026">Q2 2026</option>
                <option value="Q3 2026">Q3 2026</option>
                <option value="Q4 2026">Q4 2026</option>
              </select>
            </div>
          </div>

          {/* Status & Target Window */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
            <div>
              <label className="block text-[11px] font-semibold text-slate-700 dark:text-slate-300 mb-1">
                Initial Status
              </label>
              <select
                value={status}
                onChange={(e) => setStatus(e.target.value as any)}
                className="w-full px-2.5 py-1.5 rounded-lg text-xs bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 text-slate-900 dark:text-slate-100"
              >
                <option value="planned">Planned</option>
                <option value="in-progress">In Progress</option>
                <option value="completed">Completed</option>
              </select>
            </div>

            <div>
              <label className="block text-[11px] font-semibold text-slate-700 dark:text-slate-300 mb-1">
                Target Date Window
              </label>
              <input
                type="text"
                placeholder="e.g. May - Jul 2026"
                value={targetDate}
                onChange={(e) => setTargetDate(e.target.value)}
                className="w-full px-3 py-1.5 rounded-lg text-xs bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 text-slate-900 dark:text-slate-100"
              />
            </div>
          </div>

          {/* Subtasks (one per line) */}
          <div>
            <label className="block text-[11px] font-semibold text-slate-700 dark:text-slate-300 mb-1">
              Subtasks / Key Deliverables (one per line)
            </label>
            <textarea
              rows={2}
              placeholder="Procure hardware&#10;Conduct on-site tests&#10;Launch public beta"
              value={tasksInput}
              onChange={(e) => setTasksInput(e.target.value)}
              className="w-full px-3 py-1.5 rounded-lg text-xs bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 text-slate-900 dark:text-slate-100 font-mono text-[11px] focus:outline-none focus:ring-1 focus:ring-emerald-500"
            />
          </div>

          {/* Buttons */}
          <div className="flex items-center justify-end gap-2 pt-2 border-t border-slate-100 dark:border-slate-800">
            <button
              onClick={onClose}
              type="button"
              className="px-3.5 py-1.5 rounded-lg text-xs font-semibold text-slate-600 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-800 cursor-pointer"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="inline-flex items-center gap-1.5 px-4 py-1.5 rounded-lg text-xs font-semibold text-slate-900 bg-gradient-to-r from-emerald-400 to-cyan-300 hover:from-emerald-300 hover:to-cyan-200 shadow-sm shadow-emerald-500/20 cursor-pointer"
            >
              <Plus className="w-3.5 h-3.5" />
              <span>Create Milestone</span>
            </button>
          </div>

        </form>

      </div>
    </div>
  );
};
