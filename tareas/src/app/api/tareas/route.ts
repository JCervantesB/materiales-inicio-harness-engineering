import { NextResponse } from 'next/server';
import { obtenerUsuarioId } from '@/lib/auth';
import { listarTareas, crearTarea } from '@/services/tareas';

export async function GET() {
  const usuarioId = await obtenerUsuarioId();
  if (!usuarioId) {
    return NextResponse.json({ error: 'No autenticado' }, { status: 401 });
  }
  return NextResponse.json(listarTareas(usuarioId));
}

export async function POST(req: Request) {
  const usuarioId = await obtenerUsuarioId();
  if (!usuarioId) {
    return NextResponse.json({ error: 'No autenticado' }, { status: 401 });
  }

  const datos = await req.json().catch(() => ({}));
  if (typeof datos.titulo !== 'string' || !datos.titulo.trim()) {
    return NextResponse.json({ error: 'El título es obligatorio' }, { status: 400 });
  }

  const tarea = crearTarea(usuarioId, {
    titulo: datos.titulo.trim(),
    descripcion: typeof datos.descripcion === 'string' ? datos.descripcion : undefined,
    fechaVencimiento: typeof datos.fechaVencimiento === 'string' ? datos.fechaVencimiento : null,
  });

  return NextResponse.json(tarea, { status: 201 });
}
