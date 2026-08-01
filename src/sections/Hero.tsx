import { ArrowRight, Award, BadgeCheck, Cloud, Github, Linkedin, Mail, MapPin } from 'lucide-react';
import { Terminal } from '@/components/Terminal';
import { useI18n } from '@/i18n';
import { useTyping } from '@/hooks/useTyping';

const PHOTO_URL = 'https://pub-fdc99f8f985d484fa262aff00d577350.r2.dev/zhifeimi.jpeg';

export function Hero() {
  const { t } = useI18n();
  const typed = useTyping(t.hero.roles);

  return (
    <section id="top" className="grid-bg relative overflow-hidden pb-16 pt-28 sm:pt-32">
      {/* ambient glows */}
      <div className="pointer-events-none absolute -top-32 left-1/4 h-72 w-72 rounded-full bg-cp-blue/10 blur-3xl" />
      <div className="pointer-events-none absolute right-1/4 top-24 h-72 w-72 rounded-full bg-cp-purple/10 blur-3xl" />

      <div className="relative mx-auto max-w-6xl px-4 sm:px-6">
        <div className="grid items-start gap-12 lg:grid-cols-[1.15fr_0.85fr]">
          {/* left: intro */}
          <div className="reveal">
            <span className="inline-flex items-center gap-2 rounded-full border border-cp-green/30 bg-cp-green/10 px-3 py-1 text-xs font-medium text-cp-green">
              <span className="relative flex h-2 w-2">
                <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-cp-green opacity-60" />
                <span className="relative inline-flex h-2 w-2 rounded-full bg-cp-green" />
              </span>
              {t.hero.available}
            </span>

            <p className="mt-6 font-code text-sm text-muted">{t.hero.hi}</p>
            <h1 className="mt-1 text-5xl font-extrabold tracking-tight text-text sm:text-6xl">
              {t.hero.name}
            </h1>
            <p className="mt-3 h-8 font-code text-xl text-cp-blue sm:text-2xl">
              {typed}
              <span className="caret" />
            </p>

            <p className="mt-5 max-w-xl text-base leading-relaxed text-muted">
              {t.hero.tagline}
            </p>

            <div className="mt-7 flex flex-wrap items-center gap-3">
              <a
                href="#projects"
                className="inline-flex items-center gap-2 rounded-lg bg-cp-blue px-5 py-2.5 text-sm font-semibold text-ink transition-transform hover:-translate-y-0.5"
              >
                {t.hero.viewProjects}
                <ArrowRight className="h-4 w-4" />
              </a>
              <a
                href="mailto:mizhifei@gmail.com"
                className="inline-flex items-center gap-2 rounded-lg border border-edge bg-surface px-5 py-2.5 text-sm font-semibold text-text transition-colors hover:border-muted"
              >
                <Mail className="h-4 w-4" />
                {t.hero.getInTouch}
              </a>
            </div>

            <div className="mt-10">
              <Terminal lines={t.hero.terminal} />
            </div>
          </div>

          {/* right: CodePen-style profile card */}
          <div className="reveal" style={{ transitionDelay: '120ms' }}>
            <div className="overflow-hidden rounded-2xl border border-edge bg-surface shadow-2xl shadow-black/40">
              {/* banner */}
              <div className="h-20 bg-[linear-gradient(120deg,#0ebeff33,#ae63e433,#ff3cac33)]" />
              <div className="-mt-12 flex flex-col items-center px-6 pb-6">
                <div className="rainbow-ring rounded-full p-[3px]">
                  <img
                    src={PHOTO_URL}
                    alt="Zhifei Mi"
                    className="h-24 w-24 rounded-full border-4 border-surface object-cover"
                    loading="eager"
                  />
                </div>
                <p className="mt-3 font-code text-xs text-muted">{t.hero.card.role}</p>

                <div className="mt-4 flex w-full flex-col gap-2 font-code text-xs text-muted">
                  <span className="flex items-center gap-2">
                    <MapPin className="h-3.5 w-3.5 text-cp-pink" />
                    {t.hero.card.location}
                  </span>
                  <span className="flex items-center gap-2">
                    <BadgeCheck className="h-3.5 w-3.5 text-cp-green" />
                    {t.hero.card.stack}
                  </span>
                </div>

                {/* cert chips */}
                <div className="mt-5 flex w-full flex-wrap justify-center gap-2">
                  <span className="inline-flex items-center gap-1.5 rounded-md border border-cp-yellow/40 bg-cp-yellow/10 px-2.5 py-1 font-code text-[11px] font-semibold text-cp-yellow">
                    <Award className="h-3 w-3" /> PMP®
                  </span>
                  <span className="inline-flex items-center gap-1.5 rounded-md border border-cp-blue/40 bg-cp-blue/10 px-2.5 py-1 font-code text-[11px] font-semibold text-cp-blue">
                    <Cloud className="h-3 w-3" /> AWS SA Pro
                  </span>
                  <span className="inline-flex items-center gap-1.5 rounded-md border border-cp-green/40 bg-cp-green/10 px-2.5 py-1 font-code text-[11px] font-semibold text-cp-green">
                    <BadgeCheck className="h-3 w-3" /> ACS
                  </span>
                </div>

                <div className="mt-5 flex items-center gap-2 border-t border-edge pt-5">
                  <a
                    href="https://github.com/zhifeimi"
                    target="_blank"
                    rel="noreferrer"
                    aria-label="GitHub"
                    className="rounded-md border border-edge p-2 text-muted transition-colors hover:border-muted hover:text-text"
                  >
                    <Github className="h-4 w-4" />
                  </a>
                  <a
                    href="https://www.linkedin.com/in/zhifeimi/"
                    target="_blank"
                    rel="noreferrer"
                    aria-label="LinkedIn"
                    className="rounded-md border border-edge p-2 text-muted transition-colors hover:border-muted hover:text-text"
                  >
                    <Linkedin className="h-4 w-4" />
                  </a>
                  <a
                    href="mailto:mizhifei@gmail.com"
                    aria-label="Email"
                    className="rounded-md border border-edge p-2 text-muted transition-colors hover:border-muted hover:text-text"
                  >
                    <Mail className="h-4 w-4" />
                  </a>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* stats strip */}
        <div className="reveal mt-16 grid grid-cols-2 gap-px overflow-hidden rounded-xl border border-edge bg-edge sm:grid-cols-4" style={{ transitionDelay: '200ms' }}>
          {t.stats.map((s) => (
            <div key={s.label} className="flex flex-col items-center gap-1 bg-surface px-4 py-6">
              <span className="font-code text-3xl font-bold text-cp-green">{s.value}</span>
              <span className="text-center text-xs text-muted">{s.label}</span>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
