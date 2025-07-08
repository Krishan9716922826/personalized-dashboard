// jest.config.js
module.exports = {
  preset: "ts-jest",
  testEnvironment: "jsdom",
  moduleNameMapper: {
    "^@/(.*)$": "<rootDir>/src/$1", // your alias
  },
  transform: {
    "^.+\\.(ts|tsx)$": "ts-jest",
  },
  testMatch: ["**/?(*.)+(test).ts?(x)"],
  globals: {
    "ts-jest": {
      tsconfig: "tsconfig.jest.json" // 👈 point to the new config
    }
  }
};

