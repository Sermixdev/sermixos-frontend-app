import { configureStore } from '@reduxjs/toolkit';
import windowsReducer from './slices/windowsSlice';
import desktopReducer from './slices/desktopSlice';
import postsReducer from './slices/postsSlice';
import projectsReducer from './slices/projectsSlice';
import soundReducer from './slices/soundSlice';
import recycleBinReducer from './slices/recycleBinSlice';

export const store = configureStore({
  reducer: {
    windows: windowsReducer,
    desktop: desktopReducer,
    posts: postsReducer,
    projects: projectsReducer,
    sound: soundReducer,
    recycleBin: recycleBinReducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;