const {
  override, fixBabelImports, addLessLoader, addBabelPlugins,
} = require('customize-cra');

module.exports = override(
  fixBabelImports('import', {
    libraryName: 'antd',
    libraryDirectory: 'es',
    style: true,
  }),
  addLessLoader({
    javascriptEnabled: true,
    // modifyVars: { '@primary-color': '#25b864' },
  }),
  addBabelPlugins(['styled-components', {
    displayName: true,
  }]),
);
