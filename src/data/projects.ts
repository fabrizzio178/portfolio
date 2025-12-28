import { Layout, Server, CreditCard, Lock, NetworkIcon } from 'lucide-react';

import tpiImg from "../assets/tpiImg.jpg";
import consolaSer from "../assets/devops/consola servidor ssh FINal.png";
import pdfGen from "../assets/devops/pdf gneerado final.png";
import contadorReq from "../assets/devops/contador de requests .png";
import flujo from "../assets/devops/flujo.png";
import adminPanel from "../assets/picadito/admin panel.png";
import mp from "../assets/picadito/mercadoPago.png"
import reservaPicadito from "../assets/picadito/reservapicadito.png";
import screenPic from "../assets/picadito/screen picadito.png"
import domusLogo from "../assets/domus/domuslogo.png";


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
  problem: LocalizedString;
  solution: LocalizedString;
  technologies: string[];
  features: Feature[];
  githubUrl?: string;
  demoUrl?: string;
  images?: string[];
  arcImage?: string;
  media?: MediaItem[];
  demoLabel?: LocalizedString;
};

export const projects: Project[] = [
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
      en: "Have you ever wanted to book a field and had to send messages to 3 different places? Currently, most sports complexes still manage their slots with paper agendas and WhatsApp. For the player: It's frustrating to wait for the owner to respond if there's availability. For the owner: It's chaos to manage deposits, cancellations, and empty slots manually while serving the snack bar. Also, without deposits, players often don't show up, losing revenue.",
      es: "¿Alguna vez quisiste reservar una cancha y tuviste que mandar mensajes a 3 lugares distintos? Actualmente, la mayoría de los complejos deportivos siguen gestionando sus turnos con agenda de papel y WhatsApp. Para el jugador: Es frustrante esperar a que el dueño te conteste si tiene lugar. Para el dueño: Es un caos gestionar señas, cancelaciones y huecos libres manualmente mientras atienden el buffet. Además, al no tener señas se suelen ausentar jugadores, perdiendo ingresos."
    },
    solution: {
      en: "I created Picadito, eliminating that friction: The player sees real-time availability, books, and done. The owner can track bookings in real-time while handling other tasks. I implemented Webhooks for automatic payment reconciliation in milliseconds, eliminating human intervention and reducing no-shows with a deposit system requiring 10% payment.",
      es: "Creé Picadito, donde eliminamos esa fricción: El jugador ve la disponibilidad en tiempo real, reserva y listo. El dueño puede seguir en tiempo real las reservas que hicieron a sus canchas mientras se encarga de otras tareas. Implementé Webhooks para la conciliación automática de pagos en milisegundos, eliminando la necesidad de intervención humana e intentando reducir el ausentismo al tener un sistema de señas, obligando al jugador a pagar el 10% de la reserva."
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
        desc: { en: "Scalable RESTful API with Node.js, Express, and Sequelize with migrations.", es: "API RESTful escalable con Node.js, Express y Sequelize con migraciones." }
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
      en: "CI/CD pipeline implementation for a EDA architecture Java Spring Boot backend.",
      es: "Implementación de un pipeline CI/CD para backend con arquitectura EDA hecho con Java SpringBoot."
    },
    fullDescription: {
      en: "I developed a continuous integration and deployment (CI/CD) pipeline using tools like GitHub Actions and Docker. The project automates the build, test, and deployment process of a web application, improving the development team's efficiency.",
      es: "Desarrollé un pipeline de integración y despliegue continuo (CI/CD) utilizando herramientas como GitHub Actions y Docker. El proyecto automatiza el proceso de construcción, prueba y despliegue de una aplicación web, mejorando la eficiencia del equipo de desarrollo."
    },
    problem: {
      en: "The project consisted of a complex microservices architecture (Event-Driven Architecture) to be deployed on an on-premises server (home server). The following critical friction points arose: Security and Access: The need to automatically deploy code from GitHub without exposing the local server to the internet (without opening ports on the router) to avoid vulnerabilities. Network Instability: The home internet connection caused packet fragmentation, resulting in frequent failures (bad_record_mac) during the download of Maven dependencies and Docker layers.",
      es: "El proyecto consistía en una arquitectura de microservicios compleja (EDA - Event Driven Architecture) que debía desplegarse en un servidor On-Premise (Servidor casero). Se me presentaron las siguientes fricciones: Seguridad y Acceso: Necesidad de desplegar código automáticamente desde GitHub sin exponer el servidor local a internet (sin abrir puertos en el router) para evitar vulnerabilidades. Inestabilidad de Red: La conexión de casa provocaba fragmentación de paquetes, causando fallos constantes (bad_record_mac) durante la descarga de dependencias Maven y capas de Docker (Deploy imposible). Se me presentó la necesidad de automatizar un flujo CI/CD ya que cada vez que subia algo nuevo, debia conectarme a mi pc servidor vía SSH y hacer todo manualmente."
    },
    solution: {
      en: "I designed and implemented a robust and fault-tolerant CI/CD (Continuous Integration and Deployment) pipeline, transforming the local server into a professional environment: Secure Automation with Self-Hosted Runners: I implemented a GitHub Actions Self-Hosted Runner on the Linux server. I used the Long Polling pattern (outbound connections), allowing the server to listen for changes in the repository without needing to open inbound ports or configure complex VPNs. Network Engineering and Resilience: I diagnosed and resolved packet transmission issues by adjusting the Docker network's MTU (Maximum Transmission Unit) to 1300/1400 bytes to prevent fragmentation on the Wi-Fi network. Automated Testing: I integrated a mandatory Unit Testing stage into the pipeline using JUnit 5, Mockito, and AssertJ. Monitoring: I incorporated endpoint monitoring using Grafana and Prometheus to ensure the health of the system post-deployment.",
      es: "Diseñé e implementé un pipeline de CI/CD (Integración y Despliegue Continuo) robusto y tolerante a fallos, transformando mi servidor local en un entorno profesional con Ubuntu Server: Automatización Segura con Self-Hosted Runners: Implementé un GitHub Actions Self-Hosted Runner en mi propio servidor Linux. Utilicé el patrón de Long Polling (conexiones salientes), permitiendo que el servidor escuche cambios en el repositorio sin necesidad de abrir puertos de entrada ni configurar VPNs complejas. Ingeniería de Red y Resiliencia: Diagnostiqué y solucioné los fallos de transmisión de paquetes ajustando el MTU (Maximum Transmission Unit) de la red Docker a 1300/1400 bytes para evitar fragmentación en la red Wi-Fi. Testing Automatizado: Integré una etapa de Unit Testing obligatoria en el pipeline usando JUnit 5, Mockito y AssertJ. Monitoreo: Incorporé monitoreo de los endpoints mediante Grafana y Prometheus para asegurar la salud del sistema post-despliegue. Utilice SSH para comunicarme con mi servidor. Probamos rate limiting (Ver gráfico de 429 (no disponible) en Prometheus). Utilicé AWS para orquestar una arquitectura EDA, utilizando SQS como cola para mensajería entre microservicios, S3 como almacen de objetos de PDF's y SES para el envío de emails."
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
        desc: { en: "Automatic tests to ensure code quality.", es: "Pruebas automáticas para asegurar la calidad del código." }
      },
      {
        icon: Lock,
        title: { en: "Secure Deployment", es: "Despliegue Seguro" },
        desc: { en: "Automated deployment with rollback on failures.", es: "Despliegue automatizado con rollback en caso de fallos." }
      },
      {
        icon: NetworkIcon,
        title: { en: "Network Resilience", es: "Resiliencia de Red" },
        desc: { en: "Optimized Docker network settings to prevent failures.", es: "Configuración optimizada de la red Docker para prevenir fallos." }
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
      en: "As an Integrative Practical Work for the Backend Applications course at UTN FRC, we were tasked with designing a system capable of moving multiple pieces simultaneously without losing order. The assignment: build a microservices-based backend to manage users, transport requests, and their various states, all with an architecture that could grow without breaking. Additionally, we had to integrate Google Maps' Distance Matrix API to calculate distances and estimated times, secure access through Keycloak with roles and permissions, and orchestrate traffic between services through an API Gateway. The result had to live within Docker, container by container, to ensure a reproducible and easily deployable environment.",
      es: "Se nos planteó como Trabajo Práctico Integrador de la materia Backend de Aplicaciones en UTN FRC el diseño de un sistema capaz de mover varias piezas a la vez sin desordenarse. La consigna: construir un backend basado en microservicios que gestione usuarios, solicitudes de transporte y sus distintos estados, todo con una arquitectura que pudiera crecer sin romperse. Además, debíamos integrar la API Distance Matrix de Google Maps para calcular distancias y tiempos estimados, asegurar el acceso mediante Keycloak con sus roles y permisos, y orquestar el tráfico entre servicios a través de un API Gateway. El resultado debía vivir dentro de Docker, perfectamente contenedor por contenedor, para garantizar un entorno reproducible y fácil de desplegar."
    },
    solution: {
      en: "My partner and I implemented a microservices architecture that divides responsibilities into independent services, facilitating scalability and maintenance. Each microservice handles a specific function, such as user management, requests, and transport, which improves the efficiency and reliability of the system as a whole.",
      es: "Implementamos con mi compañero una arquitectura de microservicios que divide las responsabilidades en servicios independientes, facilitando la escalabilidad y el mantenimiento. Cada microservicio se encarga de una función específica, como la gestión de usuarios, solicitudes y transporte, lo que mejora la eficiencia y la fiabilidad del sistema en su conjunto."
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
        desc: { en: "Orchestrates traffic between microservices for efficient communication.", es: "Orquesta el tráfico entre microservicios para una comunicación eficiente." }
      },
      {
        icon: Lock,
        title: { en: "Security with Keycloak", es: "Seguridad con Keycloak" },
        desc: { en: "Robust authentication and authorization management for users and roles.", es: "Gestión de autenticación y autorización robusta para usuarios y roles." }
      },
      {
        icon: CreditCard,
        title: { en: "Google Maps Integration", es: "Integración con Google Maps" },
        desc: { en: "Distance and estimated time calculation for transport requests.", es: "Cálculo de distancias y tiempos estimados para solicitudes de transporte." }
      }
    ],
    githubUrl: "https://github.com/fabrizzio178/tp-backendDeApps",
    images: [tpiImg],
    demoLabel: { en: "C4 Container Diagram Level 2", es: "Diagrama C4 de Contenedores Nivel 2" }
  },
  {
    id: 'domus',
    title: {
      en: "Domus - Property Management System (In Development)",
      es: "Domus - Sistema de Gestión para Propiedades (En Desarrollo)"
    },
    shortDescription: {
      en: "Platform for managing properties, tenants, and rental payments. Work in progress, thesis for Systems Analyst degree at UTN FRC.",
      es: "Plataforma para administrar propiedades, inquilinos y pagos de alquiler. Realización en curso, tesis de Analista en Sistemas UTN FRC."
    },
    fullDescription: {
      en: "Domus is a comprehensive solution for property owners and real estate agencies looking to simplify property management. It allows detailed control of tenants, contracts, and rental payments, all in an intuitive interface.",
      es: "Domus es una solución integral para propietarios e inmobiliarias que buscan simplificar la gestión de sus propiedades. Permite llevar un control detallado de inquilinos, contratos y pagos de alquiler, todo en una interfaz intuitiva."
    },
    problem: {
      en: "As a multi-property owner, have you ever tried tracking tenants, contracts, and payments using spreadsheets, scattered messages, and reminders that always arrive late? Manual real estate management ends up generating doubts, confusion, and errors no one wants to face. For the owner: it's exhausting to chase receipts, check dates, and remember each renewal. For the tenant: it's uncomfortable not having clarity on payments, due dates, or communications.",
      es: "Como propietario de varias propiedades, ¿Alguna vez intentaste llevar el control de inquilinos, contratos y pagos usando planillas, mensajes sueltos y recordatorios que siempre llegan tarde? La gestión inmobiliaria hecha a mano termina generando dudas, confusiones y errores que nadie quiere enfrentar. Para el propietario: es agotador perseguir comprobantes, revisar fechas y acordarse de cada renovación. Para el inquilino: es incómodo no tener claridad sobre pagos, vencimientos o comunicaciones."
    },
    solution: {
      en: "We're developing Domus, a platform that centralizes all real estate management, so that managing properties stops being a burden and becomes a simple, reliable process.",
      es: "Estamos desarrollando Domus, una plataforma que centraliza toda la gestión inmobiliaria, para que administrar propiedades deje de ser una carga y se convierta en un proceso simple y confiable."
    },
    technologies: ['Node.js', 'React', 'Scrum', 'TypeScript', 'Docker', 'Express', 'JWT', 'PostgreSQL'],
    features: [
      {
        icon: Layout,
        title: { en: "Property Management", es: "Gestión de Propiedades" },
        desc: { en: "Register and manage multiple properties from a single panel.", es: "Registro y administración de múltiples propiedades desde un solo panel." }
      },
      {
        icon: Server,
        title: { en: "Tenant Control", es: "Control de Inquilinos" },
        desc: { en: "Secure database to store tenant information and contracts.", es: "Base de datos segura para almacenar información y contratos de inquilinos." }
      },
      {
        icon: CreditCard,
        title: { en: "Payment Tracking", es: "Seguimiento de Pagos" },
        desc: { en: "Detailed payment history and automatic reminders to avoid delays.", es: "Historial detallado de pagos y recordatorios automáticos para evitar atrasos." }
      },
      {
        icon: Lock,
        title: { en: "Security and Privacy", es: "Seguridad y Privacidad" },
        desc: { en: "Robust authentication and sensitive data protection with JWT.", es: "Autenticación robusta y protección de datos sensibles con JWT." }
      }
    ],
    demoUrl: "https://www.youtube.com/watch?v=example",
    images: [domusLogo]
  }
];