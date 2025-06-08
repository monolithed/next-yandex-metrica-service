import type {Config} from 'jest';

const config: Config = {
    preset: 'ts-jest',
    testEnvironment: 'jsdom',
    clearMocks: true,
    setupFilesAfterEnv: ['<rootDir>/jest-setup.ts'],

    moduleNameMapper: {
        '^@/(.*)$': '<rootDir>/src/$1'
    },

    testMatch: [
        '<rootDir>/tests/**/*.[jt]s?(x)'
    ],

    transform: {
        '^.+\\.(js|jsx|ts|tsx)$': [
            'babel-jest', {
                presets: [
                    '@babel/preset-typescript',
                    [
                        '@babel/preset-react', {
                            runtime: 'automatic'
                        }
                    ],
                    [
                        '@babel/preset-env', {
                            targets: {
                                node: 'current'
                            }
                        }
                    ]
                ]
            }
        ]
    },
    transformIgnorePatterns: ['/node_modules/']
};

export default config;
