import packageInfo from '../../package.json';

export const environment = {
  appVersion: packageInfo.version,
    production: true,
    apiUrl: 'https://j41myv2bm7.execute-api.eu-west-2.amazonaws.com/v1/'  // Production API URL
  };
  