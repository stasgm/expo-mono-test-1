// eslint-disable-next-line no-restricted-imports
import Constants from 'expo-constants';

const myVersion = '3';

const IS_SCREENSHOTTING = false;

export const MyConstants = {
  isScreenshotting: __DEV__ && IS_SCREENSHOTTING,
  version: `${Constants.manifest?.version} (${myVersion})`,
  appStoreUrl: '',
  playStoreUrl: '',
  githubUrl: '',
  ...Constants,
};
