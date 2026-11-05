/**
 * Calcula cuántos días enteros faltan para una fecha de vencimiento.
 *
 * NOTA: esta función contiene un bug lógico deliberado (se trabaja en el
 * Módulo 4). Usa `Math.floor`, por lo que una tarea que vence HOY más tarde
 * (por ejemplo, ahora son las 08:00 y vence a las 21:00) devuelve 0 en lugar
 * de 1. Ninguna verificación estática lo detecta: compila y pasa el lint.
 */
export function diasRestantes(fechaVencimiento: Date, ahora: Date = new Date()): number {
  const ms = fechaVencimiento.getTime() - ahora.getTime();
  if (ms < 0) return 0;
  return Math.floor(ms / (1000 * 60 * 60 * 24));
}
