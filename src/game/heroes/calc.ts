import { HeroBaseStats, HeroScaling } from './types';
import { HeroDef } from './registry';

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

