const path = require('path');
const TsconfigPathsPlugin = require('tsconfig-paths-webpack-plugin');

module.exports = {
  stories: [
    '../frontend/stories/**/*.stories.mdx',
    '../frontend/stories/**/*.stories.@(js|jsx|ts|tsx)',
  ],
  addons: [
    '@storybook/addon-links',
    '@storybook/addon-essentials',
    // nomodule
    {
      name: `@storybook/preset-scss`,
      options: {
        rule: {
          test: /(?<!\.module).s[ca]ss$/,
        },
      },
    },
    // module
    {
      name: `@storybook/preset-scss`,
      options: {
        rule: {
          test: /\.module\.s[ca]ss$/,
        },
        cssLoaderOptions: {
          modules: {
            localIdentName: '[name]__[local]--[hash:base64:5]',
          },
        },
      },
    },
  ],
  webpackFinal: async (config, { configType }) => {
    config.resolve.plugins = [
      new TsconfigPathsPlugin({
        configFile: path.resolve(__dirname, '../tsconfig.json'),
      }),
    ];

    // Return the altered config
    return config;
  },
};
