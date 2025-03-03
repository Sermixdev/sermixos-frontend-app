export interface WindowPosition {
  x: number;
  y: number;
  width: number;
  height: number;
}

export interface AppWindow {
  id: string;
  title: string;
  icon: string;
  content: string;
  isMinimized: boolean;
  isMaximized: boolean;
  zIndex: number;
  position: WindowPosition;
  previousPosition?: WindowPosition;
  component: string;
}

export interface DesktopIcon {
  id: string;
  title: string;
  icon: string;
  component: string;
}

export interface Post {
  id: string;
  title: string;
  content: string;
  excerpt: string;
  date: string;
  author: string;
  tags: string[];
  imageUrl?: string;
}

export interface Project {
  id: string;
  title: string;
  description: string;
  technologies: string[];
  imageUrl?: string;
  demoUrl?: string;
  repoUrl?: string;
  date: string;
}

export interface User {
  id: string;
  username: string;
  email: string;
  role: 'admin' | 'user';
  token?: string;
}

export interface ContactForm {
  name: string;
  email: string;
  message: string;
}