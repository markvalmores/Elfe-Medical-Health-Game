import React, { useState } from 'react';
import { Sparkles, Gift, AlertCircle, ShieldCheck, CheckCircle2 } from 'lucide-react';
import { Banner, GachaItem } from '../types';
import { BANNERS, GACHA_CATALOG } from '../mockData';

interface GachaSectionProps {
  gems: number;
  medicPoints: number;
  pityCount: number;
  onPullSingle: (banner: Banner) => void;
  onPullTen: (banner: Banner) => void;
  lastPullResults: GachaItem[];
  clearPullResults: () => void;
}

export const GachaSection: React.FC<GachaSectionProps> = ({
  gems,
  medicPoints,
  pityCount,
  onPullSingle,
  onPullTen,
  lastPullResults,
  clearPullResults,
}) => {
  const [selectedBanner, setSelectedBanner] = useState<Banner>(BANNERS[0]);

  return (
    <div className="space-y-6">
      {/* Banner Selection Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {BANNERS.map((banner) => {
          const isSelected = selectedBanner.id === banner.id;
          return (
            <div
              key={banner.id}
              onClick={() => {
                setSelectedBanner(banner);
                clearPullResults();
              }}
              className={`cursor-pointer rounded-2xl border transition-all p-4 relative overflow-hidden flex flex-col justify-between ${
                isSelected
                  ? 'border-amber-400 bg-slate-900 shadow-xl shadow-rose-950/40 ring-1 ring-amber-400/50'
                  : 'border-slate-800 bg-slate-950 hover:border-slate-700'
              }`}
            >
              <div className="h-32 rounded-xl overflow-hidden mb-3 relative">
                <img
                  src={banner.image}
                  alt={banner.title}
                  referrerPolicy="no-referrer"
                  className="w-full h-full object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-slate-950/40 to-transparent"></div>
                <div className="absolute top-2 left-2 flex items-center gap-1.5">
                  <span className="px-2 py-0.5 rounded-full text-[10px] font-bold bg-rose-600 text-white uppercase tracking-wider">
                    {banner.isLimited ? 'Limited Time' : 'Starter Banner'}
                  </span>
                </div>
                <div className="absolute bottom-2 left-2 right-2 flex items-center justify-between">
                  <h4 className="text-sm font-bold text-white">{banner.title}</h4>
                  <span className="text-xs font-semibold text-amber-300 bg-slate-950/80 px-2 py-0.5 rounded border border-amber-500/30">
                    Featured: {banner.featuredRarity}
                  </span>
                </div>
              </div>

              <p className="text-xs text-slate-400 mb-2">{banner.subtitle}</p>

              <div className="flex items-center justify-between text-xs text-slate-300 font-medium">
                <span>Single: 160 Gems</span>
                <span>10x Pull: 1,500 Gems</span>
              </div>
            </div>
          );
        })}
      </div>

      {/* Main Banner Stage */}
      <div className="bg-slate-900 border border-slate-800 rounded-2xl p-6 shadow-xl relative overflow-hidden">
        <div className="flex flex-col md:flex-row items-center justify-between gap-6">
          {/* Banner Spotlight */}
          <div className="flex-1 space-y-3">
            <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-amber-500/10 text-amber-300 border border-amber-500/30 text-xs font-semibold">
              <Sparkles className="w-4 h-4 text-amber-400" />
              <span>Gacha Banner Drop Rate Info</span>
            </div>

            <h2 className="text-xl font-bold text-white">{selectedBanner.title}</h2>
            <p className="text-xs text-slate-300 leading-relaxed">
              Featured Exclusive SSR: <strong className="text-amber-300">{selectedBanner.featuredName}</strong>. 
              Enjoy guaranteed pity drops after 80 pulls!
            </p>

            <div className="grid grid-cols-3 gap-2 py-2 text-center text-xs">
              <div className="bg-slate-950 border border-slate-800 p-2 rounded-lg">
                <span className="block font-bold text-amber-400">SSR (8%)</span>
                <span className="text-[10px] text-slate-400">Characters & Relics</span>
              </div>
              <div className="bg-slate-950 border border-slate-800 p-2 rounded-lg">
                <span className="block font-bold text-purple-400">SR (27%)</span>
                <span className="text-[10px] text-slate-400">Rare Accessories</span>
              </div>
              <div className="bg-slate-950 border border-slate-800 p-2 rounded-lg">
                <span className="block font-bold text-slate-400">R (65%)</span>
                <span className="text-[10px] text-slate-400">Standard Gear</span>
              </div>
            </div>

            {/* API Sources Notice */}
            <div className="text-[11px] text-slate-400 flex items-center gap-2 pt-1">
              <span className="px-2 py-0.5 rounded bg-slate-950 border border-slate-800 text-rose-300 font-medium">
                Live Multi-API: Waifu.im • Waifu.pics • Nekos.best • Jikan MAL • DiceBear
              </span>
            </div>

            {/* Pity Progress Bar */}
            <div className="space-y-1">
              <div className="flex justify-between text-xs text-slate-400 font-medium">
                <span>Legendary SSR Pity Progress</span>
                <span className="text-amber-300 font-bold">{pityCount} / 80 Attempts</span>
              </div>
              <div className="w-full h-2 rounded-full bg-slate-950 border border-slate-800 overflow-hidden">
                <div
                  className="h-full bg-gradient-to-r from-rose-500 to-amber-400 transition-all duration-300"
                  style={{ width: `${(pityCount / 80) * 100}%` }}
                ></div>
              </div>
            </div>
          </div>

          {/* Summon Actions */}
          <div className="w-full md:w-64 bg-slate-950 border border-slate-800 rounded-xl p-4 flex flex-col gap-3 shadow-inner">
            <div className="text-center pb-2 border-b border-slate-800">
              <span className="text-xs text-slate-400 block">Available Funds</span>
              <span className="text-sm font-extrabold text-amber-300">{gems.toLocaleString()} Gems</span>
            </div>

            <button
              onClick={() => onPullSingle(selectedBanner)}
              disabled={gems < selectedBanner.costSingle}
              className={`w-full py-3 rounded-xl font-bold text-xs flex items-center justify-center gap-2 transition ${
                gems >= selectedBanner.costSingle
                  ? 'bg-gradient-to-r from-rose-600 to-rose-500 hover:from-rose-500 hover:to-rose-400 text-white shadow-lg shadow-rose-950/50'
                  : 'bg-slate-800 text-slate-500 cursor-not-allowed border border-slate-700'
              }`}
            >
              <Gift className="w-4 h-4" />
              1x Summon ({selectedBanner.costSingle} Gems)
            </button>

            <button
              onClick={() => onPullTen(selectedBanner)}
              disabled={gems < selectedBanner.costMulti}
              className={`w-full py-3 rounded-xl font-bold text-xs flex items-center justify-center gap-2 transition ${
                gems >= selectedBanner.costMulti
                  ? 'bg-gradient-to-r from-amber-500 to-rose-500 hover:from-amber-400 hover:to-rose-400 text-white shadow-lg shadow-amber-950/50'
                  : 'bg-slate-800 text-slate-500 cursor-not-allowed border border-slate-700'
              }`}
            >
              <Sparkles className="w-4 h-4" />
              10x Summon ({selectedBanner.costMulti} Gems)
            </button>
          </div>
        </div>
      </div>

      {/* Pull Results Modal Overlay */}
      {lastPullResults.length > 0 && (
        <div className="bg-slate-900 border border-amber-500/40 rounded-2xl p-6 shadow-2xl space-y-4">
          <div className="flex items-center justify-between border-b border-slate-800 pb-3">
            <h3 className="text-base font-bold text-white flex items-center gap-2">
              <Sparkles className="w-5 h-5 text-amber-400 animate-spin" />
              Gacha Summon Results!
            </h3>
            <button
              onClick={clearPullResults}
              className="px-3 py-1 bg-slate-800 hover:bg-slate-700 text-slate-300 text-xs rounded-lg font-semibold"
            >
              Close
            </button>
          </div>

          <div className="grid grid-cols-2 sm:grid-cols-5 gap-3">
            {lastPullResults.map((item, idx) => (
              <div
                key={idx}
                className={`bg-slate-950 border rounded-xl p-3 text-center space-y-2 relative overflow-hidden ${
                  item.rarity === 'SSR'
                    ? 'border-amber-400 shadow-lg shadow-amber-500/20'
                    : item.rarity === 'SR'
                    ? 'border-purple-400'
                    : 'border-slate-800'
                }`}
              >
                <div className="h-20 rounded-lg overflow-hidden border border-slate-800">
                  <img src={item.image} alt={item.name} referrerPolicy="no-referrer" className="w-full h-full object-cover" />
                </div>

                <div className="flex items-center justify-center gap-1">
                  <span
                    className={`inline-block px-2 py-0.5 rounded text-[10px] font-black uppercase ${
                      item.rarity === 'SSR'
                        ? 'bg-amber-500 text-slate-950'
                        : item.rarity === 'SR'
                        ? 'bg-purple-600 text-white'
                        : 'bg-slate-700 text-slate-200'
                    }`}
                  >
                    {item.rarity}
                  </span>
                  <span className="inline-block px-1.5 py-0.5 rounded text-[9px] font-bold bg-slate-800 text-slate-300 capitalize border border-slate-700">
                    {item.type}
                  </span>
                </div>

                <p className="text-[11px] font-bold text-white truncate">{item.name}</p>
                {item.characterName && item.characterName !== 'Universal' && (
                  <p className="text-[9px] text-amber-300 font-medium">Hero: {item.characterName}</p>
                )}
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};
