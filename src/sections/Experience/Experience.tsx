import { Briefcase, Trophy, ArrowRight } from 'lucide-react';
import { useTranslation } from '../../i18n';
import { SectionTitle } from '../../components/SectionTitle/SectionTitle';
import { Reveal } from '../../components/Reveal/Reveal';
import { experience } from '../../data/experience';

export function Experience() {
    const { language, t } = useTranslation();

    return (
        <section id="experience" className="scroll-mt-20 py-20 sm:py-28 bg-ink-900/30">
            <div className="section-container">
                <Reveal>
                    <SectionTitle
                        eyebrow={t.experience.eyebrow}
                        title={t.experience.title}
                        subtitle={t.experience.subtitle}
                    />
                </Reveal>

                <div className="mt-12 space-y-6">
                    {experience.map((entry, index) => (
                        <Reveal key={entry.id} delay={index * 0.1}>
                            <div className="relative rounded-xl border border-ink-700 bg-ink-900/40 p-6 sm:p-8 overflow-hidden">
                                <div className="absolute left-0 top-0 h-full w-1 bg-ember-500" aria-hidden="true" />

                                <div className="flex flex-col gap-4 sm:flex-row sm:items-start sm:justify-between">
                                    <div className="flex items-start gap-4">
                                        <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-lg border border-ink-700 bg-ink-800/60 text-ember-400">
                                            {entry.type === 'competition' ? (
                                                <Trophy className="h-5 w-5" />
                                            ) : (
                                                <Briefcase className="h-5 w-5" />
                                            )}
                                        </div>
                                        <div>
                                            <h3 className="text-lg font-semibold text-ink-50">
                                                {entry.role[language]}
                                            </h3>
                                            <p className="font-mono text-sm text-ember-400">{entry.company}</p>
                                        </div>
                                    </div>

                                    <div className="flex items-center gap-2 self-start sm:self-auto">
                                        {entry.current && (
                                            <span className="inline-flex items-center gap-1.5 rounded-full border border-ember-700/50 bg-ember-500/10 px-3 py-1 text-xs font-medium text-ember-300">
                                                <span className="h-1.5 w-1.5 rounded-full bg-ember-400" />
                                                {t.experience.current}
                                            </span>
                                        )}
                                        {entry.badge && (
                                            <span className="inline-flex items-center gap-1.5 rounded-full border border-ember-700/50 bg-ember-500/10 px-3 py-1 text-xs font-medium text-ember-300">
                                                <Trophy className="h-3 w-3" />
                                                {entry.badge[language]}
                                            </span>
                                        )}
                                        <span className="font-mono text-xs text-ink-400 whitespace-nowrap">
                                            {entry.period[language]}
                                        </span>
                                    </div>
                                </div>

                                <p className="mt-5 text-ink-300 leading-relaxed">
                                    {entry.description[language]}
                                </p>

                                <ul className="mt-4 space-y-2.5">
                                    {entry.highlights.map((highlight, hIdx) => (
                                        <li key={hIdx} className="flex items-start gap-2.5 text-sm text-ink-300 leading-relaxed">
                                            <ArrowRight className="h-4 w-4 mt-0.5 text-ember-500 shrink-0" />
                                            <span>{highlight[language]}</span>
                                        </li>
                                    ))}
                                </ul>

                                <div className="mt-5 flex flex-wrap gap-2">
                                    {entry.technologies.map((tech) => (
                                        <span
                                            key={tech}
                                            className="rounded bg-ink-800/80 px-2.5 py-1 text-xs font-medium text-ink-200 border border-ink-700/50"
                                        >
                                            {tech}
                                        </span>
                                    ))}
                                </div>
                            </div>
                        </Reveal>
                    ))}

                    <Reveal delay={experience.length * 0.1}>
                        <p className="text-sm text-ink-400">
                            {t.experience.note}
                        </p>
                    </Reveal>
                </div>
            </div>
        </section>
    );
}
