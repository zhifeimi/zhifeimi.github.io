import { useEffect, useRef } from 'react';

/**
 * Adds `.is-visible` to elements carrying `.reveal` inside the returned ref
 * when they enter the viewport. Attach the ref to any section wrapper.
 *
 * Pass a `dep` (e.g. the active language) to re-scan the DOM when content
 * is swapped out — React remounts keyed children, and new nodes need to be
 * observed again.
 */
export function useReveal<T extends HTMLElement>(dep?: unknown) {
  const ref = useRef<T>(null);

  useEffect(() => {
    const root = ref.current;
    if (!root) return;

    const targets = root.classList.contains('reveal')
      ? [root, ...Array.from(root.querySelectorAll<HTMLElement>('.reveal'))]
      : Array.from(root.querySelectorAll<HTMLElement>('.reveal'));

    if (targets.length === 0) return;

    const observer = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          if (entry.isIntersecting) {
            entry.target.classList.add('is-visible');
            observer.unobserve(entry.target);
          }
        }
      },
      { threshold: 0.12, rootMargin: '0px 0px -40px 0px' },
    );

    targets.forEach((t) => {
      // Already revealed (or revealed in a previous render): keep visible.
      if (t.classList.contains('is-visible')) return;
      // If it is already on screen (e.g. after a language swap remount),
      // reveal immediately instead of waiting for a scroll event.
      const r = t.getBoundingClientRect();
      if (r.top < window.innerHeight && r.bottom > 0) {
        t.classList.add('is-visible');
        return;
      }
      observer.observe(t);
    });

    return () => observer.disconnect();
  }, [dep]);

  return ref;
}
