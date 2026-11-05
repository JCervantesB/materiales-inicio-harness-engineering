'use client';

import { useState, type FormEvent } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';

export default function RegisterPage() {
  const router = useRouter();
  const [nombre, setNombre] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');

  async function enviar(evento: FormEvent) {
    evento.preventDefault();
    setError('');

    const res = await fetch('/api/auth/register', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ nombre, email, password }),
    });

    if (!res.ok) {
      const datos = await res.json().catch(() => ({}));
      setError(datos.error ?? 'Error al registrarse');
      return;
    }

    router.push('/login');
  }

  return (
    <main className="auth">
      <h1>Crear cuenta</h1>
      <form onSubmit={enviar}>
        <input
          value={nombre}
          onChange={(evento) => setNombre(evento.target.value)}
          placeholder="Nombre"
          required
        />
        <input
          type="email"
          value={email}
          onChange={(evento) => setEmail(evento.target.value)}
          placeholder="Email"
          required
        />
        <input
          type="password"
          value={password}
          onChange={(evento) => setPassword(evento.target.value)}
          placeholder="Contraseña"
          required
        />
        <button type="submit">Crear cuenta</button>
      </form>
      {error && <p className="error">{error}</p>}
      <p>
        ¿Ya tienes cuenta? <Link href="/login">Inicia sesión</Link>
      </p>
    </main>
  );
}
