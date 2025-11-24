import { HeroBalance } from '../types';

export const heroBalance: HeroBalance = {
  class: 'tank',
  rarity: 'unique',
  statsBase: {
    attack: 10,
    hp: 250,
    defense: 30,
    critChance: 0.05,
    range: 50,
    attackInterval: 1.2,
  },
  scaling: {
    attackPerLevel: 2,
    hpPerLevel: 15,
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
      id: 'dragon_shield',
      name: 'Dragon Shield',
      cooldown: 8, // TODO(balance)
      targetRule: 'self',
      effects: [
        {
          type: 'buff',
          stat: 'defense',
          value: 0.5,  // +50% defense
          duration: 5, // TODO(balance)
        },
      ],
    },
  ],
};

