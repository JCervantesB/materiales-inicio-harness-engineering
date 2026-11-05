import { obtenerBase } from './conexion';
import type { Tarea, NuevaTarea } from '@/lib/tipos';

interface FilaTarea {
  id: number;
  usuarioId: number;
  titulo: string;
  descripcion: string | null;
  completada: number;
  fechaVencimiento: string | null;
  creadaEn: string;
}

function mapear(fila: FilaTarea): Tarea {
  return {
    id: fila.id,
    usuarioId: fila.usuarioId,
    titulo: fila.titulo,
    descripcion: fila.descripcion,
    completada: Boolean(fila.completada),
    fechaVencimiento: fila.fechaVencimiento,
    creadaEn: fila.creadaEn,
  };
}

const SELECT_TAREA = `
  SELECT id, usuario_id AS usuarioId, titulo, descripcion,
         completada, fecha_vencimiento AS fechaVencimiento, creada_en AS creadaEn
  FROM tareas
`;

export function crearTarea(usuarioId: number, datos: NuevaTarea): Tarea {
  const db = obtenerBase();
  const creadaEn = new Date().toISOString();
  const info = db
    .prepare(
      `INSERT INTO tareas (usuario_id, titulo, descripcion, completada, fecha_vencimiento, creada_en)
       VALUES (?, ?, ?, 0, ?, ?)`
    )
    .run(usuarioId, datos.titulo, datos.descripcion ?? null, datos.fechaVencimiento ?? null, creadaEn);

  return {
    id: Number(info.lastInsertRowid),
    usuarioId,
    titulo: datos.titulo,
    descripcion: datos.descripcion ?? null,
    completada: false,
    fechaVencimiento: datos.fechaVencimiento ?? null,
    creadaEn,
  };
}

export function listarTareas(usuarioId: number): Tarea[] {
  const db = obtenerBase();
  const filas = db
    .prepare(`${SELECT_TAREA} WHERE usuario_id = ? ORDER BY creada_en DESC`)
    .all(usuarioId) as unknown as FilaTarea[];
  return filas.map(mapear);
}

export function obtenerTarea(id: number, usuarioId: number): Tarea | null {
  const db = obtenerBase();
  const fila = db
    .prepare(`${SELECT_TAREA} WHERE id = ? AND usuario_id = ?`)
    .get(id, usuarioId) as FilaTarea | undefined;
  return fila ? mapear(fila) : null;
}

export function eliminarTarea(id: number, usuarioId: number): boolean {
  const db = obtenerBase();
  const info = db.prepare('DELETE FROM tareas WHERE id = ? AND usuario_id = ?').run(id, usuarioId);
  return info.changes > 0;
}

export function contarTareas(usuarioId: number): { total: number; completadas: number } {
  const db = obtenerBase();
  const fila = db
    .prepare(
      'SELECT COUNT(*) AS total, SUM(completada) AS completadas FROM tareas WHERE usuario_id = ?'
    )
    .get(usuarioId) as { total: number; completadas: number | null };
  return { total: fila.total, completadas: fila.completadas ?? 0 };
}
