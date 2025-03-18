import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { Post } from '../../types/api';
import { API_CONFIG } from '../../config/api';

interface PostsState {
  posts: Post[];
  currentPost: Post | null;
  loading: boolean;
  error: string | null;
}

const initialState: PostsState = {
  posts: [],
  currentPost: null,
  loading: false,
  error: null
};

// Helper function to process post data and extract description if not provided
const processPostData = (post: any): Post => {
  // Extract a brief description from content if not provided
  if (!post.description && post.content) {
    const plainText = post.content.replace(/<[^>]*>/g, '');
    const maxLength = 150;
    
    if (plainText.length <= maxLength) {
      post.description = plainText;
    } else {
      const lastSpace = plainText.substring(0, maxLength).lastIndexOf(' ');
      post.description = lastSpace > 0 
        ? plainText.substring(0, lastSpace) + '...' 
        : plainText.substring(0, maxLength) + '...';
    }
  }
  
  return post as Post;
};

export const fetchPosts = createAsyncThunk(
  'posts/fetchPosts',
  async (_, { rejectWithValue }) => {
    try {
      const response = await fetch(`${API_CONFIG.baseUrl}/posts`, {
        method: 'GET',
        headers: API_CONFIG.headers,
        mode: 'cors'
      });

      if (!response.ok) {
        throw new Error(`Error ${response.status}: ${response.statusText}`);
      }

      const data = await response.json();
      
      // Process each post to ensure it has a description
      return Array.isArray(data) ? data.map(processPostData) : [];
    } catch (error) {
      if (error instanceof Error) {
        return rejectWithValue(error.message);
      }
      return rejectWithValue('Error al obtener los posts');
    }
  }
);

export const fetchPostById = createAsyncThunk(
  'posts/fetchPostById',
  async (id: string, { rejectWithValue }) => {
    try {
      console.log(`Fetching post with ID: ${id}`);
      const response = await fetch(`${API_CONFIG.baseUrl}/posts/${id}`, {
        method: 'GET',
        headers: API_CONFIG.headers,
      });

      if (!response.ok) {
        throw new Error(`Error ${response.status}: ${response.statusText}`);
      }

      const data = await response.json();
      console.log('API Response for single post:', data);
      
      // Handle different API response structures
      let post: Post;
      
      if (data && Array.isArray(data)) {
        // If the API returns an array directly
        post = data[0];
      } else if (data && data.data && Array.isArray(data.data)) {
        // If the API returns { data: [...] }
        post = data.data[0];
      } else if (data && !Array.isArray(data)) {
        // If the API returns a single object
        post = data;
      } else {
        throw new Error('Formato de respuesta inesperado');
      }
      
      if (!post) {
        throw new Error('No se encontró el post');
      }
      
      // Process the post to ensure it has a description
      return processPostData(post);
    } catch (error) {
      console.error('Error fetching post by ID:', error);
      if (error instanceof Error) {
        return rejectWithValue(error.message);
      }
      return rejectWithValue('Error al obtener los detalles del post');
    }
  }
);

const postsSlice = createSlice({
  name: 'posts',
  initialState,
  reducers: {
    clearCurrentPost: (state) => {
      state.currentPost = null;
    },
    clearError: (state) => {
      state.error = null;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchPosts.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchPosts.fulfilled, (state, action) => {
        state.loading = false;
        state.posts = action.payload;
      })
      .addCase(fetchPosts.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string;
      })
      .addCase(fetchPostById.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchPostById.fulfilled, (state, action) => {
        state.loading = false;
        state.currentPost = action.payload;
      })
      .addCase(fetchPostById.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string;
      });
  },
});

export const { clearCurrentPost, clearError } = postsSlice.actions;

export default postsSlice.reducer;