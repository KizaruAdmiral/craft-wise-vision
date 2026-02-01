import { useState, useEffect, useCallback, useRef } from 'react';

interface UseFullPageScrollOptions {
  sectionCount: number;
  throttleMs?: number;
}

export function useFullPageScroll({ sectionCount, throttleMs = 800 }: UseFullPageScrollOptions) {
  const [currentSection, setCurrentSection] = useState(0);
  const isScrolling = useRef(false);
  const containerRef = useRef<HTMLDivElement>(null);

  const scrollToSection = useCallback((index: number) => {
    if (index < 0 || index >= sectionCount || isScrolling.current) return;
    
    isScrolling.current = true;
    setCurrentSection(index);
    
    const sections = containerRef.current?.querySelectorAll('[data-section]');
    if (sections && sections[index]) {
      sections[index].scrollIntoView({ behavior: 'smooth' });
    }
    
    setTimeout(() => {
      isScrolling.current = false;
    }, throttleMs);
  }, [sectionCount, throttleMs]);

  // Wheel/touch scrolling disabled - only keyboard navigation



  // Keyboard navigation
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'ArrowDown' || e.key === 'PageDown' || e.key === ' ') {
        e.preventDefault();
        scrollToSection(currentSection + 1);
      } else if (e.key === 'ArrowUp' || e.key === 'PageUp') {
        e.preventDefault();
        scrollToSection(currentSection - 1);
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [currentSection, scrollToSection]);

  return {
    containerRef,
    currentSection,
    scrollToSection,
    totalSections: sectionCount,
  };
}
