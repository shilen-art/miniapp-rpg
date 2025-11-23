import { HeroBalance } from '../types';

export const heroBalance: HeroBalance = {
  class: 'tank',
  rarity: 'gold',
  statsBase: {
    attack: 8,
    hp: 150,
    defense: 12,
    critChance: 0.05,
    range: 100,
    attackInterval: 1.3,
  },
  scaling: {
    attackPerLevel: 1.5,
    hpPerLevel: 25,
    defensePerLevel: 2,
  },
  skills: [],
};

