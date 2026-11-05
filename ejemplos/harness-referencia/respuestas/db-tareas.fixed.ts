// Funciones a AÑADIR en src/db/tareas.ts (Módulos 1.3, 8.2).
// Dan soporte a `editarTarea` y `marcarCompletada` del servicio.
import { obtenerBase } from './conexion';
import type { EditarTarea } from '@/lib/tipos';
import { obtenerTarea } from './tareas';

export function actualizarTarea(
  id: number,
  usuarioId: number,
  datos: EditarTarea
): ReturnType<typeof obtenerTarea> {
  const actual = obtenerTarea(id, usuarioId);
  if (!actual) return null;

  const db = obtenerBase();
  const info = db
    .prepare(
      `UPDATE tareas SET titulo = ?, descripcion = ?, fecha_vencimiento = ?
       WHERE id = ? AND usuario_id = ?`
    )
    .run(
      datos.titulo,
      datos.descripcion ?? null,
      datos.fechaVencimiento ?? null,
      id,
      usuarioId
    );

  return info.changes > 0 ? obtenerTarea(id, usuarioId) : null;
}

export function marcarCompletada(
  id: number,
  usuarioId: number,
  completada: boolean
): ReturnType<typeof obtenerTarea> {
  const db = obtenerBase();
  const info = db
    .prepare('UPDATE tareas SET completada = ? WHERE id = ? AND usuario_id = ?')
    .run(completada ? 1 : 0, id, usuarioId);

  return info.changes > 0 ? obtenerTarea(id, usuarioId) : null;
}
