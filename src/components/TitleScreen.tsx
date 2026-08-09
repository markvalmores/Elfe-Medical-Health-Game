import React, { useEffect } from 'react';
import { Plus, Heart, Sparkles, Shield, Stethoscope, Calendar } from 'lucide-react';
import nurseElfeAngelicImg from '../assets/images/nurse_elfe_angelic_1786227050228.jpg';
import { handleImageError } from '../utils/imageFallback';

interface TitleScreenProps {
  onStartGame: () => void;
}

export const TitleScreen: React.FC<TitleScreenProps> = ({ onStartGame }) => {
  useEffect(() => {
    const handleKeyPress = (e: KeyboardEvent) => {
      if (e.key === '+' || e.key === '=') {
        onStartGame();
      }
    };
    window.addEventListener('keydown', handleKeyPress);
    return () => window.removeEventListener('keydown', handleKeyPress);
  }, [onStartGame]);

  return (
    <div className="min-h-screen bg-slate-950 text-slate-100 flex flex-col items-center justify-between p-6 relative overflow-hidden font-sans selection:bg-rose-500 selection:text-white">
      {/* Background Anime Particle Glow Effects */}
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top,_var(--tw-gradient-stops))] from-rose-900/30 via-slate-950 to-slate-950 pointer-events-none"></div>
      <div className="absolute top-1/4 -left-20 w-96 h-96 bg-rose-500/10 rounded-full blur-3xl pointer-events-none animate-pulse"></div>
      <div className="absolute bottom-10 -right-20 w-96 h-96 bg-amber-500/10 rounded-full blur-3xl pointer-events-none animate-pulse"></div>

      {/* Top Header Badge */}
      <div className="z-10 flex items-center gap-2 bg-slate-900/80 backdrop-blur border border-rose-500/30 px-4 py-2 rounded-full shadow-xl">
        <Sparkles className="w-4 h-4 text-amber-400 animate-spin" />
        <span className="text-xs font-bold bg-gradient-to-r from-rose-300 via-amber-200 to-rose-300 bg-clip-text text-transparent">
          Official Clinical Suite • Yahusha Faith & Wellness
        </span>
      </div>

      {/* Center Stage: Title + Nurse Elfe Showcase + Interactive Appointment Button */}
      <div className="z-10 max-w-2xl w-full text-center space-y-6 my-auto">
        {/* Title Display */}
        <div className="space-y-2">
          <div className="inline-flex items-center gap-2 text-rose-400 text-xs font-black uppercase tracking-widest bg-rose-500/10 px-3 py-1 rounded-full border border-rose-500/20">
            <Heart className="w-3.5 h-3.5 fill-rose-500 animate-bounce" />
            Anime Nurse Waifu Edition
          </div>
          <h1 className="text-4xl sm:text-6xl font-black tracking-tight text-white drop-shadow-lg">
            <span className="bg-gradient-to-r from-rose-400 via-amber-300 to-rose-500 bg-clip-text text-transparent">
              Elfe Medical Health Game
            </span>
          </h1>
          <p className="text-slate-400 text-xs sm:text-sm max-w-md mx-auto leading-relaxed">
            Real-Time Optical Vitals Telemetry • Gacha Wardrobe • Scripture Reflections • Personalized Wellness
          </p>
        </div>

        {/* Character Card Visual */}
        <div className="relative inline-block my-4">
          <div className="w-48 h-64 sm:w-56 sm:h-72 rounded-3xl overflow-hidden border-4 border-rose-500/50 shadow-2xl shadow-rose-950/80 mx-auto relative group transition-transform duration-500 hover:scale-105">
            <img
              src={nurseElfeAngelicImg}
              alt="Nurse Elfe Anime"
              referrerPolicy="no-referrer"
              onError={(e) => handleImageError(e)}
              className="w-full h-full object-cover"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-slate-950/20 to-transparent"></div>
            
            <div className="absolute bottom-3 inset-x-2 text-center">
              <span className="text-[11px] font-bold text-amber-300 bg-slate-950/90 px-3 py-1 rounded-full border border-amber-500/40 shadow">
                Nurse Elfe (Angelic Medic)
              </span>
            </div>
          </div>

          <div className="absolute -top-3 -right-3 bg-rose-600 text-white p-2 rounded-full shadow-lg border border-rose-400 animate-bounce">
            <Stethoscope className="w-5 h-5" />
          </div>
        </div>

        {/* Primary Call To Action: "Press + to get an Appointment <3" */}
        <div className="space-y-3 pt-2">
          <button
            onClick={onStartGame}
            className="group relative inline-flex items-center justify-center gap-3 px-8 py-4 rounded-2xl bg-gradient-to-r from-rose-600 via-amber-500 to-rose-600 bg-[length:200%_auto] hover:bg-right text-white font-extrabold text-base sm:text-lg shadow-2xl shadow-rose-600/50 hover:shadow-amber-500/50 transition-all duration-300 transform hover:-translate-y-1 active:translate-y-0"
          >
            <div className="w-8 h-8 rounded-full bg-white/20 flex items-center justify-center border border-white/40 group-hover:rotate-90 transition-transform duration-300">
              <Plus className="w-6 h-6 text-white stroke-[3]" />
            </div>
            <span>Press + to get an Appointment &lt;3</span>
          </button>

          <p className="text-[11px] text-slate-500 font-medium">
            Click the button or press key <kbd className="px-1.5 py-0.5 bg-slate-800 border border-slate-700 rounded text-amber-300 font-mono">+</kbd> on your keyboard to enter Nurse Elfe's clinic.
          </p>
        </div>
      </div>

      {/* Footer Details */}
      <div className="z-10 flex flex-col sm:flex-row items-center gap-4 text-xs text-slate-500 border-t border-slate-900 pt-4 w-full max-w-xl justify-between">
        <span className="flex items-center gap-1.5 text-slate-400">
          <Shield className="w-4 h-4 text-emerald-400" />
          Clinical Grade Precision & Gacha
        </span>
        <span className="flex items-center gap-1.5 text-slate-400">
          <Calendar className="w-4 h-4 text-amber-400" />
          Daily Scripture & Localized Events
        </span>
      </div>
    </div>
  );
};
