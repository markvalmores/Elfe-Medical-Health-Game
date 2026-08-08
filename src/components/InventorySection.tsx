import React, { useState } from 'react';
import { Package, Recycle, ArrowUpDown, DollarSign, Sparkles, Check, RefreshCw } from 'lucide-react';
import { PlayerInventoryItem, GachaItem } from '../types';

interface InventoryProps {
  inventory: PlayerInventoryItem[];
  equippedOutfit: GachaItem | null;
  equippedAccessory: GachaItem | null;
  onEquipOutfit: (item: GachaItem) => void;
  onEquipAccessory: (item: GachaItem) => void;
  onRecycleItem: (itemId: string) => void;
  onSellDuplicate: (itemId: string) => void;
}

export const InventorySection: React.FC<InventoryProps> = ({
  inventory,
  equippedOutfit,
  equippedAccessory,
  onEquipOutfit,
  onEquipAccessory,
  onRecycleItem,
  onSellDuplicate,
}) => {
  const [sortBy, setSortBy] = useState<'rarity' | 'date' | 'name'>('rarity');
  const [selectedItem, setSelectedItem] = useState<PlayerInventoryItem | null>(
    inventory.length > 0 ? inventory[0] : null
  );

  const rarityRank = { SSR: 3, SR: 2, R: 1 };

  const sortedInventory = [...inventory].sort((a, b) => {
    if (sortBy === 'rarity') {
      return rarityRank[b.item.rarity] - rarityRank[a.item.rarity];
    } else if (sortBy === 'date') {
      return new Date(b.acquiredAt).getTime() - new Date(a.acquiredAt).getTime();
    } else {
      return a.item.name.localeCompare(b.item.name);
    }
  });

  return (
    <div className="space-y-6">
      {/* Top Inventory Controls Bar */}
      <div className="bg-slate-900 border border-slate-800 rounded-2xl p-4 flex flex-wrap items-center justify-between gap-4 shadow-lg">
        <div className="flex items-center gap-2">
          <Package className="w-5 h-5 text-amber-400" />
          <h3 className="text-base font-bold text-white">Player Wardrobe & Gear Storage</h3>
          <span className="text-xs text-slate-400 font-medium">({inventory.length} items)</span>
        </div>

        {/* Auto-Sort Buttons */}
        <div className="flex items-center gap-2">
          <span className="text-xs text-slate-400 flex items-center gap-1">
            <ArrowUpDown className="w-3.5 h-3.5 text-slate-400" />
            Sort By:
          </span>
          <button
            onClick={() => setSortBy('rarity')}
            className={`px-3 py-1 rounded-lg text-xs font-semibold transition ${
              sortBy === 'rarity'
                ? 'bg-rose-600 text-white shadow-md'
                : 'bg-slate-800 text-slate-400 hover:text-white'
            }`}
          >
            Rarity Rank
          </button>
          <button
            onClick={() => setSortBy('date')}
            className={`px-3 py-1 rounded-lg text-xs font-semibold transition ${
              sortBy === 'date'
                ? 'bg-rose-600 text-white shadow-md'
                : 'bg-slate-800 text-slate-400 hover:text-white'
            }`}
          >
            Acquired Date
          </button>
          <button
            onClick={() => setSortBy('name')}
            className={`px-3 py-1 rounded-lg text-xs font-semibold transition ${
              sortBy === 'name'
                ? 'bg-rose-600 text-white shadow-md'
                : 'bg-slate-800 text-slate-400 hover:text-white'
            }`}
          >
            Name
          </button>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Inventory Items Grid */}
        <div className="lg:col-span-2 bg-slate-900 border border-slate-800 rounded-2xl p-6 shadow-xl">
          {sortedInventory.length === 0 ? (
            <div className="text-center py-12 text-slate-400 text-xs">
              Your inventory is currently empty. Summon items from the Gacha Banner!
            </div>
          ) : (
            <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-3">
              {sortedInventory.map((invItem) => {
                const isSelected = selectedItem?.item.id === invItem.item.id;
                const isEquipped =
                  equippedOutfit?.id === invItem.item.id ||
                  equippedAccessory?.id === invItem.item.id;

                return (
                  <div
                    key={invItem.item.id}
                    onClick={() => setSelectedItem(invItem)}
                    className={`cursor-pointer rounded-xl border p-2 relative overflow-hidden transition ${
                      isSelected
                        ? 'border-amber-400 bg-slate-950 shadow-lg shadow-amber-500/20 ring-1 ring-amber-400'
                        : 'border-slate-800 bg-slate-950 hover:border-slate-700'
                    }`}
                  >
                    <div className="h-24 rounded-lg overflow-hidden relative mb-2">
                      <img
                        src={invItem.item.image}
                        alt={invItem.item.name}
                        referrerPolicy="no-referrer"
                        className="w-full h-full object-cover"
                      />
                      <span
                        className={`absolute top-1 left-1 px-1.5 py-0.5 rounded text-[9px] font-black ${
                          invItem.item.rarity === 'SSR'
                            ? 'bg-amber-500 text-slate-950'
                            : invItem.item.rarity === 'SR'
                            ? 'bg-purple-600 text-white'
                            : 'bg-slate-700 text-slate-200'
                        }`}
                      >
                        {invItem.item.rarity}
                      </span>

                      {invItem.quantity > 1 && (
                        <span className="absolute top-1 right-1 px-1.5 py-0.5 rounded text-[9px] font-bold bg-slate-900/90 text-amber-300 border border-amber-500/30">
                          x{invItem.quantity}
                        </span>
                      )}

                      {isEquipped && (
                        <div className="absolute inset-x-0 bottom-0 bg-emerald-600/90 text-white text-[9px] font-bold text-center py-0.5">
                          EQUIPPED
                        </div>
                      )}
                    </div>

                    <p className="text-xs font-bold text-white truncate">{invItem.item.name}</p>
                    <p className="text-[10px] text-slate-400 mt-0.5 capitalize">
                      {invItem.item.type}
                    </p>
                  </div>
                );
              })}
            </div>
          )}
        </div>

        {/* Item Detail & Crafting/Recycle Actions */}
        <div className="bg-slate-900 border border-slate-800 rounded-2xl p-6 shadow-xl space-y-6">
          <h3 className="text-base font-bold text-white flex items-center gap-2 border-b border-slate-800 pb-3">
            <Sparkles className="w-5 h-5 text-amber-400" />
            Item Details & Recycling
          </h3>

          {selectedItem ? (
            <div className="space-y-4">
              <div className="h-44 rounded-xl overflow-hidden border border-slate-800 relative">
                <img
                  src={selectedItem.item.image}
                  alt={selectedItem.item.name}
                  referrerPolicy="no-referrer"
                  className="w-full h-full object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-transparent to-transparent"></div>
                <div className="absolute bottom-3 left-3 right-3 flex items-center justify-between">
                  <h4 className="text-sm font-bold text-white">{selectedItem.item.name}</h4>
                  <span className="px-2 py-0.5 rounded text-xs font-black bg-amber-500 text-slate-950">
                    {selectedItem.item.rarity}
                  </span>
                </div>
              </div>

              <p className="text-xs text-slate-300 leading-relaxed">
                {selectedItem.item.description}
              </p>

              <div className="bg-slate-950 border border-slate-800 p-3 rounded-xl flex items-center justify-between text-xs">
                <span className="text-slate-400">Power Score Contribution:</span>
                <span className="font-bold text-amber-300">
                  +{selectedItem.item.rarityScore} PTS
                </span>
              </div>

              {/* Equip Action */}
              <div>
                {selectedItem.item.type === 'character' || selectedItem.item.type === 'outfit' ? (
                  <button
                    onClick={() => onEquipOutfit(selectedItem.item)}
                    className="w-full py-2.5 rounded-xl bg-gradient-to-r from-rose-600 to-rose-500 hover:from-rose-500 hover:to-rose-400 text-white font-bold text-xs shadow-md transition flex items-center justify-center gap-2"
                  >
                    <Check className="w-4 h-4" />
                    Equip Outfit on Nurse Elfe
                  </button>
                ) : (
                  <button
                    onClick={() => onEquipAccessory(selectedItem.item)}
                    className="w-full py-2.5 rounded-xl bg-gradient-to-r from-amber-600 to-amber-500 hover:from-amber-500 hover:to-amber-400 text-white font-bold text-xs shadow-md transition flex items-center justify-center gap-2"
                  >
                    <Check className="w-4 h-4" />
                    Equip Accessory on Nurse Elfe
                  </button>
                )}
              </div>

              {/* Recycling & Duplicate Sale Options */}
              <div className="pt-4 border-t border-slate-800 space-y-2">
                <span className="text-xs font-bold text-slate-400 block">
                  Crafting & Duplicate Options
                </span>

                <button
                  onClick={() => onRecycleItem(selectedItem.item.id)}
                  className="w-full py-2 rounded-lg bg-slate-800 hover:bg-slate-700 text-slate-200 font-semibold text-xs border border-slate-700 transition flex items-center justify-center gap-2"
                >
                  <Recycle className="w-4 h-4 text-emerald-400" />
                  Recycle Duplicate (+200 Medic Points)
                </button>

                <button
                  onClick={() => onSellDuplicate(selectedItem.item.id)}
                  className="w-full py-2 rounded-lg bg-slate-800 hover:bg-slate-700 text-slate-200 font-semibold text-xs border border-slate-700 transition flex items-center justify-center gap-2"
                >
                  <DollarSign className="w-4 h-4 text-amber-400" />
                  Sell Extra Item (+100 Gems)
                </button>
              </div>
            </div>
          ) : (
            <div className="text-center py-12 text-slate-500 text-xs">
              Select an item from the left grid to view details and options.
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
