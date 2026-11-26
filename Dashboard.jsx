import React from 'react';
import {
  Flame,
  Droplets,
  CheckCircle2,
  Clock,
  Scale,
  TrendingDown,
  Calendar,
  Sparkles,
  AlertCircle,
  Plus,
  Minus,
  ArrowRight,
  ShieldAlert,
} from 'lucide-react';
import { useFitness } from '../context/FitnessContext';

export default function Dashboard() {
  const {
    activeDay,
    selectedDate,
    activeTotals,
    userProfile,
    overallStats,
    setActiveTab,
    updateDayField,
    toggleMealCompletion,
  } = useFitness();

  const calorieTarget = userProfile.calorieTarget || 950;
  const caloriePercent = Math.min(150, Math.round((activeTotals.calories / calorieTarget) * 100));

  // Circular progress ring calculations
  const radius = 64;
  const circumference = 2 * Math.PI * radius;
  const strokeDashoffset = circumference - (Math.min(100, caloriePercent) / 100) * circumference;

  const waterGlasses = activeDay.waterGlasses || 0;
  const waterTarget = userProfile.waterTargetGlasses || 12;
  const waterMl = waterGlasses * 250;
  const waterTargetMl = waterTarget * 250;
  const waterPercent = Math.min(100, Math.round((waterGlasses / waterTarget) * 100));

  const formattedDate = new Date(selectedDate + 'T00:00:00').toLocaleDateString('en-US', {
    weekday: 'long',
    month: 'long',
    day: 'numeric',
    year: 'numeric',
  });

  return (
    <div className="space-y-6 pb-20 lg:pb-8">
      {/* Welcome & Key Metrics Banner */}
      <div className="bg-gradient-to-r from-[#2d6a4f] via-[#215740] to-[#1b4332] rounded-3xl p-6 sm:p-8 text-[#fffef9] shadow-md relative overflow-hidden">
        {/* Subtle decorative background shapes */}
        <div className="absolute -right-12 -top-12 w-56 h-56 rounded-full bg-white/5 pointer-events-none blur-xl"></div>
        <div className="absolute right-32 -bottom-16 w-64 h-64 rounded-full bg-[#52b788]/10 pointer-events-none blur-2xl"></div>

        <div className="relative z-10 flex flex-col md:flex-row md:items-center justify-between gap-6">
          <div className="space-y-2">
            <div className="inline-flex items-center gap-2 bg-[#fffef9]/15 backdrop-blur-md px-3.5 py-1 rounded-full text-xs font-semibold text-[#d8f3dc]">
              <Sparkles className="w-3.5 h-3.5 text-[#95d5b2]" />
              Day {activeDay.dayNumber} of 55 Transformation
            </div>
            <h2 className="text-2xl sm:text-3xl font-extrabold tracking-tight">
              {formattedDate}
            </h2>
            <p className="text-sm text-[#b7e4c7] max-w-xl">
              Strict sugar-free routine. Track every meal, hit hydration goals, and maintain your 55-day milestone journey to Christmas Day!
            </p>
          </div>

          <div className="flex flex-wrap sm:flex-nowrap items-center gap-3">
            <div className="bg-[#fffef9]/10 backdrop-blur-md rounded-2xl p-4 border border-white/10 text-center min-w-[120px] flex-1 sm:flex-initial">
              <span className="text-xs uppercase tracking-wider text-[#b7e4c7] font-semibold block">Countdown</span>
              <span className="text-2xl font-black text-white">{overallStats.daysRemaining}</span>
              <span className="text-[11px] text-[#d8f3dc] block">Days to Dec 25</span>
            </div>

            <div className="bg-[#fffef9]/10 backdrop-blur-md rounded-2xl p-4 border border-white/10 text-center min-w-[120px] flex-1 sm:flex-initial">
              <span className="text-xs uppercase tracking-wider text-[#b7e4c7] font-semibold block">Consistency</span>
              <span className="text-2xl font-black text-[#95d5b2]">{overallStats.consistencyRate}%</span>
              <span className="text-[11px] text-[#d8f3dc] block">Adherence Rate</span>
            </div>
          </div>
        </div>
      </div>

      {/* Main Stats Grid */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {/* Calorie Progress Ring Card */}
        <div className="bg-[#fffefb] rounded-3xl p-6 border border-[#e8e2d5] shadow-xs flex flex-col justify-between">
          <div className="flex items-center justify-between mb-4">
            <div>
              <h3 className="text-sm font-bold text-[#1b4332] uppercase tracking-wider">Calories Today</h3>
              <p className="text-xs text-[#52796f]">Target: {calorieTarget} kcal</p>
            </div>
            <span className="p-2.5 rounded-2xl bg-[#e9f5ed] text-[#2d6a4f]">
              <Flame className="w-5 h-5" />
            </span>
          </div>

          {/* SVG Circular Progress Ring */}
          <div className="flex items-center justify-center my-3 relative">
            <svg className="w-44 h-44 transform -rotate-90">
              <circle
                cx="88"
                cy="88"
                r={radius}
                stroke="#f0ece1"
                strokeWidth="12"
                fill="transparent"
              />
              <circle
                cx="88"
                cy="88"
                r={radius}
                stroke="url(#calorieGradient)"
                strokeWidth="12"
                strokeDasharray={circumference}
                strokeDashoffset={strokeDashoffset}
                strokeLinecap="round"
                fill="transparent"
                className="transition-all duration-700 ease-out"
              />
              <defs>
                <linearGradient id="calorieGradient" x1="0%" y1="0%" x2="100%" y2="100%">
                  <stop offset="0%" stopColor="#52b788" />
                  <stop offset="100%" stopColor="#1b4332" />
                </linearGradient>
              </defs>
            </svg>

            {/* Inner Content */}
            <div className="absolute inset-0 flex flex-col items-center justify-center text-center">
              <span className="text-3xl font-black text-[#1b4332] tracking-tight">
                {activeTotals.calories}
              </span>
              <span className="text-xs font-semibold text-[#52796f]">kcal consumed</span>
              <span className="text-[11px] font-bold text-[#2d6a4f] bg-[#e9f5ed] px-2 py-0.5 rounded-full mt-1">
                {caloriePercent}% of goal
              </span>
            </div>
          </div>

          <div className="grid grid-cols-2 gap-2 pt-3 border-t border-[#f4f0e6] text-xs">
            <div className="bg-[#f9f6f0] p-2.5 rounded-xl">
              <span className="text-[#6c887e] block">Remaining</span>
              <span className="font-bold text-[#1b4332]">
                {Math.max(0, calorieTarget - activeTotals.calories)} kcal
              </span>
            </div>
            <div className="bg-[#f9f6f0] p-2.5 rounded-xl">
              <span className="text-[#6c887e] block">Base Plan Base</span>
              <span className="font-bold text-[#1b4332]">515 kcal + extras</span>
            </div>
          </div>
        </div>

        {/* Macronutrient Breakdown Card */}
        <div className="bg-[#fffefb] rounded-3xl p-6 border border-[#e8e2d5] shadow-xs flex flex-col justify-between">
          <div className="flex items-center justify-between mb-4">
            <div>
              <h3 className="text-sm font-bold text-[#1b4332] uppercase tracking-wider">Macronutrients</h3>
              <p className="text-xs text-[#52796f]">Protein, Carbs & Healthy Fats</p>
            </div>
            <span className="p-2.5 rounded-2xl bg-[#f4f0e6] text-[#40916c]">
              <Sparkles className="w-5 h-5" />
            </span>
          </div>

          <div className="space-y-4 my-2">
            {/* Protein */}
            <div>
              <div className="flex justify-between items-center text-xs mb-1.5 font-medium">
                <span className="text-[#1b4332] font-semibold flex items-center gap-1.5">
                  <span className="w-2.5 h-2.5 rounded-full bg-[#2d6a4f]"></span> Protein
                </span>
                <span className="font-bold text-[#1b4332]">{activeTotals.protein}g</span>
              </div>
              <div className="w-full bg-[#f4f0e6] h-2.5 rounded-full overflow-hidden">
                <div
                  className="bg-[#2d6a4f] h-full rounded-full transition-all duration-500"
                  style={{ width: `${Math.min(100, (activeTotals.protein / 80) * 100)}%` }}
                ></div>
              </div>
              <span className="text-[10px] text-[#78968c] mt-0.5 block">Estimated goal ~70-80g</span>
            </div>

            {/* Carbohydrates */}
            <div>
              <div className="flex justify-between items-center text-xs mb-1.5 font-medium">
                <span className="text-[#1b4332] font-semibold flex items-center gap-1.5">
                  <span className="w-2.5 h-2.5 rounded-full bg-[#e76f51]"></span> Carbohydrates
                </span>
                <span className="font-bold text-[#1b4332]">{activeTotals.carbs}g</span>
              </div>
              <div className="w-full bg-[#f4f0e6] h-2.5 rounded-full overflow-hidden">
                <div
                  className="bg-[#e76f51] h-full rounded-full transition-all duration-500"
                  style={{ width: `${Math.min(100, (activeTotals.carbs / 90) * 100)}%` }}
                ></div>
              </div>
              <span className="text-[10px] text-[#78968c] mt-0.5 block">Fruits, chapati & lunch carbs</span>
            </div>

            {/* Fats */}
            <div>
              <div className="flex justify-between items-center text-xs mb-1.5 font-medium">
                <span className="text-[#1b4332] font-semibold flex items-center gap-1.5">
                  <span className="w-2.5 h-2.5 rounded-full bg-[#e9c46a]"></span> Healthy Fats
                </span>
                <span className="font-bold text-[#1b4332]">{activeTotals.fat}g</span>
              </div>
              <div className="w-full bg-[#f4f0e6] h-2.5 rounded-full overflow-hidden">
                <div
                  className="bg-[#e9c46a] h-full rounded-full transition-all duration-500"
                  style={{ width: `${Math.min(100, (activeTotals.fat / 35) * 100)}%` }}
                ></div>
              </div>
              <span className="text-[10px] text-[#78968c] mt-0.5 block">Egg yolk & cooking drops</span>
            </div>
          </div>

          <div className="bg-[#fdf8f0] border border-[#f3e5c9] rounded-2xl p-3 text-xs text-[#8c6b2d] flex items-start gap-2 mt-2">
            <ShieldAlert className="w-4 h-4 text-[#d48b26] shrink-0 mt-0.5" />
            <span>Strict zero-sugar protocol: 0g added sugar. Natural fruit fructose counted separately.</span>
          </div>
        </div>

        {/* Water Intake Tracker Card */}
        <div className="bg-[#fffefb] rounded-3xl p-6 border border-[#e8e2d5] shadow-xs flex flex-col justify-between">
          <div className="flex items-center justify-between mb-2">
            <div>
              <h3 className="text-sm font-bold text-[#1b4332] uppercase tracking-wider">Water Intake</h3>
              <p className="text-xs text-[#52796f]">Daily Hydration Goal</p>
            </div>
            <span className="p-2.5 rounded-2xl bg-[#e3f2fd] text-[#1976d2]">
              <Droplets className="w-5 h-5" />
            </span>
          </div>

          <div className="text-center my-3">
            <div className="text-3xl font-black text-[#1b4332]">
              {waterMl} <span className="text-sm font-medium text-[#52796f]">/ {waterTargetMl} ml</span>
            </div>
            <p className="text-xs text-[#52796f] mt-1">
              {waterGlasses} of {waterTarget} glasses logged (250 ml/glass)
            </p>

            {/* Visual Glass Progress */}
            <div className="flex items-center justify-center gap-1.5 my-3 flex-wrap max-w-xs mx-auto">
              {Array.from({ length: waterTarget }).map((_, i) => (
                <div
                  key={i}
                  className={`w-4 h-6 rounded-sm border transition-all ${
                    i < waterGlasses
                      ? 'bg-[#40916c] border-[#2d6a4f]'
                      : 'bg-[#f4f0e6] border-[#ded7c9]'
                  }`}
                  title={`Glass ${i + 1}`}
                />
              ))}
            </div>

            {/* Quick Increment/Decrement Buttons */}
            <div className="flex items-center justify-center gap-4 mt-2">
              <button
                onClick={() => updateDayField(selectedDate, 'waterGlasses', Math.max(0, waterGlasses - 1))}
                className="w-10 h-10 rounded-2xl bg-[#f4f0e6] hover:bg-[#ede7db] text-[#1b4332] flex items-center justify-center transition border border-[#e2dcd2]"
                title="Subtract 1 glass"
              >
                <Minus className="w-4 h-4" />
              </button>
              <button
                onClick={() => updateDayField(selectedDate, 'waterGlasses', waterGlasses + 1)}
                className="px-5 h-10 rounded-2xl bg-[#2d6a4f] hover:bg-[#1b4332] text-white font-bold text-xs flex items-center gap-2 shadow-xs transition"
              >
                <Plus className="w-4 h-4" /> Add Glass (+250 ml)
              </button>
            </div>
          </div>

          <div className="bg-[#e9f5ed] p-3 rounded-2xl text-xs text-[#2d6a4f] font-medium text-center">
            {waterPercent >= 100 ? '🎉 Daily hydration goal achieved!' : `${waterPercent}% of target reached today`}
          </div>
        </div>
      </div>

      {/* Daily Meals Checklist Summary */}
      <div className="bg-[#fffefb] rounded-3xl p-6 border border-[#e8e2d5] shadow-xs">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 mb-6">
          <div>
            <div className="flex items-center gap-2">
              <h3 className="text-base font-bold text-[#1b4332]">Daily Meal Completion</h3>
              <span className="bg-[#e9f5ed] text-[#2d6a4f] font-bold text-xs px-2.5 py-0.5 rounded-full">
                {activeTotals.completedMeals} of {activeTotals.totalMeals} Completed ({activeTotals.completionRate}%)
              </span>
            </div>
            <p className="text-xs text-[#52796f] mt-0.5">
              Check off meals as you finish them. Unchecked meals stay marked as pending.
            </p>
          </div>

          <button
            onClick={() => setActiveTab('todays-diet')}
            className="inline-flex items-center gap-1.5 text-xs font-bold text-[#2d6a4f] hover:text-[#1b4332] transition"
          >
            <span>Open Detailed Today's Diet</span>
            <ArrowRight className="w-4 h-4" />
          </button>
        </div>

        {/* 5 Meal Cards */}
        <div className="grid grid-cols-1 md:grid-cols-5 gap-3">
          {activeDay.meals.map((meal) => {
            const isDone = meal.completed;
            const mealCalories = meal.items.reduce((acc, item) => acc + Number(item.calories || 0), 0);

            return (
              <div
                key={meal.id}
                onClick={() => toggleMealCompletion(selectedDate, meal.id)}
                className={`p-4 rounded-2xl border cursor-pointer transition-all ${
                  isDone
                    ? 'bg-[#e9f5ed]/70 border-[#b7e4c7] hover:bg-[#e9f5ed]'
                    : 'bg-[#fffefb] border-[#e8e2d5] hover:border-[#40916c]/60'
                }`}
              >
                <div className="flex items-center justify-between mb-2">
                  <span className="text-[11px] font-bold text-[#52796f] flex items-center gap-1">
                    <Clock className="w-3 h-3 text-[#40916c]" /> {meal.time}
                  </span>
                  <div
                    className={`w-5 h-5 rounded-md flex items-center justify-center border transition ${
                      isDone
                        ? 'bg-[#2d6a4f] border-[#2d6a4f] text-white'
                        : 'border-[#cfc6b8] bg-white'
                    }`}
                  >
                    {isDone && <CheckCircle2 className="w-3.5 h-3.5" />}
                  </div>
                </div>

                <h4 className="text-sm font-bold text-[#1b4332]">{meal.name}</h4>
                <p className="text-xs text-[#52796f] font-semibold mt-0.5">{mealCalories} kcal</p>

                <div className="mt-2 text-[11px] text-[#415a51] line-clamp-2">
                  {meal.items.map((i) => i.name).join(', ')}
                </div>

                <div className="mt-3">
                  <span
                    className={`inline-block text-[10px] font-bold px-2 py-0.5 rounded-full ${
                      isDone
                        ? 'bg-[#2d6a4f] text-white'
                        : 'bg-[#f4f0e6] text-[#708d83]'
                    }`}
                  >
                    {isDone ? 'Completed' : 'Pending'}
                  </span>
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* Weight Snippet & Consistency Bar */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* Weight Management Quick Card */}
        <div className="bg-[#fffefb] rounded-3xl p-6 border border-[#e8e2d5] shadow-xs flex flex-col justify-between">
          <div className="flex items-center justify-between mb-4">
            <div>
              <h3 className="text-sm font-bold text-[#1b4332] uppercase tracking-wider">Weight Management</h3>
              <p className="text-xs text-[#52796f]">Track progress towards your goal</p>
            </div>
            <button
              onClick={() => setActiveTab('weight')}
              className="p-2 rounded-xl bg-[#f4f0e6] text-[#2d6a4f] hover:bg-[#ede7db] transition"
              title="Open Weight Tracker"
            >
              <Scale className="w-4 h-4" />
            </button>
          </div>

          <div className="grid grid-cols-3 gap-3 text-center my-2">
            <div className="bg-[#f9f6f0] p-3 rounded-2xl">
              <span className="text-[11px] text-[#52796f] block font-medium">Starting</span>
              <span className="text-lg font-black text-[#1b4332]">{overallStats.startWeight}</span>
              <span className="text-[10px] text-[#708d83] block">kg</span>
            </div>
            <div className="bg-[#e9f5ed] p-3 rounded-2xl border border-[#b7e4c7]">
              <span className="text-[11px] text-[#2d6a4f] block font-bold">Current</span>
              <span className="text-lg font-black text-[#1b4332]">{overallStats.currentWeight}</span>
              <span className="text-[10px] text-[#2d6a4f] block">kg</span>
            </div>
            <div className="bg-[#f9f6f0] p-3 rounded-2xl">
              <span className="text-[11px] text-[#52796f] block font-medium">Target</span>
              <span className="text-lg font-black text-[#2d6a4f]">{overallStats.targetWeight}</span>
              <span className="text-[10px] text-[#708d83] block">kg</span>
            </div>
          </div>

          <div className="flex items-center justify-between pt-3 border-t border-[#f4f0e6]">
            <div className="flex items-center gap-1.5 text-xs text-[#2d6a4f] font-bold">
              <TrendingDown className="w-4 h-4 text-[#40916c]" />
              <span>
                {overallStats.weightDifference > 0
                  ? `-${overallStats.weightDifference} kg lost`
                  : overallStats.weightDifference < 0
                  ? `+${Math.abs(overallStats.weightDifference)} kg`
                  : 'Starting baseline'}
              </span>
            </div>

            {/* Quick log weight for selected date */}
            <div className="flex items-center gap-2">
              <input
                type="number"
                step="0.1"
                placeholder="Log kg"
                value={activeDay.weight ?? ''}
                onChange={(e) => updateDayField(selectedDate, 'weight', e.target.value === '' ? null : Number(e.target.value))}
                className="w-20 px-2 py-1 text-xs border border-[#cfc6b8] rounded-lg bg-white text-center font-bold text-[#1b4332]"
              />
              <span className="text-xs text-[#52796f] font-semibold">kg</span>
            </div>
          </div>
        </div>

        {/* Daily Notes & Diet Advisory Reminder */}
        <div className="bg-[#fffefb] rounded-3xl p-6 border border-[#e8e2d5] shadow-xs flex flex-col justify-between">
          <div className="flex items-center justify-between mb-2">
            <div>
              <h3 className="text-sm font-bold text-[#1b4332] uppercase tracking-wider">Day {activeDay.dayNumber} Notes</h3>
              <p className="text-xs text-[#52796f]">Journal energy levels & thoughts</p>
            </div>
            <span className="p-2 rounded-xl bg-[#f4f0e6] text-[#2d6a4f]">
              <Sparkles className="w-4 h-4" />
            </span>
          </div>

          <textarea
            rows={3}
            value={activeDay.notes || ''}
            onChange={(e) => updateDayField(selectedDate, 'notes', e.target.value)}
            placeholder="How are you feeling today? Any cravings resisted? Energy levels during workouts..."
            className="w-full text-xs p-3 rounded-2xl border border-[#ded7c9] bg-[#fdfbf7] focus:ring-2 focus:ring-[#2d6a4f] focus:outline-none transition resize-none"
          ></textarea>

          <div className="mt-3 bg-[#e9f5ed]/50 p-2.5 rounded-xl flex items-center justify-between text-xs text-[#2d6a4f]">
            <span className="font-semibold">Quick Calendar Jump:</span>
            <button
              onClick={() => setActiveTab('calendar')}
              className="font-bold underline hover:text-[#1b4332]"
            >
              View 55-Day Grid
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
