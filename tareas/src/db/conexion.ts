import { DatabaseSync } from 'node:sqlite';
import { readFileSync, readdirSync, mkdirSync } from 'node:fs';
import { join, dirname } from 'node:path';

const RUTA_POR_DEFECTO = join(process.cwd(), 'data', 'tareas.db');
const DIR_MIGRACIONES = join(process.cwd(), 'src', 'db', 'migraciones');

// Singleton a través de globalThis para sobrevivir al hot reload de Next.
const globalConDb = globalThis as unknown as { __tareasDb?: DatabaseSync };

function crearBase(ruta: string): DatabaseSync {
  mkdirSync(dirname(ruta), { recursive: true });
  const db = new DatabaseSync(ruta);
  db.exec('PRAGMA foreign_keys = ON');
  return db;
}

/** Aplica las migraciones SQL pendientes, en orden alfabético. */
function migrar(db: DatabaseSync): void {
  db.exec(
    'CREATE TABLE IF NOT EXISTS migraciones (nombre TEXT PRIMARY KEY, aplicada_en TEXT NOT NULL)'
  );

  const aplicadas = new Set(
    (db.prepare('SELECT nombre FROM migraciones').all() as { nombre: string }[]).map(
      (fila) => fila.nombre
    )
  );

  const archivos = readdirSync(DIR_MIGRACIONES)
    .filter((archivo) => archivo.endsWith('.sql'))
    .sort();

  for (const archivo of archivos) {
    if (aplicadas.has(archivo)) continue;
    const sql = readFileSync(join(DIR_MIGRACIONES, archivo), 'utf8');
    db.exec(sql);
    db.prepare('INSERT INTO migraciones (nombre, aplicada_en) VALUES (?, ?)').run(
      archivo,
      new Date().toISOString()
    );
  }
}

/** Devuelve la conexión única a la base de datos, migrándola si hace falta. */
export function obtenerBase(): DatabaseSync {
  const ruta = process.env.DATABASE_PATH ?? RUTA_POR_DEFECTO;
  if (!globalConDb.__tareasDb) {
    const db = crearBase(ruta);
    migrar(db);
    globalConDb.__tareasDb = db;
  }
  return globalConDb.__tareasDb;
}
