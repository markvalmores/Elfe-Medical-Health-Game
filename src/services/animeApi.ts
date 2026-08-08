// Anime API integration service supporting public endpoints (Waifu.pics, Waifu.im, Nekos.best, Jikan) 
// and private authorized key modes for AI-generated anime avatars and outfit cards.

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

    // Guaranteed high quality anime artwork fallbacks
    const animeFallbacks = [
      'https://raw.githubusercontent.com/CatMeow/Anime-Avatars/main/avatars/anime_nurse_1.jpg',
      'https://raw.githubusercontent.com/CatMeow/Anime-Avatars/main/avatars/anime_waifu_2.jpg',
      'https://api.dicebear.com/7.x/bottts/svg?seed=NurseElfeAnime',
      'https://api.dicebear.com/7.x/adventurer/svg?seed=NurseElfeWaifu',
      'https://api.dicebear.com/7.x/lorelei/svg?seed=NurseElfeAngelic',
    ];

    return {
      url: animeFallbacks[Math.floor(Math.random() * animeFallbacks.length)],
      source: 'Anime Vector Engine',
      category: 'Nurse Elfe Special',
    };
  }
}
