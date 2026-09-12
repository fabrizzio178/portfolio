import { useTranslation } from '../../i18n';
import { SectionTitle } from '../../components/SectionTitle/SectionTitle';
import { Reveal } from '../../components/Reveal/Reveal';
import { CheckCircle2 } from 'lucide-react';

export function About() {
    const { t } = useTranslation();

    return (
        <section id="about" className="scroll-mt-20 py-20 sm:py-28">
            <div className="section-container">
                <Reveal>
                    <SectionTitle
                        eyebrow={t.about.eyebrow}
                        title={t.about.title}
                    />
                </Reveal>

                <div className="mt-12 grid gap-12 lg:grid-cols-[2fr,1fr]">
                    <Reveal delay={0.1} className="space-y-6 text-ink-300 leading-relaxed">
                        <p>{t.about.p1}</p>
                        <p>{t.about.p2}</p>
                        <p>{t.about.p3}</p>
                    </Reveal>

                    <Reveal delay={0.2} className="rounded-xl border border-ink-700 bg-ink-900/40 p-6">
                        <h3 className="mb-4 text-sm font-semibold text-ink-100">
                            {t.about.focus.title}
                        </h3>
                        <ul className="space-y-3">
                            {t.about.focus.items.map((item, index) => (
                                <li key={index} className="flex items-start gap-3 text-sm text-ink-300">
                                    <CheckCircle2 className="h-4 w-4 mt-0.5 text-ember-500 shrink-0" />
                                    <span>{item}</span>
                                </li>
                            ))}
                        </ul>
                    </Reveal>
                </div>
            </div>
        </section>
    );
}
