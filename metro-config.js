/* eslint-disable @typescript-eslint/no-var-requires */
const { getDefaultConfig } = require('expo/metro-config');
const path = require('path');

module.exports = (() => {
  const config = getDefaultConfig(__dirname);

  const { transformer, resolver } = config;

  config.transformer = {
    ...transformer,
    babelTransformerPath: require.resolve('react-native-svg-transformer/expo'),
  };

  config.resolver = {
    ...resolver,
    assetExts: resolver.assetExts.filter(ext => ext !== 'svg'),
    sourceExts: [...resolver.sourceExts, 'svg'],
    // Intercept react-dom requests and redirect to our empty module
    resolveRequest: (context, moduleName, platform) => {
      if (moduleName === 'react-dom' || moduleName === 'react-dom/client') {
        return {
          filePath: path.resolve(__dirname, 'emptyModule.js'),
          type: 'sourceFile',
        };
      }
      // Fall back to the default resolver
      return context.resolveRequest(context, moduleName, platform);
    },
  };

  return config;
})();
