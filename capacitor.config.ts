import { CapacitorConfig } from '@capacitor/cli';

const config: CapacitorConfig = {
  appId: 'react.webapp',
  appName: 'react-webapp',
  webDir: 'public',
  server: {
    androidScheme: 'https'
  }
};

export default config;
