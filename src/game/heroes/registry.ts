export type Rarity = 'legend' | 'unique' | 'rare';
export type HeroId = 'shilen' | 'hot' | 'pasha' | 'skeleton';

export type HeroDef = {
  id: HeroId;
  name: string;
  rarity: Rarity;
  owned: boolean;
  idleSrc: string;
  frames: number;      // 32
  frameSize: number;   // 256
  columns: number;     // 32 (кадры в один ряд)
};

export const HEROES_REGISTRY: HeroDef[] = [
  {
    id: 'shilen',
    name: 'Shilen',
    rarity: 'legend',
    owned: true,
    idleSrc: new URL('./shilen/idle.png', import.meta.url).toString(),
    frames: 32,
    frameSize: 256,
    columns: 32,
  },
  {
    id: 'hot',
    name: 'Hot',
    rarity: 'unique',
    owned: true,
    idleSrc: new URL('./hot/idle.png', import.meta.url).toString(),
    frames: 32,
    frameSize: 256,
    columns: 32,
  },
  {
    id: 'pasha',
    name: 'Pasha',
    rarity: 'rare',
    owned: true,
    idleSrc: new URL('./pasha/idle.png', import.meta.url).toString(),
    frames: 32,
    frameSize: 256,
    columns: 32,
  },
  {
    id: 'skeleton',
    name: 'Skeleton King',
    rarity: 'legend',
    owned: true,
    idleSrc: new URL('./skeleton/idle.png', import.meta.url).toString(),
    frames: 32,
    frameSize: 256,
    columns: 32,
  },
];
