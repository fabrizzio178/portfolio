import { useParams, useNavigate } from 'react-router-dom';
import { ArrowLeft, Github, ExternalLink, Cpu, PlayCircle, FileText, X, ZoomIn, ZoomOut } from 'lucide-react';
import { projects } from '../data/projects';
import { useEffect, useState, useRef } from 'react';
import { Button } from '../components/UI/Button';

const getEmbedUrl = (url: string) => {
  const regExp = /^.*(youtu.be\/|v\/|u\/\w\/|embed\/|watch\?v=|&v=)([^#&?]*).*/;
  const match = url.match(regExp);
  return (match && match[2].length === 11) 
    ? `https://www.youtube.com/embed/${match[2]}` 
    : null;
};

export default function ProjectDetails() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [isLightboxOpen, setIsLightboxOpen] = useState(false);
  const [isZoomed, setIsZoomed] = useState(false);
  const [mousePos, setMousePos] = useState({ x: 0, y: 0 });
  const imgRef = useRef<HTMLImageElement>(null);
  
  const project = projects.find((p) => p.id === id);

  useEffect(() => {
    // Esto asegura que AL ENTRAR al proyecto vayas arriba.
    // Al volver ATRAS, el navegador se encarga de restaurar la posición.
    window.scrollTo(0, 0);
  }, []);

  useEffect(() => {
    if (isLightboxOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'unset';
      setIsZoomed(false);
    }
    return () => { document.body.style.overflow = 'unset'; };
  }, [isLightboxOpen]);

  const handleMouseMove = (e: React.MouseEvent) => {
    if (!isZoomed) return;
    const { left, top, width, height } = e.currentTarget.getBoundingClientRect();
    const x = ((e.clientX - left) / width) * 100;
    const y = ((e.clientY - top) / height) * 100;
    setMousePos({ x, y });
  };

  // --- CORRECCIÓN CLAVE AQUÍ ---
  const handleGoBack = () => {
    // Verificamos si hay historial en el navegador (state.idx > 0 indica que no es la primera página)
    if (window.history.state && window.history.state.idx > 0) {
      navigate(-1); // Esto vuelve atrás Y recupera el scroll exacto
    } else {
      // Si no hay historial (ej: abriste el link directo), vamos al home manualmente
      navigate('/', { replace: true }); 
    }
  };

  if (!project) {
    return (
      <div className="flex h-screen flex-col items-center justify-center gap-4 text-slate-400">
        <p className="text-lg">Proyecto no encontrado.</p>
        <button onClick={() => navigate('/')} className="text-indigo-400 underline hover:text-indigo-300">Volver al inicio</button>
      </div>
    );
  }

  const embedUrl = project.demoUrl ? getEmbedUrl(project.demoUrl) : null;

  let labelContent = null;
  if (embedUrl) {
    labelContent = (
      <>
        <PlayCircle className="h-3 w-3 text-red-500 fill-current" />
        Video Demo
      </>
    );
  } else if (project.demoLabel) {
    labelContent = (
      <>
        <FileText className="h-3 w-3 text-indigo-400" />
        {project.demoLabel}
      </>
    );
  }

  return (
    <article className="min-h-screen pb-24 animate-in fade-in duration-500">
      
      {/* --- LIGHTBOX MODAL --- */}
      {isLightboxOpen && project.image && (
        <div 
          className="fixed inset-0 z-[100] flex items-center justify-center bg-black/95 backdrop-blur-sm transition-opacity duration-300 overflow-hidden"
          onClick={() => setIsLightboxOpen(false)}
        >
          <div className="absolute top-6 right-6 z-50 flex gap-3">
             <button 
              type="button"
              className="rounded-full bg-white/10 p-2 text-white hover:bg-white/20 transition-colors"
              onClick={(e) => { e.stopPropagation(); setIsZoomed(!isZoomed); }}
              title={isZoomed ? "Alejar" : "Acercar"}
            >
              {isZoomed ? <ZoomOut size={24} /> : <ZoomIn size={24} />}
            </button>

            <button 
              type="button"
              className="rounded-full bg-white/10 p-2 text-white hover:bg-white/20 transition-colors"
              onClick={() => setIsLightboxOpen(false)}
              title="Cerrar"
            >
              <X size={24} />
            </button>
          </div>
          
          <div 
            className={`relative w-full h-full flex items-center justify-center transition-all duration-300 ${isZoomed ? 'cursor-zoom-out' : 'cursor-zoom-in'}`}
            onMouseMove={handleMouseMove}
            onClick={(e) => { e.stopPropagation(); setIsZoomed(!isZoomed); }}
          >
             <img 
                ref={imgRef}
                src={project.image} 
                alt={project.title} 
                className="max-h-[90vh] max-w-[90vw] object-contain shadow-2xl transition-transform duration-200 ease-out"
                style={{
                    transform: isZoomed ? 'scale(2.5)' : 'scale(1)',
                    transformOrigin: isZoomed ? `${mousePos.x}% ${mousePos.y}%` : 'center center'
                }}
             />
          </div>
        </div>
      )}

      {/* --- BARRA DE NAVEGACIÓN FLOTANTE --- */}
      {/* Subí el z-index a z-50 para asegurar que sea clickeable siempre */}
      <div className="sticky top-0 z-50 w-full border-b border-white/5 bg-slate-950/80 backdrop-blur-md">
          <div className="mx-auto max-w-4xl px-6 h-16 flex items-center">
            <button 
              type="button"
              onClick={handleGoBack}
              className="group inline-flex items-center text-sm font-medium text-slate-400 transition-colors hover:text-indigo-400 cursor-pointer select-none"
            >
              <div className="mr-2 rounded-full border border-slate-800 bg-slate-900 p-1.5 transition-colors group-hover:border-indigo-500/50 group-hover:bg-indigo-500/10">
                <ArrowLeft className="h-4 w-4" />
              </div>
              Volver al portfolio
            </button>
          </div>
      </div>

      <div className="mx-auto max-w-4xl px-6 pt-12"> 
        
        {/* Header del Proyecto */}
        <header className="mb-10">
          <div className="mb-4 flex flex-wrap items-center gap-3">
            <span className="rounded-full border border-indigo-500/30 bg-indigo-500/10 px-2.5 py-0.5 text-[11px] font-semibold uppercase tracking-wider text-indigo-300 shadow-[0_0_10px_rgba(99,102,241,0.2)]">
              Case Study
            </span>
            <span className="text-slate-600">•</span>
            <span className="text-sm font-medium text-slate-400">{project.technologies[0]}</span>
          </div>
          
          <h1 className="text-3xl font-bold tracking-tight text-white sm:text-4xl lg:text-5xl leading-tight text-glow">
            {project.title}
          </h1>
          
          <p className="mt-4 max-w-2xl text-base leading-relaxed text-slate-300 sm:text-lg">
            {project.shortDescription}
          </p>

          <div className="mt-6 flex flex-wrap gap-3">
            {project.githubUrl && (
              <Button href={project.githubUrl} target="_blank" rel="noreferrer" className="h-9 px-4 text-xs sm:text-sm gap-2">
                <Github className="h-3.5 w-3.5" /> Ver Repositorio
              </Button>
            )}
            {project.demoUrl && !embedUrl && (
              <Button variant="subtle" href={project.demoUrl} target="_blank" rel="noreferrer" className="h-9 px-4 text-xs sm:text-sm gap-2">
                <ExternalLink className="h-3.5 w-3.5" /> Ver Demo
              </Button>
            )}
          </div>
        </header>

        {/* --- VISUAL PRINCIPAL --- */}
        <div className="relative mb-16 overflow-hidden rounded-2xl border border-slate-800 bg-slate-950 shadow-xl shadow-black/40 group">
            
            {labelContent && (
                <div className="absolute top-4 left-4 z-10 flex items-center gap-2 rounded-full bg-black/70 px-3 py-1 text-[11px] font-medium text-white backdrop-blur-md border border-white/10 shadow-lg pointer-events-none">
                    {labelContent}
                </div>
            )}

            <div className={`w-full bg-slate-900 flex items-center justify-center ${embedUrl ? 'aspect-video' : 'min-h-[400px] py-8'}`}>
               {embedUrl ? (
                 <iframe 
                   src={embedUrl} 
                   title={project.title}
                   className="h-full w-full"
                   allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" 
                   allowFullScreen
                 />
               ) : (
                 project.image ? (
                   <div 
                      className="relative cursor-zoom-in w-full h-full flex items-center justify-center group/img bg-slate-900"
                      onClick={() => setIsLightboxOpen(true)}
                   >
                       <img 
                          src={project.image} 
                          alt={project.title} 
                          className="w-full h-full object-contain p-4 transition-transform duration-300 group-hover/img:scale-[1.01]" 
                       />
                       
                       <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover/img:opacity-100 transition-opacity duration-300 pointer-events-none">
                          <div className="bg-black/60 backdrop-blur-sm p-3 rounded-full text-white shadow-xl border border-white/10">
                             <ZoomIn size={32} />
                          </div>
                       </div>
                   </div>
                 ) : (
                   <div className="flex h-full items-center justify-center text-slate-700 p-10">
                     <span className="text-sm">Sin vista previa disponible</span>
                   </div>
                 )
               )}
            </div>
        </div>

        {/* --- CONTENIDO DETALLADO --- */}
        <div className="grid gap-10 lg:grid-cols-[1.8fr,1fr]">
          
          <div className="space-y-12">
            <section className="space-y-3">
              <h2 className="text-xl font-bold text-white flex items-center gap-2.5">
                <span className="flex h-7 w-7 items-center justify-center rounded-lg bg-rose-500/10 text-rose-400 border border-rose-500/20 shadow-[0_0_10px_rgba(244,63,94,0.1)] text-sm">!</span>
                El Problema
              </h2>
              <div className="rounded-xl border border-slate-800 bg-slate-900/30 p-5 text-sm sm:text-base text-slate-300 leading-relaxed shadow-sm">
                {project.problem}
              </div>
            </section>
            
            <section className="space-y-3">
              <h2 className="text-xl font-bold text-white flex items-center gap-2.5">
                <span className="flex h-7 w-7 items-center justify-center rounded-lg bg-emerald-500/10 text-emerald-400 border border-emerald-500/20 shadow-[0_0_10px_rgba(16,185,129,0.1)] text-sm">✓</span>
                La Solución
              </h2>
              <div className="rounded-xl border border-slate-800 bg-slate-900/30 p-5 text-sm sm:text-base text-slate-300 leading-relaxed shadow-sm">
                {project.solution}
              </div>
            </section>

            <section className="space-y-5">
              <h2 className="text-xl font-bold text-white">Características Principales</h2>
              <div className="grid gap-3 sm:grid-cols-2">
                {project.features.map((feature, idx) => (
                  <div key={idx} className="group rounded-xl border border-slate-800 bg-slate-900/40 p-4 transition-all hover:border-indigo-500/30 hover:bg-slate-900/80">
                    <div className="mb-3 inline-flex rounded-lg bg-indigo-500/10 p-1.5 text-indigo-400 ring-1 ring-inset ring-indigo-500/20 group-hover:text-indigo-300">
                      <feature.icon className="h-4 w-4" />
                    </div>
                    <h3 className="mb-1 text-sm font-semibold text-slate-100">{feature.title}</h3>
                    <p className="text-xs sm:text-sm text-slate-400 leading-relaxed">{feature.desc}</p>
                  </div>
                ))}
              </div>
            </section>
          </div>

          <aside className="space-y-6">
            <div className="rounded-2xl border border-slate-800 bg-slate-900/50 p-5 backdrop-blur-sm sticky top-24">
              <h3 className="mb-4 flex items-center gap-2 text-xs font-semibold uppercase tracking-wider text-slate-400">
                <Cpu className="h-3.5 w-3.5" /> Tecnologías
              </h3>
              <div className="flex flex-wrap gap-1.5">
                {project.technologies.map((tech) => (
                  <span 
                    key={tech} 
                    className="inline-flex items-center rounded-md border border-slate-700 bg-slate-800/50 px-2.5 py-1 text-xs font-medium text-slate-300 transition-colors hover:border-indigo-500/30 hover:bg-indigo-500/5 hover:text-indigo-300 cursor-default"
                  >
                    {tech}
                  </span>
                ))}
              </div>
              
              <div className="mt-6 pt-6 border-t border-slate-800">
                  <h3 className="mb-1.5 font-semibold text-white text-sm">¿Te interesa un perfil así?</h3>
                  <p className="mb-4 text-xs text-slate-400 leading-relaxed">
                    Estoy disponible para nuevos proyectos y colaboraciones. ¡Hablemos!
                  </p>
                  <a href="mailto:fabrizziosana10@gmail.com" className="block w-full rounded-lg bg-white py-2 text-center text-xs sm:text-sm font-bold text-slate-950 transition-transform hover:scale-[1.02] active:scale-[0.98]">
                    Contactar ahora
                  </a>
              </div>
            </div>
          </aside>

        </div>
      </div>
    </article>
  );
}