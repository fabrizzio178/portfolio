import { motion } from 'framer-motion';
import { Button } from '../../components/UI/Button';
import { useTranslation } from '../../i18n';
import { Terminal, ArrowRight, FileText } from 'lucide-react';
import profilePhoto from '../../assets/profile/fabrizzio.jpg';

const fadeUp = {
    hidden: { opacity: 0, y: 18 },
    show: (delay: number) => ({
        opacity: 1,
        y: 0,
        transition: { duration: 0.6, delay, ease: [0.22, 1, 0.36, 1] as const },
    }),
};

export function Hero() {
    const { t } = useTranslation();

    const scrollToSection = (id: string) => {
        document.getElementById(id)?.scrollIntoView({ behavior: 'smooth', block: 'start' });
    };

    return (
        <section id="hero" className="relative min-h-[90vh] flex items-center border-b border-ink-800 overflow-hidden">
            <div
                aria-hidden="true"
                className="pointer-events-none absolute -top-40 right-[-10%] h-[520px] w-[520px] rounded-full bg-ember-700/10 blur-[120px]"
            />

            <div className="section-container py-20 sm:py-32 relative">
                <div className="flex flex-col-reverse items-center gap-10 lg:flex-row lg:items-center lg:justify-between lg:gap-12">
                <div className="max-w-3xl">
                    <motion.div
                        variants={fadeUp}
                        initial="hidden"
                        animate="show"
                        custom={0}
                        className="mb-6 inline-flex items-center gap-2 rounded-full border border-ink-700 bg-ink-800/50 px-4 py-2 text-sm text-ink-200"
                    >
                        <Terminal className="h-4 w-4 text-ember-400" />
                        <span>
                            {t.hero.greeting}{' '}
                            <span className="font-semibold text-ink-50">{t.hero.name}</span>
                        </span>
                    </motion.div>

                    <motion.h1
                        variants={fadeUp}
                        initial="hidden"
                        animate="show"
                        custom={0.1}
                        className="text-4xl font-semibold tracking-tight text-ink-50 sm:text-5xl lg:text-6xl"
                    >
                        {t.hero.role}
                    </motion.h1>

                    <motion.p
                        variants={fadeUp}
                        initial="hidden"
                        animate="show"
                        custom={0.2}
                        className="mt-4 text-xl text-ember-400 font-medium sm:text-2xl"
                    >
                        {t.hero.tagline}
                    </motion.p>

                    <motion.p
                        variants={fadeUp}
                        initial="hidden"
                        animate="show"
                        custom={0.3}
                        className="mt-6 text-lg leading-relaxed text-ink-300 max-w-2xl"
                    >
                        {t.hero.description}
                    </motion.p>

                    <motion.p
                        variants={fadeUp}
                        initial="hidden"
                        animate="show"
                        custom={0.35}
                        className="mt-4 flex items-center gap-2 text-sm text-ink-400"
                    >
                        <span className="h-2 w-2 shrink-0 rounded-full bg-ember-500" />
                        {t.hero.current}
                    </motion.p>

                    <motion.div
                        variants={fadeUp}
                        initial="hidden"
                        animate="show"
                        custom={0.4}
                        className="mt-8 flex flex-col gap-4 sm:flex-row"
                    >
                        <Button
                            onClick={() => scrollToSection('projects')}
                            className="gap-2 cursor-pointer w-full justify-center sm:w-auto"
                        >
                            {t.hero.cta.projects}
                            <ArrowRight className="h-4 w-4" />
                        </Button>

                        <Button
                            variant="subtle"
                            onClick={() => scrollToSection('contact')}
                            className="cursor-pointer w-full justify-center sm:w-auto"
                        >
                            {t.hero.cta.contact}
                        </Button>

                        <a
                            href="/cv.pdf"
                            target="_blank"
                            rel="noopener noreferrer"
                            className="hidden sm:flex items-center justify-center gap-2 rounded-lg border border-ink-700 px-6 py-3 text-sm font-semibold text-ink-200 transition-all hover:border-ink-500 hover:text-ink-50 hover:bg-ink-800"
                        >
                            <FileText className="h-4 w-4" />
                            CV
                        </a>

                        <a
                            href="/cv.pdf"
                            download="Fabrizzio_Sana_CV.pdf"
                            target="_blank"
                            rel="noopener noreferrer"
                            className="flex sm:hidden items-center justify-center gap-2 rounded-lg border border-ink-700 px-6 py-3 text-sm font-semibold text-ink-200 transition-all hover:border-ink-500 hover:text-ink-50 hover:bg-ink-800 w-full"
                        >
                            <FileText className="h-4 w-4" />
                            Descargar CV
                        </a>
                    </motion.div>
                </div>

                <motion.div
                    initial={{ opacity: 0, scale: 0.94 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ duration: 0.7, delay: 0.15, ease: [0.22, 1, 0.36, 1] as const }}
                    className="relative shrink-0"
                >
                    <div
                        aria-hidden="true"
                        className="absolute inset-0 -z-10 rounded-2xl bg-ember-500/20 blur-2xl"
                    />
                    <img
                        src={profilePhoto}
                        alt="Fabrizzio Sana"
                        className="h-44 w-44 rounded-2xl border-2 border-ember-700/40 object-cover shadow-2xl sm:h-52 sm:w-52 lg:h-64 lg:w-64"
                        style={{ objectPosition: '50% 78%' }}
                    />
                </motion.div>
                </div>
            </div>
        </section>
    );
}
