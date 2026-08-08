import React, { useState } from 'react';
import { PhoneCall, MessageSquare, ShieldAlert, Heart, ExternalLink, X, AlertTriangle, Radio } from 'lucide-react';

interface EmergencyAlertBannerProps {
  isActive: boolean;
  onClose: () => void;
  onOpenDonationModal: () => void;
}

export const EmergencyAlertBanner: React.FC<EmergencyAlertBannerProps> = ({
  isActive,
  onClose,
  onOpenDonationModal,
}) => {
  if (!isActive) return null;

  return (
    <div className="bg-gradient-to-r from-red-950 via-rose-900 to-slate-950 border-b-2 border-rose-500 text-white py-2.5 px-4 sticky top-0 z-50 shadow-2xl animate-fade-in">
      <div className="max-w-7xl mx-auto flex flex-wrap items-center justify-between gap-3 text-xs">
        {/* Left SOS Label */}
        <div className="flex items-center gap-2">
          <span className="flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-rose-600 text-white font-black text-[11px] uppercase tracking-wider animate-pulse shadow-md shadow-rose-600/50">
            <Radio className="w-3.5 h-3.5 animate-ping" />
            24/7 CRISIS & SAFETY LIFELINE ACTIVE
          </span>
          <span className="hidden md:inline text-rose-200 font-medium">
            Immediate support available. You are deeply loved and never alone!
          </span>
        </div>

        {/* Middle Quick Action Buttons */}
        <div className="flex flex-wrap items-center gap-2">
          <a
            href="tel:988"
            className="px-3 py-1 bg-amber-400 hover:bg-amber-300 text-slate-950 font-black rounded-lg flex items-center gap-1 shadow transition"
          >
            <PhoneCall className="w-3 h-3" /> Call 988 Lifeline
          </a>

          <a
            href="sms:741741?body=HOME"
            className="px-3 py-1 bg-rose-600 hover:bg-rose-500 text-white font-black rounded-lg flex items-center gap-1 shadow transition"
          >
            <MessageSquare className="w-3 h-3" /> Text 741741
          </a>

          <a
            href="tel:911"
            className="px-3 py-1 bg-red-700 hover:bg-red-600 text-white font-black rounded-lg flex items-center gap-1 shadow transition"
          >
            <ShieldAlert className="w-3 h-3" /> Call 911 Dispatch
          </a>

          <button
            onClick={onOpenDonationModal}
            className="hidden lg:flex items-center gap-1 px-3 py-1 bg-emerald-600 hover:bg-emerald-500 text-white font-bold rounded-lg transition"
          >
            <Heart className="w-3 h-3 text-rose-300 fill-rose-300" /> Support Creator
          </button>
        </div>

        {/* Right Close Button */}
        <button
          onClick={onClose}
          className="p-1 text-slate-300 hover:text-white hover:bg-rose-800/50 rounded-lg transition"
          title="Dismiss Banner"
        >
          <X className="w-4 h-4" />
        </button>
      </div>
    </div>
  );
};
