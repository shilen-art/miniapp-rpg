import type { HeroBaseStats, HeroSkillDef } from '@/game/heroes/types';

export type EffectType = 'damage' | 'heal' | 'buff' | 'debuff';

export type EffectDef = {
  type: EffectType;
  value?: number;     // если нет scaling, берём это
  duration?: number;  // для buff/debuff в будущем
  stat?: keyof HeroBaseStats; // какой стат меняем (buff/debuff)
};

export type TargetRule = HeroSkillDef['targetRule'];

export type SkillValueContext = {
  casterStats: HeroBaseStats;
};

export type SkillComputed = {
  skill: HeroSkillDef;
  value: number; // рассчитанное итоговое значение (урон/хил и т.п.)
  effects: EffectDef[];
};

