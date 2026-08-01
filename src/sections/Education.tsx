import { GraduationCap } from 'lucide-react';
import { SectionHeading } from '@/components/SectionHeading';
import { useI18n } from '@/i18n';

type Accent = 'green' | 'blue' | 'pink';

const ACCENT: Record<Accent, { icon: string; bar: string }> = {
  green: { icon: 'text-cp-green', bar: 'border-l-cp-green' },
  blue: { icon: 'text-cp-blue', bar: 'border-l-cp-blue' },
  pink: { icon: 'text-cp-pink', bar: 'border-l-cp-pink' },
};

export function Education() {
  const { t } = useI18n();

  return (
    <section id="education" className="scroll-mt-20 py-20">
      <div className="mx-auto max-w-6xl px-4 sm:px-6">
        <SectionHeading
          comment={t.education.comment}
          title={t.education.heading}
          sub={t.education.sub}
        />

        <div className="grid gap-6 md:grid-cols-3">
          {t.education.items.map((e, i) => {
            const a = ACCENT[e.accent as Accent];
            return (
              <div
                key={i}
                className={`reveal pen-card flex flex-col gap-2.5 rounded-xl border border-edge border-l-4 bg-surface p-6 ${a.bar}`}
                style={{ transitionDelay: `${i * 90}ms` }}
              >
                <div className="flex items-center justify-between">
                  <GraduationCap className={`h-7 w-7 ${a.icon}`} />
                  <span className="font-code text-xs text-muted">{e.period}</span>
                </div>
                <h3 className="text-base font-semibold text-text">{e.degree}</h3>
                <p className="text-sm font-medium text-muted">{e.school}</p>
                <p className="font-code text-xs leading-relaxed text-muted">{e.note}</p>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
