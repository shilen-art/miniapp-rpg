import idlePngImportedViaUrl from './idle.png?url';

export const heroConfig = {
  id: 'shilen',
  name: 'Shilen',
  rarity: 'legend',
  owned: true,

  sprites: {
    idle: {
      src: idlePngImportedViaUrl,
      frames: 32,
      frameSize: 256,
      columns: 32,
      // optional:
      // scale?: number
      // speed?: number
      // offset?: { x: number; y: number }
    } as {
      src: string;
      frames: number;
      frameSize: number;
      columns: number;
      scale?: number;
      speed?: number;
      offset?: { x: number; y: number };
    }
  },

  skills: {},
  statsBase: {},
} as const;
