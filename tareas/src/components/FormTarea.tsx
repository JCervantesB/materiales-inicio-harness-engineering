'use client';

import { useState, type FormEvent } from 'react';
import { useRouter } from 'next/navigation';

export function FormTarea() {
  const [titulo, setTitulo] = useState('');
  const [fechaVencimiento, setFechaVencimiento] = useState('');
  const router = useRouter();

  async function enviar(evento: FormEvent) {
    evento.preventDefault();
    if (!titulo.trim()) return;

    await fetch('/api/tareas', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        titulo: titulo.trim(),
        fechaVencimiento: fechaVencimiento || null,
      }),
    });

    setTitulo('');
    setFechaVencimiento('');
    router.refresh();
  }

  return (
    <form className="form-tarea" onSubmit={enviar}>
      <input
        value={titulo}
        onChange={(evento) => setTitulo(evento.target.value)}
        placeholder="Nueva tarea"
        autoComplete="off"
        required
      />
      <input
        type="date"
        value={fechaVencimiento}
        onChange={(evento) => setFechaVencimiento(evento.target.value)}
        aria-label="Fecha de vencimiento"
      />
      <button type="submit">Añadir</button>
    </form>
  );
}
