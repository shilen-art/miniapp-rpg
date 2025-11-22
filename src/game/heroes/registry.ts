import { heroConfig as shilen } from './shilen';
import { heroConfig as hot } from './hot';
import { heroConfig as pasha } from './pasha';
import { heroConfig as skeleton } from './skeleton';

export type HeroDef =
  | typeof shilen
  | typeof hot
  | typeof pasha
  | typeof skeleton;

export type HeroId = HeroDef['id'];
export type Rarity = HeroDef['rarity'];

export const HEROES_REGISTRY: HeroDef[] = [
  shilen,
  hot,
  pasha,
  skeleton,
];
