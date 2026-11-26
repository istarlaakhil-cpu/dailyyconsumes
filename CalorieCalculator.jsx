import React, { useState } from 'react';
import {
  Calculator,
  Plus,
  Trash2,
  Edit2,
  Check,
  Flame,
  Scale,
  Sparkles,
  Info,
  RefreshCw,
  Search,
} from 'lucide-react';
import { useFitness } from '../context/FitnessContext';
import { LUNCH_PRESETS } from '../data/nutritionDb';

export default function CalorieCalculator() {
  const { nutritionDb, setNutritionDb, userProfile, setUserProfile } = useFitness();

  const [searchQuery, setSearchQuery] = useState('');
  const [editingId, setEditingId] = useState(null);
  const [editFormData, setEditFormData] = useState({});

  // Calculator Sandbox / Portion Simulator State
  const [calcSelectedFoodId, setCalcSelectedFoodId] = useState(nutritionDb[0]?.id || 'apple');
  const [calcGrams, setCalcGrams] = useState(150);

  // New Food Modal / Form State
  const [isAddingFood, setIsAddingFood] = useState(false);
  const [newFood, setNewFood] = useState({
    name: '',
    defaultQty: 1,
    unit: 'serving',
    grams: 100,
    calories: 120,
    protein: 5,
    carbs: 15,
    fat: 3,
    category: 'Custom',
    isEstimated: true,
  });

  const handleStartEdit = (food) => {
    setEditingId(food.id);
    setEditFormData({ ...food });
  };

  const handleSaveEdit = () => {
    setNutritionDb((prev) =>
      prev.map((f) => (f.id === editingId ? { ...f, ...editFormData } : f))
    );
    setEditingId(null);
  };

  const handleDeleteFood = (id) => {
    if (confirm('Delete this food item from the database?')) {
      setNutritionDb((prev) => prev.filter((f) => f.id !== id));
    }
  };

  const handleAddFood = (e) => {
    e.preventDefault();
    if (!newFood.name.trim()) return;

    const itemToAdd = {
      ...newFood,
      id: 'food-' + Date.now(),
      calories: Number(newFood.calories),
      protein: Number(newFood.protein),
      carbs: Number(newFood.carbs),
      fat: Number(newFood.fat),
      grams: Number(newFood.grams),
    };

    setNutritionDb((prev) => [itemToAdd, ...prev]);
    setIsAddingFood(false);
    setNewFood({
      name: '',
      defaultQty: 1,
      unit: 'serving',
      grams: 100,
      calories: 120,
      protein: 5,
      carbs: 15,
      fat: 3,
      category: 'Custom',
      isEstimated: true,
    });
  };

  // Find food for portion simulator
  const activeCalcFood = nutritionDb.find((f) => f.id === calcSelectedFoodId) || nutritionDb[0];
  const simGrams = Number(calcGrams) || 1;
  const baseGrams = activeCalcFood?.grams || 100;
  const simRatio = simGrams / baseGrams;

  const simCalories = Math.round((activeCalcFood?.calories || 0) * simRatio);
  const simProtein = Math.round((activeCalcFood?.protein || 0) * simRatio * 10) / 10;
  const simCarbs = Math.round((activeCalcFood?.carbs || 0) * simRatio * 10) / 10;
  const simFat = Math.round((activeCalcFood?.fat || 0) * simRatio * 10) / 10;

  const filteredDb = nutritionDb.filter((f) =>
    f.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
    (f.category && f.category.toLowerCase().includes(searchQuery.toLowerCase()))
  );

  return (
    <div className="space-y-6 pb-20 lg:pb-8">
      {/* Page Title */}
      <div className="bg-[#fffefb] rounded-3xl p-6 border border-[#e8e2d5] shadow-xs">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
          <div>
            <div className="inline-flex items-center gap-1.5 bg-[#e9f5ed] text-[#2d6a4f] text-xs font-bold px-3 py-1 rounded-full mb-2">
              <Calculator className="w-3.5 h-3.5" />
              <span>Smart Nutrition Database</span>
            </div>
            <h2 className="text-2xl font-black text-[#1b4332]">Automatic Calorie & Macro Calculator</h2>
            <p className="text-xs text-[#52796f] mt-1 max-w-2xl">
              Every value in this database is fully editable. Never assume fixed lunch values—adjust lunch recipes, supplement brands, and portions for precision tracking.
            </p>
          </div>

          <button
            onClick={() => setIsAddingFood(!isAddingFood)}
            className="px-4 py-2.5 bg-[#2d6a4f] hover:bg-[#1b4332] text-white rounded-2xl text-xs font-bold flex items-center gap-2 shadow-xs transition self-start md:self-auto"
          >
            <Plus className="w-4 h-4" />
            <span>Add New Food to DB</span>
          </button>
        </div>
      </div>

      {/* Interactive Portion Simulator Sandbox */}
      <div className="bg-gradient-to-br from-[#f4f0e6] to-[#e9f5ed] rounded-3xl p-6 border border-[#ded7c9] shadow-xs">
        <div className="flex items-center justify-between mb-4">
          <div className="flex items-center gap-2">
            <Sparkles className="w-5 h-5 text-[#2d6a4f]" />
            <h3 className="text-base font-extrabold text-[#1b4332]">Live Portion & Macro Simulator</h3>
          </div>
          <span className="text-xs text-[#52796f] font-semibold">Immediate Recalculation</span>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 items-center">
          <div className="space-y-3">
            <div>
              <label className="text-xs font-bold text-[#52796f] uppercase block mb-1">
                Select Food Item:
              </label>
              <select
                value={calcSelectedFoodId}
                onChange={(e) => setCalcSelectedFoodId(e.target.value)}
                className="w-full text-xs p-2.5 rounded-xl border border-[#cfc6b8] bg-white font-semibold text-[#1b4332] focus:outline-none"
              >
                {nutritionDb.map((item) => (
                  <option key={item.id} value={item.id}>
                    {item.name} ({item.calories} kcal / {item.grams}g)
                  </option>
                ))}
              </select>
            </div>

            <div>
              <div className="flex justify-between items-center mb-1">
                <label className="text-xs font-bold text-[#52796f] uppercase">
                  Portion Weight (Grams):
                </label>
                <span className="text-xs font-black text-[#2d6a4f]">{simGrams}g</span>
              </div>
              <input
                type="range"
                min="10"
                max="500"
                step="5"
                value={simGrams}
                onChange={(e) => setCalcGrams(Number(e.target.value))}
                className="w-full accent-[#2d6a4f] cursor-pointer"
              />
              <div className="flex justify-between text-[10px] text-[#8aa59c] mt-1">
                <span>10g</span>
                <span>100g</span>
                <span>250g</span>
                <span>500g</span>
              </div>
            </div>
          </div>

          {/* Result Readout */}
          <div className="md:col-span-2 bg-white rounded-2xl p-5 border border-[#ded7c9] shadow-xs">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
              <div>
                <span className="text-[11px] font-bold text-[#52796f] uppercase">Simulated Output</span>
                <h4 className="text-xl font-black text-[#1b4332] mt-0.5">
                  {simGrams}g of {activeCalcFood?.name}
                </h4>
                <p className="text-xs text-[#708d83]">
                  {activeCalcFood?.isEstimated ? '⚠️ Estimated standard benchmark' : 'Verified nutritional profile'}
                </p>
              </div>

              <div className="bg-[#e9f5ed] px-4 py-2 rounded-2xl text-center border border-[#b7e4c7]">
                <span className="text-2xl font-black text-[#2d6a4f]">{simCalories}</span>
                <span className="text-xs font-bold text-[#2d6a4f] block">kcal</span>
              </div>
            </div>

            <div className="grid grid-cols-3 gap-3 mt-4 pt-4 border-t border-[#f4f0e6] text-center">
              <div className="bg-[#f9f6f0] p-2.5 rounded-xl">
                <span className="text-[10px] uppercase font-bold text-[#52796f] block">Protein</span>
                <span className="text-sm font-black text-[#1b4332]">{simProtein}g</span>
              </div>
              <div className="bg-[#f9f6f0] p-2.5 rounded-xl">
                <span className="text-[10px] uppercase font-bold text-[#b4624b] block">Carbs</span>
                <span className="text-sm font-black text-[#1b4332]">{simCarbs}g</span>
              </div>
              <div className="bg-[#f9f6f0] p-2.5 rounded-xl">
                <span className="text-[10px] uppercase font-bold text-[#a48430] block">Fat</span>
                <span className="text-sm font-black text-[#1b4332]">{simFat}g</span>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Add New Food Form */}
      {isAddingFood && (
        <form
          onSubmit={handleAddFood}
          className="bg-[#fffefb] rounded-3xl p-6 border-2 border-[#2d6a4f] shadow-md space-y-4 animate-fadeIn"
        >
          <div className="flex items-center justify-between">
            <h3 className="text-base font-extrabold text-[#1b4332]">Add New Food to Master Database</h3>
            <button
              type="button"
              onClick={() => setIsAddingFood(false)}
              className="text-xs text-[#52796f] font-bold hover:text-[#1b4332]"
            >
              Cancel
            </button>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-3 text-xs">
            <div>
              <label className="font-bold text-[#52796f] block mb-1">Food Name *</label>
              <input
                type="text"
                required
                placeholder="e.g. Greek Yogurt, Steamed Fish"
                value={newFood.name}
                onChange={(e) => setNewFood({ ...newFood, name: e.target.value })}
                className="w-full p-2 border border-[#cfc6b8] rounded-xl bg-[#fdfbf7]"
              />
            </div>
            <div>
              <label className="font-bold text-[#52796f] block mb-1">Serving Grams *</label>
              <input
                type="number"
                required
                value={newFood.grams}
                onChange={(e) => setNewFood({ ...newFood, grams: Number(e.target.value) })}
                className="w-full p-2 border border-[#cfc6b8] rounded-xl bg-[#fdfbf7]"
              />
            </div>
            <div>
              <label className="font-bold text-[#52796f] block mb-1">Calories (kcal) *</label>
              <input
                type="number"
                required
                value={newFood.calories}
                onChange={(e) => setNewFood({ ...newFood, calories: Number(e.target.value) })}
                className="w-full p-2 border border-[#cfc6b8] rounded-xl bg-[#fdfbf7]"
              />
            </div>
            <div>
              <label className="font-bold text-[#52796f] block mb-1">Category</label>
              <input
                type="text"
                placeholder="Protein, Snack, Fruit"
                value={newFood.category}
                onChange={(e) => setNewFood({ ...newFood, category: e.target.value })}
                className="w-full p-2 border border-[#cfc6b8] rounded-xl bg-[#fdfbf7]"
              />
            </div>
            <div>
              <label className="font-bold text-[#52796f] block mb-1">Protein (g)</label>
              <input
                type="number"
                step="0.1"
                value={newFood.protein}
                onChange={(e) => setNewFood({ ...newFood, protein: Number(e.target.value) })}
                className="w-full p-2 border border-[#cfc6b8] rounded-xl bg-[#fdfbf7]"
              />
            </div>
            <div>
              <label className="font-bold text-[#52796f] block mb-1">Carbs (g)</label>
              <input
                type="number"
                step="0.1"
                value={newFood.carbs}
                onChange={(e) => setNewFood({ ...newFood, carbs: Number(e.target.value) })}
                className="w-full p-2 border border-[#cfc6b8] rounded-xl bg-[#fdfbf7]"
              />
            </div>
            <div>
              <label className="font-bold text-[#52796f] block mb-1">Fat (g)</label>
              <input
                type="number"
                step="0.1"
                value={newFood.fat}
                onChange={(e) => setNewFood({ ...newFood, fat: Number(e.target.value) })}
                className="w-full p-2 border border-[#cfc6b8] rounded-xl bg-[#fdfbf7]"
              />
            </div>
            <div className="flex items-center gap-2 pt-6">
              <input
                type="checkbox"
                id="isEst"
                checked={newFood.isEstimated}
                onChange={(e) => setNewFood({ ...newFood, isEstimated: e.target.checked })}
                className="w-4 h-4 accent-[#2d6a4f]"
              />
              <label htmlFor="isEst" className="font-medium text-[#52796f]">Mark as Estimated</label>
            </div>
          </div>

          <div className="flex justify-end gap-2 pt-2">
            <button
              type="submit"
              className="px-5 py-2 bg-[#2d6a4f] text-white rounded-xl text-xs font-bold hover:bg-[#1b4332] transition"
            >
              Save to Database
            </button>
          </div>
        </form>
      )}

      {/* Database Table Card */}
      <div className="bg-[#fffefb] rounded-3xl p-6 border border-[#e8e2d5] shadow-xs">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 mb-4">
          <div className="flex items-center gap-2">
            <h3 className="text-base font-extrabold text-[#1b4332]">Standard Nutrition Table</h3>
            <span className="text-xs bg-[#e9f5ed] text-[#2d6a4f] font-bold px-2.5 py-0.5 rounded-full">
              {nutritionDb.length} items
            </span>
          </div>

          {/* Search bar */}
          <div className="relative w-full sm:w-64">
            <Search className="w-4 h-4 text-[#708d83] absolute left-3 top-2.5" />
            <input
              type="text"
              placeholder="Search foods..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full pl-9 pr-3 py-1.5 text-xs rounded-xl border border-[#ded7c9] bg-[#fdfbf7] focus:outline-none"
            />
          </div>
        </div>

        {/* Table View */}
        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs">
            <thead>
              <tr className="border-b border-[#e8e2d5] text-[#52796f] uppercase font-bold text-[10px]">
                <th className="py-2.5 px-3">Food Item</th>
                <th className="py-2.5 px-2">Category</th>
                <th className="py-2.5 px-2">Portion</th>
                <th className="py-2.5 px-2">Calories</th>
                <th className="py-2.5 px-2">Protein</th>
                <th className="py-2.5 px-2">Carbs</th>
                <th className="py-2.5 px-2">Fat</th>
                <th className="py-2.5 px-2">Type</th>
                <th className="py-2.5 px-3 text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-[#f4f0e6]">
              {filteredDb.map((item) => {
                const isEditing = editingId === item.id;
                return (
                  <tr key={item.id} className="hover:bg-[#fbf9f4] transition">
                    <td className="py-3 px-3 font-bold text-[#1b4332]">
                      {isEditing ? (
                        <input
                          type="text"
                          value={editFormData.name}
                          onChange={(e) => setEditFormData({ ...editFormData, name: e.target.value })}
                          className="p-1 border rounded text-xs w-36"
                        />
                      ) : (
                        item.name
                      )}
                    </td>

                    <td className="py-3 px-2 text-[#52796f]">
                      {item.category || 'General'}
                    </td>

                    <td className="py-3 px-2 text-[#52796f]">
                      {item.defaultQty} {item.unit} ({item.grams}g)
                    </td>

                    <td className="py-3 px-2 font-bold text-[#2d6a4f]">
                      {isEditing ? (
                        <input
                          type="number"
                          value={editFormData.calories}
                          onChange={(e) => setEditFormData({ ...editFormData, calories: Number(e.target.value) })}
                          className="p-1 border rounded text-xs w-16"
                        />
                      ) : (
                        `${item.calories} kcal`
                      )}
                    </td>

                    <td className="py-3 px-2 text-[#1b4332] font-semibold">
                      {isEditing ? (
                        <input
                          type="number"
                          step="0.1"
                          value={editFormData.protein}
                          onChange={(e) => setEditFormData({ ...editFormData, protein: Number(e.target.value) })}
                          className="p-1 border rounded text-xs w-12"
                        />
                      ) : (
                        `${item.protein}g`
                      )}
                    </td>

                    <td className="py-3 px-2 text-[#a75d49] font-semibold">
                      {isEditing ? (
                        <input
                          type="number"
                          step="0.1"
                          value={editFormData.carbs}
                          onChange={(e) => setEditFormData({ ...editFormData, carbs: Number(e.target.value) })}
                          className="p-1 border rounded text-xs w-12"
                        />
                      ) : (
                        `${item.carbs}g`
                      )}
                    </td>

                    <td className="py-3 px-2 text-[#a48430] font-semibold">
                      {isEditing ? (
                        <input
                          type="number"
                          step="0.1"
                          value={editFormData.fat}
                          onChange={(e) => setEditFormData({ ...editFormData, fat: Number(e.target.value) })}
                          className="p-1 border rounded text-xs w-12"
                        />
                      ) : (
                        `${item.fat}g`
                      )}
                    </td>

                    <td className="py-3 px-2">
                      {item.isEstimated ? (
                        <span className="bg-[#fff8e1] text-[#936c0a] font-bold text-[10px] px-2 py-0.5 rounded-full">
                          Estimated
                        </span>
                      ) : (
                        <span className="bg-[#e9f5ed] text-[#2d6a4f] font-bold text-[10px] px-2 py-0.5 rounded-full">
                          Standard
                        </span>
                      )}
                    </td>

                    <td className="py-3 px-3 text-right">
                      {isEditing ? (
                        <button
                          onClick={handleSaveEdit}
                          className="p-1.5 bg-[#2d6a4f] text-white rounded-lg hover:bg-[#1b4332] transition"
                          title="Save Changes"
                        >
                          <Check className="w-3.5 h-3.5" />
                        </button>
                      ) : (
                        <div className="flex items-center justify-end gap-1">
                          <button
                            onClick={() => handleStartEdit(item)}
                            className="p-1.5 text-[#52796f] hover:text-[#2d6a4f] hover:bg-[#e9f5ed] rounded-lg transition"
                            title="Edit nutritional profile"
                          >
                            <Edit2 className="w-3.5 h-3.5" />
                          </button>
                          <button
                            onClick={() => handleDeleteFood(item.id)}
                            className="p-1.5 text-[#b08076] hover:text-[#b91c1c] hover:bg-[#fee2e2] rounded-lg transition"
                            title="Delete food"
                          >
                            <Trash2 className="w-3.5 h-3.5" />
                          </button>
                        </div>
                      )}
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
