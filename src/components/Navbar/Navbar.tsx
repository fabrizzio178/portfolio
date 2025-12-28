import { useEffect, useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { useTranslation } from '../../i18n';
import { Globe, FileText } from 'lucide-react';

export function Navbar() {
    const [isOpen, setIsOpen] = useState(false);
    const [isScrolled, setIsScrolled] = useState(false);
    const location = useLocation();
    const navigate = useNavigate();
    const { language, setLanguage, t } = useTranslation();

    const LINKS = [
        { id: 'hero', label: t.nav.home },
        { id: 'stack', label: t.nav.stack },
        { id: 'about', label: t.nav.about },
        { id: 'projects', label: t.nav.projects },
        { id: 'contact', label: t.nav.contact },
    ];

    useEffect(() => {
        const onScroll = () => setIsScrolled(window.scrollY > 16);
        onScroll();
        window.addEventListener('scroll', onScroll, { passive: true });
        return () => window.removeEventListener('scroll', onScroll);
    }, []);

    const handleNavigate = (id: string) => {
        if (location.pathname !== '/') {
            navigate('/', { state: { targetId: id } });
        } else {
            const el = document.getElementById(id);
            if (el) {
                const yOffset = -80;
                const y = el.getBoundingClientRect().top + window.pageYOffset + yOffset;
                window.scrollTo({ top: y, behavior: 'smooth' });
                setIsOpen(false);
            }
        }
    };

    useEffect(() => {
        if (location.pathname === '/' && location.state && (location.state as any).targetId) {
            const targetId = (location.state as any).targetId;
            window.history.replaceState({}, document.title);
            
            setTimeout(() => {
                const el = document.getElementById(targetId);
                if (el) {
                    const yOffset = -80;
                    const y = el.getBoundingClientRect().top + window.pageYOffset + yOffset;
                    window.scrollTo({ top: y, behavior: 'smooth' });
                }
            }, 100);
        }
    }, [location]);

    const toggleLanguage = () => {
        setLanguage(language === 'es' ? 'en' : 'es');
    };

    return (
        <header
            className={`fixed top-0 left-0 right-0 z-50 border-b transition-all duration-300 ${
                isScrolled
                    ? 'border-slate-800 bg-slate-900/95 backdrop-blur-sm'
                    : 'border-transparent bg-transparent'
            }`}
        >
            <nav className="section-container flex items-center justify-between py-4">
                <button
                    className="text-lg font-bold text-slate-100 hover:text-blue-400 transition-colors"
                    onClick={() => handleNavigate('hero')}
                >
                    fabrizzio.dev
                </button>

                {/* DESKTOP MENU */}
                <div className="hidden items-center gap-1 md:flex">
                    {LINKS.map((link) => (
                        <button
                            key={link.id}
                            onClick={() => handleNavigate(link.id)}
                            className="rounded-md px-3 py-2 text-sm text-slate-400 transition-colors hover:text-slate-100 hover:bg-slate-800"
                        >
                            {link.label}
                        </button>
                    ))}
                    
                    <a
                        href="/cv.pdf"
                        target="_blank"
                        rel="noopener noreferrer"
                        className="ml-2 flex items-center gap-1.5 rounded-md border border-slate-700 bg-slate-800 px-3 py-1.5 text-sm text-slate-300 hover:border-slate-500 hover:text-white transition-colors"
                    >
                        <FileText className="h-4 w-4" />
                        CV
                    </a>

                    <button
                        onClick={toggleLanguage}
                        className="ml-2 flex cursor-pointer items-center gap-1.5 rounded-md border border-slate-700 bg-slate-800 px-3 py-1.5 text-sm text-slate-300 hover:border-slate-600 hover:text-slate-100 transition-colors"
                        aria-label="Toggle language"
                    >
                        <Globe className="h-4 w-4" />
                        {language.toUpperCase()}
                    </button>
                </div>

                <div className="flex items-center gap-2 md:hidden">
                    <button
                        onClick={toggleLanguage}
                        className="flex items-center gap-1 rounded-md border border-slate-700 bg-slate-800 px-2 py-1.5 text-sm text-slate-300"
                    >
                        <Globe className="h-4 w-4" />
                        {language.toUpperCase()}
                    </button>
                    <button
                        className="flex h-10 w-10 items-center justify-center rounded-md border border-slate-700 bg-slate-800 text-slate-100"
                        onClick={() => setIsOpen((prev) => !prev)}
                        aria-label="Toggle navigation"
                    >
                        <svg className="h-5 w-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
                            {isOpen ? (
                                <path d="M6 18L18 6M6 6l12 12" strokeLinecap="round" strokeLinejoin="round" />
                            ) : (
                                <path d="M4 6h16M4 12h16M4 18h16" strokeLinecap="round" strokeLinejoin="round" />
                            )}
                        </svg>
                    </button>
                </div>
            </nav>

            {isOpen && (
                <div className="border-t border-slate-800 bg-slate-900 px-4 py-4 md:hidden">
                    <div className="flex flex-col gap-1">
                        {LINKS.map((link) => (
                            <button
                                key={link.id}
                                onClick={() => handleNavigate(link.id)}
                                className="rounded-md p-3 text-left text-slate-300 hover:bg-slate-800 hover:text-slate-100 transition-colors"
                            >
                                {link.label}
                            </button>
                        ))}
                        <a
                            href="/cv.pdf"
                            download="Fabrizzio_Sana_CV.pdf"
                            target="_blank"
                            rel="noopener noreferrer"
                            className="rounded-md p-3 text-left text-slate-300 hover:bg-slate-800 hover:text-slate-100 transition-colors flex items-center gap-2"
                        >
                            <FileText className="h-4 w-4" />
                            Descargar CV
                        </a>
                    </div>
                </div>
            )}
        </header>
    );
}