// Chequeo de pruebas desactivadas (Módulo 4.3).
// Falla si queda alguna prueba con it.skip, test.skip o describe.skip en src/.
//
// Uso (desde la raíz de tareas/): node scripts/comprobar-pruebas-desactivadas.mjs
//
// Código de salida:
//   0 → no hay pruebas desactivadas
//   1 → hay pruebas desactivadas

import { readdirSync, readFileSync, statSync } from 'node:fs';
import { join } from 'node:path';

const PATRON = /\b(it|test|describe)\.skip\(/;
const encontrados = [];

function recorrer(dir) {
  for (const nombre of readdirSync(dir)) {
    const ruta = join(dir, nombre);
    if (statSync(ruta).isDirectory()) {
      recorrer(ruta);
    } else if (/\.test\.tsx?$/.test(ruta)) {
      readFileSync(ruta, 'utf8')
        .split('\n')
        .forEach((linea, indice) => {
          if (PATRON.test(linea)) {
            encontrados.push(`${ruta}:${indice + 1}: ${linea.trim()}`);
          }
        });
    }
  }
}

recorrer('src');

if (encontrados.length > 0) {
  console.error('BLOCKED: hay pruebas desactivadas:');
  encontrados.forEach((linea) => console.error(linea));
  process.exit(1);
}

console.log('OK: no hay pruebas desactivadas.');
process.exit(0);
