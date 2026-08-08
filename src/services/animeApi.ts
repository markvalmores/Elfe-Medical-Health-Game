// Anime API integration service supporting public endpoints (Waifu.pics, Waifu.im, Nekos.best, Jikan) 
// and private authorized key modes for AI-generated anime avatars and outfit cards.

import nurseElfeAngelicImg from '../assets/images/nurse_elfe_angelic_1786227050228.jpg';
import nurseElfeHeroicImg from '../assets/images/nurse_elfe_heroic_1786227064218.jpg';

export interface AnimeApiItem {
  url: string;
  source: string;
  category: string;
  artistName?: string;
}

export class AnimeApiService {
  private static privateApiKey: string = '';

  public static setAuthKey(key: string) {
    this.privateApiKey = key;
  }

  public static getAuthKey(): string {
    return this.privateApiKey;
  }

  // Fetch from Waifu.im API
  public static async fetchWaifuIm(tag: string = 'maid'): Promise<AnimeApiItem | null> {
    try {
      const response = await fetch(`https://api.waifu.im/search?included_tags=${tag}`, {
        headers: this.privateApiKey ? { 'Authorization': `Bearer ${this.privateApiKey}` } : {},
      });
      if (!response.ok) throw new Error('Waifu.im request failed');
      const data = await response.json();
      if (data && data.images && data.images.length > 0) {
        return {
          url: data.images[0].url,
          source: 'Waifu.im API',
          category: tag,
          artistName: data.images[0].artist?.name || 'Anime Artist',
        };
      }
    } catch (err) {
      console.warn('Waifu.im fetch error:', err);
    }
    return null;
  }

  // Fetch from Waifu.pics API
  public static async fetchWaifuPics(category: string = 'waifu'): Promise<AnimeApiItem | null> {
    try {
      const response = await fetch(`https://api.waifu.pics/sfw/${category}`, {
        headers: this.privateApiKey ? { 'Authorization': `Bearer ${this.privateApiKey}` } : {},
      });
      if (!response.ok) throw new Error('Waifu.pics request failed');
      const data = await response.json();
      if (data && data.url) {
        return {
          url: data.url,
          source: 'Waifu.pics API',
          category,
        };
      }
    } catch (err) {
      console.warn('Waifu.pics fetch error:', err);
    }
    return null;
  }

  // Fetch from Nekos.best API
  public static async fetchNekosBest(category: string = 'waifu'): Promise<AnimeApiItem | null> {
    try {
      const response = await fetch(`https://nekos.best/api/v2/${category}`);
      if (!response.ok) throw new Error('Nekos.best request failed');
      const data = await response.json();
      if (data && data.results && data.results.length > 0) {
        const item = data.results[0];
        return {
          url: item.url,
          source: 'Nekos.best API',
          category,
          artistName: item.artist_name || 'Nekos Artist',
        };
      }
    } catch (err) {
      console.warn('Nekos.best fetch error:', err);
    }
    return null;
  }

  // Fetch random character from Jikan (MyAnimeList API)
  public static async fetchJikanCharacter(): Promise<AnimeApiItem | null> {
    try {
      const response = await fetch('https://api.jikan.moe/v4/random/characters');
      if (!response.ok) throw new Error('Jikan request failed');
      const data = await response.json();
      if (data && data.data && data.data.images?.jpg?.image_url) {
        return {
          url: data.data.images.jpg.image_url,
          source: 'Jikan (MyAnimeList API)',
          category: data.data.name || 'Anime Character',
        };
      }
    } catch (err) {
      console.warn('Jikan API fetch error:', err);
    }
    return null;
  }

  // Fetch accessory artwork from DiceBear/Icons API
  public static fetchAccessoryApiImage(seedName: string, style: 'bottts' | 'shapes' | 'lorelei' | 'icons' = 'bottts'): AnimeApiItem {
    const cleanSeed = encodeURIComponent(seedName);
    return {
      url: `https://api.dicebear.com/7.x/${style}/svg?seed=${cleanSeed}`,
      source: `DiceBear ${style.toUpperCase()} Vector API`,
      category: 'Accessory Relic',
    };
  }

