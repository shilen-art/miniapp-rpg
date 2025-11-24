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
      id: 'dragon_shield',
      name: 'Dragon Shield',
      cooldown: 8, // TODO(balance): cooldown in seconds for self-buff
      targetRule: 'self', // cast only on self
      effects: [
        {
          type: 'buff',
          stat: 'defense',  // which stat is buffed
          value: 0.5,       // +50% defense (multiplier)
          duration: 5,      // TODO(balance): buff duration in seconds
        },
      ],
    },
  ],
};

