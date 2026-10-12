import {
  Layout,
  Server,
  CreditCard,
  Lock,
  NetworkIcon,
  Workflow,
  UserCheck,
  ShieldCheck,
  FlaskConical,
  MapPin,
} from 'lucide-react';

import tpiImg from "../assets/tpiImg.jpg";
import consolaSer from "../assets/devops/consola-ssh.webp";
import pdfGen from "../assets/devops/pdf-generado.webp";
import contadorReq from "../assets/devops/contador-requests.webp";
import flujo from "../assets/devops/flujo.webp";
import adminPanel from "../assets/picadito/admin-panel.webp";
import mp from "../assets/picadito/mercadopago.webp";
import reservaPicadito from "../assets/picadito/reserva.webp";
import screenPic from "../assets/picadito/screen.webp";
import agentInline from "../assets/pr-agent/01-inline-comment.webp";
import agentPending from "../assets/pr-agent/02-pending-comment.webp";
import agentPausedRun from "../assets/pr-agent/03-paused-run.webp";
import agentApprove from "../assets/pr-agent/04-approve-dialog.webp";
import agentSummary from "../assets/pr-agent/05-review-summary.webp";
import agentInlineRuff from "../assets/pr-agent/06-inline-ruff-and-llm.webp";
import agentArchitectureEs from "../assets/pr-agent/architecture-es.svg";
import agentArchitectureEn from "../assets/pr-agent/architecture-en.svg";
import moodleChat from "../assets/mcp-moodle/chat.webp";
import moodleArchitectureEs from "../assets/mcp-moodle/architecture-es.svg";
import moodleArchitectureEn from "../assets/mcp-moodle/architecture-en.svg";


type LocalizedString = {
  en: string;
  es: string;
};

type MediaItem = {
  type: 'image' | 'video';
  url: string;
  caption?: LocalizedString;
};

type Feature = {
  icon: typeof Server;
  title: LocalizedString;
  desc: LocalizedString;
};

export type Project = {
  id: string;
  title: LocalizedString;
  shortDescription: LocalizedString;
  fullDescription: LocalizedString;
  // Problem and solution may contain blank lines; they render as paragraphs.
  problem: LocalizedString;
  solution: LocalizedString;
  technologies: string[];
  features: Feature[];
  githubUrl?: string;
  // Set when the code exists but cannot be linked.
  privateRepo?: boolean;
  demoUrl?: string;
  images?: string[];
  // A diagram with text in it is provided once per language.
  arcImage?: string | LocalizedString;
  media?: MediaItem[];
  demoLabel?: LocalizedString;
};

