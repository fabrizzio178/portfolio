import { Link } from 'react-router-dom';
import { FolderGit2 } from 'lucide-react';
import type { Project } from '../../data/projects';

interface ProjectCardProps {
  project: Project;
}

export function ProjectCard({ project }: ProjectCardProps) {
  return (
    <Link 
      to={`/project/${project.id}`}
      className="group relative flex flex-col justify-between overflow-hidden rounded-3xl border border-slate-800 bg-slate-900/40 p-8 transition-all duration-300 hover:-translate-y-1 hover:border-indigo-500/30 hover:bg-slate-900/80 hover:shadow-2xl hover:shadow-indigo-500/10"
    >
      <div>
        <div className="mb-6 flex items-center justify-between">
          <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-indigo-500/10 text-indigo-400 ring-1 ring-inset ring-indigo-500/20 transition-colors group-hover:bg-indigo-500 group-hover:text-white">
            <FolderGit2 size={24} />
          </div>
          <span className="rounded-full border border-slate-700 bg-slate-800/50 px-3 py-1 text-xs font-medium text-slate-400 group-hover:border-indigo-500/30 group-hover:text-indigo-300">
            Ver Detalle
          </span>
        </div>

        <h3 className="mb-3 text-2xl font-bold text-slate-100 transition-colors group-hover:text-indigo-200">
          {project.title}
        </h3>
        
        <p className="mb-8 text-base leading-relaxed text-slate-400 group-hover:text-slate-300">
          {project.shortDescription}
        </p>

        <div className="flex flex-wrap gap-2">
          {project.technologies.slice(0, 3).map((tech) => (
            <span key={tech} className="inline-flex items-center rounded-md bg-slate-800/50 px-2.5 py-1 text-xs font-medium text-slate-400 ring-1 ring-inset ring-slate-700/50">
              {tech}
            </span>
          ))}
          {project.technologies.length > 3 && (
            <span className="inline-flex items-center rounded-md bg-slate-800/50 px-2.5 py-1 text-xs font-medium text-slate-500 ring-1 ring-inset ring-slate-700/50">
              +{project.technologies.length - 3}
            </span>
          )}
        </div>
      </div>
    </Link>
  );
}