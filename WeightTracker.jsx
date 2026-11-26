import React, { useState } from 'react';
import {
  Scale,
  TrendingDown,
  Target,
  Calendar,
  Save,
  Plus,
  ArrowDownRight,
  Sparkles,
  Award,
} from 'lucide-react';
import {
  ResponsiveContainer,
  AreaChart,
  Area,
  XAxis,
  YAxis,
  Tooltip,
  CartesianGrid,
  ReferenceLine,
} from 'recharts';
import { useFitness } from '../context/FitnessContext';

export default function WeightTracker() {
  const {
    daysData,
    selectedDate,
    setSelectedDate,
    updateDayField,
    userProfile,
    setUserProfile,
    overallStats,
  } = useFitness();

  const [inputWeight, setInputWeight] = useState(
    daysData[selectedDate]?.weight ?? ''
  );
  const [targetInput, setTargetInput] = useState(userProfile.targetWeight || 68.0);
  const [startInput, setStartInput] = useState(userProfile.startWeight || 75.0);

  // Sync state if selectedDate changes
  React.useEffect(() => {
    setInputWeight(daysData[selectedDate]?.weight ?? '');
  }, [selectedDate, daysData]);

  const handleSaveWeight = (e) => {
    e.preventDefault();
    const val = inputWeight === '' ? null : Number(inputWeight);
    updateDayField(selectedDate, 'weight', val);
    alert(`Weight logged for ${selectedDate}: ${val} kg`);
  };

  const handleUpdateTargets = (e) => {
    e.preventDefault();
    setUserProfile((prev) => ({
      ...prev,
      startWeight: Number(startInput),
      targetWeight: Number(targetInput),
    }));
    alert('Target settings saved successfully!');
  };

  // Build chart dataset across all 55 days
  const chartData = Object.keys(daysData)
    .sort()
    .map((dateKey) => {
      const day = daysData[dateKey];
      return {
        date: dateKey,
        dayNumber: day.dayNumber,
        label: `Day ${day.dayNumber}`,
        shortDate: dateKey.substring(5),
        weight: day.weight !== null && day.weight !== undefined ? Number(day.weight) : null,
      };
    })
    .filter((d) => d.weight !== null); // show recorded points

  // Group into weekly comparisons (Week 1 to Week 8)
  const weeks = [
    { name: 'Week 1 (Nov 1 - Nov 7)', start: 1, end: 7 },
    { name: 'Week 2 (Nov 8 - Nov 14)', start: 8, end: 14 },
    { name: 'Week 3 (Nov 15 - Nov 21)', start: 15, end: 21 },
    { name: 'Week 4 (Nov 22 - Nov 28)', start: 22, end: 28 },
    { name: 'Week 5 (Nov 29 - Dec 5)', start: 29, end: 35 },
    { name: 'Week 6 (Dec 6 - Dec 12)', start: 36, end: 42 },
    { name: 'Week 7 (Dec 13 - Dec 19)', start: 43, end: 49 },
    { name: 'Week 8 (Dec 20 - Dec 25)', start: 50, end: 55 },
  ];

  const weeklyStats = weeks.map((w) => {
    const weightsInWeek = [];
    Object.keys(daysData).forEach((k) => {
      const day = daysData[k];
      if (day.dayNumber >= w.start && day.dayNumber <= w.end && day.weight) {
        weightsInWeek.push(Number(day.weight));
      }
    });

    const avg = weightsInWeek.length > 0
      ? Math.round((weightsInWeek.reduce((a, b) => a + b, 0) / weightsInWeek.length) * 10) / 10
      : null;

    const startVal = weightsInWeek.length > 0 ? weightsInWeek[0] : null;
    const endVal = weightsInWeek.length > 0 ? weightsInWeek[weightsInWeek.length - 1] : null;

    return {
      ...w,
      count: weightsInWeek.length,
      avgWeight: avg,
      startVal,
      endVal,
      change: startVal && endVal ? Math.round((startVal - endVal) * 10) / 10 : 0,
    };
  });

  return (
    <div className="space-y-6 pb-20 lg:pb-8">
      {/* Page Title */}
      <div className="bg-[#fffefb] rounded-3xl p-6 border border-[#e8e2d5] shadow-xs">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
          <div>
            <div className="inline-flex items-center gap-1.5 bg-[#e9f5ed] text-[#2d6a4f] text-xs font-bold px-3 py-1 rounded-full mb-2">
              <Scale className="w-3.5 h-3.5" />
              <span>55-Day Transformation Trajectory</span>
            </div>
            <h2 className="text-2xl font-black text-[#1b4332]">Weight Management Tracker</h2>
            <p className="text-xs text-[#52796f] mt-1 max-w-2xl">
              Track your morning weigh-in consistently. Fasted weigh-ins right after waking yield the most accurate, water-neutral trendlines.
            </p>
          </div>

          <div className="flex items-center gap-2 bg-[#f4f0e6] p-2 rounded-2xl border border-[#ded7c9]">
            <Calendar className="w-4 h-4 text-[#2d6a4f] ml-2" />
            <span className="text-xs font-bold text-[#1b4332]">
              Logging for: {selectedDate} (Day {daysData[selectedDate]?.dayNumber || 1})
            </span>
          </div>
        </div>
      </div>

      {/* Metrics Row */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        <div className="bg-[#fffefb] rounded-3xl p-5 border border-[#e8e2d5] shadow-xs">
          <span className="text-[11px] font-bold text-[#52796f] uppercase block">Starting Weight</span>
          <div className="flex items-baseline gap-1 mt-1">
            <span className="text-2xl font-black text-[#1b4332]">{overallStats.startWeight}</span>
            <span className="text-xs text-[#52796f]">kg</span>
          </div>
          <span className="text-[10px] text-[#708d83] mt-1 block">Nov 1 Baseline</span>
        </div>

        <div className="bg-[#fffefb] rounded-3xl p-5 border border-[#b7e4c7] shadow-xs bg-[#e9f5ed]/30">
          <span className="text-[11px] font-bold text-[#2d6a4f] uppercase block">Current Weight</span>
          <div className="flex items-baseline gap-1 mt-1">
            <span className="text-2xl font-black text-[#1b4332]">{overallStats.currentWeight}</span>
            <span className="text-xs text-[#2d6a4f] font-bold">kg</span>
          </div>
          <span className="text-[10px] text-[#2d6a4f] mt-1 block">Latest Recorded</span>
        </div>

        <div className="bg-[#fffefb] rounded-3xl p-5 border border-[#e8e2d5] shadow-xs">
          <span className="text-[11px] font-bold text-[#52796f] uppercase block">Target Weight</span>
          <div className="flex items-baseline gap-1 mt-1">
            <span className="text-2xl font-black text-[#2d6a4f]">{overallStats.targetWeight}</span>
            <span className="text-xs text-[#52796f]">kg</span>
          </div>
          <span className="text-[10px] text-[#708d83] mt-1 block">Dec 25 Milestone</span>
        </div>

        <div className="bg-[#fffefb] rounded-3xl p-5 border border-[#e8e2d5] shadow-xs">
          <span className="text-[11px] font-bold text-[#52796f] uppercase block">Weight Delta</span>
          <div className="flex items-baseline gap-1 mt-1">
            <span className="text-2xl font-black text-[#2d6a4f]">
              {overallStats.weightDifference > 0 ? `-${overallStats.weightDifference}` : overallStats.weightDifference}
            </span>
            <span className="text-xs text-[#52796f]">kg</span>
          </div>
          <span className="text-[10px] text-[#2d6a4f] mt-1 font-semibold flex items-center gap-1">
            <TrendingDown className="w-3.5 h-3.5 text-[#40916c]" /> Total Change
          </span>
        </div>
      </div>

      {/* Weight Entry Form & Targets Settings */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* Daily Weight Entry */}
        <form
          onSubmit={handleSaveWeight}
          className="bg-[#fffefb] rounded-3xl p-6 border border-[#e8e2d5] shadow-xs flex flex-col justify-between"
        >
          <div>
            <div className="flex items-center gap-2 mb-2">
              <Scale className="w-5 h-5 text-[#2d6a4f]" />
              <h3 className="text-base font-extrabold text-[#1b4332]">
                Log Weight for {selectedDate}
              </h3>
            </div>
            <p className="text-xs text-[#52796f] mb-4">
              Enter your weight in kilograms for Day {daysData[selectedDate]?.dayNumber || 1}.
            </p>

            <div className="flex items-center gap-3">
              <div className="relative flex-1">
                <input
                  type="number"
                  step="0.05"
                  min="30"
                  max="250"
                  placeholder="e.g. 74.2"
                  value={inputWeight}
                  onChange={(e) => setInputWeight(e.target.value)}
                  className="w-full text-lg font-black text-[#1b4332] px-4 py-2.5 rounded-2xl border border-[#cfc6b8] bg-[#fdfbf7] focus:ring-2 focus:ring-[#2d6a4f] focus:outline-none"
                />
                <span className="absolute right-4 top-3 text-xs font-bold text-[#52796f]">kg</span>
              </div>

              <button
                type="submit"
                className="px-6 py-3 bg-[#2d6a4f] hover:bg-[#1b4332] text-white rounded-2xl text-xs font-bold flex items-center gap-2 shadow-xs transition"
              >
                <Save className="w-4 h-4" /> Save Weight
              </button>
            </div>
          </div>

          <div className="mt-4 pt-3 border-t border-[#f4f0e6] flex items-center justify-between text-xs text-[#52796f]">
            <span>Tip: Weigh yourself immediately after morning bathroom.</span>
          </div>
        </form>

        {/* Target Weight Setting */}
        <form
          onSubmit={handleUpdateTargets}
          className="bg-[#fffefb] rounded-3xl p-6 border border-[#e8e2d5] shadow-xs flex flex-col justify-between"
        >
          <div>
            <div className="flex items-center gap-2 mb-2">
              <Target className="w-5 h-5 text-[#2d6a4f]" />
              <h3 className="text-base font-extrabold text-[#1b4332]">Target & Starting Goals</h3>
            </div>
            <p className="text-xs text-[#52796f] mb-4">
              Adjust your starting weight and December 25 finish line target.
            </p>

            <div className="grid grid-cols-2 gap-3">
              <div>
                <label className="text-[11px] font-bold text-[#52796f] block mb-1">Starting (kg)</label>
                <input
                  type="number"
                  step="0.1"
                  value={startInput}
                  onChange={(e) => setStartInput(e.target.value)}
                  className="w-full text-xs font-bold p-2.5 rounded-xl border border-[#cfc6b8] bg-[#fdfbf7]"
                />
              </div>
              <div>
                <label className="text-[11px] font-bold text-[#2d6a4f] block mb-1">Target (kg)</label>
                <input
                  type="number"
                  step="0.1"
                  value={targetInput}
                  onChange={(e) => setTargetInput(e.target.value)}
                  className="w-full text-xs font-bold p-2.5 rounded-xl border border-[#cfc6b8] bg-[#fdfbf7]"
                />
              </div>
            </div>
          </div>

          <div className="mt-4 pt-3 border-t border-[#f4f0e6] flex justify-end">
            <button
              type="submit"
              className="px-5 py-2 bg-[#f4f0e6] hover:bg-[#ede7db] text-[#1b4332] font-bold rounded-xl text-xs transition border border-[#ded7c9]"
            >
              Update Targets
            </button>
          </div>
        </form>
      </div>

      {/* Interactive Progress Graph Card */}
      <div className="bg-[#fffefb] rounded-3xl p-6 border border-[#e8e2d5] shadow-xs">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 mb-6">
          <div>
            <h3 className="text-base font-extrabold text-[#1b4332]">Weight Progress Trajectory</h3>
            <p className="text-xs text-[#52796f]">Visualizing recorded weight readings across the 55 days</p>
          </div>
          <div className="flex items-center gap-3 text-xs font-semibold">
            <span className="flex items-center gap-1.5 text-[#2d6a4f]">
              <span className="w-3 h-3 rounded-full bg-[#2d6a4f]"></span> Actual Weight
            </span>
            <span className="flex items-center gap-1.5 text-[#e76f51]">
              <span className="w-3 h-0.5 bg-[#e76f51]"></span> Target Line ({userProfile.targetWeight} kg)
            </span>
          </div>
        </div>

        <div className="h-72 w-full">
          {chartData.length > 0 ? (
            <ResponsiveContainer width="100%" height="100%">
              <AreaChart data={chartData} margin={{ top: 10, right: 20, left: -20, bottom: 0 }}>
                <defs>
                  <linearGradient id="weightGrad" x1="0%" y1="0%" x2="0%" y2="100%">
                    <stop offset="5%" stopColor="#2d6a4f" stopOpacity={0.4} />
                    <stop offset="95%" stopColor="#2d6a4f" stopOpacity={0.0} />
                  </linearGradient>
                </defs>
                <CartesianGrid strokeDasharray="3 3" stroke="#f0ece1" vertical={false} />
                <XAxis
                  dataKey="shortDate"
                  tick={{ fontSize: 11, fill: '#708d83' }}
                  tickLine={false}
                  axisLine={{ stroke: '#ded7c9' }}
                />
                <YAxis
                  domain={['dataMin - 1', 'dataMax + 1']}
                  tick={{ fontSize: 11, fill: '#708d83' }}
                  tickLine={false}
                  axisLine={{ stroke: '#ded7c9' }}
                />
                <Tooltip
                  content={({ active, payload }) => {
                    if (active && payload && payload.length) {
                      const data = payload[0].payload;
                      return (
                        <div className="bg-[#1b4332] text-white p-2.5 rounded-xl text-xs shadow-lg">
                          <p className="font-bold">{data.date} (Day {data.dayNumber})</p>
                          <p className="text-[#95d5b2] font-black text-sm mt-0.5">
                            {data.weight} kg
                          </p>
                        </div>
                      );
                    }
                    return null;
                  }}
                />
                <ReferenceLine
                  y={userProfile.targetWeight}
                  stroke="#e76f51"
                  strokeDasharray="4 4"
                  label={{
                    value: `Goal: ${userProfile.targetWeight}kg`,
                    position: 'insideBottomRight',
                    fill: '#e76f51',
                    fontSize: 10,
                  }}
                />
                <Area
                  type="monotone"
                  dataKey="weight"
                  stroke="#2d6a4f"
                  strokeWidth={3}
                  fillOpacity={1}
                  fill="url(#weightGrad)"
                  dot={{ r: 4, fill: '#2d6a4f', stroke: '#ffffff', strokeWidth: 2 }}
                />
              </AreaChart>
            </ResponsiveContainer>
          ) : (
            <div className="h-full flex flex-col items-center justify-center text-center text-[#52796f]">
              <Scale className="w-10 h-10 text-[#a0b5ad] mb-2" />
              <p className="text-sm font-bold">No weight entries recorded yet.</p>
              <p className="text-xs">Log your first weigh-in above to start seeing the chart trendline!</p>
            </div>
          )}
        </div>
      </div>

      {/* Weekly Weight Comparison Breakdown */}
      <div className="bg-[#fffefb] rounded-3xl p-6 border border-[#e8e2d5] shadow-xs">
        <h3 className="text-base font-extrabold text-[#1b4332] mb-3">Weekly Weight Comparison Breakdown</h3>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3">
          {weeklyStats.map((week, idx) => (
            <div
              key={idx}
              className="p-4 rounded-2xl bg-[#fdfbf7] border border-[#ede5d8] space-y-2"
            >
              <div className="flex items-center justify-between">
                <span className="text-xs font-bold text-[#1b4332]">Week {idx + 1}</span>
                <span className="text-[10px] text-[#52796f] font-semibold bg-[#f4f0e6] px-2 py-0.5 rounded-full">
                  {week.count} entries
                </span>
              </div>
              <p className="text-[11px] text-[#708d83]">{week.name}</p>

              <div className="pt-2 border-t border-[#f4f0e6] flex items-center justify-between text-xs">
                <div>
                  <span className="text-[10px] text-[#52796f] block">Avg Weight</span>
                  <span className="font-bold text-[#1b4332]">{week.avgWeight ? `${week.avgWeight} kg` : '—'}</span>
                </div>
                {week.change !== 0 && (
                  <div className="text-right">
                    <span className="text-[10px] text-[#52796f] block">Weekly Delta</span>
                    <span className="font-black text-[#2d6a4f]">-{week.change} kg</span>
                  </div>
                )}
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
