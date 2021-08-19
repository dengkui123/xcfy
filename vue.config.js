const path = require('path');
const resolve = (dir) => {
  return path.join(__dirname, dir);
};
const proxyTarget = 'http://112.74.194.67:8081/';
const proxyApis = {
  '/exhibition-api/': proxyTarget,
};

module.exports = {
  publicPath: '/',
  outputDir: './dist',
  lintOnSave: true,
  productionSourceMap: false,
  css: {
    requireModuleExtension: true,
    loaderOptions: {
      less: {
        lessOptions: {
          javascriptEnabled: true,
        },
      },
    },
  },
  parallel: require('os').cpus().length > 1,
  runtimeCompiler: true,
  configureWebpack: (config) => {
    config.entry = ['babel-polyfill', './src/main.js'];
  },
  chainWebpack: (config) => {
    if (process.env.npm_config_report) {
      config
        .plugin('webpack-bundle-analyzer')
        .use(require('webpack-bundle-analyzer').BundleAnalyzerPlugin);
    }
    // 增加路径别名
    config.resolve.alias
      .set('@', resolve('src'))
      .set('@assets', resolve('src/assets'))
      .set('@components', resolve('src/components'))
      .set('@pages', resolve('src/pages'));
    // 修复HMR(热更新)失效
    config.resolve.symlinks(true);

    const svgRule = config.module.rule('svg');
    // 清除已有的所有loader
    // 如果你不这样做，接下来的loader会附加在该规则现有的loader之后
    svgRule.uses.clear();
    svgRule
      .test(/\.svg$/)
      .include.add(path.resolve(__dirname, './src/icons/svg'))
      .end()
      .use('svg-sprite-loader')
      .loader('svg-sprite-loader')
      .options({
        symbolId: 'icon-[name]',
      });
    const fileRule = config.module.rule('file');
    fileRule.uses.clear();
    fileRule
      .test(/\.svg$/)
      .exclude.add(path.resolve(__dirname, './src/icons/svg'))
      .end()
      .use('file-loader')
      .loader('file-loader');
  },
  devServer: {
    open: process.platform === 'darwin',
    host: '0.0.0.0',
    port: 8080,
    https: false,
    hotOnly: true,
    overlay: {
      warnings: false,
      errors: true,
    },
    proxy: (() => {
      const proxyObj = {};
      Object.keys(proxyApis).forEach((key) => {
        proxyObj[key] = {
          target: proxyApis[key],
          changeOrigin: true,
        };
      });
      console.log('/****************************Proxy****************************/');
      console.table(proxyObj);
      console.log('/*************************************************************/');
      return proxyObj;
    })(),
  },
  pluginOptions: {
    lintStyleOnBuild: true,
    stylelint: {
      fix: false,
      files: ['src/**/*.vue', 'src/**/*.less'],
    },
  },
};
