import React, { useState, useEffect } from 'react';
import { Rnd } from 'react-rnd';
import styled from 'styled-components';
import { useDispatch, useSelector } from 'react-redux';
import { RootState } from '../../store';
import {
  closeWindow,
  minimizeWindow,
  maximizeWindow,
  focusWindow,
  updateWindowPosition,
} from '../../store/slices/windowsSlice';
import * as LucideIcons from 'lucide-react';
import { WindowPosition } from '../../types';

interface WindowProps {
  id: string;
  title: string;
  icon: string;
  isMinimized: boolean;
  isMaximized: boolean;
  zIndex: number;
  initialPosition: WindowPosition;
  children: React.ReactNode;
}

interface StyledWindowProps {
  $isActive: boolean;
  $zIndex: number;
}

const WindowContainer = styled.div<StyledWindowProps>`
  display: flex;
  flex-direction: column;
  background-color: #c0c0c0;
  border: 2px solid #000000;
  box-shadow: inset 1px 1px 0 #ffffff, inset -1px -1px 0 #808080, 4px 4px 10px rgba(0, 0, 0, 0.3);
  z-index: ${(props) => props.$zIndex};
  overflow: hidden;
  width: 100%;
  height: 100%;
`;

const TitleBar = styled.div<{ $isActive: boolean }>`
  display: flex;
  align-items: center;
  justify-content: space-between;
  height: 25px;
  padding: 0 5px;
  background: ${(props) =>
    props.$isActive
      ? 'linear-gradient(to right, #000080, #1084d0)'
      : 'linear-gradient(to right, #808080, #c0c0c0)'};
  color: ${(props) => (props.$isActive ? 'white' : '#000000')};
  user-select: none;
`;

const TitleBarLeft = styled.div`
  display: flex;
  align-items: center;
`;

const TitleBarIcon = styled.div`
  margin-right: 5px;
  display: flex;
  align-items: center;
`;

const TitleBarText = styled.div`
  font-weight: var(--font-weight-medium);
  font-size: var(--font-size-sm);
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
`;

const TitleBarControls = styled.div`
  display: flex;
  align-items: center;
`;

const WindowButton = styled.button`
  width: 16px;
  height: 16px;
  margin-left: 2px;
  background-color: #c0c0c0;
  border: none;
  box-shadow: inset -1px -1px 0 #000000, inset 1px 1px 0 #ffffff;
  display: flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;
  outline: none;
  font-size: 10px;
  padding: 0;

  &:active {
    box-shadow: inset 1px 1px 0 #000000, inset -1px -1px 0 #ffffff;
  }
`;

const WindowContent = styled.div`
  flex: 1;
  overflow: auto;
  padding: 10px;
  background-color: #ffffff;
  border-top: 1px solid #808080;
  border-left: 1px solid #808080;
  box-shadow: inset 1px 1px 0 #dfdfdf;
`;

const Window: React.FC<WindowProps> = ({
  id,
  title,
  icon,
  isMinimized,
  isMaximized,
  zIndex,
  initialPosition,
  children,
}) => {
  const dispatch = useDispatch();
  const { activeWindowId } = useSelector((state: RootState) => state.windows);
  const [position, setPosition] = useState(initialPosition);
  const isActive = activeWindowId === id;

  // Handle window visibility
  if (isMinimized) {
    return null;
  }

  // Get the icon component from lucide-react
  const IconComponent = LucideIcons[icon as keyof typeof LucideIcons] || LucideIcons.File;

  const handleClose = (e: React.MouseEvent) => {
    e.stopPropagation();
    dispatch(closeWindow(id));
  };

  const handleMinimize = (e: React.MouseEvent) => {
    e.stopPropagation();
    dispatch(minimizeWindow(id));
  };

  const handleMaximize = (e: React.MouseEvent) => {
    e.stopPropagation();
    dispatch(maximizeWindow(id));
  };

  const handleFocus = () => {
    if (!isActive) {
      dispatch(focusWindow(id));
    }
  };

  const handleDragStop = (_e: any, d: any) => {
    const newPosition = { ...position, x: d.x, y: d.y };
    setPosition(newPosition);
    dispatch(updateWindowPosition({ id, position: newPosition }));
  };

  const handleResizeStop = (_e: any, _direction: any, ref: any, _delta: any, position: any) => {
    const newPosition = {
      ...position,
      width: parseInt(ref.style.width),
      height: parseInt(ref.style.height),
    };
    setPosition(newPosition);
    dispatch(updateWindowPosition({ id, position: newPosition }));
  };

  return (
    <Rnd
      style={{
        display: 'flex',
        position: isMaximized ? 'fixed' : 'absolute',
        zIndex: zIndex
      }}
      disableDragging={isMaximized}
      enableResizing={!isMaximized}
      size={{ 
        width: isMaximized ? window.innerWidth : position.width, 
        height: isMaximized ? window.innerHeight - 40 : position.height 
      }}
      position={{ x: isMaximized ? 0 : position.x, y: isMaximized ? 0 : position.y }}
      onDragStop={handleDragStop}
      onResizeStop={handleResizeStop}
      dragHandleClassName="title-bar"
      maxWidth={window.innerWidth}
      maxHeight={window.innerHeight - 40}
      minWidth={400}
      minHeight={300}
      bounds="parent"
      onClick={handleFocus}
      onResize={(e, direction, ref) => {
        ref.style.height = `${parseInt(ref.style.height)}px`;
        ref.style.width = `${parseInt(ref.style.width)}px`;
      }}
    >
      <WindowContainer $isActive={isActive} $zIndex={zIndex}>
        <TitleBar className="title-bar" $isActive={isActive}>
          <TitleBarLeft>
            <TitleBarIcon>
              <IconComponent size={16} />
            </TitleBarIcon>
            <TitleBarText>{title}</TitleBarText>
          </TitleBarLeft>
          <TitleBarControls>
            <WindowButton onClick={handleMinimize}>
              <LucideIcons.Minus size={10} />
            </WindowButton>
            <WindowButton onClick={handleMaximize}>
              {isMaximized ? <LucideIcons.Minimize2 size={10} /> : <LucideIcons.Maximize2 size={10} />}
            </WindowButton>
            <WindowButton onClick={handleClose}>
              <LucideIcons.X size={10} />
            </WindowButton>
          </TitleBarControls>
        </TitleBar>
        <WindowContent>{children}</WindowContent>
      </WindowContainer>
    </Rnd>
  );
};

export default Window;