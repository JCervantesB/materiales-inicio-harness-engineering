import { obtenerBase } from './conexion';
import type { Usuario } from '@/lib/tipos';

/** Usuario incluyendo el hash de contraseña (solo para verificación de login). */
export interface UsuarioConHash extends Usuario {
  passwordHash: string;
}

export function crearUsuario(email: string, nombre: string, passwordHash: string): Usuario {
  const db = obtenerBase();
  const info = db
    .prepare('INSERT INTO usuarios (email, nombre, password_hash, creado_en) VALUES (?, ?, ?, ?)')
    .run(email, nombre, passwordHash, new Date().toISOString());
  return { id: Number(info.lastInsertRowid), email, nombre };
}

export function obtenerUsuarioPorEmail(email: string): UsuarioConHash | null {
  const db = obtenerBase();
  const fila = db
    .prepare(
      'SELECT id, email, nombre, password_hash AS passwordHash FROM usuarios WHERE email = ?'
    )
    .get(email) as UsuarioConHash | undefined;
  return fila ?? null;
}

export function obtenerUsuarioPorId(id: number): Usuario | null {
  const db = obtenerBase();
  const fila = db
    .prepare('SELECT id, email, nombre FROM usuarios WHERE id = ?')
    .get(id) as Usuario | undefined;
  return fila ?? null;
}
