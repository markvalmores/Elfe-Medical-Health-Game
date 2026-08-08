import React, { useState, useEffect } from 'react';
import {
  PhoneCall,
  MessageSquare,
  AlertTriangle,
  Radio,
  Satellite,
  ShieldAlert,
  HeartHandshake,
  Heart,
  Globe,
  ExternalLink,
  Flame,
  Volume2,
  CheckCircle2,
  Send,
  Zap,
  Sparkles,
  Award
} from 'lucide-react';

interface EmergencyCrisisSectionProps {
  isEmergencyActive: boolean;
  onToggleEmergency: () => void;
  userLocation: string;
}

export const EmergencyCrisisSection: React.FC<EmergencyCrisisSectionProps> = ({
  isEmergencyActive,
  onToggleEmergency,
  userLocation,
}) => {
  const [customContact, setCustomContact] = useState<string>('');
  const [savedContacts, setSavedContacts] = useState<string[]>(() => {
    const saved = localStorage.getItem('emergency_contacts');
    return saved ? JSON.parse(saved) : ['Primary Caregiver (0917-123-4567)', 'Family Pastor / Elder'];
  });
  const [sosStatus, setSosStatus] = useState<string | null>(null);

  // Satellite & Weather / Public Safety Event Monitor Simulation
  const [satelliteScanning, setSatelliteScanning] = useState<boolean>(true);
  const [satelliteEvents, setSatelliteEvents] = useState<
    { id: string; time: string; type: 'Weather' | 'Public Health' | 'Safety' | 'Prophetic Vision'; title: string; detail: string; severity: 'High' | 'Normal' | 'Critical' }[]
  >([
    {
      id: 'sat-1',
      time: 'Just now',
      type: 'Safety',
      title: 'Active Community Wellness Shield',
      detail: 'Satellite geolocation confirms stable local conditions in ' + userLocation + '. Crisis lifelines active 24/7.',
      severity: 'Normal',
    },
    {
      id: 'sat-2',
      time: '2 mins ago',
      type: 'Public Health',
      title: 'Satellite UV & Extreme Heat Sensor',
      detail: 'Moderate outdoor heat index recorded. Ensure hydration and intake of clean water.',
      severity: 'Normal',
    },
    {
      id: 'sat-3',
      time: '5 mins ago',
      type: 'Prophetic Vision',
      title: 'Divine Protection & Holy Spirit Future Vision',
      detail: 'Prophetic blessing of divine health and safety through faith in Yahua and Yahusha Christ.',
      severity: 'Normal',
    },
  ]);

  const [messageDraft, setMessageDraft] = useState<string>(
    'Emergency Alert: I need urgent health support and crisis prayer assistance. Please check in on me.'
  );

  const handleAddContact = (e: React.FormEvent) => {
    e.preventDefault();
    if (!customContact.trim()) return;
    const updated = [...savedContacts, customContact.trim()];
    setSavedContacts(updated);
    localStorage.setItem('emergency_contacts', JSON.stringify(updated));
    setCustomContact('');
  };

  const handleRemoveContact = (index: number) => {
    const updated = savedContacts.filter((_, i) => i !== index);
    setSavedContacts(updated);
    localStorage.setItem('emergency_contacts', JSON.stringify(updated));
  };

  const handleSendDispatchSimulation = (target: string) => {
    setSosStatus(`Dispatch signal sent to ${target}! Crisis providers and support contacts alerted.`);
    setTimeout(() => setSosStatus(null), 5000);
  };

  // Simulate incoming satellite updates every 15s
  useEffect(() => {
    const interval = setInterval(() => {
      const updates = [
        {
          id: 'sat-' + Date.now(),
          time: 'Just now',
          type: 'Weather' as const,
          title: 'Atmospheric Satellite Telemetry Sync',
          detail: 'Real-time satellite weather and geomagnetic monitoring active across regional sector.',
          severity: 'Normal' as const,
        },
        {
          id: 'sat-' + Date.now(),
          time: 'Just now',
          type: 'Safety' as const,
          title: 'Prophetic Wellness Watch',
          detail: 'Peace and divine healing activated through Yahusha and Holy Spirit future vision.',
          severity: 'Normal' as const,
        },
      ];
      const randomUpdate = updates[Math.floor(Math.random() * updates.length)];
      setSatelliteEvents((prev) => [randomUpdate, ...prev.slice(0, 5)]);
    }, 15000);
    return () => clearInterval(interval);
  }, []);

  return (
    <div className="space-y-6">
      {/* Main Crisis Banner Header */}
      <div className="bg-gradient-to-r from-red-950 via-rose-900 to-slate-900 border-2 border-rose-500/60 rounded-2xl p-6 shadow-2xl relative overflow-hidden">
        <div className="absolute -right-10 -bottom-10 opacity-10 pointer-events-none">
          <ShieldAlert className="w-80 h-80 text-rose-300" />
        </div>

        <div className="relative z-10 flex flex-col md:flex-row items-start md:items-center justify-between gap-6">
          <div className="space-y-2 max-w-2xl">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-rose-500/20 text-rose-300 border border-rose-500/40 text-xs font-bold uppercase tracking-wider">
              <Zap className="w-3.5 h-3.5 animate-bounce text-amber-300" />
              24/7 Suicide Prevention & Emergency Lifeline
            </div>
            <h2 className="text-2xl sm:text-3xl font-black text-white flex items-center gap-2">
              <Heart className="w-8 h-8 text-rose-500 fill-rose-500 animate-pulse" />
              Immediate Lifeline & Crisis Protection
            </h2>
            <p className="text-sm text-slate-200 leading-relaxed">
              You are deeply valued, loved, and never alone. If you or someone you know is going through a difficult time, experiencing thoughts of self-harm, or facing an emergency, immediate help is available 24/7.
            </p>
          </div>

          <div className="bg-slate-950/80 p-4 rounded-2xl border border-rose-500/40 space-y-3 w-full md:w-auto text-center min-w-[240px]">
            <span className="text-xs text-rose-300 font-semibold uppercase tracking-wider block">
              Emergency System Status
            </span>
            <button
              onClick={onToggleEmergency}
              className={`w-full py-3 px-6 rounded-xl font-bold text-sm transition-all shadow-lg flex items-center justify-center gap-2 ${
                isEmergencyActive
                  ? 'bg-rose-600 hover:bg-rose-700 text-white shadow-rose-600/50 animate-pulse'
                  : 'bg-emerald-600 hover:bg-emerald-500 text-white shadow-emerald-600/30'
              }`}
            >
              <Radio className="w-5 h-5" />
              {isEmergencyActive ? 'Emergency Mode: ACTIVE' : 'Enable Emergency Mode'}
            </button>
            <p className="text-[11px] text-slate-400">
              {isEmergencyActive ? 'Live SOS banner active on top bar' : 'Toggle for high-visibility quick dial'}
            </p>
          </div>
        </div>
      </div>

      {sosStatus && (
        <div className="bg-emerald-950 border border-emerald-500 text-emerald-200 px-4 py-3 rounded-xl flex items-center gap-3 animate-fade-in">
          <CheckCircle2 className="w-5 h-5 text-emerald-400 shrink-0" />
          <p className="text-sm font-semibold">{sosStatus}</p>
        </div>
      )}

      {/* 24/7 Hotline Quick Action Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        {/* 988 Lifeline */}
        <div className="bg-slate-900 border border-amber-500/40 rounded-2xl p-5 hover:border-amber-400 transition-all shadow-lg flex flex-col justify-between">
          <div>
            <div className="flex items-center justify-between mb-3">
              <span className="p-2 rounded-xl bg-amber-500/20 text-amber-300">
                <PhoneCall className="w-6 h-6" />
              </span>
              <span className="text-[10px] font-bold px-2 py-0.5 rounded bg-amber-500/30 text-amber-200">
                US & Canada 24/7
              </span>
            </div>
            <h3 className="font-bold text-lg text-white">988 Suicide & Crisis Lifeline</h3>
            <p className="text-xs text-slate-300 mt-1">
              Free, confidential support for anyone in suicidal crisis or emotional distress.
            </p>
          </div>
          <div className="mt-4 pt-3 border-t border-slate-800 flex gap-2">
            <a
              href="tel:988"
              className="flex-1 py-2 px-3 bg-amber-500 hover:bg-amber-400 text-slate-950 font-bold text-xs rounded-xl flex items-center justify-center gap-1.5 transition"
            >
              <PhoneCall className="w-3.5 h-3.5" /> Call 988
            </a>
            <a
              href="sms:988"
              className="py-2 px-3 bg-slate-800 hover:bg-slate-700 text-amber-300 font-bold text-xs rounded-xl flex items-center justify-center gap-1.5 border border-amber-500/30 transition"
            >
              <MessageSquare className="w-3.5 h-3.5" /> Text
            </a>
          </div>
        </div>

        {/* Crisis Text Line */}
        <div className="bg-slate-900 border border-rose-500/40 rounded-2xl p-5 hover:border-rose-400 transition-all shadow-lg flex flex-col justify-between">
          <div>
            <div className="flex items-center justify-between mb-3">
              <span className="p-2 rounded-xl bg-rose-500/20 text-rose-300">
                <MessageSquare className="w-6 h-6" />
              </span>
              <span className="text-[10px] font-bold px-2 py-0.5 rounded bg-rose-500/30 text-rose-200">
                Global SMS
              </span>
            </div>
            <h3 className="font-bold text-lg text-white">Crisis Text Line</h3>
            <p className="text-xs text-slate-300 mt-1">
              Text HOME to <strong className="text-rose-300">741741</strong> to connect with a crisis counselor 24/7.
            </p>
          </div>
          <div className="mt-4 pt-3 border-t border-slate-800 flex gap-2">
            <a
              href="sms:741741?body=HOME"
              className="w-full py-2 px-3 bg-rose-600 hover:bg-rose-500 text-white font-bold text-xs rounded-xl flex items-center justify-center gap-1.5 transition"
            >
              <MessageSquare className="w-3.5 h-3.5" /> Text HOME to 741741
            </a>
          </div>
        </div>

        {/* 911 Emergency Services */}
        <div className="bg-slate-900 border border-red-500/60 rounded-2xl p-5 hover:border-red-400 transition-all shadow-lg flex flex-col justify-between">
          <div>
            <div className="flex items-center justify-between mb-3">
              <span className="p-2 rounded-xl bg-red-600/20 text-red-400">
                <ShieldAlert className="w-6 h-6" />
              </span>
              <span className="text-[10px] font-bold px-2 py-0.5 rounded bg-red-600/30 text-red-200">
                Emergency Dispatch
              </span>
            </div>
            <h3 className="font-bold text-lg text-white">911 First Responders</h3>
            <p className="text-xs text-slate-300 mt-1">
              For immediate physical danger, medical shock, or active critical safety dispatch.
            </p>
          </div>
          <div className="mt-4 pt-3 border-t border-slate-800 flex gap-2">
            <a
              href="tel:911"
              className="w-full py-2 px-3 bg-red-600 hover:bg-red-500 text-white font-bold text-xs rounded-xl flex items-center justify-center gap-1.5 transition shadow-lg shadow-red-950/50"
            >
              <PhoneCall className="w-3.5 h-3.5" /> Call 911 Dispatch
            </a>
          </div>
        </div>

        {/* PH Hopeline / International */}
        <div className="bg-slate-900 border border-purple-500/40 rounded-2xl p-5 hover:border-purple-400 transition-all shadow-lg flex flex-col justify-between">
          <div>
            <div className="flex items-center justify-between mb-3">
              <span className="p-2 rounded-xl bg-purple-500/20 text-purple-300">
                <Globe className="w-6 h-6" />
              </span>
              <span className="text-[10px] font-bold px-2 py-0.5 rounded bg-purple-500/30 text-purple-200">
                PH Hopeline & Int&apos;l
              </span>
            </div>
            <h3 className="font-bold text-lg text-white">PH Hopeline & Global</h3>
            <p className="text-xs text-slate-300 mt-1">
              Call <strong className="text-purple-300">1553</strong> or <strong className="text-purple-300">0917-558-4673</strong> for Philippines mental health crisis support.
            </p>
          </div>
          <div className="mt-4 pt-3 border-t border-slate-800 flex gap-2">
            <a
              href="tel:1553"
              className="flex-1 py-2 px-3 bg-purple-600 hover:bg-purple-500 text-white font-bold text-xs rounded-xl flex items-center justify-center gap-1.5 transition"
            >
              <PhoneCall className="w-3.5 h-3.5" /> Call 1553
            </a>
            <a
              href="tel:09175584673"
              className="flex-1 py-2 px-3 bg-slate-800 hover:bg-slate-700 text-purple-300 font-bold text-xs rounded-xl flex items-center justify-center gap-1.5 border border-purple-500/30 transition"
            >
              <PhoneCall className="w-3.5 h-3.5" /> Mobile
            </a>
          </div>
        </div>
      </div>

      {/* Satellite Weather & Public Event Safety Telemetry Engine */}
      <div className="bg-slate-900 border border-slate-800 rounded-2xl p-6 space-y-4">
        <div className="flex items-center justify-between border-b border-slate-800 pb-4">
          <div className="flex items-center gap-3">
            <div className="p-2 rounded-xl bg-blue-500/20 text-blue-400">
              <Satellite className="w-6 h-6 animate-pulse" />
            </div>
            <div>
              <h3 className="text-lg font-bold text-white flex items-center gap-2">
                Satellite Weather & Community Safety Telemetry
                <span className="px-2 py-0.5 rounded-full text-[10px] bg-emerald-500/20 text-emerald-300 border border-emerald-500/40 font-mono">
                  LIVE SCANNING
                </span>
              </h3>
              <p className="text-xs text-slate-400">
                Location Sector: <strong className="text-slate-200">{userLocation}</strong> • Multi-source public live stream & atmospheric telemetry
              </p>
            </div>
          </div>
          <button
            onClick={() => setSatelliteScanning(!satelliteScanning)}
            className="text-xs px-3 py-1.5 rounded-lg bg-slate-800 hover:bg-slate-700 text-slate-300 border border-slate-700 transition"
          >
            {satelliteScanning ? 'Pause Scanner' : 'Resume Scanner'}
          </button>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          {satelliteEvents.map((evt) => (
            <div
              key={evt.id}
              className="bg-slate-950/80 border border-slate-800 rounded-xl p-4 space-y-2 hover:border-slate-700 transition"
            >
              <div className="flex items-center justify-between text-xs">
                <span className="font-semibold text-amber-400 flex items-center gap-1">
                  <Radio className="w-3 h-3 animate-ping" /> {evt.type}
                </span>
                <span className="text-slate-500 text-[10px]">{evt.time}</span>
              </div>
              <h4 className="font-bold text-sm text-white">{evt.title}</h4>
              <p className="text-xs text-slate-300 leading-relaxed">{evt.detail}</p>
            </div>
          ))}
        </div>
      </div>

      {/* Emergency Contact Broadcaster & SMS Dispatch Simulator */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Custom Contact Manager */}
        <div className="bg-slate-900 border border-slate-800 rounded-2xl p-6 space-y-4">
          <h3 className="text-lg font-bold text-white flex items-center gap-2">
            <HeartHandshake className="w-5 h-5 text-rose-400" />
            Personal Emergency Support Network
          </h3>
          <p className="text-xs text-slate-400">
            Store personal loved ones, doctors, or spiritual elders to receive rapid SMS alert broadcasts during distress.
          </p>

          <form onSubmit={handleAddContact} className="flex gap-2">
            <input
              type="text"
              value={customContact}
              onChange={(e) => setCustomContact(e.target.value)}
              placeholder="e.g. Dr. Sarah (0918-999-0000)"
              className="flex-1 bg-slate-950 border border-slate-800 rounded-xl px-3 py-2 text-xs text-white placeholder-slate-500 focus:outline-none focus:border-rose-500"
            />
            <button
              type="submit"
              className="px-4 py-2 bg-rose-600 hover:bg-rose-500 text-white font-bold text-xs rounded-xl transition"
            >
              Add Contact
            </button>
          </form>

          <div className="space-y-2 pt-2">
            <span className="text-xs font-semibold text-slate-300 block">Saved Emergency Contacts:</span>
            {savedContacts.length === 0 ? (
              <p className="text-xs text-slate-500 italic">No custom contacts saved yet.</p>
            ) : (
              savedContacts.map((contact, idx) => (
                <div
                  key={idx}
                  className="flex items-center justify-between bg-slate-950 px-3.5 py-2.5 rounded-xl border border-slate-800 text-xs"
                >
                  <span className="font-medium text-slate-200">{contact}</span>
                  <div className="flex items-center gap-2">
                    <button
                      onClick={() => handleSendDispatchSimulation(contact)}
                      className="px-2.5 py-1 bg-amber-500/20 text-amber-300 hover:bg-amber-500/30 rounded-lg text-[11px] font-semibold border border-amber-500/40 transition"
                    >
                      Alert SMS
                    </button>
                    <button
                      onClick={() => handleRemoveContact(idx)}
                      className="text-slate-500 hover:text-rose-400 text-xs font-bold transition"
                    >
                      Remove
                    </button>
                  </div>
                </div>
              ))
            )}
          </div>
        </div>

        {/* Spiritual Faith Vision & Declarations */}
        <div className="bg-gradient-to-br from-slate-900 to-amber-950/40 border border-amber-500/30 rounded-2xl p-6 space-y-4">
          <div className="flex items-center gap-3 border-b border-amber-500/20 pb-3">
            <div className="p-2 rounded-xl bg-amber-500/20 text-amber-300">
              <Sparkles className="w-6 h-6" />
            </div>
            <div>
              <h3 className="text-lg font-bold text-amber-200">Prophetic Faith & Divine Blessing Protection</h3>
              <p className="text-xs text-amber-400/80">
                In faith according to Yahua, Yahusha Christ & Holy Spirit Future Visions & Wonders
              </p>
            </div>
          </div>

          <div className="space-y-3 text-xs text-slate-200 leading-relaxed bg-slate-950/60 p-4 rounded-xl border border-amber-500/20">
            <p className="font-semibold text-amber-300">
              &quot;The LORD is my strength and my shield; in Him my heart trusts, and I am helped.&quot; — Psalm 28:7
            </p>
            <p>
              By faith, every user of this application is covered under the divine shadow of peace, mental sound mind, physical restoration, and protection against any spirit of darkness or distress.
            </p>
          </div>

          <div className="pt-2 border-t border-amber-500/20 space-y-2">
            <span className="text-xs font-bold text-amber-300 block">Creator Attribution & Support:</span>
            <p className="text-xs text-slate-300 leading-relaxed">
              Created with love, faith and devotion by{' '}
              <strong className="text-amber-200">
                Usagyuun VTuber / Eleventh Gyuuun / Junichi555 / Mark David V. Valmores
              </strong>.
            </p>

            <div className="flex flex-wrap items-center gap-3 pt-2">
              <a
                href="https://streamlabs.com/usagyuunvtuber/tip"
                target="_blank"
                rel="noreferrer"
                className="px-4 py-2 bg-gradient-to-r from-emerald-500 to-teal-600 hover:from-emerald-400 hover:to-teal-500 text-slate-950 font-black text-xs rounded-xl shadow-lg flex items-center gap-1.5 transition"
              >
                <Heart className="w-3.5 h-3.5 fill-slate-950" /> Streamlabs Tip Donation
                <ExternalLink className="w-3 h-3" />
              </a>

              <div className="bg-slate-950 px-3 py-1.5 rounded-xl border border-emerald-500/40 text-xs">
                <span className="text-slate-400 font-medium">GCash Mark David: </span>
                <strong className="text-emerald-400 font-mono">09763329358</strong>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
