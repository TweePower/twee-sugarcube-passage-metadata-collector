module.exports = {
    globals: {
        "ts-jest": {
            tsconfig: "tsconfig.json",
        },
    },
    moduleFileExtensions: [
        "ts",
        "js"
    ],
    transform: {
        "^.+\\.(ts|js)$": "ts-jest"
    },
    testMatch: [
        "**/test/**/*.test.(ts)"
    ],
    testEnvironment: "jsdom",
    setupFiles: [
        '<rootDir>/test/jest.setup.js'
    ],
};
