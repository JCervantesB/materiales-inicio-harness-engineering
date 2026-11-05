# Harness de referencia (versión "B" del experimento A/B)

Este directorio contiene el **estado final** del harness que se construye a lo
largo del curso sobre el starter `tareas`. Es la versión "B" del experimento
final (Módulo 8.3): el mismo proyecto, pero con el entorno de verificación
completo.

> Uso para el instructor: sirve como "hoja de respuestas" para revisar el
> trabajo del alumno y como material de las demos. No es un proyecto ejecutable
> independiente; cada archivo se copia dentro de `tareas/`.

## Mapa archivo → lección

| Archivo | Módulo / Lección | Qué aporta |
|---|---|---|
| `package.json` | 1.3 | el script `verificar` y los scripts `test`/`e2e` |
| `eslintrc.json` | 2.1 | regla que prohíbe `any` |
| `dependency-cruiser.cjs` | 2.2 | frontera `components → db` |
| `protecciones.mjs` | 2.3 | bloqueo de migraciones ya existentes; copiar a `tareas/scripts/` |
| `hooks.md` | 3.1, 3.2, 3.3 | hooks de agente y Git hooks, códigos de salida |
| `vitest.config.ts` + `tests/` | 4.1, 4.3 | pruebas de comportamiento y regresión |
| `scripts/comprobar-pruebas-desactivadas.mjs` | 4.3 | chequeo de `it.skip`, `test.skip` y `describe.skip` |
| `playwright.config.ts` + `e2e/` | 5.1, 5.2 | pruebas E2E con evidencia |
| `skills/` | 6.1, 6.2 | Skills reutilizables |
| `feedback-loop.md` | 7.2, 7.3 | límites de iteración y métricas |
| `respuestas/` | varios | el código de `tareas` ya corregido |

## Cómo aplicarlo a `tareas`

1. Instala las dependencias nuevas:
   ```bash
   cd tareas
   npm install -D vitest @playwright/test dependency-cruiser
   npx playwright install chromium
   ```
2. Copia cada archivo a su ubicación indicada (ver notas en cada archivo).
3. Aplica las correcciones de `respuestas/` sobre el código del starter.

> **Nota:** las versiones de los paquetes en `package.json` son orientativas.
> Instala siempre las últimas estables con `npm install -D <paquete>`.
