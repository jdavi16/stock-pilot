const postcssPresetEnv = require("postcss-preset-env");
const postcssNesting = require("postcss-nesting");

module.exports = {
  plugins: [
    postcssNesting(), // This is what allows the nesting syntax
    postcssPresetEnv({
      stage: 0, // Enable all modern CSS features
      features: {
        "logical-properties-and-values": false,
        "prefers-color-scheme-query": false,
        "gap-properties": false,
        "custom-properties": false,
        "dir-pseudo-class": false,
        "focus-within-pseudo-class": false,
        "focus-visible-pseudo-class": false,
        "color-functional-notation": false,
        "nesting-rules": true,
        "is-pseudo-class": true,
      },
    }),
  ],
};
