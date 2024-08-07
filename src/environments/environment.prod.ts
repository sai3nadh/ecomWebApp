import packageInfo from '../../package.json';

export const environment = {
  appVersion: packageInfo.version,
    production: true,
    apiUrl: 'https://api.example.com'  // Production API URL
  };
  