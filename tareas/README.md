# tareas

Gestor de tareas del curso **Harness Engineering para Desarrollo con IA**.

Aplicación **Next.js + TypeScript** con base de datos SQLite, autenticación y un
dashboard con operaciones CRUD.

## Requisitos

- Node.js 24 o superior.

## Cómo correrla

```bash
npm install
npm run dev
```

Abre `http://localhost:3000`. Crea una cuenta, inicia sesión y verás tu dashboard.

## Scripts

- `npm run dev` — servidor de desarrollo.
- `npm run build` — compilación de producción.
- `npm run start` — sirve la compilación anterior.
- `npm run lint` — ESLint.

## Estructura

```text
src/
├── app/          # páginas (dashboard, login, registro) y rutas de API
├── components/   # componentes de interfaz
├── services/     # lógica de negocio
├── db/           # acceso a datos y migraciones SQL
└── lib/          # autenticación y utilidades
```

## Notas del curso

Este proyecto es la base sobre la que se construye, módulo a módulo, un harness
de desarrollo. Contiene algunos huecos deliberados que irás descubriendo durante
el curso: verificaciones ausentes, reglas arquitectónicas poco claras y
funcionalidades pendientes.
