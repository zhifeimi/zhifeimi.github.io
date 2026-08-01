import { useEffect, useState } from 'react';

/**
 * Cycles through `phrases`: types each one, pauses, deletes, moves on.
 * Returns the currently visible text.
 */
export function useTyping(
  phrases: string[],
  typeMs = 65,
  deleteMs = 32,
  holdMs = 1700,
): string {
  const key = phrases.join('');
  const [text, setText] = useState('');

  useEffect(() => {
    let phrase = 0;
    let char = 0;
    let deleting = false;
    let timer: ReturnType<typeof setTimeout>;

    const tick = () => {
      const current = phrases[phrase];
      if (!deleting) {
        char += 1;
        setText(current.slice(0, char));
        if (char >= current.length) {
          deleting = true;
          timer = setTimeout(tick, holdMs);
          return;
        }
        timer = setTimeout(tick, typeMs);
      } else {
        char -= 1;
        setText(current.slice(0, char));
        if (char <= 0) {
          deleting = false;
          phrase = (phrase + 1) % phrases.length;
          timer = setTimeout(tick, 350);
          return;
        }
        timer = setTimeout(tick, deleteMs);
      }
    };

    timer = setTimeout(tick, 400);
    return () => clearTimeout(timer);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [key, typeMs, deleteMs, holdMs]);

  return text;
}
