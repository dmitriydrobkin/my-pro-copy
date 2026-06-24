'use client';
import { useEffect, useRef } from 'react';
import { usePathname } from 'next/navigation';

export function MobileHoverSync() {
  const pathname = usePathname();
  const timeoutsRef = useRef<Map<Element, NodeJS.Timeout>>(new Map());

  useEffect(() => {
    // Работает только на мобилках
    if (window.innerWidth >= 1024) return;

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            // Задержка 1 секунда для плавности
            const timeout = setTimeout(() => {
              entry.target.setAttribute('data-mobile-hover', 'true');
            }, 1000);
            timeoutsRef.current.set(entry.target, timeout);
          } else {
            const timeout = timeoutsRef.current.get(entry.target);
            if (timeout) {
              clearTimeout(timeout);
              timeoutsRef.current.delete(entry.target);
            }
            entry.target.removeAttribute('data-mobile-hover');
          }
        });
      },
      { threshold: 0.6 }
    );

    // Наблюдаем только за карточками (у них rounded-[2rem] и класс group), чтобы кнопки не анимировались
    const elements = document.querySelectorAll('.group.rounded-\\[2rem\\]');
    elements.forEach((el) => observer.observe(el));

    return () => {
      observer.disconnect();
      timeoutsRef.current.forEach((timeout) => clearTimeout(timeout));
      timeoutsRef.current.clear();
    };
  }, [pathname]);

  return null;
}
