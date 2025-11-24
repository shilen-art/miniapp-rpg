import { create } from 'zustand';
import { HeroId } from '@/game/heroes';
import { canLevelUp, getMeatCostForNextLevel, levelUpInstance } from '@/game/progression/leveling';
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
};

type GameStore = GameState & {
  setSquad: (next: HeroId[]) => void;
  addHero: (heroId: HeroId) => void;        // если уже есть — ничего не делает
  removeHero: (heroId: HeroId) => void;     // удаляет из heroes и из squad
  isOwned: (heroId: HeroId) => boolean;
  getHero: (heroId: HeroId) => HeroInstance | undefined;
  levelUpHero: (heroId: HeroId) => boolean;
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
}));

