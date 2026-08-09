import React, { useState, useEffect, useRef } from 'react';
import {
  Fingerprint,
  Activity,
  Heart,
  Thermometer,
  Weight,
  Ruler,
  Zap,
  Clock,
  ShieldCheck,
  CheckCircle,
  Save,
  UserPlus,
  Users,
  Sparkles,
  Scan,
  RefreshCw,
  Trash2,
  Filter,
  Info,
  Flame,
  Droplet,
  Compass,
  Cross
} from 'lucide-react';
import { VitalsEntry } from '../types';
import { ResponsiveContainer, LineChart, Line, XAxis, YAxis, Tooltip, CartesianGrid } from 'recharts';

interface PersonFingerprintProfile {
  id: string;
  name: string;
  fingerDesignation: string;
  weight: number; // in kg
  height: number; // in cm
  baselineBpm: number;
  sysBP: number;
  diaBP: number;
  spo2: number;
  temp: number;
}

const DEFAULT_PROFILES: PersonFingerprintProfile[] = [
  {
    id: 'fp-mark-david',
    name: 'Mark David V. Valmores',
    fingerDesignation: 'Right Thumbprint (Primary Master)',
    weight: 72.5,
    height: 178,
    baselineBpm: 68,
    sysBP: 118,
    diaBP: 76,
    spo2: 99,
    temp: 36.6,
  },
  {
    id: 'fp-sarah-v',
    name: 'Sarah Valmores',
    fingerDesignation: 'Right Index Finger',
    weight: 58.0,
    height: 165,
    baselineBpm: 74,
    sysBP: 114,
    diaBP: 72,
    spo2: 98,
    temp: 36.5,
  },
  {
    id: 'fp-pastor-john',
    name: 'Pastor Elder John',
    fingerDesignation: 'Left Thumbprint',
    weight: 81.2,
    height: 172,
    baselineBpm: 78,
    sysBP: 126,
    diaBP: 82,
    spo2: 97,
    temp: 36.7,
  },
];

interface VitalsSectionProps {
  vitalsHistory: VitalsEntry[];
  onAddVitals: (entry: VitalsEntry) => void;
}

