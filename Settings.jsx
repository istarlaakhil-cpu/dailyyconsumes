import React, { useState } from 'react';
import {
  Settings as SettingsIcon,
  User,
  Bell,
  Database,
  Download,
  Upload,
  RefreshCw,
  Save,
  Check,
  ShieldCheck,
  Flame,
  Droplets,
  Scale,
  Sparkles,
} from 'lucide-react';
import { useFitness } from '../context/FitnessContext';

export default function Settings() {
  const {
    userProfile,
    setUserProfile,
    exportDataJson,
    importDataJson,
    resetAllData,
    notificationStatus,
    requestNotificationPermission,
  } = useFitness();

  const [formData, setFormData] = useState({ ...userProfile });
  const [saveSuccess, setSaveSuccess] = useState(false);

  const handleSave = (e) => {
    e.preventDefault();
    setUserProfile(formData);
    setSaveSuccess(true);
    setTimeout(() => setSaveSuccess(false), 2500);
  };

  const handleFileUpload = (e) => {
    const file = e.target.files?.[0];
    if (!file) return;
    const reader = new FileReader();
    reader.onload = (event) => {
      const content = event.target?.result;
      if (typeof content === 'string') {
        importDataJson(content);
      }
    };
    reader.readAsText(file);
  };

  const sendTestNotification = () => {
    if (!('Notification' in window)) {
      alert('Desktop notifications are not supported in this browser.');
      return;
    }
    if (Notification.permission === 'granted') {
      new Notification('Meal Reminder (55-Day Tracker)', {
        body: 'Time for your 1:00 PM Lunch & 80g Carrots! Stay disciplined.',
        icon: 'https://cdn-icons-png.flaticon.com/512/2921/2921822.png',
      });
    } else {
      requestNotificationPermission();
    }
  };

  return (
    <div className="space-y-6 pb-20 lg:pb-8">
      {/* Title */}
      <div className="bg-[#fffefb] rounded-3xl p-6 border border-[#e8e2d5] shadow-xs">
        <div className="flex items-center gap-3">
          <div className="p-3 bg-[#e9f5ed] text-[#2d6a4f] rounded-2xl">
            <SettingsIcon className="w-6 h-6" />
          </div>
          <div>
            <h2 className="text-2xl font-black text-[#1b4332]">App Settings & Data Storage</h2>
            <p className="text-xs text-[#52796f] mt-0.5">
              Customize targets, configure daily meal reminders, and manage database persistence.
            </p>
          </div>
        </div>
      </div>

      {/* Main Settings Form */}
      <form onSubmit={handleSave} className="space-y-6">
        {/* User Profile & Physical Targets */}
        <div className="bg-[#fffefb] rounded-3xl p-6 border border-[#e8e2d5] shadow-xs space-y-4">
          <div className="flex items-center gap-2 pb-3 border-b border-[#f4f0e6]">
            <User className="w-5 h-5 text-[#2d6a4f]" />
            <h3 className="text-base font-extrabold text-[#1b4332]">User Profile & Goals</h3>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4 text-xs">
            <div>
              <label className="font-bold text-[#52796f] block mb-1.5">Participant Name</label>
              <input
                type="text"
                value={formData.name || ''}
                onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                className="w-full p-2.5 rounded-xl border border-[#cfc6b8] bg-[#fdfbf7] font-semibold text-[#1b4332]"
              />
            </div>

            <div>
              <label className="font-bold text-[#52796f] block mb-1.5">Starting Weight (kg)</label>
              <input
                type="number"
                step="0.1"
                value={formData.startWeight || 75}
                onChange={(e) => setFormData({ ...formData, startWeight: Number(e.target.value) })}
                className="w-full p-2.5 rounded-xl border border-[#cfc6b8] bg-[#fdfbf7] font-semibold text-[#1b4332]"
              />
            </div>

            <div>
              <label className="font-bold text-[#52796f] block mb-1.5">Dec 25 Target Weight (kg)</label>
              <input
                type="number"
                step="0.1"
                value={formData.targetWeight || 68}
                onChange={(e) => setFormData({ ...formData, targetWeight: Number(e.target.value) })}
                className="w-full p-2.5 rounded-xl border border-[#cfc6b8] bg-[#fdfbf7] font-semibold text-[#1b4332]"
              />
            </div>

            <div>
              <label className="font-bold text-[#52796f] block mb-1.5">Daily Calorie Target (kcal)</label>
              <input
                type="number"
                value={formData.calorieTarget || 950}
                onChange={(e) => setFormData({ ...formData, calorieTarget: Number(e.target.value) })}
                className="w-full p-2.5 rounded-xl border border-[#cfc6b8] bg-[#fdfbf7] font-semibold text-[#1b4332]"
              />
            </div>

            <div>
              <label className="font-bold text-[#52796f] block mb-1.5">Daily Water Goal (Glasses of 250ml)</label>
              <input
                type="number"
                min="4"
                max="24"
                value={formData.waterTargetGlasses || 12}
                onChange={(e) => setFormData({ ...formData, waterTargetGlasses: Number(e.target.value) })}
                className="w-full p-2.5 rounded-xl border border-[#cfc6b8] bg-[#fdfbf7] font-semibold text-[#1b4332]"
              />
              <span className="text-[10px] text-[#8aa59c] mt-0.5 block">
                {formData.waterTargetGlasses * 250} ml target total
              </span>
            </div>
          </div>
        </div>

        {/* Custom Lunch & L-Carnitine Defaults */}
        <div className="bg-[#fffefb] rounded-3xl p-6 border border-[#e8e2d5] shadow-xs space-y-4">
          <div className="flex items-center gap-2 pb-3 border-b border-[#f4f0e6]">
            <Flame className="w-5 h-5 text-[#2d6a4f]" />
            <h3 className="text-base font-extrabold text-[#1b4332]">Default Lunch & L-Carnitine Preferences</h3>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4 text-xs">
            <div>
              <label className="font-bold text-[#52796f] block mb-1.5">Default 100g Lunch Food</label>
              <input
                type="text"
                placeholder="e.g. Boiled Chicken Breast, Brown Rice, Dal"
                value={formData.defaultLunchName || ''}
                onChange={(e) => setFormData({ ...formData, defaultLunchName: e.target.value })}
                className="w-full p-2.5 rounded-xl border border-[#cfc6b8] bg-[#fdfbf7] font-semibold text-[#1b4332]"
              />
            </div>

            <div>
              <label className="font-bold text-[#52796f] block mb-1.5">Estimated Lunch Calories (kcal / 100g)</label>
              <input
                type="number"
                value={formData.defaultLunchCalories || 165}
                onChange={(e) => setFormData({ ...formData, defaultLunchCalories: Number(e.target.value) })}
                className="w-full p-2.5 rounded-xl border border-[#cfc6b8] bg-[#fdfbf7] font-semibold text-[#1b4332]"
              />
            </div>

            <div>
              <label className="font-bold text-[#52796f] block mb-1.5">L-Carnitine Drink Brand</label>
              <input
                type="text"
                placeholder="e.g. Applied Nutrition Liquid 3000"
                value={formData.lcarnitineBrand || ''}
                onChange={(e) => setFormData({ ...formData, lcarnitineBrand: e.target.value })}
                className="w-full p-2.5 rounded-xl border border-[#cfc6b8] bg-[#fdfbf7] font-semibold text-[#1b4332]"
              />
            </div>
          </div>
        </div>

        {/* Save button banner */}
        <div className="flex items-center justify-between bg-[#fffefb] p-4 rounded-3xl border border-[#e8e2d5]">
          <div className="text-xs">
            {saveSuccess ? (
              <span className="text-[#2d6a4f] font-bold flex items-center gap-1.5">
                <Check className="w-4 h-4" /> Preferences successfully saved to browser storage!
              </span>
            ) : (
              <span className="text-[#52796f]">Remember to click save after changing your targets.</span>
            )}
          </div>

          <button
            type="submit"
            className="px-6 py-2.5 bg-[#2d6a4f] hover:bg-[#1b4332] text-white rounded-2xl text-xs font-bold flex items-center gap-2 shadow-xs transition"
          >
            <Save className="w-4 h-4" /> Save Profile Settings
          </button>
        </div>
      </form>

      {/* Meal Reminder Notifications */}
      <div className="bg-[#fffefb] rounded-3xl p-6 border border-[#e8e2d5] shadow-xs space-y-4">
        <div className="flex items-center justify-between pb-3 border-b border-[#f4f0e6]">
          <div className="flex items-center gap-2">
            <Bell className="w-5 h-5 text-[#2d6a4f]" />
            <div>
              <h3 className="text-base font-extrabold text-[#1b4332]">Meal Reminders & Notifications</h3>
              <p className="text-xs text-[#52796f]">Automated browser alerts for scheduled meal windows</p>
            </div>
          </div>

          <span
            className={`text-xs font-bold px-3 py-1 rounded-full ${
              notificationStatus === 'granted'
                ? 'bg-[#e9f5ed] text-[#2d6a4f]'
                : 'bg-[#fff3e0] text-[#b76e00]'
            }`}
          >
            Status: {notificationStatus === 'granted' ? 'Enabled' : 'Not Granted'}
          </span>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-5 gap-3 text-xs">
          {[
            { time: '8:00 AM', meal: 'Breakfast (Apple & Egg)' },
            { time: '11:00 AM', meal: 'Watermelon Snack (100g)' },
            { time: '1:00 PM', meal: 'Lunch & Carrot (80g)' },
            { time: '5:00 PM', meal: 'Evening L-Carnitine & Egg' },
            { time: '8:00 PM', meal: 'Dinner (Chapati & Egg)' },
          ].map((rem, i) => (
            <div key={i} className="p-3 bg-[#fdfbf7] rounded-2xl border border-[#ede7db]">
              <span className="font-extrabold text-[#2d6a4f] block">{rem.time}</span>
              <p className="text-[11px] text-[#52796f] mt-1">{rem.meal}</p>
            </div>
          ))}
        </div>

        <div className="flex items-center gap-3 pt-2">
          {notificationStatus !== 'granted' ? (
            <button
              onClick={requestNotificationPermission}
              className="px-5 py-2.5 bg-[#2d6a4f] hover:bg-[#1b4332] text-white rounded-2xl text-xs font-bold flex items-center gap-2 transition"
            >
              <Bell className="w-4 h-4" /> Enable Browser Reminders
            </button>
          ) : (
            <button
              onClick={sendTestNotification}
              className="px-5 py-2.5 bg-[#f4f0e6] hover:bg-[#ede7db] text-[#1b4332] rounded-2xl text-xs font-bold flex items-center gap-2 border border-[#ded7c9] transition"
            >
              <Bell className="w-4 h-4 text-[#2d6a4f]" /> Send Test Reminder
            </button>
          )}
        </div>
      </div>

      {/* Database & Cloud Backup */}
      <div className="bg-[#fffefb] rounded-3xl p-6 border border-[#e8e2d5] shadow-xs space-y-4">
        <div className="flex items-center gap-2 pb-3 border-b border-[#f4f0e6]">
          <Database className="w-5 h-5 text-[#2d6a4f]" />
          <div>
            <h3 className="text-base font-extrabold text-[#1b4332]">Permanent Storage & Data Backups</h3>
            <p className="text-xs text-[#52796f]">All your 55 days of records are permanently saved offline and exportable</p>
          </div>
        </div>

        <p className="text-xs text-[#52796f] leading-relaxed">
          The app uses browser-persistent local storage and indexed persistence. To prevent any loss when clearing cache or switching devices, export a complete JSON snapshot regularly.
        </p>

        <div className="flex flex-wrap items-center gap-3 pt-2">
          <button
            onClick={exportDataJson}
            className="px-4 py-2.5 bg-[#2d6a4f] hover:bg-[#1b4332] text-white rounded-2xl text-xs font-bold flex items-center gap-2 shadow-xs transition"
          >
            <Download className="w-4 h-4" /> Export Complete Backup (.JSON)
          </button>

          <label className="px-4 py-2.5 bg-[#f4f0e6] hover:bg-[#ede7db] text-[#1b4332] rounded-2xl text-xs font-bold flex items-center gap-2 border border-[#ded7c9] cursor-pointer transition">
            <Upload className="w-4 h-4 text-[#2d6a4f]" />
            <span>Restore From File</span>
            <input type="file" accept=".json" onChange={handleFileUpload} className="hidden" />
          </label>

          <button
            onClick={resetAllData}
            className="px-4 py-2.5 bg-[#fee2e2] hover:bg-[#fecaca] text-[#b91c1c] rounded-2xl text-xs font-bold flex items-center gap-2 transition ml-auto"
          >
            <RefreshCw className="w-4 h-4" /> Reset All Data
          </button>
        </div>
      </div>
    </div>
  );
}
