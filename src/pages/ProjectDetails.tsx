import { useParams, useNavigate } from 'react-router-dom';
import { ArrowLeft, Github, ExternalLink, PlayCircle, X, ChevronLeft, ChevronRight, Globe, FileText, Lock } from 'lucide-react';
import { projects } from '../data/projects';
import { useEffect, useState } from 'react';
import { Button } from '../components/UI/Button';
import { useTranslation } from '../i18n';

const getEmbedUrl = (url: string) => {
    const regExp = /^.*(youtu.be\/|v\/|u\/\w\/|embed\/|watch\?v=|&v=)([^#&?]*).*/;
    const match = url.match(regExp);
    return match && match[2].length === 11
        ? `https://www.youtube.com/embed/${match[2]}`
        : null;
};

export default function ProjectDetails() {
    const { id } = useParams();
    const navigate = useNavigate();
    const { language, setLanguage, t } = useTranslation();

    const [lightboxOpen, setLightboxOpen] = useState(false);
    const [lightboxIndex, setLightboxIndex] = useState(0);
    const [activeSlide, setActiveSlide] = useState(0);

    const project = projects.find((p) => p.id === id);

    useEffect(() => {
        window.scrollTo(0, 0);
    }, []);

    useEffect(() => {
        if (!project) return;
        const previousTitle = document.title;
        document.title = `${project.title[language]} | Fabrizzio Sana`;
        return () => {
            document.title = previousTitle;
        };
    }, [project, language]);

    useEffect(() => {
        if (lightboxOpen) {
            document.body.style.overflow = 'hidden';
        } else {
            document.body.style.overflow = 'unset';
        }
        return () => {
            document.body.style.overflow = 'unset';
        };
    }, [lightboxOpen]);

    const handleGoBack = () => {
        navigate('/', { replace: true, state: { targetId: 'projects' } });
    };

    const toggleLanguage = () => {
        setLanguage(language === 'es' ? 'en' : 'es');
    };

    const arcImage =
        typeof project?.arcImage === 'string' ? project.arcImage : project?.arcImage?.[language];

    const allMedia = [
        ...(project?.images ? project.images.map(url => ({ type: 'image' as const, url })) : []),
        ...(arcImage ? [{ type: 'image' as const, url: arcImage, isArchitecture: true }] : []),
        ...(project?.media || []),
    ];

    const nextLightbox = () => {
        setLightboxIndex((prev) => (prev + 1) % allMedia.length);
    };

    const prevLightbox = () => {
        setLightboxIndex((prev) => (prev - 1 + allMedia.length) % allMedia.length);
    };

    useEffect(() => {
        if (!lightboxOpen) return;

        const handleKeyDown = (e: KeyboardEvent) => {
            if (e.key === 'Escape') setLightboxOpen(false);
            const count = allMedia.length;
            if (e.key === 'ArrowRight') setLightboxIndex((prev) => (prev + 1) % count);
            if (e.key === 'ArrowLeft') setLightboxIndex((prev) => (prev - 1 + count) % count);
        };

        window.addEventListener('keydown', handleKeyDown);
        return () => window.removeEventListener('keydown', handleKeyDown);
    }, [lightboxOpen, allMedia.length]);

    if (!project) {
        return (
            <div className="flex h-screen flex-col items-center justify-center gap-4 text-ink-300">
                <p className="text-lg">{t.projectDetail.notFound}</p>
                <button
                    onClick={() => navigate('/')}
                    className="text-ember-400 underline hover:text-ember-300"
                >
                    {t.projectDetail.goBack}
                </button>
            </div>
        );
    }

    const title = project.title[language];
    const shortDescription = project.shortDescription[language];
    const problem = project.problem[language];
    const solution = project.solution[language];
    const demoLabel = project.demoLabel?.[language];

    const embedUrl = project.demoUrl ? getEmbedUrl(project.demoUrl) : null;

    const openLightbox = (index: number) => {
        setLightboxIndex(index);
        setLightboxOpen(true);
    };

    const nextSlide = (e: React.MouseEvent) => {
        e.stopPropagation();
        setActiveSlide((prev) => (prev + 1) % allMedia.length);
    };

    const prevSlide = (e: React.MouseEvent) => {
        e.stopPropagation();
        setActiveSlide((prev) => (prev - 1 + allMedia.length) % allMedia.length);
    };

    return (
        <article className="min-h-screen pb-24 bg-ink-950">
            {lightboxOpen && allMedia[lightboxIndex] && (
                <div
                    className="fixed inset-0 z-[100] flex items-center justify-center bg-black/95"
                    onClick={() => setLightboxOpen(false)}
                >
                    <button
                        className="absolute top-6 right-6 rounded-full bg-ink-800 p-2 text-white hover:bg-ink-700"
                        onClick={() => setLightboxOpen(false)}
                        aria-label="Close"
                    >
                        <X className="h-6 w-6" />
                    </button>

                    {allMedia.length > 1 && (
                        <>
                            <button
                                className="absolute left-6 rounded-full bg-ink-800 p-2 text-white hover:bg-ink-700"
                                onClick={(e) => {
                                    e.stopPropagation();
                                    prevLightbox();
                                }}
                                aria-label="Previous image"
                            >
                                <ChevronLeft className="h-6 w-6" />
                            </button>
                            <button
                                className="absolute right-6 rounded-full bg-ink-800 p-2 text-white hover:bg-ink-700"
                                onClick={(e) => {
                                    e.stopPropagation();
                                    nextLightbox();
                                }}
                                aria-label="Next image"
                            >
                                <ChevronRight className="h-6 w-6" />
                            </button>
                        </>
                    )}

                    <img
                        src={allMedia[lightboxIndex].url}
                        alt={title}
                        className="max-h-[90vh] max-w-[90vw] object-contain"
                        onClick={(e) => e.stopPropagation()}
                    />
                </div>
            )}

            <div className="sticky top-0 z-50 border-b border-ink-800 bg-ink-950/95 backdrop-blur-sm">
                <div className="section-container flex h-16 items-center justify-between">
                    <button
                        onClick={handleGoBack}
                        className="inline-flex items-center gap-2 text-sm text-ink-300 hover:text-ink-100 transition-colors"
                    >
                        <ArrowLeft className="h-4 w-4" />
                        {t.projectDetail.backToProjects}
                    </button>

                    <div className="flex items-center gap-2">
                        <a
                            href="/cv.pdf"
                            target="_blank"
                            rel="noopener noreferrer"
                            className="hidden sm:flex items-center gap-1.5 rounded-md border border-ink-700 bg-ink-800/60 px-3 py-1.5 text-sm text-ink-200 hover:border-ink-500 hover:text-ink-50 transition-colors"
                        >
                            <FileText className="h-4 w-4" />
                            CV
                        </a>

                        <a
                            href="/cv.pdf"
                            download="Fabrizzio_Sana_CV.pdf"
                            target="_blank"
                            rel="noopener noreferrer"
                            className="flex sm:hidden items-center gap-1.5 rounded-md border border-ink-700 bg-ink-800/60 px-3 py-1.5 text-sm text-ink-200 hover:border-ink-500 hover:text-ink-50 transition-colors"
                        >
                            <FileText className="h-4 w-4" />
                            CV
                        </a>

                        <button
                            onClick={toggleLanguage}
                            className="flex items-center gap-1.5 rounded-md border border-ink-700 bg-ink-800/60 px-3 py-1.5 text-sm text-ink-200 hover:border-ink-500 hover:text-ink-50 transition-colors"
                        >
                            <Globe className="h-4 w-4" />
                            {language.toUpperCase()}
                        </button>
                    </div>
                </div>
            </div>

            <div className="section-container pt-12">
                <header className="mb-12">
                    <div className="mb-4 flex flex-wrap items-center gap-3 text-sm">
                        <span className="rounded-full bg-ember-500/10 px-3 py-1 text-ember-400 font-medium font-mono">
                            Case Study
                        </span>
                        <span className="text-ink-600">•</span>
                        <span className="text-ink-400">{project.technologies[0]}</span>
                    </div>

                    <h1 className="text-3xl font-semibold text-ink-50 sm:text-4xl lg:text-5xl">
                        {title}
                    </h1>

                    <p className="mt-4 text-lg text-ink-300 max-w-3xl">
                        {shortDescription}
                    </p>

                    <div className="mt-6 flex flex-wrap gap-3">
                        {project.githubUrl && (
                            <Button
                                href={project.githubUrl}
                                target="_blank"
                                rel="noreferrer"
                                className="gap-2"
                            >
                                <Github className="h-4 w-4" />
                                {t.projectDetail.viewCode}
                            </Button>
                        )}
                        {project.demoUrl && !embedUrl && (
                            <Button
                                variant="subtle"
                                href={project.demoUrl}
                                target="_blank"
                                rel="noreferrer"
                                className="gap-2"
                            >
                                <ExternalLink className="h-4 w-4" />
                                {t.projectDetail.viewDemo}
                            </Button>
                        )}
                    </div>
                </header>

                {/* A project with only a diagram shows it once, in the architecture section. */}
                {(embedUrl || (project.images?.length ?? 0) > 0) && (
                    <div className="mb-16 overflow-hidden rounded-xl border border-ink-700 bg-ink-900">
                        {embedUrl ? (
                            <div className="relative">
                                <div className="absolute top-4 left-4 z-10 flex items-center gap-2 rounded-full bg-black/70 px-3 py-1 text-xs text-white">
                                    <PlayCircle className="h-3 w-3 text-ember-400" />
                                    Video Demo
                                </div>
                                <div className="aspect-video">
                                    <iframe
                                        src={embedUrl}
                                        title={title}
                                        className="h-full w-full"
                                        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                                        allowFullScreen
                                    />
                                </div>
                            </div>
                        ) : (
                            <div className="relative group bg-ink-950 flex items-center justify-center">
                                <div
                                    className="h-[400px] sm:h-[500px] w-full flex items-center justify-center cursor-pointer p-4"
                                    onClick={() => openLightbox(activeSlide)}
                                >
                                    {demoLabel && (
                                        <div className="absolute top-4 left-4 z-10 rounded-full bg-black/70 px-3 py-1 text-xs text-white">
                                            {demoLabel}
                                        </div>
                                    )}
                                    <img
                                        src={allMedia[activeSlide].url}
                                        alt={title}
                                        className="h-full w-full object-contain"
                                    />
                                </div>

                                {allMedia.length > 1 && (
                                    <>
                                        <button
                                            onClick={prevSlide}
                                            className="absolute left-4 top-1/2 -translate-y-1/2 rounded-full bg-black/50 p-2 text-white opacity-0 group-hover:opacity-100 transition-opacity hover:bg-black/70"
                                            aria-label="Previous"
                                        >
                                            <ChevronLeft className="h-6 w-6" />
                                        </button>
                                        <button
                                            onClick={nextSlide}
                                            className="absolute right-4 top-1/2 -translate-y-1/2 rounded-full bg-black/50 p-2 text-white opacity-0 group-hover:opacity-100 transition-opacity hover:bg-black/70"
                                            aria-label="Next"
                                        >
                                            <ChevronRight className="h-6 w-6" />
                                        </button>

                                        <div className="absolute bottom-4 left-1/2 flex -translate-x-1/2 gap-2">
                                            {allMedia.map((_, idx) => (
                                                <div
                                                    key={idx}
                                                    className={`h-1.5 w-1.5 rounded-full transition-colors ${idx === activeSlide ? 'bg-white' : 'bg-white/30'}`}
                                                />
                                            ))}
                                        </div>
                                    </>
                                )}
                            </div>
                        )}
                    </div>
                )}

                <div className="grid gap-16 lg:grid-cols-[2fr,1fr]">
                    <div className="space-y-12">
                        {arcImage && (
                            <section>
                                <h2 className="mb-4 text-xl font-semibold text-ink-50">
                                    {t.projectDetail.architecture}
                                </h2>
                                <div
                                    className="cursor-pointer overflow-hidden rounded-xl border border-ink-700 bg-ink-800"
                                    onClick={() => openLightbox(project.images?.length ?? 0)}
                                >
                                    <img
                                        src={arcImage}
                                        alt="Architecture diagram"
                                        className="w-full"
                                    />
                                </div>
                            </section>
                        )}

                        <section>
                            <h2 className="mb-4 text-xl font-semibold text-ink-50 flex items-center gap-2">
                                <span className="flex h-6 w-6 items-center justify-center rounded bg-rose-500/10 text-rose-400 text-sm">
                                    !
                                </span>
                                {t.projectDetail.problem}
                            </h2>
                            <div className="whitespace-pre-line rounded-xl border border-ink-700 bg-ink-900/50 p-6 text-ink-300 leading-relaxed">
                                {problem}
                            </div>
                        </section>

                        <section>
                            <h2 className="mb-4 text-xl font-semibold text-ink-50 flex items-center gap-2">
                                <span className="flex h-6 w-6 items-center justify-center rounded bg-ember-500/10 text-ember-400 text-sm">
                                    ✓
                                </span>
                                {t.projectDetail.solution}
                            </h2>
                            <div className="whitespace-pre-line rounded-xl border border-ink-700 bg-ink-900/50 p-6 text-ink-300 leading-relaxed">
                                {solution}
                            </div>
                        </section>

                        <section>
                            <h2 className="mb-6 text-xl font-semibold text-ink-50">
                                {t.projectDetail.features}
                            </h2>
                            <div className="grid gap-4 sm:grid-cols-2">
                                {project.features.map((feature, idx) => (
                                    <div
                                        key={idx}
                                        className="rounded-xl border border-ink-700 bg-ink-900/30 p-4"
                                    >
                                        <div className="mb-2 inline-flex rounded bg-ember-500/10 p-1.5 text-ember-400">
                                            <feature.icon className="h-4 w-4" />
                                        </div>
                                        <h3 className="mb-1 font-medium text-ink-100">
                                            {feature.title[language]}
                                        </h3>
                                        <p className="text-sm text-ink-400">
                                            {feature.desc[language]}
                                        </p>
                                    </div>
                                ))}
                            </div>
                        </section>

                        {allMedia.length > 1 && (
                            <section>
                                <h2 className="mb-4 text-xl font-semibold text-ink-50">
                                    {t.projectDetail.gallery}
                                </h2>
                                <div className="grid grid-cols-2 gap-4 sm:grid-cols-3">
                                    {allMedia.map((media, idx) => (
                                        <div
                                            key={idx}
                                            className="cursor-pointer overflow-hidden rounded-xl border border-ink-700 bg-ink-800 transition-transform hover:scale-[1.02]"
                                            onClick={() => openLightbox(idx)}
                                        >
                                            <img
                                                src={media.url}
                                                alt={`${title} ${idx + 1}`}
                                                loading="lazy"
                                                decoding="async"
                                                className="h-32 w-full object-cover"
                                            />
                                        </div>
                                    ))}
                                </div>
                            </section>
                        )}
                    </div>

                    <aside className="space-y-6">
                        <div className="sticky top-24 rounded-xl border border-ink-700 bg-ink-900/50 p-6">
                            <h3 className="mb-4 text-sm font-semibold uppercase tracking-wider text-ink-400">
                                {t.projectDetail.techStack}
                            </h3>
                            <div className="flex flex-wrap gap-2">
                                {project.technologies.map((tech) => (
                                    <span
                                        key={tech}
                                        className="rounded bg-ink-800/70 px-2.5 py-1 text-sm text-ink-200"
                                    >
                                        {tech}
                                    </span>
                                ))}
                            </div>

                            {(project.githubUrl || project.demoUrl || project.privateRepo) && (
                                <div className="mt-6 pt-6 border-t border-ink-700">
                                    <h3 className="mb-3 text-sm font-semibold uppercase tracking-wider text-ink-400">
                                        {t.projectDetail.links}
                                    </h3>
                                    <div className="space-y-2">
                                        {project.privateRepo && (
                                            <p className="flex items-center gap-2 text-sm text-ink-400">
                                                <Lock className="h-4 w-4" />
                                                {t.projectDetail.privateRepo}
                                            </p>
                                        )}
                                        {project.githubUrl && (
                                            <a
                                                href={project.githubUrl}
                                                target="_blank"
                                                rel="noreferrer"
                                                className="flex items-center gap-2 text-sm text-ink-200 hover:text-ember-400 transition-colors"
                                            >
                                                <Github className="h-4 w-4" />
                                                GitHub
                                            </a>
                                        )}
                                        {project.demoUrl && (
                                            <a
                                                href={project.demoUrl}
                                                target="_blank"
                                                rel="noreferrer"
                                                className="flex items-center gap-2 text-sm text-ink-200 hover:text-ember-400 transition-colors"
                                            >
                                                <ExternalLink className="h-4 w-4" />
                                                Demo
                                            </a>
                                        )}
                                    </div>
                                </div>
                            )}

                            <div className="mt-6 pt-6 border-t border-ink-700">
                                <p className="mb-4 text-sm text-ink-400">
                                    {t.contact.availability}
                                </p>
                                <Button
                                    onClick={() => navigate('/', { state: { targetId: 'contact' } })}
                                    className="w-full justify-center"
                                >
                                    {t.hero.cta.contact}
                                </Button>
                            </div>
                        </div>
                    </aside>
                </div>
            </div>
        </article>
    );
}
