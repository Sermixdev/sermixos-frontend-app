import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import styled from 'styled-components';
import { RootState } from '../../store';
import { selectIcon, closeStartMenu } from '../../store/slices/desktopSlice';
import { openWindow } from '../../store/slices/windowsSlice';
import DesktopIcon from './DesktopIcon';
import Taskbar from './Taskbar';
import WindowManager from '../Windows/WindowManager';

const DesktopContainer = styled.div`
  display: flex;
  flex-direction: column;
  height: 100vh;
  width: 100vw;
  background-image: url('https://images.unsplash.com/photo-1579546929518-9e396f3cc809?q=80&w=2070&auto=format&fit=crop');
  background-size: cover;
  background-position: center;
  overflow: hidden;
  position: relative;
  font-family: 'MS Sans Serif', 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;
`;

const IconsContainer = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fill, 80px);
  grid-auto-rows: 100px;
  gap: 10px;
  padding: 20px;
  flex: 1;
  overflow: auto;
`;

const Desktop: React.FC = () => {
  const dispatch = useDispatch();
  const { icons, selectedIconId } = useSelector((state: RootState) => state.desktop);

  const handleIconClick = (id: string) => {
    dispatch(selectIcon(id === selectedIconId ? null : id));
  };

  const handleIconDoubleClick = (id: string) => {
    const icon = icons.find(icon => icon.id === id);
    if (icon) {
      dispatch(openWindow({
        title: icon.title,
        icon: icon.icon,
        content: '',
        position: { x: 100, y: 100, width: 600, height: 400 },
        component: icon.component,
      }));
    }
  };

  const handleDesktopClick = (e: React.MouseEvent) => {
    const target = e.target as HTMLElement;
    // Deselect if clicking directly on the desktop or any container that's not an icon or start menu
    if (!target.closest('.desktop-icon') && !target.closest('#start-menu') && !target.closest('#start-button')) {
      dispatch(selectIcon(null));
      dispatch(closeStartMenu());
    }
  };

  return (
    <DesktopContainer id="desktop-container" onClick={handleDesktopClick}>
      <IconsContainer>
        {icons.map((icon) => (
          <DesktopIcon
            key={icon.id}
            id={icon.id}
            title={icon.title}
            icon={icon.icon}
            isSelected={icon.id === selectedIconId}
            onClick={() => handleIconClick(icon.id)}
            onDoubleClick={() => handleIconDoubleClick(icon.id)}
          />
        ))}
      </IconsContainer>
      <WindowManager />
      <Taskbar />
    </DesktopContainer>
  );
};

export default Desktop;