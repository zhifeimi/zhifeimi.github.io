interface SectionHeadingProps {
  comment: string;
  title: string;
  sub?: string;
  align?: 'left' | 'center';
}

export function SectionHeading({ comment, title, sub, align = 'center' }: SectionHeadingProps) {
  const alignCls = align === 'center' ? 'items-center text-center' : 'items-start text-left';
  return (
    <div className={`reveal mb-12 flex flex-col gap-3 ${alignCls}`}>
      <span className="font-code text-sm text-cp-green">{comment}</span>
      <h2 className="text-3xl font-bold tracking-tight text-text sm:text-4xl">{title}</h2>
      {sub && <p className="max-w-2xl text-base text-muted">{sub}</p>}
    </div>
  );
}
