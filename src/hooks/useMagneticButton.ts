import { useRef, useCallback } from 'react';

export function useMagneticButton<T extends HTMLElement>(strength: number = 0.3) {
  const ref = useRef<T>(null);

  const handleMouseMove = useCallback((e: React.MouseEvent<T>) => {
    const element = ref.current;
    if (!element) return;

    const rect = element.getBoundingClientRect();
    const centerX = rect.left + rect.width / 2;
    const centerY = rect.top + rect.height / 2;

    const deltaX = (e.clientX - centerX) * strength;
    const deltaY = (e.clientY - centerY) * strength;

    element.style.transform = `translate(${deltaX}px, ${deltaY}px)`;
  }, [strength]);

  const handleMouseLeave = useCallback(() => {
    const element = ref.current;
    if (!element) return;

    element.style.transform = 'translate(0, 0)';
  }, []);

  return {
    ref,
    onMouseMove: handleMouseMove,
    onMouseLeave: handleMouseLeave,
  };
}

export function useTiltCard<T extends HTMLElement>(maxTilt: number = 10) {
  const ref = useRef<T>(null);

  const handleMouseMove = useCallback((e: React.MouseEvent<T>) => {
    const element = ref.current;
    if (!element) return;

    const rect = element.getBoundingClientRect();
    const centerX = rect.left + rect.width / 2;
    const centerY = rect.top + rect.height / 2;

    const percentX = (e.clientX - centerX) / (rect.width / 2);
    const percentY = (e.clientY - centerY) / (rect.height / 2);

    const tiltX = -percentY * maxTilt;
    const tiltY = percentX * maxTilt;

    element.style.transform = `perspective(1000px) rotateX(${tiltX}deg) rotateY(${tiltY}deg)`;
  }, [maxTilt]);

  const handleMouseLeave = useCallback(() => {
    const element = ref.current;
    if (!element) return;

    element.style.transform = 'perspective(1000px) rotateX(0deg) rotateY(0deg)';
  }, []);

  return {
    ref,
    onMouseMove: handleMouseMove,
    onMouseLeave: handleMouseLeave,
  };
}

export function useGlowFollow<T extends HTMLElement>() {
  const ref = useRef<T>(null);

  const handleMouseMove = useCallback((e: React.MouseEvent<T>) => {
    const element = ref.current;
    if (!element) return;

    const rect = element.getBoundingClientRect();
    const x = ((e.clientX - rect.left) / rect.width) * 100;
    const y = ((e.clientY - rect.top) / rect.height) * 100;

    element.style.setProperty('--glow-x', `${x}%`);
    element.style.setProperty('--glow-y', `${y}%`);
  }, []);

  return {
    ref,
    onMouseMove: handleMouseMove,
  };
}
