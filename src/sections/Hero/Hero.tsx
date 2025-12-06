import { Button } from '../../components/UI/Button';
import { 
  Code2, 
  Database, 
  Server, 
  Layout, 
  GitBranch, 
  Container, 
  Box, 
  Cpu,
  ArrowDown
} from 'lucide-react';

const skills = [
    { name: 'React', icon: Layout },
    { name: 'TypeScript', icon: Code2 },
    { name: 'Node.js', icon: Server },
    { name: 'Java', icon: Box },
    { name: 'Spring Boot', icon: Server },
    { name: 'PostgreSQL', icon: Database },
    { name: 'Docker', icon: Container },
    { name: 'Git', icon: GitBranch },
    { name: 'Microservicios', icon: Cpu },
    { name: 'Python', icon: Code2 },
];

export function Hero() {
    const handleScrollToProjects = () => {
        document.getElementById('projects')?.scrollIntoView({ behavior: 'smooth', block: 'start' });
    };

    return (
        <section id="hero" className="border-b border-slate-900/50 relative">
            <div className="mx-auto flex w-full max-w-6xl flex-col gap-8 px-4 pt-20 pb-12 sm:px-6 sm:pt-28 sm:pb-16 lg:flex-row lg:items-start lg:gap-16 lg:px-8">
                
                {/* Texto */}
                <div className="flex-1 space-y-6 animate-in fade-in slide-in-from-bottom-8 duration-700 lg:pt-2">
                    <div className="space-y-4">
                        <p className="inline-flex items-center rounded-full border border-indigo-500/30 bg-indigo-500/10 px-3 py-1 text-[10px] sm:text-[11px] font-semibold uppercase tracking-wider text-indigo-300 shadow-none">
                            Fabrizzio Sana | Estudiante avanzado de ingeniería
                        </p>
                        <h1 className="text-3xl font-bold leading-tight text-white sm:text-4xl lg:text-5xl">
                            Desarrollo soluciones robustas y mantenibles.
                        </h1>
                    </div>
                    
                    <p className="text-base leading-relaxed text-slate-300 max-w-xl text-pretty">
                        Soy un apasionado del desarrollo de software. Me enfoco en cómo la buena ingeniería transforma ideas en productos escalables. 
                        Actualmente finalizando mi tesis de Analista en Sistemas en UTN FRC.
                    </p>

                    <div className="flex flex-wrap gap-3 pt-2">
                        <Button 
                            onClick={handleScrollToProjects} 
                            className="h-10 px-6 text-sm cursor-pointer shadow-none hover:shadow-none hover:translate-y-0"
                        >
                            Ver proyectos
                        </Button>
                        <Button 
                            variant="subtle" 
                            href="#contact" 
                            className="h-10 px-6 text-sm cursor-pointer"
                        >
                            Contacto
                        </Button>
                    </div>
                </div>

                {/* Habilidades */}
                <div className="w-full max-w-[400px] shrink-0 animate-in fade-in slide-in-from-right-8 duration-1000 delay-200 lg:self-start">
                    <div className="rounded-2xl border border-slate-800 bg-slate-900/60 p-5 backdrop-blur-md shadow-xl relative overflow-hidden">
                        
                        <h2 className="mb-4 flex items-center gap-2 text-[10px] font-bold uppercase tracking-[0.2em] text-slate-500">
                            Stack Tecnológico
                        </h2>
                        
                        <div className="grid grid-cols-2 gap-2 relative z-10">
                            {skills.map((skill) => (
                                <div 
                                    key={skill.name} 
                                    className="flex items-center gap-2 rounded-lg border border-slate-800 bg-slate-950/40 px-3 py-2 text-xs font-medium text-slate-300 transition-colors hover:bg-slate-800 hover:text-white cursor-default select-none"
                                >
                                    <div className="rounded bg-indigo-500/10 p-0.5 text-indigo-400">
                                        <skill.icon className="h-3 w-3" />
                                    </div>
                                    {skill.name}
                                </div>
                            ))}
                        </div>
                    </div>
                </div>

            </div>
			
			{/* Flecha hacia abajo */}
            <div className="absolute bottom-2 left-1/2 -translate-x-1/2 animate-bounce text-slate-700 hidden sm:block opacity-50">
                <ArrowDown size={18} />
            </div>
        </section>
    );
}