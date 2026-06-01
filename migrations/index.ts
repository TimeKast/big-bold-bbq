import * as migration_20260601_052449_initial from './20260601_052449_initial';

export const migrations = [
  {
    up: migration_20260601_052449_initial.up,
    down: migration_20260601_052449_initial.down,
    name: '20260601_052449_initial'
  },
];
