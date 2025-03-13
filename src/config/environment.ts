interface EnvironmentConfig {
  isPasswordProtected: boolean;
  apiUrl: string;
}

const environments: Record<string, EnvironmentConfig> = {
  development: {
    isPasswordProtected: true,
    apiUrl: import.meta.env.VITE_API_URL || 'https://www-dev.sermix.dev'
  },
  production: {
    isPasswordProtected: false,
    apiUrl: import.meta.env.VITE_API_URL || 'https://sermix.dev'
  }
};

export const getEnvironmentConfig = (): EnvironmentConfig => {
  const environment = import.meta.env.MODE === 'development' ? 'development' : 'production';
  return environments[environment];
};