import * as migration_20260601_052449_initial from './20260601_052449_initial';
import * as migration_20260601_134026_cms_menu_reviews from './20260601_134026_cms_menu_reviews';
import * as migration_20260601_134210_seed_menu_content from './20260601_134210_seed_menu_content';
import * as migration_20260601_134726_vercel_blob_media from './20260601_134726_vercel_blob_media';
import * as migration_20260611_192020 from './20260611_192020';

export const migrations = [
  {
    up: migration_20260601_052449_initial.up,
    down: migration_20260601_052449_initial.down,
    name: '20260601_052449_initial',
  },
  {
    up: migration_20260601_134026_cms_menu_reviews.up,
    down: migration_20260601_134026_cms_menu_reviews.down,
    name: '20260601_134026_cms_menu_reviews',
  },
  {
    up: migration_20260601_134210_seed_menu_content.up,
    down: migration_20260601_134210_seed_menu_content.down,
    name: '20260601_134210_seed_menu_content',
  },
  {
    up: migration_20260601_134726_vercel_blob_media.up,
    down: migration_20260601_134726_vercel_blob_media.down,
    name: '20260601_134726_vercel_blob_media',
  },
  {
    up: migration_20260611_192020.up,
    down: migration_20260611_192020.down,
    name: '20260611_192020'
  },
];
