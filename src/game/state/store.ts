import { create } from 'zustand';
import { HeroId } from '@/game/heroes';
import { canLevelUp, getMeatCostForNextLevel, levelUpInstance } from '@/game/progression/leveling';
import { openOneCard, type CardRevealResult } from '@/game/progression/recruitment';
import { getPartsRequired, HERO_CARDS_CONFIG } from '@/game/progression/heroCardsConfig';
import { GameState, HeroInstance } from './types';

const INITIAL_SQUAD: HeroId[] = ['shilen', 'hot', 'pasha', 'skeleton'];

const createInitialHero = (heroId: HeroId): HeroInstance => ({
  heroId,
  level: 1,
  xp: 0,
  stars: 0,
  isHero: false,
  skillLevels: {},
  equipmentSlots: {},
});

const initialHeroes: Record<HeroId, HeroInstance> = {
  shilen: createInitialHero('shilen'),
  hot: createInitialHero('hot'),
  pasha: createInitialHero('pasha'),
  skeleton: createInitialHero('skeleton'),
};

const initialState: GameState = {
  heroes: initialHeroes,
  squad: INITIAL_SQUAD,
  resources: {
    wood: 0,
    stone: 0,
    meat: 1000,
    rubies: 0,
    crystals: 0,
  },
  cards: 50,
  heroParts: {
    shilen: 0,
    hot: 0,
    pasha: 0,
    skeleton: 0,
  },
};

type GameStore = GameState & {
  setSquad: (next: HeroId[]) => void;
  addHero: (heroId: HeroId) => void;        // если уже есть — ничего не делает
  removeHero: (heroId: HeroId) => void;     // удаляет из heroes и из squad
  isOwned: (heroId: HeroId) => boolean;
  getHero: (heroId: HeroId) => HeroInstance | undefined;
  levelUpHero: (heroId: HeroId) => boolean;
  addCards: (amount: number) => void;
  openCard: () => CardRevealResult | null;
  craftHero: (heroId: HeroId) => boolean;
  upgradeStars: (heroId: HeroId) => boolean;
};

export const useGameStore = create<GameStore>((set, get) => ({
  ...initialState,

  setSquad: (next: HeroId[]) => {
    const { heroes } = get();
    // Фильтруем только owned и режем до 4 слотов
    const owned = next.filter((id) => heroes[id] !== undefined);
    const limited = owned.slice(0, 4);
    set({ squad: limited });
  },

  addHero: (heroId: HeroId) => {
    const { heroes } = get();
    // Если уже есть — ничего не делаем
    if (heroes[heroId]) return;
    
    set({
      heroes: {
        ...heroes,
        [heroId]: createInitialHero(heroId),
      },
    });
  },

  removeHero: (heroId: HeroId) => {
    const { heroes, squad } = get();
    const newHeroes = { ...heroes };
    delete newHeroes[heroId];
    
    // Убираем из squad
    const newSquad = squad.filter((id) => id !== heroId);
    
    set({
      heroes: newHeroes,
      squad: newSquad,
    });
  },

  isOwned: (heroId: HeroId) => {
    const { heroes } = get();
    return heroes[heroId] !== undefined;
  },

  getHero: (heroId: HeroId) => {
    const { heroes } = get();
    return heroes[heroId];
  },

  levelUpHero: (heroId: HeroId) => {
    const { heroes, resources } = get();
    const hero = heroes[heroId];
    if (!hero) return false;

    const meatAvailable = resources.meat;
    if (!canLevelUp(hero, meatAvailable)) return false;

    const cost = getMeatCostForNextLevel(hero.level);
    const nextHero = levelUpInstance(hero);

    set({
      heroes: {
        ...heroes,
        [heroId]: nextHero,
      },
      resources: {
        ...resources,
        meat: meatAvailable - cost,
      },
    });

    return true;
  },

  addCards: (amount) => {
    const { cards } = get();
    set({ cards: cards + Math.max(0, amount) });
  },

  openCard: () => {
    const { cards, heroes, heroParts } = get();
    if (cards <= 0) return null;

    const res = openOneCard();

    // уменьшаем cards всегда
    const nextCards = cards - 1;

    if (res.kind === 'hero') {
      const alreadyOwned = heroes[res.heroId] !== undefined;
      const craftNeed = getPartsRequired(res.heroId);

      if (alreadyOwned) {
        // дубликат -> части в размере craftNeed
        set({
          cards: nextCards,
          heroParts: {
            ...heroParts,
            [res.heroId]: (heroParts[res.heroId] ?? 0) + craftNeed,
          },
        });
        return { kind: 'parts', heroId: res.heroId, amount: craftNeed };
      }

      // новый герой
      set({
        cards: nextCards,
        heroes: {
          ...heroes,
          [res.heroId]: createInitialHero(res.heroId),
        },
      });
      return res;
    }

    // res.kind === 'parts'
    set({
      cards: nextCards,
      heroParts: {
        ...heroParts,
        [res.heroId]: (heroParts[res.heroId] ?? 0) + res.amount,
      },
    });
    return res;
  },

  craftHero: (heroId) => {
    const { heroes, heroParts } = get();
    if (heroes[heroId]) return false;

    const need = getPartsRequired(heroId);
    const have = heroParts[heroId] ?? 0;
    if (have < need) return false;

    set({
      heroes: { ...heroes, [heroId]: createInitialHero(heroId) },
      heroParts: { ...heroParts, [heroId]: have - need },
    });
    return true;
  },

  upgradeStars: (heroId) => {
    const { heroes, heroParts } = get();
    const hero = heroes[heroId];
    if (!hero) return false;

    const maxStars = HERO_CARDS_CONFIG.maxStars;
    if (hero.stars >= maxStars) return false;

    const nextStar = hero.stars + 1;
    const cost = HERO_CARDS_CONFIG.starUpgradeCost[nextStar - 1] ?? 0;
    const have = heroParts[heroId] ?? 0;
    if (have < cost) return false;

    const isHero = nextStar >= maxStars;

    set({
      heroes: {
        ...heroes,
        [heroId]: { ...hero, stars: nextStar, isHero },
      },
      heroParts: {
        ...heroParts,
        [heroId]: have - cost,
      },
    });

    return true;
  },
}));

