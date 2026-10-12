import { useTranslation } from '../../i18n';
import { SectionTitle } from '../../components/SectionTitle/SectionTitle';
import { Reveal } from '../../components/Reveal/Reveal';

const aiAutomation = [
    'LangChain',
    'LangGraph',
    'Deep Agents',
    'MCP (Model Context Protocol)',
    'LLM Evals',
    'Harness Engineering',
    'Claude',
    'GitHub Copilot',
];

const primaryStack = [
    'Python',
    'NestJS',
    'TypeScript',
    'Node.js',
    'Java / Spring Boot',
    'PostgreSQL',
    'React',
];

const infrastructure = [
    'AWS',
    'Azure',
    'Docker & Compose',
    'GitHub Actions',
    'Linux / Bash',
];

const architecture = [
    'Microservices',
    'Event-Driven Architecture',
    'Hexagonal Architecture',
    'Spec-Driven Development',
    'Distributed Systems',
    'API Gateway',
    'OpenAPI / Swagger',
    'Git Flow',
];

function TechBadge({ name }: { name: string }) {
    return (
        <div className="rounded-md border border-ink-700/50 bg-ink-800/70 px-3 py-2 font-mono text-[13px] text-ink-100 transition-colors hover:bg-ink-700/80">
            {name}
        </div>
    );
}

interface TechGroupProps {
    title: string;
    items: string[];
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
                    <TechBadge key={tech} name={tech} />
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
