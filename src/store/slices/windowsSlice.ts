import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { AppWindow, WindowPosition } from '../../types';
import { v4 as uuidv4 } from 'uuid';

interface WindowsState {
  windows: AppWindow[];
  activeWindowId: string | null;
  highestZIndex: number;
}

const initialState: WindowsState = {
  windows: [],
  activeWindowId: null,
  highestZIndex: 0
};

const WINDOW_CASCADE_OFFSET = 30;

const calculateNewWindowPosition = (windows: AppWindow[]): WindowPosition => {
  const basePosition = { 
    x: 50, 
    y: 50, 
    width: Math.min(1000, window.innerWidth - 100), 
    height: Math.min(700, window.innerHeight - 90) 
  };
  
  if (windows.length === 0) return basePosition;

  // Find the last non-minimized window
  const lastWindow = [...windows]
    .reverse()
    .find(w => !w.isMinimized);

  if (!lastWindow) return basePosition;

  // Calculate new position with offset
  const newX = lastWindow.position.x + WINDOW_CASCADE_OFFSET;
  const newY = lastWindow.position.y + WINDOW_CASCADE_OFFSET;

  // Reset position if window would be too far right or bottom
  const maxX = window.innerWidth - basePosition.width - 50;
  const maxY = window.innerHeight - basePosition.height - 90; // Account for taskbar

  return {
    x: newX > maxX ? 50 : newX,
    y: newY > maxY ? 50 : newY,
    width: basePosition.width,
    height: basePosition.height
  };
};

const windowsSlice = createSlice({
  name: 'windows',
  initialState,
  reducers: {
    openWindow: (state, action: PayloadAction<Omit<AppWindow, 'id' | 'isMinimized' | 'isMaximized' | 'zIndex'>>) => {
      const newZIndex = state.highestZIndex + 1;
      const newPosition = calculateNewWindowPosition(state.windows);
      
      const newWindow: AppWindow = {
        id: uuidv4(),
        ...action.payload,
        position: newPosition,
        isMinimized: false,
        isMaximized: false,
        zIndex: newZIndex
      };
      
      state.windows.push(newWindow);
      state.activeWindowId = newWindow.id;
      state.highestZIndex = newZIndex;
    },
    closeWindow: (state, action: PayloadAction<string>) => {
      state.windows = state.windows.filter(window => window.id !== action.payload);
      if (state.activeWindowId === action.payload) {
        const remainingWindows = state.windows.filter(w => !w.isMinimized);
        state.activeWindowId = remainingWindows.length > 0 
          ? remainingWindows.reduce((a, b) => a.zIndex > b.zIndex ? a : b).id 
          : null;
      }
    },
    minimizeWindow: (state, action: PayloadAction<string>) => {
      const window = state.windows.find(w => w.id === action.payload);
      if (window) {
        // Store the window's position before minimizing
        window.previousPosition = {
          x: window.position.x,
          y: window.position.y,
          width: window.position.width,
          height: window.position.height
        };
        window.isMinimized = true;
        window.isMaximized = false;
      }
      
      if (state.activeWindowId === action.payload) {
        const remainingWindows = state.windows.filter(w => !w.isMinimized);
        state.activeWindowId = remainingWindows.length > 0 
          ? remainingWindows.reduce((a, b) => a.zIndex > b.zIndex ? a : b).id 
          : null;
      }
    },
    maximizeWindow: (state, action: PayloadAction<string>) => {
      const window = state.windows.find(w => w.id === action.payload);
      if (window) {
        // Store current position before maximizing if not already maximized
        if (!window.isMaximized && !window.previousPosition) {
          window.previousPosition = {
            x: window.position.x,
            y: window.position.y,
            width: window.position.width,
            height: window.position.height
          };
        }
        
        // Toggle maximized state
        window.isMaximized = !window.isMaximized;
        
        // Restore previous position when unmaximizing
        if (!window.isMaximized && window.previousPosition) {
          window.position = window.previousPosition;
          window.previousPosition = undefined;
        }
        
        // Bring window to front by updating z-index
        const newZIndex = state.highestZIndex + 1;
        window.zIndex = newZIndex;
        state.highestZIndex = newZIndex;
        state.activeWindowId = window.id;
      }
    },
    restoreWindow: (state, action: PayloadAction<string>) => {
      const window = state.windows.find(w => w.id === action.payload);
      if (window) {
        // Restore the window's previous position if it exists
        if (window.previousPosition) {
          window.position = window.previousPosition;
          window.previousPosition = undefined;
        }
        window.isMinimized = false;
        const newZIndex = state.highestZIndex + 1;
        window.zIndex = newZIndex;
        state.highestZIndex = newZIndex;
        state.activeWindowId = window.id;
      }
    },
    focusWindow: (state, action: PayloadAction<string>) => {
      const window = state.windows.find(w => w.id === action.payload);
      if (window && !window.isMinimized) {
        const newZIndex = state.highestZIndex + 1;
        window.zIndex = newZIndex;
        state.highestZIndex = newZIndex;
        state.activeWindowId = window.id;
      }
    },
    updateWindowPosition: (
      state, 
      action: PayloadAction<{ id: string; position: WindowPosition }>
    ) => {
      const { id, position } = action.payload;
      const window = state.windows.find(w => w.id === id);
      if (window) {
        window.position = position;
      }
    },
  },
});

export const { 
  openWindow, 
  closeWindow, 
  minimizeWindow, 
  maximizeWindow, 
  restoreWindow, 
  focusWindow,
  updateWindowPosition,
} = windowsSlice.actions;

export default windowsSlice.reducer;