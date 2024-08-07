import packageInfo from '../../package.json';

export const environment = {
    appVersion: packageInfo.version,
    production: false,
    apiUrl: 'https://api-dev.example.com'  // Development API URL
  };
  