// jest.config.js
export default {
    // This tells Jest how to handle files with .ts extension
    preset: 'ts-jest', 
    testEnvironment: 'node',
    // Search for test files in a standard directory
    testMatch: ['**/__tests__/**/*.test.ts'], 
    // Mappings for ES Modules setup
    moduleNameMapper: {
        // Handle path aliases or module resolution specifically for Jest
        '^(\\.{1,2}/.*)\\.js$': '$1',
    },
    // Necessary to avoid module issues when using "type": "module" in package.json
    extensionsToTreatAsEsm: ['.ts'],
    globals: {
        'ts-jest': {
            useESM: true,
        },
    },
};