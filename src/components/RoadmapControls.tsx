// ==========================================
// SECTION 3: ROADMAP CONTROLS COMPONENT
// ==========================================
// Provides functional filtering and view switching:
// 1. Search bar for instant text matching
// 2. Region filters (Lagos, Abuja, Corridor, Pan-Nigeria)
// 3. Status filters (All, Completed, In Progress, Planned)
// 4. Sector dropdown filter
// 5. Timeline vs Grid view toggles

import React from 'react';
import { 
  Search, 
  X, 
  MapPin, 
  Layers, 
  LayoutGrid, 
  GitCommitVertical, 
  Filter 
} from 'lucide-react';
import type { 
  FilterState, 
  NigeriaRegion, 
  NigeriaSector, 
  RoadmapStatus, 
  ViewMode 
} from '../types/roadmap';

interface RoadmapControlsProps {
  filters: FilterState;
  onFilterChange: (filters: FilterState) => void;
  viewMode: ViewMode;
  onViewModeChange: (mode: ViewMode) => void;
  matchedCount: number;
}

// Available filter options
const REGIONS: { label: string; value: NigeriaRegion }[] = [
  { label: 'All Regions', value: 'All' },
  { label: 'Lagos', value: 'Lagos' },
  { label: 'Abuja', value: 'Abuja' },
  { label: 'Lagos-Abuja Corridor', value: 'Lagos-Abuja Corridor' },
  { label: 'Pan-Nigeria', value: 'Pan-Nigeria' },
];

const STATUSES: { label: string; value: 'all' | RoadmapStatus }[] = [
  { label: 'All Statuses', value: 'all' },
  { label: 'Completed', value: 'completed' },
  { label: 'In Progress', value: 'in-progress' },
  { label: 'Planned', value: 'planned' },
];

const SECTORS: NigeriaSector[] = [
  'Transport & Mobility',
  'Fintech & Naira Payments',
  'Infrastructure & Clean Energy',
  'Tech Hubs & Innovation',
  'Commerce & Logistics',
  'Civic & FCT Services',
];

