type SectionTitleProps = {
    eyebrow?: string;
    title: string;
    subtitle?: string;
    align?: 'left' | 'center';
};

export function SectionTitle({ eyebrow, title, subtitle, align = 'left' }: SectionTitleProps) {
    const alignment = align === 'center' ? 'items-center text-center' : 'items-start text-left';

    return (
        <div className={`flex flex-col gap-4 ${alignment}`}>
            {eyebrow && (
                <span className="font-mono text-xs font-medium uppercase tracking-[0.2em] text-ember-400">
                    {eyebrow}
                </span>
            )}
            <h2 className="text-3xl font-semibold text-ink-50 sm:text-4xl">{title}</h2>
            {subtitle && (
                <p className="max-w-2xl text-lg text-ink-300">{subtitle}</p>
            )}
        </div>
    );
}
