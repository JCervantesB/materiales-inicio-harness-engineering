// PROBLEMA SEMBRADO (Módulo 2.2): import arquitectónico prohibido.
// Este componente importa directamente desde `db/`. Debería pasar por `services/`.
import { contarTareas } from '@/db/tareas';

export function ContadorTareas({ usuarioId }: { usuarioId: number }) {
  const resumen = contarTareas(usuarioId);

  // PROBLEMA SEMBRADO (Módulo 7.1): muestra `total` en lugar de `completadas`.
  return (
    <p className="resumen">
      {resumen.total} tareas · {resumen.total} completadas
    </p>
  );
}
