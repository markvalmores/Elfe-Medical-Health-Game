import React, { useState } from 'react';
import { Header } from './components/Header';
import { TitleScreen } from './components/TitleScreen';
import { VitalsSection } from './components/VitalsSection';
import { NurseElfeCompanion } from './components/NurseElfeCompanion';
import { GachaSection } from './components/GachaSection';
import { InventorySection } from './components/InventorySection';
import { AnimeApiManager } from './components/AnimeApiManager';
import { DreamAndScriptureSection } from './components/DreamAndScriptureSection';
import { LeaderboardSection } from './components/LeaderboardSection';
import { SeasonalCalendarSection } from './components/SeasonalCalendarSection';
import { HolisticHealthSection } from './components/HolisticHealthSection';
import { SettingsModal } from './components/SettingsModal';

import { VitalsEntry, DreamEntry, GachaItem, PlayerInventoryItem, Banner, UserProfile } from './types';
import { GACHA_CATALOG, INITIAL_LEADERBOARD } from './mockData';
import { getUserProfile, saveUserProfile, createNewAutoProfile } from './utils/storage';

export default function App() {
  const [showTitleScreen, setShowTitleScreen] = useState<boolean>(true);
  const [activeTab, setActiveTab] = useState<string>('vitals');

  // User Profile & Settings
  const [userProfile, setUserProfile] = useState<UserProfile>(() => getUserProfile());
  const [isSettingsOpen, setIsSettingsOpen] = useState<boolean>(false);

  // Player Stats & Currency
  const [gems, setGems] = useState<number>(3200);
  const [medicPoints, setMedicPoints] = useState<number>(1200);
  const [pityCount, setPityCount] = useState<number>(15);
  const [streakDays, setStreakDays] = useState<number>(5);
  const [dailyClaimed, setDailyClaimed] = useState<boolean>(false);
  const [userLocation, setUserLocation] = useState<string>('United States');

  // Start game handler: auto-generates 7-digit profile if needed
  const handleStartGame = () => {
    let current = userProfile;
    if (!current || !current.userId) {
      current = createNewAutoProfile();
      setUserProfile(current);
    }
    setShowTitleScreen(false);
  };

  // Vitals & Dreams History
  const [vitalsHistory, setVitalsHistory] = useState<VitalsEntry[]>([
    {
      id: '1',
      timestamp: '08:00 AM',
      bpm: 72,
      sysBP: 118,
      diaBP: 78,
      spo2: 98,
      temp: 36.6,
      weight: 68.5,
      height: 175,
      notes: 'Morning Check-in',
    },
    {
      id: '2',
      timestamp: '12:30 PM',
      bpm: 76,
      sysBP: 122,
      diaBP: 80,
      spo2: 99,
      temp: 36.7,
      weight: 68.5,
      height: 175,
      notes: 'Midday Scan',
    },
    {
      id: '3',
      timestamp: '06:00 PM',
      bpm: 70,
      sysBP: 116,
      diaBP: 76,
      spo2: 98,
      temp: 36.5,
      weight: 68.4,
      height: 175,
      notes: 'Evening Rest',
    },
  ]);

  const [dreams, setDreams] = useState<DreamEntry[]>([
    {
      id: 'd1',
      date: '2026-08-07',
      title: 'Serene River Reflection',
      content: 'Walking alongside a clear stream surrounded by green trees and calm winds.',
      interpretation: 'Symbolizes peace, emotional clarity, and steady health restoration.',
      scriptureRef: 'Psalm 23:2',
    },
  ]);

  // Inventory & Equipment
  const [inventory, setInventory] = useState<PlayerInventoryItem[]>([
    { item: GACHA_CATALOG[0], quantity: 1, acquiredAt: '2026-08-01' },
    { item: GACHA_CATALOG[2], quantity: 1, acquiredAt: '2026-08-03' },
    { item: GACHA_CATALOG[3], quantity: 1, acquiredAt: '2026-08-05' },
    { item: GACHA_CATALOG[6], quantity: 2, acquiredAt: '2026-08-06' },
  ]);

  const [equippedOutfit, setEquippedOutfit] = useState<GachaItem | null>(GACHA_CATALOG[0]);
  const [equippedAccessory, setEquippedAccessory] = useState<GachaItem | null>(GACHA_CATALOG[3]);
  const [lastPullResults, setLastPullResults] = useState<GachaItem[]>([]);

  // Calculate User Wardrobe Power Score
  const userPowerScore = inventory.reduce(
    (acc, curr) => acc + curr.item.rarityScore * curr.quantity,
    0
  );

  // Reward gained from fitness & faith tasks
  const handleGainRewards = (addedGems: number, addedXp: number) => {
    setGems((prev) => prev + addedGems);
    const updatedProfile = {
      ...userProfile,
      xp: userProfile.xp + addedXp,
    };
    setUserProfile(updatedProfile);
    saveUserProfile(updatedProfile);
  };

  // Daily Bonus Claim
  const handleClaimDaily = () => {
    if (dailyClaimed) return;
    setGems((prev) => prev + 500);
    setDailyClaimed(true);
    setStreakDays((prev) => prev + 1);
  };

  // Add Vitals Record
  const handleAddVitals = (entry: VitalsEntry) => {
    setVitalsHistory((prev) => [entry, ...prev]);
  };

  // Add Dream Record
  const handleAddDream = (entry: DreamEntry) => {
    setDreams((prev) => [entry, ...prev]);
  };

  // Gacha Summon Logic
  const executePull = (banner: Banner, count: number) => {
    const cost = count === 1 ? banner.costSingle : banner.costMulti;
    if (gems < cost) return;

    setGems((prev) => prev - cost);

    const results: GachaItem[] = [];
    let currentPity = pityCount;

    for (let i = 0; i < count; i++) {
      currentPity += 1;
      let pulledItem: GachaItem;

      if (currentPity >= 80) {
        // Guaranteed SSR Pity Drop
        pulledItem = GACHA_CATALOG.find((x) => x.rarity === 'SSR') || GACHA_CATALOG[0];
        currentPity = 0;
      } else {
        const rand = Math.random();
        if (rand < 0.05) {
          pulledItem = GACHA_CATALOG.filter((x) => x.rarity === 'SSR')[
            Math.floor(Math.random() * 2)
          ];
          currentPity = 0;
        } else if (rand < 0.3) {
          pulledItem = GACHA_CATALOG.filter((x) => x.rarity === 'SR')[
            Math.floor(Math.random() * 2)
          ];
        } else {
          pulledItem = GACHA_CATALOG.filter((x) => x.rarity === 'R')[
            Math.floor(Math.random() * 2)
          ];
        }
      }

      results.push(pulledItem);

      // Add to inventory
      setInventory((prev) => {
        const existingIndex = prev.findIndex((inv) => inv.item.id === pulledItem.id);
        if (existingIndex >= 0) {
          const updated = [...prev];
          updated[existingIndex].quantity += 1;
          return updated;
        } else {
          return [...prev, { item: pulledItem, quantity: 1, acquiredAt: new Date().toISOString() }];
        }
      });
    }

    setPityCount(currentPity);
    setLastPullResults(results);
  };

  // Recycling & Duplicate Sell
  const handleRecycleItem = (itemId: string) => {
    setInventory((prev) =>
      prev
        .map((inv) => {
          if (inv.item.id === itemId) {
            return { ...inv, quantity: inv.quantity - 1 };
          }
          return inv;
        })
        .filter((inv) => inv.quantity > 0)
    );
    setMedicPoints((prev) => prev + 200);
  };

  const handleSellDuplicate = (itemId: string) => {
    setInventory((prev) =>
      prev
        .map((inv) => {
          if (inv.item.id === itemId) {
            return { ...inv, quantity: inv.quantity - 1 };
          }
          return inv;
        })
        .filter((inv) => inv.quantity > 0)
    );
    setGems((prev) => prev + 100);
  };

  if (showTitleScreen) {
    return <TitleScreen onStartGame={handleStartGame} />;
  }

  return (
    <div className="min-h-screen bg-slate-950 text-slate-100 font-sans antialiased selection:bg-rose-500 selection:text-white">
      <Header
        gems={gems}
        medicPoints={medicPoints}
        pityCount={pityCount}
        streakDays={streakDays}
        activeTab={activeTab}
        setActiveTab={setActiveTab}
        onClaimDaily={handleClaimDaily}
        dailyClaimed={dailyClaimed}
        userPowerScore={userPowerScore}
        userLocation={userLocation}
        userProfile={userProfile}
        onOpenSettings={() => setIsSettingsOpen(true)}
        onOpenTitleScreen={() => setShowTitleScreen(true)}
      />

      <main className="max-w-7xl mx-auto px-4 py-6 space-y-6">
        {activeTab === 'vitals' && (
          <VitalsSection vitalsHistory={vitalsHistory} onAddVitals={handleAddVitals} />
        )}

        {activeTab === 'holisticHealth' && (
          <HolisticHealthSection onGainRewards={handleGainRewards} />
        )}

        {activeTab === 'companion' && (
          <NurseElfeCompanion
            equippedOutfit={equippedOutfit}
            equippedAccessory={equippedAccessory}
            onOutfitChange={() => setActiveTab('inventory')}
          />
        )}

        {activeTab === 'gacha' && (
          <GachaSection
            gems={gems}
            medicPoints={medicPoints}
            pityCount={pityCount}
            onPullSingle={(banner) => executePull(banner, 1)}
            onPullTen={(banner) => executePull(banner, 10)}
            lastPullResults={lastPullResults}
            clearPullResults={() => setLastPullResults([])}
          />
        )}

        {activeTab === 'inventory' && (
          <InventorySection
            inventory={inventory}
            equippedOutfit={equippedOutfit}
            equippedAccessory={equippedAccessory}
            onEquipOutfit={(item) => setEquippedOutfit(item)}
            onEquipAccessory={(item) => setEquippedAccessory(item)}
            onRecycleItem={handleRecycleItem}
            onSellDuplicate={handleSellDuplicate}
          />
        )}

        {activeTab === 'animeApi' && (
          <AnimeApiManager
            onAddGachaItemToInventory={(item) => {
              setInventory((prev) => [...prev, { item, quantity: 1, acquiredAt: new Date().toISOString() }]);
            }}
            onUpdateNurseAvatar={(url) => {
              const customOutfit: GachaItem = {
                id: `api-avatar-${Date.now()}`,
                name: 'Nurse Elfe (Live API Skin)',
                type: 'outfit',
                rarity: 'SSR',
                rarityScore: 1500,
                image: url,
                description: 'Custom Nurse Elfe skin fetched live from Anime API endpoint.',
                characterName: 'Elfe',
              };
              setEquippedOutfit(customOutfit);
              setActiveTab('companion');
            }}
          />
        )}

        {activeTab === 'dreams' && (
          <DreamAndScriptureSection dreams={dreams} onAddDream={handleAddDream} />
        )}

        {activeTab === 'leaderboard' && (
          <LeaderboardSection
            leaderboard={INITIAL_LEADERBOARD}
            userPowerScore={userPowerScore}
          />
        )}

        {activeTab === 'calendar' && (
          <SeasonalCalendarSection
            userLocation={userLocation}
            setUserLocation={setUserLocation}
            streakDays={streakDays}
            onClaimDaily={handleClaimDaily}
            dailyClaimed={dailyClaimed}
          />
        )}
      </main>

      {/* Account & Profile Settings Modal */}
      <SettingsModal
        isOpen={isSettingsOpen}
        onClose={() => setIsSettingsOpen(false)}
        userProfile={userProfile}
        onUpdateProfile={(updated) => setUserProfile(updated)}
      />

      {/* Footer */}
      <footer className="border-t border-slate-900 bg-slate-950 py-6 text-center text-xs text-slate-500">
        <p className="font-semibold text-slate-400">
          Elfe Medical Health Companion • Personal Health, Gym & Faith Reflection Tracking
        </p>
        <p className="mt-1 text-[11px] text-slate-600">
          In faith according to Yahusha, Jesus Christ, YHWH & Holy Spirit. Always consult a certified medical professional for official clinical advice.
        </p>
      </footer>
    </div>
  );
}

