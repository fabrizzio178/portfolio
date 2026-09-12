import { useTranslation } from '../../i18n';
import { SectionTitle } from '../../components/SectionTitle/SectionTitle';
import { Reveal } from '../../components/Reveal/Reveal';

const aiAutomation = [
    { name: 'LangChain', icon: '🔗' },
    { name: 'LangGraph', icon: '🕸️' },
    { name: 'Deep Agents', icon: '🤖' },
    { name: 'Harness Engineering', icon: '🦾'}
];

const primaryStack = [
    { name: 'Python', icon: '🐍' },
    { name: 'NestJS', icon: '🐈' },
    { name: 'TypeScript', icon: 'TS' },
    { name: 'Node.js', icon: '⬢' },
    { name: 'React', icon: '⚛️' },
];

const infrastructure = [
    { name: 'AWS', icon: '☁️' },
    { name: 'Azure', icon: '🔷' },
    { name: 'Docker & Compose', icon: '🐳' },
    { name: 'GitHub Actions', icon: '⚙️' },
    { name: 'Linux / Bash', icon: '🐧' },
];

const architecture = [
    { name: 'Microservices', icon: '🧩' },
    { name: 'Event-Driven Architecture', icon: '📡' },
    { name: 'API Gateway', icon: '🚪' },
    { name: 'Distributed Systems', icon: '🌐' },
    { name: 'JUnit 5 & Mockito', icon: '🧪' },
    { name: 'OpenAPI / Swagger', icon: '📜' },
    { name: 'Git Flow', icon: '🔀' },
];

function TechBadge({ name, icon }: { name: string; icon: string }) {
    return (
        <div className="flex items-center gap-2 rounded-md bg-ink-800/70 px-3 py-2 text-sm font-medium text-ink-100 transition-colors hover:bg-ink-700/80 border border-ink-700/50">
            <span className="text-base">{icon}</span>
            <span>{name}</span>
        </div>
    );
}

interface TechGroupProps {
    title: string;
    items: typeof primaryStack;
    accent: string;
    borderAccent: string;
}

function TechGroup({ title, items, accent, borderAccent }: TechGroupProps) {
    return (
        <div className={`h-full rounded-2xl border border-ink-800 bg-ink-900/30 p-6 transition-all duration-300 ${borderAccent}`}>
            <h3 className={`mb-6 font-mono text-xs font-bold uppercase tracking-wider ${accent}`}>
                {title}
            </h3>
            <div className="flex flex-wrap gap-3">
                {items.map((tech) => (
                    <TechBadge key={tech.name} name={tech.name} icon={tech.icon} />
                ))}
            </div>
        </div>
    );
}

export function TechStack() {
    const { t } = useTranslation();

    return (
        <section id="stack" className="scroll-mt-20 py-20 sm:py-28 bg-ink-900/30">
            <div className="section-container">
                <Reveal>
                    <SectionTitle
                        eyebrow={t.stack.eyebrow}
                        title={t.stack.title}
                        subtitle={t.stack.subtitle}
                    />
                </Reveal>

                <div className="mt-12 grid gap-6 grid-cols-1 lg:grid-cols-2">
                    <Reveal delay={0}>
                        <TechGroup
                            title={t.stack.ai}
                            items={aiAutomation}
                            accent="text-ember-500"
                            borderAccent="hover:border-ember-700/50"
                        />
                    </Reveal>

                    <Reveal delay={0.1}>
                        <TechGroup
                            title={t.stack.primary}
                            items={primaryStack}
                            accent="text-ember-400"
                            borderAccent="hover:border-ember-700/40"
                        />
                    </Reveal>

                    <Reveal delay={0.2}>
                        <TechGroup
                            title={t.stack.infrastructure}
                            items={infrastructure}
                            accent="text-ink-200"
                            borderAccent="hover:border-ink-500/50"
                        />
                    </Reveal>

                    <Reveal delay={0.3}>
                        <TechGroup
                            title={t.stack.familiar}
                            items={architecture}
                            accent="text-ember-300"
                            borderAccent="hover:border-ember-700/40"
                        />
                    </Reveal>
                </div>
            </div>
        </section>
    );
}
