import React, { useState } from 'react';
import { BookOpen, Moon, Sparkles, Plus, Bookmark, Heart, Send, Check } from 'lucide-react';
import { DreamEntry, ScriptureQuote } from '../types';
import { DAILY_SCRIPTURES } from '../mockData';

interface DreamJournalProps {
  dreams: DreamEntry[];
  onAddDream: (dream: DreamEntry) => void;
}

export const DreamAndScriptureSection: React.FC<DreamJournalProps> = ({ dreams, onAddDream }) => {
  const [activeTab, setActiveTab] = useState<'scriptures' | 'dreams'>('scriptures');
  const [dreamTitle, setDreamTitle] = useState('');
  const [dreamContent, setDreamContent] = useState('');
  const [isInterpreting, setIsInterpreting] = useState(false);
  const [lastInterpretation, setLastInterpretation] = useState<string | null>(null);

  const handleInterpretDream = () => {
    if (!dreamTitle || !dreamContent) return;
    setIsInterpreting(true);

    setTimeout(() => {
      setIsInterpreting(false);
      const interpretations = [
        "Your dream reflects a period of spiritual renewal and internal restoration. Like Joseph and Daniel, quiet patience leads to clarity.",
        "The imagery in your dream symbolizes protection and steady guidance along your path. Focus on peace and trusting the process.",
        "This dream highlights a desire for harmony and health. Take time for calm reflection and meditative prayer today.",
        "Your vision points toward overcoming minor obstacles with grace. Stay steadfast in hope and physical wellness."
      ];
      const randomInterp = interpretations[Math.floor(Math.random() * interpretations.length)];
      setLastInterpretation(randomInterp);

      const newEntry: DreamEntry = {
        id: Date.now().toString(),
        date: new Date().toLocaleDateString(),
        title: dreamTitle,
        content: dreamContent,
        interpretation: randomInterp,
        scriptureRef: 'Psalm 16:7',
      };

      onAddDream(newEntry);
      setDreamTitle('');
      setDreamContent('');
    }, 1200);
  };

  return (
    <div className="space-y-6">
      {/* Top Toggle Switch */}
      <div className="flex justify-center">
        <div className="bg-slate-900 border border-slate-800 p-1 rounded-xl flex items-center gap-1 shadow-md">
          <button
            onClick={() => setActiveTab('scriptures')}
            className={`px-5 py-2 rounded-lg text-xs font-bold transition flex items-center gap-2 ${
              activeTab === 'scriptures'
                ? 'bg-rose-600 text-white shadow-lg'
                : 'text-slate-400 hover:text-white'
            }`}
          >
            <BookOpen className="w-4 h-4" />
            Daily Scripture & Reflections
          </button>
          <button
            onClick={() => setActiveTab('dreams')}
            className={`px-5 py-2 rounded-lg text-xs font-bold transition flex items-center gap-2 ${
              activeTab === 'dreams'
                ? 'bg-rose-600 text-white shadow-lg'
                : 'text-slate-400 hover:text-white'
            }`}
          >
            <Moon className="w-4 h-4" />
            Dream Reflection Journal
          </button>
        </div>
      </div>

      {activeTab === 'scriptures' ? (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {DAILY_SCRIPTURES.map((scripture) => (
            <div
              key={scripture.id}
              className="bg-slate-900 border border-slate-800 rounded-2xl p-5 shadow-xl space-y-3 relative overflow-hidden"
            >
              <div className="flex items-center justify-between">
                <span className="px-2.5 py-0.5 rounded-full text-[10px] font-bold bg-rose-500/20 text-rose-300 border border-rose-500/30">
                  {scripture.category}
                </span>
                <span className="text-xs font-bold text-amber-300">{scripture.reference}</span>
              </div>

              <blockquote className="text-sm italic text-slate-100 font-serif leading-relaxed border-l-2 border-rose-500 pl-3">
                "{scripture.verse}"
              </blockquote>

              <div className="bg-slate-950 border border-slate-800/80 rounded-xl p-3 text-xs text-slate-300 leading-relaxed">
                <strong className="text-rose-400 block mb-1">Health & Spiritual Reflection:</strong>
                {scripture.reflection}
              </div>
            </div>
          ))}
        </div>
      ) : (
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* New Dream Log Form */}
          <div className="bg-slate-900 border border-slate-800 rounded-2xl p-6 shadow-xl space-y-4">
            <h3 className="text-base font-bold text-white flex items-center gap-2 border-b border-slate-800 pb-3">
              <Sparkles className="w-5 h-5 text-amber-400" />
              Log Dream Reflection
            </h3>

            <div>
              <label className="text-xs font-semibold text-slate-300 block mb-1">Dream Title</label>
              <input
                type="text"
                placeholder="e.g. Flight over peaceful waters..."
                value={dreamTitle}
                onChange={(e) => setDreamTitle(e.target.value)}
                className="w-full px-3 py-2 bg-slate-950 border border-slate-800 rounded-xl text-xs text-white placeholder-slate-500 focus:outline-none focus:border-rose-500"
              />
            </div>

            <div>
              <label className="text-xs font-semibold text-slate-300 block mb-1">
                Dream Notes & Symbols
              </label>
              <textarea
                rows={4}
                placeholder="Describe your dream imagery, emotions, or themes..."
                value={dreamContent}
                onChange={(e) => setDreamContent(e.target.value)}
                className="w-full px-3 py-2 bg-slate-950 border border-slate-800 rounded-xl text-xs text-white placeholder-slate-500 focus:outline-none focus:border-rose-500 resize-none"
              ></textarea>
            </div>

            <button
              onClick={handleInterpretDream}
              disabled={isInterpreting || !dreamTitle || !dreamContent}
              className={`w-full py-3 rounded-xl font-bold text-xs flex items-center justify-center gap-2 transition ${
                dreamTitle && dreamContent && !isInterpreting
                  ? 'bg-gradient-to-r from-rose-600 to-amber-600 hover:from-rose-500 hover:to-amber-500 text-white shadow-lg shadow-rose-950/50'
                  : 'bg-slate-800 text-slate-500 cursor-not-allowed'
              }`}
            >
              <Send className="w-4 h-4" />
              {isInterpreting ? 'Reflecting on Dream Themes...' : 'Save & Interpret Dream'}
            </button>

            {lastInterpretation && (
              <div className="bg-slate-950 border border-amber-500/30 rounded-xl p-3 text-xs text-amber-200 space-y-1">
                <span className="font-bold text-amber-400 block">Reflection Insight:</span>
                <p>{lastInterpretation}</p>
              </div>
            )}
          </div>

          {/* Dream History */}
          <div className="lg:col-span-2 bg-slate-900 border border-slate-800 rounded-2xl p-6 shadow-xl space-y-4">
            <h3 className="text-base font-bold text-white flex items-center gap-2 border-b border-slate-800 pb-3">
              <Bookmark className="w-5 h-5 text-rose-400" />
              Saved Dream Entries ({dreams.length})
            </h3>

            {dreams.length === 0 ? (
              <div className="text-center py-12 text-slate-500 text-xs">
                No dreams logged yet. Record your night dreams above to store journal notes.
              </div>
            ) : (
              <div className="space-y-3 max-h-[420px] overflow-y-auto pr-1">
                {dreams.map((dream) => (
                  <div key={dream.id} className="bg-slate-950 border border-slate-800 rounded-xl p-4 space-y-2">
                    <div className="flex items-center justify-between">
                      <h4 className="text-xs font-bold text-white">{dream.title}</h4>
                      <span className="text-[10px] text-slate-400">{dream.date}</span>
                    </div>

                    <p className="text-xs text-slate-300 italic">"{dream.content}"</p>

                    {dream.interpretation && (
                      <div className="bg-slate-900 border border-slate-800 rounded-lg p-2.5 text-[11px] text-rose-300">
                        <strong className="text-amber-300 block mb-0.5">Reflection Note:</strong>
                        {dream.interpretation}
                      </div>
                    )}
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>
      )}
    </div>
  );
};
