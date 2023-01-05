// Learn more https://docs.expo.io/guides/customizing-metro
const { getDefaultConfig } = require('expo/metro-config');

const defaultConfig = getDefaultConfig(__dirname);

if (process.env.NODE_ENV === 'storybook') {
  defaultConfig.resolver.resolverMainFields = [
    'sbmodern',
    ...defaultConfig.resolver.resolverMainFields,
  ];

  defaultConfig.transformer.getTransformOptions = async () => ({
    transform: {
      experimentalImportSupport: false,
      inlineRequires: false,
    },
  });

  defaultConfig.watchFolders = [...defaultConfig.watchFolders, './.ondevice'];
}

module.exports = defaultConfig;
