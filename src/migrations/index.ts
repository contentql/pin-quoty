import * as migration_20250106_062520 from './20250106_062520';

export const migrations = [
  {
    up: migration_20250106_062520.up,
    down: migration_20250106_062520.down,
    name: '20250106_062520'
  },
];
