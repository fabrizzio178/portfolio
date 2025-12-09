import { Layout, Server, CreditCard, Lock } from 'lucide-react';

import tpiImg from "../assets/tpiImg.jpg";
import imgDevOps from "../assets/imgDevOps.png";

export type Project = {
  id: string;
  title: string;
  shortDescription: string;
  fullDescription: string;
  problem: string;
  solution: string;
  technologies: string[];
  features: { icon: any; title: string; desc: string }[];
  githubUrl?: string;
  demoUrl?: string;
  image?: string;
  demoLabel?: string; // <--- AGREGAR ESTA LÍNEA
};

export const projects: Project[] = [
  {
    id: 'picadito',
    title: 'Picadito - Sistema de Reservas de Canchas de Fútbol',
    shortDescription: 'Plataforma de gestión de canchas de fútbol con pagos automatizados.',
    fullDescription: 'Sistema integral para la gestión de complejos deportivos. Permite a los usuarios reservar canchas en tiempo real y a los administradores gestionar la disponibilidad y los ingresos de forma automatizada.',
    problem: '¿Alguna vez quisiste reservar una cancha y tuviste que mandar mensajes a 3 lugares distintos? Actualmente, la mayoría de los complejos deportivos siguen gestionando sus turnos con agenda de papel y WhatsApp. Para el jugador: Es frustrante esperar a que el dueño te conteste si tiene lugar (a veces te clavan el visto y perdés el horario). Para el dueño: Es un caos gestionar señas, cancelaciones y huecos libres manualmente mientras atienden el buffet. Además, al no tener señas se suelen ausentar jugadores, perdiendo ingresos.',
    solution: 'Cree Picadito, donde eliminamos esa fricción: El jugador ve la disponibilidad en tiempo real, reserva y listo. El dueño puede seguir en tiempo real las reservas que hicieron a sus canchas mientras se encarga de otras tareas. Implementé Webhooks para la conciliación automática de pagos en milisegundos, eliminando la necesidad de intervención humana e intentando reducir el ausentismo al tener un sistema de señas, obligando al jugador a pagar el 10% de la reserva.',
    technologies: ['Node.js', 'TypeScript', 'Mercado Pago API', 'SQLite', 'React', 'Zustand', 'Sequelize', 'Ngrok', 'Express'],
    features: [
      { icon: CreditCard, title: 'Pagos Inteligentes', desc: 'Integración con MercadoPago Checkout Pro y conciliación vía Webhooks.' },
      { icon: Server, title: 'Arquitectura Backend', desc: 'API RESTful escalable con Node.js, Express y Sequelize con migraciones.' },
      { icon: Lock, title: 'Seguridad', desc: 'Validación de roles (Admin/Cliente) y protección de rutas con JWT.' },
      { icon: Layout, title: 'UX Moderna', desc: 'Interfaz reactiva construida con Mantine UI y validación de formularios en tiempo real.' },
    ],
	githubUrl: "https://github.com/fabrizzio178/Picadito",
    demoUrl: 'https://www.youtube.com/watch?v=5tLhdEfLaFE', 
    image: 'https://images.unsplash.com/photo-1575361204480-aadea25e6e68?q=80&w=1000&auto=format&fit=crop' // O una captura tuya
  },
  // ... Tus otros proyectos aquí ...
  {
	id: 'domus',
	title: "Domus - Sistema de Gestión para Propiedades (En Desarrollo)",
	shortDescription: "Plataforma para administrar propiedades, inquilinos y pagos de alquiler. Realización en curso, tesis de Analista en Sistemas UTN FRC.",
	fullDescription: "Domus es una solución integral para propietarios e inmobiliarias que buscan simplificar la gestión de sus propiedades. Permite llevar un control detallado de inquilinos, contratos y pagos de alquiler, todo en una interfaz intuitiva.",
	problem: "Como propietario de varias propiedades, ¿Alguna vez intentaste llevar el control de inquilinos, contratos y pagos usando planillas, mensajes sueltos y recordatorios que siempre llegan tarde? La gestión inmobiliaria hecha a mano termina generando dudas, confusiones y errores que nadie quiere enfrentar. Para el propietario: es agotador perseguir comprobantes, revisar fechas y acordarse de cada renovación. Para el inquilino: es incómodo no tener claridad sobre pagos, vencimientos o comunicaciones. Sin un sistema claro, aparecen atrasos, malos entendidos y pérdidas que podrían evitarse.",
	solution: "Desarrollamos Domus, una plataforma que centraliza toda la gestión inmobiliaria, para que administrar propiedades deje de ser una carga y se convierta en un proceso simple y confiable.",
	technologies: ["Node.js", "React", "TypeScript", "Docker", "Express", "JWT", "Tailwind CSS"],
	features: [
	  { icon: Layout, title: "Gestión de Propiedades", desc: "Registro y administración de múltiples propiedades desde un solo panel." },
	  { icon: Server, title: "Control de Inquilinos", desc: "Base de datos segura para almacenar información y contratos de inquilinos." },
	  { icon: CreditCard, title: "Seguimiento de Pagos", desc: "Historial detallado de pagos y recordatorios automáticos para evitar atrasos." },
	  { icon: Lock, title: "Seguridad y Privacidad", desc: "Autenticación robusta y protección de datos sensibles con JWT." },
  ],
	demoUrl: "https://www.youtube.com/watch?v=example", 
	image: "https://images.unsplash.com/photo-1501183638714-8c2bfb0f3a7b?q=80&w=1000&auto=format&fit=crop"
  },
  {
	id: "tpi-backend",
	title: "TPI Backend - Microservicios para Gestión de Solicitudes de Transporte",
	shortDescription: "Backend de microservicios para gestionar solicitudes de transporte en una aplicación móvil. Proyecto universitario.",
	fullDescription: "Desarrollé un conjunto de microservicios backend para una aplicación móvil que gestiona solicitudes de transporte. El sistema permite a los usuarios crear, actualizar y rastrear sus solicitudes de transporte de manera eficiente.",
	problem: "Se nos planteó como Trabajo Práctico Integrador de la materia Backend de Aplicaciones en UTN FRC el diseño de un sistema capaz de mover varias piezas a la vez sin desordenarse. La consigna: construir un backend basado en microservicios que gestione usuarios, solicitudes de transporte y sus distintos estados, todo con una arquitectura que pudiera crecer sin romperse. Además, debíamos integrar la API Distance Matrix de Google Maps para calcular distancias y tiempos estimados, asegurar el acceso mediante Keycloak con sus roles y permisos, y orquestar el tráfico entre servicios a través de un API Gateway. El resultado debía vivir dentro de Docker, perfectamente contenedor por contenedor, para garantizar un entorno reproducible y fácil de desplegar.",
	solution: "Implementamos con mi compañero una arquitectura de microservicios que divide las responsabilidades en servicios independientes, facilitando la escalabilidad y el mantenimiento. Cada microservicio se encarga de una función específica, como la gestión de usuarios, solicitudes y transporte, lo que mejora la eficiencia y la fiabilidad del sistema en su conjunto.",
	technologies: ["Java", "Spring Boot", "API Google Maps", "KeyCloak", "Docker", "PostgreSQL", "REST API"],
	features: [
		{icon: Server, title: "Microservicios Independientes", desc: "Cada servicio maneja una función específica, facilitando la escalabilidad."},
		{icon: Layout, title: "API Gateway", desc: "Orquesta el tráfico entre microservicios para una comunicación eficiente."},
		{icon: Lock, title: "Seguridad con Keycloak", desc: "Gestión de autenticación y autorización robusta para usuarios y roles."},
		{icon: CreditCard, title: "Integración con Google Maps", desc: "Cálculo de distancias y tiempos estimados para solicitudes de transporte."}
	],
	githubUrl: "https://github.com/fabrizzio178/tp-backendDeApps",
	image: tpiImg,
	demoLabel: "Diagrama C4 de Contenedores Nivel 2"
  },
  {
    id: 'devops',
    title: 'Proyecto DevOps - Automatización y Despliegue Continuo',
    shortDescription: 'Implementación de un pipeline CI/CD para una aplicación web hecha con Java SpringBoot.',
    fullDescription: 'Desarrollé un pipeline de integración y despliegue continuo (CI/CD) utilizando herramientas como Jenkins y Docker. El proyecto automatiza el proceso de construcción, prueba y despliegue de una aplicación web, mejorando la eficiencia del equipo de desarrollo.',
    problem: 'En muchos equipos de desarrollo, el proceso de despliegue manual puede ser propenso a errores y consume mucho tiempo. La falta de automatización puede llevar a retrasos en la entrega de nuevas funcionalidades y correcciones de errores.',
    solution: 'Implementé un pipeline CI/CD que automatiza todo el proceso desde la construcción hasta el despliegue en producción. Esto reduce los errores humanos, acelera el tiempo de entrega y permite a los desarrolladores centrarse en escribir código en lugar de gestionar despliegues manuales. Utilicé Jenkins para orquestar el pipeline, Docker para contenerizar la aplicación y Git para el control de versiones. Como es local, configure Jenkins para que utilice un Trigger basado en polling del repositorio cada 2 minutos.',
    technologies: ['Jenkins', 'Docker', 'Git', 'SolarQube', 'Java', 'SpringBoot'],
    features: [
      { icon: Server, title: 'Automatización Completa', desc: 'Pipeline que cubre desde la construcción hasta el despliegue.' },
      { icon: Layout, title: 'Integración Continua', desc: 'Pruebas automáticas para asegurar la calidad del código.' },
      { icon: Lock, title: 'Despliegue Seguro', desc: 'Despliegue automatizado con rollback en caso de fallos.' },
    ],
    githubUrl: 'https://github.com/fabrizzio178/DevOps-Practice',
    image: imgDevOps,
    demoLabel: 'UI de Jenkins'
  }
];