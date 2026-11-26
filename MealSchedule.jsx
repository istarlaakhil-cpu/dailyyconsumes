import React from 'react';
import {
  Clock,
  Apple,
  Coffee,
  Sun,
  Sunset,
  Moon,
  AlertTriangle,
  ShieldCheck,
  Check,
  Flame,
  Droplets,
  HeartPulse,
} from 'lucide-react';
import { useFitness } from '../context/FitnessContext';

export default function MealSchedule() {
  const { setActiveTab } = useFitness();

  const SCHEDULE = [
    {
      time: '8:00 AM',
      title: 'Breakfast Kickstart',
      icon: Sun,
      color: 'from-[#e9f5ed] to-[#d8f3dc]',
      accentColor: '#2d6a4f',
      items: [
        { name: '1 Medium Apple', detail: '~95 kcal | Rich in pectin fiber & natural sugars for steady energy' },
        { name: '1 Boiled Egg', detail: '~78 kcal | 6.3g high-quality bioavailable protein for morning satiety' },
      ],
      estimatedKcal: '173 kcal',
      purpose: 'Awakens metabolism, breaks the overnight fast with clean protein and natural fruit fiber.',
    },
    {
      time: '11:00 AM',
      title: 'Morning Hydration Snack',
      icon: Droplets,
      color: 'from-[#fef6e4] to-[#fde2b8]',
      accentColor: '#c77a16',
      items: [
        { name: 'Watermelon pieces – 100 grams', detail: '~30 kcal | High water content, lycopene antioxidant & potassium' },
      ],
      estimatedKcal: '30 kcal',
      purpose: 'Hydrates the body, prevents mid-morning energy dips and cravings before lunch.',
    },
    {
      time: '1:00 PM',
      title: 'Nutritious Controlled Lunch',
      icon: Flame,
      color: 'from-[#e9f5ed] to-[#d8f3dc]',
      accentColor: '#2d6a4f',
      items: [
        { name: 'Lunch – 100 grams', detail: 'User choice (e.g. Grilled chicken, brown rice, dal, or paneer) to provide vital amino acids and complex fuel' },
        { name: 'Carrot pieces – 80 grams', detail: '~33 kcal | Beta-carotene, crunch, gut fiber, zero added sugar' },
      ],
      estimatedKcal: '33 kcal + Lunch (~100-200 kcal)',
      purpose: 'Provides core midday sustenance. Essential to choose lean proteins or fiber-dense complex grains.',
    },
    {
      time: '5:00 PM',
      title: 'Evening Metabolic Snack',
      icon: Sunset,
      color: 'from-[#fdf0ed] to-[#fad2c8]',
      accentColor: '#c25438',
      items: [
        { name: 'L-Carnitine drink – 250 ml', detail: '~10-15 kcal | Supports fatty acid transport into mitochondria for workout fuel' },
        { name: '1 Fried Egg', detail: '~90 kcal | 6.3g protein + essential micronutrients (choline, zinc)' },
        { name: 'Cooking oil – 2 drops only', detail: '~1 kcal | Minimal lubricating fat to prevent excess caloric surplus' },
      ],
      estimatedKcal: '91 kcal + L-Carnitine drink (~10 kcal)',
      purpose: 'Preps body for evening activity or workout; delivers quick protein while keeping carbs near zero.',
    },
    {
      time: '8:00 PM',
      title: 'Light Wholesome Dinner',
      icon: Moon,
      color: 'from-[#eef2f7] to-[#d9e2ec]',
      accentColor: '#2b5282',
      items: [
        { name: '1 Chapati (Roti)', detail: '~110 kcal | Whole wheat carbohydrate for serotonin production & restorative sleep' },
        { name: '1 Boiled Egg', detail: '~78 kcal | Sustained overnight protein release for muscle repair' },
      ],
      estimatedKcal: '188 kcal',
      purpose: 'Easily digestible night meal. Eaten 2-3 hours before bed to ensure deep sleep without digestive strain.',
    },
  ];

  return (
    <div className="space-y-6 pb-20 lg:pb-8">
      {/* Title Card */}
      <div className="bg-[#fffefb] rounded-3xl p-6 border border-[#e8e2d5] shadow-xs">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
          <div>
            <div className="inline-flex items-center gap-1.5 bg-[#e9f5ed] text-[#2d6a4f] text-xs font-bold px-3 py-1 rounded-full mb-2">
              <Clock className="w-3.5 h-3.5" />
              <span>Nov 1 – Dec 25 Daily Protocol</span>
            </div>
            <h2 className="text-2xl font-black text-[#1b4332]">Daily Fixed Diet Schedule</h2>
            <p className="text-xs text-[#52796f] mt-1 max-w-2xl">
              Consistent timing trains your ghrelin (hunger hormone) rhythms, enhances insulin sensitivity, and prevents late-night bingeing over the 55-day journey.
            </p>
          </div>

          <div className="bg-[#f9f6f0] p-4 rounded-2xl border border-[#ded7c9] text-center min-w-[200px]">
            <span className="text-[11px] font-bold text-[#52796f] uppercase tracking-wider block">Base Daily Total</span>
            <span className="text-2xl font-black text-[#1b4332]">515 kcal</span>
            <span className="text-[11px] text-[#2d6a4f] font-semibold block">+ Lunch (100g) + Drink</span>
          </div>
        </div>
      </div>

      {/* Medical & Nutritional Advisory Notice */}
      <div className="bg-[#fffbf0] border border-[#f5e3b5] rounded-3xl p-6 shadow-xs">
        <div className="flex items-start gap-4">
          <div className="p-3 bg-[#fceec9] text-[#9a6a12] rounded-2xl shrink-0">
            <AlertTriangle className="w-6 h-6" />
          </div>
          <div className="space-y-2">
            <h3 className="text-base font-extrabold text-[#7b5410]">
              Important Health & Caloric Advisory Notice
            </h3>
            <p className="text-xs text-[#8c6319] leading-relaxed">
              <strong>515 kcal is only an estimate of the listed base foods</strong>, not a complete standalone daily intake for most adults. Consuming only 515 kcal without a nutrient-dense lunch may trigger metabolic slowdown, fatigue, and muscle catabolism.
            </p>
            <div className="bg-white/80 p-3 rounded-xl border border-[#ebd6a2] text-xs text-[#7b5410] font-medium">
              💡 <strong>Best Practice for this 55-Day Challenge:</strong> Choose a wholesome 100g protein/grain lunch (such as grilled chicken, fish, paneer, or lentils with steamed veggies) to bring your intake to a safe, sustainable fat-loss deficit (~900 - 1,200 kcal/day). Consult a certified dietitian or physician before embarking on aggressive prolonged caloric restrictions.
            </div>
          </div>
        </div>
      </div>

      {/* Timeline Schedule Cards */}
      <div className="space-y-4">
        {SCHEDULE.map((slot, index) => {
          const Icon = slot.icon;
          return (
            <div
              key={index}
              className="bg-[#fffefb] rounded-3xl p-6 border border-[#e8e2d5] shadow-xs hover:border-[#40916c]/60 transition"
            >
              <div className="flex flex-col md:flex-row md:items-start justify-between gap-4">
                <div className="flex items-start gap-4">
                  <div
                    className="w-12 h-12 rounded-2xl flex items-center justify-center shrink-0 shadow-xs"
                    style={{ backgroundColor: `${slot.accentColor}15`, color: slot.accentColor }}
                  >
                    <Icon className="w-6 h-6" />
                  </div>

                  <div>
                    <div className="flex items-center gap-2 flex-wrap">
                      <span className="text-xs font-black px-2.5 py-0.5 rounded-full text-white" style={{ backgroundColor: slot.accentColor }}>
                        {slot.time}
                      </span>
                      <h3 className="text-lg font-extrabold text-[#1b4332]">{slot.title}</h3>
                    </div>

                    <p className="text-xs text-[#52796f] mt-1 italic">
                      "{slot.purpose}"
                    </p>

                    <div className="mt-4 space-y-2">
                      {slot.items.map((item, i) => (
                        <div key={i} className="flex items-start gap-2 bg-[#f9f6f0] p-2.5 rounded-xl border border-[#ece4d6]">
                          <Check className="w-4 h-4 text-[#2d6a4f] shrink-0 mt-0.5" />
                          <div>
                            <span className="text-xs font-bold text-[#1b4332]">{item.name}</span>
                            <p className="text-[11px] text-[#638075]">{item.detail}</p>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>

                <div className="self-end md:self-start bg-[#e9f5ed] px-3.5 py-2 rounded-2xl border border-[#b7e4c7] text-right min-w-[140px]">
                  <span className="text-[10px] uppercase font-bold text-[#52796f] block">Target Calories</span>
                  <span className="text-sm font-black text-[#2d6a4f]">{slot.estimatedKcal}</span>
                </div>
              </div>
            </div>
          );
        })}
      </div>

      {/* Rules Checklist Card */}
      <div className="bg-[#fffefb] rounded-3xl p-6 border border-[#e8e2d5] shadow-xs">
        <h3 className="text-base font-extrabold text-[#1b4332] mb-3 flex items-center gap-2">
          <ShieldCheck className="w-5 h-5 text-[#2d6a4f]" />
          5 Core Dietary Guidelines for Transformation Success
        </h3>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-xs">
          <div className="p-3 bg-[#fdfbf7] rounded-2xl border border-[#e8e2d5] flex items-start gap-2">
            <span className="w-5 h-5 rounded-full bg-[#fee2e2] text-[#991b1b] flex items-center justify-center font-bold text-[10px] shrink-0">1</span>
            <div>
              <p className="font-bold text-[#1b4332]">Zero Added Sugar</p>
              <p className="text-[#52796f] text-[11px] mt-0.5">Eliminate white sugar, honey, syrups, jaggery, sweetened tea/coffee, and desserts.</p>
            </div>
          </div>

          <div className="p-3 bg-[#fdfbf7] rounded-2xl border border-[#e8e2d5] flex items-start gap-2">
            <span className="w-5 h-5 rounded-full bg-[#fee2e2] text-[#991b1b] flex items-center justify-center font-bold text-[10px] shrink-0">2</span>
            <div>
              <p className="font-bold text-[#1b4332]">Zero Sugary Drinks</p>
              <p className="text-[#52796f] text-[11px] mt-0.5">Strictly avoid packed juices, sodas, energy drinks. Plain water & black coffee/green tea only.</p>
            </div>
          </div>

          <div className="p-3 bg-[#fdfbf7] rounded-2xl border border-[#e8e2d5] flex items-start gap-2">
            <span className="w-5 h-5 rounded-full bg-[#e9f5ed] text-[#2d6a4f] flex items-center justify-center font-bold text-[10px] shrink-0">3</span>
            <div>
              <p className="font-bold text-[#1b4332]">Natural Fruit Fructose</p>
              <p className="text-[#52796f] text-[11px] mt-0.5">Permitted within designated morning portions (1 apple & 100g watermelon). Counted separately.</p>
            </div>
          </div>

          <div className="p-3 bg-[#fdfbf7] rounded-2xl border border-[#e8e2d5] flex items-start gap-2">
            <span className="w-5 h-5 rounded-full bg-[#e9f5ed] text-[#2d6a4f] flex items-center justify-center font-bold text-[10px] shrink-0">4</span>
            <div>
              <p className="font-bold text-[#1b4332]">Mandatory Logging</p>
              <p className="text-[#52796f] text-[11px] mt-0.5">Never consume unrecorded bites or nibbles. If you eat it, log it immediately.</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
