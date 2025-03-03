import { useCallback } from 'react';
import { Howl } from 'howler';
import { useSelector } from 'react-redux';
import { RootState } from '../store';

// Define sound paths
const SOUNDS = {
  STARTUP: '/sounds/startup.mp3',
  CLICK: '/sounds/click.mp3',
  ERROR: '/sounds/error.mp3',
  WINDOW_OPEN: '/sounds/window-open.mp3',
  WINDOW_CLOSE: '/sounds/window-close.mp3',
};

export const useSound = () => {
  const { enabled, volume } = useSelector((state: RootState) => state.sound);

  const playSound = useCallback(
    (sound: keyof typeof SOUNDS) => {
      if (!enabled) return;

      const soundEffect = new Howl({
        src: [SOUNDS[sound]],
        volume,
      });

      soundEffect.play();
    },
    [enabled, volume]
  );

  return { playSound };
};