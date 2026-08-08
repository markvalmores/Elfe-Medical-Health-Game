import React, { useState } from 'react';
import { X, Heart, ExternalLink, Copy, Check, Sparkles, Shield, Gift } from 'lucide-react';

interface DonationModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const DonationModal: React.FC<DonationModalProps> = ({ isOpen, onClose }) => {
  const [copiedGcash, setCopiedGcash] = useState<boolean>(false);

  if (!isOpen) return null;

  const handleCopyGcash = () => {
    navigator.clipboard.writeText('09763329358');
    setCopiedGcash(true);
    setTimeout(() => setCopiedGcash(false), 3000);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/80 backdrop-blur-md animate-fade-in">
      <div className="bg-slate-900 border-2 border-amber-500/50 rounded-3xl p-6 sm:p-8 max-w-lg w-full shadow-2xl relative overflow-hidden space-y-6">
        {/* Background glow decorative */}
        <div className="absolute -top-12 -right-12 w-40 h-40 bg-rose-500/20 rounded-full blur-3xl pointer-events-none" />
        <div className="absolute -bottom-12 -left-12 w-40 h-40 bg-amber-500/20 rounded-full blur-3xl pointer-events-none" />

        {/* Header */}
        <div className="flex items-start justify-between border-b border-slate-800 pb-4">
          <div className="flex items-center gap-3">
            <div className="p-3 rounded-2xl bg-gradient-to-tr from-amber-500 to-rose-500 text-slate-950 shadow-lg shadow-amber-500/20">
              <Sparkles className="w-6 h-6" />
            </div>
            <div>
              <h3 className="text-xl font-black text-white">Creator Credits & Support</h3>
              <p className="text-xs text-amber-300 font-medium">
                In Faith according to Yahua, Yahusha Christ, YHWH & Holy Spirit
              </p>
            </div>
          </div>
          <button
            onClick={onClose}
            className="p-1.5 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-400 hover:text-white transition"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Creator Attribution */}
        <div className="bg-slate-950 border border-slate-800 rounded-2xl p-4 space-y-2 text-center">
          <span className="text-[11px] font-bold text-amber-400 uppercase tracking-widest block">
            Lead Developer & Creator
          </span>
          <h4 className="text-lg font-extrabold text-white">
            Usagyuun VTuber / Eleventh Gyuuun / Junichi555 / Mark David V. Valmores
          </h4>
          <p className="text-xs text-slate-400 leading-relaxed">
            Thank you for supporting this wellness game, holistic health tracker, anime companion, and 24/7 crisis prevention platform.
          </p>
        </div>

        {/* Donation Options */}
        <div className="space-y-4">
          <span className="text-xs font-bold text-slate-300 uppercase tracking-wider block">
            Ways to Donate & Tip:
          </span>

          {/* Streamlabs Link */}
          <a
            href="https://streamlabs.com/usagyuunvtuber/tip"
            target="_blank"
            rel="noreferrer"
            className="w-full py-3.5 px-5 bg-gradient-to-r from-emerald-500 via-teal-500 to-emerald-600 hover:from-emerald-400 hover:to-teal-400 text-slate-950 font-black rounded-2xl shadow-xl shadow-emerald-500/20 flex items-center justify-between transition-all transform hover:-translate-y-0.5"
          >
            <div className="flex items-center gap-2">
              <Heart className="w-5 h-5 fill-slate-950 text-slate-950" />
              <span>Streamlabs Tip Page</span>
            </div>
            <div className="flex items-center gap-1 text-xs">
              <span>https://streamlabs.com/usagyuunvtuber/tip</span>
              <ExternalLink className="w-4 h-4" />
            </div>
          </a>

          {/* GCash Details */}
          <div className="bg-gradient-to-br from-blue-950/60 to-slate-950 border border-blue-500/40 rounded-2xl p-4 flex items-center justify-between gap-3">
            <div className="space-y-1">
              <span className="text-[11px] font-bold text-blue-400 uppercase tracking-wider block">
                GCash Direct Transfer (Philippines)
              </span>
              <p className="text-sm font-black text-white">
                Account Name: <span className="text-amber-300">Mark David</span>
              </p>
              <p className="text-base font-extrabold font-mono text-emerald-400">
                09763329358
              </p>
            </div>

            <button
              onClick={handleCopyGcash}
              className="px-3.5 py-2.5 bg-blue-600 hover:bg-blue-500 text-white rounded-xl text-xs font-bold flex items-center gap-1.5 transition shadow"
            >
              {copiedGcash ? (
                <>
                  <Check className="w-4 h-4 text-emerald-300" /> Copied!
                </>
              ) : (
                <>
                  <Copy className="w-4 h-4" /> Copy Number
                </>
              )}
            </button>
          </div>
        </div>

        {/* Footer Note */}
        <div className="text-center pt-2 border-t border-slate-800 text-[11px] text-slate-500">
          May Yahua and Yahusha bless your health, heart, spirit, and journey abundantly!
        </div>
      </div>
    </div>
  );
};
