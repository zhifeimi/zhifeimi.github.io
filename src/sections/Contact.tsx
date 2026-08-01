import { Facebook, Github, Linkedin, Mail, Twitter } from 'lucide-react';
import { useI18n } from '@/i18n';

export function Contact() {
  const { t } = useI18n();

  const socials = [
    { href: 'https://github.com/zhifeimi', label: 'GitHub', Icon: Github },
    { href: 'https://www.linkedin.com/in/zhifeimi/', label: 'LinkedIn', Icon: Linkedin },
    { href: 'https://x.com/zhifeimi', label: 'X', Icon: Twitter },
    { href: 'https://www.facebook.com/mizhifei', label: 'Facebook', Icon: Facebook },
  ];

  return (
    <section id="contact" className="grid-bg scroll-mt-20 py-20">
      <div className="mx-auto max-w-4xl px-4 sm:px-6">
        <div className="reveal flex flex-col items-center gap-6 rounded-2xl border border-edge bg-surface p-10 text-center shadow-2xl shadow-black/40 sm:p-14">
          <span className="font-code text-sm text-cp-green">{t.contact.comment}</span>
          <h2 className="max-w-xl text-3xl font-bold tracking-tight text-text sm:text-4xl">
            {t.contact.heading}
          </h2>
          <p className="max-w-xl text-base leading-relaxed text-muted">{t.contact.sub}</p>

          <a
            href="mailto:mizhifei@gmail.com"
            className="inline-flex items-center gap-2 rounded-lg bg-cp-blue px-6 py-3 text-sm font-semibold text-ink transition-transform hover:-translate-y-0.5"
          >
            <Mail className="h-4 w-4" />
            mizhifei@gmail.com
          </a>

          <div className="flex items-center gap-3 pt-2">
            {socials.map(({ href, label, Icon }) => (
              <a
                key={label}
                href={href}
                target="_blank"
                rel="noreferrer"
                aria-label={label}
                className="rounded-md border border-edge p-2.5 text-muted transition-colors hover:border-muted hover:text-text"
              >
                <Icon className="h-5 w-5" />
              </a>
            ))}
          </div>
        </div>

        <footer className="mt-12 flex flex-col items-center gap-1.5 pb-4 text-center">
          <p className="text-sm text-muted">{t.contact.footer}</p>
          <p className="font-code text-xs text-edge">{t.contact.builtWith}</p>
        </footer>
      </div>
    </section>
  );
}
