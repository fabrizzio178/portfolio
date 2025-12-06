import { useEffect, useState } from 'react'
import { useLocation, useNavigate } from 'react-router-dom'

const LINKS = [
    { id: 'hero', label: 'Inicio' },
    { id: 'about', label: 'Sobre mí' },
    { id: 'projects', label: 'Proyectos' },
    { id: 'contact', label: 'Contacto' },
]

export function Navbar() {
    const [isOpen, setIsOpen] = useState(false)
    const [isScrolled, setIsScrolled] = useState(false)
    const location = useLocation()
    const navigate = useNavigate()

    useEffect(() => {
        const onScroll = () => setIsScrolled(window.scrollY > 16)
        onScroll()
        window.addEventListener('scroll', onScroll, { passive: true })
        return () => window.removeEventListener('scroll', onScroll)
    }, [])

    const handleNavigate = (id: string) => {
        if (location.pathname !== '/') {
            navigate('/', { state: { targetId: id } })
        } else {
            const el = document.getElementById(id)
            if (el) {
                const yOffset = -80;
                const y = el.getBoundingClientRect().top + window.pageYOffset + yOffset;
                window.scrollTo({ top: y, behavior: 'smooth' });
                setIsOpen(false)
            }
        }
    }

    useEffect(() => {
        if (location.pathname === '/' && location.state && (location.state as any).targetId) {
            const targetId = (location.state as any).targetId
            // Pequeño timeout para asegurar que el DOM cargó
            setTimeout(() => {
                const el = document.getElementById(targetId)
                if (el) {
                    const yOffset = -80;
                    const y = el.getBoundingClientRect().top + window.pageYOffset + yOffset;
                    window.scrollTo({ top: y, behavior: 'smooth' });
                }
                window.history.replaceState({}, document.title)
            }, 100)
        }
    }, [location])

    return (
        <header
            className={`fixed top-0 left-0 right-0 z-50 border-b border-transparent transition-all duration-300 ${
                isScrolled ? 'border-slate-800/60 bg-slate-950/80 backdrop-blur-md shadow-lg shadow-black/20' : 'bg-transparent'
            }`}
        >
            <nav className="mx-auto flex w-full max-w-6xl items-center justify-between px-4 py-4 sm:px-6 lg:px-8">
                <button
                    className="text-lg font-bold tracking-tight text-slate-100 hover:text-indigo-400 transition-colors"
                    onClick={() => handleNavigate('hero')}
                >
                    fabrizzio.dev
                </button>

                <div className="hidden items-center gap-1 rounded-full bg-white/5 p-1 px-2 backdrop-blur-sm md:flex border border-white/5">
                    {LINKS.map((link) => (
                        <button
                            key={link.id}
                            onClick={() => handleNavigate(link.id)}
                            className="rounded-full px-4 py-1.5 text-sm font-medium text-slate-300 transition-all hover:bg-white/10 hover:text-white"
                        >
                            {link.label}
                        </button>
                    ))}
                </div>

                <button
                    className="flex h-10 w-10 items-center justify-center rounded-full border border-slate-800 text-slate-50 md:hidden bg-slate-900/50"
                    onClick={() => setIsOpen((prev) => !prev)}
                    aria-label="Abrir navegación"
                >
                    <svg className="h-5 w-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
                        {isOpen ? (
                            <path d="M6 18L18 6M6 6l12 12" strokeLinecap="round" strokeLinejoin="round" />
                        ) : (
                            <path d="M4 6h16M4 12h16M4 18h16" strokeLinecap="round" strokeLinejoin="round" />
                        )}
                    </svg>
                </button>
            </nav>

            {isOpen && (
                <div className="absolute top-full left-0 w-full border-b border-slate-800 bg-slate-950/95 px-4 py-4 backdrop-blur-xl md:hidden">
                    <div className="flex flex-col gap-2">
                        {LINKS.map((link) => (
                            <button
                                key={link.id}
                                onClick={() => handleNavigate(link.id)}
                                className="block w-full rounded-lg p-3 text-left text-slate-300 hover:bg-slate-800 hover:text-white transition-colors"
                            >
                                {link.label}
                            </button>
                        ))}
                    </div>
                </div>
            )}
        </header>
    )
}