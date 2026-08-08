export interface VitalsEntry {
  id: string;
  timestamp: string;
  bpm: number;
  sysBP: number;
  diaBP: number;
  spo2: number;
  temp: number; // in °C or °F
  weight: number; // in kg
  height: number; // in cm
  notes?: string;
}

export interface DreamEntry {
  id: string;
  date: string;
  title: string;
  content: string;
  interpretation?: string;
  scriptureRef?: string;
}

export interface ScriptureQuote {
  id: string;
  verse: string;
  reference: string;
  reflection: string;
  category: 'Healing' | 'Strength' | 'Peace' | 'Faith' | 'Renewal';
}

export interface GachaItem {
  id: string;
  name: string;
  type: 'character' | 'outfit' | 'accessory';
  rarity: 'SSR' | 'SR' | 'R';
  rarityScore: number;
  image: string;
  description: string;
  characterName: string;
}

export interface PlayerInventoryItem {
  item: GachaItem;
  quantity: number;
  acquiredAt: string;
}

export interface LeaderboardPlayer {
  id: string;
  name: string;
  rank: number;
  powerScore: number;
  unlockedCount: number;
  avatar: string;
  badge: string;
}

export interface Banner {
  id: string;
  title: string;
  subtitle: string;
  featuredName: string;
  featuredRarity: string;
  image: string;
  costSingle: number;
  costMulti: number;
  isLimited: boolean;
}

export interface UserProfile {
  userId: string; // 7-digit numeric ID generated from start time
  username: string;
  email: string | null;
  isBound: boolean;
  createdAt: string;
  lastSaved: string;
  level: number;
  xp: number;
}

export interface GymWorkout {
  id: string;
  date: string;
  exerciseName: string;
  category: 'Strength' | 'Cardio' | 'Flexibility' | 'Endurance';
  sets: number;
  reps: number;
  weightKg?: number;
  durationMins: number;
  caloriesBurned: number;
  completed: boolean;
}

export interface MealPlanItem {
  id: string;
  mealType: 'Breakfast' | 'Lunch' | 'Dinner' | 'Biblical Clean Snack';
  foodName: string;
  category: 'Clean Meat / Fish' | 'Whole Grains & Herbs' | 'Fruit & Honey' | 'Olive Oil & Nuts';
  calories: number;
  proteinG: number;
  carbsG: number;
  fatsG: number;
  isBiblicallyClean: boolean;
  completed: boolean;
}

export interface HydrationLog {
  id: string;
  time: string;
  amountMl: number;
  type: 'Pure Spring Water' | 'Herbal Tea' | 'Electro-Mineral Brew';
}

export interface CleansingTask {
  id: string;
  category: 'Body (Physical Bath)' | 'Mind (Scripture Meditation)' | 'Soul (Holy Spirit Prayer)';
  title: string;
  scheduleTime: string;
  description: string;
  scriptureReference?: string;
  completed: boolean;
}

