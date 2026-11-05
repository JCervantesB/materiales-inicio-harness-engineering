# AGENTS.md

Instrucciones para trabajar en el proyecto `tareas`.

## Qué es

Un gestor de tareas con Next.js (App Router), TypeScript y SQLite. Tiene
autenticación por email/contraseña y un dashboard con CRUD de tareas.

## Estructura

- `src/app` — páginas y rutas de API.
- `src/components` — componentes de interfaz.
- `src/services` — lógica de negocio.
- `src/db` — acceso a datos y migraciones.
- `src/lib` — autenticación y utilidades.

## Convenciones

- Usar TypeScript con modo estricto.
- No usar `any`.
- Mantener separadas las capas: `components` no debe tocar `db` directamente.
- No modificar migraciones ya aplicadas.
- No añadir dependencias sin necesidad.

## Comandos

- Desarrollo: `npm run dev`
- Lint: `npm run lint`
