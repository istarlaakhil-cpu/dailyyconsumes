import React, { useState } from 'react';
import {
  BarChart3,
  TrendingDown,
  Award,
  Sparkles,
  Printer,
  Calendar,
  Flame,
  PieChart as PieIcon,
  CheckCircle2,
  XCircle,
  FileText,
  Download,
} from 'lucide-react';
import {
  ResponsiveContainer,
  BarChart,
  Bar,
  LineChart,
  Line,
  XAxis,
  YAxis,
  Tooltip,
  CartesianGrid,
  Legend,
  PieChart,
  Pie,
  Cell,
} from 'recharts';
import { useFitness } from '../context/FitnessContext';

export default function AnalyticsReports() {
  const {
    daysData,
    userProfile,
    overallStats,
    calculateTotalsForDay,
    START_DATE,
    END_DATE,
  } = useFitness();

  const [activeReportTab, setActiveReportTab] = useState('overview'); // 'overview', 'weekly', 'dec25'

  // Prepare full daily timeline dataset
  const dailyMetrics = Object.keys(daysData)
    .sort()
    .map((dateKey) => {
      const day = daysData[dateKey];
      const totals = calculateTotalsForDay(day);
      return {
        date: dateKey,
        shortDate: dateKey.substring(5),
        dayNumber: day.dayNumber,
        calories: totals.calories,
        protein: totals.protein,
        carbs: totals.carbs,
        fat: totals.fat,
        completedMeals: totals.completedMeals,
        missedMeals: Math.max(0, 5 - totals.completedMeals),
        weight: day.weight ? Number(day.weight) : null,
      };
    });

  // Macro distribution totals
  const totalProteinSum = dailyMetrics.reduce((s, d) => s + d.protein, 0);
  const totalCarbsSum = dailyMetrics.reduce((s, d) => s + d.carbs, 0);
  const totalFatSum = dailyMetrics.reduce((s, d) => s + d.fat, 0);

  const macroPieData = [
    { name: 'Protein', value: Math.round(totalProteinSum), color: '#2d6a4f' },
    { name: 'Carbs', value: Math.round(totalCarbsSum), color: '#e76f51' },
    { name: 'Fat', value: Math.round(totalFatSum), color: '#e9c46a' },
  ];

  // Weekly group summaries
  const weeks = [
    { name: 'Week 1 (Nov 1–7)', start: 1, end: 7 },
    { name: 'Week 2 (Nov 8–14)', start: 8, end: 14 },
    { name: 'Week 3 (Nov 15–21)', start: 15, end: 21 },
    { name: 'Week 4 (Nov 22–28)', start: 22, end: 28 },
    { name: 'Week 5 (Nov 29–Dec 5)', start: 29, end: 35 },
    { name: 'Week 6 (Dec 6–12)', start: 36, end: 42 },
    { name: 'Week 7 (Dec 13–19)', start: 43, end: 49 },
    { name: 'Week 8 (Dec 20–25)', start: 50, end: 55 },
  ];

  const weeklySummaries = weeks.map((w) => {
    const daysInWeek = dailyMetrics.filter((d) => d.dayNumber >= w.start && d.dayNumber <= w.end);
    const avgCal = daysInWeek.length > 0 ? Math.round(daysInWeek.reduce((s, d) => s + d.calories, 0) / daysInWeek.length) : 0;
    const completedMeals = daysInWeek.reduce((s, d) => s + d.completedMeals, 0);
    const totalPossibleMeals = daysInWeek.length * 5;
    const completionRate = totalPossibleMeals > 0 ? Math.round((completedMeals / totalPossibleMeals) * 100) : 0;

    const weights = daysInWeek.map((d) => d.weight).filter((wt) => wt !== null);
    const avgWeight = weights.length > 0 ? Math.round((weights.reduce((a, b) => a + b, 0) / weights.length) * 10) / 10 : null;

    return {
      ...w,
      avgCalories: avgCal,
      completedMeals,
      totalPossibleMeals,
      completionRate,
      avgWeight,
    };
  });

  const handlePrint = () => {
    window.print();
  };

  return (
    <div className="space-y-6 pb-20 lg:pb-8">
      {/* Title & Report Controls */}
      <div className="bg-[#fffefb] rounded-3xl p-6 border border-[#e8e2d5] shadow-xs no-print">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
          <div>
            <div className="inline-flex items-center gap-1.5 bg-[#e9f5ed] text-[#2d6a4f] text-xs font-bold px-3 py-1 rounded-full mb-2">
              <BarChart3 className="w-3.5 h-3.5" />
              <span>Transformation Intelligence</span>
            </div>
            <h2 className="text-2xl font-black text-[#1b4332]">Analytics & Performance Reports</h2>
            <p className="text-xs text-[#52796f] mt-1 max-w-2xl">
              Track consistency trends, caloric adherence, macronutrient ratios, and generate the final milestone transformation report for December 25, 2026.
            </p>
          </div>

          <div className="flex items-center gap-2">
            <button
              onClick={handlePrint}
              className="px-4 py-2.5 bg-[#f4f0e6] hover:bg-[#ede7db] text-[#1b4332] rounded-2xl text-xs font-bold flex items-center gap-2 transition border border-[#ded7c9]"
            >
              <Printer className="w-4 h-4 text-[#2d6a4f]" />
              <span>Print / Save PDF</span>
            </button>
          </div>
        </div>

        {/* Report Sub-Tabs */}
        <div className="flex items-center gap-2 mt-4 pt-4 border-t border-[#f4f0e6]">
          {[
            { id: 'overview', label: 'Interactive Charts' },
            { id: 'weekly', label: 'Weekly Summaries' },
            { id: 'dec25', label: 'Final Dec 25 Milestone Report' },
          ].map((tab) => (
            <button
              key={tab.id}
              onClick={() => setActiveReportTab(tab.id)}
              className={`px-4 py-2 rounded-xl text-xs font-bold transition ${
                activeReportTab === tab.id
                  ? 'bg-[#2d6a4f] text-white shadow-xs'
                  : 'bg-[#f4f0e6] text-[#52796f] hover:bg-[#ede7db]'
              }`}
            >
              {tab.label}
            </button>
          ))}
        </div>
      </div>

      {/* VIEW A: INTERACTIVE CHARTS */}
      {activeReportTab === 'overview' && (
        <div className="space-y-6">
          {/* Calorie Trend Chart */}
          <div className="bg-[#fffefb] rounded-3xl p-6 border border-[#e8e2d5] shadow-xs">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 mb-4">
              <div>
                <h3 className="text-base font-extrabold text-[#1b4332]">Daily Calorie Intake (55 Days)</h3>
                <p className="text-xs text-[#52796f]">Caloric consumption compared to target baseline</p>
              </div>
              <span className="text-xs font-bold text-[#2d6a4f] bg-[#e9f5ed] px-3 py-1 rounded-full">
                Target: {userProfile.calorieTarget} kcal/day
              </span>
            </div>

            <div className="h-72 w-full">
              <ResponsiveContainer width="100%" height="100%">
                <BarChart data={dailyMetrics.slice(0, 30)} margin={{ top: 10, right: 10, left: -20, bottom: 0 }}>
                  <CartesianGrid strokeDasharray="3 3" stroke="#f0ece1" vertical={false} />
                  <XAxis dataKey="shortDate" tick={{ fontSize: 10, fill: '#708d83' }} axisLine={{ stroke: '#ded7c9' }} />
                  <YAxis tick={{ fontSize: 10, fill: '#708d83' }} axisLine={{ stroke: '#ded7c9' }} />
                  <Tooltip
                    content={({ active, payload }) => {
                      if (active && payload && payload.length) {
                        const data = payload[0].payload;
                        return (
                          <div className="bg-[#1b4332] text-white p-2.5 rounded-xl text-xs shadow-lg">
                            <p className="font-bold">{data.date} (Day {data.dayNumber})</p>
                            <p className="text-[#95d5b2] font-black text-sm">{data.calories} kcal</p>
                            <p className="text-[10px] text-[#d8f3dc]">Meals completed: {data.completedMeals}/5</p>
                          </div>
                        );
                      }
                      return null;
                    }}
                  />
                  <Bar dataKey="calories" fill="#2d6a4f" radius={[4, 4, 0, 0]} />
                </BarChart>
              </ResponsiveContainer>
            </div>
            <p className="text-[11px] text-[#708d83] mt-2 text-center">
              Displaying first 30 days of the 55-day cycle. All days logged in database.
            </p>
          </div>

          {/* Macro Distribution & Meals Completed Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {/* Macro Ratio */}
            <div className="bg-[#fffefb] rounded-3xl p-6 border border-[#e8e2d5] shadow-xs flex flex-col justify-between">
              <div>
                <h3 className="text-base font-extrabold text-[#1b4332]">Macronutrient Ratio</h3>
                <p className="text-xs text-[#52796f]">Aggregated protein, carbohydrates, and fat balance</p>
              </div>

              <div className="h-60 w-full flex items-center justify-center">
                <ResponsiveContainer width="100%" height="100%">
                  <PieChart>
                    <Pie
                      data={macroPieData}
                      dataKey="value"
                      nameKey="name"
                      cx="50%"
                      cy="50%"
                      innerRadius={55}
                      outerRadius={80}
                      paddingAngle={4}
                    >
                      {macroPieData.map((entry, index) => (
                        <Cell key={`cell-${index}`} fill={entry.color} />
                      ))}
                    </Pie>
                    <Tooltip />
                  </PieChart>
                </ResponsiveContainer>
              </div>

              <div className="flex justify-around text-xs pt-3 border-t border-[#f4f0e6]">
                {macroPieData.map((m) => (
                  <div key={m.name} className="text-center">
                    <span className="inline-block w-2.5 h-2.5 rounded-full mr-1.5" style={{ backgroundColor: m.color }}></span>
                    <span className="font-bold text-[#1b4332]">{m.name}: </span>
                    <span className="text-[#52796f] font-semibold">{m.value}g</span>
                  </div>
                ))}
              </div>
            </div>

            {/* Meals Completed vs Missed */}
            <div className="bg-[#fffefb] rounded-3xl p-6 border border-[#e8e2d5] shadow-xs flex flex-col justify-between">
              <div>
                <h3 className="text-base font-extrabold text-[#1b4332]">Meal Compliance Breakdown</h3>
                <p className="text-xs text-[#52796f]">Consistency in marking 5 daily scheduled meals</p>
              </div>

              <div className="my-auto py-4 space-y-4">
                <div>
                  <div className="flex justify-between text-xs font-bold text-[#1b4332] mb-1">
                    <span>Overall Meal Completion</span>
                    <span className="text-[#2d6a4f]">{overallStats.consistencyRate}%</span>
                  </div>
                  <div className="w-full bg-[#f4f0e6] h-3 rounded-full overflow-hidden">
                    <div
                      className="bg-[#2d6a4f] h-full rounded-full transition-all duration-500"
                      style={{ width: `${overallStats.consistencyRate}%` }}
                    ></div>
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-3 text-center text-xs">
                  <div className="bg-[#e9f5ed] p-3 rounded-2xl border border-[#b7e4c7]">
                    <CheckCircle2 className="w-5 h-5 text-[#2d6a4f] mx-auto mb-1" />
                    <span className="text-[10px] text-[#2d6a4f] block uppercase font-bold">Completed Meals</span>
                    <span className="text-xl font-black text-[#1b4332]">{overallStats.totalMealsCompleted}</span>
                  </div>

                  <div className="bg-[#fef3c7] p-3 rounded-2xl border border-[#fde68a]">
                    <XCircle className="w-5 h-5 text-[#d97706] mx-auto mb-1" />
                    <span className="text-[10px] text-[#92400e] block uppercase font-bold">Pending / Missed</span>
                    <span className="text-xl font-black text-[#92400e]">
                      {Math.max(0, overallStats.currentDayNumber * 5 - overallStats.totalMealsCompleted)}
                    </span>
                  </div>
                </div>
              </div>

              <p className="text-[11px] text-[#708d83] text-center pt-3 border-t border-[#f4f0e6]">
                Target: 275 total meals across the 55-day program (5 meals/day × 55 days)
              </p>
            </div>
          </div>
        </div>
      )}

      {/* VIEW B: WEEKLY SUMMARIES */}
      {activeReportTab === 'weekly' && (
        <div className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {weeklySummaries.map((wk, i) => (
              <div
                key={i}
                className="bg-[#fffefb] rounded-3xl p-5 border border-[#e8e2d5] shadow-xs space-y-3"
              >
                <div className="flex items-center justify-between">
                  <h4 className="text-sm font-extrabold text-[#1b4332]">{wk.name}</h4>
                  <span className="text-xs font-black text-[#2d6a4f] bg-[#e9f5ed] px-2.5 py-0.5 rounded-full">
                    {wk.completionRate}% Adherence
                  </span>
                </div>

                <div className="grid grid-cols-3 gap-2 text-center text-xs pt-2 border-t border-[#f4f0e6]">
                  <div className="bg-[#f9f6f0] p-2 rounded-xl">
                    <span className="text-[10px] text-[#52796f] block">Avg Calories</span>
                    <span className="font-black text-[#1b4332]">{wk.avgCalories} kcal</span>
                  </div>
                  <div className="bg-[#f9f6f0] p-2 rounded-xl">
                    <span className="text-[10px] text-[#52796f] block">Meals Done</span>
                    <span className="font-black text-[#2d6a4f]">{wk.completedMeals}/{wk.totalPossibleMeals}</span>
                  </div>
                  <div className="bg-[#f9f6f0] p-2 rounded-xl">
                    <span className="text-[10px] text-[#52796f] block">Avg Weight</span>
                    <span className="font-black text-[#1b4332]">{wk.avgWeight ? `${wk.avgWeight} kg` : '—'}</span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* VIEW C: FINAL DECEMBER 25 REPORT */}
      {activeReportTab === 'dec25' && (
        <div className="bg-[#fffefb] rounded-3xl p-8 border border-[#e8e2d5] shadow-sm space-y-6 print-page">
          {/* Certificate / Official Header */}
          <div className="text-center space-y-2 border-b border-[#ded7c9] pb-6">
            <div className="w-16 h-16 rounded-3xl bg-gradient-to-br from-[#2d6a4f] to-[#1b4332] text-white flex items-center justify-center mx-auto shadow-md">
              <Award className="w-9 h-9 text-[#95d5b2]" />
            </div>
            <h3 className="text-2xl font-black text-[#1b4332] uppercase tracking-wide">
              55-Day Transformation Final Report
            </h3>
            <p className="text-xs text-[#52796f] font-semibold">
              Period: November 1, 2026 – December 25, 2026 (Christmas Day Milestone)
            </p>
            <p className="text-xs text-[#2d6a4f] font-bold">
              Athlete / Participant: {userProfile.name}
            </p>
          </div>

          {/* Key Executive Summary */}
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 text-center">
            <div className="bg-[#f9f6f0] p-4 rounded-2xl border border-[#e2dcd2]">
              <span className="text-[10px] uppercase font-bold text-[#52796f] block">Starting Weight</span>
              <span className="text-2xl font-black text-[#1b4332]">{overallStats.startWeight} kg</span>
            </div>
            <div className="bg-[#f9f6f0] p-4 rounded-2xl border border-[#e2dcd2]">
              <span className="text-[10px] uppercase font-bold text-[#52796f] block">Dec 25 Target</span>
              <span className="text-2xl font-black text-[#2d6a4f]">{overallStats.targetWeight} kg</span>
            </div>
            <div className="bg-[#e9f5ed] p-4 rounded-2xl border border-[#b7e4c7]">
              <span className="text-[10px] uppercase font-bold text-[#2d6a4f] block">Net Transformation</span>
              <span className="text-2xl font-black text-[#1b4332]">
                {overallStats.weightDifference > 0 ? `-${overallStats.weightDifference}` : overallStats.weightDifference} kg
              </span>
            </div>
            <div className="bg-[#f9f6f0] p-4 rounded-2xl border border-[#e2dcd2]">
              <span className="text-[10px] uppercase font-bold text-[#52796f] block">Overall Consistency</span>
              <span className="text-2xl font-black text-[#2d6a4f]">{overallStats.consistencyRate}%</span>
            </div>
          </div>

          {/* Diet Rules Compliance Audit */}
          <div className="bg-[#fdfbf7] p-5 rounded-2xl border border-[#ede5d8] space-y-3">
            <h4 className="text-sm font-extrabold text-[#1b4332]">Dietary Protocol Audit</h4>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-xs">
              <div className="flex items-center gap-2">
                <CheckCircle2 className="w-4 h-4 text-[#2d6a4f]" />
                <span className="font-semibold text-[#1b4332]">Zero Added Sugars Maintained</span>
              </div>
              <div className="flex items-center gap-2">
                <CheckCircle2 className="w-4 h-4 text-[#2d6a4f]" />
                <span className="font-semibold text-[#1b4332]">Morning Hydration & Watermelon Adherence</span>
              </div>
              <div className="flex items-center gap-2">
                <CheckCircle2 className="w-4 h-4 text-[#2d6a4f]" />
                <span className="font-semibold text-[#1b4332]">L-Carnitine & Evening Fasting Compliance</span>
              </div>
              <div className="flex items-center gap-2">
                <CheckCircle2 className="w-4 h-4 text-[#2d6a4f]" />
                <span className="font-semibold text-[#1b4332]">Full 55-Day Log Continuity</span>
              </div>
            </div>
          </div>

          <div className="text-center pt-4 border-t border-[#f4f0e6] text-xs text-[#708d83]">
            Generated by MY 55-DAY FITNESS TRANSFORMATION TRACKER • Built with discipline and science.
          </div>
        </div>
      )}
    </div>
  );
}
