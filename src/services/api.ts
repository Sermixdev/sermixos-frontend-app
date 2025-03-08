import { API_CONFIG } from '../config/api';
import type { 
  Post, 
  CreatePostPayload, 
  PaginatedResponse,
  ApiError 
} from '../types/api';

export class BlogApi {
  static async getPosts(page = 1, limit = 10): Promise<PaginatedResponse<Post>> {
    try {
      const response = await fetch(`${API_CONFIG.baseUrl}/api/posts?page=${page}&limit=${limit}`, {
        method: 'GET',
        headers: API_CONFIG.headers,
      });

      if (!response.ok) {
        throw await this.handleErrorResponse(response);
      }

      return await response.json();
    } catch (error) {
      throw this.handleError(error);
    }
  }

  static async getPostById(id: string): Promise<PaginatedResponse<Post>> {
    try {
      const response = await fetch(`${API_CONFIG.baseUrl}/api/posts/${id}`, {
        method: 'GET',
        headers: API_CONFIG.headers,
      });

      if (!response.ok) {
        throw await this.handleErrorResponse(response);
      }

      return await response.json();
    } catch (error) {
      throw this.handleError(error);
    }
  }

  static async createPost(post: CreatePostPayload): Promise<Post> {
    try {
      const response = await fetch(`${API_CONFIG.baseUrl}/api/posts`, {
        method: 'POST',
        headers: API_CONFIG.headers,
        body: JSON.stringify(post),
      });

      if (!response.ok) {
        throw await this.handleErrorResponse(response);
      }

      return await response.json();
    } catch (error) {
      throw this.handleError(error);
    }
  }

  private static async handleErrorResponse(response: Response): Promise<ApiError> {
    try {
      const errorData = await response.json();
      return {
        message: errorData.message || 'Error en la petición',
        status: response.status,
      };
    } catch {
      return {
        message: 'Error en la petición',
        status: response.status,
      };
    }
  }

  private static handleError(error: unknown): ApiError {
    if (error instanceof Error) {
      return {
        message: error.message || 'Error inesperado',
      };
    }
    return {
      message: 'Error inesperado',
    };
  }
}