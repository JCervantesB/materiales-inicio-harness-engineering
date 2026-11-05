'use client';

import { useState, type FormEvent } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';

export default function LoginPage() {
  const router = useRouter();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');

  async function enviar(evento: FormEvent) {
    evento.preventDefault();
    setError('');

    const res = await fetch('/api/auth/login', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ email, password }),
    });

    if (!res.ok) {
      const datos = await res.json().catch(() => ({}));
      setError(datos.error ?? 'Error al iniciar sesión');
      return;
    }

    router.push('/dashboard');
  }

  return (
    <main className="auth">
      <h1>Iniciar sesión</h1>
      <form onSubmit={enviar}>
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
        <button type="submit">Entrar</button>
      </form>
      {error && <p className="error">{error}</p>}
      <p>
        ¿No tienes cuenta? <Link href="/register">Regístrate</Link>
      </p>
    </main>
  );
}
