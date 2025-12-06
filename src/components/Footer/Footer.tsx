const socials = [
	{ label: 'GitHub', href: 'https://github.com/fabrizzio178', external: true },
	{ label: 'LinkedIn', href: 'https://linkedin.com/in/fabrizzio-sana-54511630b', external: true },
	{ label: 'Email', href: 'mailto:fabrizziosana10@gmail.com', external: false },
]

export function Footer() {
	return (
		<footer className="border-t border-slate-900 bg-slate-950">
			<div className="mx-auto flex w-full max-w-6xl flex-col gap-4 px-4 py-8 text-sm text-slate-500 sm:flex-row sm:items-center sm:justify-between sm:px-6 lg:px-8">
				<p>© {new Date().getFullYear()} Fabrizzio Sana.</p>
				<div className="flex flex-wrap gap-4">
					{socials.map((item) => {
						const linkProps = item.external ? { target: '_blank', rel: 'noreferrer' as const } : {}
						return (
							<a
								key={item.label}
								href={item.href}
								className="transition-colors duration-200 hover:text-slate-100"
								{...linkProps}
							>
								{item.label}
							</a>
						)
					})}
				</div>
			</div>
		</footer>
	)
}
