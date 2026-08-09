import React, { useState } from 'react';
import { Sparkles, Key, RefreshCw, Check, Globe, Shield, Download, Image as ImageIcon } from 'lucide-react';
import { AnimeApiService, AnimeApiItem } from '../services/animeApi';
import { GachaItem } from '../types';
import { handleImageError } from '../utils/imageFallback';

interface AnimeApiManagerProps {
  onAddGachaItemToInventory: (item: GachaItem) => void;
  onUpdateNurseAvatar: (imageUrl: string) => void;
}

export const AnimeApiManager: React.FC<AnimeApiManagerProps> = ({
  onAddGachaItemToInventory,
  onUpdateNurseAvatar,
}) => {
  const [apiKeyInput, setApiKeyInput] = useState<string>(AnimeApiService.getAuthKey());
  const [isSaved, setIsSaved] = useState<boolean>(false);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [previewImage, setPreviewImage] = useState<AnimeApiItem | null>(null);
  const [activeApiSource, setActiveApiSource] = useState<string>('Waifu.pics Public API');

  const handleSaveApiKey = () => {
    AnimeApiService.setAuthKey(apiKeyInput);
    setIsSaved(true);
    setTimeout(() => setIsSaved(false), 2500);
  };

  const handleFetchFromApi = async (category: 'waifu' | 'neko' | 'random' | 'accessory') => {
    setIsLoading(true);
    let item: AnimeApiItem | null = null;

    if (category === 'accessory') {
      const seed = 'Accessory_' + Math.floor(Math.random() * 10000);
      item = AnimeApiService.fetchAccessoryApiImage(seed, 'bottts');
    } else if (activeApiSource === 'Waifu.pics Public API') {
      item = await AnimeApiService.fetchWaifuPics(category === 'random' ? 'waifu' : category);
    } else if (activeApiSource === 'Nekos.best API') {
      item = await AnimeApiService.fetchNekosBest(category === 'random' ? 'waifu' : category);
    } else if (activeApiSource === 'Jikan (MyAnimeList) API') {
      item = await AnimeApiService.fetchJikanCharacter();
    } else {
      item = await AnimeApiService.getRandomAnimeAvatar(category);
    }

    if (!item) {
      item = await AnimeApiService.getRandomAnimeAvatar('waifu');
    }

    setPreviewImage(item);
    setIsLoading(false);
  };

  const handleApplyAsNurseElfe = () => {
    if (previewImage) {
      onUpdateNurseAvatar(previewImage.url);
    }
  };

  const handleCreateGachaItem = () => {
    if (!previewImage) return;

    const newItem: GachaItem = {
      id: `api-custom-${Date.now()}`,
      name: `API Nurse Skin (${previewImage.category})`,
      type: 'outfit',
      rarity: 'SSR',
      rarityScore: 1200,
      image: previewImage.url,
      description: `Fetched live via ${previewImage.source}. High-resolution authorized anime character card.`,
      characterName: 'Elfe',
    };

    onAddGachaItemToInventory(newItem);
  };

  return (
    <div className="bg-slate-900 border border-slate-800 rounded-2xl p-6 shadow-xl space-y-6">
      {/* Header & API Status */}
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 border-b border-slate-800 pb-4">
        <div className="flex items-center gap-3">
          <div className="p-2.5 rounded-xl bg-gradient-to-tr from-purple-600 to-rose-500 text-white shadow-lg">
            <Globe className="w-5 h-5" />
          </div>
          <div>
            <h3 className="text-base font-bold text-white flex items-center gap-2">
              Anime API & AI Avatar Authorization
              <span className="text-[10px] bg-emerald-500/20 text-emerald-300 px-2 py-0.5 rounded-full border border-emerald-500/30">
                Public & Private Mode Active
              </span>
            </h3>
            <p className="text-xs text-slate-400">
              Fetch dynamic Nurse Elfe avatars and gacha skins live from public anime APIs or authorized private tokens.
            </p>
          </div>
        </div>

        {/* API Selector */}
        <select
          value={activeApiSource}
          onChange={(e) => setActiveApiSource(e.target.value)}
          className="px-3 py-1.5 bg-slate-950 border border-slate-700 rounded-xl text-xs text-amber-300 font-semibold focus:outline-none focus:border-rose-500"
        >
          <option value="Waifu.pics Public API">Waifu.pics Public API</option>
          <option value="Nekos.best API">Nekos.best API</option>
          <option value="Jikan (MyAnimeList) API">Jikan (MyAnimeList) API</option>
          <option value="Auto Multi-API Pipeline">Auto Multi-API Pipeline</option>
        </select>
      </div>

      {/* Private API Key Authorization Panel */}
      <div className="bg-slate-950 border border-slate-800/80 rounded-xl p-4 space-y-3">
        <div className="flex items-center justify-between">
          <span className="text-xs font-bold text-slate-200 flex items-center gap-1.5">
            <Key className="w-4 h-4 text-amber-400" />
            Private API Token / Auth Key (Optional)
          </span>
          {isSaved && (
            <span className="text-xs font-bold text-emerald-400 flex items-center gap-1">
              <Check className="w-3.5 h-3.5" />
              Auth Token Saved!
            </span>
          )}
        </div>

        <div className="flex gap-2">
          <input
            type="password"
            placeholder="Enter private API key or bearer token (e.g. bearer_token_xyz)..."
            value={apiKeyInput}
            onChange={(e) => setApiKeyInput(e.target.value)}
            className="flex-1 px-3 py-2 bg-slate-900 border border-slate-700 rounded-xl text-xs text-white placeholder-slate-500 focus:outline-none focus:border-rose-500"
          />
          <button
            onClick={handleSaveApiKey}
            className="px-4 py-2 bg-rose-600 hover:bg-rose-500 text-white font-bold text-xs rounded-xl transition shadow"
          >
            Authorize Key
          </button>
        </div>
        <p className="text-[11px] text-slate-500">
          Public APIs work seamlessly without a key. Providing a private API token enables priority server bandwidth and unthrottled high-res artwork requests.
        </p>
      </div>

      {/* Live Fetch Actions */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="space-y-3">
          <span className="text-xs font-bold text-slate-300 block">
            Generate Live Character Art from API
          </span>

          <div className="grid grid-cols-2 gap-2">
            <button
              onClick={() => handleFetchFromApi('waifu')}
              disabled={isLoading}
              className="py-2.5 px-3 bg-slate-800 hover:bg-slate-700 text-slate-200 text-xs font-semibold rounded-xl border border-slate-700 flex items-center justify-center gap-1.5 transition"
            >
              <RefreshCw className={`w-3.5 h-3.5 text-rose-400 ${isLoading ? 'animate-spin' : ''}`} />
              Fetch Waifu
            </button>

            <button
              onClick={() => handleFetchFromApi('neko')}
              disabled={isLoading}
              className="py-2.5 px-3 bg-slate-800 hover:bg-slate-700 text-slate-200 text-xs font-semibold rounded-xl border border-slate-700 flex items-center justify-center gap-1.5 transition"
            >
              <RefreshCw className={`w-3.5 h-3.5 text-amber-400 ${isLoading ? 'animate-spin' : ''}`} />
              Fetch Neko
            </button>

            <button
              onClick={() => handleFetchFromApi('random')}
              disabled={isLoading}
              className="py-2.5 px-3 bg-slate-800 hover:bg-slate-700 text-slate-200 text-xs font-semibold rounded-xl border border-slate-700 flex items-center justify-center gap-1.5 transition"
            >
              <Sparkles className="w-3.5 h-3.5 text-purple-400" />
              Fetch Character
            </button>

            <button
              onClick={() => handleFetchFromApi('accessory')}
              disabled={isLoading}
              className="py-2.5 px-3 bg-slate-800 hover:bg-slate-700 text-slate-200 text-xs font-semibold rounded-xl border border-slate-700 flex items-center justify-center gap-1.5 transition"
            >
              <Sparkles className="w-3.5 h-3.5 text-emerald-400" />
              Fetch Accessory
            </button>
          </div>

          <div className="p-3 bg-slate-950 border border-slate-800 rounded-xl text-xs text-slate-400 space-y-1">
            <p className="font-semibold text-slate-200">Active API Provider:</p>
            <p className="text-amber-300">{activeApiSource}</p>
          </div>
        </div>

        {/* Live Preview & Apply Card */}
        <div className="bg-slate-950 border border-slate-800 rounded-xl p-4 flex flex-col items-center justify-between text-center min-h-[220px]">
          {previewImage ? (
            <div className="w-full space-y-3">
              <div className="h-36 w-full rounded-xl overflow-hidden border border-rose-500/40 relative">
                <img
                  src={previewImage.url}
                  alt="API Artwork"
                  referrerPolicy="no-referrer"
                  onError={(e) => handleImageError(e)}
                  className="w-full h-full object-cover"
                />
                <span className="absolute top-2 left-2 px-2 py-0.5 rounded bg-slate-950/80 text-[10px] font-bold text-amber-300 border border-amber-500/30">
                  {previewImage.source}
                </span>
              </div>

              <div className="flex gap-2">
                <button
                  onClick={handleApplyAsNurseElfe}
                  className="flex-1 py-2 bg-gradient-to-r from-rose-600 to-amber-600 text-white font-bold text-xs rounded-xl shadow transition"
                >
                  Set as Nurse Elfe
                </button>
                <button
                  onClick={handleCreateGachaItem}
                  className="flex-1 py-2 bg-slate-800 hover:bg-slate-700 text-slate-200 font-bold text-xs rounded-xl border border-slate-700 transition"
                >
                  Add to Inventory
                </button>
              </div>
            </div>
          ) : (
            <div className="my-auto text-slate-500 text-xs flex flex-col items-center gap-2">
              <ImageIcon className="w-8 h-8 text-slate-600" />
              <span>Click a button above to pull real live anime artwork from public/private APIs.</span>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
