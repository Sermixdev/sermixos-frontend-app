import React from 'react';
import { useSelector } from 'react-redux';
import { RootState } from '../../store';
import Window from './Window';
import Blog from '../Applications/Blog';
import Portfolio from '../Applications/Portfolio';
import AboutMe from '../Applications/AboutMe';
import Contact from '../Applications/Contact';
import Computer from '../Applications/Computer';
import RecycleBin from '../Applications/RecycleBin';
import Settings from '../Applications/Settings';
import Help from '../Applications/Help';

const WindowManager: React.FC = () => {
  const { windows } = useSelector((state: RootState) => state.windows);

  // Map component names to actual components
  const componentMap: Record<string, React.ComponentType<any>> = {
    Blog,
    Portfolio,
    AboutMe,
    Contact,
    Computer,
    RecycleBin,
    Settings,
    Help,
  };

  return (
    <>
      {windows.map((window) => {
        const Component = componentMap[window.component];
        return (
          <Window
            key={window.id}
            id={window.id}
            title={window.title}
            icon={window.icon}
            isMinimized={window.isMinimized}
            isMaximized={window.isMaximized}
            zIndex={window.zIndex}
            initialPosition={window.position}
          >
            {Component ? <Component /> : <div>Component not found</div>}
          </Window>
        );
      })}
    </>
  );
};

export default WindowManager;