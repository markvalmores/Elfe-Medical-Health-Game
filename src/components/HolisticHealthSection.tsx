import React, { useState } from 'react';
import {
  Dumbbell,
  Utensils,
  Droplet,
  Sparkles,
  CheckCircle2,
  Plus,
  HeartPulse,
  BookOpen,
  Calendar,
  Award,
  ShieldCheck,
  Zap,
  Flame,
  Sun,
  Moon,
  Cross
} from 'lucide-react';
import {
  GymWorkout,
  MealPlanItem,
  HydrationLog,
  CleansingTask
} from '../types';
import {
  DEFAULT_GYM_WORKOUTS,
  DEFAULT_MEAL_PLANS,
  DEFAULT_HYDRATION_LOGS,
  DEFAULT_CLEANSING_SCHEDULE
} from '../utils/storage';

interface HolisticHealthProps {
  onGainRewards: (gems: number, xp: number) => void;
}

export const HolisticHealthSection: React.FC<HolisticHealthProps> = ({ onGainRewards }) => {
  const [activeTab, setActiveTab] = useState<'gym' | 'diet' | 'hydration' | 'cleansing'>('gym');

  // Gym State
  const [workouts, setWorkouts] = useState<GymWorkout[]>(DEFAULT_GYM_WORKOUTS);
  const [newExName, setNewExName] = useState('');
  const [newExCategory, setNewExCategory] = useState<'Strength' | 'Cardio' | 'Flexibility' | 'Endurance'>('Strength');
  const [newExSets, setNewExSets] = useState('3');
  const [newExReps, setNewExReps] = useState('12');
  const [newExDuration, setNewExDuration] = useState('20');

  // Diet State
  const [mealPlans, setMealPlans] = useState<MealPlanItem[]>(DEFAULT_MEAL_PLANS);
  const [newMealName, setNewMealName] = useState('');
  const [newMealType, setNewMealType] = useState<'Breakfast' | 'Lunch' | 'Dinner' | 'Biblical Clean Snack'>('Lunch');
  const [newMealCategory, setNewMealCategory] = useState<'Clean Meat / Fish' | 'Whole Grains & Herbs' | 'Fruit & Honey' | 'Olive Oil & Nuts'>('Clean Meat / Fish');
  const [newMealCals, setNewMealCals] = useState('400');
  const [newMealProtein, setNewMealProtein] = useState('30');

  // Hydration State
  const [hydrationLogs, setHydrationLogs] = useState<HydrationLog[]>(DEFAULT_HYDRATION_LOGS);
  const targetHydrationMl = 3000;
  const currentHydrationTotal = hydrationLogs.reduce((sum, log) => sum + log.amountMl, 0);

  // Cleansing State
  const [cleansingTasks, setCleansingTasks] = useState<CleansingTask[]>(DEFAULT_CLEANSING_SCHEDULE);

  // Gym Toggle
  const toggleWorkout = (id: string) => {
    setWorkouts((prev) =>
      prev.map((w) => {
        if (w.id === id) {
          const updated = !w.completed;
          if (updated) onGainRewards(20, 50); // Reward gems and XP
          return { ...w, completed: updated };
        }
        return w;
      })
    );
  };

  const handleAddWorkout = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newExName.trim()) return;
    const item: GymWorkout = {
      id: `gym-${Date.now()}`,
      date: new Date().toISOString().split('T')[0],
      exerciseName: newExName.trim(),
      category: newExCategory,
      sets: parseInt(newExSets) || 3,
      reps: parseInt(newExReps) || 12,
      durationMins: parseInt(newExDuration) || 20,
      caloriesBurned: Math.round((parseInt(newExDuration) || 20) * 8.5),
      completed: false,
    };
    setWorkouts((prev) => [item, ...prev]);
    setNewExName('');
  };

  // Diet Toggle
  const toggleMeal = (id: string) => {
    setMealPlans((prev) =>
      prev.map((m) => {
        if (m.id === id) {
          const updated = !m.completed;
          if (updated) onGainRewards(15, 30);
          return { ...m, completed: updated };
        }
        return m;
      })
    );
  };

  const handleAddMeal = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newMealName.trim()) return;
    const item: MealPlanItem = {
      id: `meal-${Date.now()}`,
      mealType: newMealType,
      foodName: newMealName.trim(),
      category: newMealCategory,
      calories: parseInt(newMealCals) || 350,
      proteinG: parseInt(newMealProtein) || 25,
      carbsG: 35,
      fatsG: 12,
      isBiblicallyClean: true,
      completed: false,
    };
    setMealPlans((prev) => [item, ...prev]);
    setNewMealName('');
  };

  // Hydration Add
  const addHydration = (amountMl: number, type: 'Pure Spring Water' | 'Herbal Tea' | 'Electro-Mineral Brew') => {
    const newLog: HydrationLog = {
      id: `hyd-${Date.now()}`,
      time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
      amountMl,
      type,
    };
    setHydrationLogs((prev) => [newLog, ...prev]);
    onGainRewards(10, 20);
  };

  // Cleansing Toggle
  const toggleCleansingTask = (id: string) => {
    setCleansingTasks((prev) =>
      prev.map((t) => {
        if (t.id === id) {
          const updated = !t.completed;
          if (updated) onGainRewards(25, 60);
          return { ...t, completed: updated };
        }
        return t;
      })
    );
  };

  return (
    <div className="space-y-6">
      {/* Banner Card */}
      <div className="bg-gradient-to-r from-slate-900 via-rose-950/40 to-slate-900 border border-rose-500/30 rounded-3xl p-6 shadow-2xl relative overflow-hidden">
        <div className="absolute top-0 right-0 w-64 h-64 bg-rose-500/10 rounded-full blur-3xl pointer-events-none"></div>

        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 relative z-10">
          <div className="space-y-1">
            <div className="inline-flex items-center gap-2 px-3 py-1 bg-rose-500/20 rounded-full border border-rose-500/30 text-rose-300 text-xs font-bold">
              <Cross className="w-3.5 h-3.5 text-amber-400" />
              Yahusha & YHWH Faith Clean Health Engine
            </div>
            <h2 className="text-2xl sm:text-3xl font-black text-white tracking-tight">
              Holistic Fitness, Diet & Cleansing Schedule
            </h2>
            <p className="text-xs sm:text-sm text-slate-300 max-w-xl">
              Honor your physical temple through gym progression, biblical clean nutrition, pure spring hydration, and daily body-mind-soul cleansing routines.
            </p>
          </div>

          <div className="bg-slate-950/80 border border-amber-500/30 rounded-2xl p-4 text-center min-w-[160px] shadow-lg">
            <span className="text-[10px] text-amber-400 font-bold uppercase tracking-wider block">
              Daily Temple Alignment
            </span>
            <span className="text-2xl font-black text-white">
              {Math.round(
                ((workouts.filter((w) => w.completed).length +
                  mealPlans.filter((m) => m.completed).length +
                  cleansingTasks.filter((c) => c.completed).length) /
                  (workouts.length + mealPlans.length + cleansingTasks.length)) *
                  100
              )}
              %
            </span>
            <div className="w-full bg-slate-800 rounded-full h-1.5 mt-2 overflow-hidden">
              <div
                className="bg-gradient-to-r from-rose-500 to-amber-400 h-full rounded-full transition-all duration-500"
                style={{
                  width: `${
                    ((workouts.filter((w) => w.completed).length +
                      mealPlans.filter((m) => m.completed).length +
                      cleansingTasks.filter((c) => c.completed).length) /
                      (workouts.length + mealPlans.length + cleansingTasks.length)) *
                    100
                  }%`,
                }}
              ></div>
            </div>
          </div>
        </div>
      </div>

      {/* Sub-Navigation Tabs */}
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
        <button
          onClick={() => setActiveTab('gym')}
          className={`p-4 rounded-2xl border text-left transition flex items-center gap-3 ${
            activeTab === 'gym'
              ? 'bg-gradient-to-r from-rose-600 to-amber-600 text-white border-rose-400 shadow-xl'
              : 'bg-slate-900/80 text-slate-400 border-slate-800 hover:text-white hover:bg-slate-800'
          }`}
        >
          <div className="p-2.5 rounded-xl bg-white/10 shrink-0">
            <Dumbbell className="w-5 h-5" />
          </div>
          <div>
            <span className="text-xs font-bold block">Gym & Workouts</span>
            <span className="text-[10px] opacity-80">Strength & Reps</span>
          </div>
        </button>

        <button
          onClick={() => setActiveTab('diet')}
          className={`p-4 rounded-2xl border text-left transition flex items-center gap-3 ${
            activeTab === 'diet'
              ? 'bg-gradient-to-r from-rose-600 to-amber-600 text-white border-rose-400 shadow-xl'
              : 'bg-slate-900/80 text-slate-400 border-slate-800 hover:text-white hover:bg-slate-800'
          }`}
        >
          <div className="p-2.5 rounded-xl bg-white/10 shrink-0">
            <Utensils className="w-5 h-5" />
          </div>
          <div>
            <span className="text-xs font-bold block">Biblical Clean Diet</span>
            <span className="text-[10px] opacity-80">Torah Clean Meals</span>
          </div>
        </button>

        <button
          onClick={() => setActiveTab('hydration')}
          className={`p-4 rounded-2xl border text-left transition flex items-center gap-3 ${
            activeTab === 'hydration'
              ? 'bg-gradient-to-r from-rose-600 to-amber-600 text-white border-rose-400 shadow-xl'
              : 'bg-slate-900/80 text-slate-400 border-slate-800 hover:text-white hover:bg-slate-800'
          }`}
        >
          <div className="p-2.5 rounded-xl bg-white/10 shrink-0">
            <Droplet className="w-5 h-5" />
          </div>
          <div>
            <span className="text-xs font-bold block">Pure Hydration</span>
            <span className="text-[10px] opacity-80">{currentHydrationTotal} / {targetHydrationMl} ml</span>
          </div>
        </button>

        <button
          onClick={() => setActiveTab('cleansing')}
          className={`p-4 rounded-2xl border text-left transition flex items-center gap-3 ${
            activeTab === 'cleansing'
              ? 'bg-gradient-to-r from-rose-600 to-amber-600 text-white border-rose-400 shadow-xl'
              : 'bg-slate-900/80 text-slate-400 border-slate-800 hover:text-white hover:bg-slate-800'
          }`}
        >
          <div className="p-2.5 rounded-xl bg-white/10 shrink-0">
            <Sparkles className="w-5 h-5" />
          </div>
          <div>
            <span className="text-xs font-bold block">Body & Soul Hygiene</span>
            <span className="text-[10px] opacity-80">Shower & Scripture</span>
          </div>
        </button>
      </div>

      {/* TAB 1: GYM WORKOUTS */}
      {activeTab === 'gym' && (
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          <div className="lg:col-span-2 space-y-4">
            <div className="flex items-center justify-between">
              <h3 className="text-lg font-bold text-white flex items-center gap-2">
                <Dumbbell className="w-5 h-5 text-rose-400" />
                Daily Physical Temple Gym Schedule
              </h3>
              <span className="text-xs text-slate-400">
                Completed {workouts.filter((w) => w.completed).length} / {workouts.length}
              </span>
            </div>

            <div className="space-y-3">
              {workouts.map((item) => (
                <div
                  key={item.id}
                  onClick={() => toggleWorkout(item.id)}
                  className={`p-4 rounded-2xl border transition cursor-pointer flex items-center justify-between gap-4 ${
                    item.completed
                      ? 'bg-emerald-950/20 border-emerald-500/40 text-emerald-200'
                      : 'bg-slate-900 border-slate-800 hover:border-slate-700 text-slate-100'
                  }`}
                >
                  <div className="flex items-center gap-3">
                    <div
                      className={`w-6 h-6 rounded-full border flex items-center justify-center shrink-0 ${
                        item.completed
                          ? 'bg-emerald-500 border-emerald-400 text-slate-950'
                          : 'border-slate-600'
                      }`}
                    >
                      {item.completed && <CheckCircle2 className="w-4 h-4 stroke-[3]" />}
                    </div>
                    <div>
                      <h4
                        className={`text-sm font-bold ${
                          item.completed ? 'line-through text-slate-400' : 'text-white'
                        }`}
                      >
                        {item.exerciseName}
                      </h4>
                      <div className="flex items-center gap-3 text-xs text-slate-400 mt-0.5">
                        <span className="px-2 py-0.5 rounded bg-slate-800 text-amber-300 font-semibold text-[10px]">
                          {item.category}
                        </span>
                        <span>
                          {item.sets} Sets × {item.reps} Reps
                        </span>
                        {item.weightKg && <span>({item.weightKg} kg)</span>}
                        <span>• {item.durationMins} Mins</span>
                      </div>
                    </div>
                  </div>

                  <div className="text-right shrink-0">
                    <span className="text-xs font-bold text-rose-400 flex items-center gap-1">
                      <Flame className="w-3.5 h-3.5" />
                      {item.caloriesBurned} kcal
                    </span>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Add Workout Form */}
          <div className="bg-slate-900 border border-slate-800 rounded-3xl p-5 space-y-4">
            <h4 className="text-sm font-bold text-white flex items-center gap-2">
              <Plus className="w-4 h-4 text-rose-400" />
              Log Custom Exercise
            </h4>
            <form onSubmit={handleAddWorkout} className="space-y-3">
              <div>
                <label className="text-[11px] text-slate-400 block mb-1">Exercise Name</label>
                <input
                  type="text"
                  value={newExName}
                  onChange={(e) => setNewExName(e.target.value)}
                  placeholder="e.g. Temple Squats & Dumbbell Press"
                  className="w-full px-3 py-2 bg-slate-950 border border-slate-800 rounded-xl text-xs text-white focus:outline-none focus:border-rose-500"
                />
              </div>

              <div className="grid grid-cols-2 gap-2">
                <div>
                  <label className="text-[11px] text-slate-400 block mb-1">Category</label>
                  <select
                    value={newExCategory}
                    onChange={(e: any) => setNewExCategory(e.target.value)}
                    className="w-full px-3 py-2 bg-slate-950 border border-slate-800 rounded-xl text-xs text-amber-300 focus:outline-none focus:border-rose-500"
                  >
                    <option value="Strength">Strength</option>
                    <option value="Cardio">Cardio</option>
                    <option value="Flexibility">Flexibility</option>
                    <option value="Endurance">Endurance</option>
                  </select>
                </div>
                <div>
                  <label className="text-[11px] text-slate-400 block mb-1">Duration (Mins)</label>
                  <input
                    type="number"
                    value={newExDuration}
                    onChange={(e) => setNewExDuration(e.target.value)}
                    className="w-full px-3 py-2 bg-slate-950 border border-slate-800 rounded-xl text-xs text-white focus:outline-none focus:border-rose-500"
                  />
                </div>
              </div>

              <div className="grid grid-cols-2 gap-2">
                <div>
                  <label className="text-[11px] text-slate-400 block mb-1">Sets</label>
                  <input
                    type="number"
                    value={newExSets}
                    onChange={(e) => setNewExSets(e.target.value)}
                    className="w-full px-3 py-2 bg-slate-950 border border-slate-800 rounded-xl text-xs text-white focus:outline-none focus:border-rose-500"
                  />
                </div>
                <div>
                  <label className="text-[11px] text-slate-400 block mb-1">Reps</label>
                  <input
                    type="number"
                    value={newExReps}
                    onChange={(e) => setNewExReps(e.target.value)}
                    className="w-full px-3 py-2 bg-slate-950 border border-slate-800 rounded-xl text-xs text-white focus:outline-none focus:border-rose-500"
                  />
                </div>
              </div>

              <button
                type="submit"
                className="w-full py-2.5 bg-rose-600 hover:bg-rose-500 text-white font-bold text-xs rounded-xl shadow transition"
              >
                Add Workout Log (+Gems)
              </button>
            </form>
          </div>
        </div>
      )}

      {/* TAB 2: BIBLICAL CLEAN DIET */}
      {activeTab === 'diet' && (
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          <div className="lg:col-span-2 space-y-4">
            <div className="p-4 bg-amber-950/20 border border-amber-500/30 rounded-2xl text-xs text-amber-200 space-y-1">
              <span className="font-bold flex items-center gap-1.5 text-amber-300">
                <ShieldCheck className="w-4 h-4 text-amber-400" />
                Biblical Torah Clean Nutrition Standard (Yahusha & YHWH)
              </span>
              <p className="text-[11px] text-slate-300">
                Emphasizing clean meats (salmon, lamb, beef), wild honey, figs, olive oil, unleavened whole grains, and bitter herbs while avoiding unclean ingredients.
              </p>
            </div>

            <div className="space-y-3">
              {mealPlans.map((meal) => (
                <div
                  key={meal.id}
                  onClick={() => toggleMeal(meal.id)}
                  className={`p-4 rounded-2xl border transition cursor-pointer flex items-center justify-between gap-4 ${
                    meal.completed
                      ? 'bg-emerald-950/20 border-emerald-500/40 text-emerald-200'
                      : 'bg-slate-900 border-slate-800 hover:border-slate-700 text-slate-100'
                  }`}
                >
                  <div className="flex items-center gap-3">
                    <div
                      className={`w-6 h-6 rounded-full border flex items-center justify-center shrink-0 ${
                        meal.completed
                          ? 'bg-emerald-500 border-emerald-400 text-slate-950'
                          : 'border-slate-600'
                      }`}
                    >
                      {meal.completed && <CheckCircle2 className="w-4 h-4 stroke-[3]" />}
                    </div>
                    <div>
                      <h4
                        className={`text-sm font-bold ${
                          meal.completed ? 'line-through text-slate-400' : 'text-white'
                        }`}
                      >
                        {meal.foodName}
                      </h4>
                      <div className="flex items-center gap-3 text-xs text-slate-400 mt-0.5">
                        <span className="px-2 py-0.5 rounded bg-slate-800 text-amber-300 font-semibold text-[10px]">
                          {meal.mealType}
                        </span>
                        <span className="text-emerald-400 font-medium text-[10px]">
                          ✓ Biblically Clean
                        </span>
                      </div>
                    </div>
                  </div>

                  <div className="text-right shrink-0">
                    <span className="text-xs font-bold text-amber-300 block">
                      {meal.calories} kcal
                    </span>
                    <span className="text-[10px] text-slate-400">
                      {meal.proteinG}g Protein
                    </span>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Add Meal Form */}
          <div className="bg-slate-900 border border-slate-800 rounded-3xl p-5 space-y-4">
            <h4 className="text-sm font-bold text-white flex items-center gap-2">
              <Plus className="w-4 h-4 text-amber-400" />
              Add Clean Biblical Meal
            </h4>
            <form onSubmit={handleAddMeal} className="space-y-3">
              <div>
                <label className="text-[11px] text-slate-400 block mb-1">Meal Title</label>
                <input
                  type="text"
                  value={newMealName}
                  onChange={(e) => setNewMealName(e.target.value)}
                  placeholder="e.g. Wild Honey & Roasted Almond Tonic"
                  className="w-full px-3 py-2 bg-slate-950 border border-slate-800 rounded-xl text-xs text-white focus:outline-none focus:border-rose-500"
                />
              </div>

              <div>
                <label className="text-[11px] text-slate-400 block mb-1">Meal Schedule</label>
                <select
                  value={newMealType}
                  onChange={(e: any) => setNewMealType(e.target.value)}
                  className="w-full px-3 py-2 bg-slate-950 border border-slate-800 rounded-xl text-xs text-amber-300 focus:outline-none focus:border-rose-500"
                >
                  <option value="Breakfast">Breakfast</option>
                  <option value="Lunch">Lunch</option>
                  <option value="Dinner">Dinner</option>
                  <option value="Biblical Clean Snack">Biblical Clean Snack</option>
                </select>
              </div>

              <div className="grid grid-cols-2 gap-2">
                <div>
                  <label className="text-[11px] text-slate-400 block mb-1">Calories</label>
                  <input
                    type="number"
                    value={newMealCals}
                    onChange={(e) => setNewMealCals(e.target.value)}
                    className="w-full px-3 py-2 bg-slate-950 border border-slate-800 rounded-xl text-xs text-white focus:outline-none focus:border-rose-500"
                  />
                </div>
                <div>
                  <label className="text-[11px] text-slate-400 block mb-1">Protein (g)</label>
                  <input
                    type="number"
                    value={newMealProtein}
                    onChange={(e) => setNewMealProtein(e.target.value)}
                    className="w-full px-3 py-2 bg-slate-950 border border-slate-800 rounded-xl text-xs text-white focus:outline-none focus:border-rose-500"
                  />
                </div>
              </div>

              <button
                type="submit"
                className="w-full py-2.5 bg-amber-600 hover:bg-amber-500 text-white font-bold text-xs rounded-xl shadow transition"
              >
                Log Clean Meal (+Gems)
              </button>
            </form>
          </div>
        </div>
      )}

      {/* TAB 3: PURE HYDRATION */}
      {activeTab === 'hydration' && (
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="bg-slate-900 border border-slate-800 rounded-3xl p-6 text-center space-y-4 flex flex-col justify-center items-center">
            <div className="w-24 h-24 rounded-full bg-cyan-500/10 border-4 border-cyan-500/40 flex items-center justify-center text-cyan-400 shadow-xl relative">
              <Droplet className="w-10 h-10 animate-bounce" />
            </div>

            <div>
              <span className="text-3xl font-black text-white">
                {currentHydrationTotal} <span className="text-xs font-normal text-slate-400">/ {targetHydrationMl} ml</span>
              </span>
              <p className="text-xs text-slate-400 mt-1">Daily Pure Water Target</p>
            </div>

            <div className="w-full bg-slate-950 rounded-full h-3 border border-slate-800 overflow-hidden">
              <div
                className="bg-gradient-to-r from-cyan-500 to-blue-500 h-full transition-all duration-500"
                style={{ width: `${Math.min(100, (currentHydrationTotal / targetHydrationMl) * 100)}%` }}
              ></div>
            </div>
          </div>

          <div className="md:col-span-2 bg-slate-900 border border-slate-800 rounded-3xl p-6 space-y-5">
            <h3 className="text-base font-bold text-white flex items-center gap-2">
              <Droplet className="w-5 h-5 text-cyan-400" />
              Quick Add Hydration Drink
            </h3>

            <div className="grid grid-cols-3 gap-3">
              <button
                onClick={() => addHydration(250, 'Pure Spring Water')}
                className="p-4 bg-slate-950 hover:bg-slate-800 border border-slate-800 rounded-2xl text-center transition group"
              >
                <span className="text-lg font-black text-cyan-400 block group-hover:scale-110 transition-transform">+250 ml</span>
                <span className="text-[11px] text-slate-400 block mt-1">Cup of Water</span>
              </button>

              <button
                onClick={() => addHydration(500, 'Pure Spring Water')}
                className="p-4 bg-slate-950 hover:bg-slate-800 border border-slate-800 rounded-2xl text-center transition group"
              >
                <span className="text-lg font-black text-cyan-400 block group-hover:scale-110 transition-transform">+500 ml</span>
                <span className="text-[11px] text-slate-400 block mt-1">Spring Water Flask</span>
              </button>

              <button
                onClick={() => addHydration(350, 'Herbal Tea')}
                className="p-4 bg-slate-950 hover:bg-slate-800 border border-slate-800 rounded-2xl text-center transition group"
              >
                <span className="text-lg font-black text-amber-400 block group-hover:scale-110 transition-transform">+350 ml</span>
                <span className="text-[11px] text-slate-400 block mt-1">Anointed Herbal Tea</span>
              </button>
            </div>

            <div className="space-y-2 pt-2">
              <h4 className="text-xs font-bold text-slate-300">Today's Hydration Log</h4>
              <div className="space-y-2 max-h-48 overflow-y-auto pr-1">
                {hydrationLogs.map((log) => (
                  <div
                    key={log.id}
                    className="p-3 bg-slate-950 border border-slate-800/80 rounded-xl flex items-center justify-between text-xs"
                  >
                    <span className="font-bold text-white">{log.type}</span>
                    <span className="text-cyan-400 font-mono font-bold">+{log.amountMl} ml</span>
                    <span className="text-slate-500">{log.time}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      )}

      {/* TAB 4: SHOWER BATH & BODY, MIND, SOUL CLEANSING */}
      {activeTab === 'cleansing' && (
        <div className="space-y-4">
          <div className="p-4 bg-gradient-to-r from-slate-900 to-rose-950/30 border border-rose-500/30 rounded-2xl text-xs text-slate-200 flex items-center justify-between">
            <div className="flex items-center gap-3">
              <Sparkles className="w-6 h-6 text-amber-400 shrink-0" />
              <div>
                <span className="font-bold text-white block">
                  Body, Mind & Holy Spirit Daily Cleansing Routine
                </span>
                <span className="text-slate-400">
                  According to Yahusha, Lord Jesus Christ, YHWH & Holy Spirit
                </span>
              </div>
            </div>
            <span className="text-xs font-bold text-amber-300 bg-slate-950 px-3 py-1 rounded-full border border-amber-500/30">
              {cleansingTasks.filter((t) => t.completed).length} / {cleansingTasks.length} Done
            </span>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {cleansingTasks.map((task) => (
              <div
                key={task.id}
                onClick={() => toggleCleansingTask(task.id)}
                className={`p-5 rounded-3xl border transition cursor-pointer space-y-3 ${
                  task.completed
                    ? 'bg-emerald-950/20 border-emerald-500/40 text-emerald-200'
                    : 'bg-slate-900 border-slate-800 hover:border-slate-700 text-slate-100'
                }`}
              >
                <div className="flex items-center justify-between">
                  <span className="text-[10px] font-bold uppercase tracking-wider px-2.5 py-1 rounded-full bg-slate-950 text-amber-300 border border-slate-800">
                    {task.category}
                  </span>
                  <span className="text-xs text-slate-400 font-mono">{task.scheduleTime}</span>
                </div>

                <div className="flex items-start gap-3">
                  <div
                    className={`w-6 h-6 rounded-full border flex items-center justify-center shrink-0 mt-0.5 ${
                      task.completed
                        ? 'bg-emerald-500 border-emerald-400 text-slate-950'
                        : 'border-slate-600'
                    }`}
                  >
                    {task.completed && <CheckCircle2 className="w-4 h-4 stroke-[3]" />}
                  </div>

                  <div className="space-y-1">
                    <h4
                      className={`text-sm font-bold ${
                        task.completed ? 'line-through text-slate-400' : 'text-white'
                      }`}
                    >
                      {task.title}
                    </h4>
                    <p className="text-xs text-slate-400 leading-relaxed">{task.description}</p>
                    {task.scriptureReference && (
                      <p className="text-[11px] text-amber-300/90 font-serif italic pt-1">
                        "{task.scriptureReference}"
                      </p>
                    )}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};
