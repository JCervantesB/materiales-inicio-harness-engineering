// Corrección de src/components/ContadorTareas.tsx.
//
// - Módulo 2.2: se importa `contarTareas` desde `services/`, no desde `db/`.
// - Módulo 7.1: se muestra `resumen.completadas` (antes mostraba `total`).
import { contarTareas } from '@/services/tareas';

export function ContadorTareas({ usuarioId }: { usuarioId: number }) {
  const resumen = contarTareas(usuarioId);

  return (
    <p className="resumen">
      {resumen.total} tareas · {resumen.completadas} completadas
    </p>
  );
}
