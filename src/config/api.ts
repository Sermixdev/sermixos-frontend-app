export const API_CONFIG = {
  baseUrl: import.meta.env.MODE === 'development' 
    ? 'https://postgres-develop-e5d1.up.railway.app:5432'
    : 'PRODUCTION_URL', // TODO: Replace with production URL
  headers: {
    'Content-Type': 'application/json',
  },
};