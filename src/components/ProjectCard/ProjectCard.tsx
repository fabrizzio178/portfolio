import { Link } from 'react-router-dom';
import { ArrowUpRight, Container, GitBranch } from 'lucide-react';
import { useTranslation } from '../../i18n';
import type { Project } from '../../data/projects';

interface ProjectCardProps {
    project: Project;
}

const backendTech = ['Java', 'Spring Boot', 'Node.js', 'Express', 'PostgreSQL', 'Docker', 'AWS', 'Keycloak', 'API Gateway'];

export function ProjectCard({ project }: ProjectCardProps) {
    const { language, t } = useTranslation();

    const title = project.title[language];
    const description = project.shortDescription[language];

    const hasDocker = project.technologies.some(tech => tech.toLowerCase().includes('docker'));
    const hasCICD = project.technologies.some(tech => 
        tech.toLowerCase().includes('jenkins') || 
        tech.toLowerCase().includes('ci/cd') || 
        tech.toLowerCase().includes('github actions')
    );

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
            className="group flex flex-col rounded-lg border border-slate-700 bg-slate-800/30 p-6 transition-all duration-200 hover:border-slate-600 hover:bg-slate-800/50"
        >
            {project.images && (
                <div className="mb-4 overflow-hidden rounded-md bg-slate-900">
                    <img
                        src={project.images[0]}
                        alt={title}
                        className="h-40 w-full object-cover object-top transition-transform duration-300 group-hover:scale-105"
                    />
                </div>
            )}

            <div className="flex items-start justify-between gap-4">
                <h3 className="text-lg font-semibold text-slate-100 group-hover:text-blue-400 transition-colors">
                    {title}
                </h3>
                <ArrowUpRight className="h-5 w-5 text-slate-500 shrink-0 transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5 group-hover:text-blue-400" />
            </div>

            <p className="mt-2 text-sm text-slate-400 leading-relaxed line-clamp-2">
                {description}
            </p>

            <div className="mt-4 flex flex-wrap gap-2">
                {sortedTech.slice(0, 4).map((tech) => (
                    <span
                        key={tech}
                        className="rounded bg-slate-700/50 px-2 py-1 text-xs font-medium text-slate-300"
                    >
                        {tech}
                    </span>
                ))}
                {project.technologies.length > 4 && (
                    <span className="rounded bg-slate-700/50 px-2 py-1 text-xs text-slate-500">
                        +{project.technologies.length - 4}
                    </span>
                )}
            </div>

            {(hasDocker || hasCICD) && (
                <div className="mt-4 flex items-center gap-3 text-xs text-slate-500">
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
                <span className="text-sm font-medium text-blue-400 group-hover:underline">
                    {t.projects.viewProject} →
                </span>
            </div>
        </Link>
    );
}