import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { DesktopIcon } from '../../types';

interface DesktopState {
  icons: DesktopIcon[];
  startMenuOpen: boolean;
  selectedIconId: string | null;
}

const initialIcons: DesktopIcon[] = [
  {
    id: 'blog',
    title: 'Blog',
    icon: 'file-text',
    component: 'Blog',
  },
  {
    id: 'portfolio',
    title: 'Portafolio',
    icon: 'briefcase',
    component: 'Portfolio',
  },
  {
    id: 'about',
    title: 'Sobre Mí',
    icon: 'user',
    component: 'AboutMe',
  },
  {
    id: 'contact',
    title: 'Contacto',
    icon: 'mail',
    component: 'Contact',
  },
  {
    id: 'computer',
    title: 'Mi PC',
    icon: 'computer',
    component: 'Computer',
  },
  {
    id: 'recycle-bin',
    title: 'Papelera de Reciclaje',
    icon: 'trash-2',
    component: 'RecycleBin',
  }
];

const initialState: DesktopState = {
  icons: initialIcons,
  startMenuOpen: false,
  selectedIconId: null,
};

const desktopSlice = createSlice({
  name: 'desktop',
  initialState,
  reducers: {
    toggleStartMenu: (state) => {
      state.startMenuOpen = !state.startMenuOpen;
    },
    closeStartMenu: (state) => {
      state.startMenuOpen = false;
    },
    selectIcon: (state, action: PayloadAction<string | null>) => {
      state.selectedIconId = action.payload;
    },
    addDesktopIcon: (state, action: PayloadAction<DesktopIcon>) => {
      state.icons.push(action.payload);
    },
    removeDesktopIcon: (state, action: PayloadAction<string>) => {
      state.icons = state.icons.filter(icon => icon.id !== action.payload);
    },
  },
});

export const { 
  toggleStartMenu, 
  closeStartMenu, 
  selectIcon,
  addDesktopIcon,
  removeDesktopIcon,
} = desktopSlice.actions;

export default desktopSlice.reducer;