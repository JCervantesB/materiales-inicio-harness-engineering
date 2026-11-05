// Validación previa a una modificación de archivo (Módulo 2.3).
// Bloquea operaciones sobre archivos protegidos ANTES de que ocurran.
//
// Ubicación en el proyecto: tareas/scripts/protecciones.mjs
// Uso (desde la raíz de tareas/): node scripts/protecciones.mjs <ruta-archivo>
//
// Regla: una migración que ya existe en src/db/migraciones/ está aplicada
// y no se modifica. Los archivos nuevos sí se permiten.
//
// Código de salida:
//   0 → permitido
//   1 → bloqueado
//   2 → uso incorrecto

import { existsSync } from 'node:fs';

const ruta = process.argv[2];

if (!ruta) {
  console.error('Uso: node scripts/protecciones.mjs <ruta-archivo>');
  process.exit(2);
}

const nombre = ruta.split(/[\\/]/).pop();
const esMigracion = /src[\\/]db[\\/]migraciones[\\/].+\.sql$/.test(ruta);

if (esMigracion && existsSync(ruta)) {
  console.error(
    `BLOCKED: la migración "${nombre}" ya fue aplicada. Crea una migración nueva.`
  );
  process.exit(1);
}

// Archivos sensibles.
if (/\.env($|\.)/.test(ruta) || ruta.endsWith('package-lock.json')) {
  console.error(`BLOCKED: el archivo "${ruta}" está protegido.`);
  process.exit(1);
}

console.log('OK: archivo permitido.');
process.exit(0);
