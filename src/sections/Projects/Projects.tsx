import { projects } from '../../data/projects'
import { SectionTitle } from '../../components/SectionTitle/SectionTitle'
import { ProjectCard } from '../../components/ProjectCard/ProjectCard'

export function Projects() {
    return (
        // AJUSTE AQUÍ: pt-8 sm:pt-12 (sube el inicio)
        <section id="projects" className="scroll-mt-20 relative pt-8 pb-12 sm:pt-0 sm:pb-20">
            
            <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
                
                <div className="mb-8 sm:mb-12">
                    <SectionTitle
                        eyebrow="Proyectos destacados"
                        title="Aplicaciones enfocadas en producto"
                        subtitle="Selección de trabajos que muestran cómo abordo problemáticas comunes con soluciones ingenieriles."
                    />
                </div>

                <div className="grid gap-6 lg:gap-8 md:grid-cols-2">
                    {projects.map((project) => (
                        <ProjectCard key={project.id} project={project} />
                    ))}
                </div>
                
            </div>
        </section>
    )
}