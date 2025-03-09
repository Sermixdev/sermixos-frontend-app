export const API_CONFIG = {
  baseUrl: import.meta.env.MODE === 'development' 
    ? 'https://www-dev.sermix.dev'
    : 'https://sermix.dev', 
  headers: {
    'Content-Type': 'application/json',
  },
};