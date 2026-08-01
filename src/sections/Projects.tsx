import { useState, type ComponentType } from 'react';
import {
  ArrowRight,
  ArrowUpRight,
  AudioWaveform,
  Building2,
  Car,
  Cloud,
  ExternalLink,
  Github,
  HardHat,
  MonitorPlay,
  Network,
  Server,
  Sparkles,
  Stethoscope,
  Tv,
  User,
  Wrench,
} from 'lucide-react';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog';
import { SectionHeading } from '@/components/SectionHeading';
import { useI18n } from '@/i18n';

type Accent = 'yellow' | 'green' | 'blue' | 'pink' | 'purple';

const ACCENT: Record<Accent, { text: string; chip: string; preview: string; ring: string }> = {
  yellow: {
    text: 'text-cp-yellow',
    chip: 'border-cp-yellow/30 bg-cp-yellow/10 text-cp-yellow',
    preview: 'from-cp-yellow/15 via-surface to-surface',
    ring: 'group-hover:border-cp-yellow/50',
  },
  green: {
    text: 'text-cp-green',
    chip: 'border-cp-green/30 bg-cp-green/10 text-cp-green',
    preview: 'from-cp-green/15 via-surface to-surface',
    ring: 'group-hover:border-cp-green/50',
  },
  blue: {
    text: 'text-cp-blue',
    chip: 'border-cp-blue/30 bg-cp-blue/10 text-cp-blue',
    preview: 'from-cp-blue/15 via-surface to-surface',
    ring: 'group-hover:border-cp-blue/50',
  },
  pink: {
    text: 'text-cp-pink',
    chip: 'border-cp-pink/30 bg-cp-pink/10 text-cp-pink',
    preview: 'from-cp-pink/15 via-surface to-surface',
    ring: 'group-hover:border-cp-pink/50',
  },
  purple: {
    text: 'text-cp-purple',
    chip: 'border-cp-purple/30 bg-cp-purple/10 text-cp-purple',
    preview: 'from-cp-purple/15 via-surface to-surface',
    ring: 'group-hover:border-cp-purple/50',
  },
};

const ICONS: Record<string, ComponentType<{ className?: string }>> = {
  'monitor-play': MonitorPlay,
  building: Building2,
  cloud: Cloud,
  'hard-hat': HardHat,
  tv: Tv,
  wrench: Wrench,
  network: Network,
  stethoscope: Stethoscope,
  car: Car,
  server: Server,
  'audio-waveform': AudioWaveform,
};

