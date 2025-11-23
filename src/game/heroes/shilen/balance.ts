import { HeroBalance } from '../types';

export const heroBalance: HeroBalance = {
  class: 'warrior',
  rarity: 'gold',
  statsBase: {
    attack: 15,
    hp: 120,
    defense: 8,
    critChance: 0.1,
    range: 150,
    attackInterval: 1.0,
  },
  scaling: {
    attackPerLevel: 3,
    hpPerLevel: 20,
  },
  skills: [],
};

