import { HeroInstance } from '@/game/state/types';

export const getMeatCostForNextLevel = (currentLevel: number): number => {
  return 5 * currentLevel;
};

export const canLevelUp = (hero: HeroInstance, meatAvailable: number): boolean => {
  const cost = getMeatCostForNextLevel(hero.level);
  return meatAvailable >= cost;
};

export const levelUpInstance = (hero: HeroInstance): HeroInstance => {
  return {
    ...hero,
    level: hero.level + 1,
  };
};

