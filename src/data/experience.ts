type LocalizedString = {
  en: string;
  es: string;
};

export type ExperienceEntry = {
  id: string;
  company: string;
  role: LocalizedString;
  period: LocalizedString;
  current: boolean;
  type: 'work' | 'competition';
  badge?: LocalizedString;
  description: LocalizedString;
  highlights: LocalizedString[];
  technologies: string[];
};

export const experience: ExperienceEntry[] = [
  {
    id: 'naranjax',
    company: 'NaranjaX',
    role: {
      en: 'AI Automation Intern',
      es: 'AI Automation Intern',
    },
    period: {
      en: 'Jun 2026 — Present',
      es: 'Jun 2026 — Presente',
    },
    current: true,
    type: 'work',
    description: {
      en: 'My first professional role, focused on backend automation and applied AI.',
      es: 'Mi primer trabajo profesional, enfocado en automatización backend e IA aplicada.',
    },
    highlights: [
      {
        en: 'Build automation systems with Python and NestJS, deployed mainly on AWS with some Azure.',
        es: 'Construyo sistemas de automatización con Python y NestJS, desplegados principalmente en AWS y en parte en Azure.',
      },
      {
        en: 'Work hands-on with Deep Agents and LangGraph-based agentic workflows.',
        es: 'Trabajo con Deep Agents y workflows de agentes basados en LangGraph.',
      },
      {
        en: 'Automated a document-intake pipeline handling ~20,000 documents/month — previously uploaded by hand, now flowing directly through the app.',
        es: 'Automaticé un pipeline de carga de documentos de ~20.000 documentos mensuales — antes se cargaban a mano, ahora fluyen directamente por areas internas.',
      },
    ],
    technologies: ['Python', 'NestJS', 'AWS', 'Azure', 'LangChain', 'LangGraph', 'Deep Agents'],
  },
  {
    id: 'boardbite-hackathon',
    company: 'Hackathon UTN-FRC — BoardBite (Córdoba, Argentina)',
    role: {
      en: 'Backend Developer & AI Integrations',
      es: 'Desarrollador Backend & Integraciones IA',
    },
    period: {
      en: 'Apr 2026',
      es: 'Abr 2026',
    },
    current: false,
    type: 'competition',
    badge: {
      en: '2nd Place',
      es: '2° Puesto',
    },
    description: {
      en: 'Led backend development of a SaaS platform built from scratch in a 6-hour sprint, placing 2nd in the competition.',
      es: 'Lideré el desarrollo backend de una plataforma SaaS desde cero en un sprint de 6 horas y obtuve el 2.º puesto en la competencia.',
    },
    highlights: [
      {
        en: 'Integrated LLMs with manual response streaming via SSE for a real-time experience.',
        es: 'Integré LLMs mediante un streaming manual de respuestas con SSE para ofrecer una experiencia en tiempo real.',
      },
      {
        en: 'Deployed the infrastructure on Azure App Service (Node.js/PostgreSQL) and configured Trust Proxy, rate limiting, and guardrails to harden API security and model robustness.',
        es: 'Desplegué la infraestructura en Azure App Service (Node.js/PostgreSQL) y configuré Trust Proxy, rate limiting y guardrails para reforzar la seguridad de la API y la robustez del modelo de IA.',
      },
    ],
    technologies: ['Node.js', 'PostgreSQL', 'Azure App Service', 'SSE', 'LLMs', 'Rate Limiting'],
  },
];
