import React, { useState } from 'react';
import { Fingerprint, Activity, Heart, Thermometer, Weight, Ruler, Zap, Clock, ShieldCheck, CheckCircle, Save } from 'lucide-react';
import { VitalsEntry } from '../types';
import { ResponsiveContainer, LineChart, Line, XAxis, YAxis, Tooltip, CartesianGrid } from 'recharts';

interface VitalsSectionProps {
  vitalsHistory: VitalsEntry[];
  onAddVitals: (entry: VitalsEntry) => void;
}

export const VitalsSection: React.FC<VitalsSectionProps> = ({ vitalsHistory, onAddVitals }) => {
  const [isScanning, setIsScanning] = useState(false);
  const [scanProgress, setScanProgress] = useState(0);
  const [currentBpm, setCurrentBpm] = useState(72);
  const [sysBP, setSysBP] = useState(120);
  const [diaBP, setDiaBP] = useState(80);
  const [spo2, setSpo2] = useState(98);
  const [temp, setTemp] = useState(36.6);
  const [weight, setWeight] = useState(68.5);
  const [height, setHeight] = useState(175);
  const [scanSaved, setScanSaved] = useState(false);

  const startFingerprintScan = () => {
    setIsScanning(true);
    setScanProgress(0);
    setScanSaved(false);

    const interval = setInterval(() => {
      setScanProgress((prev) => {
        if (prev >= 100) {
          clearInterval(interval);
          setIsScanning(false);
          // Simulated optical pulse & bio-impedance thermal readings
          const newBpm = Math.floor(65 + Math.random() * 20);
          const newSys = Math.floor(115 + Math.random() * 15);
          const newDia = Math.floor(75 + Math.random() * 10);
          const newSpo2 = Math.floor(96 + Math.random() * 4);
          const newTemp = parseFloat((36.4 + Math.random() * 0.6).toFixed(1));

          setCurrentBpm(newBpm);
          setSysBP(newSys);
          setDiaBP(newDia);
          setSpo2(newSpo2);
          setTemp(newTemp);
          return 100;
        }
        return prev + 10;
      });
    }, 150);
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
      notes: 'Fingerprint Sensor Scan Recorded',
    };
    onAddVitals(newEntry);
    setScanSaved(true);
    setTimeout(() => setScanSaved(false), 3000);
  };

  return (
    <div className="space-y-6">
      {/* Top Banner Disclaimer */}
      <div className="bg-slate-900 border border-slate-800 rounded-xl p-4 flex items-start gap-3">
        <ShieldCheck className="w-5 h-5 text-emerald-400 shrink-0 mt-0.5" />
        <div className="text-xs text-slate-300">
          <p className="font-semibold text-slate-100">Optical Fingerprint & Thermal Sensor Interface</p>
          <p className="text-slate-400 mt-0.5">
            Logs optical photoplethysmography (PPG), pulse rate (BPM), blood pressure estimates, SpO2 levels, and body weight/height records for personal tracking.
          </p>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Fingerprint Scanner Panel */}
        <div className="bg-slate-900 border border-slate-800 rounded-2xl p-6 flex flex-col items-center justify-between text-center relative overflow-hidden shadow-lg">
          <div className="absolute top-0 inset-x-0 h-1 bg-gradient-to-r from-rose-500 via-purple-500 to-amber-500"></div>

          <h3 className="text-base font-bold text-white flex items-center gap-2">
            <Fingerprint className="w-5 h-5 text-rose-400" />
            Optical Scanner Terminal
          </h3>
          <p className="text-xs text-slate-400 mt-1 max-w-xs">
            Press and hold fingerprint region on sensor glass to activate optical PPG sensing.
          </p>

          <div className="my-6 relative flex items-center justify-center">
            <button
              onClick={startFingerprintScan}
              disabled={isScanning}
              className={`w-36 h-36 rounded-full border-4 flex flex-col items-center justify-center transition-all shadow-2xl relative ${
                isScanning
                  ? 'border-rose-500 bg-rose-950/40 shadow-rose-500/50 animate-pulse'
                  : 'border-slate-700 bg-slate-950 hover:border-rose-400 hover:shadow-rose-500/20'
              }`}
            >
              <Fingerprint
                className={`w-16 h-16 transition-colors ${
                  isScanning ? 'text-rose-400 animate-bounce' : 'text-slate-400 group-hover:text-rose-400'
                }`}
              />
              <span className="text-[10px] font-semibold text-slate-300 mt-1 uppercase tracking-wider">
                {isScanning ? `${scanProgress}%` : 'Tap to Scan'}
              </span>
            </button>

            {isScanning && (
              <div className="absolute inset-0 rounded-full border-4 border-rose-500/30 animate-ping pointer-events-none"></div>
            )}
          </div>

          {scanSaved && (
            <div className="mb-3 px-3 py-1.5 rounded-lg bg-emerald-950/80 border border-emerald-500/40 text-emerald-300 text-xs font-semibold flex items-center gap-1.5">
              <CheckCircle className="w-4 h-4 text-emerald-400" />
              Recorded to Medical History!
            </div>
          )}

          <button
            onClick={handleSaveVitals}
            disabled={isScanning}
            className="w-full py-2.5 rounded-xl bg-gradient-to-r from-rose-600 to-amber-600 hover:from-rose-500 hover:to-amber-500 text-white font-bold text-xs shadow-md transition flex items-center justify-center gap-2"
          >
            <Save className="w-4 h-4" />
            Log Current Scan to History
          </button>
        </div>

        {/* Live Sensor Metrics Display */}
        <div className="lg:col-span-2 bg-slate-900 border border-slate-800 rounded-2xl p-6 shadow-lg space-y-4">
          <div className="flex items-center justify-between border-b border-slate-800 pb-3">
            <h3 className="text-base font-bold text-white flex items-center gap-2">
              <Activity className="w-5 h-5 text-rose-400" />
              Biometric Sensor Telemetry
            </h3>
            <span className="text-xs text-slate-400 flex items-center gap-1">
              <Clock className="w-3.5 h-3.5" />
              Live Mode
            </span>
          </div>

          <div className="grid grid-cols-2 sm:grid-cols-3 gap-4">
            {/* Heart Rate */}
            <div className="bg-slate-950 border border-slate-800 rounded-xl p-3">
              <div className="flex items-center justify-between text-xs text-slate-400">
                <span>Pulse Rate</span>
                <Heart className="w-4 h-4 text-rose-500 animate-pulse" />
              </div>
              <div className="mt-2 flex items-baseline gap-1">
                <span className="text-2xl font-black text-white">{currentBpm}</span>
                <span className="text-xs text-slate-400">BPM</span>
              </div>
              <p className="text-[10px] text-emerald-400 mt-1">Normal Resting</p>
            </div>

            {/* Blood Pressure */}
            <div className="bg-slate-950 border border-slate-800 rounded-xl p-3">
              <div className="flex items-center justify-between text-xs text-slate-400">
                <span>Blood Pressure</span>
                <Activity className="w-4 h-4 text-blue-400" />
              </div>
              <div className="mt-2 flex items-baseline gap-1">
                <span className="text-2xl font-black text-white">
                  {sysBP}/{diaBP}
                </span>
                <span className="text-xs text-slate-400">mmHg</span>
              </div>
              <p className="text-[10px] text-emerald-400 mt-1">Optimal Range</p>
            </div>

            {/* Oxygen Saturation */}
            <div className="bg-slate-950 border border-slate-800 rounded-xl p-3">
              <div className="flex items-center justify-between text-xs text-slate-400">
                <span>Oxygen Level</span>
                <Zap className="w-4 h-4 text-amber-400" />
              </div>
              <div className="mt-2 flex items-baseline gap-1">
                <span className="text-2xl font-black text-white">{spo2}</span>
                <span className="text-xs text-slate-400">% SpO2</span>
              </div>
              <p className="text-[10px] text-emerald-400 mt-1">Saturated</p>
            </div>

            {/* Skin Temp */}
            <div className="bg-slate-950 border border-slate-800 rounded-xl p-3">
              <div className="flex items-center justify-between text-xs text-slate-400">
                <span>Thermal Temp</span>
                <Thermometer className="w-4 h-4 text-orange-400" />
              </div>
              <div className="mt-2 flex items-baseline gap-1">
                <span className="text-2xl font-black text-white">{temp}</span>
                <span className="text-xs text-slate-400">°C</span>
              </div>
              <p className="text-[10px] text-slate-400 mt-1">Skin Surface</p>
            </div>

            {/* Weight Adjustment */}
            <div className="bg-slate-950 border border-slate-800 rounded-xl p-3">
              <div className="flex items-center justify-between text-xs text-slate-400">
                <span>Weight</span>
                <Weight className="w-4 h-4 text-purple-400" />
              </div>
              <div className="mt-2 flex items-center justify-between">
                <input
                  type="number"
                  step="0.1"
                  value={weight}
                  onChange={(e) => setWeight(parseFloat(e.target.value) || 60)}
                  className="w-20 text-xl font-black bg-transparent text-white border-b border-slate-700 focus:outline-none focus:border-rose-500"
                />
                <span className="text-xs text-slate-400">kg</span>
              </div>
            </div>

            {/* Height Adjustment */}
            <div className="bg-slate-950 border border-slate-800 rounded-xl p-3">
              <div className="flex items-center justify-between text-xs text-slate-400">
                <span>Height</span>
                <Ruler className="w-4 h-4 text-teal-400" />
              </div>
              <div className="mt-2 flex items-center justify-between">
                <input
                  type="number"
                  value={height}
                  onChange={(e) => setHeight(parseFloat(e.target.value) || 170)}
                  className="w-20 text-xl font-black bg-transparent text-white border-b border-slate-700 focus:outline-none focus:border-rose-500"
                />
                <span className="text-xs text-slate-400">cm</span>
              </div>
            </div>
          </div>

          {/* Quick BMI Calculation */}
          <div className="bg-slate-950/60 border border-slate-800/80 rounded-xl p-3 flex items-center justify-between text-xs">
            <span className="text-slate-400">Calculated Body Mass Index (BMI):</span>
            <span className="font-bold text-amber-300">
              {((weight / Math.pow(height / 100, 2)) || 0).toFixed(1)} kg/m²
            </span>
          </div>
        </div>
      </div>

      {/* Historical Telemetry Chart */}
      <div className="bg-slate-900 border border-slate-800 rounded-2xl p-6 shadow-lg">
        <h3 className="text-base font-bold text-white mb-4 flex items-center gap-2">
          <Activity className="w-5 h-5 text-rose-400" />
          Vitals Trend History
        </h3>

        <div className="h-64 w-full">
          <ResponsiveContainer width="100%" height="100%">
            <LineChart data={vitalsHistory}>
              <CartesianGrid strokeDasharray="3 3" stroke="#334155" />
              <XAxis dataKey="timestamp" stroke="#94a3b8" fontSize={11} />
              <YAxis stroke="#94a3b8" fontSize={11} domain={['auto', 'auto']} />
              <Tooltip
                contentStyle={{ backgroundColor: '#0f172a', borderColor: '#334155', borderRadius: '0.5rem', color: '#fff' }}
              />
              <Line type="monotone" dataKey="bpm" stroke="#f43f5e" name="Heart Rate (BPM)" strokeWidth={2} dot={{ r: 4 }} />
              <Line type="monotone" dataKey="sysBP" stroke="#3b82f6" name="Systolic BP" strokeWidth={2} dot={{ r: 3 }} />
              <Line type="monotone" dataKey="spo2" stroke="#10b981" name="SpO2 (%)" strokeWidth={2} dot={{ r: 3 }} />
            </LineChart>
          </ResponsiveContainer>
        </div>
      </div>
    </div>
  );
};
