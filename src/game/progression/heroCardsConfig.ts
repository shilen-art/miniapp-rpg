import type { HeroId } from '@/game/heroes';

export type RarityKey = 'legend' | 'unique' | 'rare' | 'hero';

export const HERO_CARDS_CONFIG = {
  // шанс, что при открытии карточки выпадет целый герой
  // остальное (1 - heroDropChance) = части
  heroDropChance: 0.05, // TODO(balance)

  // сколько частей даёт карточка, если выпали части (НЕ дубликат)
  partsPerCard: 1, // TODO(balance)

  // maxStars для прокачки звёздности
  maxStars: 5,

  // стоимость каждой звезды в частях (1..maxStars)
  starUpgradeCost: [5, 10, 15, 20, 25], // TODO(balance)

  // бонусы звёзд к статам (мульты), индекс = новая звезда
  // пример: 1 звезда +5% ко всем статам, 2 звезды +10%, ...
  starBonuses: [0.05, 0.10, 0.15, 0.20, 0.30], // TODO(balance)

  // требования частей на крафт героя и веса выпадения
  heroes: {
    shilen: {
      partsRequired: 20,
      // вес выпадения конкретного героя, когда выпадает целый герой
      heroWeight: 10,
      // вес выпадения частей этого героя, когда выпадают части
      partsWeight: 25,
    },
    hot: {
      partsRequired: 20,
      heroWeight: 6,
      partsWeight: 20,
    },
    pasha: {
      partsRequired: 20,
      heroWeight: 8,
      partsWeight: 22,
    },
    skeleton: {
      partsRequired: 20,
      heroWeight: 5,
      partsWeight: 18,
    },
  } satisfies Record<HeroId, {
    partsRequired: number;
    heroWeight: number;
    partsWeight: number;
  }>,
};

export function getPartsRequired(heroId: HeroId) {
  return HERO_CARDS_CONFIG.heroes[heroId].partsRequired;
}

