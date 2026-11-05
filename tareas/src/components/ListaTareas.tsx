'use client';

import { useRouter } from 'next/navigation';
import type { Tarea } from '@/lib/tipos';
import { diasRestantes } from '@/lib/fechas';

const fechaDe = (iso: string) => new Date(`${iso}T00:00:00`);

export function ListaTareas({ tareas }: { tareas: Tarea[] }) {
  const router = useRouter();

  async function borrar(id: number) {
    await fetch(`/api/tareas/${id}`, { method: 'DELETE' });
    router.refresh();
  }

  return (
    <ul className="lista">
      {tareas.map((tarea) => (
        <li key={tarea.id}>
          <div className="info">
            <span className={tarea.completada ? 'titulo completada' : 'titulo'}>
              {tarea.titulo}
            </span>
            {tarea.descripcion && <p className="descripcion">{tarea.descripcion}</p>}
            {tarea.fechaVencimiento && (
              <span className="vence">
                vence el {fechaDe(tarea.fechaVencimiento).toLocaleDateString('es-ES')} · en{' '}
                {diasRestantes(fechaDe(tarea.fechaVencimiento))} días
              </span>
            )}
          </div>
          <div className="acciones">
            <button type="button" onClick={() => borrar(tarea.id)}>
              Borrar
            </button>
            <button type="button" disabled title="Funcionalidad pendiente">
              Editar
            </button>
            <button type="button" disabled title="Funcionalidad pendiente">
              Completar
            </button>
          </div>
        </li>
      ))}
    </ul>
  );
}
