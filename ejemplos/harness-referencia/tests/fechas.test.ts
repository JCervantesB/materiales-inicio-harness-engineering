// Pruebas de comportamiento (Módulo 4.1) + regresión (Módulo 4.3).
// Cópialo en `tareas/src/lib/fechas.test.ts`.
import { describe, it, expect } from 'vitest';
import { diasRestantes } from './fechas';

describe('diasRestantes', () => {
  it('devuelve 1 día cuando la tarea vence hoy más tarde', () => {
    const ahora = new Date('2026-10-06T08:00:00');
    const vence = new Date('2026-10-06T21:00:00');
    expect(diasRestantes(vence, ahora)).toBe(1);
  });

  it('devuelve 0 cuando la tarea ya venció', () => {
    const ahora = new Date('2026-10-06T12:00:00');
    const vence = new Date('2026-10-05T12:00:00');
    expect(diasRestantes(vence, ahora)).toBe(0);
  });

  it('devuelve el número de días enteros cuando faltan varios días', () => {
    const ahora = new Date('2026-10-06T12:00:00');
    const vence = new Date('2026-10-09T12:00:00');
    expect(diasRestantes(vence, ahora)).toBe(3);
  });

  describe('regresión (Módulo 4.3)', () => {
    // Este caso describe el bug original (usaba `floor` y devolvía 0).
    // Es la prueba que impide que el bug vuelva a aparecer.
    it('una tarea que vence hoy más tarde NO devuelve 0', () => {
      const ahora = new Date('2026-10-06T08:00:00');
      const vence = new Date('2026-10-06T23:59:00');
      expect(diasRestantes(vence, ahora)).toBeGreaterThan(0);
    });
  });
});
