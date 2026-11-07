# Desarrollo de API REST para Catálogo de Productos

Debes construir una API REST que exponga el catálogo de productos de una tienda en línea. La API debe validar las entradas y manejar los errores de forma centralizada. Los productos tienen los siguientes atributos: id, nombre, descripción, precio y stock. La API debe prohibir la creación de productos con precios negativos o nombres duplicados. Además, debe manejar adecuadamente los errores de validación y otros casos de borde del dominio.

## Informacion General

| Campo | Valor |
|-------|-------|
| **Tema** | Construccion de APIs REST con Express |
| **Nivel** | advanced-l2 |
| **Tipo** | practical |
| **Tiempo estimado** | 8 horas |

## Fases del Reto

### Fase 0: Configuración del Proyecto

**Objetivo:** Obtener el proyecto base funcional enviando el Código Base a un asistente de IA, que lo analizará, corregirá errores y entregará cada archivo con su ruta.

**Tiempo estimado:** 15-30 minutos

**Instrucciones:**

- Asegúrate de tener instalado para ejecutar el proyecto: Node.js 18+, npm, VS Code o similar.
- Copia todo el contenido del campo **Código Base** de este reto — incluyendo el texto de instrucciones que aparece al inicio.
- Abre un asistente de IA (Claude en claude.ai, ChatGPT o Gemini — se recomienda Claude), pega el contenido copiado en el chat y envíalo.
- El asistente analizará los archivos, corregirá errores y entregará cada archivo con su ruta. Guárdalos en la carpeta donde quieras trabajar, respetando las rutas.
- Ejecuta `npm install && npm run build` (o `npm start`). Si no hay errores, estás listo.

**Entregable:** El proyecto compila/arranca sin errores.

<details>
<summary>Pistas de conocimiento</summary>

- Copia el Código Base completo incluyendo el texto de instrucciones al inicio — esas instrucciones le indican al asistente exactamente qué hacer con los archivos.
- Si el asistente no entrega todos los archivos al terminar el análisis, escríbele: "entrégame todos los archivos con su ruta".
- Si el proyecto tiene errores al arrancar, comparte el mensaje de error con el mismo asistente para que lo corrija.

</details>

### Fase 1: Creación de Endpoints Básicos

**Objetivo:** Implementar los endpoints mínimos para crear, leer, actualizar y eliminar productos.

**Tiempo estimado:** 3 horas

**Instrucciones:**

- Define los endpoints REST para las operaciones CRUD sobre productos.
- Implementa la validación básica de entradas para los atributos de los productos.
- Maneja los errores de forma centralizada para garantizar una respuesta coherente.

**Entregable:** Endpoints REST funcionales para CRUD de productos con validación básica y manejo de errores.

<details>
<summary>Pistas de conocimiento</summary>

- Considera cómo estructurar la API para que sea escalable y mantenible.
- Piensa en cómo manejar los errores de forma que el cliente reciba información útil.

</details>

### Fase 2: Validación y Manejo de Errores Avanzados

**Objetivo:** Mejorar la validación de entradas y manejar casos de borde del dominio.

**Tiempo estimado:** 3 horas

**Instrucciones:**

- Implementa validaciones avanzadas para los atributos de los productos, como la prohibición de precios negativos y nombres duplicados.
- Maneja adecuadamente los errores de validación y otros casos de borde del dominio, como productos no encontrados o intentos de eliminar productos con stock disponible.

**Entregable:** Endpoints REST mejorados con validaciones avanzadas y manejo adecuado de errores de borde.

<details>
<summary>Pistas de conocimiento</summary>

- Considera cómo comunicar los errores al cliente de manera clara y útil.
- Piensa en cómo manejar los casos de borde del dominio de forma que la API siga siendo robusta y confiable.

</details>

### Fase 3: Optimización y Refactorización

**Objetivo:** Optimizar el rendimiento de la API y refactorizar el código para mejorar su mantenibilidad.

**Tiempo estimado:** 2 horas

**Instrucciones:**

- Identifica y optimiza las partes de la API que pueden mejorar su rendimiento.
- Refactoriza el código para mejorar su mantenibilidad y escalabilidad.

**Entregable:** API REST optimizada y refactorizada con mejoras en rendimiento y mantenibilidad.

<details>
<summary>Pistas de conocimiento</summary>

- Considera cómo medir el rendimiento de la API y qué métricas son relevantes.
- Piensa en cómo refactorizar el código para que sea más fácil de mantener y escalar.

</details>

## Dimensiones Evaluadas

- **queEs**: ¿Qué es una API REST y cuáles son sus componentes principales?
- **paraQueSirve**: ¿Para qué sirve la validación de entradas en una API REST?
- **comoSeUsa**: ¿Cómo se usa el manejo de errores centralizado en una API REST?
- **erroresComunes**: ¿Cuáles son los errores comunes al construir una API REST y cómo se pueden evitar?
- **queDecisionesImplica**: ¿Qué decisiones implica la optimización y refactorización de una API REST?

## Criterios de Evaluacion

- Implementación de endpoints REST básicos con validación y manejo de errores.
- Implementación de validaciones avanzadas y manejo de casos de borde del dominio.
- Optimización y refactorización del código para mejorar rendimiento y mantenibilidad.

## Como trabajar con un asistente de IA

Hay dos caminos, elegi uno:

- **AGENTS.md** (recomendado) — instrucciones nativas del repo. Abri esta carpeta con tu agente local (Claude Code, Cursor, Codex, Copilot, Gemini) y las carga solo. Sabe que archivos faltan y con que comando se verifica, y completa el scaffold escribiendo en disco.
- **PROMPT_MEJORA.md** — para copiar y pegar en un chat (claude.ai, ChatGPT) si no tenes un agente en el IDE. Declara lo mismo que AGENTS.md; los archivos que te devuelva el chat los guardas en esta carpeta respetando las rutas.

Ninguno de los dos resuelve las fases del reto: eso es tu trabajo.

## Verificacion

El proyecto esta listo para trabajar cuando este comando corre sin errores:

```bash
npm install && npm run build
```

---

*Reto generado automaticamente por Challenge Generator - Pragma*
