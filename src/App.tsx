// ==========================================
// MAIN APP COMPONENT (NIGERIA ROADMAP)
// ==========================================
// This is the root component that coordinates:
// 1. App state (milestones, filters, view mode, modal state)
// 2. Interactive actions (check tasks, change status, vote, add milestone)
// 3. Responsive layout containing Header, Stats, Controls, and Timeline/Grid

import { useState, useMemo } from 'react';
import type { 
  RoadmapItem, 
  FilterState, 
  ViewMode, 
  RoadmapStatus 
} from './types/roadmap';
import { INITIAL_NIGERIA_ROADMAP } from './data/roadmapData';
import { Header } from './components/Header';
import { StatsOverview } from './components/StatsOverview';
import { RoadmapControls } from './components/RoadmapControls';
import { RoadmapTimeline } from './components/RoadmapTimeline';
import { RoadmapGrid } from './components/RoadmapGrid';
import { AddMilestoneModal } from './components/AddMilestoneModal';
import { Footer } from './components/Footer';

export function App() {
  // ----------------------------------------------------
  // 1. STATE DEFINITIONS
  // ----------------------------------------------------

  // Master list of roadmap milestones (focused on Lagos and Abuja)
  const [items, setItems] = useState<RoadmapItem[]>(INITIAL_NIGERIA_ROADMAP);

  // Active filters for searching and filtering by region, status, and sector
  const [filters, setFilters] = useState<FilterState>({
    status: 'all',
    region: 'All',
    sector: 'all',
    searchQuery: '',
  });

  // Display mode: 'timeline' (chronological flow) or 'grid' (card columns)
  const [viewMode, setViewMode] = useState<ViewMode>('timeline');

  // Controls visibility of the "+ Add Milestone" dialog
  const [isAddModalOpen, setIsAddModalOpen] = useState(false);

  // ----------------------------------------------------
  // 2. INTERACTIVE EVENT HANDLERS
  // ----------------------------------------------------

  /**
   * Toggles the completion state of a subtask within a milestone.
   * Automatically recalculates whether the parent milestone is fully complete.
   */
  const handleToggleTask = (itemId: string, taskId: string) => {
    setItems((prevItems) =>
      prevItems.map((item) => {
        if (item.id !== itemId) return item;

        // Toggle target task
        const updatedTasks = item.tasks.map((task) =>
          task.id === taskId ? { ...task, completed: !task.completed } : task
        );

        // Auto-update status if all tasks are completed
        const allDone = updatedTasks.every((t) => t.completed);
        const noneDone = updatedTasks.every((t) => !t.completed);
        let newStatus = item.status;
        if (allDone) {
          newStatus = 'completed';
        } else if (!noneDone && item.status === 'planned') {
          newStatus = 'in-progress';
        }

        return {
          ...item,
          tasks: updatedTasks,
          status: newStatus,
        };
      })
    );
  };

  /**
   * Changes the status of an existing milestone (e.g. from planned to in-progress)
   */
  const handleChangeStatus = (itemId: string, nextStatus: RoadmapStatus) => {
    setItems((prevItems) =>
      prevItems.map((item) =>
        item.id === itemId ? { ...item, status: nextStatus } : item
      )
    );
  };

  /**
   * Increments the community endorsement/upvote count for a milestone
   */
  const handleVote = (itemId: string) => {
    setItems((prevItems) =>
      prevItems.map((item) => {
        if (item.id !== itemId) return item;
        const hasVoted = item.hasVoted ?? false;
        return {
          ...item,
          hasVoted: !hasVoted,
          votes: hasVoted ? item.votes - 1 : item.votes + 1,
        };
      })
    );
  };

  /**
   * Appends a newly created milestone to the roadmap
   */
  const handleAddMilestone = (newItem: RoadmapItem) => {
    setItems((prev) => [newItem, ...prev]);
  };

  // ----------------------------------------------------
  // 3. COMPUTED / FILTERED DATA
  // ----------------------------------------------------

  // Filter items according to search text, location, status, and sector
  const filteredItems = useMemo(() => {
    return items.filter((item) => {
      // 1. Status Filter
      if (filters.status !== 'all' && item.status !== filters.status) {
        return false;
      }

      // 2. Region Filter (Lagos, Abuja, Corridor, Pan-Nigeria)
      if (filters.region !== 'All') {
        if (filters.region === 'Lagos' && item.region !== 'Lagos') return false;
        if (filters.region === 'Abuja' && item.region !== 'Abuja') return false;
        if (filters.region === 'Lagos-Abuja Corridor' && item.region !== 'Lagos-Abuja Corridor') return false;
        if (filters.region === 'Pan-Nigeria' && item.region !== 'Pan-Nigeria') return false;
      }

      // 3. Sector Filter
      if (filters.sector !== 'all' && item.sector !== filters.sector) {
        return false;
      }

      // 4. Search Query matching
      if (filters.searchQuery.trim()) {
        const query = filters.searchQuery.toLowerCase();
        const matchesTitle = item.title.toLowerCase().includes(query);
        const matchesDesc = item.description.toLowerCase().includes(query);
        const matchesLocation = item.locationDetails.toLowerCase().includes(query);
        const matchesSector = item.sector.toLowerCase().includes(query);
        const matchesPhase = item.phase.toLowerCase().includes(query);
        if (!matchesTitle && !matchesDesc && !matchesLocation && !matchesSector && !matchesPhase) {
          return false;
        }
      }

      return true;
    });
  }, [items, filters]);

  // Regional counters for the hero banner
  const lagosCount = items.filter((i) => i.region === 'Lagos').length;
  const abujaCount = items.filter((i) => i.region === 'Abuja').length;
  const completedCount = items.filter((i) => i.status === 'completed').length;

  // ----------------------------------------------------
  // 4. RENDER UI
  // ----------------------------------------------------
  return (
    <div className="min-h-screen bg-slate-50 dark:bg-slate-950 text-slate-900 dark:text-slate-100 font-sans antialiased selection:bg-emerald-500 selection:text-white transition-colors duration-200">
      
      {/* Broad & Wide Full-Screen Container */}
      <main className="w-full px-3 sm:px-6 md:px-8 lg:px-10 xl:px-12 py-4 sm:py-6">
        
        {/* SECTION 1: Top Hero Banner with Lagos & Abuja Highlights */}
        <Header
          onOpenAddModal={() => setIsAddModalOpen(true)}
          totalMilestones={items.length}
          completedMilestones={completedCount}
          lagosCount={lagosCount}
          abujaCount={abujaCount}
        />

        {/* SECTION 2: Velocity & KPI Cards Overview */}
        <StatsOverview items={items} />

        {/* SECTION 3: Controls (Search, Lagos/Abuja filter, Sector, View switcher) */}
        <RoadmapControls
          filters={filters}
          onFilterChange={setFilters}
          viewMode={viewMode}
          onViewModeChange={setViewMode}
          matchedCount={filteredItems.length}
        />

        {/* SECTION 4: Roadmap View (Timeline or Grid) */}
        {viewMode === 'timeline' ? (
          <RoadmapTimeline
            items={filteredItems}
            onToggleTask={handleToggleTask}
            onChangeStatus={handleChangeStatus}
            onVote={handleVote}
          />
        ) : (
          <RoadmapGrid
            items={filteredItems}
            onToggleTask={handleToggleTask}
            onChangeStatus={handleChangeStatus}
            onVote={handleVote}
          />
        )}

        {/* SECTION 5: Footer */}
        <Footer />

      </main>

      {/* SECTION 6: Modal to Add a New Milestone */}
      <AddMilestoneModal
        isOpen={isAddModalOpen}
        onClose={() => setIsAddModalOpen(false)}
        onAdd={handleAddMilestone}
      />

    </div>
  );
}

export default App;
