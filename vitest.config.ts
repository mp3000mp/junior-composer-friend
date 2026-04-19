import { fileURLToPath } from 'node:url'
import { mergeConfig, defineConfig, configDefaults } from 'vitest/config'
import type { UserConfig } from 'vite'
import viteConfig from './vite.config'

export default mergeConfig(
  viteConfig as UserConfig,
  defineConfig({
    test: {
      coverage: {
        provider: 'v8',
        reporter: ['text', 'lcov'],
        include: [
          'src'
        ],
        exclude: [
          ...configDefaults.exclude,
          '**/__tests__/**',
        ]
      },
      environment: 'jsdom',
      root: fileURLToPath(new URL('./', import.meta.url)),
      setupFiles: ['./src/music/__tests__/setup.ts'],
    },
  }),
)
