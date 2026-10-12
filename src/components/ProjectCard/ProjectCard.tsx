import { Link } from 'react-router-dom';
import { ArrowUpRight, Bot, Container, GitBranch } from 'lucide-react';
import { useTranslation } from '../../i18n';
import type { Project } from '../../data/projects';

interface ProjectCardProps {
    project: Project;
    // Wide layout for the lead project: image beside the text on desktop.
    featured?: boolean;
}

const backendTech = ['Java', 'Spring Boot', 'Node.js', 'Express', 'PostgreSQL', 'Docker', 'AWS', 'Keycloak', 'API Gateway'];

export function ProjectCard({ project, featured = false }: ProjectCardProps) {
    const { language, t } = useTranslation();

    const title = project.title[language];
    const description = project.shortDescription[language];

    const hasDocker = project.technologies.some(tech => tech.toLowerCase().includes('docker'));
    const hasCICD = project.technologies.some(tech =>
        tech.toLowerCase().includes('jenkins') ||
        tech.toLowerCase().includes('ci/cd') ||
        tech.toLowerCase().includes('github actions')
    );

    const hasAI = project.technologies.some(tech =>
        ['langgraph', 'langchain', 'llm', 'mcp'].some(keyword => tech.toLowerCase().includes(keyword))
    );

    const arcImage =
        typeof project.arcImage === 'string' ? project.arcImage : project.arcImage?.[language];
    const cover = project.images?.[0] ?? arcImage;
    const visibleTech = featured ? 6 : 4;

    const sortedTech = [...project.technologies].sort((a, b) => {
        const aIsBackend = backendTech.some(bt => a.toLowerCase().includes(bt.toLowerCase()));
        const bIsBackend = backendTech.some(bt => b.toLowerCase().includes(bt.toLowerCase()));
        if (aIsBackend && !bIsBackend) return -1;
        if (!aIsBackend && bIsBackend) return 1;
        return 0;
    });

    return (
        <Link
            to={`/project/${project.id}`}
            className={`group flex h-full flex-col rounded-xl border border-ink-700 bg-ink-900/40 p-6 transition-all duration-300 hover:border-ember-700/50 hover:bg-ink-800/50 hover:-translate-y-0.5 ${featured ? 'md:flex-row md:gap-8' : ''}`}
        >
            {cover && (
                <div className={`mb-4 overflow-hidden rounded-lg bg-ink-950 ${featured ? 'md:mb-0 md:w-1/2 md:shrink-0' : ''}`}>
                    <img
                        src={cover}
                        alt={title}
                        loading="lazy"
                        decoding="async"
                        className={`h-40 w-full object-cover object-top transition-transform duration-300 group-hover:scale-105 ${featured ? 'md:h-64' : ''}`}
                    />
                </div>
            )}

            <div className="flex flex-1 flex-col">
            <div className="flex items-start justify-between gap-4">
                <h3 className="text-lg font-semibold text-ink-50 group-hover:text-ember-400 transition-colors">
                    {title}
                </h3>
                <ArrowUpRight className="h-5 w-5 text-ink-500 shrink-0 transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5 group-hover:text-ember-400" />
            </div>

            <p className={`mt-2 text-sm text-ink-300 leading-relaxed line-clamp-2 ${featured ? 'md:line-clamp-4' : ''}`}>
                {description}
            </p>

            <div className="mt-4 flex flex-wrap gap-2">
                {sortedTech.slice(0, visibleTech).map((tech) => (
                    <span
                        key={tech}
                        className="rounded bg-ink-800/70 px-2 py-1 text-xs font-medium text-ink-200"
                    >
                        {tech}
                    </span>
                ))}
                {project.technologies.length > visibleTech && (
                    <span className="rounded bg-ink-800/70 px-2 py-1 text-xs text-ink-400">
                        +{project.technologies.length - visibleTech}
                    </span>
                )}
            </div>

            {(hasAI || hasDocker || hasCICD) && (
                <div className="mt-4 flex items-center gap-3 text-xs text-ink-400">
                    {hasAI && (
                        <span className="flex items-center gap-1 text-ember-400">
                            <Bot className="h-3 w-3" />
                            {t.projects.aiBadge}
                        </span>
                    )}
                    {hasDocker && (
                        <span className="flex items-center gap-1">
                            <Container className="h-3 w-3" />
                            Docker
                        </span>
                    )}
                    {hasCICD && (
                        <span className="flex items-center gap-1">
                            <GitBranch className="h-3 w-3" />
                            CI/CD
                        </span>
                    )}
                </div>
            )}

            <div className="mt-auto pt-4">
                <span className="text-sm font-medium text-ember-400 group-hover:underline">
                    {t.projects.viewProject} →
                </span>
            </div>
            </div>
        </Link>
    );
}