export const RoadmapControls: React.FC<RoadmapControlsProps> = ({
  filters,
  onFilterChange,
  viewMode,
  onViewModeChange,
  matchedCount,
}) => {
  // Update a single filter field helper
  const handleUpdate = <K extends keyof FilterState>(key: K, value: FilterState[K]) => {
    onFilterChange({ ...filters, [key]: value });
  };

  // Reset all active filters
  const handleResetFilters = () => {
    onFilterChange({
      status: 'all',
      region: 'All',
      sector: 'all',
      searchQuery: '',
    });
  };

  const hasActiveFilters = 
    filters.status !== 'all' || 
    filters.region !== 'All' || 
    filters.sector !== 'all' || 
    filters.searchQuery.trim() !== '';

  return (
    <div className="mb-4 p-3 sm:p-4 rounded-xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 shadow-sm space-y-2.5">
      
      {/* ------------------------------------------ */}
      {/* ROW 1: SEARCH & VIEW MODE TOGGLE           */}
      {/* ------------------------------------------ */}
      <div className="flex flex-col sm:flex-row items-stretch sm:items-center justify-between gap-2">
        
        {/* Search Bar */}
        <div className="relative flex-1">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-3.5 h-3.5 text-slate-400" />
          <input
            type="text"
            placeholder="Search Lagos, Abuja, Yaba, Metro, USSD, Lekki..."
            value={filters.searchQuery}
            onChange={(e) => handleUpdate('searchQuery', e.target.value)}
            className="w-full pl-9 pr-8 py-1.5 rounded-lg text-xs bg-slate-50 dark:bg-slate-800/60 border border-slate-200 dark:border-slate-700 text-slate-800 dark:text-slate-100 placeholder-slate-400 focus:outline-none focus:ring-1 focus:ring-emerald-500/30 focus:border-emerald-500 transition-all"
          />
          {filters.searchQuery && (
            <button
              onClick={() => handleUpdate('searchQuery', '')}
              className="absolute right-2.5 top-1/2 -translate-y-1/2 text-slate-400 hover:text-slate-600 dark:hover:text-slate-200 cursor-pointer"
            >
              <X className="w-3.5 h-3.5" />
            </button>
          )}
        </div>

        {/* View Mode Toggle (Timeline vs Grid) */}
        <div className="flex items-center self-end sm:self-auto bg-slate-100 dark:bg-slate-800 p-0.5 rounded-lg border border-slate-200 dark:border-slate-700">
          <button
            onClick={() => onViewModeChange('timeline')}
            type="button"
            className={`flex items-center gap-1 px-2.5 py-1 rounded-md text-xs font-semibold transition-all cursor-pointer ${
              viewMode === 'timeline'
                ? 'bg-white dark:bg-slate-700 text-slate-900 dark:text-white shadow-xs'
                : 'text-slate-500 dark:text-slate-400 hover:text-slate-800 dark:hover:text-slate-200'
            }`}
          >
            <GitCommitVertical className="w-3 h-3" />
            <span>Timeline</span>
          </button>
          <button
            onClick={() => onViewModeChange('grid')}
            type="button"
            className={`flex items-center gap-1 px-2.5 py-1 rounded-md text-xs font-semibold transition-all cursor-pointer ${
              viewMode === 'grid'
                ? 'bg-white dark:bg-slate-700 text-slate-900 dark:text-white shadow-xs'
                : 'text-slate-500 dark:text-slate-400 hover:text-slate-800 dark:hover:text-slate-200'
            }`}
          >
            <LayoutGrid className="w-3 h-3" />
            <span>Grid</span>
          </button>
        </div>
      </div>

      {/* ------------------------------------------ */}
      {/* ROW 2: REGION FILTER BUTTONS (LAGOS/ABUJA) */}
      {/* ------------------------------------------ */}
      <div className="flex flex-wrap items-center gap-1.5 pt-1.5 border-t border-slate-100 dark:border-slate-800">
        <span className="text-[11px] font-medium text-slate-400 flex items-center gap-1 mr-1">
          <MapPin className="w-3 h-3 text-emerald-500" />
          Location:
        </span>
        {REGIONS.map((r) => {
          const isSelected = filters.region === r.value;
          return (
            <button
              key={r.value}
              onClick={() => handleUpdate('region', r.value)}
              className={`px-2.5 py-0.5 rounded-md text-xs font-medium transition-all cursor-pointer ${
                isSelected
                  ? 'bg-gradient-to-r from-emerald-500 to-teal-600 text-white shadow-xs'
                  : 'bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-300 hover:bg-slate-200 dark:hover:bg-slate-700'
              }`}
            >
              {r.label}
            </button>
          );
        })}
      </div>

      {/* ------------------------------------------ */}
      {/* ROW 3: STATUS & SECTOR DROPDOWN FILTERS    */}
      {/* ------------------------------------------ */}
      <div className="flex flex-wrap items-center justify-between gap-2 pt-1.5 border-t border-slate-100 dark:border-slate-800 text-xs">
        
        {/* Status Pills */}
        <div className="flex flex-wrap items-center gap-1">
          <span className="text-[11px] text-slate-400 mr-1 flex items-center gap-1">
            <Filter className="w-3 h-3" />
            Status:
          </span>
          {STATUSES.map((s) => {
            const isSelected = filters.status === s.value;
            return (
              <button
                key={s.value}
                onClick={() => handleUpdate('status', s.value)}
                className={`px-2 py-0.5 rounded-md text-[11px] transition-all cursor-pointer ${
                  isSelected
                    ? 'bg-slate-900 dark:bg-white text-white dark:text-slate-900 font-semibold'
                    : 'text-slate-600 dark:text-slate-400 hover:bg-slate-100 dark:hover:bg-slate-800'
                }`}
              >
                {s.label}
              </button>
            );
          })}
        </div>

        {/* Sector Dropdown & Reset */}
        <div className="flex items-center gap-1.5">
          {/* Sector Select */}
          <div className="flex items-center gap-1">
            <Layers className="w-3 h-3 text-slate-400" />
            <select
              value={filters.sector}
              onChange={(e) => handleUpdate('sector', e.target.value as any)}
              className="py-0.5 px-2 rounded-md bg-slate-100 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 text-slate-700 dark:text-slate-200 text-xs focus:outline-none cursor-pointer"
            >
              <option value="all">All Sectors</option>
              {SECTORS.map((sec) => (
                <option key={sec} value={sec}>
                  {sec}
                </option>
              ))}
            </select>
          </div>

          {/* Reset button if active */}
          {hasActiveFilters && (
            <button
              onClick={handleResetFilters}
              className="text-[11px] text-rose-500 hover:text-rose-600 font-medium underline underline-offset-2 ml-1 cursor-pointer"
            >
              Reset
            </button>
          )}

          {/* Matched Count badge */}
          <span className="ml-1 px-1.5 py-0.2 rounded-full bg-slate-100 dark:bg-slate-800 text-slate-500 text-[10px] font-mono">
            {matchedCount} items
          </span>
        </div>

      </div>

    </div>
  );
};
