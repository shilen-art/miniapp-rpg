import { HeroBalance } from '../types';

export const heroBalance: HeroBalance = {
  class: 'warrior',
  rarity: 'legend',
  statsBase: {
    attack: 25,
    hp: 120,
    defense: 8,
    critChance: 0.2,
    range: 200,
    attackInterval: 1.0,
  },
  scaling: {
    attackPerLevel: 3,
    hpPerLevel: 20,
  },
  skills: [
    {
      id: 'triple_arrow_volley',
      name: 'Triple Arrow Volley',
      cooldown: 6,
      targetRule: 'enemyFront', // AoE later: all enemies
      scaling: { from: 'attack', mult: 1.2 },
      effects: [
        { type: 'damage' } // AoE: hits all enemies once (visual 3 arrows)
      ],
    },
  ],
};

