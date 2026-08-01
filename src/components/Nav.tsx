import { useEffect, useRef, useState } from 'react';
import { Check, ChevronDown, Github, Globe, Menu, X } from 'lucide-react';
import { LANGS, useI18n, type Lang } from '@/i18n';

const LANG_LABELS: Record<Lang, string> = {
  en: 'English',
  zh: '中文',
  ja: '日本語',
};

export function Nav() {
  const { lang, setLang, t } = useI18n();
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);
  const [langOpen, setLangOpen] = useState(false);
  const langRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 24);
    onScroll();
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  useEffect(() => {
    if (!langOpen) return;
    const onClick = (e: MouseEvent) => {
      if (langRef.current && !langRef.current.contains(e.target as Node)) {
        setLangOpen(false);
      }
    };
    document.addEventListener('mousedown', onClick);
    return () => document.removeEventListener('mousedown', onClick);
  }, [langOpen]);

  const links = [
    { href: '#projects', label: t.nav.projects },
    { href: '#skills', label: t.nav.skills },
    { href: '#journey', label: t.nav.journey },
    { href: '#certifications', label: t.nav.certifications },
    { href: '#education', label: t.nav.education },
    { href: '#contact', label: t.nav.contact },
  ];

  return (
    <header
      className={`fixed inset-x-0 top-0 z-50 border-b transition-colors duration-300 ${
        scrolled
          ? 'border-edge bg-ink/85 backdrop-blur-md'
          : 'border-transparent bg-transparent'
      }`}
    >
      <div className="mx-auto flex h-16 max-w-6xl items-center justify-between px-4 sm:px-6">
        <a href="#top" className="font-code text-sm font-semibold tracking-tight sm:text-base">
          <span className="text-cp-green">&lt;/&gt;</span>{' '}
          <span className="text-text">{t.nav.brand}</span>
        </a>

        <nav className="hidden items-center gap-6 lg:flex">
          {links.map((l) => (
            <a
              key={l.href}
              href={l.href}
              className="text-sm text-muted transition-colors hover:text-text"
            >
              {l.label}
            </a>
          ))}
        </nav>

        <div className="flex items-center gap-2">
          {/* language dropdown */}
          <div ref={langRef} className="relative">
            <button
              onClick={() => setLangOpen((v) => !v)}
              className="flex items-center gap-1.5 rounded-md border border-edge bg-surface px-3 py-1.5 font-code text-xs text-muted transition-colors hover:border-muted hover:text-text"
              aria-label="Language / 语言 / 言語"
              aria-expanded={langOpen}
            >
              <Globe className="h-3.5 w-3.5" />
              {LANG_LABELS[lang]}
              <ChevronDown className={`h-3 w-3 transition-transform ${langOpen ? 'rotate-180' : ''}`} />
            </button>
            {langOpen && (
              <div className="absolute right-0 top-full z-50 mt-1.5 w-32 overflow-hidden rounded-md border border-edge bg-surface py-1 shadow-xl shadow-black/40">
                {LANGS.map((l) => (
                  <button
                    key={l}
                    onClick={() => {
                      setLang(l);
                      setLangOpen(false);
                    }}
                    className={`flex w-full items-center justify-between px-3 py-2 text-left text-xs transition-colors ${
                      l === lang ? 'text-cp-blue' : 'text-muted hover:bg-surface-2 hover:text-text'
                    }`}
                  >
                    {LANG_LABELS[l]}
                    {l === lang && <Check className="h-3.5 w-3.5" />}
                  </button>
                ))}
              </div>
            )}
          </div>

          <a
            href="https://github.com/zhifeimi"
            target="_blank"
            rel="noreferrer"
            className="hidden rounded-md border border-edge bg-surface p-2 text-muted transition-colors hover:border-muted hover:text-text sm:block"
            aria-label="GitHub"
          >
            <Github className="h-4 w-4" />
          </a>
          <button
            className="rounded-md border border-edge bg-surface p-2 text-muted lg:hidden"
            onClick={() => setOpen((v) => !v)}
            aria-label="Menu"
          >
            {open ? <X className="h-4 w-4" /> : <Menu className="h-4 w-4" />}
          </button>
        </div>
      </div>

      {open && (
        <nav className="border-t border-edge bg-ink/95 backdrop-blur-md lg:hidden">
          <div className="mx-auto flex max-w-6xl flex-col px-4 py-2">
            {links.map((l) => (
              <a
                key={l.href}
                href={l.href}
                onClick={() => setOpen(false)}
                className="border-b border-edge/50 py-3 text-sm text-muted transition-colors last:border-0 hover:text-text"
              >
                {l.label}
              </a>
            ))}
          </div>
        </nav>
      )}
    </header>
  );
}
