// Corrección de src/lib/fechas.ts (Módulo 4.1).
// El bug: usar `Math.floor` hacía que una tarea que vence HOY más tarde
// devolviera 0 días. La corrección es redondear hacia arriba con `Math.ceil`.

export function diasRestantes(fechaVencimiento: Date, ahora: Date = new Date()): number {
  const ms = fechaVencimiento.getTime() - ahora.getTime();
  if (ms < 0) return 0;
  return Math.ceil(ms / (1000 * 60 * 60 * 24));
}
