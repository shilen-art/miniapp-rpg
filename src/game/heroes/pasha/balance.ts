import { HeroBalance } from '../types';

export const heroBalance: HeroBalance = {
  class: 'warrior',
  rarity: 'rare',
  statsBase: {
    attack: 18,
    hp: 120,
    defense: 15,
    critChance: 0.15,
    range: 50,
    attackInterval: 1,
  },
  scaling: {
    attackPerLevel: 2.5,
    hpPerLevel: 12,
  },
  skills: [
    {
      id: 'whirlwind_slash',
      name: 'Whirlwind Slash',
      cooldown: 6, // TODO(balance): AoE skill cooldown
      targetRule: 'enemyFront', // NOTE: enum has no "allEnemies"; treat as AoE by id later
      scaling: {
        from: 'attack',
        mult: 1.1, // TODO(balance): damage multiplier from attack
        add: 0,
      },
      effects: [
        { type: 'damage' }, // AoE damage to all enemies once
      ],
    },
  ],
};

