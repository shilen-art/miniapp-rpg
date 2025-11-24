import { HeroBaseStats, HeroScaling } from './types';
import { HeroDef } from './registry';
import { HERO_CARDS_CONFIG } from '@/game/progression/heroCardsConfig';
import type { HeroInstance } from '@/game/state/types';

/**
 * Применяет scaling к базовым статам для указанного уровня
 * @param base - базовые статы
 * @param scaling - опциональные значения прироста за уровень
 * @param level - уровень героя (≥ 1)
 * @returns итоговые статы после применения scaling
 */
export function applyScaling(
  base: HeroBaseStats,
  scaling: HeroScaling | undefined,
  level: number
): HeroBaseStats {
  if (level < 1) {
    throw new Error('Level must be >= 1');
  }

  const levelDiff = level - 1;

  return {
    attack: base.attack + (scaling?.attackPerLevel ?? 0) * levelDiff,
    hp: base.hp + (scaling?.hpPerLevel ?? 0) * levelDiff,
    defense: base.defense + (scaling?.defensePerLevel ?? 0) * levelDiff,
    critChance: base.critChance + (scaling?.critChancePerLevel ?? 0) * levelDiff,
    range: base.range + (scaling?.rangePerLevel ?? 0) * levelDiff,
    attackInterval: base.attackInterval,
  };
}

/**
 * Получает итоговые статы героя на указанном уровне
 * @param hero - определение героя
 * @param level - уровень героя (по умолчанию 1)
 * @returns итоговые статы без экипа/сет-бонусов/исследований
 */
export function getBaseStats(hero: HeroDef, level: number = 1): HeroBaseStats {
  const base = hero.balance.statsBase;
  const scaling = hero.balance.scaling;

  return applyScaling(base, scaling, level);
}

/**
 * Преобразует critChance (0..1) в проценты с 1 знаком после запятой
 * @param stats - статы героя
 * @returns процент критического шанса
 */
export function getCritPercent(stats: HeroBaseStats): number {
  return Math.round(stats.critChance * 1000) / 10;
}

/**
 * Применяет бонус звёзд к базовым статам
 * @param base - базовые статы
 * @param stars - количество звёзд (0..maxStars)
 * @returns статы с применённым бонусом звёзд
 */
export function applyStarBonus(base: HeroBaseStats, stars: number): HeroBaseStats {
  if (stars <= 0) return base;
  const mult = HERO_CARDS_CONFIG.starBonuses[Math.min(stars, HERO_CARDS_CONFIG.maxStars) - 1] ?? 0;
  if (mult <= 0) return base;

  return {
    ...base,
    attack: Math.round(base.attack * (1 + mult)),
    hp: Math.round(base.hp * (1 + mult)),
    defense: Math.round(base.defense * (1 + mult)),
    // critChance, range, attackInterval пока не бафаем (можно позже)
  };
}

/**
 * Получает итоговые статы героя по инстансу (уровень + звёзды)
 * @param heroDef - определение героя
 * @param inst - инстанс героя
 * @returns итоговые статы с учётом уровня и звёзд
 */
export function getFinalStatsForInstance(heroDef: HeroDef, inst: HeroInstance): HeroBaseStats {
  const base = getBaseStats(heroDef, inst.level);
  return applyStarBonus(base, inst.stars);
}

