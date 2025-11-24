import { HeroBalance } from '../types';

export const heroBalance: HeroBalance = {
  class: 'ranger',
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
      id: 'auto_attack',
      name: 'Auto Attack',
      cooldown: 0, // auto skill, real tempo uses statsBase.attackInterval
      targetRule: 'enemyFront', // single target by default
      scaling: { from: 'attack', mult: 1.0, add: 0 }, // TODO(balance): base auto multiplier
      effects: [{ type: 'damage' }],
    },
    {
      id: 'triple_arrow_volley',
      name: 'Triple Arrow Volley',
      cooldown: 6, // TODO(balance)
      targetRule: 'enemyFront', // AoE later: all enemies by id
      scaling: { from: 'attack', mult: 1.2 },
      effects: [
        { type: 'damage' }, // AoE: hits all enemies once (visual 3 arrows)
      ],
    },
  ],
};

