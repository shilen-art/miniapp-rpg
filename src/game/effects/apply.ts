import type { HeroBaseStats, HeroSkillDef } from '@/game/heroes/types';
import type { EffectDef, SkillComputed, SkillValueContext, TargetRule } from './types';

// 1) Считает value умения (если есть scaling)
export function computeSkillValue(skill: HeroSkillDef, ctx: SkillValueContext): number {
  const sc = skill.scaling;

  if (!sc) {
    // если scaling нет, берём value первого эффекта или 0
    return skill.effects?.[0]?.value ?? 0;
  }

  const base = ctx.casterStats[sc.from];
  return base * sc.mult + (sc.add ?? 0);
}

// 2) Готовит вычисленную структуру скилла (value + effects)
export function computeSkill(skill: HeroSkillDef, casterStats: HeroBaseStats): SkillComputed {
  const value = computeSkillValue(skill, { casterStats });

  const effects: EffectDef[] = (skill.effects ?? []).map((e) => ({
    ...e,
    // если в эффекте нет value — подставляем рассчитанное
    value: e.value ?? value,
  }));

  return { skill, value, effects };
}

// 3) Выбор цели. Пока заглушка для будущего боевого контекста.
export function selectTargets(rule: TargetRule): 'self' | 'allies' | 'enemies' | 'randomEnemy' | 'enemyFront' {
  switch (rule) {
    case 'self': return 'self';
    case 'allyLowestHp': return 'allies';
    case 'enemyFront': return 'enemyFront';
    case 'randomEnemy': return 'randomEnemy';
    default: return 'enemies';
  }
}

// 4) Применение эффектов: пока возвращаем "план" применения
export function buildEffectPlan(computed: SkillComputed) {
  return {
    targetRule: computed.skill.targetRule,
    cooldown: computed.skill.cooldown,
    effects: computed.effects,
  };
}

