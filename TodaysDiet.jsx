import React, { useState } from 'react';
import {
  UtensilsCrossed,
  CheckCircle2,
  Clock,
  Plus,
  Trash2,
  Edit2,
  ShieldAlert,
  Flame,
  Info,
  ChevronDown,
  Sparkles,
  Save,
} from 'lucide-react';
import { useFitness } from '../context/FitnessContext';
import { LUNCH_PRESETS } from '../data/nutritionDb';

export default function TodaysDiet() {
  const {
    activeDay,
    selectedDate,
    activeTotals,
    toggleMealCompletion,
    updateMealItem,
    addMealItem,
    deleteMealItem,
    nutritionDb,
  } = useFitness();

  const [addingToMealId, setAddingToMealId] = useState(null);
  const [selectedDbFoodId, setSelectedDbFoodId] = useState('');
  const [customItem, setCustomItem] = useState({
    name: '',
    qty: 1,
    unit: 'serving',
    grams: 100,
    calories: 100,
    protein: 5,
    carbs: 10,
    fat: 2,
    isEstimated: true,
  });

  // State for quick lunch selector modal/dropdown
  const [editingLunchId, setEditingLunchId] = useState(null);

  const handleAddFromDb = (mealId) => {
    const food = nutritionDb.find((f) => f.id === selectedDbFoodId);
    if (!food) return;

    addMealItem(selectedDate, mealId, {
      name: food.name,
      qty: food.defaultQty,
      unit: food.unit,
      grams: food.grams,
      calories: food.calories,
      protein: food.protein,
      carbs: food.carbs,
      fat: food.fat,
      isEstimated: food.isEstimated,
    });

    setAddingToMealId(null);
    setSelectedDbFoodId('');
  };

  const handleAddCustom = (mealId) => {
    if (!customItem.name.trim()) return;

    addMealItem(selectedDate, mealId, {
      ...customItem,
      calories: Number(customItem.calories || 0),
      protein: Number(customItem.protein || 0),
      carbs: Number(customItem.carbs || 0),
      fat: Number(customItem.fat || 0),
    });

    setAddingToMealId(null);
    setCustomItem({
      name: '',
      qty: 1,
      unit: 'serving',
      grams: 100,
      calories: 100,
      protein: 5,
      carbs: 10,
      fat: 2,
      isEstimated: true,
    });
  };

  const handleLunchPresetSelect = (mealId, itemId, preset) => {
    updateMealItem(selectedDate, mealId, itemId, {
      name: preset.name,
      grams: 100,
      calories: preset.calories,
      protein: preset.protein,
      carbs: preset.carbs,
      fat: preset.fat,
      isEstimated: false,
    });
    setEditingLunchId(null);
  };

  return (
    <div className="space-y-6 pb-20 lg:pb-8">
      {/* Header with Diet Rules Pill */}
      <div className="bg-[#fffefb] rounded-3xl p-6 border border-[#e8e2d5] shadow-xs">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
          <div>
            <div className="inline-flex items-center gap-1.5 bg-[#e9f5ed] text-[#2d6a4f] text-xs font-bold px-3 py-1 rounded-full mb-2">
              <UtensilsCrossed className="w-3.5 h-3.5" />
              <span>Day {activeDay.dayNumber} of 55 Meal Tracker</span>
            </div>
            <h2 className="text-2xl font-black text-[#1b4332]">Today's Diet Plan & Checklist</h2>
            <p className="text-xs text-[#52796f] mt-1 max-w-2xl">
              Strictly follow the 5 scheduled meal windows. Mark meals as completed once eaten. You can customize your 100g lunch, enter your L-Carnitine drink brand, or adjust portions.
            </p>
          </div>

          <div className="flex items-center gap-3 bg-[#f9f6f0] p-3 rounded-2xl border border-[#e2dacb]">
            <div className="text-right">
              <span className="text-[11px] text-[#6c887e] font-semibold block uppercase">Today's Total</span>
              <span className="text-xl font-black text-[#1b4332]">{activeTotals.calories} kcal</span>
            </div>
            <div className="w-px h-8 bg-[#ded6c7]"></div>
            <div className="text-left text-xs font-semibold text-[#2d6a4f]">
              <div>P: {activeTotals.protein}g</div>
              <div className="text-[#a75d49]">C: {activeTotals.carbs}g</div>
              <div className="text-[#b08b32]">F: {activeTotals.fat}g</div>
            </div>
          </div>
        </div>

        {/* Diet Restrictions Alert Banner */}
        <div className="mt-4 bg-[#fbf5eb] border border-[#f1dec1] rounded-2xl p-4 text-xs text-[#7d561a]">
          <div className="flex items-start gap-2.5">
            <ShieldAlert className="w-5 h-5 text-[#c77a16] shrink-0 mt-0.5" />
            <div>
              <p className="font-bold text-[#6a4713] text-sm">Strict Transformation Diet Rules:</p>
              <ul className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-2 mt-2 font-medium">
                <li className="flex items-center gap-1.5">
                  <span className="w-1.5 h-1.5 rounded-full bg-[#c77a16]"></span> No added sugar of any kind
                </li>
                <li className="flex items-center gap-1.5">
                  <span className="w-1.5 h-1.5 rounded-full bg-[#c77a16]"></span> No sugary drinks or sodas
                </li>
                <li className="flex items-center gap-1.5">
                  <span className="w-1.5 h-1.5 rounded-full bg-[#c77a16]"></span> No sweets or desserts
                </li>
                <li className="flex items-center gap-1.5">
                  <span className="w-1.5 h-1.5 rounded-full bg-[#c77a16]"></span> Record any unplanned foods!
                </li>
              </ul>
              <p className="mt-2 text-[11px] text-[#936622] italic">
                * Note: Natural fruit sugars (fructose in apple & watermelon) are tracked separately and allowed within planned portions.
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Meals List */}
      <div className="space-y-5">
        {activeDay.meals.map((meal) => {
          const isDone = meal.completed;
          const mealCalories = meal.items.reduce((sum, it) => sum + Number(it.calories || 0), 0);
          const mealProtein = Math.round(meal.items.reduce((sum, it) => sum + Number(it.protein || 0), 0) * 10) / 10;
          const mealCarbs = Math.round(meal.items.reduce((sum, it) => sum + Number(it.carbs || 0), 0) * 10) / 10;
          const mealFat = Math.round(meal.items.reduce((sum, it) => sum + Number(it.fat || 0), 0) * 10) / 10;

          return (
            <div
              key={meal.id}
              className={`rounded-3xl border transition-all ${
                isDone
                  ? 'bg-[#fcfdfa] border-[#b7e4c7] shadow-xs'
                  : 'bg-[#fffefb] border-[#e8e2d5] shadow-xs'
              }`}
            >
              {/* Meal Header */}
              <div className="p-4 sm:p-5 flex flex-col sm:flex-row sm:items-center justify-between gap-3 border-b border-[#f4f0e6]">
                <div className="flex items-center gap-3">
                  <button
                    onClick={() => toggleMealCompletion(selectedDate, meal.id)}
                    className={`w-7 h-7 rounded-xl flex items-center justify-center border transition-all ${
                      isDone
                        ? 'bg-[#2d6a4f] border-[#2d6a4f] text-white shadow-xs'
                        : 'border-[#cfc6b8] bg-white hover:border-[#2d6a4f]'
                    }`}
                    title={isDone ? 'Mark as Pending' : 'Mark as Completed'}
                  >
                    {isDone ? <CheckCircle2 className="w-5 h-5" /> : null}
                  </button>

                  <div>
                    <div className="flex items-center gap-2">
                      <h3 className="text-base font-extrabold text-[#1b4332]">{meal.name}</h3>
                      <span className="inline-flex items-center gap-1 text-[11px] font-semibold text-[#52796f] bg-[#f4f0e6] px-2.5 py-0.5 rounded-full">
                        <Clock className="w-3 h-3 text-[#40916c]" /> {meal.time}
                      </span>
                      <span
                        className={`text-[10px] font-bold px-2 py-0.5 rounded-full ${
                          isDone
                            ? 'bg-[#e9f5ed] text-[#2d6a4f]'
                            : 'bg-[#fff3e0] text-[#b76e00]'
                        }`}
                      >
                        {isDone ? 'Completed' : 'Pending'}
                      </span>
                    </div>
                  </div>
                </div>

                <div className="flex items-center justify-between sm:justify-end gap-3 text-xs">
                  <div className="bg-[#f9f6f0] px-3 py-1.5 rounded-xl border border-[#ede5d8]">
                    <span className="font-black text-[#1b4332] text-sm">{mealCalories}</span>
                    <span className="text-[#52796f] ml-1">kcal</span>
                    <span className="text-[#809a90] text-[11px] ml-2">
                      (P:{mealProtein}g | C:{mealCarbs}g | F:{mealFat}g)
                    </span>
                  </div>

                  <button
                    onClick={() => setAddingToMealId(addingToMealId === meal.id ? null : meal.id)}
                    className="p-1.5 rounded-xl bg-[#e9f5ed] hover:bg-[#d8f3dc] text-[#2d6a4f] flex items-center gap-1 font-bold text-xs transition"
                    title="Add food to this meal"
                  >
                    <Plus className="w-4 h-4" />
                    <span className="hidden sm:inline">Add Food</span>
                  </button>
                </div>
              </div>

              {/* Meal Items Table / Cards */}
              <div className="p-4 sm:p-5 space-y-3">
                {meal.items.map((item) => (
                  <div
                    key={item.id}
                    className="bg-[#fcfbf7] rounded-2xl p-3.5 border border-[#ede7db] flex flex-col md:flex-row md:items-center justify-between gap-3 hover:bg-[#f9f7f0] transition"
                  >
                    <div className="flex-1 space-y-1">
                      <div className="flex items-center gap-2 flex-wrap">
                        <span className="text-sm font-bold text-[#1b4332]">{item.name}</span>
                        {item.brand && (
                          <span className="text-[10px] bg-[#e3ecf5] text-[#25527a] font-semibold px-2 py-0.5 rounded-full">
                            Brand: {item.brand}
                          </span>
                        )}
                        {item.isEstimated && (
                          <span className="text-[10px] bg-[#fff8e1] text-[#8d6e15] font-semibold px-2 py-0.5 rounded-full" title="Estimated reference value">
                            Estimated
                          </span>
                        )}
                        {item.isCustomLunch && (
                          <span className="text-[10px] bg-[#e8f5e9] text-[#2e7d32] font-semibold px-2 py-0.5 rounded-full">
                            Custom Lunch Dish
                          </span>
                        )}
                      </div>

                      <div className="flex items-center gap-3 text-xs text-[#52796f]">
                        <span>Portion: {item.qty} {item.unit} {item.grams ? `(${item.grams}g)` : ''}</span>
                        <span>•</span>
                        <span className="text-[#2d6a4f] font-semibold">P: {item.protein}g</span>
                        <span>•</span>
                        <span className="text-[#b4624b] font-semibold">C: {item.carbs}g</span>
                        <span>•</span>
                        <span className="text-[#a48430] font-semibold">F: {item.fat}g</span>
                      </div>
                    </div>

                    {/* Interactive Quantity & Calories inputs */}
                    <div className="flex items-center gap-2 self-end md:self-center">
                      {/* Lunch Quick Preset Selector */}
                      {item.isCustomLunch && (
                        <div className="relative">
                          <button
                            onClick={() => setEditingLunchId(editingLunchId === item.id ? null : item.id)}
                            className="px-2.5 py-1 text-xs font-semibold bg-[#e9f5ed] text-[#2d6a4f] rounded-lg border border-[#b7e4c7] hover:bg-[#d8f3dc] flex items-center gap-1 transition"
                          >
                            <span>Presets</span>
                            <ChevronDown className="w-3 h-3" />
                          </button>

                          {editingLunchId === item.id && (
                            <div className="absolute right-0 top-8 z-30 w-72 bg-white rounded-2xl shadow-xl border border-[#e2dcd2] p-2 space-y-1">
                              <p className="text-[11px] font-bold text-[#52796f] px-2 py-1 uppercase tracking-wider">
                                Choose 100g Lunch Preset:
                              </p>
                              {LUNCH_PRESETS.map((lp) => (
                                <button
                                  key={lp.id}
                                  onClick={() => handleLunchPresetSelect(meal.id, item.id, lp)}
                                  className="w-full text-left p-2 rounded-xl text-xs hover:bg-[#f4f0e6] transition flex items-center justify-between"
                                >
                                  <div>
                                    <div className="font-bold text-[#1b4332]">{lp.name}</div>
                                    <div className="text-[10px] text-[#52796f]">
                                      P: {lp.protein}g | C: {lp.carbs}g | F: {lp.fat}g
                                    </div>
                                  </div>
                                  <span className="font-bold text-[#2d6a4f]">{lp.calories} kcal</span>
                                </button>
                              ))}
                            </div>
                          )}
                        </div>
                      )}

                      {/* Editable Quantity */}
                      <div className="flex items-center gap-1 bg-white border border-[#cfc6b8] rounded-xl px-2 py-1">
                        <span className="text-[10px] text-[#809a90] uppercase font-bold">Qty:</span>
                        <input
                          type="number"
                          step="0.1"
                          min="0.1"
                          value={item.qty}
                          onChange={(e) => {
                            const newQty = Number(e.target.value);
                            const ratio = item.qty > 0 ? newQty / item.qty : 1;
                            updateMealItem(selectedDate, meal.id, item.id, {
                              qty: newQty,
                              grams: Math.round((item.grams || 100) * ratio),
                              calories: Math.round(Number(item.calories) * ratio),
                              protein: Math.round(Number(item.protein) * ratio * 10) / 10,
                              carbs: Math.round(Number(item.carbs) * ratio * 10) / 10,
                              fat: Math.round(Number(item.fat) * ratio * 10) / 10,
                            });
                          }}
                          className="w-12 text-center text-xs font-bold text-[#1b4332] focus:outline-none"
                        />
                      </div>

                      {/* Editable Calories */}
                      <div className="flex items-center gap-1 bg-white border border-[#cfc6b8] rounded-xl px-2 py-1">
                        <input
                          type="number"
                          min="0"
                          value={item.calories}
                          onChange={(e) =>
                            updateMealItem(selectedDate, meal.id, item.id, {
                              calories: Number(e.target.value),
                            })
                          }
                          className="w-14 text-center text-xs font-black text-[#2d6a4f] focus:outline-none"
                        />
                        <span className="text-[10px] text-[#52796f] font-semibold">kcal</span>
                      </div>

                      {/* Delete Item button (unless it's the last item in a default schedule) */}
                      <button
                        onClick={() => deleteMealItem(selectedDate, meal.id, item.id)}
                        className="p-1.5 text-[#b08076] hover:text-[#b91c1c] hover:bg-[#fee2e2] rounded-lg transition"
                        title="Remove item"
                      >
                        <Trash2 className="w-3.5 h-3.5" />
                      </button>
                    </div>
                  </div>
                ))}

                {/* Inline Add Food Panel */}
                {addingToMealId === meal.id && (
                  <div className="bg-[#f4f0e6] p-4 rounded-2xl border border-[#ded7c9] space-y-3 mt-3 animate-fadeIn">
                    <div className="flex items-center justify-between">
                      <span className="text-xs font-bold text-[#1b4332] uppercase tracking-wider">
                        Add Food to {meal.name}
                      </span>
                      <button
                        onClick={() => setAddingToMealId(null)}
                        className="text-xs text-[#52796f] font-semibold hover:text-[#1b4332]"
                      >
                        Cancel
                      </button>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                      {/* Pick from Database */}
                      <div className="bg-white p-3 rounded-xl border border-[#e2dcd2]">
                        <p className="text-xs font-bold text-[#2d6a4f] mb-2">Option A: From Nutrition Database</p>
                        <div className="flex gap-2">
                          <select
                            value={selectedDbFoodId}
                            onChange={(e) => setSelectedDbFoodId(e.target.value)}
                            className="flex-1 text-xs p-2 rounded-lg border border-[#cfc6b8] bg-[#fdfbf7] focus:outline-none"
                          >
                            <option value="">Select standard food...</option>
                            {nutritionDb.map((f) => (
                              <option key={f.id} value={f.id}>
                                {f.name} ({f.calories} kcal)
                              </option>
                            ))}
                          </select>
                          <button
                            onClick={() => handleAddFromDb(meal.id)}
                            disabled={!selectedDbFoodId}
                            className="px-3 py-1.5 bg-[#2d6a4f] text-white rounded-lg text-xs font-bold disabled:opacity-40"
                          >
                            Add
                          </button>
                        </div>
                      </div>

                      {/* Custom food entry */}
                      <div className="bg-white p-3 rounded-xl border border-[#e2dcd2]">
                        <p className="text-xs font-bold text-[#2d6a4f] mb-2">Option B: Custom Food</p>
                        <div className="grid grid-cols-3 gap-2 mb-2">
                          <input
                            type="text"
                            placeholder="Food name"
                            value={customItem.name}
                            onChange={(e) => setCustomItem({ ...customItem, name: e.target.value })}
                            className="col-span-2 text-xs p-1.5 rounded-lg border border-[#cfc6b8]"
                          />
                          <input
                            type="number"
                            placeholder="kcal"
                            value={customItem.calories}
                            onChange={(e) => setCustomItem({ ...customItem, calories: Number(e.target.value) })}
                            className="text-xs p-1.5 rounded-lg border border-[#cfc6b8]"
                          />
                        </div>
                        <div className="flex items-center justify-between gap-2">
                          <div className="flex items-center gap-1 text-[11px] text-[#52796f]">
                            <span>P:</span>
                            <input
                              type="number"
                              className="w-10 p-1 border rounded text-xs"
                              value={customItem.protein}
                              onChange={(e) => setCustomItem({ ...customItem, protein: Number(e.target.value) })}
                            />
                            <span>C:</span>
                            <input
                              type="number"
                              className="w-10 p-1 border rounded text-xs"
                              value={customItem.carbs}
                              onChange={(e) => setCustomItem({ ...customItem, carbs: Number(e.target.value) })}
                            />
                            <span>F:</span>
                            <input
                              type="number"
                              className="w-10 p-1 border rounded text-xs"
                              value={customItem.fat}
                              onChange={(e) => setCustomItem({ ...customItem, fat: Number(e.target.value) })}
                            />
                          </div>
                          <button
                            onClick={() => handleAddCustom(meal.id)}
                            disabled={!customItem.name.trim()}
                            className="px-3 py-1.5 bg-[#2d6a4f] text-white rounded-lg text-xs font-bold disabled:opacity-40"
                          >
                            Add Custom
                          </button>
                        </div>
                      </div>
                    </div>
                  </div>
                )}
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
