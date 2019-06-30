const { resolve } = require('path');

module.exports = {
  webpack: (config) => {
    /* Add aliases */
    config.resolve.alias = {
      ...config.resolve.alias,
      actions: resolve(__dirname, 'src/actions/index'),
      constants: resolve(__dirname, 'src/constants'),
      components: resolve(__dirname, 'src/components'),
      modules: resolve(__dirname, 'src/modules'),
      src: resolve(__dirname, 'src'),
    };

    return config;
  },
};
