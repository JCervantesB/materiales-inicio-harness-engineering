import { redirect } from 'next/navigation';
import { obtenerUsuarioId } from '@/lib/auth';
import { listarTareas } from '@/services/tareas';
import { FormTarea } from '@/components/FormTarea';
import { ListaTareas } from '@/components/ListaTareas';
import { ContadorTareas } from '@/components/ContadorTareas';

export const dynamic = 'force-dynamic';

export default async function DashboardPage() {
  const usuarioId = await obtenerUsuarioId();
  if (!usuarioId) redirect('/login');

  const tareas = listarTareas(usuarioId);

  return (
    <main className="contenedor">
      <header className="barra">
        <h1>Mis tareas</h1>
        <form action="/api/auth/logout" method="post">
          <button type="submit">Cerrar sesión</button>
        </form>
      </header>

      <ContadorTareas usuarioId={usuarioId} />
      <FormTarea />

      {tareas.length === 0 ? (
        <p className="vacio">No hay tareas todavía.</p>
      ) : (
        <ListaTareas tareas={tareas} />
      )}
    </main>
  );
}
