import React from 'react';
import { Heart, Sparkles, Shield, Gift, Calendar, Award, User, Flame, Globe } from 'lucide-react';

interface HeaderProps {
  gems: number;
  medicPoints: number;
  pityCount: number;
  streakDays: number;
  activeTab: string;
  setActiveTab: (tab: string) => void;
  onClaimDaily: () => void;
  dailyClaimed: boolean;
  userPowerScore: number;
  userLocation: string;
  onOpenTitleScreen?: () => void;
}

export const Header: React.FC<HeaderProps> = ({
  gems,
  medicPoints,
  pityCount,
  streakDays,
  activeTab,
  setActiveTab,
  onClaimDaily,
  dailyClaimed,
  userPowerScore,
  userLocation,
  onOpenTitleScreen,
}) => {
  const tabs = [
    { id: 'vitals', label: 'Vitals & Fitness', icon: Heart },
    { id: 'companion', label: 'Nurse Elfe', icon: User },
    { id: 'gacha', label: 'Gacha Banners', icon: Sparkles },
    { id: 'inventory', label: 'Inventory & Crafting', icon: Shield },
    { id: 'animeApi', label: 'Anime API & AI', icon: Globe },
    { id: 'dreams', label: 'Dream & Scripture Journal', icon: Gift },
    { id: 'leaderboard', label: 'Leaderboards', icon: Award },
    { id: 'calendar', label: 'Seasonal Calendar', icon: Calendar },
  ];

  return (
    <header className="bg-slate-900 border-b border-rose-900/40 text-slate-100 sticky top-0 z-40 shadow-xl backdrop-blur-md bg-opacity-95">
      {/* Top Banner Status Bar */}
      <div className="max-w-7xl mx-auto px-4 py-2 flex flex-wrap items-center justify-between text-xs gap-2 border-b border-slate-800">
        <div className="flex items-center gap-3">
          <span className="inline-flex items-center gap-1 text-rose-400 font-semibold">
            <Heart className="w-3.5 h-3.5 fill-rose-500 text-rose-500 animate-pulse" />
            Elfe Medical Health Companion
          </span>
          <span className="hidden sm:inline-block text-slate-500">|</span>
          <span className="text-slate-400 flex items-center gap-1">
            <span className="w-2 h-2 rounded-full bg-emerald-400 animate-ping inline-block"></span>
            Region: <strong className="text-slate-200">{userLocation}</strong>
          </span>
        </div>

        <div className="flex items-center gap-4">
          <div className="flex items-center gap-1 text-amber-300 font-medium bg-amber-950/40 px-2 py-0.5 rounded border border-amber-500/30">
            <Sparkles className="w-3.5 h-3.5 text-amber-400" />
            <span>{gems.toLocaleString()} Gems</span>
          </div>

          <div className="flex items-center gap-1 text-rose-300 font-medium bg-rose-950/40 px-2 py-0.5 rounded border border-rose-500/30">
            <Shield className="w-3.5 h-3.5 text-rose-400" />
            <span>{medicPoints.toLocaleString()} MP</span>
          </div>

          <div className="flex items-center gap-1 text-purple-300 font-medium bg-purple-950/40 px-2 py-0.5 rounded border border-purple-500/30">
            <span>Pity: {pityCount}/80</span>
          </div>

          <div className="flex items-center gap-1 text-orange-300 font-medium bg-orange-950/40 px-2 py-0.5 rounded border border-orange-500/30">
            <Flame className="w-3.5 h-3.5 text-orange-400" />
            <span>{streakDays} Days</span>
          </div>

          <button
            onClick={onClaimDaily}
            disabled={dailyClaimed}
            className={`px-3 py-1 rounded text-xs font-bold transition flex items-center gap-1 ${
              dailyClaimed
                ? 'bg-slate-800 text-slate-500 cursor-not-allowed border border-slate-700'
                : 'bg-gradient-to-r from-amber-500 to-rose-500 text-white hover:from-amber-400 hover:to-rose-400 shadow-md shadow-rose-950/50 animate-bounce'
            }`}
          >
            <Gift className="w-3.5 h-3.5" />
            {dailyClaimed ? 'Claimed (+500)' : 'Claim Daily (+500 Gems)'}
          </button>
        </div>
      </div>

      {/* Main Navigation Bar */}
      <div className="max-w-7xl mx-auto px-4 py-3 flex items-center justify-between">
        <div 
          className="flex items-center gap-3 cursor-pointer group"
          onClick={onOpenTitleScreen}
          title="Return to Title Screen"
        >
          <div className="w-10 h-10 rounded-full bg-gradient-to-tr from-rose-500 to-amber-400 p-0.5 shadow-lg shadow-rose-500/20 group-hover:scale-105 transition-transform">
            <div className="w-full h-full bg-slate-900 rounded-full flex items-center justify-center">
              <span className="text-xl font-black bg-gradient-to-r from-rose-400 to-amber-300 bg-clip-text text-transparent">
                E
              </span>
            </div>
          </div>
          <div>
            <h1 className="text-lg font-bold tracking-wide text-white flex items-center gap-2">
              Elfe Medical Health Game
              <span className="text-xs font-normal px-2 py-0.5 rounded-full bg-rose-500/20 text-rose-300 border border-rose-500/30">
                Waifu Health
              </span>
            </h1>
            <p className="text-xs text-slate-400">
              Power Rating: <span className="text-amber-400 font-bold">{userPowerScore} PTS</span>
            </p>
          </div>
        </div>

        {/* Desktop Tabs */}
        <nav className="hidden lg:flex items-center gap-1">
          {tabs.map((tab) => {
            const Icon = tab.icon;
            const isActive = activeTab === tab.id;
            return (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                className={`px-3 py-2 rounded-lg text-xs font-semibold flex items-center gap-1.5 transition ${
                  isActive
                    ? 'bg-rose-600 text-white shadow-lg shadow-rose-600/30'
                    : 'text-slate-300 hover:bg-slate-800 hover:text-white'
                }`}
              >
                <Icon className="w-4 h-4" />
                {tab.label}
              </button>
            );
          })}
        </nav>
      </div>

      {/* Mobile Navigation Scroll */}
      <div className="lg:hidden flex overflow-x-auto gap-2 px-4 py-2 bg-slate-950 border-t border-slate-800 scrollbar-none">
        {tabs.map((tab) => {
          const Icon = tab.icon;
          const isActive = activeTab === tab.id;
          return (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id)}
              className={`whitespace-nowrap px-3 py-1.5 rounded-md text-xs font-semibold flex items-center gap-1.5 transition ${
                isActive
                  ? 'bg-rose-600 text-white'
                  : 'bg-slate-900 text-slate-400 hover:text-slate-200'
              }`}
            >
              <Icon className="w-3.5 h-3.5" />
              {tab.label}
            </button>
          );
        })}
      </div>
    </header>
  );
};
