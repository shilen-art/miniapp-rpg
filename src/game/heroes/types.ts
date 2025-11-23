export type HeroClass = 'tank' | 'warrior' | 'mage' | 'healer';

export type Rarity = 'legend' | 'unique' | 'rare' | 'hero';

export type HeroBaseStats = {
  attack: number;
  hp: number;
  defense: number;
  critChance: number;
  range: number;
  attackInterval: number;
};

export type HeroScaling = Partial<{
  attackPerLevel: number;
  hpPerLevel: number;
  defensePerLevel: number;
  critChancePerLevel: number;
  rangePerLevel: number;
}>;

export type HeroSkillDef = {
  id: string;
  name: string;
  cooldown: number;
  targetRule: 'self' | 'allyLowestHp' | 'enemyFront' | 'randomEnemy';
  scaling?: {
    from: 'attack' | 'hp' | 'defense';
    mult: number;
    add?: number;
  };
  effects?: Array<{
    type: 'damage' | 'heal' | 'buff' | 'debuff';
    value?: number;
    duration?: number;
  }>;
};

export type HeroBalance = {
  class: HeroClass;
  rarity: Rarity;
  statsBase: HeroBaseStats;
  scaling?: HeroScaling;
  skills: HeroSkillDef[];
};

