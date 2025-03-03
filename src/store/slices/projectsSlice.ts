import { createSlice, createAsyncThunk, PayloadAction } from '@reduxjs/toolkit';
import { Project } from '../../types';
import axios from 'axios';

interface ProjectsState {
  projects: Project[];
  currentProject: Project | null;
  loading: boolean;
  error: string | null;
}

const initialState: ProjectsState = {
  projects: [],
  currentProject: null,
  loading: false,
  error: null,
};

// Mock data for now
const mockProjects: Project[] = [
  {
    id: '1',
    title: 'Generador de Contenido con IA',
    description: 'Una aplicación web que utiliza GPT-4 de OpenAI para generar publicaciones de blog, contenido para redes sociales y textos de marketing basados en indicaciones del usuario.',
    technologies: ['React', 'Node.js', 'Express', 'MongoDB', 'API de OpenAI'],
    imageUrl: 'https://images.unsplash.com/photo-1677442135068-cbc7ee6d6806?q=80&w=1932&auto=format&fit=crop',
    demoUrl: 'https://ai-content-generator.example.com',
    repoUrl: 'https://github.com/example/ai-content-generator',
    date: '2025-01-15',
  },
  {
    id: '2',
    title: 'Panel de Control de Datos en Tiempo Real',
    description: 'Un panel interactivo para visualizar y analizar datos en tiempo real de múltiples fuentes, con widgets personalizables y capacidades de exportación.',
    technologies: ['Vue.js', 'D3.js', 'Firebase', 'WebSockets', 'Tailwind CSS'],
    imageUrl: 'https://images.unsplash.com/photo-1551288049-bebda4e38f71?q=80&w=2070&auto=format&fit=crop',
    demoUrl: 'https://data-dashboard.example.com',
    repoUrl: 'https://github.com/example/data-dashboard',
    date: '2024-11-03',
  },
  {
    id: '3',
    title: 'Sistema de Flujo de Trabajo Automatizado',
    description: 'Una plataforma de automatización de flujos de trabajo que permite a las empresas crear, gestionar y optimizar sus procesos operativos sin necesidad de programar.',
    technologies: ['Angular', 'TypeScript', 'NestJS', 'PostgreSQL', 'Redis'],
    imageUrl: 'https://images.unsplash.com/photo-1531746790731-6c087fecd65a?q=80&w=2006&auto=format&fit=crop',
    demoUrl: 'https://workflow-system.example.com',
    repoUrl: 'https://github.com/example/workflow-system',
    date: '2024-08-22',
  }
];

// Async thunks for API calls (mocked for now)
export const fetchProjects = createAsyncThunk(
  'projects/fetchProjects',
  async (_, { rejectWithValue }) => {
    try {
      // In a real app, this would be an API call
      // const response = await axios.get('/api/projects');
      // return response.data;
      
      // Mock response
      return mockProjects;
    } catch (error) {
      if (axios.isAxiosError(error)) {
        return rejectWithValue(error.response?.data?.message || 'Failed to fetch projects');
      }
      return rejectWithValue('Failed to fetch projects');
    }
  }
);

export const fetchProjectById = createAsyncThunk(
  'projects/fetchProjectById',
  async (id: string, { rejectWithValue }) => {
    try {
      // In a real app, this would be an API call
      // const response = await axios.get(`/api/projects/${id}`);
      // return response.data;
      
      // Mock response
      const project = mockProjects.find(p => p.id === id);
      if (!project) {
        return rejectWithValue('Project not found');
      }
      return project;
    } catch (error) {
      if (axios.isAxiosError(error)) {
        return rejectWithValue(error.response?.data?.message || 'Failed to fetch project');
      }
      return rejectWithValue('Failed to fetch project');
    }
  }
);

const projectsSlice = createSlice({
  name: 'projects',
  initialState,
  reducers: {
    clearCurrentProject: (state) => {
      state.currentProject = null;
    },
    clearError: (state) => {
      state.error = null;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchProjects.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchProjects.fulfilled, (state, action: PayloadAction<Project[]>) => {
        state.loading = false;
        state.projects = action.payload;
      })
      .addCase(fetchProjects.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string;
      })
      .addCase(fetchProjectById.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchProjectById.fulfilled, (state, action: PayloadAction<Project>) => {
        state.loading = false;
        state.currentProject = action.payload;
      })
      .addCase(fetchProjectById.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string;
      });
  },
});

export const { clearCurrentProject, clearError } = projectsSlice.actions;

export default projectsSlice.reducer;