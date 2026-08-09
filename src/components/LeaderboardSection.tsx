import React from 'react';
import { Award, Shield, Trophy, Users, Zap, Crown } from 'lucide-react';
import { LeaderboardPlayer } from '../types';
import { handleImageError } from '../utils/imageFallback';

interface LeaderboardProps {
  leaderboard: LeaderboardPlayer[];
  userPowerScore: number;
}

export const LeaderboardSection: React.FC<LeaderboardProps> = ({ leaderboard, userPowerScore }) => {
  const top3 = leaderboard.slice(0, 3);
  const top4to10 = leaderboard.slice(3, 10);
  const top11to50 = leaderboard.slice(10, 50);

  return (
    <div className="space-y-6">
      {/* Top 1-3 Podium Cards */}
      <div>
        <h3 className="text-sm font-bold text-slate-300 mb-3 flex items-center gap-2">
          <Trophy className="w-4 h-4 text-amber-400" />
          Top 1-3 Wardrobe & Gear Champions
        </h3>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          {top3.map((player) => (
            <div
              key={player.id}
              className={`bg-slate-900 border rounded-2xl p-5 shadow-xl relative overflow-hidden flex flex-col items-center text-center ${
                player.rank === 1
                  ? 'border-amber-400 ring-2 ring-amber-400/30'
                  : player.rank === 2
                  ? 'border-slate-400'
                  : 'border-amber-700'
              }`}
            >
              {/* Crown Badge */}
              <div
                className={`w-8 h-8 rounded-full flex items-center justify-center font-black text-xs mb-3 shadow-md ${
                  player.rank === 1
                    ? 'bg-amber-400 text-slate-950'
                    : player.rank === 2
                    ? 'bg-slate-300 text-slate-950'
                    : 'bg-amber-700 text-white'
                }`}
              >
                {player.rank === 1 ? <Crown className="w-4 h-4 fill-slate-950" /> : `#${player.rank}`}
              </div>

              <div className="w-20 h-20 rounded-full border-2 border-rose-500 overflow-hidden mb-2 shadow-lg">
                <img src={player.avatar} alt={player.name} referrerPolicy="no-referrer" onError={(e) => handleImageError(e)} className="w-full h-full object-cover" />
              </div>

              <h4 className="text-sm font-bold text-white">{player.name}</h4>
              <span className="text-[10px] text-amber-300 font-semibold bg-amber-500/10 px-2 py-0.5 rounded border border-amber-500/30 mt-1">
                {player.badge}
              </span>

              <div className="mt-3 pt-3 border-t border-slate-800 w-full flex justify-between text-xs text-slate-300 font-medium">
                <span>Power Score:</span>
                <span className="text-amber-300 font-bold">{player.powerScore.toLocaleString()} PTS</span>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Top 4-10 Leaderboard Table */}
      <div className="bg-slate-900 border border-slate-800 rounded-2xl p-6 shadow-xl space-y-4">
        <h3 className="text-sm font-bold text-slate-300 flex items-center gap-2 border-b border-slate-800 pb-3">
          <Users className="w-4 h-4 text-rose-400" />
          Top 4 - 10 Guardians Ranking
        </h3>

        <div className="space-y-2">
          {top4to10.map((player) => (
            <div
              key={player.id}
              className="bg-slate-950 border border-slate-800/80 rounded-xl p-3 flex items-center justify-between text-xs"
            >
              <div className="flex items-center gap-3">
                <span className="font-bold text-slate-400 w-6 text-center">#{player.rank}</span>
                <div className="w-8 h-8 rounded-full overflow-hidden border border-slate-700">
                  <img src={player.avatar} alt={player.name} referrerPolicy="no-referrer" onError={(e) => handleImageError(e)} className="w-full h-full object-cover" />
                </div>
                <div>
                  <p className="font-bold text-white">{player.name}</p>
                  <p className="text-[10px] text-slate-400">{player.badge}</p>
                </div>
              </div>

              <div className="text-right">
                <span className="font-bold text-amber-300 block">
                  {player.powerScore.toLocaleString()} PTS
                </span>
                <span className="text-[10px] text-slate-500">{player.unlockedCount} Gear Unlocked</span>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Player Personal Score Summary Footer */}
      <div className="bg-gradient-to-r from-rose-900/60 to-slate-900 border border-rose-500/40 rounded-xl p-4 flex items-center justify-between text-xs">
        <div className="flex items-center gap-3">
          <Shield className="w-5 h-5 text-amber-400" />
          <div>
            <p className="font-bold text-white">Your Personal Wardrobe Power Score</p>
            <p className="text-[10px] text-slate-300">Sum of all unlocked character skins, outfits, and accessories.</p>
          </div>
        </div>
        <span className="text-base font-black text-amber-300">{userPowerScore.toLocaleString()} PTS</span>
      </div>
    </div>
  );
};
