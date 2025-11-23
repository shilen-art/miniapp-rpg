import { HeroBalance } from '../types';

export const heroBalance: HeroBalance = {
  class: 'mage',
  rarity: 'rare',
  statsBase: {
    attack: 12,
    hp: 80,
    defense: 3,
    critChance: 0.15,
    range: 300,
    attackInterval: 1.5,
  },
  scaling: {
    attackPerLevel: 2.5,
    hpPerLevel: 12,
  },
  skills: [],
};

