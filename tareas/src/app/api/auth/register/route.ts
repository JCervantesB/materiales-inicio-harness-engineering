import { NextResponse } from 'next/server';
import { crearUsuario, obtenerUsuarioPorEmail } from '@/db/usuarios';
import { hashPassword } from '@/lib/auth';

export async function POST(req: Request) {
  const datos = await req.json().catch(() => ({}));

  const email = typeof datos.email === 'string' ? datos.email.trim() : '';
  const nombre = typeof datos.nombre === 'string' ? datos.nombre.trim() : '';
  const password = typeof datos.password === 'string' ? datos.password : '';

  if (!email || !password) {
    return NextResponse.json({ error: 'Email y contraseña son obligatorios' }, { status: 400 });
  }

  const existente = obtenerUsuarioPorEmail(email);
  if (existente) {
    return NextResponse.json({ error: 'El email ya está registrado' }, { status: 409 });
  }

  const usuario = crearUsuario(email, nombre, hashPassword(password));
  return NextResponse.json(
    { id: usuario.id, email: usuario.email, nombre: usuario.nombre },
    { status: 201 }
  );
}
