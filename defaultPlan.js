export const START_DATE = '2026-11-01';
export const END_DATE = '2026-12-25';
export const TOTAL_DAYS = 55;

export const DEFAULT_USER_PROFILE = {
  name: 'Fitness Champion',
  startWeight: 75.0,
  targetWeight: 68.0,
  calorieTarget: 950, // Healthy balanced target accounting for base diet + lunch + drink + buffer
  waterTargetGlasses: 12, // 12 x 250ml = 3,000ml (3 Litres)
  defaultLunchName: 'Grilled Chicken Breast',
  defaultLunchGrams: 100,
  defaultLunchCalories: 165,
  defaultLunchProtein: 31,
  defaultLunchCarbs: 0,
  defaultLunchFat: 3.6,
  lcarnitineBrand: 'Applied Nutrition Liquid 3000',
  lcarnitineCalories: 12,
  notificationsEnabled: false,
};

// Generates the initial empty/template day structure
export function createDefaultDayData(dateString, dayIndex) {
  const dateObj = new Date(dateString + 'T00:00:00');
  const dayNames = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];
  const dayOfWeek = dayNames[dateObj.getDay()];

  return {
    date: dateString,
    dayNumber: dayIndex + 1,
    dayOfWeek,
    waterGlasses: 0, // each glass = 250 ml
    weight: dayIndex === 0 ? 75.0 : null,
    notes: '',
    meals: [
      {
        id: 'breakfast',
        name: 'Breakfast',
        time: '8:00 AM',
        targetTime: '08:00',
        completed: false,
        items: [
          {
            id: 'b-apple',
            name: 'Apple',
            qty: 1,
            unit: 'medium',
            grams: 182,
            calories: 95,
            protein: 0.5,
            carbs: 25.0,
            fat: 0.3,
            isEstimated: true,
          },
          {
            id: 'b-egg',
            name: 'Boiled Egg',
            qty: 1,
            unit: 'egg',
            grams: 50,
            calories: 78,
            protein: 6.3,
            carbs: 0.6,
            fat: 5.3,
            isEstimated: false,
          },
        ],
      },
      {
        id: 'morningSnack',
        name: 'Morning Snack',
        time: '11:00 AM',
        targetTime: '11:00',
        completed: false,
        items: [
          {
            id: 'ms-watermelon',
            name: 'Watermelon pieces',
            qty: 100,
            unit: 'g',
            grams: 100,
            calories: 30,
            protein: 0.6,
            carbs: 7.6,
            fat: 0.2,
            isEstimated: false,
          },
        ],
      },
      {
        id: 'lunch',
        name: 'Lunch',
        time: '1:00 PM',
        targetTime: '13:00',
        completed: false,
        items: [
          {
            id: 'l-custom',
            name: 'Grilled Chicken Breast',
            qty: 100,
            unit: 'g',
            grams: 100,
            calories: 165,
            protein: 31.0,
            carbs: 0.0,
            fat: 3.6,
            isEstimated: false,
            isCustomLunch: true,
          },
          {
            id: 'l-carrot',
            name: 'Carrot pieces',
            qty: 80,
            unit: 'g',
            grams: 80,
            calories: 33,
            protein: 0.8,
            carbs: 7.7,
            fat: 0.2,
            isEstimated: false,
          },
        ],
      },
      {
        id: 'eveningSnack',
        name: 'Evening Snack',
        time: '5:00 PM',
        targetTime: '17:00',
        completed: false,
        items: [
          {
            id: 'es-lcarnitine',
            name: 'L-Carnitine drink',
            brand: 'Applied Nutrition',
            qty: 250,
            unit: 'ml',
            grams: 250,
            calories: 12,
            protein: 0.5,
            carbs: 1.0,
            fat: 0.0,
            isEstimated: true,
            isCustomDrink: true,
          },
          {
            id: 'es-fried-egg',
            name: 'Fried Egg',
            qty: 1,
            unit: 'egg',
            grams: 50,
            calories: 90,
            protein: 6.3,
            carbs: 0.4,
            fat: 7.0,
            isEstimated: false,
          },
          {
            id: 'es-oil',
            name: 'Cooking Oil',
            qty: 2,
            unit: 'drops',
            grams: 0.1,
            calories: 1,
            protein: 0.0,
            carbs: 0.0,
            fat: 0.1,
            isEstimated: true,
          },
        ],
      },
      {
        id: 'dinner',
        name: 'Dinner',
        time: '8:00 PM',
        targetTime: '20:00',
        completed: false,
        items: [
          {
            id: 'd-chapati',
            name: 'Chapati (Roti)',
            qty: 1,
            unit: 'medium',
            grams: 40,
            calories: 110,
            protein: 3.1,
            carbs: 22.0,
            fat: 1.2,
            isEstimated: true,
          },
          {
            id: 'd-egg',
            name: 'Boiled Egg',
            qty: 1,
            unit: 'egg',
            grams: 50,
            calories: 78,
            protein: 6.3,
            carbs: 0.6,
            fat: 5.3,
            isEstimated: false,
          },
        ],
      },
    ],
  };
}

// Generate all 55 days from 2026-11-01 to 2026-12-25
export function generateInitial55Days() {
  const days = {};
  const start = new Date('2026-11-01T00:00:00');
  
  for (let i = 0; i < TOTAL_DAYS; i++) {
    const current = new Date(start);
    current.setDate(start.getDate() + i);
    const yyyy = current.getFullYear();
    const mm = String(current.getMonth() + 1).padStart(2, '0');
    const dd = String(current.getDate()).padStart(2, '0');
    const dateStr = `${yyyy}-${mm}-${dd}`;
    days[dateStr] = createDefaultDayData(dateStr, i);
  }

  // Pre-seed Day 1 (Nov 1) with sample progress so the user sees live interactions right away
  if (days['2026-11-01']) {
    days['2026-11-01'].weight = 75.0;
    days['2026-11-01'].waterGlasses = 6;
    days['2026-11-01'].notes = 'Day 1 kick-off! Feeling energised and disciplined.';
    days['2026-11-01'].meals[0].completed = true; // Breakfast completed
    days['2026-11-01'].meals[1].completed = true; // Morning snack completed
  }

  return days;
}
