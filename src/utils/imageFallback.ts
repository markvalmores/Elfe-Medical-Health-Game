import React from 'react';

// Utility helper to guarantee no broken images across the entire app.
// Handles API failures, CORS blocks, broken asset URLs, and missing links smoothly.

export const DEFAULT_ANIME_FALLBACK = 'https://api.dicebear.com/7.x/lorelei/svg?seed=NurseElfeAngelicMedic';
export const DEFAULT_HEROIC_FALLBACK = 'https://api.dicebear.com/7.x/adventurer/svg?seed=NurseElfeHeroicArrival';
export const DEFAULT_ACCESSORY_FALLBACK = 'https://api.dicebear.com/7.x/bottts/svg?seed=DivineRelicAccessory';

export const ANIME_FALLBACK_POOL = [
  'https://api.dicebear.com/7.x/lorelei/svg?seed=SeraphinaCelestialStarHealer',
  'https://api.dicebear.com/7.x/adventurer/svg?seed=DoctorKenjiDivineSurgeon',
  'https://api.dicebear.com/7.x/lorelei/svg?seed=AoiHydrationSpiritMaiden',
  'https://api.dicebear.com/7.x/lorelei/svg?seed=LuminaSolarPriestess',
  'https://api.dicebear.com/7.x/adventurer/svg?seed=KaitoHolySwordMedic',
  'https://api.dicebear.com/7.x/bottts/svg?seed=NurseChloeVitalityAndroid',
  'https://api.dicebear.com/7.x/lorelei/svg?seed=MayumiCherryBlossomNurse',
];

export function handleImageError(
  e: React.SyntheticEvent<HTMLImageElement, Event>,
  customFallback?: string
) {
  const target = e.currentTarget;
  // Prevent infinite error loops
  if (target.dataset.failed === 'true') {
    target.src = DEFAULT_ANIME_FALLBACK;
    return;
  }
  target.dataset.failed = 'true';
  target.src = customFallback || DEFAULT_ANIME_FALLBACK;
}
