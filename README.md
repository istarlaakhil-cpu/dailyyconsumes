# MY 55-DAY FITNESS TRANSFORMATION TRACKER
> **November 1, 2026 – December 25, 2026**

A premium, responsive, zero-sugar diet and calorie tracking application built with **React 19**, **Tailwind CSS (v4)**, and **Vite**, tailored with an elegant **Forest Green & Warm Cream** design palette.

---

## 🌟 Key Features

1. **Main Dashboard**:
   - Live Circular Calorie Progress Meter (with custom goal calculation)
   - Real-time Macronutrient Breakdown: Protein (g), Carbohydrates (g), and Healthy Fats (g)
   - Interactive Water Tracker (250 ml increments, glass visualizer, celebration triggers)
   - Meal Completion Percentage & Consistency Score
   - Days Remaining Countdown to December 25, 2026

2. **Daily Fixed Diet Schedule**:
   - 8:00 AM Breakfast: 1 Medium Apple (~95 kcal) + 1 Boiled Egg (~78 kcal)
   - 11:00 AM Morning Snack: Watermelon Pieces 100g (~30 kcal)
   - 1:00 PM Lunch: 100g Customizable Dish (Presets for Chicken, Brown Rice, Dal, Paneer, Fish) + Carrot Pieces 80g (~33 kcal)
   - 5:00 PM Evening Snack: L-Carnitine 250ml + 1 Fried Egg (~90 kcal) + 2 drops Cooking Oil (~1 kcal)
   - 8:00 PM Dinner: 1 Chapati (Roti) (~110 kcal) + 1 Boiled Egg (~78 kcal)
   - Strict Sugar-Free Guardrails: Highlights 0g added sugar while tracking natural fruit fructose separately.

3. **Automatic Calorie Calculator**:
   - Fully editable Master Nutrition Database
   - Interactive Portion & Gram Simulator with instant live macro recalculation
   - Ability to add, edit, or delete foods in the database

4. **Weight Management Tracker**:
   - Daily weight logging (kg) with morning weigh-in recommendations
   - Start weight (75 kg), current weight, and December 25 target (68 kg) tracking
   - Interactive Recharts trajectory graph with goal reference line
   - Weekly breakdown comparison (Weeks 1 to 8)

5. **55-Day Progress Calendar**:
   - Full 55-day interactive grid from November 1 to December 25, 2026
   - Color coded visual indicators:
     - 🟢 **Green**: 100% of daily scheduled meals completed
     - 🟡 **Yellow**: Partially completed
     - 🔴 **Red**: Caloric limit exceeded or missed
     - ⚪ **Upcoming**: Future planned dates
   - Click any date card to view or edit full records

6. **Analytics & Performance Reports**:
   - Daily calorie consumption bar charts
   - Macronutrient distribution pie chart
   - Weekly summary cards
   - Official December 25 Milestone Certification Report with printable PDF styling

7. **Browser Reminders & Data Persistence**:
   - Scheduled Web Notification API integration (8 AM, 11 AM, 1 PM, 5 PM, 8 PM)
   - Permanent offline-first LocalStorage persistence
   - Export/Import complete JSON backups

---

## 🚀 Running Locally

```bash
cd /Users/akhilistarla/.gemini/antigravity/scratch/fitness-55-tracker
npm install
npm run dev
```

Visit: `http://localhost:5173/` or preview on `http://localhost:4173/`

---

## 🌐 Deploying to Vercel

### Method 1: Using the Vercel CLI (Fastest)

1. Run the deployment command in your terminal:
   ```bash
   cd /Users/akhilistarla/.gemini/antigravity/scratch/fitness-55-tracker
   npx vercel
   ```
2. Follow the quick terminal prompts:
   - Set up and deploy? **Y**
   - Which scope? Select your personal or team account
   - Link to existing project? **N**
   - What's your project's name? **my-55-day-fitness-tracker**
   - In which directory is your code located? `./`
   - Want to modify these settings? **N** (the included `vercel.json` will auto-configure everything)
3. For production deployment:
   ```bash
   npx vercel --prod
   ```

### Method 2: Git / GitHub (1-Click Automated Deploy)

1. Create a repository on GitHub (e.g. `fitness-55-tracker`).
2. Push the committed code:
   ```bash
   cd /Users/akhilistarla/.gemini/antigravity/scratch/fitness-55-tracker
   git remote add origin https://github.com/<your-username>/fitness-55-tracker.git
   git branch -M main
   git push -u origin main
   ```
3. Go to [vercel.com/new](https://vercel.com/new), select your repo, and click **Deploy**.
