import React, { useState } from 'react';
import { X, User, Key, Mail, Shield, Save, CheckCircle, Lock, RefreshCw, Sparkles, Hash } from 'lucide-react';
import { UserProfile } from '../types';
import { saveUserProfile, bindAccountEmail, loginWithEmail } from '../utils/storage';

interface SettingsModalProps {
  isOpen: boolean;
  onClose: () => void;
  userProfile: UserProfile;
  onUpdateProfile: (updated: UserProfile) => void;
}

export const SettingsModal: React.FC<SettingsModalProps> = ({
  isOpen,
  onClose,
  userProfile,
  onUpdateProfile,
}) => {
  const [usernameInput, setUsernameInput] = useState(userProfile.username);
  const [emailInput, setEmailInput] = useState(userProfile.email || '');
  const [passwordInput, setPasswordInput] = useState('');
  const [activeMode, setActiveMode] = useState<'profile' | 'bind' | 'login'>('profile');
  const [statusMessage, setStatusMessage] = useState<string | null>(null);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);

  if (!isOpen) return null;

  const handleSaveUsername = () => {
    if (!usernameInput.trim()) {
      setErrorMessage('Username cannot be empty.');
      return;
    }
    const updated = {
      ...userProfile,
      username: usernameInput.trim(),
    };
    saveUserProfile(updated);
    onUpdateProfile(updated);
    setStatusMessage('Username successfully updated!');
    setErrorMessage(null);
    setTimeout(() => setStatusMessage(null), 3000);
  };

  const handleBindEmail = (e: React.FormEvent) => {
    e.preventDefault();
    if (!emailInput.trim() || !emailInput.includes('@')) {
      setErrorMessage('Please enter a valid email address.');
      return;
    }
    if (!passwordInput || passwordInput.length < 4) {
      setErrorMessage('Password must be at least 4 characters long.');
      return;
    }

    const updated = bindAccountEmail(emailInput.trim(), passwordInput, userProfile);
    onUpdateProfile(updated);
    setStatusMessage(`Account bound to ${emailInput.trim()}! Progress will be backed up.`);
    setErrorMessage(null);
    setPasswordInput('');
  };

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    if (!emailInput.trim() || !passwordInput) {
      setErrorMessage('Please enter your email and password.');
      return;
    }

    const loggedProfile = loginWithEmail(emailInput.trim(), passwordInput);
    if (loggedProfile) {
      onUpdateProfile(loggedProfile);
      setUsernameInput(loggedProfile.username);
      setStatusMessage(`Welcome back, ${loggedProfile.username}! Progress restored.`);
      setErrorMessage(null);
      setPasswordInput('');
      setActiveMode('profile');
    } else {
      setErrorMessage('Invalid email or password credentials. Please check or bind your account.');
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/80 backdrop-blur-md animate-fade-in">
      <div className="bg-slate-900 border border-slate-800 rounded-3xl w-full max-w-lg overflow-hidden shadow-2xl space-y-0">
        {/* Header */}
        <div className="p-5 bg-slate-950 border-b border-slate-800 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="p-2 rounded-xl bg-gradient-to-tr from-rose-500 to-amber-500 text-white shadow">
              <User className="w-5 h-5" />
            </div>
            <div>
              <h3 className="text-base font-bold text-white flex items-center gap-2">
                User Settings & Account
                <span className="text-[10px] bg-amber-500/20 text-amber-300 px-2 py-0.5 rounded-full border border-amber-500/30">
                  Yahusha Faith Sync
                </span>
              </h3>
              <p className="text-xs text-slate-400">
                Manage your 7-digit User ID, profile name, and email binding.
              </p>
            </div>
          </div>
          <button
            onClick={onClose}
            className="p-2 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-300 transition"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Navigation Mode Bar */}
        <div className="flex border-b border-slate-800 bg-slate-950/50 p-2 gap-2 text-xs font-semibold">
          <button
            onClick={() => setActiveMode('profile')}
            className={`flex-1 py-2 rounded-xl transition flex items-center justify-center gap-1.5 ${
              activeMode === 'profile'
                ? 'bg-rose-600 text-white shadow'
                : 'bg-slate-900 text-slate-400 hover:text-slate-200'
            }`}
          >
            <User className="w-3.5 h-3.5" />
            Profile & ID
          </button>
          <button
            onClick={() => setActiveMode('bind')}
            className={`flex-1 py-2 rounded-xl transition flex items-center justify-center gap-1.5 ${
              activeMode === 'bind'
                ? 'bg-rose-600 text-white shadow'
                : 'bg-slate-900 text-slate-400 hover:text-slate-200'
            }`}
          >
            <Mail className="w-3.5 h-3.5" />
            Bind Email
          </button>
          <button
            onClick={() => setActiveMode('login')}
            className={`flex-1 py-2 rounded-xl transition flex items-center justify-center gap-1.5 ${
              activeMode === 'login'
                ? 'bg-rose-600 text-white shadow'
                : 'bg-slate-900 text-slate-400 hover:text-slate-200'
            }`}
          >
            <Lock className="w-3.5 h-3.5" />
            Load Account
          </button>
        </div>

        {/* Content Body */}
        <div className="p-6 space-y-5">
          {statusMessage && (
            <div className="p-3 bg-emerald-500/20 border border-emerald-500/40 rounded-xl text-xs text-emerald-300 flex items-center gap-2">
              <CheckCircle className="w-4 h-4 shrink-0" />
              <span>{statusMessage}</span>
            </div>
          )}

          {errorMessage && (
            <div className="p-3 bg-rose-500/20 border border-rose-500/40 rounded-xl text-xs text-rose-300 flex items-center gap-2">
              <X className="w-4 h-4 shrink-0" />
              <span>{errorMessage}</span>
            </div>
          )}

          {/* Mode 1: Profile & 7-Digit ID */}
          {activeMode === 'profile' && (
            <div className="space-y-4">
              {/* Auto Generated 7-Digit User ID Card */}
              <div className="p-4 bg-slate-950 border border-slate-800 rounded-2xl space-y-2">
                <span className="text-[11px] font-bold text-amber-400 uppercase tracking-wider flex items-center gap-1.5">
                  <Hash className="w-3.5 h-3.5" />
                  Automatic 7-Digit User ID
                </span>
                <div className="flex items-center justify-between">
                  <span className="text-2xl font-black font-mono tracking-widest text-white">
                    #{userProfile.userId}
                  </span>
                  <span className="text-[10px] bg-slate-800 text-slate-300 px-2.5 py-1 rounded-full border border-slate-700">
                    Created at Game Start
                  </span>
                </div>
                <p className="text-[11px] text-slate-500">
                  This 7-digit ID was automatically synthesized from the exact time and date you started playing.
                </p>
              </div>

              {/* Editable Username */}
              <div className="space-y-2">
                <label className="text-xs font-bold text-slate-300 block">
                  Edit Player Username
                </label>
                <div className="flex gap-2">
                  <input
                    type="text"
                    value={usernameInput}
                    onChange={(e) => setUsernameInput(e.target.value)}
                    className="flex-1 px-3.5 py-2.5 bg-slate-950 border border-slate-800 rounded-xl text-xs text-white placeholder-slate-500 focus:outline-none focus:border-rose-500"
                    placeholder="Enter your custom username..."
                  />
                  <button
                    onClick={handleSaveUsername}
                    className="px-4 py-2.5 bg-rose-600 hover:bg-rose-500 text-white font-bold text-xs rounded-xl transition flex items-center gap-1.5 shadow"
                  >
                    <Save className="w-4 h-4" />
                    Save Name
                  </button>
                </div>
              </div>

              {/* Account Binding Status */}
              <div className="p-3 bg-slate-950 border border-slate-800 rounded-xl flex items-center justify-between">
                <div>
                  <p className="text-xs font-semibold text-slate-200">
                    Account Protection
                  </p>
                  <p className="text-[11px] text-slate-400">
                    {userProfile.isBound ? `Bound to ${userProfile.email}` : 'Not bound to email (Guest mode)'}
                  </p>
                </div>
                <span
                  className={`text-[10px] px-2.5 py-1 rounded-full font-bold border ${
                    userProfile.isBound
                      ? 'bg-emerald-500/20 text-emerald-300 border-emerald-500/30'
                      : 'bg-amber-500/20 text-amber-300 border-amber-500/30'
                  }`}
                >
                  {userProfile.isBound ? 'Protected' : 'Unbound'}
                </span>
              </div>
            </div>
          )}

          {/* Mode 2: Bind Email & Password */}
          {activeMode === 'bind' && (
            <form onSubmit={handleBindEmail} className="space-y-4">
              <div className="space-y-2">
                <label className="text-xs font-bold text-slate-300 block">
                  Email Address to Bind
                </label>
                <input
                  type="email"
                  value={emailInput}
                  onChange={(e) => setEmailInput(e.target.value)}
                  placeholder="your.email@example.com"
                  className="w-full px-3.5 py-2.5 bg-slate-950 border border-slate-800 rounded-xl text-xs text-white placeholder-slate-500 focus:outline-none focus:border-rose-500"
                />
              </div>

              <div className="space-y-2">
                <label className="text-xs font-bold text-slate-300 block">
                  Create Secret Account Password
                </label>
                <input
                  type="password"
                  value={passwordInput}
                  onChange={(e) => setPasswordInput(e.target.value)}
                  placeholder="Enter a secure password..."
                  className="w-full px-3.5 py-2.5 bg-slate-950 border border-slate-800 rounded-xl text-xs text-white placeholder-slate-500 focus:outline-none focus:border-rose-500"
                />
              </div>

              <button
                type="submit"
                className="w-full py-3 bg-gradient-to-r from-rose-600 to-amber-600 text-white font-bold text-xs rounded-xl shadow-lg hover:shadow-rose-500/30 transition flex items-center justify-center gap-2"
              >
                <Shield className="w-4 h-4" />
                Bind Email & Protect 7-Digit ID Progress
              </button>
            </form>
          )}

          {/* Mode 3: Login with Email */}
          {activeMode === 'login' && (
            <form onSubmit={handleLogin} className="space-y-4">
              <div className="space-y-2">
                <label className="text-xs font-bold text-slate-300 block">
                  Registered Email Address
                </label>
                <input
                  type="email"
                  value={emailInput}
                  onChange={(e) => setEmailInput(e.target.value)}
                  placeholder="your.email@example.com"
                  className="w-full px-3.5 py-2.5 bg-slate-950 border border-slate-800 rounded-xl text-xs text-white placeholder-slate-500 focus:outline-none focus:border-rose-500"
                />
              </div>

              <div className="space-y-2">
                <label className="text-xs font-bold text-slate-300 block">
                  Account Password
                </label>
                <input
                  type="password"
                  value={passwordInput}
                  onChange={(e) => setPasswordInput(e.target.value)}
                  placeholder="Enter your password..."
                  className="w-full px-3.5 py-2.5 bg-slate-950 border border-slate-800 rounded-xl text-xs text-white placeholder-slate-500 focus:outline-none focus:border-rose-500"
                />
              </div>

              <button
                type="submit"
                className="w-full py-3 bg-gradient-to-r from-amber-600 to-rose-600 text-white font-bold text-xs rounded-xl shadow-lg hover:shadow-amber-500/30 transition flex items-center justify-center gap-2"
              >
                <RefreshCw className="w-4 h-4" />
                Login & Restore Saved Progress
              </button>
            </form>
          )}
        </div>

        {/* Footer info */}
        <div className="p-4 bg-slate-950 border-t border-slate-800 text-[11px] text-slate-500 flex items-center justify-between">
          <span>Game ID: #{userProfile.userId}</span>
          <span className="text-emerald-400 font-medium">
            Yahusha Faith & Clean Health Engine
          </span>
        </div>
      </div>
    </div>
  );
};
