# Problemas sembrados (hoja de respuestas — NO entregar al alumno)

Este archivo documenta los huecos deliberados del starter `tareas`, dónde están
y a qué lección corresponden. Sirve para verificar que el harness construido en
el curso los detecta.

## Resumen por categoría (según el temario)

| Categoría del temario | Problema sembrado | Ubicación | Lección |
|---|---|---|---|
| Errores de tipos | `editarTarea` retorna objeto incompleto (TS2739) | `src/services/tareas.ts` | 1.3 |
| Errores de tipos | `marcarCompletada` asigna sobre `Tarea \| null` (TS18047 y TS2322) | `src/services/tareas.ts` | 1.3 |
| Reglas poco claras | `any` explícito sin regla que lo prohíba | `src/services/tareas.ts` (`parseTarea`) | 2.1 |
| Reglas poco claras | import arquitectónico prohibido (componente → db) | `src/components/ContadorTareas.tsx` | 2.2 |
| Reglas poco claras | reglas solo escritas en `AGENTS.md`, sin enforcement | `AGENTS.md` | 2.1, 2.3 |
| Falta de verificaciones | sin script `verificar`; ESLint no prohíbe `any` | `package.json`, `.eslintrc.json` | 1.3, 2.1 |
| Pruebas ausentes | sin Vitest, sin Playwright | (todo el repo) | 4, 5 |
| Funcionalidades pendientes | botón "Editar" sin cablear | `src/components/ListaTareas.tsx` | 1.1 |
| Funcionalidades pendientes | botón "Completar" sin cablear | `src/components/ListaTareas.tsx` | 8.2 |
| Funcionalidades pendientes | sin campo/filtro de etiqueta | (ausente) | 8.3 |
| Código válido pero incorrecto | `diasRestantes` usa `floor` (0 en lugar de 1) | `src/lib/fechas.ts` | 4.1 |
| Código válido pero incorrecto | contador muestra `total` en vez de `completadas` | `src/components/ContadorTareas.tsx` | 7.1 |

## Detalle de cada problema

### 1. Errores de tipos (Módulo 1.3)

En `src/services/tareas.ts`:

- `editarTarea(id, datos)` declara `: Tarea` pero retorna `{ id, titulo }`,
  omitiendo `usuarioId`, `descripcion`, `completada`, `fechaVencimiento` y
  `creadaEn` → TS2739.
- `marcarCompletada(...)` hace `tarea.completada = completada` sobre el
  resultado de `db.obtenerTarea(...)`, que es `Tarea | null` → TS18047 en la línea 39
  (acceso a `tarea` posiblemente nulo) y TS2322 en la línea 40 (`return tarea`).

Efecto esperado: `next dev` corre sin bloquear, pero `tsc --noEmit` y
`next build` fallan. Es el "Type error..." que aparece en la demo 1.3 al
crear el script `verificar`.

### 2. `any` explícito (Módulo 2.1)

`parseTarea(data: any)` en `src/services/tareas.ts`. Compila y pasa el lint
(`next/core-web-vitals` no activa `no-explicit-any`). Al activar
`@typescript-eslint/no-explicit-any`, `verificar` empieza a fallar.

### 3. Import arquitectónico prohibido (Módulo 2.2)

`src/components/ContadorTareas.tsx` importa `contarTareas` directamente desde
`@/db/tareas`, saltándose `services`. Funciona, compila y no lo detecta ESLint.
Es el "Forbidden dependency" que detecta dependency-cruiser.

### 4. Reglas solo escritas (Módulos 2.1 y 2.3)

`AGENTS.md` dice "No usar `any`", "no tocar migraciones aplicadas" y "mantener
separadas las capas", pero ninguna herramienta las verifica. Son instrucciones,
no restricciones ejecutables.

### 5. Falta de verificaciones (Módulo 1.3)

No existe `npm run verificar`. Hay `dev`, `build`, `start` y `lint`, pero
ningún comando único que encadene `tsc`, `eslint` y `build`.

### 6. Funcionalidades pendientes

- **Editar** (1.1): botón "Editar" en `ListaTareas.tsx` está `disabled`.
- **Completar** (8.2): botón "Completar" en `ListaTareas.tsx` está `disabled`.
  No existe ruta PATCH ni el servicio correspondiente (solo el stub con error
  de tipos `marcarCompletada`).
- **Etiquetas** (8.3): no hay campo `etiqueta` ni filtro por etiqueta.

### 7. Código válido pero incorrecto (Módulos 4.1 y 7.1)

- `diasRestantes` (`src/lib/fechas.ts`) usa `Math.floor`; una tarea que vence
  hoy más tarde devuelve 0 días. Compila y pasa el lint. Se detecta con Vitest.
- `ContadorTareas` muestra `resumen.total` en el lugar de `resumen.completadas`.
  Es el bug del contador que se corrige en la demo 7.1.

## Errores que se siembran durante las lecciones

No están en el starter. El instructor los introduce en la lección indicada y el alumno los corrige en esa misma lección.

| Error | Lección donde se siembra | Qué lo detecta | Corrección |
|---|---|---|---|
| `console.log` de depuración en `ListaTareas.tsx` | 3.3 | regla `no-console` añadida en esa lección | borrar la línea |
| `it.skip` en la prueba de coherencia | 4.3 | chequeo de pruebas desactivadas en `src/` | quitar el `skip` y corregir la consulta |
| Botón Añadir con `type="button"` | 5.2 | prueba E2E de 5.1 | restaurar el envío del formulario |

Además, la lección 2.1 corrige también el `any` de `parseTarea` eliminando la función, porque `db.listarTareas` ya devuelve `Tarea[]`. Tras esa lección el starter deja de tener ese `any`. Los cuatro errores de 3.3 son nuevos y no dependen de este.

## Cómo verificar el starter

```bash
cd tareas
npm install
npm run dev      # corre correctamente
npx tsc --noEmit # falla con 3 errores de tipos sembrados: TS2739 (l. 33), TS18047 (l. 39) y TS2322 (l. 40)
npm run lint     # pasa (el `any` no se detecta todavía)
```
