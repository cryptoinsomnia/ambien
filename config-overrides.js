const { injectBabelPlugin } = require('react-app-rewired');
const rewireLess = require('react-app-rewire-less');

module.exports = function override(config, env) {
  config = injectBabelPlugin(
    ['import', { libraryName: 'antd', style: true }],
    config
  );
  // https://github.com/ant-design/ant-design/blob/master/components/style/themes/default.less
  config = rewireLess.withLoaderOptions({
    modifyVars: {
      '@primary-color': '#0f215b',
      '@font-family': '\'Raleway\', sans-serif',
      '@font-size-base': '16px',
      '@font-size-sm': '14px',
    },
  })(config, env);
  return config;
};