  // Master method to get a new random anime avatar from available public/private APIs
  public static async getRandomAnimeAvatar(type: 'waifu' | 'neko' | 'random' = 'waifu'): Promise<AnimeApiItem> {
    // Try multiple APIs in order of preference
    let result = await this.fetchWaifuIm(type === 'neko' ? 'oppai' : 'maid');
    if (!result) {
      result = await this.fetchWaifuPics(type === 'random' ? 'waifu' : type);
    }
    if (!result) {
      result = await this.fetchNekosBest(type === 'random' ? 'waifu' : type);
    }
    if (!result) {
      result = await this.fetchJikanCharacter();
    }

    if (result) return result;

    // Guaranteed high quality anime artwork fallbacks with diverse seeds
    const randomSeed = Math.floor(Math.random() * 10000);
    const animeFallbacks = [
      nurseElfeAngelicImg,
      nurseElfeHeroicImg,
      `https://api.dicebear.com/7.x/lorelei/svg?seed=AnimeHeroine_${randomSeed}`,
      `https://api.dicebear.com/7.x/adventurer/svg?seed=AnimePaladin_${randomSeed}`,
      `https://api.dicebear.com/7.x/bottts/svg?seed=AnimeMedic_${randomSeed}`,
    ];

    return {
      url: animeFallbacks[Math.floor(Math.random() * animeFallbacks.length)],
      source: 'Anime API Engine',
      category: 'Special Hero',
    };
  }

  // Live API Gacha Generator that creates unique Characters or Accessories on the fly
  public static async generateLiveGachaPull(itemType: 'character' | 'accessory' | 'outfit', rarity: 'SSR' | 'SR' | 'R'): Promise<{
    name: string;
    description: string;
    image: string;
    characterName: string;
    sourceApi: string;
  }> {
    if (itemType === 'accessory') {
      const accessoryNames = {
        SSR: [
          'Anointed Crown of Yahusha',
          'Aegis Shield of Faith',
          'Celestial Stethoscope of Divine Grace',
          'Holy Grail of Living Waters',
          'Seraphic Feathered Halo',
          'Diamond Pulse Pendant',
        ],
        SR: [
          'Emerald Herb Satchel',
          'Holographic Vital Scanner',
          'Silver Blessing Chime',
          'Sanctified Olive Pouch',
          'Crystal Water Flask',
        ],
        R: [
          'Digital Pulse Sensor',
          'Compact Medical Chart',
          'Purity Wrist Strap',
          'Therapeutic Oil Vial',
        ],
      };

      const nameList = accessoryNames[rarity];
      const selectedName = nameList[Math.floor(Math.random() * nameList.length)];
      const seed = selectedName.replace(/\s+/g, '') + '_' + Math.floor(Math.random() * 9999);
      const style = rarity === 'SSR' ? 'lorelei' : rarity === 'SR' ? 'shapes' : 'bottts';
      const item = this.fetchAccessoryApiImage(seed, style);

      return {
        name: selectedName,
        description: `Rare divine gear fetched live from ${item.source}. Boosts health tracking efficacy.`,
        image: item.url,
        characterName: 'Universal',
        sourceApi: item.source,
      };
    } else {
      // Character or Outfit pull
      const apiItem = await this.getRandomAnimeAvatar('random');
      const characterTitles = {
        SSR: [
          'Celestia (Seraph Medic)',
          'Titus (Holy Paladin Doctor)',
          'Rei (Solitary Sun Priestess)',
          'Daisuke (Divine Shield Medic)',
          'Hanabi (Cherry Blossom Restorer)',
        ],
        SR: [
          'Natsuki (Wellness Student)',
          'Eren (Faith Monk)',
          'Sora (Breeze Nurse)',
          'Mio (Hydration Maid)',
        ],
        R: [
          'Rookie Trainee Nurse',
          'Assistant Clinic Medic',
          'Health Record Keeper',
        ],
      };

      const titleList = characterTitles[rarity];
      const selectedTitle = titleList[Math.floor(Math.random() * titleList.length)];

      return {
        name: selectedTitle,
        description: `Character summoned via ${apiItem.source} (${apiItem.category}). Ready for health companion duties.`,
        image: apiItem.url,
        characterName: apiItem.category || selectedTitle.split(' ')[0],
        sourceApi: apiItem.source,
      };
    }
  }
}
