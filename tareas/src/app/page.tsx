import { redirect } from 'next/navigation';
import { obtenerUsuarioId } from '@/lib/auth';

export const dynamic = 'force-dynamic';

export default async function Inicio() {
  const usuarioId = await obtenerUsuarioId();
  redirect(usuarioId ? '/dashboard' : '/login');
}
