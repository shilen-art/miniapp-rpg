import type { HeroId } from '@/game/heroes';
import { HERO_CARDS_CONFIG } from './heroCardsConfig';

function weightedPick<T extends string>(weights: Record<T, number>): T {
  const entries = Object.entries(weights) as [T, number][];
  const total = entries.reduce((s, [, w]) => s + w, 0);
  let r = Math.random() * total;
  for (const [id, w] of entries) {
    r -= w;
    if (r <= 0) return id;
  }
  return entries[entries.length - 1][0];
}

// когда выпадает целый герой
export function rollHeroId(): HeroId {
  const weights = Object.fromEntries(
    Object.entries(HERO_CARDS_CONFIG.heroes).map(([id, v]) => [id, v.heroWeight])
  ) as Record<HeroId, number>;

  return weightedPick(weights);
}

// когда выпадают части
export function rollPartsHeroId(): HeroId {
  const weights = Object.fromEntries(
    Object.entries(HERO_CARDS_CONFIG.heroes).map(([id, v]) => [id, v.partsWeight])
  ) as Record<HeroId, number>;

  return weightedPick(weights);
}

export type CardRevealResult =
  | { kind: 'hero'; heroId: HeroId }
  | { kind: 'parts'; heroId: HeroId; amount: number };

export function openOneCard(): CardRevealResult {
  const isHeroDrop = Math.random() < HERO_CARDS_CONFIG.heroDropChance;

  if (isHeroDrop) {
    return { kind: 'hero', heroId: rollHeroId() };
  }

  return {
    kind: 'parts',
    heroId: rollPartsHeroId(),
    amount: HERO_CARDS_CONFIG.partsPerCard,
  };
}

