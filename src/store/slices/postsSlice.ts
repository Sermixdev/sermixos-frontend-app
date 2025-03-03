import { createSlice, createAsyncThunk, PayloadAction } from '@reduxjs/toolkit';
import { Post } from '../../types';
import axios from 'axios';

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
  error: null,
};

// Mock data for now
const mockPosts: Post[] = [
  {
    id: '1',
    title: 'El Futuro de la IA en el Desarrollo Web',
    excerpt: 'Cómo la inteligencia artificial está cambiando la forma en que construimos sitios web y aplicaciones.',
    content: `
      <p>La inteligencia artificial está transformando rápidamente el panorama del desarrollo web. Desde pruebas automatizadas hasta la finalización inteligente de código, las herramientas de IA están haciendo que los desarrolladores sean más productivos que nunca.</p>
      <p>En este artículo, exploraremos cómo la IA se está integrando en los flujos de trabajo de desarrollo modernos y lo que esto significa para el futuro de la industria.</p>
      <h2>Herramientas de Desarrollo Impulsadas por IA</h2>
      <p>Herramientas como GitHub Copilot y TabNine están revolucionando la forma en que los desarrolladores escriben código. Al sugerir funciones completas y bloques de código, estos asistentes de IA pueden acelerar significativamente el tiempo de desarrollo.</p>
      <h2>Pruebas Automatizadas y Control de Calidad</h2>
      <p>La IA también está causando impacto en las pruebas y el control de calidad. Los algoritmos de aprendizaje automático ahora pueden predecir dónde es probable que ocurran errores, generar casos de prueba automáticamente e incluso corregir problemas simples sin intervención humana.</p>
      <h2>Perspectivas Futuras</h2>
      <p>A medida que la IA continúa evolucionando, podemos esperar herramientas aún más sofisticadas que entiendan no solo la sintaxis, sino la intención detrás de nuestro código. Esto podría llevar a un futuro donde los desarrolladores se centren más en la arquitectura y el diseño de alto nivel, mientras que la IA maneja gran parte de los detalles de implementación.</p>
    `,
    date: '2025-04-15',
    author: 'Ana Desarrolladora',
    tags: ['IA', 'Desarrollo Web', 'Tecnología Futura'],
    imageUrl: 'https://images.unsplash.com/photo-1677442135136-760c813a743d?q=80&w=1932&auto=format&fit=crop',
  },
  {
    id: '2',
    title: 'Técnicas de Visualización de Datos para Conjuntos Complejos',
    excerpt: 'Estrategias efectivas para presentar datos complejos de manera intuitiva y significativa.',
    content: `
      <p>A medida que los datos se vuelven cada vez más complejos, crece el desafío de presentarlos de manera comprensible. Este artículo explora técnicas modernas de visualización de datos que pueden ayudar a dar sentido a conjuntos de datos complicados.</p>
      <h2>Visualizaciones Interactivas</h2>
      <p>Los gráficos estáticos están dando paso a visualizaciones interactivas que permiten a los usuarios explorar datos en sus propios términos. Bibliotecas como D3.js y Three.js permiten a los desarrolladores crear experiencias de datos interactivas y atractivas.</p>
      <h2>Visualización 3D</h2>
      <p>Para ciertos tipos de datos, especialmente conjuntos de datos espaciales o multidimensionales, las visualizaciones 3D pueden proporcionar información que las representaciones 2D no pueden. Veremos cuándo usar 3D y cómo evitar errores comunes.</p>
      <h2>Consideraciones de Accesibilidad</h2>
      <p>La visualización efectiva de datos debe ser accesible para todos los usuarios, incluidos aquellos con discapacidades visuales. Discutiremos técnicas para crear visualizaciones que transmitan información a través de múltiples canales sensoriales.</p>
    `,
    date: '2025-03-22',
    author: 'Alex Analista',
    tags: ['Visualización de Datos', 'Analítica', 'Diseño UX'],
    imageUrl: 'https://images.unsplash.com/photo-1551288049-bebda4e38f71?q=80&w=2070&auto=format&fit=crop',
  },
  {
    id: '3',
    title: 'Estrategias de Automatización para Empresas Modernas',
    excerpt: 'Cómo implementar una automatización efectiva para optimizar operaciones y aumentar la productividad.',
    content: `
      <p>La automatización empresarial ya no es opcional, es esencial para mantener la competitividad. Este artículo proporciona un marco para identificar, implementar y optimizar oportunidades de automatización en su organización.</p>
      <h2>Identificando Oportunidades de Automatización</h2>
      <p>No todos los procesos deben automatizarse. Discutiremos cómo evaluar tareas y flujos de trabajo para determinar cuáles proporcionarán el mayor retorno de inversión cuando se automaticen.</p>
      <h2>Enfoques de Implementación</h2>
      <p>Desde herramientas sin código hasta desarrollo personalizado, hay muchas formas de implementar la automatización. Compararemos diferentes enfoques y te ayudaremos a elegir el adecuado para tus necesidades específicas.</p>
      <h2>Midiendo el Éxito</h2>
      <p>¿Cómo sabes si tus esfuerzos de automatización están dando resultados? Cubriremos métricas clave para rastrear y cómo calcular el verdadero ROI de tus iniciativas de automatización.</p>
    `,
    date: '2025-02-10',
    author: 'Samuel Estratega',
    tags: ['Automatización', 'Estrategia Empresarial', 'Productividad'],
    imageUrl: 'https://images.unsplash.com/photo-1531746790731-6c087fecd65a?q=80&w=2006&auto=format&fit=crop',
  }
];

// Async thunks for API calls (mocked for now)
export const fetchPosts = createAsyncThunk(
  'posts/fetchPosts',
  async (_, { rejectWithValue }) => {
    try {
      // In a real app, this would be an API call
      // const response = await axios.get('/api/posts');
      // return response.data;
      
      // Mock response
      return mockPosts;
    } catch (error) {
      if (axios.isAxiosError(error)) {
        return rejectWithValue(error.response?.data?.message || 'Failed to fetch posts');
      }
      return rejectWithValue('Failed to fetch posts');
    }
  }
);

export const fetchPostById = createAsyncThunk(
  'posts/fetchPostById',
  async (id: string, { rejectWithValue }) => {
    try {
      // In a real app, this would be an API call
      // const response = await axios.get(`/api/posts/${id}`);
      // return response.data;
      
      // Mock response
      const post = mockPosts.find(p => p.id === id);
      if (!post) {
        return rejectWithValue('Post not found');
      }
      return post;
    } catch (error) {
      if (axios.isAxiosError(error)) {
        return rejectWithValue(error.response?.data?.message || 'Failed to fetch post');
      }
      return rejectWithValue('Failed to fetch post');
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
      .addCase(fetchPosts.fulfilled, (state, action: PayloadAction<Post[]>) => {
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
      .addCase(fetchPostById.fulfilled, (state, action: PayloadAction<Post>) => {
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