import { GitCommitHorizontal, GitBranch, GraduationCap } from 'lucide-react';
import { SectionHeading } from '@/components/SectionHeading';
import { useI18n } from '@/i18n';

const TYPE_STYLE = {
  role: {
    dot: 'text-cp-green border-cp-green/50 bg-cp-green/10',
    title: 'text-cp-green',
    Icon: GitCommitHorizontal,
  },
  edu: {
    dot: 'text-cp-blue border-cp-blue/50 bg-cp-blue/10',
    title: 'text-cp-blue',
    Icon: GraduationCap,
  },
  init: {
    dot: 'text-cp-yellow border-cp-yellow/50 bg-cp-yellow/10',
    title: 'text-cp-yellow',
    Icon: GitBranch,
  },
} as const;

export function Journey() {
  const { t } = useI18n();

  return (
    <section id="journey" className="scroll-mt-20 py-20">
      <div className="mx-auto max-w-4xl px-4 sm:px-6">
        <SectionHeading
          comment={t.journey.comment}
          title={t.journey.heading}
          sub={t.journey.sub}
        />

        <div className="relative">
          {/* vertical line */}
          <div className="absolute bottom-6 left-[19px] top-2 w-px bg-edge" aria-hidden />

          <div className="flex flex-col gap-10">
            {t.journey.entries.map((e, i) => {
              const style = TYPE_STYLE[e.type];
              const Icon = style.Icon;
              return (
                <div key={e.hash} className="reveal relative flex gap-5" style={{ transitionDelay: `${i * 60}ms` }}>
                  <div className={`relative z-10 flex h-10 w-10 shrink-0 items-center justify-center rounded-full border ${style.dot}`}>
                    <Icon className="h-4.5 w-4.5 h-[18px] w-[18px]" />
                  </div>

                  <div className="min-w-0 flex-1 rounded-xl border border-edge bg-surface p-5">
                    <div className="flex flex-wrap items-center gap-x-3 gap-y-1.5">
                      <span className="rounded border border-edge bg-[#0d0e12] px-2 py-0.5 font-code text-[11px] text-cp-purple">
                        {e.hash}
                      </span>
                      <span className="font-code text-xs text-muted">{e.period}</span>
                    </div>
                    <h3 className={`mt-2.5 text-xl font-extrabold tracking-tight ${style.title}`}>{e.title}</h3>
                    <p className="mt-0.5 font-code text-xs text-cp-blue">{e.org}</p>
                    {e.bullets.length > 0 && (
                      <ul className="mt-3 flex flex-col gap-1.5">
                        {e.bullets.map((b) => (
                          <li key={b} className="flex gap-2 text-sm leading-relaxed text-muted">
                            <span className="mt-1.5 h-1 w-1 shrink-0 rounded-full bg-cp-green" />
                            {b}
                          </li>
                        ))}
                      </ul>
                    )}
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
}
