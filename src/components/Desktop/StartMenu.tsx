import React from 'react';
import styled from 'styled-components';
import { useDispatch } from 'react-redux';
import { closeStartMenu } from '../../store/slices/desktopSlice';
import { openWindow } from '../../store/slices/windowsSlice';
import { useSound } from '../../hooks/useSound';
import * as LucideIcons from 'lucide-react';

const StartMenuContainer = styled.div`
  position: absolute;
  bottom: 40px;
  left: 0;
  width: 250px;
  background-color: #c0c0c0;
  border: 2px solid #000000;
  border-bottom: none;
  box-shadow: 2px 2px 5px rgba(0, 0, 0, 0.3);
  z-index: 1001;
  animation: slideUp 0.2s ease-out;

  @keyframes slideUp {
    from {
      transform: translateY(100%);
      opacity: 0;
    }
    to {
      transform: translateY(0);
      opacity: 1;
    }
  }
`;

const StartMenuHeader = styled.div`
  display: flex;
  align-items: center;
  padding: 10px;
  background: linear-gradient(to right, #000080, #1084d0);
  color: white;
  font-weight: bold;
`;

const StartMenuItems = styled.div`
  padding: 5px 0;
`;

const StartMenuItem = styled.div`
  display: flex;
  align-items: center;
  padding: 8px 15px;
  cursor: pointer;

  &:hover {
    background-color: #000080;
    color: white;
  }
`;

const MenuItemIcon = styled.span`
  margin-right: 10px;
  display: flex;
  align-items: center;
`;

const Divider = styled.div`
  height: 1px;
  background-color: #808080;
  margin: 5px 0;
  box-shadow: 0 1px 0 #ffffff;
`;

const StartMenu: React.FC = () => {
  const dispatch = useDispatch();
  const { playSound } = useSound();

  const handleMenuItemClick = (component: string, title: string, icon: string) => {
    dispatch(closeStartMenu());
    dispatch(
      openWindow({
        title,
        icon,
        content: '',
        position: { 
          x: 50, 
          y: 50, 
          width: Math.min(1000, window.innerWidth - 100), 
          height: Math.min(700, window.innerHeight - 90) 
        },
        component,
      })
    );
    playSound('WINDOW_OPEN');
  };

  return (
    <StartMenuContainer id="start-menu">
      <StartMenuHeader>
        <LucideIcons.User size={24} style={{ marginRight: '10px' }} />
        RetroOS v1.0
      </StartMenuHeader>
      <StartMenuItems>
        <StartMenuItem onClick={() => handleMenuItemClick('Blog', 'Blog', 'FileText')}>
          <MenuItemIcon>
            <LucideIcons.FileText size={16} />
          </MenuItemIcon>
          Blog
        </StartMenuItem>
        <StartMenuItem onClick={() => handleMenuItemClick('Portfolio', 'Portfolio', 'Briefcase')}>
          <MenuItemIcon>
            <LucideIcons.Briefcase size={16} />
          </MenuItemIcon>
          Portafolio
        </StartMenuItem>
        <StartMenuItem onClick={() => handleMenuItemClick('AboutMe', 'Sobre Mí', 'User')}>
          <MenuItemIcon>
            <LucideIcons.User size={16} />
          </MenuItemIcon>
          Sobre Mí
        </StartMenuItem>
        <StartMenuItem onClick={() => handleMenuItemClick('Contact', 'Contacto', 'Mail')}>
          <MenuItemIcon>
            <LucideIcons.Mail size={16} />
          </MenuItemIcon>
          Contacto
        </StartMenuItem>
        <Divider />
        <StartMenuItem onClick={() => handleMenuItemClick('Settings', 'Configuración', 'Settings')}>
          <MenuItemIcon>
            <LucideIcons.Settings size={16} />
          </MenuItemIcon>
          Configuración
        </StartMenuItem>
        <StartMenuItem onClick={() => handleMenuItemClick('Help', 'Ayuda', 'HelpCircle')}>
          <MenuItemIcon>
            <LucideIcons.HelpCircle size={16} />
          </MenuItemIcon>
          Ayuda
        </StartMenuItem>
        <Divider />
        <StartMenuItem onClick={() => window.location.reload()}>
          <MenuItemIcon>
            <LucideIcons.Power size={16} />
          </MenuItemIcon>
          Reiniciar
        </StartMenuItem>
      </StartMenuItems>
    </StartMenuContainer>
  );
};

export default StartMenu;