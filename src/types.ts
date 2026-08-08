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