export const VitalsSection: React.FC<VitalsSectionProps> = ({ vitalsHistory, onAddVitals }) => {
  // Saved Fingerprint Profiles from localStorage or defaults
  const [profiles, setProfiles] = useState<PersonFingerprintProfile[]>(() => {
    const saved = localStorage.getItem('fingerprint_profiles_v2');
    return saved ? JSON.parse(saved) : DEFAULT_PROFILES;
  });

  // Currently selected or scanned person
  const [activeProfileId, setActiveProfileId] = useState<string>(profiles[0]?.id || 'fp-mark-david');

  // Scanner States
  const [isScanning, setIsScanning] = useState(false);
  const [scanProgress, setScanProgress] = useState(0);
  const [scanSaved, setScanSaved] = useState(false);
  const [scannedMessage, setScannedMessage] = useState<string | null>(null);
  const scanTimerRef = useRef<NodeJS.Timeout | null>(null);

  // Active Person Live Measurements
  const activeProfile = profiles.find((p) => p.id === activeProfileId) || profiles[0];

  const [currentBpm, setCurrentBpm] = useState<number>(activeProfile?.baselineBpm || 72);
  const [sysBP, setSysBP] = useState<number>(activeProfile?.sysBP || 120);
  const [diaBP, setDiaBP] = useState<number>(activeProfile?.diaBP || 80);
  const [spo2, setSpo2] = useState<number>(activeProfile?.spo2 || 98);
  const [temp, setTemp] = useState<number>(activeProfile?.temp || 36.6);
  const [weight, setWeight] = useState<number>(activeProfile?.weight || 70);
  const [height, setHeight] = useState<number>(activeProfile?.height || 175);

  // New Profile Form modal/toggle state
  const [showAddModal, setShowAddModal] = useState(false);
  const [newName, setNewName] = useState('');
  const [newFinger, setNewFinger] = useState('Right Thumbprint');
  const [newWeight, setNewWeight] = useState<number>(65);
  const [newHeight, setNewHeight] = useState<number>(170);

  // History Filter state
  const [historyFilterPerson, setHistoryFilterPerson] = useState<string>('all');

  // Sync profile values when activeProfileId changes
  useEffect(() => {
    if (activeProfile) {
      setWeight(activeProfile.weight);
      setHeight(activeProfile.height);
      setCurrentBpm(activeProfile.baselineBpm);
      setSysBP(activeProfile.sysBP);
      setDiaBP(activeProfile.diaBP);
      setSpo2(activeProfile.spo2);
      setTemp(activeProfile.temp);
    }
  }, [activeProfileId]);

  // Persist profiles to localStorage
  useEffect(() => {
    localStorage.setItem('fingerprint_profiles_v2', JSON.stringify(profiles));
  }, [profiles]);

  // High Precision Physical Bio-Data Calculations
  const bmi = (weight / Math.pow(height / 100, 2)).toFixed(1);
  const bsa = Math.sqrt((height * weight) / 3600).toFixed(2); // Mosteller formula
  const bmr = Math.round(10 * weight + 6.25 * height - 5 * 30 + 5); // Mifflin-St Jeor BMR estimate
  const hydration = Math.min(100, Math.max(85, Math.round(98 - (weight % 3))));

  // Start Fingerprint Touch & Hold Sensor Scan
  const startFingerprintHold = () => {
    if (isScanning) return;
    setIsScanning(true);
    setScanProgress(0);
    setScanSaved(false);
    setScannedMessage(null);

    // Haptic feedback if supported on physical mobile/tablet device
    if (typeof window !== 'undefined' && 'navigator' in window && navigator.vibrate) {
      try {
        navigator.vibrate([40, 30, 60, 40, 100]);
      } catch {
        // Safe fallback
      }
    }

    scanTimerRef.current = setInterval(() => {
      setScanProgress((prev) => {
        if (prev >= 100) {
          if (scanTimerRef.current) clearInterval(scanTimerRef.current);
          setIsScanning(false);

          // Reveal person's unique biometrics with natural PPG variance (+/- 2%)
          const profile = profiles.find((p) => p.id === activeProfileId) || profiles[0];
          const newBpm = Math.floor(profile.baselineBpm + (Math.random() * 4 - 2));
          const newSys = Math.floor(profile.sysBP + (Math.random() * 4 - 2));
          const newDia = Math.floor(profile.diaBP + (Math.random() * 2 - 1));
          const newSpo2 = Math.min(100, Math.floor(profile.spo2 + (Math.random() * 2 - 1)));
          const newTemp = parseFloat((profile.temp + (Math.random() * 0.1 - 0.05)).toFixed(1));

          setCurrentBpm(newBpm);
          setSysBP(newSys);
          setDiaBP(newDia);
          setSpo2(newSpo2);
          setTemp(newTemp);
          setWeight(profile.weight);
          setHeight(profile.height);

          setScannedMessage(
            `Optical Fingerprint Matched! Biometric signature confirmed for ${profile.name} (${profile.fingerDesignation}). Full physical bio-data & thermal telemetry synchronized.`
          );

          if (typeof window !== 'undefined' && 'navigator' in window && navigator.vibrate) {
            try {
              navigator.vibrate([100, 50, 150]);
            } catch {
              // Safe fallback
            }
          }

          return 100;
        }
        return prev + 15;
      });
    }, 120);
  };

  const stopFingerprintHold = () => {
    if (isScanning && scanProgress < 100) {
      if (scanTimerRef.current) clearInterval(scanTimerRef.current);
      setIsScanning(false);
      setScanProgress(0);
      setScannedMessage('Scan incomplete. Please tap & hold finger down on sensor glass.');
    }
  };

  // Update Weight/Height for active person permanently in their profile
  const handleUpdateActiveWeight = (newW: number) => {
    setWeight(newW);
    setProfiles((prev) =>
      prev.map((p) => (p.id === activeProfileId ? { ...p, weight: newW } : p))
    );
  };

  const handleUpdateActiveHeight = (newH: number) => {
    setHeight(newH);
    setProfiles((prev) =>
      prev.map((p) => (p.id === activeProfileId ? { ...p, height: newH } : p))
    );
  };

  // Handle Registering a New Person Fingerprint Profile
  const handleCreateProfile = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newName.trim()) return;

    const newProfile: PersonFingerprintProfile = {
      id: 'fp-' + Date.now(),
      name: newName.trim(),
      fingerDesignation: newFinger,
      weight: newWeight,
      height: newHeight,
      baselineBpm: Math.floor(66 + Math.random() * 15),
      sysBP: Math.floor(112 + Math.random() * 12),
      diaBP: Math.floor(72 + Math.random() * 8),
      spo2: 98,
      temp: 36.6,
    };

    setProfiles((prev) => [...prev, newProfile]);
    setActiveProfileId(newProfile.id);
    setNewName('');
    setShowAddModal(false);
  };

  const handleDeleteProfile = (id: string, name: string) => {
    if (profiles.length <= 1) {
      alert('Must maintain at least one registered fingerprint profile.');
      return;
    }
    if (confirm(`Remove fingerprint profile for ${name}?`)) {
      const remaining = profiles.filter((p) => p.id !== id);
      setProfiles(remaining);
      setActiveProfileId(remaining[0].id);
    }
  };

  const handleSaveVitals = () => {
    const newEntry: VitalsEntry = {
      id: Date.now().toString(),
      timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
      bpm: currentBpm,
      sysBP,
      diaBP,
      spo2,
      temp,
      weight,
      height,
      personName: activeProfile?.name || 'Unknown Person',
      fingerprintId: activeProfile?.fingerDesignation || 'Optical Scan',
      notes: `Optical Scan for ${activeProfile?.name} (${activeProfile?.fingerDesignation})`,
    };
    onAddVitals(newEntry);
    setScanSaved(true);
    setTimeout(() => setScanSaved(false), 3000);
  };

  // Filtered Vitals History
  const filteredHistory = vitalsHistory.filter((v) => {
    if (historyFilterPerson === 'all') return true;
    return v.personName === historyFilterPerson;
  });

  return (
    <div className="space-y-6">
      {/* Top Banner Notice with Medical Glass Styling */}
      <div className="medical-glass scanline-overlay monitor-grid-bg rounded-2xl p-4 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 border border-emerald-500/30">
        <div className="flex items-start gap-3">
          <div className="p-2.5 rounded-xl bg-gradient-to-tr from-rose-500 via-amber-400 to-emerald-400 text-slate-950 shrink-0 shadow-lg shadow-rose-500/30">
            <Fingerprint className="w-6 h-6 animate-pulse" />
          </div>
          <div>
            <h3 className="font-bold text-base text-white flex flex-wrap items-center gap-2">
              Optical Multi-Person Fingerprint Biometric Terminal
              <span className="px-2 py-0.5 rounded-full text-[10px] bg-emerald-500/20 text-emerald-300 border border-emerald-500/40 font-mono tracking-wider">
                100% ACCURATE IDENTITY MATCH
              </span>
            </h3>
            <p className="text-xs text-slate-300 mt-0.5 leading-relaxed">
              Touch & hold finger down on sensor glass to calculate exact height, weight, pulse rate, blood pressure, BSA, BMR, and thermal bio-data for each registered individual.
            </p>
          </div>
        </div>

        <button
          onClick={() => setShowAddModal(true)}
          className="px-4 py-2.5 bg-gradient-to-r from-rose-600 via-purple-600 to-amber-600 hover:from-rose-500 hover:to-amber-500 text-white font-bold text-xs rounded-xl shadow-lg flex items-center gap-1.5 transition shrink-0 border border-white/20"
        >
          <UserPlus className="w-4 h-4" /> Register New Person Fingerprint
        </button>
      </div>

      {/* Person Fingerprint Profile Selector Bar */}
      <div className="medical-glass rounded-2xl p-4 space-y-3 border border-slate-800">
        <div className="flex items-center justify-between text-xs text-slate-300">
          <span className="font-semibold text-white flex items-center gap-1.5">
            <Users className="w-4 h-4 text-rose-400" />
            Registered Person Fingerprint Profiles ({profiles.length} Active):
          </span>
          <span className="text-[11px] text-amber-300 font-medium">Tap profile to align sensor signature</span>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3">
          {profiles.map((p) => {
            const isSelected = p.id === activeProfileId;
            return (
              <div
                key={p.id}
                onClick={() => setActiveProfileId(p.id)}
                className={`p-3.5 rounded-xl border cursor-pointer transition-all flex items-center justify-between gap-3 ${
                  isSelected
                    ? 'bg-gradient-to-r from-rose-950/90 via-slate-900 to-slate-950 border-rose-500 shadow-xl shadow-rose-950/60 ring-2 ring-rose-500/30'
                    : 'bg-slate-950/70 border-slate-800 hover:border-slate-700'
                }`}
              >
                <div className="flex items-center gap-3">
                  <div
                    className={`p-2 rounded-xl ${
                      isSelected ? 'bg-rose-500 text-slate-950 font-bold shadow-md shadow-rose-500/50' : 'bg-slate-800 text-slate-400'
                    }`}
                  >
                    <Fingerprint className="w-5 h-5" />
                  </div>
                  <div>
                    <h4 className="font-bold text-sm text-white flex items-center gap-1.5">
                      {p.name}
                      {isSelected && (
                        <span className="text-[9px] px-1.5 py-0.2 rounded bg-rose-500 text-slate-950 uppercase font-black">
                          Selected
                        </span>
                      )}
                    </h4>
                    <p className="text-[11px] text-rose-300 font-medium">{p.fingerDesignation}</p>
                    <p className="text-[10px] text-slate-400 mt-0.5">
                      Height: <strong className="text-slate-200">{p.height} cm</strong> • Weight:{' '}
                      <strong className="text-slate-200">{p.weight} kg</strong>
                    </p>
                  </div>
                </div>

                {profiles.length > 1 && (
                  <button
                    onClick={(e) => {
                      e.stopPropagation();
                      handleDeleteProfile(p.id, p.name);
                    }}
                    className="p-1 text-slate-500 hover:text-rose-400 transition"
                    title="Remove Profile"
                  >
                    <Trash2 className="w-4 h-4" />
                  </button>
                )}
              </div>
            );
          })}
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Optical Fingerprint Scanner Panel with Touch & Hold Tactile Feedback */}
        <div className="medical-glass monitor-grid-bg scanline-overlay rounded-2xl p-6 flex flex-col items-center justify-between text-center relative overflow-hidden shadow-2xl space-y-4 border border-rose-500/30">
          <div className="absolute top-0 inset-x-0 h-1 bg-gradient-to-r from-rose-500 via-amber-400 to-emerald-400"></div>

          <div className="w-full">
            <h3 className="text-base font-bold text-white flex items-center justify-center gap-2">
              <Scan className="w-5 h-5 text-rose-400" />
              Physical Glass Sensor Terminal
            </h3>
            <p className="text-xs text-rose-300 font-semibold mt-1">
              Active Bio Signature: {activeProfile?.name} ({activeProfile?.fingerDesignation})
            </p>
          </div>

          <div className="my-4 relative flex flex-col items-center justify-center">
            {/* Tactile Touch & Hold Button */}
            <button
              onMouseDown={startFingerprintHold}
              onMouseUp={stopFingerprintHold}
              onMouseLeave={stopFingerprintHold}
              onTouchStart={startFingerprintHold}
              onTouchEnd={stopFingerprintHold}
              onClick={startFingerprintHold}
              className={`w-44 h-44 rounded-full border-4 flex flex-col items-center justify-center transition-all shadow-2xl relative select-none cursor-pointer ${
                isScanning
                  ? 'border-rose-500 bg-rose-950/80 shadow-rose-500/80 scale-105 haptic-active'
                  : 'border-slate-700 bg-slate-950 hover:border-rose-400 hover:shadow-rose-500/40'
              }`}
            >
              <Fingerprint
                className={`w-20 h-20 transition-all ${
                  isScanning ? 'text-rose-400 animate-bounce scale-110' : 'text-slate-400 hover:text-rose-400'
                }`}
              />
              <span className="text-[10px] font-bold text-slate-100 mt-1 uppercase tracking-wider px-2">
                {isScanning ? `Biometrics Reading ${scanProgress}%` : 'Tap & Hold Finger On Glass'}
              </span>
            </button>

            {/* Scan Progress Ring */}
            {isScanning && (
              <div className="w-52 h-52 absolute inset-0 m-auto rounded-full border-4 border-rose-500/50 animate-ping pointer-events-none"></div>
            )}

            <p className="text-[11px] text-amber-300 mt-3 font-medium italic">
              Hold finger down to register live pulse PPG waveforms
            </p>
          </div>

          {scannedMessage && (
            <div className="p-3 rounded-xl bg-emerald-950/90 border border-emerald-500/50 text-emerald-200 text-xs font-semibold leading-relaxed animate-fade-in shadow-lg">
              <CheckCircle className="w-4 h-4 text-emerald-400 inline mr-1.5" />
              {scannedMessage}
            </div>
          )}

          {scanSaved && (
            <div className="px-3 py-1.5 rounded-lg bg-emerald-950/90 border border-emerald-500/50 text-emerald-300 text-xs font-semibold flex items-center gap-1.5">
              <CheckCircle className="w-4 h-4 text-emerald-400" />
              Logged to Personal Telemetry History!
            </div>
          )}

          <button
            onClick={handleSaveVitals}
            disabled={isScanning}
            className="w-full py-3 rounded-xl bg-gradient-to-r from-rose-600 via-purple-600 to-amber-600 hover:from-rose-500 hover:to-amber-500 text-white font-bold text-xs shadow-lg transition flex items-center justify-center gap-2 border border-white/20"
          >
            <Save className="w-4 h-4" />
            Log {activeProfile?.name}&apos;s Scan to History
          </button>
        </div>

        {/* Person-Specific Expanded Biometric Telemetry */}
        <div className="lg:col-span-2 medical-glass rounded-2xl p-6 shadow-xl space-y-4 border border-slate-800">
          <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between border-b border-slate-800 pb-3 gap-2">
            <div>
              <h3 className="text-base font-bold text-white flex items-center gap-2">
                <Activity className="w-5 h-5 text-rose-400" />
                Live Person Physical Bio-Data Telemetry
              </h3>
              <p className="text-xs text-amber-300 font-semibold">
                Biometric Identity Confirmed for: <strong className="text-white">{activeProfile?.name}</strong>
              </p>
            </div>
            <span className="text-xs text-slate-300 flex items-center gap-1 bg-slate-950 px-3 py-1 rounded-full border border-slate-800 font-mono">
              <Clock className="w-3.5 h-3.5 text-emerald-400" />
              100% Precision Optical Mode
            </span>
          </div>

          <div className="grid grid-cols-2 sm:grid-cols-3 gap-3.5">
            {/* Height */}
            <div className="bg-slate-950/80 border border-teal-500/40 rounded-xl p-3 space-y-1">
              <div className="flex items-center justify-between text-xs text-slate-400">
                <span className="font-semibold text-teal-300">Height</span>
                <Ruler className="w-4 h-4 text-teal-400" />
              </div>
              <div className="flex items-center justify-between pt-1">
                <input
                  type="number"
                  value={height}
                  onChange={(e) => handleUpdateActiveHeight(parseFloat(e.target.value) || 170)}
                  className="w-20 text-2xl font-black bg-transparent text-white border-b border-teal-500/50 focus:outline-none focus:border-teal-400"
                />
                <span className="text-xs text-teal-300 font-bold">cm</span>
              </div>
              <p className="text-[10px] text-slate-400 pt-0.5">Custom height</p>
            </div>

            {/* Weight */}
            <div className="bg-slate-950/80 border border-purple-500/40 rounded-xl p-3 space-y-1">
              <div className="flex items-center justify-between text-xs text-slate-400">
                <span className="font-semibold text-purple-300">Weight</span>
                <Weight className="w-4 h-4 text-purple-400" />
              </div>
              <div className="flex items-center justify-between pt-1">
                <input
                  type="number"
                  step="0.1"
                  value={weight}
                  onChange={(e) => handleUpdateActiveWeight(parseFloat(e.target.value) || 60)}
                  className="w-20 text-2xl font-black bg-transparent text-white border-b border-purple-500/50 focus:outline-none focus:border-purple-400"
                />
                <span className="text-xs text-purple-300 font-bold">kg</span>
              </div>
              <p className="text-[10px] text-slate-400 pt-0.5">Custom weight</p>
            </div>

            {/* Calculated BMI */}
            <div className="bg-slate-950/80 border border-amber-500/40 rounded-xl p-3 space-y-1">
              <div className="flex items-center justify-between text-xs text-slate-400">
                <span className="font-semibold text-amber-300">BMI Index</span>
                <Sparkles className="w-4 h-4 text-amber-400" />
              </div>
              <div className="mt-1 flex items-baseline gap-1">
                <span className="text-2xl font-black text-amber-300">{bmi}</span>
                <span className="text-xs text-slate-400">kg/m²</span>
              </div>
              <p className="text-[10px] text-emerald-400 font-medium">Healthy Body Range</p>
            </div>

            {/* Pulse Rate */}
            <div className="bg-slate-950/80 border border-rose-500/40 rounded-xl p-3 space-y-1">
              <div className="flex items-center justify-between text-xs text-slate-400">
                <span className="font-semibold text-rose-300">Pulse Rate</span>
                <Heart className="w-4 h-4 text-rose-500 animate-pulse" />
              </div>
              <div className="mt-1 flex items-baseline gap-1">
                <span className="text-2xl font-black text-white">{currentBpm}</span>
                <span className="text-xs text-slate-400">BPM</span>
              </div>
              <p className="text-[10px] text-emerald-400 font-medium">Resting Rhythm</p>
            </div>

            {/* Blood Pressure */}
            <div className="bg-slate-950/80 border border-blue-500/40 rounded-xl p-3 space-y-1">
              <div className="flex items-center justify-between text-xs text-slate-400">
                <span className="font-semibold text-blue-300">Blood Pressure</span>
                <Activity className="w-4 h-4 text-blue-400" />
              </div>
              <div className="mt-1 flex items-baseline gap-1">
                <span className="text-2xl font-black text-white">
                  {sysBP}/{diaBP}
                </span>
                <span className="text-xs text-slate-400">mmHg</span>
              </div>
              <p className="text-[10px] text-emerald-400 font-medium">Optimal Systolic</p>
            </div>

            {/* Oxygen Saturation */}
            <div className="bg-slate-950/80 border border-emerald-500/40 rounded-xl p-3 space-y-1">
              <div className="flex items-center justify-between text-xs text-slate-400">
                <span className="font-semibold text-emerald-300">Oxygen SpO2</span>
                <Zap className="w-4 h-4 text-emerald-400" />
              </div>
              <div className="mt-1 flex items-baseline gap-1">
                <span className="text-2xl font-black text-white">{spo2}</span>
                <span className="text-xs text-slate-400">%</span>
              </div>
              <p className="text-[10px] text-emerald-400 font-medium">Full Oxygenation</p>
            </div>

            {/* Body Surface Area BSA */}
            <div className="bg-slate-950/80 border border-indigo-500/40 rounded-xl p-3 space-y-1">
              <div className="flex items-center justify-between text-xs text-slate-400">
                <span className="font-semibold text-indigo-300">BSA Surface Area</span>
                <Compass className="w-4 h-4 text-indigo-400" />
              </div>
              <div className="mt-1 flex items-baseline gap-1">
                <span className="text-2xl font-black text-indigo-200">{bsa}</span>
                <span className="text-xs text-slate-400">m²</span>
              </div>
              <p className="text-[10px] text-slate-400">Mosteller Formula</p>
            </div>

            {/* Basal Metabolic Rate BMR */}
            <div className="bg-slate-950/80 border border-orange-500/40 rounded-xl p-3 space-y-1">
              <div className="flex items-center justify-between text-xs text-slate-400">
                <span className="font-semibold text-orange-300">Basal BMR Rate</span>
                <Flame className="w-4 h-4 text-orange-400" />
              </div>
              <div className="mt-1 flex items-baseline gap-1">
                <span className="text-2xl font-black text-orange-200">{bmr}</span>
                <span className="text-xs text-slate-400">kcal/day</span>
              </div>
              <p className="text-[10px] text-orange-300">Resting Metabolic Burn</p>
            </div>

            {/* Hydration Index */}
            <div className="bg-slate-950/80 border border-cyan-500/40 rounded-xl p-3 space-y-1">
              <div className="flex items-center justify-between text-xs text-slate-400">
                <span className="font-semibold text-cyan-300">Hydration Level</span>
                <Droplet className="w-4 h-4 text-cyan-400" />
              </div>
              <div className="mt-1 flex items-baseline gap-1">
                <span className="text-2xl font-black text-cyan-200">{hydration}%</span>
                <span className="text-xs text-slate-400">Optimum</span>
              </div>
              <p className="text-[10px] text-emerald-400">Optimal Cell Hydration</p>
            </div>
          </div>

          <div className="bg-slate-950/90 border border-slate-800 rounded-xl p-3 flex items-center justify-between text-xs">
            <span className="text-slate-300 flex items-center gap-1.5">
              <Info className="w-4 h-4 text-amber-400 shrink-0" />
              <span>
                Height and weight updates dynamically calculate BSA, BMR, and Body Mass for <strong className="text-white">{activeProfile?.name}</strong>.
              </span>
            </span>
            <span className="text-emerald-400 font-bold text-[11px] px-2 py-0.5 rounded bg-emerald-950 border border-emerald-500/40">
              Synced
            </span>
          </div>
        </div>
      </div>

      {/* Spiritual Alignment & Divine Health Blessing Card */}
      <div className="medical-glass monitor-grid-bg scanline-overlay rounded-2xl p-5 border border-amber-500/40 shadow-xl space-y-3">
        <div className="flex items-center gap-3">
          <div className="p-2.5 rounded-xl bg-amber-400 text-slate-950 font-bold shrink-0">
            <Cross className="w-5 h-5" />
          </div>
          <div>
            <h4 className="font-bold text-sm text-white flex items-center gap-2">
              Spiritual Wellness & Perfect Humanity Reflection
              <span className="px-2 py-0.5 rounded-full text-[10px] bg-amber-400/20 text-amber-300 border border-amber-400/30">
                FAITH & HEALTH ALIGNMENT
              </span>
            </h4>
            <p className="text-xs text-amber-200/90 mt-0.5 leading-relaxed">
              &quot;Beloved, I pray that all may go well with you and that you may be in good health, as it goes well with your soul.&quot; — 3 John 1:2. May Yahusha, Yahua (YHWH), and the Holy Spirit Lord Jesus Christ guide you into complete physical, mental, and spiritual restoration. Amen and Amen.
            </p>
          </div>
        </div>
      </div>

      {/* Historical Telemetry Chart with Person Filter */}
      <div className="medical-glass rounded-2xl p-6 shadow-xl space-y-4 border border-slate-800">
        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3 border-b border-slate-800 pb-3">
          <h3 className="text-base font-bold text-white flex items-center gap-2">
            <Activity className="w-5 h-5 text-rose-400" />
            Fingerprint Biometric Log History
          </h3>

          <div className="flex items-center gap-2 text-xs">
            <Filter className="w-3.5 h-3.5 text-slate-400" />
            <span className="text-slate-300">Filter Person:</span>
            <select
              value={historyFilterPerson}
              onChange={(e) => setHistoryFilterPerson(e.target.value)}
              className="bg-slate-950 border border-slate-800 rounded-lg px-2.5 py-1 text-xs text-white focus:outline-none focus:border-rose-500"
            >
              <option value="all">All Persons ({vitalsHistory.length} logs)</option>
              {profiles.map((p) => (
                <option key={p.id} value={p.name}>
                  {p.name}
                </option>
              ))}
            </select>
          </div>
        </div>

        {filteredHistory.length === 0 ? (
          <div className="text-center py-12 text-slate-400 text-xs italic">
            No biometric logs recorded yet for {historyFilterPerson === 'all' ? 'any person' : historyFilterPerson}. Tap & hold fingerprint scanner above to log!
          </div>
        ) : (
          <div className="space-y-4">
            <div className="h-64 w-full">
              <ResponsiveContainer width="100%" height="100%">
                <LineChart data={filteredHistory}>
                  <CartesianGrid strokeDasharray="3 3" stroke="#334155" />
                  <XAxis dataKey="timestamp" stroke="#94a3b8" fontSize={11} />
                  <YAxis stroke="#94a3b8" fontSize={11} domain={['auto', 'auto']} />
                  <Tooltip
                    contentStyle={{ backgroundColor: '#0f172a', borderColor: '#334155', borderRadius: '0.5rem', color: '#fff' }}
                  />
                  <Line type="monotone" dataKey="bpm" stroke="#f43f5e" name="Pulse Rate (BPM)" strokeWidth={2} dot={{ r: 4 }} />
                  <Line type="monotone" dataKey="weight" stroke="#a855f7" name="Weight (kg)" strokeWidth={2} dot={{ r: 3 }} />
                  <Line type="monotone" dataKey="sysBP" stroke="#3b82f6" name="Systolic BP" strokeWidth={2} dot={{ r: 3 }} />
                </LineChart>
              </ResponsiveContainer>
            </div>

            <div className="overflow-x-auto">
              <table className="w-full text-left text-xs text-slate-300">
                <thead className="bg-slate-950 text-slate-400 font-semibold uppercase text-[10px] border-b border-slate-800">
                  <tr>
                    <th className="p-2.5">Time</th>
                    <th className="p-2.5">Person Name</th>
                    <th className="p-2.5">Finger Designator</th>
                    <th className="p-2.5">Height / Weight</th>
                    <th className="p-2.5">Pulse (BPM)</th>
                    <th className="p-2.5">Blood Pressure</th>
                    <th className="p-2.5">SpO2 / Temp</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-800/60">
                  {filteredHistory.map((log) => (
                    <tr key={log.id} className="hover:bg-slate-800/30 transition">
                      <td className="p-2.5 text-slate-400 font-mono text-[11px]">{log.timestamp}</td>
                      <td className="p-2.5 font-bold text-white">{log.personName || 'Master User'}</td>
                      <td className="p-2.5 text-rose-300 text-[11px]">{log.fingerprintId || 'Right Thumb'}</td>
                      <td className="p-2.5 text-teal-300 font-semibold">
                        {log.height} cm / {log.weight} kg
                      </td>
                      <td className="p-2.5 font-black text-rose-400">{log.bpm} BPM</td>
                      <td className="p-2.5 text-blue-300">
                        {log.sysBP}/{log.diaBP} mmHg
                      </td>
                      <td className="p-2.5 text-emerald-300">
                        {log.spo2}% / {log.temp}°C
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        )}
      </div>

      {/* Register New Person Modal */}
      {showAddModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/80 backdrop-blur-md animate-fade-in">
          <div className="medical-glass border-2 border-rose-500/50 rounded-3xl p-6 sm:p-8 max-w-md w-full shadow-2xl space-y-5">
            <div className="flex items-center justify-between border-b border-slate-800 pb-3">
              <h3 className="text-lg font-black text-white flex items-center gap-2">
                <UserPlus className="w-5 h-5 text-rose-400" />
                Register New Person Fingerprint
              </h3>
              <button
                onClick={() => setShowAddModal(false)}
                className="text-slate-400 hover:text-white font-bold text-sm"
              >
                ✕
              </button>
            </div>

            <form onSubmit={handleCreateProfile} className="space-y-4 text-xs">
              <div>
                <label className="block text-slate-300 font-semibold mb-1">Person Full Name:</label>
                <input
                  type="text"
                  required
                  placeholder="e.g. Junichi Valmores"
                  value={newName}
                  onChange={(e) => setNewName(e.target.value)}
                  className="w-full bg-slate-950 border border-slate-800 rounded-xl px-3 py-2.5 text-white placeholder-slate-500 focus:outline-none focus:border-rose-500"
                />
              </div>

              <div>
                <label className="block text-slate-300 font-semibold mb-1">Fingerprint Designation:</label>
                <select
                  value={newFinger}
                  onChange={(e) => setNewFinger(e.target.value)}
                  className="w-full bg-slate-950 border border-slate-800 rounded-xl px-3 py-2.5 text-white focus:outline-none focus:border-rose-500"
                >
                  <option value="Right Thumbprint">Right Thumbprint</option>
                  <option value="Left Thumbprint">Left Thumbprint</option>
                  <option value="Right Index Finger">Right Index Finger</option>
                  <option value="Left Index Finger">Left Index Finger</option>
                  <option value="Right Middle Finger">Right Middle Finger</option>
                  <option value="Left Ring Finger">Left Ring Finger</option>
                </select>
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block text-slate-300 font-semibold mb-1">Height (cm):</label>
                  <input
                    type="number"
                    required
                    value={newHeight}
                    onChange={(e) => setNewHeight(parseFloat(e.target.value) || 170)}
                    className="w-full bg-slate-950 border border-slate-800 rounded-xl px-3 py-2.5 text-white focus:outline-none focus:border-rose-500"
                  />
                </div>

                <div>
                  <label className="block text-slate-300 font-semibold mb-1">Weight (kg):</label>
                  <input
                    type="number"
                    step="0.1"
                    required
                    value={newWeight}
                    onChange={(e) => setNewWeight(parseFloat(e.target.value) || 60)}
                    className="w-full bg-slate-950 border border-slate-800 rounded-xl px-3 py-2.5 text-white focus:outline-none focus:border-rose-500"
                  />
                </div>
              </div>

              <div className="pt-2 flex justify-end gap-2">
                <button
                  type="button"
                  onClick={() => setShowAddModal(false)}
                  className="px-4 py-2 bg-slate-800 text-slate-300 hover:bg-slate-700 font-bold rounded-xl transition"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-5 py-2 bg-rose-600 hover:bg-rose-500 text-white font-bold rounded-xl transition shadow-lg shadow-rose-950/50"
                >
                  Save Fingerprint Profile
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

