// ==========================================
// ROADMAP TYPES DEFINITION (NIGERIA EDITION)
// ==========================================
// Focus: Lagos & Abuja strategic development and rollout roadmap.
// This file defines all the data types used in the application.

export type RoadmapStatus = 'completed' | 'in-progress' | 'planned';

// Major locations in Nigeria with focus on Lagos and Abuja
export type NigeriaRegion = 'All' | 'Lagos' | 'Abuja' | 'Lagos-Abuja Corridor' | 'Pan-Nigeria';

// Key sectors for urban, tech, and economic development in Nigeria
export type NigeriaSector = 
  | 'Transport & Mobility'
  | 'Fintech & Naira Payments'
  | 'Infrastructure & Clean Energy'
  | 'Tech Hubs & Innovation'
  | 'Commerce & Logistics'
  | 'Civic & FCT Services';

export type ViewMode = 'timeline' | 'grid';

// Individual checklist task inside each milestone
export interface RoadmapSubtask {
  id: string;
  title: string;
  completed: boolean;
}

// Single milestone card structure
export interface RoadmapItem {
  id: string;
  title: string;
  description: string;
  quarter: string;     // e.g., 'Q1 2026', 'Q2 2026'
  phase: string;       // e.g., 'Phase 1: Lagos Core & Pilot'
  status: RoadmapStatus;
  region: 'Lagos' | 'Abuja' | 'Lagos-Abuja Corridor' | 'Pan-Nigeria';
  sector: NigeriaSector;
  locationDetails: string; // e.g., 'Ikeja, Yaba & Marina' or 'Wuse II & Central Area'
  targetDate: string;  // e.g., 'Jan - Mar 2026'
  tasks: RoadmapSubtask[];
  votes: number;
  hasVoted?: boolean;
  // Gradient visual styling
  gradientTheme: {
    badgeBg: string;
    badgeText: string;
    borderGlow: string;
    progressGradient: string;
    iconGradient: string;
    cardAccent: string;
  };
}

// Search and filter options
export interface FilterState {
  status: 'all' | RoadmapStatus;
  region: NigeriaRegion;
  sector: 'all' | NigeriaSector;
  searchQuery: string;
}
