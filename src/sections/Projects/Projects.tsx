import { projects } from '../../data/projects';
import { SectionTitle } from '../../components/SectionTitle/SectionTitle';
import { ProjectCard } from '../../components/ProjectCard/ProjectCard';
import { useTranslation } from '../../i18n';

export function Projects() {
    const { t } = useTranslation();

    return (
        <section id="projects" className="scroll-mt-20 py-20 sm:py-28 bg-slate-950/50">
            <div className="section-container">
                <SectionTitle
                    eyebrow={t.projects.eyebrow}
                    title={t.projects.title}
                    subtitle={t.projects.subtitle}
                />

                <div className="mt-12 grid gap-6 md:grid-cols-2">
                    {projects.map((project) => (
                        <ProjectCard key={project.id} project={project} />
                    ))}
                </div>
            </div>
        </section>
    );
}