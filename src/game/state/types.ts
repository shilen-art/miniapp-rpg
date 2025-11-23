import { HeroId } from '@/game/heroes';

export type HeroInstance = {
  heroId: HeroId;      // уникален в инвентаре
  level: number;
  xp: number;
  stars: number;       // 0..maxStars (пока maxStars константа)
  isHero: boolean;     // true если stars == maxStars
  skillLevels: Record<string, number>; // сейчас пусто
  equipmentSlots: {
    weapon?: string;
    helm?: string;
    armor?: string;
    boots?: string;
    nftSet?: string;
  };
};

export type GameState = {
  heroes: Record<HeroId, HeroInstance>; // КЛЮЧЕВО: без дубликатов
  squad: HeroId[];                      // отряд по heroId (так как дублей нет)
  resources: {
    wood: number;
    stone: number;
    meat: number;
    rubies: number;
    crystals: number;
  };
};

