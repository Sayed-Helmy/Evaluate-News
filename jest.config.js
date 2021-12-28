module.exports = {
  verbose: true,
  transform: {
    "^.+\\.js?$": "babel-jest",
    "^.+\\.(svg|png)$": "<rootDir>/svgTransform.js",
  },
};
