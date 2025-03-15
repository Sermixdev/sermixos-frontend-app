import { API_CONFIG } from '../config/api';
import type { Post, PaginatedResponse } from '../types/api';

export async function getPosts(page = 1, limit = 10): Promise<PaginatedResponse<Post>> {
  try {
    const response = await fetch(`${API_CONFIG.baseUrl}/posts?page=${page}&limit=${limit}`, {
      method: 'GET',
      headers: API_CONFIG.headers,
    });

    if (!response.ok) {
      throw new Error(`Error ${response.status}: ${response.statusText}`);
    }

    const data = await response.json();
    return data;
  } catch (error) {
    console.error('Error al obtener los posts:', error);
    throw error;
  }
}