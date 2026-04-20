const projectsData = {
    "ai-bi-system": {
        en: {
            title: "AI Business Intelligence System for Ticket Management",
            description: "A Business Intelligence system designed to analyze technical support tickets and transform operational data into strategic insights. Through interactive Power BI dashboards, the system enables organizations to detect patterns, monitor KPIs in real time, and improve decision-making, reducing response times and optimizing service management.",
            features: [
                "Real-time monitoring of ticket KPIs",
                "Identification of recurring incidents and failure patterns",
                "Analysis of ticket frequency per client",
                "Criticality classification of incidents",
                "Geographic visualization of service issues",
                "Server performance tracking",
                "Customer distribution analysis by node and access point (AP)",
                "Operator performance evaluation based on resolved tickets"
            ],
            role: "BI / Data Analyst",
            type: "Data Analytics / BI",
            status: "Completed"
        },
        es: {
            title: "Sistema de AI Business Intelligence para Gestión de Tickets",
            description: "Un sistema de Business Intelligence diseñado para analizar tickets de soporte técnico y transformar datos operativos en insights estratégicos. A través de dashboards interactivos en Power BI, el sistema permite detectar patrones, monitorear KPIs en tiempo real y mejorar la toma de decisiones.",
            features: [
                "Monitoreo en tiempo real de KPIs de tickets",
                "Identificación de incidentes recurrentes y patrones de falla",
                "Análisis de frecuencia de tickets por cliente",
                "Clasificación de criticidad de incidentes",
                "Visualización geográfica de problemas de servicio",
                "Seguimiento del rendimiento del servidor",
                "Análisis de distribución de clientes por nodo y punto de acceso (AP)",
                "Evaluación del desempeño del operador basada en tickets resueltos"
            ],
            role: "Analista de BI / Datos",
            type: "Análisis de Datos / BI",
            status: "Completado"
        },
        techStack: ["Power BI", "Excel", "DAX", "Data Modeling (Kimball)", "Data Analytics"],
        year: "2026",
        image: "./assets/projects/projectBI.png",
        github: "https://github.com/ajlandazuri/DashboardsGestionTickets-Public.git"
    },
    "web-system": {
        en: {
            title: "BioWaterSTEAM Frontend – Real-Time Water Monitoring System",
            description: "A web-based interface developed for the BioWaterSTEAM IoT system, designed to monitor water quality in real time. It visualizes key parameters such as pH, TDS, and temperature through a clean and responsive interface, enabling fast interpretation of data and supporting efficient decision-making.",
            features: [
                "Real-time visualization of water quality parameters (pH, TDS, Temperature)",
                "Automatic data updates every few seconds",
                "Visual alerts for critical values",
                "Responsive design for mobile and desktop devices",
                "Integration with IoT devices (ESP32)",
                "Cloud-based data synchronization using Firebase"
            ],
            role: "Frontend Developer",
            type: "Web Application / IoT",
            status: "Completed"
        },
        es: {
            title: "BioWaterSTEAM Frontend – Sistema de Monitoreo de Agua en Tiempo Real",
            description: "Interfaz web desarrollada para el sistema IoT BioWaterSTEAM, diseñada para monitorear la calidad del agua en tiempo real. Visualiza parámetros clave como pH, TDS y temperatura a través de una interfaz limpia y responsiva.",
            features: [
                "Visualización en tiempo real de parámetros de calidad del agua",
                "Actualizaciones automáticas de datos cada pocos segundos",
                "Alertas visuales para valores críticos",
                "Diseño responsivo para dispositivos móviles y escritorio",
                "Integración con dispositivos IoT (ESP32)",
                "Sincronización de datos mediante Firebase"
            ],
            role: "Desarrollador Frontend",
            type: "Aplicación Web / IoT",
            status: "Completado"
        },
        techStack: ["HTML5", "CSS3", "JavaScript", "Firebase Realtime Database", "REST API", "IoT Integration (ESP32)"],
        year: "2024",
        image: "./assets/projects/BioWaterSteam.jpeg",
        github: "https://github.com/ajlandazuri/BioWaterSTEAM-Frontend.git"
    },
    "biowater-api": {
        en: {
            title: "BioWaterSTEAM API – IoT Data Management System",
            description: "A RESTful API developed for the BioWaterSTEAM IoT system, designed to receive, process, and store real-time water quality data from ESP32 devices.",
            features: [
                "Real-time data ingestion from IoT devices (ESP32)",
                "Cloud storage using Firebase Realtime Database",
                "RESTful endpoints for data access and integration",
                "Continuous data updates (~5 seconds)",
                "Structured data organization (pH, TDS, Temperature)"
            ],
            role: "Backend Developer",
            type: "API / IoT System",
            status: "Completed"
        },
        es: {
            title: "BioWaterSTEAM API – Sistema de Gestión de Datos IoT",
            description: "API RESTful desarrollada para el sistema IoT BioWaterSTEAM, diseñada para recibir, procesar y almacenar datos de calidad del agua en tiempo real.",
            features: [
                "Ingestión de datos en tiempo real (ESP32)",
                "Almacenamiento en Firebase Realtime Database",
                "Endpoints RESTful para acceso e integración",
                "Actualizaciones continuas (~5 segundos)",
                "Organización estructurada (pH, TDS, Temp)"
            ],
            role: "Desarrollador Backend",
            type: "API / Sistema IoT",
            status: "Completado"
        },
        techStack: ["Node.js", "Express.js", "Firebase Realtime Database", "JSON", "IoT (ESP32)", "REST API"],
        year: "2024",
        image: "./assets/projects/BackSTEAM.png",
        github: "https://github.com/ajlandazuri/BioWaterSTEAM-API.git"
    },
    "management-dashboard": {
        en: {
            title: "Management Module – Billing Integration System",
            description: "An enterprise-focused management module developed within the minimarketdemo system, integrating data from an external billing database.",
            features: [
                "Role-based access for managerial users",
                "Integration with external billing database",
                "Annual and monthly billing analysis",
                "Order status tracking",
                "SQL views for optimized data queries"
            ],
            role: "Backend Developer",
            type: "Enterprise System / ERP Module",
            status: "Completed"
        },
        es: {
            title: "Módulo de Gerencia – Sistema de Integración de Facturación",
            description: "Módulo de gestión empresarial desarrollado en minimarketdemo, integrando datos de una base de datos de facturación externa.",
            features: [
                "Acceso basado en roles gerenciales",
                "Integración con base de datos externa",
                "Análisis de facturación anual y mensual",
                "Seguimiento de pedidos",
                "Consultas optimizadas mediante vistas SQL"
            ],
            role: "Desarrollador Backend",
            type: "Sistema Empresarial / ERP",
            status: "Completado"
        },
        techStack: ["Java EE (EJB, JPA)", "JSF / Servlets", "SQL (Views)", "WildFly", "HTML / CSS / JavaScript"],
        year: "2023",
        image: "./assets/projects/facturacion.png",
        github: "https://github.com/ajlandazuri/ModuloGerenciaResumenFacturas.git"
    },
    "football-prediction": {
        en: {
            title: "AI Football Prediction System – Machine Learning Project",
            description: "A Machine Learning project focused on predicting football match outcomes using historical data and advanced analytics.",
            features: [
                "Data preprocessing and normalization pipeline",
                "Feature engineering for improved model performance",
                "Training of multiple ML models",
                "Match outcome prediction based on historical data"
            ],
            role: "Data Scientist / ML Developer",
            type: "AI / Machine Learning",
            status: "Completed"
        },
        es: {
            title: "Sistema AI de Predicción de Fútbol – Machine Learning",
            description: "Proyecto de Machine Learning enfocado en predecir resultados de fútbol usando datos históricos y analítica avanzada.",
            features: [
                "Pipeline de preprocesamiento de datos",
                "Ingeniería de características",
                "Entrenamiento de modelos predictivos",
                "Predicción basada en variables históricas"
            ],
            role: "Científico de Datos / Desarrollador ML",
            type: "IA / Machine Learning",
            status: "Completado"
        },
        techStack: ["Python", "Pandas", "NumPy", "Scikit-learn", "Pickle (.pkl)", "Flask"],
        year: "2023",
        image: "./assets/projects/prediccion.png",
        github: "https://github.com/ajlandazuri/IAProject.git"
    },
    "infra-monitoring": {
        en: {
            title: "Infrastructure & Client Monitoring Dashboard – Power BI",
            description: "An interactive Business Intelligence dashboard developed in Power BI to monitor technological infrastructure and client distribution.",
            features: [
                "Visualization of servers by location",
                "Analysis of client distribution per server",
                "Interactive filters and dynamic dashboards",
                "Real-time KPI monitoring"
            ],
            role: "BI / Data Analyst",
            type: "Data Visualization / BI",
            status: "Completed"
        },
        es: {
            title: "Dashboard de Monitoreo de Infraestructura – Power BI",
            description: "Dashboard interactivo en Power BI para monitorear infraestructura tecnológica y distribución de clientes en tiempo real.",
            features: [
                "Visualización de servidores por ubicación",
                "Distribución de clientes por servidor",
                "Filtros interactivos",
                "Monitoreo de KPIs operativos"
            ],
            role: "Analista de BI / Datos",
            type: "Visualización de Datos / BI",
            status: "Completado"
        },
        techStack: ["Power BI", "Power Query", "DAX", "Excel / Database"],
        year: "2024",
        image: "./assets/projects/projectBI2.png",
        github: "https://github.com/ajlandazuri/DashboardsMonitoreoInfraestructuraClientes.git"
    },
    "parking-system": {
        en: {
            title: "Parking Management System – Vehicle Control Application",
            description: "A structured application developed to manage parking spaces and vehicle flow efficiently.",
            features: [
                "Vehicle registration system",
                "Entry and exit tracking",
                "Parking space management",
                "Organized data handling"
            ],
            role: "Software Developer",
            type: "Desktop Application",
            status: "Completed"
        },
        es: {
            title: "Sistema de Gestión de Parqueaderos – Control de Vehículos",
            description: "Aplicación desarrollada para gestionar espacios de estacionamiento y flujo de vehículos de manera eficiente.",
            features: [
                "Sistema de registro de vehículos",
                "Seguimiento de entradas y salidas",
                "Gestión de espacios disponibles",
                "Manejo de datos estructurado"
            ],
            role: "Desarrollador de Software",
            type: "Aplicación de Escritorio",
            status: "Completado"
        },
        techStack: ["C#", ".NET Framework", "Visual Studio", "Solution Architecture"],
        year: "2023",
        image: "https://images.unsplash.com/photo-1506521781263-d8422e82f27a?auto=format&fit=crop&q=80&w=1200",
        github: "https://github.com/ajlandazuri/SistemaParqueadero.git"
    },
    "aulamanager": {
        en: {
            title: "AulaManager – Academic Management System",
            description: "A multi-layer academic management system developed in .NET, designed to manage classroom and course information.",
            features: [
                "Multi-tier architecture (Entities, API, Web)",
                "REST API for data management",
                "MVC-based web interface",
                "Separation of concerns for scalability"
            ],
            role: "Full Stack Developer",
            type: "Academic System",
            status: "Completed"
        },
        es: {
            title: "AulaManager – Sistema de Gestión Académica",
            description: "Sistema académico multicapa desarrollado en .NET, diseñado para gestionar aulas y cursos.",
            features: [
                "Arquitectura multicapa (Entidades, API, Web)",
                "API REST para gestión de datos",
                "Interfaz web MVC",
                "Separación de responsabilidades"
            ],
            role: "Desarrollador Full Stack",
            type: "Sistema Académico",
            status: "Completado"
        },
        techStack: [".NET / ASP.NET", "ASP.NET MVC", "REST API", "C#", "Multi-layer Architecture"],
        year: "2023",
        image: "https://images.unsplash.com/photo-1501504905252-473c47e087f8?auto=format&fit=crop&q=80&w=1200",
        github: "https://github.com/ajlandazuri/GestionAulasCursos.git"
    }
};
