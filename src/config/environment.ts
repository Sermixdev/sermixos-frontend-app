export const getEnvironmentConfig = () => ({
  apiUrl: import.meta.env.VITE_API_URL || 'https://api-dev.sermix.dev'
});