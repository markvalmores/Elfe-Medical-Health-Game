import React, { useState } from 'react';
import { User, Sparkles, MessageSquare, Heart, Shield, RefreshCw } from 'lucide-react';
import { GachaItem } from '../types';
import nurseElfeAngelicImg from '../assets/images/nurse_elfe_angelic_1786227050228.jpg';
import { handleImageError } from '../utils/imageFallback';

interface NurseElfeProps {
  equippedOutfit: GachaItem | null;
  equippedAccessory: GachaItem | null;
  onOutfitChange: () => void;
}

export const NurseElfeCompanion: React.FC<NurseElfeProps> = ({
  equippedOutfit,
  equippedAccessory,
  onOutfitChange,
}) => {
  const [dialogue, setDialogue] = useState<string>(
    "Welcome! I'm Nurse Elfe, your health companion. Remember to record your vitals and stay hydrated today!"
  );
  const [isInteracting, setIsInteracting] = useState(false);

  const dialogueOptions = [
    "Have you logged your pulse rate today? Consistency is key to long-term wellness!",
    "Remember that taking deep, steady breaths helps soothe your nervous system.",
    "Your health journey is a blessing! Keep going step by step.",
    "I've prepared your daily health scriptures and check-in tasks!",
    "Looking great! Every small healthy choice adds up over time."
  ];

  const triggerInteraction = () => {
    setIsInteracting(true);
    const randomIndex = Math.floor(Math.random() * dialogueOptions.length);
    setDialogue(dialogueOptions[randomIndex]);
    setTimeout(() => setIsInteracting(false), 800);
  };

  const activeImage = equippedOutfit
    ? equippedOutfit.image
    : nurseElfeAngelicImg;

  return (
    <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
      {/* 3D Visual Avatar Stage */}
      <div className="lg:col-span-2 bg-slate-900 border border-slate-800 rounded-2xl p-6 flex flex-col items-center justify-between relative overflow-hidden shadow-xl min-h-[480px]">
        {/* Background Aura */}
        <div className="absolute inset-0 bg-gradient-to-b from-rose-950/20 via-slate-900 to-slate-950 pointer-events-none"></div>

        <div className="w-full flex items-center justify-between z-10">
          <div className="flex items-center gap-2 bg-slate-950/80 px-3 py-1.5 rounded-full border border-rose-500/30">
            <Sparkles className="w-4 h-4 text-rose-400" />
            <span className="text-xs font-bold text-slate-200">Nurse Elfe 3D Interactive Companion</span>
          </div>

          <button
            onClick={onOutfitChange}
            className="px-3 py-1.5 bg-slate-800 hover:bg-slate-700 text-slate-200 text-xs font-semibold rounded-lg border border-slate-700 flex items-center gap-1.5 transition"
          >
            <RefreshCw className="w-3.5 h-3.5 text-amber-400" />
            Change Outfit
          </button>
        </div>

        {/* Character Visual Showcase */}
        <div
          onClick={triggerInteraction}
          className="relative my-6 cursor-pointer group flex flex-col items-center justify-center"
        >
          <div
            className={`w-64 h-80 rounded-2xl overflow-hidden border-2 border-rose-500/50 shadow-2xl transition-transform duration-300 relative ${
              isInteracting ? 'scale-105 border-amber-400' : 'group-hover:scale-102'
            }`}
          >
            <img
              src={activeImage}
              alt="Nurse Elfe"
              referrerPolicy="no-referrer"
              onError={(e) => handleImageError(e)}
              className="w-full h-full object-cover"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-slate-950/80 via-transparent to-transparent"></div>

            <div className="absolute bottom-3 inset-x-3 text-center">
              <span className="text-xs font-bold text-amber-300 bg-slate-950/90 px-3 py-1 rounded-full border border-amber-500/30">
                {equippedOutfit ? equippedOutfit.name : 'Nurse Elfe (Default)'}
              </span>
            </div>
          </div>

          <p className="text-[11px] text-slate-400 mt-2 flex items-center gap-1">
            <Heart className="w-3 h-3 text-rose-500 fill-rose-500" />
            Click Nurse Elfe to interact & hear advice
          </p>
        </div>

        {/* Dialogue Box */}
        <div className="w-full z-10 bg-slate-950/90 border border-slate-800 rounded-xl p-4 flex items-start gap-3 shadow-inner">
          <MessageSquare className="w-5 h-5 text-rose-400 shrink-0 mt-0.5" />
          <p className="text-xs text-slate-200 leading-relaxed font-medium">
            "{dialogue}"
          </p>
        </div>
      </div>

      {/* Wardrobe & Stats Overview */}
      <div className="bg-slate-900 border border-slate-800 rounded-2xl p-6 shadow-xl space-y-6">
        <h3 className="text-base font-bold text-white flex items-center gap-2 border-b border-slate-800 pb-3">
          <User className="w-5 h-5 text-amber-400" />
          Wardrobe & Equipment
        </h3>

        {/* Equipped Outfit */}
        <div className="bg-slate-950 border border-slate-800 rounded-xl p-4">
          <div className="flex items-center justify-between text-xs text-slate-400 mb-2">
            <span>Equipped Outfit</span>
            <span className="text-amber-400 font-bold">
              {equippedOutfit ? equippedOutfit.rarity : 'Standard'}
            </span>
          </div>
          <div className="flex items-center gap-3">
            <div className="w-12 h-12 rounded-lg bg-slate-900 border border-slate-700 overflow-hidden shrink-0">
              <img
                src={activeImage}
                alt="Outfit"
                onError={(e) => handleImageError(e)}
                className="w-full h-full object-cover"
              />
            </div>
            <div>
              <p className="text-xs font-bold text-white">
                {equippedOutfit ? equippedOutfit.name : 'Standard Medical Scrub'}
              </p>
              <p className="text-[11px] text-slate-400 mt-0.5">
                {equippedOutfit ? equippedOutfit.description : 'Default clinical uniform.'}
              </p>
            </div>
          </div>
        </div>

        {/* Equipped Accessory */}
        <div className="bg-slate-950 border border-slate-800 rounded-xl p-4">
          <div className="flex items-center justify-between text-xs text-slate-400 mb-2">
            <span>Equipped Accessory</span>
            <span className="text-amber-400 font-bold">
              {equippedAccessory ? equippedAccessory.rarity : 'None'}
            </span>
          </div>
          <div className="flex items-center gap-3">
            <div className="w-12 h-12 rounded-lg bg-slate-900 border border-slate-700 overflow-hidden shrink-0 flex items-center justify-center">
              {equippedAccessory ? (
                <img
                  src={equippedAccessory.image}
                  alt="Accessory"
                  onError={(e) => handleImageError(e)}
                  className="w-full h-full object-cover"
                />
              ) : (
                <Shield className="w-6 h-6 text-slate-600" />
              )}
            </div>
            <div>
              <p className="text-xs font-bold text-white">
                {equippedAccessory ? equippedAccessory.name : 'No Accessory Equipped'}
              </p>
              <p className="text-[11px] text-slate-400 mt-0.5">
                {equippedAccessory
                  ? equippedAccessory.description
                  : 'Unlock accessories from Gacha draws to boost power rating.'}
              </p>
            </div>
          </div>
        </div>

        {/* Power Score Bonus Card */}
        <div className="bg-gradient-to-r from-rose-950/60 to-purple-950/60 border border-rose-500/30 rounded-xl p-4">
          <div className="flex items-center justify-between">
            <span className="text-xs font-semibold text-rose-300">Wardrobe Power Contribution</span>
            <span className="text-sm font-black text-amber-300">
              +
              {(equippedOutfit ? equippedOutfit.rarityScore : 0) +
                (equippedAccessory ? equippedAccessory.rarityScore : 0)}{' '}
              PTS
            </span>
          </div>
        </div>
      </div>
    </div>
  );
};
