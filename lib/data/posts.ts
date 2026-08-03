export type Post = {
  id: string;
  slug: string;
  title: string;
  excerpt: string;
  date: string;
  category: string;
  author: string;
  readTime: string;
  content: string;
};

export const MOCK_POSTS: Post[] = [
  {
    id: "1",
    slug: "inteligencia-de-enjambre-modelos-ia-distribuidos",
    title: "Inteligencia de Enjambre: Modelos de IA Distribuidos y Biomímesis en 2026",
    excerpt:
      "Cómo los algoritmos inspirados en el comportamiento colectivo de las abejas están revolucionando el procesamiento paralelo y la resiliencia en arquitecturas Cloud de gran escala.",
    date: "SYS.DATE: 2026.08.03",
    category: "SWARM.AI",
    author: "Dra. Elena Vance • Lead AI Architect",
    readTime: "5 MIN READ",
    content: `
## Introducción a la Inteligencia de Enjambre

La **Inteligencia de Enjambre** (Swarm Intelligence) es una disciplina de la Inteligencia Artificial inspirada en la autoorganización de los sistemas biológicos, tales como colonias de hormigas, bandadas de aves y, de forma sobresaliente, las **comunidades de abejas**.

En lugar de depender de un servidor centralizado con un único punto de falla, los modelos de enjambre distribuyen las operaciones de cómputo entre cientos o miles de nodos independientes (*nodos agentes*), logrando un nivel de resiliencia y escalabilidad sin precedentes.

### Principios Fundamentales del Enjambre

1. **Descentralización Autónoma:** Cada nodo opera basándose en reglas locales sin necesidad de un controlador global que imponga cuellos de botella.
2. **Comunicación Estigmérgica:** Los agentes modifican el entorno digital dejando marcas o métricas de retroalimentación que guían al resto del grupo.
3. **Adaptabilidad en Tiempo Real:** Si un nodo falla o se desconecta, la red redistribuye la carga de trabajo instantáneamente sin interrupción del servicio.

\`\`\`typescript
// Algoritmo abstracto de consenso de enjambre
interface SwarmAgent {
  id: string;
  vector: number[];
  evaluateFitness: () => number;
  syncWithNeighbors: (neighbors: SwarmAgent[]) => void;
}

function processSwarmConsensus(agents: SwarmAgent[]) {
  return agents.map((agent) => {
    const localTopology = findNearestNodes(agent, 5);
    agent.syncWithNeighbors(localTopology);
    return agent.evaluateFitness();
  });
}
\`\`\`

## Aplicaciones en Cloud & Procesamiento Paralelo

En **Cómputo e IA del Sur**, aplicamos principios biomiméticos para estructurar pipelines de datos de alta velocidad y APIs distribuidas. Este enfoque nos permite procesar millones de peticiones simultáneas reduciendo la latencia de respuesta y garantizando una disponibilidad constante.

> "La verdadera potencia de la Inteligencia Artificial no reside en un procesador colosal, sino en la cooperación coordinada de miles de nodos especializados actuando en armonía."

### Impacto en la Industria actual

* **Optimización de Rutas Logísticas:** Algoritmos de colonias de abejas aplicados al transporte y entregas en tiempo real.
* **Procesamiento de Modelos LLM:** Fragmentación de parámetros de modelos de lenguaje sobre clústeres híbridos de bajo consumo energético.
* **Ciberseguridad Colectiva:** Detección y contención de amenazas cibernéticas mediante comportamiento defensivo de enjambre.

## Conclusión

El futuro del software inteligente exige abandonar la rigidez de las arquitecturas monolíticas centralizadas. La biomímesis y el cómputo de enjambre abren una nueva era de sistemas distribuidos capaces de aprender, adaptarse y auto-repararse.
    `,
  },
  {
    id: "2",
    slug: "optimizando-pipelines-deep-learning-microchips",
    title: "Optimizando Pipelines de Deep Learning con Arquitecturas de Microchips Cuadriculados",
    excerpt:
      "Un análisis técnico sobre la aceleración de cómputo vectorial reduciendo la latencia de bus en clústeres híbridos de Inteligencia Artificial.",
    date: "SYS.DATE: 2026.07.28",
    category: "HARDWARE.TECH",
    author: "Ing. Marcos Ríos • Systems Engineer",
    readTime: "7 MIN READ",
    content: `
## El Cuello de Botella de la Memoria en IA

En el desarrollo de aplicaciones avanzadas de aprendizaje profundo, la velocidad del procesamiento vectorial se ve constantemente limitada por la ancho de banda entre las unidades de cómputo y los módulos de memoria.

La arquitectura de **Microchips Cuadriculados** resuelve este dilema mediante matrices interconectadas donde los núcleos de cálculo y los bloques de memoria residen en la misma pastilla de silicio.

### Ventajas de la Malla Cuadriculada (Grid Mesh Architecture)

* **Reducción de Latencia:** Menor distancia física de recorrido para las transmisiones de datos vectoriales.
* **Eficiencia Térmica:** Distribución uniforme del calor gracias al diseño en panal.
* **Tolerancia a Fallos:** Desconexión dinámica de bloques defectuosos sin comprometer la matriz principal.

\`\`\`bash
# Métricas de ejecución de bus de datos
> SYS.CHECK --BUS_SPEED: 12.8 TB/s
> SYS.CHECK --LATENCY: 0.4ms
> STATUS: ALL NODES OPERATIONAL
\`\`\`

## Implementación en Infraestructuras de IA del Sur

Mediante el diseño de sistemas optimizados desde el nivel de hardware hasta la capa de aplicación, garantizamos que las plataformas móviles y web de nuestros clientes funcionen con máxima respuesta y menor costo operativo.
    `,
  },
  {
    id: "3",
    slug: "futuro-desarrollo-multiplataforma-sur-mexico",
    title: "El Futuro del Desarrollo Multiplataforma Híbrido en el Sur de México",
    excerpt:
      "Estrategias de despliegue ágil de aplicaciones nativas y sistemas cloud de alta disponibilidad para empresas en crecimiento.",
    date: "SYS.DATE: 2026.07.15",
    category: "DEV.STRATEGY",
    author: "Carlos Mendoza • Tech Lead",
    readTime: "4 MIN READ",
    content: `
## Transformación Digital en Regiones de Alto Crecimiento

El ecosistema empresarial del Sur de México está experimentando una aceleración tecnológica sin precedentes. La demanda de soluciones de software robustas, capaces de operar sin interrupciones tanto en web como en dispositivos móviles iOS y Android, requiere un enfoque estratégico moderno.

### Claves del Éxito Multiplataforma

1. **Código Base Unificado:** Reutilización de lógica de negocio del 85% entre plataformas web y móviles.
2. **Modo Offline-First:** Sincronización transparente de datos para zonas con conectividad intermitente.
3. **Seguridad y Encriptación Avanzada:** Protección de datos mediante estándares bancarios de grado militar.

## Conclusión y Próximos Pasos

Construir tecnología de nivel mundial desde el sur del país es nuestra misión fundamental. Acompañamos a las empresas en su transición hacia ecosistemas digitales competitivos y escalables.
    `,
  },
];

export function getAllPosts(): Post[] {
  return MOCK_POSTS;
}

export function getPostBySlug(slug: string): Post | undefined {
  return MOCK_POSTS.find((p) => p.slug === slug);
}
