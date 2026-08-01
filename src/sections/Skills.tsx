import { useState } from 'react';
import { FileCode2, FileText, FileType2, FolderOpen, Infinity as InfinityIcon } from 'lucide-react';
import { SectionHeading } from '@/components/SectionHeading';
import { useI18n } from '@/i18n';

/* The full stack — mirrors the stack section of the Deno site (7101). */
const STACK_TAGS = [
  'Java', 'Spring Boot', 'Spring Cloud', 'Python', 'TypeScript', 'JavaScript',
  'React', 'Vue 3', 'Deno', 'Electron', 'HTML5', 'CSS3/SCSS', 'Tailwind',
  'Material UI', 'Bootstrap', 'Element UI', 'Hibernate/JPA', 'MyBatis',
  'REST APIs', 'OAuth2/JWT', 'Swagger/OpenAPI', 'Flask', 'PyTorch', 'TensorFlow',
  'NumPy', 'SciPy', 'Spark', 'Hadoop', 'Docker', 'Kubernetes', 'Jenkins',
  'Nginx', 'Tomcat', 'CI/CD', 'Git', 'SVN', 'Linux', 'AWS', 'MySQL',
  'PostgreSQL', 'Oracle', 'MongoDB', 'Redis', 'Multithreading', 'Postman',
  'DBeaver', 'IntelliJ IDEA', 'VS Code', 'Cursor',
];

const TAG_COLORS = [
  'hover:border-cp-yellow/50 hover:text-cp-yellow',
  'hover:border-cp-green/50 hover:text-cp-green',
  'hover:border-cp-blue/50 hover:text-cp-blue',
  'hover:border-cp-pink/50 hover:text-cp-pink',
  'hover:border-cp-purple/50 hover:text-cp-purple',
];

function MarqueeRow({ tags, reverse }: { tags: string[]; reverse?: boolean }) {
  const doubled = [...tags, ...tags];
  return (
    <div className="marquee py-1.5">
      <div className={`marquee-track ${reverse ? 'reverse' : ''}`}>
        {doubled.map((tag, i) => (
          <span
            key={`${tag}-${i}`}
            className={`whitespace-nowrap rounded-md border border-edge bg-surface px-3 py-1.5 font-code text-xs text-muted transition-colors ${
              TAG_COLORS[i % TAG_COLORS.length]
            }`}
          >
            {tag}
          </span>
        ))}
      </div>
    </div>
  );
}

function fileIcon(name: string) {
  if (name.endsWith('.md')) return FileText;
  if (name.endsWith('.yml') || name.endsWith('.sql')) return FileType2;
  return FileCode2;
}

export function Skills() {
  const { t } = useI18n();
  const [active, setActive] = useState(0);
  const file = t.skills.files[active];

  const rowA = STACK_TAGS.filter((_, i) => i % 2 === 0);
  const rowB = STACK_TAGS.filter((_, i) => i % 2 === 1);

  return (
    <section id="skills" className="scroll-mt-20 bg-surface/40 py-20">
      <div className="mx-auto max-w-6xl px-4 sm:px-6">
        <SectionHeading
          comment={t.skills.comment}
          title={t.skills.heading}
          sub={t.skills.sub}
        />

        <div className="reveal overflow-hidden rounded-xl border border-edge bg-[#0d0e12] shadow-2xl shadow-black/50">
          {/* editor chrome */}
          <div className="flex items-center gap-2 border-b border-edge/60 bg-surface px-4 py-2.5">
            <span className="h-3 w-3 rounded-full bg-[#ff5f57]" />
            <span className="h-3 w-3 rounded-full bg-[#febc2e]" />
            <span className="h-3 w-3 rounded-full bg-[#28c840]" />
            <span className="ml-3 font-code text-xs text-muted">tech_stack — vim</span>
          </div>

          <div className="grid sm:grid-cols-[220px_1fr]">
            {/* file tree */}
            <div className="border-b border-edge/60 bg-surface/50 p-3 sm:border-b-0 sm:border-r">
              <div className="mb-2 flex items-center gap-1.5 px-2 font-code text-xs text-muted">
                <FolderOpen className="h-3.5 w-3.5 text-cp-yellow" />
                tech_stack/
              </div>
              <div className="flex flex-col gap-0.5">
                {t.skills.files.map((f, i) => {
                  const Icon = fileIcon(f.name);
                  const isActive = i === active;
                  return (
                    <button
                      key={f.name}
                      onClick={() => setActive(i)}
                      className={`flex items-center gap-2 rounded-md px-2.5 py-1.5 text-left font-code text-xs transition-colors ${
                        isActive
                          ? 'bg-surface-2 text-cp-blue'
                          : 'text-muted hover:bg-surface-2/60 hover:text-text'
                      }`}
                    >
                      <Icon className="h-3.5 w-3.5 shrink-0" />
                      {f.name}
                    </button>
                  );
                })}
              </div>
            </div>

            {/* code view */}
            <div className="min-h-[320px] overflow-x-auto p-4 sm:p-5">
              <pre className="font-code text-[13px] leading-7">
                {/* line 1: export const ... */}
                <div className="flex">
                  <span className="w-8 select-none pr-4 text-right text-edge">1</span>
                  <span>
                    <span className="text-cp-purple">export const</span>{' '}
                    <span className="text-cp-blue">{file.varName}</span>{' '}
                    <span className="text-muted">=</span>{' '}
                    <span className="text-cp-yellow">[</span>
                  </span>
                </div>
                {file.items.map((item, i) => (
                  <div key={item} className="flex">
                    <span className="w-8 select-none pr-4 text-right text-edge">{i + 2}</span>
                    <span>
                      <span className="text-cp-green">"{item}"</span>
                      <span className="text-muted">,</span>
                    </span>
                  </div>
                ))}
                <div className="flex">
                  <span className="w-8 select-none pr-4 text-right text-edge">
                    {file.items.length + 2}
                  </span>
                  <span>
                    <span className="text-cp-yellow">]</span>{' '}
                    <span className="text-cp-purple">as const</span>
                    <span className="text-muted">;</span>
                  </span>
                </div>
              </pre>
            </div>
          </div>
        </div>
      </div>

      {/* scrolling stack banner */}
      <div className="reveal mt-12" style={{ transitionDelay: '120ms' }}>
        <p className="mb-4 flex items-center justify-center gap-2 px-4 text-center font-code text-xs text-muted">
          <InfinityIcon className="h-3.5 w-3.5 text-cp-green" />
          {t.skills.marqueeLabel}
        </p>
        <div className="border-y border-edge/60 py-3">
          <MarqueeRow tags={rowA} />
          <MarqueeRow tags={rowB} reverse />
        </div>
      </div>
    </section>
  );
}
