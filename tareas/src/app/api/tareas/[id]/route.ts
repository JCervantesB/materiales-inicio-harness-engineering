import { NextResponse } from 'next/server';
import { obtenerUsuarioId } from '@/lib/auth';
import { eliminarTarea } from '@/services/tareas';

export async function DELETE(
  _req: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  const usuarioId = await obtenerUsuarioId();
  if (!usuarioId) {
    return NextResponse.json({ error: 'No autenticado' }, { status: 401 });
  }

  const { id } = await params;
  const ok = eliminarTarea(Number(id), usuarioId);
  if (!ok) {
    return NextResponse.json({ error: 'Tarea no encontrada' }, { status: 404 });
  }

  return NextResponse.json({ ok: true });
}
