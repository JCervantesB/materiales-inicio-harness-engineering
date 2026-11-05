import type { Tarea, NuevaTarea, EditarTarea } from '@/lib/tipos';
import * as db from '@/db/tareas';

// PROBLEMA SEMBRADO (Módulo 2.1): `any` explícito. Debería tiparse y validarse.
export function parseTarea(data: any): Tarea {
  return {
    id: data.id,
    usuarioId: data.usuarioId,
    titulo: data.titulo,
    descripcion: data.descripcion ?? null,
    completada: Boolean(data.completada),
    fechaVencimiento: data.fechaVencimiento ?? null,
    creadaEn: data.creadaEn,
  };
}

export function listarTareas(usuarioId: number): Tarea[] {
  return db.listarTareas(usuarioId).map(parseTarea);
}

export function crearTarea(usuarioId: number, datos: NuevaTarea): Tarea {
  return db.crearTarea(usuarioId, datos);
}

export function eliminarTarea(id: number, usuarioId: number): boolean {
  return db.eliminarTarea(id, usuarioId);
}

// --- Funcionalidades pendientes (con errores de tipos deliberados, Módulo 1.3) ---

export function editarTarea(id: number, datos: EditarTarea): Tarea {
  // Pendiente. Retorna un objeto incompleto → error de tipos TS2739.
  return { id, titulo: datos.titulo };
}

export function marcarCompletada(id: number, usuarioId: number, completada: boolean): Tarea {
  // Pendiente. `obtenerTarea` devuelve `Tarea | null` → errores de tipos TS18047 y TS2322.
  const tarea = db.obtenerTarea(id, usuarioId);
  tarea.completada = completada;
  return tarea;
}
