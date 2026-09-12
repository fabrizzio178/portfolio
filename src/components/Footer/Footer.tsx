import { useTranslation } from '../../i18n';

const socials = [
    { label: 'GitHub', href: 'https://github.com/fabrizzio178', external: true },
    { label: 'LinkedIn', href: 'https://linkedin.com/in/fabrizzio-sana-54511630b', external: true },
    { label: 'Email', href: 'mailto:fabrizziosana10@gmail.com', external: false },
];

export function Footer() {
    const { t } = useTranslation();

    return (
        <footer className="border-t border-ink-800 bg-ink-950">
            <div className="section-container flex flex-col items-center justify-between gap-4 py-8 text-sm text-ink-400 sm:flex-row">
                <p>© {new Date().getFullYear()} Fabrizzio Sana. {t.footer.rights}</p>
                <div className="flex gap-6">
                    {socials.map((item) => (
                        <a
                            key={item.label}
                            href={item.href}
                            target={item.external ? '_blank' : undefined}
                            rel={item.external ? 'noreferrer' : undefined}
                            className="hover:text-ember-400 transition-colors"
                        >
                            {item.label}
                        </a>
                    ))}
                </div>
            </div>
        </footer>
    );
}
