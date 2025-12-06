type SectionTitleProps = {
	eyebrow?: string
	title: string
	subtitle?: string
	align?: 'left' | 'center'
}

export function SectionTitle({ eyebrow, title, subtitle, align = 'left' }: SectionTitleProps) {
	const alignment = align === 'center' ? 'items-center text-center' : 'items-start text-left'

	return (
		<div className={`flex flex-col gap-3 ${alignment}`}>
			{eyebrow && (
				<span className="text-xs font-semibold uppercase tracking-[0.3em] text-slate-400">
					{eyebrow}
				</span>
			)}
			<h2 className="text-3xl font-semibold tracking-tight text-slate-50 sm:text-4xl">{title}</h2>
			{subtitle && <p className="text-base text-slate-400 sm:max-w-2xl">{subtitle}</p>}
		</div>
	)
}
