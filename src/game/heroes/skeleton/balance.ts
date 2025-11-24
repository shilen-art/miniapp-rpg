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
      id: 'dark_ritual_heal',
      name: 'Dark Ritual',
      cooldown: 7, // TODO(balance): group-heal cooldown
      targetRule: 'allyLowestHp', // NOTE: enum is single-ally, but by id we'll treat as AoE heal later
      effects: [
        {
          type: 'heal',
          value: 0.10, // 10% of target max HP (interpretation for future battle)
        },
      ],
    },
  ],
};

