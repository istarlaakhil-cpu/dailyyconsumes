import React, { useState } from 'react';
import {
  CalendarDays,
  CheckCircle2,
  AlertTriangle,
  XCircle,
  Clock,
  Flame,
  Droplets,
  Scale,
  Sparkles,
  ArrowRight,
  Filter,
} from 'lucide-react';
import { useFitness } from '../context/FitnessContext';

export default function ProgressCalendar() {
  const {
    daysData,
    selectedDate,
    setSelectedDate,
    calculateTotalsForDay,
    userProfile,
    setActiveTab,
  } = useFitness();

  const [filterMode, setFilterMode] = useState('all'); // 'all', 'completed', 'partial', 'pending'

  // Sorted list of all 55 days
  const allDates = Object.keys(daysData).sort();

  // Helper to determine status color
  const getDayStatus = (day) => {
    const totals = calculateTotalsForDay(day);
    const targetCalories = userProfile.calorieTarget || 950;

    // Check if exceeded calorie target significantly
    if (totals.calories > targetCalories * 1.25) {
      return {
        code: 'red',
        label: 'Calorie Exceeded',
        badge: 'bg-[#fee2e2] text-[#991b1b] border-[#fca5a5]',
        cardBg: 'bg-[#fff5f5] hover:bg-[#ffebeb]',
      };
    }

    if (totals.completedMeals === 5) {
      return {
        code: 'green',
        label: 'Diet Completed',
        badge: 'bg-[#d8f3dc] text-[#1b4332] border-[#95d5b2]',
        cardBg: 'bg-[#f4fbf6] hover:bg-[#e9f7ee]',
      };
    }

    if (totals.completedMeals > 0) {
      return {
        code: 'yellow',
        label: 'Partially Completed',
        badge: 'bg-[#fef3c7] text-[#92400e] border-[#fcd34d]',
        cardBg: 'bg-[#fffdf7] hover:bg-[#fff9e6]',
      };
    }

    return {
      code: 'pending',
      label: 'Pending / Planned',
      badge: 'bg-[#f4f0e6] text-[#6c887e] border-[#ded7c9]',
      cardBg: 'bg-[#fffefb] hover:bg-[#fbf9f3]',
    };
  };

  const filteredDates = allDates.filter((dateStr) => {
    const day = daysData[dateStr];
    const status = getDayStatus(day);
    if (filterMode === 'all') return true;
    if (filterMode === 'completed') return status.code === 'green';
    if (filterMode === 'partial') return status.code === 'yellow';
    if (filterMode === 'missed') return status.code === 'red';
    if (filterMode === 'pending') return status.code === 'pending';
    return true;
  });

  const activeSelectedDay = daysData[selectedDate];
  const activeSelectedTotals = calculateTotalsForDay(activeSelectedDay);
  const activeStatus = getDayStatus(activeSelectedDay);

  return (
    <div className="space-y-6 pb-20 lg:pb-8">
      {/* Title & Filter Bar */}
      <div className="bg-[#fffefb] rounded-3xl p-6 border border-[#e8e2d5] shadow-xs">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
          <div>
            <div className="inline-flex items-center gap-1.5 bg-[#e9f5ed] text-[#2d6a4f] text-xs font-bold px-3 py-1 rounded-full mb-2">
              <CalendarDays className="w-3.5 h-3.5" />
              <span>Full 55-Day Journey Overview</span>
            </div>
            <h2 className="text-2xl font-black text-[#1b4332]">Progress Tracking Calendar</h2>
            <p className="text-xs text-[#52796f] mt-1 max-w-xl">
              November 1, 2026 to December 25, 2026. Click any date card to view its complete diet, hydration, and weight records.
            </p>
          </div>

          {/* Color Key / Legend */}
          <div className="flex items-center gap-3 flex-wrap text-xs font-semibold">
            <span className="flex items-center gap-1 text-[#1b4332]">
              <span className="w-3 h-3 rounded-md bg-[#52b788]"></span> Green (Completed)
            </span>
            <span className="flex items-center gap-1 text-[#b45309]">
              <span className="w-3 h-3 rounded-md bg-[#fbbf24]"></span> Yellow (Partial)
            </span>
            <span className="flex items-center gap-1 text-[#b91c1c]">
              <span className="w-3 h-3 rounded-md bg-[#f87171]"></span> Red (Exceeded/Missed)
            </span>
          </div>
        </div>

        {/* Filter Buttons */}
        <div className="flex items-center gap-2 mt-4 pt-4 border-t border-[#f4f0e6] overflow-x-auto pb-1 text-xs">
          <span className="text-[#52796f] font-bold flex items-center gap-1 mr-1">
            <Filter className="w-3.5 h-3.5" /> Filter:
          </span>
          {[
            { id: 'all', label: 'All 55 Days' },
            { id: 'completed', label: 'Completed (Green)' },
            { id: 'partial', label: 'Partial (Yellow)' },
            { id: 'missed', label: 'Exceeded (Red)' },
            { id: 'pending', label: 'Upcoming' },
          ].map((tab) => (
            <button
              key={tab.id}
              onClick={() => setFilterMode(tab.id)}
              className={`px-3 py-1.5 rounded-full font-bold transition whitespace-nowrap ${
                filterMode === tab.id
                  ? 'bg-[#2d6a4f] text-white shadow-xs'
                  : 'bg-[#f4f0e6] text-[#415a51] hover:bg-[#ede7db]'
              }`}
            >
              {tab.label}
            </button>
          ))}
        </div>
      </div>

      {/* Selected Day Quick Inspector Panel */}
      {activeSelectedDay && (
        <div className="bg-gradient-to-br from-[#fdfbf7] to-[#e9f5ed] rounded-3xl p-6 border-2 border-[#2d6a4f]/30 shadow-sm">
          <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
            <div>
              <div className="flex items-center gap-2">
                <span className={`text-[10px] font-black px-2.5 py-0.5 rounded-full border ${activeStatus.badge}`}>
                  {activeStatus.label}
                </span>
                <span className="text-xs font-bold text-[#52796f]">
                  Day {activeSelectedDay.dayNumber} of 55
                </span>
              </div>

              <h3 className="text-xl font-black text-[#1b4332] mt-1">
                {new Date(selectedDate + 'T00:00:00').toLocaleDateString('en-US', {
                  weekday: 'long',
                  month: 'long',
                  day: 'numeric',
                  year: 'numeric',
                })}
              </h3>

              <p className="text-xs text-[#52796f] mt-1">
                {activeSelectedDay.notes ? `"${activeSelectedDay.notes}"` : 'No journal notes entered for this date.'}
              </p>
            </div>

            <div className="flex items-center gap-3">
              <div className="grid grid-cols-4 gap-2 text-center text-xs">
                <div className="bg-white p-2 rounded-xl border border-[#ded7c9]">
                  <span className="text-[10px] text-[#52796f] block">Calories</span>
                  <span className="font-black text-[#1b4332]">{activeSelectedTotals.calories}</span>
                </div>
                <div className="bg-white p-2 rounded-xl border border-[#ded7c9]">
                  <span className="text-[10px] text-[#52796f] block">Meals</span>
                  <span className="font-black text-[#2d6a4f]">{activeSelectedTotals.completedMeals}/5</span>
                </div>
                <div className="bg-white p-2 rounded-xl border border-[#ded7c9]">
                  <span className="text-[10px] text-[#52796f] block">Water</span>
                  <span className="font-black text-[#1976d2]">{activeSelectedDay.waterGlasses * 250}ml</span>
                </div>
                <div className="bg-white p-2 rounded-xl border border-[#ded7c9]">
                  <span className="text-[10px] text-[#52796f] block">Weight</span>
                  <span className="font-black text-[#1b4332]">{activeSelectedDay.weight ? `${activeSelectedDay.weight}k` : '—'}</span>
                </div>
              </div>

              <button
                onClick={() => setActiveTab('todays-diet')}
                className="px-4 py-2 bg-[#2d6a4f] hover:bg-[#1b4332] text-white rounded-xl text-xs font-bold flex items-center gap-1.5 transition whitespace-nowrap self-stretch sm:self-auto justify-center"
              >
                <span>Edit Today's Diet</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </button>
            </div>
          </div>
        </div>
      )}

      {/* 55-Day Calendar Grid */}
      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-7 gap-3">
        {filteredDates.map((dateStr) => {
          const day = daysData[dateStr];
          const totals = calculateTotalsForDay(day);
          const status = getDayStatus(day);
          const isSelected = selectedDate === dateStr;
          const dateObj = new Date(dateStr + 'T00:00:00');
          const dayNum = dateObj.getDate();
          const monthName = dateObj.toLocaleDateString('en-US', { month: 'short' });

          return (
            <div
              key={dateStr}
              onClick={() => setSelectedDate(dateStr)}
              className={`p-3.5 rounded-2xl border transition-all cursor-pointer flex flex-col justify-between min-h-[140px] ${
                isSelected
                  ? 'ring-2 ring-[#2d6a4f] shadow-md border-transparent scale-[1.02] bg-[#fffefb]'
                  : `${status.cardBg} border-[#e8e2d5] shadow-2xs`
              }`}
            >
              <div>
                {/* Header: Day number + Date */}
                <div className="flex items-center justify-between mb-2">
                  <span className="text-[11px] font-bold text-[#52796f]">
                    Day {day.dayNumber}
                  </span>
                  <span className="text-xs font-extrabold text-[#1b4332]">
                    {monthName} {dayNum}
                  </span>
                </div>

                {/* Status indicator bar */}
                <div className="flex items-center gap-1 mb-2">
                  <div
                    className={`h-1.5 flex-1 rounded-full ${
                      status.code === 'green'
                        ? 'bg-[#40916c]'
                        : status.code === 'yellow'
                        ? 'bg-[#f59e0b]'
                        : status.code === 'red'
                        ? 'bg-[#ef4444]'
                        : 'bg-[#ded7c9]'
                    }`}
                  ></div>
                </div>

                {/* Metrics */}
                <div className="space-y-1 text-xs">
                  <div className="flex items-center justify-between">
                    <span className="text-[11px] text-[#708d83] flex items-center gap-1">
                      <Flame className="w-3 h-3 text-[#52796f]" /> Cal:
                    </span>
                    <span className="font-black text-[#1b4332]">{totals.calories}</span>
                  </div>

                  <div className="flex items-center justify-between">
                    <span className="text-[11px] text-[#708d83] flex items-center gap-1">
                      <CheckCircle2 className="w-3 h-3 text-[#40916c]" /> Meals:
                    </span>
                    <span className="font-bold text-[#2d6a4f]">{totals.completedMeals}/5</span>
                  </div>

                  <div className="flex items-center justify-between">
                    <span className="text-[11px] text-[#708d83] flex items-center gap-1">
                      <Droplets className="w-3 h-3 text-[#1976d2]" /> Water:
                    </span>
                    <span className="font-semibold text-[#1976d2]">
                      {day.waterGlasses * 250} ml
                    </span>
                  </div>

                  {day.weight && (
                    <div className="flex items-center justify-between">
                      <span className="text-[11px] text-[#708d83] flex items-center gap-1">
                        <Scale className="w-3 h-3 text-[#2d6a4f]" /> Wt:
                      </span>
                      <span className="font-bold text-[#1b4332]">{day.weight} kg</span>
                    </div>
                  )}
                </div>
              </div>

              {/* Footer status pill */}
              <div className="mt-2 pt-2 border-t border-[#f0ece1] flex items-center justify-between">
                <span className={`text-[9px] font-bold px-1.5 py-0.5 rounded-md ${status.badge}`}>
                  {status.code === 'green' ? 'Done' : status.code === 'yellow' ? 'Partial' : status.code === 'red' ? 'Exceeded' : 'Pending'}
                </span>

                {day.notes && (
                  <span className="text-[10px] text-[#52796f]" title={day.notes}>
                    📝
                  </span>
                )}
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
