# Materiales de inicio · Curso Harness Engineering para Desarrollo con IA

Este paquete acompaña el curso. Contiene el proyecto de práctica `tareas` y una
guía interna con los problemas deliberados que el alumno debe descubrir y resolver.

```text
materiales-inicio/
├── tareas/                 # la aplicación Next.js (con los huecos deliberados)
├── ejemplos/
│   └── harness-referencia/ # la versión "B" del experimento A/B (harness completo)
├── README.md               # este archivo
└── problemas-sembrados.md  # SOLO para el instructor: la "hoja de respuestas"
```

## `tareas`

Aplicación **Next.js + TypeScript + SQLite** (gestor de tareas) con
autenticación por email/contraseña y dashboard CRUD. Sin servicios externos:
usa `node:sqlite` (incluido en Node 24) y autenticación propia con cookie de
sesión firmada.

```bash
cd tareas
npm install
npm run dev        # http://localhost:3000
```

**Importante:** `tareas` llega **funcional pero incompleta**, con problemas
deliberados que se resuelven a lo largo del curso:

- Sin pruebas (Vitest) y sin pruebas E2E (Playwright).
- Sin comando único de verificación (`verificar`).
- Con errores de tipos que `tsc`/`next build` detectan (pero `next dev` tolera).
- Con un `any` explícito que ESLint no señala.
- Con un import arquitectónico prohibido (un componente importa desde `db/`).
- Con funcionalidades pendientes: editar, completar y filtrar por etiqueta.
- Con reglas escritas en `AGENTS.md` pero sin restricción ejecutable detrás.

La lista completa, con ubicación y módulo al que corresponde, está en
`problemas-sembrados.md` (no incluir en el material del alumno).

## `ejemplos/harness-referencia/`

La versión **"B"** del experimento final (Módulo 8.3): el estado completo del
harness que el alumno construye a lo largo del curso — script `verificar`,
regla ESLint de `any`, dependency-cruiser, protecciones, hooks, Vitest,
Playwright, Skills, feedback loops y el código corregido de `tareas`.
Sirve como hoja de respuestas y material de las demos.