export function Projects() {
  const { t } = useI18n();
  const [selected, setSelected] = useState<number | null>(null);
  const active = selected !== null ? t.projects.items[selected] : null;
  const activeAccent = active ? ACCENT[active.accent as Accent] : null;
  const ActiveIcon = active ? ICONS[active.icon] ?? MonitorPlay : MonitorPlay;

  return (
    <section id="projects" className="scroll-mt-20 py-20">
      <div className="mx-auto max-w-6xl px-4 sm:px-6">
        <SectionHeading
          comment={t.projects.comment}
          title={t.projects.heading}
          sub={t.projects.sub}
        />

        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          {t.projects.items.map((p, i) => {
            const a = ACCENT[p.accent as Accent];
            const Icon = ICONS[p.icon] ?? MonitorPlay;
            return (
              <article
                key={i}
                onClick={() => setSelected(i)}
                className={`reveal pen-card group flex cursor-pointer flex-col overflow-hidden rounded-xl border border-edge bg-surface ${a.ring}`}
                style={{ transitionDelay: `${(i % 3) * 90}ms` }}
              >
                {/* pen-style preview */}
                <div className={`relative h-36 bg-gradient-to-br ${a.preview}`}>
                  <div className="absolute left-3 top-3 flex gap-1.5">
                    <span className="h-2.5 w-2.5 rounded-full bg-[#ff5f57]/80" />
                    <span className="h-2.5 w-2.5 rounded-full bg-[#febc2e]/80" />
                    <span className="h-2.5 w-2.5 rounded-full bg-[#28c840]/80" />
                  </div>
                  <span className={`absolute right-3 top-3 font-code text-[11px] ${a.text}`}>
                    {p.period}
                  </span>
                  {p.live && (
                    <span className="absolute bottom-3 right-3 inline-flex items-center gap-1.5 rounded-full border border-cp-green/40 bg-ink/70 px-2 py-0.5 font-code text-[10px] font-bold tracking-wider text-cp-green backdrop-blur-sm">
                      <span className="relative flex h-1.5 w-1.5">
                        <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-cp-green opacity-60" />
                        <span className="relative inline-flex h-1.5 w-1.5 rounded-full bg-cp-green" />
                      </span>
                      {t.projects.liveBadge}
                    </span>
                  )}
                  <div className="flex h-full items-center justify-center">
                    <Icon className={`h-14 w-14 ${a.text} opacity-80 transition-transform duration-300 group-hover:scale-110`} />
                  </div>
                </div>

                {/* body */}
                <div className="flex flex-1 flex-col gap-3 border-t border-edge p-5">
                  <span className={`w-fit rounded-md border px-2 py-0.5 font-code text-[11px] ${a.chip}`}>
                    {p.category}
                  </span>
                  <h3 className="text-base font-semibold leading-snug text-text">
                    {p.title}
                  </h3>
                  <p className="flex-1 text-sm leading-relaxed text-muted">{p.description}</p>
                  <div className="flex flex-wrap gap-1.5 pt-1">
                    {p.tags.map((tag) => (
                      <span
                        key={tag}
                        className="rounded border border-edge bg-surface-2 px-1.5 py-0.5 font-code text-[10px] text-muted"
                      >
                        {tag}
                      </span>
                    ))}
                  </div>
                  <span className={`mt-1 inline-flex items-center gap-1 font-code text-xs ${a.text}`}>
                    {t.projects.viewDetails}
                    <ArrowRight className="h-3.5 w-3.5 transition-transform group-hover:translate-x-1" />
                  </span>
                </div>
              </article>
            );
          })}

          {/* GitHub CTA card */}
          <a
            href="https://github.com/zhifeimi"
            target="_blank"
            rel="noreferrer"
            className="reveal pen-card group flex flex-col items-center justify-center gap-3 rounded-xl border border-dashed border-edge bg-surface/50 p-8 text-center hover:border-muted"
            style={{ transitionDelay: '180ms' }}
          >
            <Github className="h-10 w-10 text-muted transition-colors group-hover:text-text" />
            <span className="flex items-center gap-1.5 font-semibold text-text">
              {t.projects.moreOnGithub}
              <ArrowUpRight className="h-4 w-4 text-cp-blue" />
            </span>
            <span className="font-code text-xs text-muted">{t.projects.moreSub}</span>
          </a>
        </div>
      </div>

      {/* project detail modal */}
      <Dialog open={selected !== null} onOpenChange={(open) => !open && setSelected(null)}>
        <DialogContent className="max-h-[85vh] overflow-y-auto border-edge bg-surface text-text sm:max-w-2xl">
          {active && activeAccent && (
            <>
              <DialogHeader>
                <div className="flex flex-wrap items-center gap-2 pr-6">
                  <span className={`rounded-md border px-2 py-0.5 font-code text-[11px] ${activeAccent.chip}`}>
                    {active.category}
                  </span>
                  <span className={`font-code text-xs ${activeAccent.text}`}>{active.period}</span>
                </div>
                <DialogTitle className="flex items-start gap-3 pt-2 text-left text-xl leading-snug text-text">
                  <ActiveIcon className={`mt-0.5 h-6 w-6 shrink-0 ${activeAccent.text}`} />
                  {active.title}
                </DialogTitle>
                <DialogDescription className="pt-1 text-left text-sm leading-relaxed text-muted">
                  {active.description}
                </DialogDescription>
              </DialogHeader>

              <div className="flex items-center gap-2 rounded-lg border border-edge bg-[#0d0e12] px-3 py-2">
                <User className={`h-4 w-4 ${activeAccent.text}`} />
                <span className="font-code text-xs text-muted">{t.projects.roleLabel}:</span>
                <span className="font-code text-xs font-semibold text-text">{active.role}</span>
              </div>

              {active.live && (
                <a
                  href={active.live}
                  target="_blank"
                  rel="noreferrer"
                  className="inline-flex w-fit items-center gap-2 rounded-lg bg-cp-green px-4 py-2 text-sm font-semibold text-ink transition-transform hover:-translate-y-0.5"
                >
                  <ExternalLink className="h-4 w-4" />
                  {t.projects.liveDemo}
                </a>
              )}

              <div>
                <h4 className={`flex items-center gap-2 font-code text-sm ${activeAccent.text}`}>
                  <Sparkles className="h-4 w-4" />
                  {t.projects.contributionsLabel}
                </h4>
                <ul className="mt-3 flex flex-col gap-2.5">
                  {active.highlights.map((h) => (
                    <li key={h} className="flex gap-2.5 text-sm leading-relaxed text-muted">
                      <span className={`mt-2 h-1.5 w-1.5 shrink-0 rounded-full ${activeAccent.text} bg-current`} />
                      {h}
                    </li>
                  ))}
                </ul>
              </div>

              <div className="flex flex-wrap gap-1.5 border-t border-edge pt-4">
                {active.tags.map((tag) => (
                  <span
                    key={tag}
                    className="rounded border border-edge bg-surface-2 px-2 py-1 font-code text-[11px] text-muted"
                  >
                    {tag}
                  </span>
                ))}
              </div>
            </>
          )}
        </DialogContent>
      </Dialog>
    </section>
  );
}
