import { create } from 'zustand';

export type SceneId = 'loading' | 'mainPage' | 'main-menu' | 'settlement' | 'field' | 'dungeon' | 'boss';

export type ResourceKey = 'wood' | 'stone' | 'food' | 'rubies' | 'crystals';

export interface Resources {
  wood: number;
  stone: number;
  food: number;
  rubies: number;
  crystals: number;
}

interface GameState {
  activeScene: SceneId;
  resources: Resources;

  setActiveScene: (scene: SceneId) => void;
  addResource: (key: ResourceKey, amount: number) => void;
  spendResource: (key: ResourceKey, amount: number) => boolean;
  resetGame: () => void;
}

const initialResources: Resources = {
  wood: 0,
  stone: 0,
  food: 0,
  rubies: 0,
  crystals: 0,
};

export const useGameStore = create<GameState>((set, get) => ({
  activeScene: 'loading',
  resources: initialResources,

  setActiveScene: scene => set({ activeScene: scene }),

  addResource: (key, amount) =>
    set(state => ({
      resources: {
        ...state.resources,
        [key]: state.resources[key] + amount,
      },
    })),

  spendResource: (key, amount) => {
    const { resources } = get();
    if (resources[key] < amount) {
      return false;
    }

    set({
      resources: {
        ...resources,
        [key]: resources[key] - amount,
      },
    });

    return true;
  },

  resetGame: () =>
    set({
      activeScene: 'loading',
      resources: initialResources,
    }),
}));

