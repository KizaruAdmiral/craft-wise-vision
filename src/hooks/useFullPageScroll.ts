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

  const handleWheel = useCallback((e: WheelEvent) => {
    if (isScrolling.current) {
      e.preventDefault();
      return;
    }

    const delta = e.deltaY;
    if (Math.abs(delta) < 30) return;

    if (delta > 0 && currentSection < sectionCount - 1) {
      e.preventDefault();
      scrollToSection(currentSection + 1);
    } else if (delta < 0 && currentSection > 0) {
      e.preventDefault();
      scrollToSection(currentSection - 1);
    }
  }, [currentSection, sectionCount, scrollToSection]);

  // Touch handling for mobile
  const touchStartY = useRef(0);
  
  const handleTouchStart = useCallback((e: TouchEvent) => {
    touchStartY.current = e.touches[0].clientY;
  }, []);

  const handleTouchEnd = useCallback((e: TouchEvent) => {
    if (isScrolling.current) return;
    
    const touchEndY = e.changedTouches[0].clientY;
    const diff = touchStartY.current - touchEndY;
    
    if (Math.abs(diff) < 50) return;
    
    if (diff > 0 && currentSection < sectionCount - 1) {
      scrollToSection(currentSection + 1);
    } else if (diff < 0 && currentSection > 0) {
      scrollToSection(currentSection - 1);
    }
  }, [currentSection, sectionCount, scrollToSection]);

  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;

    container.addEventListener('wheel', handleWheel, { passive: false });
    container.addEventListener('touchstart', handleTouchStart, { passive: true });
    container.addEventListener('touchend', handleTouchEnd, { passive: true });

    return () => {
      container.removeEventListener('wheel', handleWheel);
      container.removeEventListener('touchstart', handleTouchStart);
      container.removeEventListener('touchend', handleTouchEnd);
    };
  }, [handleWheel, handleTouchStart, handleTouchEnd]);

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
