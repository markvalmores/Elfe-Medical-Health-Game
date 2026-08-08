import { UserProfile, GymWorkout, MealPlanItem, HydrationLog, CleansingTask } from '../types';

const STORAGE_KEY_PROFILE = 'elfe_user_profile';
const STORAGE_KEY_ACCOUNTS = 'elfe_registered_accounts';
const STORAGE_KEY_PROGRESS = 'elfe_game_progress';

export function generate7DigitUserId(): string {
  const timestamp = Date.now();
  // Generate 7-digit string deterministically from timestamp + random offset
  const base = (timestamp % 8999999) + 1000000;
  return base.toString();
}

export function createNewAutoProfile(): UserProfile {
  const id = generate7DigitUserId();
  const newProfile: UserProfile = {
    userId: id,
    username: `Servant_Elfe_${id}`,
    email: null,
    isBound: false,
    createdAt: new Date().toISOString(),
    lastSaved: new Date().toISOString(),
    level: 1,
    xp: 0,
  };
  saveUserProfile(newProfile);
  return newProfile;
}

export function getUserProfile(): UserProfile {
  const data = localStorage.getItem(STORAGE_KEY_PROFILE);
  if (data) {
    try {
      return JSON.parse(data);
    } catch (e) {
      console.error('Failed to parse stored profile:', e);
    }
  }
  return createNewAutoProfile();
}

export function saveUserProfile(profile: UserProfile): void {
  profile.lastSaved = new Date().toISOString();
  localStorage.setItem(STORAGE_KEY_PROFILE, JSON.stringify(profile));
}

// Account binding (email + password)
export interface AccountCredential {
  userId: string;
  username: string;
  email: string;
  passwordHash: string; // stored locally
  savedAt: string;
}

export function bindAccountEmail(email: string, password: string, currentProfile: UserProfile): UserProfile {
  const updatedProfile: UserProfile = {
    ...currentProfile,
    email,
    isBound: true,
    lastSaved: new Date().toISOString(),
  };

  saveUserProfile(updatedProfile);

  // Store account record
  const accountsData = localStorage.getItem(STORAGE_KEY_ACCOUNTS);
  let accounts: AccountCredential[] = [];
  if (accountsData) {
    try {
      accounts = JSON.parse(accountsData);
    } catch (e) {
      accounts = [];
    }
  }

  // Remove existing entry for email if any
  accounts = accounts.filter((a) => a.email.toLowerCase() !== email.toLowerCase());
  accounts.push({
    userId: updatedProfile.userId,
    username: updatedProfile.username,
    email: email.toLowerCase(),
    passwordHash: btoa(password), // simple local encoding
    savedAt: new Date().toISOString(),
  });

  localStorage.setItem(STORAGE_KEY_ACCOUNTS, JSON.stringify(accounts));
  return updatedProfile;
}

export function loginWithEmail(email: string, password: string): UserProfile | null {
  const accountsData = localStorage.getItem(STORAGE_KEY_ACCOUNTS);
  if (!accountsData) return null;

  try {
    const accounts: AccountCredential[] = JSON.parse(accountsData);
    const found = accounts.find(
      (a) => a.email.toLowerCase() === email.toLowerCase() && a.passwordHash === btoa(password)
    );

    if (found) {
      // retrieve or construct profile
      const stored = getUserProfile();
      if (stored.email === found.email) return stored;

      const profile: UserProfile = {
        userId: found.userId,
        username: found.username,
        email: found.email,
        isBound: true,
        createdAt: found.savedAt,
        lastSaved: new Date().toISOString(),
        level: 1,
        xp: 150,
      };
      saveUserProfile(profile);
      return profile;
    }
  } catch (e) {
    console.error('Login error:', e);
  }
  return null;
}

