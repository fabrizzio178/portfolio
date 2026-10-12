import { projects } from '../../data/projects';
import { SectionTitle } from '../../components/SectionTitle/SectionTitle';
import { ProjectCard } from '../../components/ProjectCard/ProjectCard';
import { Reveal } from '../../components/Reveal/Reveal';
import { useTranslation } from '../../i18n';

export function Projects() {
    const { t } = useTranslation();

    return (
        <section id="projects" className="scroll-mt-20 py-20 sm:py-28">
            <div className="section-container">
                <Reveal>
                    <SectionTitle
                        eyebrow={t.projects.eyebrow}
                        title={t.projects.title}
                        subtitle={t.projects.subtitle}
                    />
                </Reveal>

                <div className="mt-12 grid gap-6 md:grid-cols-2">
                    {/* The first project spans the full row, so the rest pair up evenly. */}
                    {projects.map((project, index) => (
                        <Reveal
                            key={project.id}
                            delay={(index % 2) * 0.1}
                            className={index === 0 ? 'h-full md:col-span-2' : 'h-full'}
                        >
                            <ProjectCard project={project} featured={index === 0} />
                        </Reveal>
                    ))}
                </div>
            </div>
        </section>
    );
}
