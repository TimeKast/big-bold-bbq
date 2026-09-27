import { defineConfig } from 'vitest/config';

/**
 * Minimal Vitest config — dev-owned (NOT kit-tracked).
 *
 * The kit's own `vitest.setup.ts` (shipped by `factory update`, see that file's header)
 * pulls in `@testing-library/jest-dom` + `@testing-library/react`, which this project does
 * not install — there are no component tests yet. Intentionally NOT wired as `setupFiles`
 * here; see `tsconfig.json`'s `exclude` for the matching typecheck exemption.
 */
export default defineConfig({
  test: {
    environment: 'node',
    include: ['**/*.test.ts'],
    exclude: ['node_modules', '.next'],
  },
  resolve: {
    alias: {
      '@': import.meta.dirname,
    },
  },
});
