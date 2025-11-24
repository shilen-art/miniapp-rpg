import { HeroBalance } from '../types';

export const heroBalance: HeroBalance = {
  class: 'mage',
  rarity: 'legend',
  statsBase: {
    attack: 40,
    hp: 80,
    defense: 12,
    critChance: 0.05,
    range: 300,
    attackInterval: 1.3,
  },
  scaling: {
    attackPerLevel: 1.5,
    hpPerLevel: 25,
    defensePerLevel: 2,
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
      id: 'dark_ritual_heal',
      name: 'Dark Ritual',
      cooldown: 7, // TODO(balance)
      targetRule: 'allyLowestHp', // group heal later by id
      effects: [
        {
          type: 'heal',
          value: 0.10, // 10% max HP per ally (later)
        },
      ],
    },
  ],
};

