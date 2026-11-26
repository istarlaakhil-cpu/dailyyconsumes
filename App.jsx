import React from 'react';
import { FitnessProvider, useFitness } from './context/FitnessContext';
import Navbar from './components/Navbar';
import Dashboard from './components/Dashboard';
import TodaysDiet from './components/TodaysDiet';
import MealSchedule from './components/MealSchedule';
import CalorieCalculator from './components/CalorieCalculator';
import WeightTracker from './components/WeightTracker';
import ProgressCalendar from './components/ProgressCalendar';
import AnalyticsReports from './components/AnalyticsReports';
import Settings from './components/Settings';
import { Flame, ShieldCheck, Heart } from 'lucide-react';

function AppContent() {
  const { activeTab } = useFitness();

  const renderContent = () => {
    switch (activeTab) {
      case 'dashboard':
        return <Dashboard />;
      case 'todays-diet':
        return <TodaysDiet />;
      case 'schedule':
        return <MealSchedule />;
      case 'calculator':
        return <CalorieCalculator />;
      case 'weight':
        return <WeightTracker />;
      case 'calendar':
        return <ProgressCalendar />;
      case 'analytics':
        return <AnalyticsReports />;
      case 'settings':
        return <Settings />;
      default:
        return <Dashboard />;
    }
  };

  return (
    <div className="min-h-screen bg-[#f9f6f0] flex flex-col font-sans">
      <Navbar />

      <main className="flex-1 max-w-7xl w-full mx-auto px-4 sm:px-6 pt-6 lg:pl-72">
        {renderContent()}

        {/* Global Footer */}
        <footer className="mt-12 mb-20 lg:mb-8 pt-6 border-t border-[#ede7db] text-xs text-[#708d83] flex flex-col sm:flex-row items-center justify-between gap-4 no-print">
          <div className="flex items-center gap-2">
            <span className="w-2 h-2 rounded-full bg-[#40916c]"></span>
            <span className="font-bold text-[#1b4332]">MY 55-DAY FITNESS TRANSFORMATION TRACKER</span>
            <span>•</span>
            <span>Nov 1 – Dec 25, 2026</span>
          </div>

          <div className="flex items-center gap-1.5 text-[11px]">
            <span>Crafted with soft green & warm cream aesthetic</span>
            <Heart className="w-3.5 h-3.5 text-[#2d6a4f] fill-[#2d6a4f]" />
          </div>
        </footer>
      </main>
    </div>
  );
}

export default function App() {
  return (
    <FitnessProvider>
      <AppContent />
    </FitnessProvider>
  );
}
