import React from 'react';
import styled from 'styled-components';
import { useDispatch, useSelector } from 'react-redux';
import { RootState } from '../../store';
import { toggleStartMenu, closeStartMenu } from '../../store/slices/desktopSlice';
import { restoreWindow, focusWindow } from '../../store/slices/windowsSlice';
import StartMenu from './StartMenu';
import * as LucideIcons from 'lucide-react';

const TaskbarContainer = styled.div`
  display: flex;
  height: 40px;
  background-color: #c0c0c0;
  border-top: 2px solid #ffffff;
  box-shadow: inset 0 1px 0 #dfdfdf, inset 0 -1px 0 #808080;
  z-index: 1000;
`;

const StartButton = styled.button<{ $isOpen: boolean }>`
  display: flex;
  align-items: center;
  id: "start-button";
  padding: 0 10px;
  height: 100%;
  font-weight: bold;
  background-color: ${(props) => (props.$isOpen ? '#808080' : '#c0c0c0')};
  border: none;
  border-right: 1px solid #808080;
  box-shadow: ${(props) =>
    props.$isOpen
      ? 'inset 1px 1px 1px #000000'
      : 'inset -1px -1px 0 #000000, inset 1px 1px 0 #ffffff'};
  cursor: pointer;
  outline: none;
  margin-right: 5px;

  &:active {
    box-shadow: inset 1px 1px 1px #000000;
  }
`;

const StartButtonIcon = styled.span`
  margin-right: 5px;
  display: flex;
  align-items: center;
`;

const TaskbarItems = styled.div`
  display: flex;
  flex: 1;
  overflow-x: auto;
  align-items: center;
  padding: 0 5px;
  gap: 5px;
`;

const TaskbarItem = styled.button<{ $isActive: boolean }>`
  display: flex;
  align-items: center;
  height: 30px;
  padding: 0 8px;
  background-color: ${(props) => (props.$isActive ? '#dfdfdf' : '#c0c0c0')};
  border: none;
  box-shadow: ${(props) =>
    props.$isActive
      ? 'inset 1px 1px 1px #808080'
      : 'inset -1px -1px 0 #808080, inset 1px 1px 0 #ffffff'};
  cursor: pointer;
  outline: none;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
  max-width: 200px;
  font-size: 12px;
  min-width: 120px;
  transition: background-color 0.1s;

  &:hover {
    background-color: ${(props) => (props.$isActive ? '#dfdfdf' : '#d0d0d0')};
  }

  &:active {
    box-shadow: inset 1px 1px 1px #808080;
  }
`;

const TaskbarItemIcon = styled.span`
  margin-right: 5px;
  display: flex;
  align-items: center;
`;

const Clock = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 0 10px;
  height: 100%;
  border-left: 1px solid #808080;
  box-shadow: inset 1px 0 0 #ffffff;
  font-size: 12px;
`;

const Taskbar: React.FC = () => {
  const dispatch = useDispatch();
  const { startMenuOpen } = useSelector((state: RootState) => state.desktop);
  const { windows, activeWindowId } = useSelector((state: RootState) => state.windows);
  const [time, setTime] = React.useState(new Date());

  React.useEffect(() => {
    const timer = setInterval(() => {
      setTime(new Date());
    }, 1000);
    return () => clearInterval(timer);
  }, []);

  const handleStartClick = () => {
    dispatch(toggleStartMenu());
  };

  const handleTaskbarItemClick = (id: string) => {
    const window = windows.find((w) => w.id === id);
    if (window) {
      if (window.isMinimized) {
        dispatch(restoreWindow(id));
      } else if (id !== activeWindowId) {
        dispatch(focusWindow(id));
      } else {
        dispatch(restoreWindow(id));
      }
    }
  };

  const handleClickOutside = (e: React.MouseEvent) => {
    if (startMenuOpen && !(e.target as HTMLElement).closest('#start-menu')) {
      dispatch(closeStartMenu());
    }
  };

  return (
    <>
      <TaskbarContainer onClick={handleClickOutside}>
        <StartButton 
          id="start-button"
          $isOpen={startMenuOpen} 
          onClick={handleStartClick}
        >
          <StartButtonIcon>
            <LucideIcons.LayoutGrid size={16} />
          </StartButtonIcon>
          Inicio
        </StartButton>
        <TaskbarItems>
          {windows
            .filter((window) => window.id)
            .map((window) => (
              <TaskbarItem
                key={window.id}
                $isActive={window.id === activeWindowId && !window.isMinimized}
                onClick={() => handleTaskbarItemClick(window.id)}
              >
                <TaskbarItemIcon>
                  {React.createElement(
                    LucideIcons[window.icon as keyof typeof LucideIcons] || LucideIcons.File,
                    { size: 16 }
                  )}
                </TaskbarItemIcon>
                {window.title}
              </TaskbarItem>
            ))}
        </TaskbarItems>
        <Clock>
          {time.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
        </Clock>
      </TaskbarContainer>
      {startMenuOpen && <StartMenu />}
    </>
  );
};

export default Taskbar;