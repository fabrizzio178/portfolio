import { Button } from '../../components/UI/Button';
import { useTranslation } from '../../i18n';
import { Terminal, ArrowRight, FileText } from 'lucide-react'; 

export function Hero() {
    const { t } = useTranslation();

    const handleScrollToProjects = () => {
        document.getElementById('projects')?.scrollIntoView({ behavior: 'smooth', block: 'start' });
    };

    return (
        <section id="hero" className="relative min-h-[90vh] flex items-center border-b border-slate-800">
            <div className="section-container py-20 sm:py-32">
                <div className="max-w-3xl">
                    <div className="mb-6 inline-flex items-center gap-2 rounded-full border border-slate-700 bg-slate-800/50 px-4 py-2 text-sm text-slate-300">
                        <Terminal className="h-4 w-4 text-blue-400" />
                        <span>{t.hero.greeting}</span>
                        <span className="font-semibold text-slate-100">{t.hero.name}</span>
                    </div>

                    <h1 className="text-4xl font-bold tracking-tight text-slate-50 sm:text-5xl lg:text-6xl">
                        {t.hero.role}
                    </h1>

                    <p className="mt-4 text-xl text-blue-400 font-medium sm:text-2xl">
                        {t.hero.tagline}
                    </p>

                    <p className="mt-6 text-lg leading-relaxed text-slate-400 max-w-2xl">
                        {t.hero.description}
                    </p>

                    <div className="mt-8 flex flex-col gap-4 sm:flex-row">
                        <Button 
                            onClick={handleScrollToProjects} 
                            className="gap-2 cursor-pointer w-full justify-center sm:w-auto"
                        >
                            {t.hero.cta.projects}
                            <ArrowRight className="h-4 w-4" />
                        </Button>
                        
                        <Button 
                            variant="subtle" 
                            href="#contact"
                            className="w-full justify-center sm:w-auto"
                        >
                            {t.hero.cta.contact}
                        </Button>

                        <a 
                            href="/cv.pdf" 
                            target="_blank" 
                            rel="noopener noreferrer"
                            className="hidden sm:flex items-center justify-center gap-2 rounded-lg border border-slate-700 px-6 py-3 text-sm font-semibold text-slate-300 transition-all hover:border-slate-500 hover:text-white hover:bg-slate-800"
                        >
                            <FileText className="h-4 w-4" />
                            CV
                        </a>

                        <a 
                            href="/cv.pdf" 
                            download="Fabrizzio_Sana_CV.pdf"
                            target="_blank" 
                            rel="noopener noreferrer"
                            className="flex sm:hidden items-center justify-center gap-2 rounded-lg border border-slate-700 px-6 py-3 text-sm font-semibold text-slate-300 transition-all hover:border-slate-500 hover:text-white hover:bg-slate-800 w-full"
                        >
                            <FileText className="h-4 w-4" />
                            Descargar CV
                        </a>
                    </div>

                    <div className="mt-12 flex flex-wrap items-center gap-4 text-sm text-slate-500 sm:gap-6">
                        <div className="flex items-center gap-2">
                            <span className="h-2 w-2 rounded-full bg-emerald-500"></span>
                            <span>Java / Spring Boot</span>
                        </div>
                        <div className="flex items-center gap-2">
                            <span className="h-2 w-2 rounded-full bg-emerald-500"></span>
                            <span>Node.js</span>
                        </div>
                        <div className="flex items-center gap-2">
                            <span className="h-2 w-2 rounded-full bg-emerald-500"></span>
                            <span>AWS / Docker</span>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
}