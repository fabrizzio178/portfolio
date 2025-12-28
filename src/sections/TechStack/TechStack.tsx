import { useTranslation } from '../../i18n';
import { SectionTitle } from '../../components/SectionTitle/SectionTitle';

const primaryStack = [
    { name: 'Java 21', icon: '☕' },
    { name: 'Spring Boot', icon: '🍃' },
    { name: 'Node.js', icon: '⬢' },
    { name: 'Express', icon: '⚡' },
    { name: 'TypeScript', icon: 'TS' },
    { name: 'PostgreSQL', icon: '🐘' },
    { name: 'Redis', icon: '🔴' }
];

const infrastructure = [
    { name: 'AWS', icon: '☁️' },
    { name: 'Docker & Compose', icon: '🐳' },
    { name: 'GitHub Actions', icon: '⚙️' },
    { name: 'Linux / Bash', icon: '🐧' }
];

const toolsAndQuality = [
    { name: 'Postman / Curl', icon: '🚀' }, 
    { name: 'Git Flow', icon: '🔀' },
    { name: 'React', icon: '⚛️' }, 
    { name: 'JUnit 5 & Mockito', icon: '🧪' },
    { name: 'OpenAPI / Swagger', icon: '📜' },
    { name: 'MCP Server', icon: '🖥️' },
    { name: 'Scrum', icon: '🏉' }
];

function TechBadge({ name, icon }: { name: string; icon: string }) {
    return (
        <div className="flex items-center gap-2 rounded-md bg-slate-800/80 px-3 py-2 text-sm font-medium text-slate-200 transition-colors hover:bg-slate-700 border border-slate-700/50">
            <span className="text-base">{icon}</span>
            <span>{name}</span>
        </div>
    );
}

// Modificado para recibir clases de color y bordes
interface TechGroupProps {
    title: string;
    items: typeof primaryStack;
    accent: string;       // Color del texto del título
    borderAccent: string; // Color del borde al hacer hover
}

function TechGroup({ title, items, accent, borderAccent }: TechGroupProps) {
    return (
        // h-full asegura que todas las tarjetas tengan la misma altura
        <div className={`h-full rounded-2xl border border-slate-800 bg-slate-900/20 p-6 transition-all duration-300 hover:border-opacity-100 ${borderAccent}`}>
            <h3 className={`mb-6 text-xs font-bold uppercase tracking-wider ${accent}`}>
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
        // AQUI ESTA EL FONDO QUE QUERIAS MANTENER (bg-slate-950/50)
        <section id="stack" className="scroll-mt-20 py-20 sm:py-28 bg-slate-950/50">
            <div className="section-container">
                <SectionTitle
                    eyebrow={t.stack.eyebrow}
                    title={t.stack.title}
                    subtitle={t.stack.subtitle}
                />

                {/* Grid Layout: Transforma la lista vertical en tarjetas lado a lado */}
                <div className="mt-12 grid gap-6 grid-cols-1 md:grid-cols-2 lg:grid-cols-3">
                    <TechGroup
                        title={t.stack.primary}
                        items={primaryStack}
                        accent="text-blue-400"
                        borderAccent="hover:border-blue-500/30"
                    />
                    
                    <TechGroup
                        title={t.stack.infrastructure}
                        items={infrastructure}
                        accent="text-emerald-400"
                        borderAccent="hover:border-emerald-500/30"
                    />
                    
                    <TechGroup
                        title={t.stack.familiar}
                        items={toolsAndQuality}
                        accent="text-violet-400" // debe ser violeta
                        borderAccent="hover:border-violet-500/30"
                    />
                </div>
            </div>
        </section>
    );
}