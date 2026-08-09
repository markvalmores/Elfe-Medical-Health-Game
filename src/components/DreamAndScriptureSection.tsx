import React, { useState } from 'react';
import { BookOpen, Moon, Sparkles, Bookmark, Heart, Send, Cross, Shield, Sun } from 'lucide-react';
import { DreamEntry } from '../types';
import { DAILY_SCRIPTURES } from '../mockData';

interface DreamJournalProps {
  dreams: DreamEntry[];
  onAddDream: (dream: DreamEntry) => void;
}

export const DreamAndScriptureSection: React.FC<DreamJournalProps> = ({ dreams, onAddDream }) => {
  const [activeTab, setActiveTab] = useState<'scriptures' | 'dreams' | 'spiritual'>('scriptures');
  const [dreamTitle, setDreamTitle] = useState('');
  const [dreamContent, setDreamContent] = useState('');
  const [isInterpreting, setIsInterpreting] = useState(false);
  const [lastInterpretation, setLastInterpretation] = useState<string | null>(null);

  const [prayerName, setPrayerName] = useState('');
  const [prayerRequest, setPrayerRequest] = useState('');
  const [prayersList, setPrayersList] = useState<Array<{ id: string; name: string; request: string; date: string }>>([
    {
      id: 'p-1',
      name: 'Mark David V. Valmores',
      request: 'Praying for full physical restoration, divine wisdom in health, and spiritual alignment with Yahusha, Yahua YHWH, and the Holy Spirit.',
      date: new Date().toLocaleDateString(),
    },
  ]);
  const [prayerSubmitted, setPrayerSubmitted] = useState(false);

  const handleInterpretDream = () => {
    if (!dreamTitle || !dreamContent) return;
    setIsInterpreting(true);

    setTimeout(() => {
      setIsInterpreting(false);
      const interpretations = [
        "Your dream reflects a period of spiritual renewal and internal restoration. Like Joseph and Daniel, quiet patience leads to divine clarity.",
        "The imagery in your dream symbolizes protection and steady guidance along your path. Focus on peace and trusting the process.",
        "This dream highlights a desire for harmony and health. Take time for calm reflection and meditative prayer today in Yahusha.",
        "Your vision points toward overcoming minor obstacles with grace. Stay steadfast in hope, purity, and physical wellness."
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

  const handleAddPrayer = (e: React.FormEvent) => {
    e.preventDefault();
    if (!prayerRequest.trim()) return;

    const newP = {
      id: Date.now().toString(),
      name: prayerName.trim() || 'Faithful Soul',
      request: prayerRequest.trim(),
      date: new Date().toLocaleDateString(),
    };

    setPrayersList([newP, ...prayersList]);
    setPrayerName('');
    setPrayerRequest('');
    setPrayerSubmitted(true);
    setTimeout(() => setPrayerSubmitted(false), 3000);
  };

  return (
    <div className="space-y-6">
      {/* Top Toggle Switch with Medical Glass styling */}
      <div className="flex justify-center">
        <div className="medical-glass p-1.5 rounded-2xl flex flex-wrap justify-center items-center gap-1.5 shadow-xl border border-slate-800">
          <button
            onClick={() => setActiveTab('scriptures')}
            className={`px-4 py-2 rounded-xl text-xs font-bold transition flex items-center gap-2 ${
              activeTab === 'scriptures'
                ? 'bg-rose-600 text-white shadow-lg shadow-rose-950/50'
                : 'text-slate-300 hover:text-white'
            }`}
          >
            <BookOpen className="w-4 h-4" />
            Scripture & Health Promises
          </button>
          <button
            onClick={() => setActiveTab('dreams')}
            className={`px-4 py-2 rounded-xl text-xs font-bold transition flex items-center gap-2 ${
              activeTab === 'dreams'
                ? 'bg-rose-600 text-white shadow-lg shadow-rose-950/50'
                : 'text-slate-300 hover:text-white'
            }`}
          >
            <Moon className="w-4 h-4" />
            Dream Reflection Journal
          </button>
          <button
            onClick={() => setActiveTab('spiritual')}
            className={`px-4 py-2 rounded-xl text-xs font-bold transition flex items-center gap-2 ${
              activeTab === 'spiritual'
                ? 'bg-amber-500 text-slate-950 shadow-lg shadow-amber-500/30'
                : 'text-slate-300 hover:text-white'
            }`}
          >
            <Cross className="w-4 h-4" />
            Spiritual Alignment & Prayer
          </button>
        </div>
      </div>

      {activeTab === 'scriptures' && (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {DAILY_SCRIPTURES.map((scripture) => (
            <div
              key={scripture.id}
              className="medical-glass rounded-2xl p-5 shadow-xl space-y-3 relative overflow-hidden border border-slate-800"
            >
              <div className="flex items-center justify-between">
                <span className="px-2.5 py-0.5 rounded-full text-[10px] font-bold bg-rose-500/20 text-rose-300 border border-rose-500/30">
                  {scripture.category}
                </span>
                <span className="text-xs font-bold text-amber-300">{scripture.reference}</span>
              </div>

              <blockquote className="text-sm italic text-slate-100 font-serif leading-relaxed border-l-2 border-rose-500 pl-3">
                &quot;{scripture.verse}&quot;
              </blockquote>

              <div className="bg-slate-950/90 border border-slate-800 rounded-xl p-3 text-xs text-slate-300 leading-relaxed">
                <strong className="text-rose-400 block mb-1">Health & Spiritual Reflection:</strong>
                {scripture.reflection}
              </div>
            </div>
          ))}
        </div>
      )}

      {activeTab === 'dreams' && (
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* New Dream Log Form */}
          <div className="medical-glass rounded-2xl p-6 shadow-xl space-y-4 border border-slate-800">
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
                className="w-full px-3 py-2 bg-slate-950/80 border border-slate-800 rounded-xl text-xs text-white placeholder-slate-500 focus:outline-none focus:border-rose-500"
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
                className="w-full px-3 py-2 bg-slate-950/80 border border-slate-800 rounded-xl text-xs text-white placeholder-slate-500 focus:outline-none focus:border-rose-500 resize-none"
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
          <div className="lg:col-span-2 medical-glass rounded-2xl p-6 shadow-xl space-y-4 border border-slate-800">
            <h3 className="text-base font-bold text-white flex items-center gap-2 border-b border-slate-800 pb-3">
              <Bookmark className="w-5 h-5 text-rose-400" />
              Saved Dream Entries ({dreams.length})
            </h3>

            {dreams.length === 0 ? (
              <div className="text-center py-12 text-slate-400 text-xs">
                No dreams logged yet. Record your night dreams above to store journal notes.
              </div>
            ) : (
              <div className="space-y-3 max-h-[420px] overflow-y-auto pr-1">
                {dreams.map((dream) => (
                  <div key={dream.id} className="bg-slate-950/80 border border-slate-800 rounded-xl p-4 space-y-2">
                    <div className="flex items-center justify-between">
                      <h4 className="text-xs font-bold text-white">{dream.title}</h4>
                      <span className="text-[10px] text-slate-400">{dream.date}</span>
                    </div>

                    <p className="text-xs text-slate-300 italic">&quot;{dream.content}&quot;</p>

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

      {activeTab === 'spiritual' && (
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Divine Blessing & Prayer Input Form */}
          <div className="medical-glass monitor-grid-bg rounded-2xl p-6 shadow-xl space-y-4 border border-amber-500/30">
            <h3 className="text-base font-bold text-white flex items-center gap-2 border-b border-slate-800 pb-3">
              <Cross className="w-5 h-5 text-amber-400" />
              Devotional Prayer & Divine Health
            </h3>

            <p className="text-xs text-amber-200/90 leading-relaxed">
              &quot;May Yahusha, Yahua (YHWH), and the Holy Spirit Lord Jesus Christ refine your body, mind, and spirit into perfect divine wholeness. Amen and Amen.&quot;
            </p>

            <form onSubmit={handleAddPrayer} className="space-y-3 text-xs">
              <div>
                <label className="block text-slate-300 font-semibold mb-1">Your Name / Identity:</label>
                <input
                  type="text"
                  placeholder="e.g. Mark David V. Valmores"
                  value={prayerName}
                  onChange={(e) => setPrayerName(e.target.value)}
                  className="w-full bg-slate-950/80 border border-slate-800 rounded-xl px-3 py-2 text-white placeholder-slate-500 focus:outline-none focus:border-amber-400"
                />
              </div>

              <div>
                <label className="block text-slate-300 font-semibold mb-1">Prayer & Healing Intention:</label>
                <textarea
                  rows={4}
                  required
                  placeholder="Record your prayer for physical strength, family health, and divine guidance..."
                  value={prayerRequest}
                  onChange={(e) => setPrayerRequest(e.target.value)}
                  className="w-full bg-slate-950/80 border border-slate-800 rounded-xl px-3 py-2 text-white placeholder-slate-500 focus:outline-none focus:border-amber-400 resize-none"
                ></textarea>
              </div>

              {prayerSubmitted && (
                <div className="p-2.5 rounded-xl bg-emerald-950 border border-emerald-500/40 text-emerald-300 text-xs font-semibold">
                  Prayer petition logged! May divine grace surround your path. Amen.
                </div>
              )}

              <button
                type="submit"
                className="w-full py-3 rounded-xl bg-amber-500 hover:bg-amber-400 text-slate-950 font-bold text-xs shadow-lg transition flex items-center justify-center gap-2"
              >
                <Sun className="w-4 h-4" />
                Submit Devotional Prayer
              </button>
            </form>
          </div>

          {/* Active Prayer Requests & Devotions List */}
          <div className="lg:col-span-2 medical-glass rounded-2xl p-6 shadow-xl space-y-4 border border-slate-800">
            <h3 className="text-base font-bold text-white flex items-center justify-between border-b border-slate-800 pb-3">
              <span className="flex items-center gap-2">
                <Heart className="w-5 h-5 text-rose-400 fill-rose-400" />
                Faith & Healing Intentions ({prayersList.length})
              </span>
              <span className="text-xs text-amber-300 font-serif italic">Yahusha • Yahua YHWH • Holy Spirit</span>
            </h3>

            <div className="space-y-3 max-h-[420px] overflow-y-auto pr-1">
              {prayersList.map((p) => (
                <div key={p.id} className="bg-slate-950/80 border border-amber-500/20 rounded-xl p-4 space-y-2">
                  <div className="flex items-center justify-between">
                    <span className="text-xs font-bold text-amber-300 flex items-center gap-1.5">
                      <Shield className="w-3.5 h-3.5 text-amber-400" />
                      {p.name}
                    </span>
                    <span className="text-[10px] text-slate-400">{p.date}</span>
                  </div>
                  <p className="text-xs text-slate-200 leading-relaxed font-serif">&quot;{p.request}&quot;</p>
                  <span className="inline-block text-[10px] text-emerald-400 font-bold uppercase tracking-wider">
                    • Blessed in Faith — Amen and Amen
                  </span>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

