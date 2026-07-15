import * as migration_20260715_100155_initial from './20260715_100155_initial';

export const migrations = [
  {
    up: migration_20260715_100155_initial.up,
    down: migration_20260715_100155_initial.down,
    name: '20260715_100155_initial'
  },
];
