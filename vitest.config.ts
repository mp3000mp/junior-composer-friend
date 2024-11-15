import { fileURLToPath } from 'node:url'
import { mergeConfig, defineConfig, configDefaults } from 'vitest/config'
import viteConfig from './vite.config'

export default mergeConfig(
  viteConfig,
  defineConfig({
    test: {
      coverage: {
        provider: 'v8',
        reporter: ['text'],
        include: [
          'src'
        ],
        extension: ['.ts', '.vue'],
        exclude: [
          ...configDefaults.exclude,
          '**/__tests__/**',
        ]
      },
      environment: 'jsdom',
      exclude: [
        ...configDefaults.exclude,
        'e2e/**',
      ],
      root: fileURLToPath(new URL('./', import.meta.url)),
    },
  }),
)
