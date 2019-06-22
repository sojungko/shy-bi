const path = require('path');

module.exports = {
  pageExtensions: ['jsx', 'js'],
  webpack: (config, { buildId, dev, isServer, defaultLoaders, webpack }) => {
    config.resolve.alias = {
      ...config.resolve.alias,
      actions: path.resolve(__dirname, 'src/actions/index'),
      modules: path.resolve(__dirname, 'src/modules'),
    };
    return config;
  },
};
