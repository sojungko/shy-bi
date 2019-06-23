const { resolve } = require('path');

module.exports = {
  webpack: (config) => {
    /* Add aliases */
    config.resolve.alias = {
      ...config.resolve.alias,
      actions: resolve(__dirname, 'src/actions/index'),
      components: resolve(__dirname, 'src/components'),
      modules: resolve(__dirname, 'src/modules'),
    };
    return config;
  },
};
