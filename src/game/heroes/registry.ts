import { heroConfig as shilenConfig, heroBalance as shilenBalance } from './shilen';
import { heroConfig as hotConfig, heroBalance as hotBalance } from './hot';
import { heroConfig as pashaConfig, heroBalance as pashaBalance } from './pasha';
import { heroConfig as skeletonConfig, heroBalance as skeletonBalance } from './skeleton';
import { HeroBalance } from './types';

export type HeroVisual =
  | typeof shilenConfig
  | typeof hotConfig
  | typeof pashaConfig
  | typeof skeletonConfig;

// HeroDef сохраняет legacy поля для текущего UI
export type HeroDef = HeroVisual & {
  balance: HeroBalance;

  // legacy aliases (чтобы старый UI не падал)
  rarity: HeroBalance['rarity'];
  skills: HeroBalance['skills'];
  statsBase: HeroBalance['statsBase'];
};

const shilen: HeroDef = {
  ...shilenConfig,
  balance: shilenBalance,
  rarity: shilenBalance.rarity,
  skills: shilenBalance.skills,
  statsBase: shilenBalance.statsBase,
};

const hot: HeroDef = {
  ...hotConfig,
  balance: hotBalance,
  rarity: hotBalance.rarity,
  skills: hotBalance.skills,
  statsBase: hotBalance.statsBase,
};

const pasha: HeroDef = {
  ...pashaConfig,
  balance: pashaBalance,
  rarity: pashaBalance.rarity,
  skills: pashaBalance.skills,
  statsBase: pashaBalance.statsBase,
};

const skeleton: HeroDef = {
  ...skeletonConfig,
  balance: skeletonBalance,
  rarity: skeletonBalance.rarity,
  skills: skeletonBalance.skills,
  statsBase: skeletonBalance.statsBase,
};

export type HeroId = HeroDef['id'];
export type Rarity = HeroDef['balance']['rarity'];

export const HEROES_REGISTRY: HeroDef[] = [
  shilen,
  hot,
  pasha,
  skeleton,
];
