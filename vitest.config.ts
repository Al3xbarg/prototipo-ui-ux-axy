import { defineConfig } from 'vitest/config'

export default defineConfig({
  test: {
    environment: 'node',
    include: ['**/*.test.ts'],
    exclude: ['node_modules', '.next', 'dist'],
    // Genera un reporte JUnit para que Jenkins lo muestre en "Test Result".
    reporters: ['default', 'junit'],
    outputFile: {
      junit: './test-results/junit.xml',
    },
    // Cobertura para SonarQube (genera coverage/lcov.info).
    coverage: {
      provider: 'v8',
      reporter: ['text', 'lcov'],
      reportsDirectory: './coverage',
      include: ['lib/**/*.ts'],
      exclude: ['**/*.test.ts'],
    },
  },
})
