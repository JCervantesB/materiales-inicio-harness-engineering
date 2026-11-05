import { randomBytes, scryptSync, timingSafeEqual, createHmac } from 'node:crypto';
import { cookies } from 'next/headers';

const CLAVE_SESION = process.env.SESSION_SECRET ?? 'secreto-de-desarrollo-cambiar';

/** Genera un hash de contraseña con salt (formato `salt:hash`). */
export function hashPassword(password: string): string {
  const salt = randomBytes(16).toString('hex');
  const hash = scryptSync(password, salt, 64).toString('hex');
  return `${salt}:${hash}`;
}

/** Compara una contraseña en claro con un hash almacenado. */
export function verificarPassword(password: string, almacenado: string): boolean {
  const [salt, hash] = almacenado.split(':');
  if (!salt || !hash) return false;
  const calculado = scryptSync(password, salt, 64);
  const esperado = Buffer.from(hash, 'hex');
  return calculado.length === esperado.length && timingSafeEqual(calculado, esperado);
}

function firmar(payload: string): string {
  return createHmac('sha256', CLAVE_SESION).update(payload).digest('hex');
}

/** Crea un token de sesión firmado con HMAC. */
export function crearTokenSesion(usuarioId: number): string {
  const marca = Date.now().toString();
  return `${usuarioId}.${marca}.${firmar(`${usuarioId}.${marca}`)}`;
}

/** Verifica un token de sesión y devuelve el id de usuario o null. */
export function verificarTokenSesion(token: string): number | null {
  const [id, marca, firma] = token.split('.');
  if (!id || !marca || !firma) return null;
  const esperada = firmar(`${id}.${marca}`);
  const a = Buffer.from(firma);
  const b = Buffer.from(esperada);
  if (a.length !== b.length || !timingSafeEqual(a, b)) return null;
  return Number(id);
}

/** Devuelve el id del usuario con sesión activa, o null si no la hay. */
export async function obtenerUsuarioId(): Promise<number | null> {
  const almacen = await cookies();
  const cookie = almacen.get('sesion');
  if (!cookie?.value) return null;
  return verificarTokenSesion(cookie.value);
}
