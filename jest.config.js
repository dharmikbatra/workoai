module.exports = {
    collectCoverage: true,
    collectCoverageFrom: [
      '*.{js,jsx,ts,tsx}',
      '!index.js', // Exclude specific files if necessary
    ],
    coverageDirectory: 'coverage',
    coverageReporters: ['html', 'text'],
  };
  