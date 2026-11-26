import React, { createContext, useContext, useState, useEffect } from 'react';
import confetti from 'canvas-confetti';
import {
  START_DATE,
  END_DATE,
  TOTAL_DAYS,
  DEFAULT_USER_PROFILE,
  generateInitial55Days,
} from '../data/defaultPlan';
import { DEFAULT_NUTRITION_DB } from '../data/nutritionDb';

const FitnessContext = createContext(null);

const STORAGE_KEY_DAYS = 'fitness55_days_v1';
const STORAGE_KEY_PROFILE = 'fitness55_profile_v1';
const STORAGE_KEY_NUTRITION = 'fitness55_nutrition_v1';

export function FitnessProvider({ children }) {
  // Load or initialize days
  const [daysData, setDaysData] = useState(() => {
    try {
      const saved = localStorage.getItem(STORAGE_KEY_DAYS);
      if (saved) {
        return JSON.parse(saved);
      }
    } catch (e) {
      console.error('Failed to load saved days', e);
    }
    return generateInitial55Days();
  });

  // Load or initialize user profile
  const [userProfile, setUserProfile] = useState(() => {
    try {
      const saved = localStorage.getItem(STORAGE_KEY_PROFILE);
      if (saved) {
        return { ...DEFAULT_USER_PROFILE, ...JSON.parse(saved) };
      }
    } catch (e) {
      console.error('Failed to load saved profile', e);
    }
    return DEFAULT_USER_PROFILE;
  });

  // Load or initialize editable nutrition database
  const [nutritionDb, setNutritionDb] = useState(() => {
    try {
      const saved = localStorage.getItem(STORAGE_KEY_NUTRITION);
      if (saved) {
        return JSON.parse(saved);
      }
    } catch (e) {
      console.error('Failed to load nutrition db', e);
    }
    return DEFAULT_NUTRITION_DB;
  });

  // Determine current active date (clamp to Nov 1 - Dec 25, 2026)
  const [selectedDate, setSelectedDate] = useState(() => {
    const today = new Date();
    const yyyy = today.getFullYear();
    const mm = String(today.getMonth() + 1).padStart(2, '0');
    const dd = String(today.getDate()).padStart(2, '0');
    const todayStr = `${yyyy}-${mm}-${dd}`;

    if (todayStr >= START_DATE && todayStr <= END_DATE) {
      return todayStr;
    }
    return START_DATE;
  });

  // Active navigation tab
  const [activeTab, setActiveTab] = useState('dashboard');

  // Notification state
  const [notificationStatus, setNotificationStatus] = useState('default');

  // Save changes to localStorage automatically
  useEffect(() => {
    try {
      localStorage.setItem(STORAGE_KEY_DAYS, JSON.stringify(daysData));
    } catch (e) {
      console.error('Error saving days to localStorage', e);
    }
  }, [daysData]);

  useEffect(() => {
    try {
      localStorage.setItem(STORAGE_KEY_PROFILE, JSON.stringify(userProfile));
    } catch (e) {
      console.error('Error saving profile to localStorage', e);
    }
  }, [userProfile]);

  useEffect(() => {
    try {
      localStorage.setItem(STORAGE_KEY_NUTRITION, JSON.stringify(nutritionDb));
    } catch (e) {
      console.error('Error saving nutritionDb to localStorage', e);
    }
  }, [nutritionDb]);

  // Check browser notification permission
  useEffect(() => {
    if ('Notification' in window) {
      setNotificationStatus(Notification.permission);
    }
  }, []);

  const requestNotificationPermission = async () => {
    if (!('Notification' in window)) {
      alert('This browser does not support desktop notifications.');
      return false;
    }
    try {
      const permission = await Notification.requestPermission();
      setNotificationStatus(permission);
      if (permission === 'granted') {
        setUserProfile((prev) => ({ ...prev, notificationsEnabled: true }));
        new Notification('MY 55-DAY FITNESS TRACKER', {
          body: 'Reminders enabled! You will be alerted for your daily scheduled meals.',
          icon: '/favicon.ico',
        });
        return true;
      }
    } catch (e) {
      console.error('Failed to request notification permission', e);
    }
    return false;
  };

  const triggerCelebration = () => {
    try {
      confetti({
        particleCount: 80,
        spread: 70,
        origin: { y: 0.6 },
        colors: ['#2d6a4f', '#52b788', '#d8f3dc', '#f4a261', '#e76f51'],
      });
    } catch (e) {
      // ignore
    }
  };

  // Helper to get active day data safely
  const activeDay = daysData[selectedDate] || {
    date: selectedDate,
    dayNumber: 1,
    dayOfWeek: 'Sunday',
    waterGlasses: 0,
    weight: null,
    notes: '',
    meals: [],
  };

  // Calculate day totals (Calories, Protein, Carbs, Fat)
  const calculateTotalsForDay = (day) => {
    if (!day || !day.meals) {
      return { calories: 0, protein: 0, carbs: 0, fat: 0, completedMeals: 0, totalMeals: 5 };
    }

    let calories = 0;
    let protein = 0;
    let carbs = 0;
    let fat = 0;
    let completedMeals = 0;

    day.meals.forEach((meal) => {
      if (meal.completed) {
        completedMeals++;
      }
      meal.items.forEach((item) => {
        calories += Number(item.calories || 0);
        protein += Number(item.protein || 0);
        carbs += Number(item.carbs || 0);
        fat += Number(item.fat || 0);
      });
    });

    return {
      calories: Math.round(calories),
      protein: Math.round(protein * 10) / 10,
      carbs: Math.round(carbs * 10) / 10,
      fat: Math.round(fat * 10) / 10,
      completedMeals,
      totalMeals: day.meals.length,
      completionRate: Math.round((completedMeals / (day.meals.length || 5)) * 100),
    };
  };

  // Toggle meal completion
  const toggleMealCompletion = (date, mealId) => {
    setDaysData((prev) => {
      const currentDay = prev[date];
      if (!currentDay) return prev;

      let allCompletedBefore = currentDay.meals.every((m) => m.completed);

      const updatedMeals = currentDay.meals.map((meal) => {
        if (meal.id === mealId) {
          return { ...meal, completed: !meal.completed };
        }
        return meal;
      });

      const updatedDay = { ...currentDay, meals: updatedMeals };
      const allCompletedAfter = updatedMeals.every((m) => m.completed);

      if (!allCompletedBefore && allCompletedAfter) {
        triggerCelebration();
      }

      return { ...prev, [date]: updatedDay };
    });
  };

  // Update a meal item (e.g. quantity, calories, lunch description)
  const updateMealItem = (date, mealId, itemId, updatedFields) => {
    setDaysData((prev) => {
      const currentDay = prev[date];
      if (!currentDay) return prev;

      const updatedMeals = currentDay.meals.map((meal) => {
        if (meal.id !== mealId) return meal;

        const updatedItems = meal.items.map((item) => {
          if (item.id !== itemId) return item;
          return { ...item, ...updatedFields };
        });

        return { ...meal, items: updatedItems };
      });

      return { ...prev, [date]: { ...currentDay, meals: updatedMeals } };
    });
  };

  // Add an item to a meal
  const addMealItem = (date, mealId, item) => {
    setDaysData((prev) => {
      const currentDay = prev[date];
      if (!currentDay) return prev;

      const newItem = {
        id: 'item-' + Date.now() + '-' + Math.random().toString(36).substr(2, 4),
        name: item.name || 'Custom Food',
        qty: item.qty || 1,
        unit: item.unit || 'serving',
        grams: item.grams || 100,
        calories: Number(item.calories || 0),
        protein: Number(item.protein || 0),
        carbs: Number(item.carbs || 0),
        fat: Number(item.fat || 0),
        isEstimated: Boolean(item.isEstimated),
      };

      const updatedMeals = currentDay.meals.map((meal) => {
        if (meal.id !== mealId) return meal;
        return { ...meal, items: [...meal.items, newItem] };
      });

      return { ...prev, [date]: { ...currentDay, meals: updatedMeals } };
    });
  };

  // Delete an item from a meal
  const deleteMealItem = (date, mealId, itemId) => {
    setDaysData((prev) => {
      const currentDay = prev[date];
      if (!currentDay) return prev;

      const updatedMeals = currentDay.meals.map((meal) => {
        if (meal.id !== mealId) return meal;
        return {
          ...meal,
          items: meal.items.filter((item) => item.id !== itemId),
        };
      });

      return { ...prev, [date]: { ...currentDay, meals: updatedMeals } };
    });
  };

  // Update day attribute (weight, water, notes)
  const updateDayField = (date, field, value) => {
    setDaysData((prev) => {
      const currentDay = prev[date];
      if (!currentDay) return prev;

      if (field === 'waterGlasses' && value >= userProfile.waterTargetGlasses && currentDay.waterGlasses < userProfile.waterTargetGlasses) {
        triggerCelebration();
      }

      return {
        ...prev,
        [date]: { ...currentDay, [field]: value },
      };
    });
  };

  // Calculate high-level transformation stats
  const calculateOverallStats = () => {
    const dates = Object.keys(daysData).sort();
    let completedDaysCount = 0;
    let partialDaysCount = 0;
    let totalMealsCompleted = 0;
    let totalCaloriesLogged = 0;
    let daysWithCalories = 0;
    let latestWeight = userProfile.startWeight;
    let weightHistory = [];

    dates.forEach((d) => {
      const day = daysData[d];
      const totals = calculateTotalsForDay(day);

      if (totals.completedMeals === 5) {
        completedDaysCount++;
      } else if (totals.completedMeals > 0) {
        partialDaysCount++;
      }

      totalMealsCompleted += totals.completedMeals;
      if (totals.calories > 0) {
        totalCaloriesLogged += totals.calories;
        daysWithCalories++;
      }

      if (day.weight !== null && day.weight !== undefined && day.weight !== '') {
        latestWeight = Number(day.weight);
        weightHistory.push({
          date: d,
          dayNumber: day.dayNumber,
          weight: Number(day.weight),
        });
      }
    });

    // Days elapsed from Nov 1 to selectedDate (inclusive)
    const selectedDateObj = new Date(selectedDate + 'T00:00:00');
    const startDateObj = new Date(START_DATE + 'T00:00:00');
    const endDateObj = new Date(END_DATE + 'T00:00:00');

    const diffTime = selectedDateObj - startDateObj;
    const currentDayNumber = Math.max(1, Math.min(55, Math.floor(diffTime / (1000 * 60 * 60 * 24)) + 1));
    const daysRemaining = Math.max(0, TOTAL_DAYS - currentDayNumber);

    const consistencyRate = Math.round(((completedDaysCount + partialDaysCount * 0.5) / currentDayNumber) * 100);

    const weightDifference = Math.round((userProfile.startWeight - latestWeight) * 10) / 10;

    return {
      currentDayNumber,
      daysRemaining,
      totalDays: TOTAL_DAYS,
      completedDaysCount,
      partialDaysCount,
      totalMealsCompleted,
      averageCalories: daysWithCalories > 0 ? Math.round(totalCaloriesLogged / daysWithCalories) : 0,
      startWeight: userProfile.startWeight,
      currentWeight: latestWeight,
      targetWeight: userProfile.targetWeight,
      weightDifference,
      consistencyRate: Math.min(100, Math.max(0, consistencyRate)),
      weightHistory,
    };
  };

  // Export JSON backup
  const exportDataJson = () => {
    const backup = {
      version: '1.0',
      exportedAt: new Date().toISOString(),
      userProfile,
      nutritionDb,
      daysData,
    };
    const dataStr = 'data:text/json;charset=utf-8,' + encodeURIComponent(JSON.stringify(backup, null, 2));
    const downloadAnchor = document.createElement('a');
    downloadAnchor.setAttribute('href', dataStr);
    downloadAnchor.setAttribute('download', `fitness55_tracker_backup_${selectedDate}.json`);
    document.body.appendChild(downloadAnchor);
    downloadAnchor.click();
    downloadAnchor.remove();
  };

  // Import JSON backup
  const importDataJson = (jsonString) => {
    try {
      const parsed = JSON.parse(jsonString);
      if (parsed.daysData) {
        setDaysData(parsed.daysData);
      }
      if (parsed.userProfile) {
        setUserProfile(parsed.userProfile);
      }
      if (parsed.nutritionDb) {
        setNutritionDb(parsed.nutritionDb);
      }
      alert('Data successfully restored!');
      return true;
    } catch (e) {
      alert('Invalid backup file format.');
      return false;
    }
  };

  // Reset to initial state
  const resetAllData = () => {
    if (confirm('Are you sure you want to reset all tracked data? This cannot be undone unless you have a backup.')) {
      const initialDays = generateInitial55Days();
      setDaysData(initialDays);
      setUserProfile(DEFAULT_USER_PROFILE);
      setNutritionDb(DEFAULT_NUTRITION_DB);
      setSelectedDate(START_DATE);
      localStorage.clear();
      alert('Reset complete.');
    }
  };

  const activeTotals = calculateTotalsForDay(activeDay);
  const overallStats = calculateOverallStats();

  return (
    <FitnessContext.Provider
      value={{
        START_DATE,
        END_DATE,
        TOTAL_DAYS,
        daysData,
        selectedDate,
        setSelectedDate,
        activeDay,
        activeTab,
        setActiveTab,
        userProfile,
        setUserProfile,
        nutritionDb,
        setNutritionDb,
        activeTotals,
        overallStats,
        calculateTotalsForDay,
        toggleMealCompletion,
        updateMealItem,
        addMealItem,
        deleteMealItem,
        updateDayField,
        exportDataJson,
        importDataJson,
        resetAllData,
        notificationStatus,
        requestNotificationPermission,
        triggerCelebration,
      }}
    >
      {children}
    </FitnessContext.Provider>
  );
}

export function useFitness() {
  const context = useContext(FitnessContext);
  if (!context) {
    throw new Error('useFitness must be used within a FitnessProvider');
  }
  return context;
}
