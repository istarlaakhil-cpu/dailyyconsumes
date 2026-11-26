import React from 'react';
import {
  LayoutDashboard,
  UtensilsCrossed,
  Clock,
  Calculator,
  Scale,
  CalendarDays,
  BarChart3,
  Settings as SettingsIcon,
  ChevronLeft,
  ChevronRight,
  Flame,
  Calendar,
  Sparkles,
  Droplet,
  Bell,
} from 'lucide-react';
import { useFitness } from '../context/FitnessContext';

export const NAV_ITEMS = [
  { id: 'dashboard', label: 'Dashboard', icon: LayoutDashboard },
  { id: 'todays-diet', label: "Today's Diet", icon: UtensilsCrossed },
  { id: 'schedule', label: 'Meal Schedule', icon: Clock },
  { id: 'calculator', label: 'Calorie Calculator', icon: Calculator },
  { id: 'weight', label: 'Weight Tracker', icon: Scale },
  { id: 'calendar', label: 'Progress Calendar', icon: CalendarDays },
  { id: 'analytics', label: 'Analytics & Reports', icon: BarChart3 },
  { id: 'settings', label: 'Settings', icon: SettingsIcon },
];

export default function Navbar() {
  const {
    activeTab,
    setActiveTab,
    selectedDate,
    setSelectedDate,
    START_DATE,
    END_DATE,
    overallStats,
    notificationStatus,
    requestNotificationPermission,
  } = useFitness();

  // Handle date prev/next
  const handleDateStep = (delta) => {
    const cur = new Date(selectedDate + 'T00:00:00');
    cur.setDate(cur.getDate() + delta);
    const yyyy = cur.getFullYear();
    const mm = String(cur.getMonth() + 1).padStart(2, '0');
    const dd = String(cur.getDate()).padStart(2, '0');
    const newDate = `${yyyy}-${mm}-${dd}`;
    if (newDate >= START_DATE && newDate <= END_DATE) {
      setSelectedDate(newDate);
    }
  };

  const formattedDate = new Date(selectedDate + 'T00:00:00').toLocaleDateString('en-US', {
    weekday: 'short',
    month: 'short',
    day: 'numeric',
    year: 'numeric',
  });

  return (
    <>
      {/* Top Banner / Header (Universal) */}
      <header className="sticky top-0 z-30 bg-[#fdfbf7]/90 backdrop-blur-md border-b border-[#e8e2d5] px-4 py-3 sm:px-6">
        <div className="max-w-7xl mx-auto flex flex-col sm:flex-row items-center justify-between gap-3">
          {/* Logo & Subtitle */}
          <div className="flex items-center justify-between w-full sm:w-auto">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-[#2d6a4f] to-[#1b4332] text-white flex items-center justify-center shadow-sm">
                <Flame className="w-5 h-5 text-[#95d5b2]" />
              </div>
              <div>
                <h1 className="text-sm font-bold tracking-tight text-[#1b4332] uppercase sm:text-base">
                  55-Day Fitness Tracker
                </h1>
                <div className="flex items-center gap-2 text-xs text-[#52796f]">
                  <span className="font-semibold text-[#2d6a4f]">Nov 1 – Dec 25, 2026</span>
                  <span>•</span>
                  <span className="inline-flex items-center gap-1 font-medium bg-[#e9f5ed] text-[#2d6a4f] px-2 py-0.5 rounded-full text-[11px]">
                    <Sparkles className="w-3 h-3 text-[#40916c]" /> Day {overallStats.currentDayNumber} of 55
                  </span>
                </div>
              </div>
            </div>

            {/* Quick reminder button for mobile header */}
            <div className="flex items-center gap-2 sm:hidden">
              <button
                onClick={requestNotificationPermission}
                title="Enable meal reminders"
                className={`p-2 rounded-lg border text-xs flex items-center gap-1 ${
                  notificationStatus === 'granted'
                    ? 'bg-[#e9f5ed] text-[#2d6a4f] border-[#b7e4c7]'
                    : 'bg-[#fffefb] text-[#52796f] border-[#e2dcd2]'
                }`}
              >
                <Bell className="w-4 h-4" />
              </button>
            </div>
          </div>

          {/* Date Selector & Countdown Pill */}
          <div className="flex items-center justify-between w-full sm:w-auto gap-2 sm:gap-4">
            {/* Date controls */}
            <div className="flex items-center bg-[#f4f0e6] rounded-xl p-1 border border-[#e3dcd1] shadow-xs">
              <button
                onClick={() => handleDateStep(-1)}
                disabled={selectedDate <= START_DATE}
                className="p-1.5 rounded-lg hover:bg-white text-[#2d6a4f] disabled:opacity-30 disabled:hover:bg-transparent transition"
                title="Previous Day"
              >
                <ChevronLeft className="w-4 h-4" />
              </button>

              <div className="flex items-center gap-1.5 px-3 py-0.5 text-xs sm:text-sm font-semibold text-[#1b4332]">
                <Calendar className="w-3.5 h-3.5 text-[#40916c]" />
                <span>{formattedDate}</span>
              </div>

              <button
                onClick={() => handleDateStep(1)}
                disabled={selectedDate >= END_DATE}
                className="p-1.5 rounded-lg hover:bg-white text-[#2d6a4f] disabled:opacity-30 disabled:hover:bg-transparent transition"
                title="Next Day"
              >
                <ChevronRight className="w-4 h-4" />
              </button>
            </div>

            {/* Days until Dec 25 pill */}
            <div className="hidden sm:flex items-center gap-2 bg-[#2d6a4f] text-[#fdfbf7] px-3.5 py-1.5 rounded-xl text-xs font-semibold shadow-sm">
              <span className="w-2 h-2 rounded-full bg-[#74c69d] animate-pulse"></span>
              <span>{overallStats.daysRemaining} days until Dec 25</span>
            </div>
          </div>
        </div>
      </header>

      {/* Desktop Sidebar Navigation */}
      <aside className="hidden lg:flex fixed left-0 top-16 bottom-0 w-64 bg-[#fffefb] border-r border-[#e8e2d5] flex-col justify-between p-4 z-20">
        <div className="space-y-6">
          {/* Quick Target Summary Card */}
          <div className="bg-gradient-to-br from-[#f4f0e6] to-[#e9f5ed] rounded-2xl p-4 border border-[#e2dacb]">
            <div className="flex items-center justify-between mb-2">
              <span className="text-xs uppercase font-bold tracking-wider text-[#52796f]">Goal Target</span>
              <span className="text-xs font-semibold text-[#2d6a4f]">{overallStats.targetWeight} kg</span>
            </div>
            <div className="flex items-baseline gap-2">
              <span className="text-2xl font-black text-[#1b4332]">{overallStats.currentWeight}</span>
              <span className="text-xs text-[#52796f]">kg current</span>
            </div>
            <div className="mt-2 w-full bg-[#ded6c7] h-2 rounded-full overflow-hidden">
              <div
                className="bg-[#2d6a4f] h-full rounded-full transition-all duration-500"
                style={{ width: `${overallStats.consistencyRate}%` }}
              ></div>
            </div>
            <div className="flex justify-between items-center text-[11px] text-[#52796f] mt-1.5 font-medium">
              <span>{overallStats.consistencyRate}% Consistency</span>
              <span>{overallStats.daysRemaining}d left</span>
            </div>
          </div>

          {/* Navigation Links */}
          <nav className="space-y-1">
            {NAV_ITEMS.map((item) => {
              const Icon = item.icon;
              const isActive = activeTab === item.id;
              return (
                <button
                  key={item.id}
                  onClick={() => setActiveTab(item.id)}
                  className={`w-full flex items-center gap-3 px-3.5 py-2.5 rounded-xl text-sm font-semibold transition-all ${
                    isActive
                      ? 'bg-[#2d6a4f] text-white shadow-sm shadow-[#2d6a4f]/20 font-bold'
                      : 'text-[#415a51] hover:bg-[#f4f0e6] hover:text-[#1b4332]'
                  }`}
                >
                  <Icon className={`w-4 h-4 ${isActive ? 'text-[#95d5b2]' : 'text-[#52796f]'}`} />
                  <span>{item.label}</span>
                </button>
              );
            })}
          </nav>
        </div>

        {/* Sidebar Footer info */}
        <div className="border-t border-[#ede7db] pt-4">
          <div className="bg-[#f9f6f0] p-3 rounded-xl text-xs text-[#52796f] border border-[#e8e2d5]">
            <p className="font-semibold text-[#2d6a4f]">Tracking Window</p>
            <p className="text-[11px] text-[#6b8e84] mt-0.5">55 Days: Nov 1 to Dec 25</p>
            <p className="text-[10px] text-[#8aa59c] mt-1">Sugar-Free • Controlled Diet</p>
          </div>
        </div>
      </aside>

      {/* Mobile Top Navigation Pills Bar (Horizontal Scroll for easy access to all 8 pages) */}
      <div className="lg:hidden sticky top-[61px] z-20 bg-[#fffefb]/95 backdrop-blur-sm border-b border-[#e8e2d5] px-2 py-2 overflow-x-auto no-scrollbar flex items-center gap-1.5">
        {NAV_ITEMS.map((item) => {
          const Icon = item.icon;
          const isActive = activeTab === item.id;
          return (
            <button
              key={item.id}
              onClick={() => setActiveTab(item.id)}
              className={`flex items-center gap-1.5 px-3 py-1.5 rounded-full text-xs font-semibold whitespace-nowrap transition-all ${
                isActive
                  ? 'bg-[#2d6a4f] text-white shadow-xs'
                  : 'bg-[#f4f0e6] text-[#415a51] hover:bg-[#ede7db]'
              }`}
            >
              <Icon className="w-3.5 h-3.5" />
              <span>{item.label}</span>
            </button>
          );
        })}
      </div>

      {/* Mobile Bottom Navigation Bar (Core Quick Actions) */}
      <nav className="lg:hidden fixed bottom-0 left-0 right-0 bg-[#fffefb]/95 backdrop-blur-md border-t border-[#e8e2d5] z-30 px-3 py-2">
        <div className="grid grid-cols-5 gap-1 text-center">
          {[
            { id: 'dashboard', label: 'Home', icon: LayoutDashboard },
            { id: 'todays-diet', label: 'Diet', icon: UtensilsCrossed },
            { id: 'calendar', label: 'Calendar', icon: CalendarDays },
            { id: 'weight', label: 'Weight', icon: Scale },
            { id: 'analytics', label: 'Reports', icon: BarChart3 },
          ].map((item) => {
            const Icon = item.icon;
            const isActive = activeTab === item.id;
            return (
              <button
                key={item.id}
                onClick={() => setActiveTab(item.id)}
                className={`flex flex-col items-center justify-center py-1 rounded-xl transition ${
                  isActive ? 'text-[#2d6a4f] font-bold' : 'text-[#708d83]'
                }`}
              >
                <div
                  className={`p-1 rounded-lg ${
                    isActive ? 'bg-[#e9f5ed] text-[#2d6a4f]' : 'text-[#52796f]'
                  }`}
                >
                  <Icon className="w-5 h-5" />
                </div>
                <span className="text-[10px] mt-0.5">{item.label}</span>
              </button>
            );
          })}
        </div>
      </nav>
    </>
  );
}
