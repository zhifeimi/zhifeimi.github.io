import { Award, BadgeCheck, Cloud, IdCard } from 'lucide-react';
import { SectionHeading } from '@/components/SectionHeading';
import { useI18n } from '@/i18n';

type Accent = 'yellow' | 'green' | 'blue';

const ACCENT: Record<Accent, { icon: string; chip: string }> = {
  yellow: { icon: 'text-cp-yellow', chip: 'border-cp-yellow/40 bg-cp-yellow/10 text-cp-yellow' },
  green: { icon: 'text-cp-green', chip: 'border-cp-green/40 bg-cp-green/10 text-cp-green' },
  blue: { icon: 'text-cp-blue', chip: 'border-cp-blue/40 bg-cp-blue/10 text-cp-blue' },
};

const CERT_ICONS = [Award, Cloud, BadgeCheck];

export function Certifications() {
  const { t } = useI18n();

  return (
    <section id="certifications" className="scroll-mt-20 bg-surface/40 py-20">
      <div className="mx-auto max-w-6xl px-4 sm:px-6">
        <SectionHeading
          comment={t.certifications.comment}
          title={t.certifications.heading}
          sub={t.certifications.sub}
        />

        <div className="grid gap-6 md:grid-cols-3">
          {t.certifications.certs.map((c, i) => {
            const a = ACCENT[c.accent as Accent];
            const Icon = CERT_ICONS[i] ?? BadgeCheck;
            return (
              <div
                key={i}
                className={`reveal pen-card relative flex flex-col gap-3 rounded-xl border bg-surface p-6 ${
                  c.featured ? 'glow-new border-cp-yellow/50' : 'border-edge'
                }`}
                style={{ transitionDelay: `${i * 90}ms` }}
              >
                {c.featured && (
                  <span className="absolute -top-2.5 right-4 rounded bg-cp-yellow px-2 py-0.5 font-code text-[10px] font-bold tracking-wider text-ink">
                    {t.certifications.newBadge}
                  </span>
                )}
                <Icon className={`h-9 w-9 ${a.icon}`} />
                <h3 className="text-base font-semibold leading-snug text-text">{c.name}</h3>
                <p className="text-sm text-muted">{c.issuer}</p>
                {c.year && (
                  <span className={`w-fit rounded-md border px-2 py-0.5 font-code text-[11px] ${a.chip}`}>
                    {c.year}
                  </span>
                )}
              </div>
            );
          })}
        </div>

        {/* memberships */}
        <div className="reveal mt-10" style={{ transitionDelay: '200ms' }}>
          <h3 className="mb-4 flex items-center gap-2 font-code text-sm text-muted">
            <IdCard className="h-4 w-4 text-cp-purple" />
            {t.certifications.membershipsHeading}
          </h3>
          <div className="grid grid-cols-2 gap-3 lg:grid-cols-4">
            {t.certifications.memberships.map((m, i) => (
              <div
                key={i}
                className="rounded-lg border border-edge bg-surface px-4 py-3 transition-colors hover:border-muted"
              >
                <p className="text-sm font-semibold text-text">{m.org}</p>
                <p className="mt-0.5 font-code text-[11px] text-muted">{m.id}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