// Initial Faith & Health Data Defaults according to Yahusha & YHWH
export const DEFAULT_GYM_WORKOUTS: GymWorkout[] = [
  {
    id: 'gym-1',
    date: new Date().toISOString().split('T')[0],
    exerciseName: 'Strength of Yahusha Squats & Deadlifts',
    category: 'Strength',
    sets: 4,
    reps: 12,
    weightKg: 60,
    durationMins: 25,
    caloriesBurned: 220,
    completed: true,
  },
  {
    id: 'gym-2',
    date: new Date().toISOString().split('T')[0],
    exerciseName: 'Holy Temple Push-ups & Dips',
    category: 'Endurance',
    sets: 3,
    reps: 15,
    durationMins: 15,
    caloriesBurned: 130,
    completed: false,
  },
  {
    id: 'gym-3',
    date: new Date().toISOString().split('T')[0],
    exerciseName: 'Endurance Cardio Prayer Walk',
    category: 'Cardio',
    sets: 1,
    reps: 1,
    durationMins: 30,
    caloriesBurned: 200,
    completed: false,
  },
];

export const DEFAULT_MEAL_PLANS: MealPlanItem[] = [
  {
    id: 'meal-1',
    mealType: 'Breakfast',
    foodName: 'Anointed Wild Honey, Fig & Almond Oatmeal',
    category: 'Fruit & Honey',
    calories: 380,
    proteinG: 14,
    carbsG: 62,
    fatsG: 10,
    isBiblicallyClean: true,
    completed: true,
  },
  {
    id: 'meal-2',
    mealType: 'Lunch',
    foodName: 'Clean Wild Salmon with Olive Oil, Garlic & Herbs',
    category: 'Clean Meat / Fish',
    calories: 520,
    proteinG: 42,
    carbsG: 18,
    fatsG: 28,
    isBiblicallyClean: true,
    completed: false,
  },
  {
    id: 'meal-3',
    mealType: 'Dinner',
    foodName: 'Lentil & Barley Stew with Bitter Herbs & Pomegranate',
    category: 'Whole Grains & Herbs',
    calories: 450,
    proteinG: 22,
    carbsG: 70,
    fatsG: 8,
    isBiblicallyClean: true,
    completed: false,
  },
  {
    id: 'meal-4',
    mealType: 'Biblical Clean Snack',
    foodName: 'Walnuts, Dates & Cold-Pressed Olive Oil Tonic',
    category: 'Olive Oil & Nuts',
    calories: 210,
    proteinG: 6,
    carbsG: 24,
    fatsG: 12,
    isBiblicallyClean: true,
    completed: false,
  },
];

export const DEFAULT_HYDRATION_LOGS: HydrationLog[] = [
  {
    id: 'hyd-1',
    time: '07:00 AM',
    amountMl: 500,
    type: 'Pure Spring Water',
  },
  {
    id: 'hyd-2',
    time: '11:30 AM',
    amountMl: 350,
    type: 'Herbal Tea',
  },
];

export const DEFAULT_CLEANSING_SCHEDULE: CleansingTask[] = [
  {
    id: 'clean-1',
    category: 'Body (Physical Bath)',
    title: 'Morning Purifying Shower & Tooth Brushing',
    scheduleTime: '06:30 AM',
    description: 'Cleanse the physical temple with fresh water and natural oil soaps.',
    scriptureReference: 'Ezekiel 36:25 - "I will sprinkle clean water on you, and you will be clean."',
    completed: true,
  },
  {
    id: 'clean-2',
    category: 'Mind (Scripture Meditation)',
    title: 'Mind Renewal in Yahusha - Romans 12:2 Meditation',
    scheduleTime: '08:00 AM',
    description: 'Meditate on Yahusha\'s teachings, casting out toxic thoughts and anxiety.',
    scriptureReference: 'Philippians 4:8 - "Whatever is pure, whatever is lovely, meditate on these things."',
    completed: false,
  },
  {
    id: 'clean-3',
    category: 'Soul (Holy Spirit Prayer)',
    title: 'Mid-Day Holy Spirit Prayer & Anointing Peace',
    scheduleTime: '12:30 PM',
    description: 'Seek the presence of YHWH & Yahusha, offering thanksgiving and praise.',
    scriptureReference: 'Psalm 51:10 - "Create in me a pure heart, O God, and renew a steadfast spirit within me."',
    completed: false,
  },
  {
    id: 'clean-4',
    category: 'Body (Physical Bath)',
    title: 'Evening Relaxing Foot Wash & Hygiene Care',
    scheduleTime: '09:00 PM',
    description: 'Rinse off daily dust, brush teeth, apply olive oil lotion to dry skin.',
    scriptureReference: 'John 13:10 - "Those who have had a bath need only to wash their feet."',
    completed: false,
  },
];