export const projects: Project[] = [
  {
    id: 'pr-review-agent',
    title: {
      en: "PR Review Agent - Multi-Agent Code Review with LangGraph",
      es: "PR Review Agent - Revisión de Código Multi-Agente con LangGraph"
    },
    shortDescription: {
      en: "Multi-agent pull request reviewer built with LangGraph: parallel reviewers, structured LLM output and human approval before high-severity findings go public.",
      es: "Revisor de pull requests multi-agente con LangGraph: revisores en paralelo, salida estructurada del LLM y aprobación humana antes de publicar hallazgos graves."
    },
    fullDescription: {
      en: "A LangGraph agent that reviews pull requests as an ephemeral GitHub Actions job. A supervisor routes each diff to the reviewers it needs, findings are ranked by severity, and high-severity results pause the graph until a maintainer approves from the GitHub UI.",
      es: "Un agente LangGraph que revisa pull requests como job efímero de GitHub Actions. Un supervisor enruta cada diff a los revisores que necesita, los hallazgos se ordenan por severidad y los de severidad alta pausan el grafo hasta que un maintainer aprueba desde la UI de GitHub."
    },
    problem: {
      en: "Human reviewers reach a pull request late and spend their attention on mechanical issues: a hardcoded secret, an injectable query, a swallowed exception.\n\nMost \"AI code review\" bots are a single prompt. They cannot tell a documentation change from an authentication change, they publish whatever the model says, and when the model fails they answer \"looks good\".\n\nI wanted a reviewer whose cost and noise are proportional to the change, that never reports a failure as a clean review, and that keeps a human in control of what gets posted when the finding is serious.",
      es: "Los revisores humanos llegan tarde a un pull request y gastan su atención en lo mecánico: un secreto hardcodeado, una consulta inyectable, una excepción silenciada.\n\nLa mayoría de los bots de \"AI code review\" son un único prompt. No distinguen un cambio de documentación de uno de autenticación, publican lo que diga el modelo y, cuando el modelo falla, responden \"todo bien\".\n\nQuería un revisor cuyo costo y ruido fueran proporcionales al cambio, que nunca reportara un fallo como una revisión limpia y que dejara a un humano el control de lo que se publica cuando el hallazgo es grave."
    },
    solution: {
      en: "I built a LangGraph state graph that runs as an ephemeral GitHub Actions job, with no server to host. A supervisor activates only the reviewers the diff needs: a docs-only change calls none, a Dockerfile calls security but not architecture.\n\nThree reviewers run in parallel and write to the same state through a reducer: static analysis with ruff (no LLM), a security agent and a code/architecture agent. The LLM agents return output validated against a schema, so a malformed reply or an exhausted quota is published as an \"incomplete review\" instead of a false \"no issues\".\n\nHigh-severity findings call interrupt(): the PR only sees a \"waiting for approval\" notice, the SQLite checkpoint is saved as an artifact, and a second job, gated by a protected GitHub Environment, resumes the same thread once a maintainer approves. Nothing is re-sent to the model.\n\nThe architecture is hexagonal, so the full graph runs in tests against in-memory ports: 122 tests with no network, including resuming from SQLite in a separate process. An offline eval suite measures recall and false positives per agent; its first run caught all 9 planted defects and exposed an intermittent false positive that led me to tighten the prompt. It ships as a reusable workflow that any repository can call, configured per repo with a .pr-review.yml file.\n\nI built it with Spec-Driven Development: a SPEC stating what and why, a Constitution with the non-negotiable rules and a plan of verifiable tasks, all written before the code.",
      es: "Construí un grafo de estados con LangGraph que corre como job efímero de GitHub Actions, sin servidor que mantener. Un supervisor activa solo los revisores que el diff necesita: un cambio de documentación no llama a ninguno, un Dockerfile llama a seguridad pero no a arquitectura.\n\nTres revisores corren en paralelo y escriben al mismo estado mediante un reducer: análisis estático con ruff (sin LLM), un agente de seguridad y uno de código/arquitectura. Los agentes LLM devuelven salida validada contra un schema, así que una respuesta mal formada o una cuota agotada se publica como \"revisión incompleta\" y no como un falso \"sin problemas\".\n\nLos hallazgos de severidad alta llaman a interrupt(): el PR solo ve un aviso de \"esperando aprobación\", el checkpoint de SQLite se guarda como artifact y un segundo job, protegido por un GitHub Environment, reanuda el mismo thread cuando un maintainer aprueba. No se vuelve a enviar nada al modelo.\n\nLa arquitectura es hexagonal, por eso el grafo completo corre en tests contra puertos en memoria: 122 tests sin red, incluida la reanudación desde SQLite en otro proceso. Una suite de evals offline mide recall y falsos positivos por agente; su primera corrida detectó los 9 defectos plantados y destapó un falso positivo intermitente que me llevó a ajustar el prompt. Se distribuye como workflow reutilizable que cualquier repositorio puede llamar, configurable por repo con un archivo .pr-review.yml.\n\nLo desarrollé con Spec-Driven Development: un SPEC con el qué y el porqué, una Constitution con las reglas innegociables y un plan de tareas verificables, todo escrito antes que el código."
    },
    technologies: [
      'Python',
      'LangGraph',
      'Gemini API',
      'GitHub Actions',
      'Structured Output (Pydantic)',
      'SQLite Checkpointer',
      'Hexagonal Architecture',
      'Spec-Driven Development',
      'GitHub REST API',
      'Ruff',
      'Pytest',
      'LLM Evals',
    ],
    features: [
      {
        icon: Workflow,
        title: { en: "Multi-Agent Orchestration", es: "Orquestación Multi-Agente" },
        desc: { en: "A supervisor fans out to three parallel reviewers, chosen at runtime from what the diff touches.", es: "Un supervisor reparte el trabajo a tres revisores en paralelo, elegidos en runtime según lo que toca el diff." }
      },
      {
        icon: UserCheck,
        title: { en: "Human-in-the-Loop Across Jobs", es: "Human-in-the-Loop entre Jobs" },
        desc: { en: "interrupt() suspends the graph; another CI job resumes it from a SQLite checkpoint after approval.", es: "interrupt() suspende el grafo; otro job de CI lo reanuda desde un checkpoint de SQLite tras la aprobación." }
      },
      {
        icon: ShieldCheck,
        title: { en: "Failures Are Never \"Clean\"", es: "Un Fallo Nunca es \"Limpio\"" },
        desc: { en: "Schema-validated LLM output, prompt-injection defenses, and degraded runs reported as incomplete.", es: "Salida del LLM validada por schema, defensas contra prompt injection y corridas degradadas reportadas como incompletas." }
      },
      {
        icon: FlaskConical,
        title: { en: "Tests and Evals", es: "Tests y Evals" },
        desc: { en: "122 network-free tests over in-memory ports, plus an eval dataset scoring recall and false positives.", es: "122 tests sin red sobre puertos en memoria, más un dataset de evals que mide recall y falsos positivos." }
      }
    ],
    githubUrl: "https://github.com/fabrizzio178/PR-agents-reviewer",
    demoUrl: "https://github.com/fabrizzio178/PR-agents-reviewer/pull/1",
    images: [agentInline, agentPending, agentPausedRun, agentApprove, agentSummary, agentInlineRuff],
    arcImage: { en: agentArchitectureEn, es: agentArchitectureEs },
    demoLabel: { en: "Real PR: agent comments and human approval", es: "PR real: comentarios del agente y aprobación humana" }
  },
  {
    id: 'mcp-moodle',
    title: {
      en: "MCP Moodle - MCP Server for the Virtual Classroom",
      es: "MCP Moodle - Servidor MCP para el Aula Virtual"
    },
    shortDescription: {
      en: "MCP server that connects an AI assistant to Moodle: assignments, deadlines, grades and course content, asked in plain language, plus a daily summary of what changed.",
      es: "Servidor MCP que conecta un asistente de IA con Moodle: tareas, vencimientos, notas y contenido de los cursos, consultados en lenguaje natural, más un resumen diario de lo que cambió."
    },
    fullDescription: {
      en: "A Model Context Protocol server, built with the official SDK, that exposes a university Moodle as 13 tools an AI assistant can call. Read-only by design.",
      es: "Un servidor Model Context Protocol, construido con el SDK oficial, que expone el Moodle de la universidad como 13 tools que un asistente de IA puede llamar. De solo lectura por diseño."
    },
    problem: {
      en: "To find out about a new assignment I had to open the virtual classroom every day and check course by course. It is repetitive and easy to forget, and the information is spread across assignments, the calendar, forums, grades and notifications. The actual statement of an assignment usually lives inside a PDF.\n\nAn AI assistant could answer \"what is due this week?\" in seconds, but it has no way to reach that data. And giving a model access to a university account raises an obvious question: what is it allowed to do there?",
      es: "Para enterarme de una entrega nueva tenía que abrir el aula virtual todos los días y revisar curso por curso. Es una tarea repetitiva y fácil de olvidar, y la información está repartida entre tareas, calendario, foros, notas y notificaciones. El enunciado real de un trabajo práctico suele estar dentro de un PDF.\n\nUn asistente de IA podría responder \"¿qué vence esta semana?\" en segundos, pero no tiene forma de llegar a esos datos. Y darle a un modelo acceso a una cuenta universitaria plantea una pregunta obvia: ¿qué puede hacer ahí adentro?"
    },
    solution: {
      en: "I built an MCP server with the official SDK (FastMCP) that exposes Moodle as 13 tools: pending assignments, submission status, upcoming deadlines, grades with feedback, quizzes and attempts, course content, announcements and unread notifications. It runs locally over stdio and plugs into MCP clients such as Claude Desktop and Claude Code.\n\nThe design is layered: a single MoodleClient is the only code that speaks HTTP with Moodle's REST API, and each tool only orchestrates calls and shapes the result for the model. One tool downloads a course file (PDF or Word) and returns its text, so the assistant reads the full statement and not just the file name.\n\nIt is read-only by design. Automatic assignment submission is deliberately left out for academic integrity. The single write tool, choosing a group or an exam slot, is documented so the model uses it only when the user asks for it explicitly. An allowlist and blocklist in a config file decide which courses are visible at all.\n\nThe server ships no model of its own: the client's model interprets the question and picks the tool, so changing models never touches the server.\n\nI pair it with a scheduled task: every day an agent queries the classroom through the MCP and tells me what changed (new assignments, deadlines, published content). I no longer open the classroom just to check.",
      es: "Construí un servidor MCP con el SDK oficial (FastMCP) que expone Moodle como 13 tools: tareas pendientes, estado de entrega, próximos vencimientos, notas con feedback, cuestionarios e intentos, contenido de los cursos, avisos y notificaciones sin leer. Corre en local por stdio y se conecta a clientes MCP como Claude Desktop y Claude Code.\n\nEl diseño es por capas: un único MoodleClient es el único código que habla HTTP con la API REST de Moodle, y cada tool solo orquesta llamadas y le da forma al resultado para el modelo. Una tool descarga un archivo del curso (PDF o Word) y devuelve su texto, así el asistente lee el enunciado completo y no solo el nombre del archivo.\n\nEs de solo lectura por diseño. La entrega automática de tareas quedó deliberadamente afuera por integridad académica. La única tool de escritura, elegir un grupo o un turno de examen, está documentada para que el modelo la use solo cuando el usuario lo pide explícitamente. Una allowlist y una blocklist en un archivo de configuración deciden qué cursos son visibles.\n\nEl servidor no incluye ningún modelo propio: el modelo del cliente interpreta la pregunta y elige la tool, así que cambiar de modelo nunca toca el servidor.\n\nLo combino con una tarea programada: todos los días un agente consulta el aula a través del MCP y me avisa qué cambió (entregas nuevas, vencimientos, contenido publicado). Ya no entro al aula solo para revisar."
    },
    technologies: [
      'Python',
      'MCP (Model Context Protocol)',
      'FastMCP',
      'Moodle REST API',
      'httpx',
      'pypdf',
      'python-docx',
      'GitHub Actions',
    ],
    features: [
      {
        icon: Workflow,
        title: { en: "13 MCP Tools", es: "13 Tools MCP" },
        desc: { en: "Assignments, deadlines, grades, quizzes, content, forums and notifications, one module per area.", es: "Tareas, vencimientos, notas, cuestionarios, contenido, foros y notificaciones, un módulo por área." }
      },
      {
        icon: ShieldCheck,
        title: { en: "Safe by Design", es: "Seguro por Diseño" },
        desc: { en: "Read-only, no automatic submissions, and one write tool gated on an explicit user request.", es: "Solo lectura, sin entregas automáticas y una única tool de escritura sujeta a un pedido explícito del usuario." }
      },
      {
        icon: Server,
        title: { en: "Layered Architecture", es: "Arquitectura por Capas" },
        desc: { en: "One client owns all HTTP; adding a tool is one method and one decorated function.", es: "Un cliente concentra todo el HTTP; agregar una tool es un método y una función decorada." }
      },
      {
        icon: Layout,
        title: { en: "Reads the Actual Documents", es: "Lee los Documentos Reales" },
        desc: { en: "Extracts text from course PDFs and Word files so the model works from the full statement.", es: "Extrae el texto de los PDF y Word del curso para que el modelo trabaje con el enunciado completo." }
      }
    ],
    privateRepo: true,
    images: [moodleChat],
    arcImage: { en: moodleArchitectureEn, es: moodleArchitectureEs },
    demoLabel: { en: "Claude calling the MCP tools", es: "Claude llamando a las tools del MCP" }
  },
  {
    id: 'picadito',
    title: {
      en: "Picadito - Football Field Booking System",
      es: "Picadito - Sistema de Reservas de Canchas de Fútbol"
    },
    shortDescription: {
      en: "Football field management platform with automated payments.",
      es: "Plataforma de gestión de canchas de fútbol con pagos automatizados."
    },
    fullDescription: {
      en: "Comprehensive system for managing sports complexes. Allows users to book fields in real-time and administrators to manage availability and revenue automatically.",
      es: "Sistema integral para la gestión de complejos deportivos. Permite a los usuarios reservar canchas en tiempo real y a los administradores gestionar la disponibilidad y los ingresos de forma automatizada."
    },
    problem: {
      en: "Have you ever wanted to book a field and had to message three different places? Most sports complexes still manage their slots with a paper agenda and WhatsApp.\n\nFor the player, it's frustrating to wait for the owner to reply about availability. For the owner, it's chaos to manage deposits, cancellations and empty slots by hand while running the snack bar.\n\nAnd without a deposit, players often don't show up, which means lost revenue.",
      es: "¿Alguna vez quisiste reservar una cancha y tuviste que mandar mensajes a tres lugares distintos? La mayoría de los complejos deportivos siguen gestionando sus turnos con agenda de papel y WhatsApp.\n\nPara el jugador, es frustrante esperar a que el dueño conteste si tiene lugar. Para el dueño, es un caos gestionar señas, cancelaciones y huecos libres a mano mientras atiende el buffet.\n\nY sin seña, los jugadores suelen ausentarse, lo que significa ingresos perdidos."
    },
    solution: {
      en: "I created Picadito to remove that friction: the player sees real-time availability, books, and that's it. The owner follows bookings as they come in while taking care of everything else.\n\nI implemented webhooks for automatic payment reconciliation, with no human intervention, and a deposit system that requires paying 10% of the booking up front to reduce no-shows.",
      es: "Creé Picadito para eliminar esa fricción: el jugador ve la disponibilidad en tiempo real, reserva y listo. El dueño sigue las reservas a medida que entran mientras se ocupa de todo lo demás.\n\nImplementé webhooks para la conciliación automática de pagos, sin intervención humana, y un sistema de señas que exige pagar el 10% de la reserva por adelantado para reducir el ausentismo."
    },
    technologies: [
      'Node.js',
      'TypeScript',
      'Express',
      'Sequelize ORM',
      'SQLite',
      'MercadoPago Webhooks',
      'JWT Auth',
      'React',
      'Mantine UI',
    ],
    features: [
      {
        icon: CreditCard,
        title: { en: "Smart Payments", es: "Pagos Inteligentes" },
        desc: { en: "MercadoPago Checkout Pro integration with Webhooks reconciliation.", es: "Integración con MercadoPago Checkout Pro y conciliación vía Webhooks." }
      },
      {
        icon: Server,
        title: { en: "Backend Architecture", es: "Arquitectura Backend" },
        desc: { en: "RESTful API with Node.js, Express, and Sequelize with migrations.", es: "API RESTful con Node.js, Express y Sequelize con migraciones." }
      },
      {
        icon: Lock,
        title: { en: "Security", es: "Seguridad" },
        desc: { en: "Role validation (Admin/Client) and route protection with JWT.", es: "Validación de roles (Admin/Cliente) y protección de rutas con JWT." }
      },
      {
        icon: Layout,
        title: { en: "Modern UX", es: "UX Moderna" },
        desc: { en: "Reactive interface built with Mantine UI and real-time form validation.", es: "Interfaz reactiva construida con Mantine UI y validación de formularios en tiempo real." }
      }
    ],
    githubUrl: "https://github.com/fabrizzio178/Picadito",
    demoUrl: 'https://www.youtube.com/watch?v=5tLhdEfLaFE',
    images: [screenPic, mp, reservaPicadito, adminPanel]
  },
  {
    id: 'devops',
    title: {
      en: "DevOps Project - Hybrid Infrastructure & Resilient On-Premise CI/CD",
      es: "DevOps - Infraestructura Híbrida & CI/CD On-Premise Resiliente"
    },
    shortDescription: {
      en: "CI/CD pipeline for an event-driven Java Spring Boot backend, deployed to a home server without opening a single port.",
      es: "Pipeline CI/CD para un backend Java Spring Boot orientado a eventos, desplegado en un servidor casero sin abrir un solo puerto."
    },
    fullDescription: {
      en: "I developed a continuous integration and deployment (CI/CD) pipeline using GitHub Actions and Docker. It automates the build, test, and deployment of an event-driven backend to an on-premise server.",
      es: "Desarrollé un pipeline de integración y despliegue continuo (CI/CD) con GitHub Actions y Docker. Automatiza la construcción, las pruebas y el despliegue de un backend orientado a eventos en un servidor on-premise."
    },
    problem: {
      en: "The project was an event-driven microservices architecture that had to be deployed on an on-premise machine: my own home server. Every time I pushed something new, I had to connect over SSH and do everything by hand.\n\nSecurity and access: I needed to deploy automatically from GitHub without exposing the server to the internet, meaning no open ports on the router.\n\nNetwork instability: the home connection fragmented packets, causing constant failures (bad_record_mac) while downloading Maven dependencies and Docker layers. Deploying was effectively impossible.",
      es: "El proyecto era una arquitectura de microservicios orientada a eventos que debía desplegarse en una máquina on-premise: mi propio servidor casero. Cada vez que subía algo nuevo, tenía que conectarme por SSH y hacer todo a mano.\n\nSeguridad y acceso: necesitaba desplegar automáticamente desde GitHub sin exponer el servidor a internet, es decir, sin abrir puertos en el router.\n\nInestabilidad de red: la conexión de casa fragmentaba paquetes y provocaba fallos constantes (bad_record_mac) al descargar dependencias de Maven y capas de Docker. Desplegar era, en la práctica, imposible."
    },
    solution: {
      en: "I designed a fault-tolerant CI/CD pipeline and turned the home machine into a proper Ubuntu Server environment.\n\nSecure automation: a GitHub Actions self-hosted runner on the server uses long polling over outbound connections, so it picks up changes from the repository with no inbound ports and no VPN.\n\nNetwork resilience: I diagnosed the packet-transmission failures and fixed them by lowering the Docker network MTU to 1300/1400 bytes, which stopped the fragmentation over Wi-Fi.\n\nTesting and monitoring: the pipeline has a mandatory unit-test stage with JUnit 5, Mockito and AssertJ, and Prometheus with Grafana watch the endpoints after each deploy. I also used them to verify rate limiting.\n\nEvent-driven backbone on AWS: SQS for messaging between microservices, S3 to store the generated PDFs and SES to send emails.",
      es: "Diseñé un pipeline de CI/CD tolerante a fallos y convertí la máquina de casa en un entorno Ubuntu Server en regla.\n\nAutomatización segura: un self-hosted runner de GitHub Actions en el servidor usa long polling sobre conexiones salientes, así recibe los cambios del repositorio sin puertos de entrada ni VPN.\n\nResiliencia de red: diagnostiqué los fallos de transmisión de paquetes y los resolví bajando el MTU de la red Docker a 1300/1400 bytes, lo que eliminó la fragmentación sobre Wi-Fi.\n\nTesting y monitoreo: el pipeline tiene una etapa obligatoria de tests unitarios con JUnit 5, Mockito y AssertJ, y Prometheus con Grafana vigilan los endpoints después de cada despliegue. También los usé para verificar el rate limiting.\n\nColumna orientada a eventos en AWS: SQS para la mensajería entre microservicios, S3 para almacenar los PDF generados y SES para el envío de emails."
    },
    technologies: [
      'Java 21',
      'GitHub Actions',
      'Linux Admin (Ubuntu)',
      'Self-Hosted Runners',
      'AWS (S3, SES, SQS)',
      'Docker Network Tuning',
      'Bash Scripting',
      'Prometheus',
      'Grafana',
      'JUnit 5',
      'Mockito',
      'Maven Optimization'
    ],
    features: [
      {
        icon: Server,
        title: { en: "Complete Automation", es: "Automatización Completa" },
        desc: { en: "Pipeline covering from build to deployment.", es: "Pipeline que cubre desde la construcción hasta el despliegue." }
      },
      {
        icon: Layout,
        title: { en: "Continuous Integration", es: "Integración Continua" },
        desc: { en: "Mandatory unit-test stage before any deploy.", es: "Etapa obligatoria de tests unitarios antes de cualquier despliegue." }
      },
      {
        icon: Lock,
        title: { en: "No Open Ports", es: "Sin Puertos Abiertos" },
        desc: { en: "Self-hosted runner over outbound connections: the server is never exposed to the internet.", es: "Self-hosted runner sobre conexiones salientes: el servidor nunca queda expuesto a internet." }
      },
      {
        icon: NetworkIcon,
        title: { en: "Network Resilience", es: "Resiliencia de Red" },
        desc: { en: "Docker network MTU tuned to stop packet fragmentation.", es: "MTU de la red Docker ajustado para eliminar la fragmentación de paquetes." }
      }
    ],
    githubUrl: 'https://github.com/fabrizzio178/awsTry',
    images: [consolaSer, flujo, pdfGen, contadorReq],
    demoLabel: { en: "SSH | Generated PDF | Grafana Monitoring", es: "SSH | PDF Generado | Monitoreo con Grafana" }
  },
  {
    id: 'tpi-backend',
    title: {
      en: "Transport Microservices Ecosystem",
      es: "Ecosistema de Microservicios de Transporte",
    },
    shortDescription: {
      en: "Microservices backend for managing transport requests in a mobile application. University project.",
      es: "Backend de microservicios para gestionar solicitudes de transporte en una aplicación móvil. Proyecto universitario."
    },
    fullDescription: {
      en: "I developed a set of backend microservices for a mobile application that manages transport requests. The system allows users to create, update, and track their transport requests efficiently.",
      es: "Desarrollé un conjunto de microservicios backend para una aplicación móvil que gestiona solicitudes de transporte. El sistema permite a los usuarios crear, actualizar y rastrear sus solicitudes de transporte de manera eficiente."
    },
    problem: {
      en: "As the integrative project for the Backend Applications course at UTN FRC, we had to design a system able to move many pieces at once without losing order: a microservices backend managing users, transport requests and their states, with an architecture that could grow without breaking.\n\nIt also had to integrate Google Maps' Distance Matrix API to calculate distances and estimated times, secure access through Keycloak with roles and permissions, and route traffic between services through an API Gateway.\n\nEverything had to live in Docker, container by container, for a reproducible and easily deployable environment.",
      es: "Como Trabajo Práctico Integrador de la materia Backend de Aplicaciones en UTN FRC, debíamos diseñar un sistema capaz de mover muchas piezas a la vez sin desordenarse: un backend de microservicios que gestionara usuarios, solicitudes de transporte y sus estados, con una arquitectura que pudiera crecer sin romperse.\n\nAdemás había que integrar la API Distance Matrix de Google Maps para calcular distancias y tiempos estimados, asegurar el acceso mediante Keycloak con roles y permisos, y enrutar el tráfico entre servicios a través de un API Gateway.\n\nTodo debía vivir en Docker, contenedor por contenedor, para garantizar un entorno reproducible y fácil de desplegar."
    },
    solution: {
      en: "My partner and I implemented a microservices architecture that splits responsibilities into independent services, which makes it easier to scale and maintain.\n\nEach microservice handles one function, such as user management, requests or transport, so a change in one does not ripple through the rest.",
      es: "Con mi compañero implementamos una arquitectura de microservicios que divide las responsabilidades en servicios independientes, lo que facilita escalar y mantener el sistema.\n\nCada microservicio se encarga de una función, como la gestión de usuarios, las solicitudes o el transporte, de modo que un cambio en uno no se propaga al resto."
    },
    technologies: [
      'Java 21',
      'Spring Boot 3',
      'Spring Cloud Gateway',
      'RestClient',
      'Keycloak IAM',
      'Docker Compose',
      'PostgreSQL',
      'OpenAPI/Swagger',
      'Google Distance Matrix API'
    ],
    features: [
      {
        icon: Server,
        title: { en: "Independent Microservices", es: "Microservicios Independientes" },
        desc: { en: "Each service handles a specific function, facilitating scalability.", es: "Cada servicio maneja una función específica, facilitando la escalabilidad." }
      },
      {
        icon: Layout,
        title: { en: "API Gateway", es: "API Gateway" },
        desc: { en: "Single entry point that routes traffic to the microservices.", es: "Punto de entrada único que enruta el tráfico hacia los microservicios." }
      },
      {
        icon: Lock,
        title: { en: "Security with Keycloak", es: "Seguridad con Keycloak" },
        desc: { en: "Authentication and authorization for users and roles.", es: "Autenticación y autorización para usuarios y roles." }
      },
      {
        icon: MapPin,
        title: { en: "Google Maps Integration", es: "Integración con Google Maps" },
        desc: { en: "Distance and estimated time calculation for transport requests.", es: "Cálculo de distancias y tiempos estimados para solicitudes de transporte." }
      }
    ],
    githubUrl: "https://github.com/fabrizzio178/tp-backendDeApps",
    images: [tpiImg],
    demoLabel: { en: "C4 Container Diagram Level 2", es: "Diagrama C4 de Contenedores Nivel 2" }
  }
];
