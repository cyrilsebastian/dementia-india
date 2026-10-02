import React, { useState, useEffect, useRef } from 'react';

interface DeferredViewProps {
  children: React.ReactNode;
  fallback: React.ReactNode;
  rootMargin?: string;
}

/**
 * @component DeferredView
 * @description Defers rendering and dynamic bundle evaluation until the element
 * approaches the viewport. Prevents heavy visualizations from blocking initial
 * above-the-fold paint and LCP on mobile devices while maintaining zero layout shift.
 */
export const DeferredView: React.FC<DeferredViewProps> = ({
  children,
  fallback,
  rootMargin = '300px',
}) => {
  const [isInView, setIsInView] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (typeof window === 'undefined' || !('IntersectionObserver' in window)) {
      setIsInView(true);
      return;
    }

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsInView(true);
          observer.disconnect();
        }
      },
      { rootMargin }
    );

    if (containerRef.current) {
      observer.observe(containerRef.current);
    }

    return () => observer.disconnect();
  }, [rootMargin]);

  return (
    <div ref={containerRef} className="w-full h-full">
      {isInView ? children : fallback}
    </div>
  );
};

export default DeferredView;
