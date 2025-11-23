import { HeroBalance } from '../types';

export const heroBalance: HeroBalance = {
  class: 'healer',
  rarity: 'unique',
  statsBase: {
    attack: 10,
    hp: 100,
    defense: 5,
    critChance: 0.05,
    range: 200,
    attackInterval: 1.2,
  },
  scaling: {
    attackPerLevel: 2,
    hpPerLevel: 15,
  },
  skills: [],
};

