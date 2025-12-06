import { SectionTitle } from '../../components/SectionTitle/SectionTitle'
import { 
  Puzzle, 
  ServerCog, 
  Users, 
  ShieldCheck, 
  FileText,
  Lightbulb,
  Zap
} from 'lucide-react';

const collaborationPoints = [
  { icon: Puzzle, text: "Propongo alternativas de diseño de sistemas y microservicios." },
  { icon: ServerCog, text: "Creo backends robustos priorizando el rendimiento." },
  { icon: Users, text: "Trabajo en equipo con metodologías ágiles." },
  { icon: ShieldCheck, text: "Implemento Unit-Tests para asegurar calidad." },
  { icon: FileText, text: "Mantengo documentación clara con Swagger." }
];

export function About() {
    return (
        // CAMBIOS DE ALINEACIÓN:
        // 1. pt-0 en mobile: Quitamos el padding top para que suba y se pegue al Hero.
        // 2. sm:pt-12: En desktop le damos un respiro normal.
        // 3. pb-16: Padding bottom estándar.
        // 4. -mt-4: Truco visual para subirlo un poquito más y "morder" el espacio del Hero si hace falta.
        <section id="about" className="scroll-mt-20 relative pt-4 pb-16 sm:pt-16 sm:pb-24">
            
            <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8"> {/* Contenedor idéntico al Hero */}
                
                <div className="mb-8 sm:mb-12">
                    <SectionTitle
                        eyebrow="Perfil Profesional"
                        title="Ingeniería y diseño"
                        subtitle="Construyo infraestructuras mantenibles que resuelvan problemas reales."
                    />
                </div>

                <div className="grid gap-6 lg:grid-cols-2 lg:gap-12">
                    
                    {/* Tarjeta 1: Enfoque */}
                    <div className="group h-full rounded-2xl border border-slate-800 bg-slate-900/40 p-6 backdrop-blur-sm transition-all hover:border-indigo-500/20 hover:bg-slate-900/60">
                        <div className="mb-4 flex items-center gap-3">
                            <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-indigo-500/10 text-indigo-400 ring-1 ring-inset ring-indigo-500/20">
                                <Lightbulb className="h-5 w-5" />
                            </div>
                            <h3 className="text-lg font-bold text-white">Mi Enfoque</h3>
                        </div>
                        
                        <div className="space-y-4 text-sm leading-relaxed text-slate-300">
                            <p>
                                Busco entender el contexto completo para comprender lo que necesita el cliente. 
                                Defino arquitecturas <strong className="text-indigo-300 font-medium">reusables</strong> y patrones de diseño para garantizar mantenibilidad.
                            </p>
                            <p>
                                Disfruto entornos dinámicos donde calidad y velocidad van de la mano.
                            </p>
                        </div>
                    </div>

                    {/* Tarjeta 2: Cómo colaboro */}
                    <div className="group h-full rounded-2xl border border-slate-800 bg-slate-900/40 p-6 backdrop-blur-sm transition-all hover:border-emerald-500/20 hover:bg-slate-900/60">
                        <div className="mb-4 flex items-center gap-3">
                            <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-emerald-500/10 text-emerald-400 ring-1 ring-inset ring-emerald-500/20">
                                <Zap className="h-5 w-5" />
                            </div>
                            <h3 className="text-lg font-bold text-white">Cómo colaboro</h3>
                        </div>

                        <ul className="space-y-3">
                            {collaborationPoints.map((point, index) => (
                                <li key={index} className="flex items-start gap-3">
                                    <div className="mt-0.5 flex-shrink-0 rounded-full bg-slate-800 p-1 text-emerald-400 group-hover:bg-emerald-500/10 transition-colors">
                                        <point.icon className="h-3.5 w-3.5" />
                                    </div>
                                    <span className="text-sm text-slate-300 leading-relaxed">
                                        {point.text}
                                    </span>
                                </li>
                            ))}
                        </ul>
                    </div>

                </div>
            </div>
        </section>
    );
}