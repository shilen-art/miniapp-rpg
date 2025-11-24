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
      id: 'auto_attack',
      name: 'Auto Attack',
      cooldown: 0,
      targetRule: 'enemyFront',
      scaling: { from: 'attack', mult: 1.0, add: 0 }, // TODO(balance)
      effects: [{ type: 'damage' }],
    },
    {
      id: 'whirlwind_slash',
      name: 'Whirlwind Slash',
      cooldown: 6, // TODO(balance)
      targetRule: 'enemyFront', // AoE later by id
      scaling: { from: 'attack', mult: 1.1, add: 0 }, // TODO(balance)
      effects: [{ type: 'damage' }],
    },
  ],
};

