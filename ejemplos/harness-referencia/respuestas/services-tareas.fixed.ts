// Corrección de src/services/tareas.ts.
//
// Cambios respecto al starter:
// - Se elimina `parseTarea(data: any)`: `db.listarTareas` ya devuelve `Tarea[]`
//   tipado, así que el re-parseo con `any` era redundante (Módulo 2.1).
// - `editarTarea` y `marcarCompletada` dejan de ser stubs con errores de tipos
//   y delegan en la capa de datos, recibiendo `usuarioId` (Módulo 1.3).
// - Se añade `contarTareas` para que los componentes pasen por `services`.
import type { Tarea, NuevaTarea, EditarTarea } from '@/lib/tipos';
import * as db from '@/db/tareas';

export function listarTareas(usuarioId: number): Tarea[] {
  return db.listarTareas(usuarioId);
}

export function crearTarea(usuarioId: number, datos: NuevaTarea): Tarea {
  return db.crearTarea(usuarioId, datos);
}

export function eliminarTarea(id: number, usuarioId: number): boolean {
  return db.eliminarTarea(id, usuarioId);
}

export function contarTareas(usuarioId: number): { total: number; completadas: number } {
  return db.contarTareas(usuarioId);
}

export function editarTarea(id: number, usuarioId: number, datos: EditarTarea): Tarea | null {
  return db.actualizarTarea(id, usuarioId, datos);
}

export function marcarCompletada(id: number, usuarioId: number, completada: boolean): Tarea | null {
  return db.marcarCompletada(id, usuarioId, completada);
}
