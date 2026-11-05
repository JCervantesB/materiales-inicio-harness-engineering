import { NextResponse } from 'next/server';
import { obtenerUsuarioPorEmail } from '@/db/usuarios';
import { verificarPassword, crearTokenSesion } from '@/lib/auth';

export async function POST(req: Request) {
  const datos = await req.json().catch(() => ({}));

  const email = typeof datos.email === 'string' ? datos.email.trim() : '';
  const password = typeof datos.password === 'string' ? datos.password : '';

  const usuario = obtenerUsuarioPorEmail(email);
  if (!usuario || !verificarPassword(password, usuario.passwordHash)) {
    return NextResponse.json({ error: 'Credenciales inválidas' }, { status: 401 });
  }

  const token = crearTokenSesion(usuario.id);
  const res = NextResponse.json({ ok: true });
  res.cookies.set('sesion', token, { httpOnly: true, sameSite: 'lax', path: '/' });
  return res;
}
