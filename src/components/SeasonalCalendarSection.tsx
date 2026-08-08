import React, { useState } from 'react';
import { Calendar as CalendarIcon, MapPin, CheckCircle, Gift, Sparkles } from 'lucide-react';

interface CalendarProps {
  userLocation: string;
  setUserLocation: (loc: string) => void;
  streakDays: number;
  onClaimDaily: () => void;
  dailyClaimed: boolean;
}

export const SeasonalCalendarSection: React.FC<CalendarProps> = ({
  userLocation,
  setUserLocation,
  streakDays,
  onClaimDaily,
  dailyClaimed,
}) => {
  const [selectedDay, setSelectedDay] = useState<number>(new Date().getDate());

  const daysInMonth = Array.from({ length: 30 }, (_, i) => i + 1);

  const getEventForLocation = (location: string) => {
    switch (location) {
      case 'United States':
        return { name: 'Angel Medic Awakening Festival', bonus: '2x Gacha Gems' };
      case 'Japan':
        return { name: 'Nurse Elfe Sakura Health Matsuri', bonus: 'Bonus SSR Drop Rate' };
      case 'Philippines':
        return { name: 'Yahusha Healing & Peace Celebration', bonus: '500 Extra Medic Points' };
      case 'Korea':
        return { name: 'Chuseok Wellness Blessing', bonus: 'Exclusive Apparel Ticket' };
      default:
        return { name: 'Global Health & Faith Summit', bonus: 'Daily Login Reward Multiplier' };
    }
  };

  const activeEvent = getEventForLocation(userLocation);

  return (
    <div className="space-y-6">
      {/* Region & IP Location Selector */}
      <div className="bg-slate-900 border border-slate-800 rounded-2xl p-5 shadow-xl flex flex-wrap items-center justify-between gap-4">
        <div className="flex items-center gap-3">
          <MapPin className="w-5 h-5 text-rose-400" />
          <div>
            <h3 className="text-sm font-bold text-white">Localized Regional Calendar Events</h3>
            <p className="text-xs text-slate-400">
              Detects region to customize seasonal health banners and login bonuses.
            </p>
          </div>
        </div>

        <div className="flex items-center gap-2">
          <span className="text-xs text-slate-300 font-medium">Select Region:</span>
          <select
            value={userLocation}
            onChange={(e) => setUserLocation(e.target.value)}
            className="px-3 py-1.5 bg-slate-950 border border-slate-700 rounded-xl text-xs text-amber-300 font-semibold focus:outline-none focus:border-rose-500"
          >
            <option value="United States">United States (US-East)</option>
            <option value="Japan">Japan (Tokyo)</option>
            <option value="Philippines">Philippines (Manila)</option>
            <option value="Korea">Korea (Seoul)</option>
            <option value="Global">Global Region</option>
          </select>
        </div>
      </div>

      {/* Active Regional Seasonal Event Card */}
      <div className="bg-gradient-to-r from-rose-950/80 via-slate-900 to-amber-950/80 border border-amber-500/40 rounded-2xl p-6 shadow-xl relative overflow-hidden space-y-2">
        <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-amber-500/20 text-amber-300 border border-amber-500/30 text-xs font-semibold">
          <Sparkles className="w-4 h-4 text-amber-400" />
          <span>Active Local Festival</span>
        </div>
        <h2 className="text-lg font-bold text-white">{activeEvent.name}</h2>
        <p className="text-xs text-slate-300">
          Regional Event Bonus: <strong className="text-amber-300">{activeEvent.bonus}</strong>
        </p>
      </div>

      {/* Monthly Attendance Grid */}
      <div className="bg-slate-900 border border-slate-800 rounded-2xl p-6 shadow-xl space-y-4">
        <div className="flex items-center justify-between border-b border-slate-800 pb-3">
          <h3 className="text-base font-bold text-white flex items-center gap-2">
            <CalendarIcon className="w-5 h-5 text-rose-400" />
            Monthly Health Check-in Calendar
          </h3>
          <span className="text-xs font-semibold text-amber-300">
            Current Streak: {streakDays} Consecutive Days
          </span>
        </div>

        <div className="grid grid-cols-5 sm:grid-cols-6 md:grid-cols-10 gap-2">
          {daysInMonth.map((day) => {
            const isToday = day === new Date().getDate();
            const isPast = day < new Date().getDate();

            return (
              <div
                key={day}
                onClick={() => setSelectedDay(day)}
                className={`cursor-pointer rounded-xl p-3 text-center border transition flex flex-col items-center justify-between min-h-[70px] ${
                  isToday
                    ? 'border-amber-400 bg-rose-950/60 shadow-lg shadow-rose-500/20 ring-1 ring-amber-400'
                    : isPast
                    ? 'border-slate-800 bg-slate-950 text-slate-400'
                    : 'border-slate-800 bg-slate-900 text-slate-300 hover:border-slate-700'
                }`}
              >
                <span className="text-[10px] font-bold text-slate-400 block">Day {day}</span>

                {isToday ? (
                  <Gift className="w-4 h-4 text-amber-300 animate-bounce" />
                ) : isPast ? (
                  <CheckCircle className="w-4 h-4 text-emerald-400" />
                ) : (
                  <Gift className="w-4 h-4 text-slate-600" />
                )}

                <span className="text-[9px] font-bold text-amber-300 mt-1">
                  {day % 5 === 0 ? '+1,000 G' : '+500 G'}
                </span>
              </div>
            );
          })}
        </div>

        {/* Daily Bonus Claim Footer */}
        <div className="pt-4 border-t border-slate-800 flex items-center justify-between">
          <span className="text-xs text-slate-400">
            Log in daily to maintain check-in streak and earn Gacha Gems!
          </span>
          <button
            onClick={onClaimDaily}
            disabled={dailyClaimed}
            className={`px-4 py-2 rounded-xl text-xs font-bold transition flex items-center gap-1.5 ${
              dailyClaimed
                ? 'bg-slate-800 text-slate-500 cursor-not-allowed'
                : 'bg-gradient-to-r from-amber-500 to-rose-500 text-white hover:from-amber-400 hover:to-rose-400 shadow-md'
            }`}
          >
            <Gift className="w-4 h-4" />
            {dailyClaimed ? 'Today Claimed' : 'Claim Day Reward (+500 Gems)'}
          </button>
        </div>
      </div>
    </div>
  );
};
