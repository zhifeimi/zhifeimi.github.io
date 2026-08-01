import { useEffect, useState } from 'react';

export interface TerminalLine {
  cmd: string;
  out: string;
}

/**
 * A mock macOS terminal that types each command, then prints its output.
 */
export function Terminal({ lines }: { lines: TerminalLine[] }) {
  const key = JSON.stringify(lines);
  const [lineIdx, setLineIdx] = useState(0);
  const [charIdx, setCharIdx] = useState(0);
  const [showOut, setShowOut] = useState<boolean[]>([]);

  useEffect(() => {
    setLineIdx(0);
    setCharIdx(0);
    setShowOut([]);
    let cancelled = false;
    let timer: ReturnType<typeof setTimeout>;

    const run = (li: number, ci: number, outs: boolean[]) => {
      if (cancelled || li >= lines.length) return;
      const current = lines[li];

      if (ci <= current.cmd.length) {
        setLineIdx(li);
        setCharIdx(ci);
        timer = setTimeout(() => run(li, ci + 1, outs), 46);
      } else {
        const nextOuts = [...outs];
        nextOuts[li] = true;
        setShowOut(nextOuts);
        timer = setTimeout(() => run(li + 1, 0, nextOuts), 620);
      }
    };

    timer = setTimeout(() => run(0, 0, []), 500);
    return () => {
      cancelled = true;
      clearTimeout(timer);
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [key]);

  return (
    <div className="overflow-hidden rounded-xl border border-edge bg-[#0d0e12] shadow-2xl shadow-black/50">
      <div className="flex items-center gap-2 border-b border-edge/60 bg-surface px-4 py-2.5">
        <span className="h-3 w-3 rounded-full bg-[#ff5f57]" />
        <span className="h-3 w-3 rounded-full bg-[#febc2e]" />
        <span className="h-3 w-3 rounded-full bg-[#28c840]" />
        <span className="ml-3 font-code text-xs text-muted">zhifei@zhifeis.tech ~ zsh</span>
      </div>
      <div className="min-h-[132px] p-4 font-code text-[13px] leading-6 sm:text-sm">
        {lines.map((line, i) => {
          if (i > lineIdx) return null;
          const typed = i === lineIdx ? line.cmd.slice(0, charIdx) : line.cmd;
          const isActive = i === lineIdx && charIdx <= line.cmd.length;
          return (
            <div key={i}>
              <div>
                <span className="text-cp-green">$ </span>
                <span className="text-text">{typed}</span>
                {isActive && <span className="caret" />}
              </div>
              {(showOut[i] || i < lineIdx) && (
                <div className="text-muted">
                  <span className="text-cp-purple">→ </span>
                  {line.out}
                </div>
              )}
            </div>
          );
        })}
        {lineIdx >= lines.length && (
          <div>
            <span className="text-cp-green">$ </span>
            <span className="caret" />
          </div>
        )}
      </div>
    </div>
  );
}
