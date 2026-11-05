/** Un usuario registrado. */
export interface Usuario {
  id: number;
  email: string;
  nombre: string;
}

/** Una tarea del dashboard. */
export interface Tarea {
  id: number;
  usuarioId: number;
  titulo: string;
  descripcion: string | null;
  completada: boolean;
  fechaVencimiento: string | null;
  creadaEn: string;
}

/** Datos para crear una tarea nueva. */
export interface NuevaTarea {
  titulo: string;
  descripcion?: string;
  fechaVencimiento?: string | null;
}

/** Datos para editar una tarea existente. */
export interface EditarTarea {
  titulo: string;
  descripcion?: string;
  completada?: boolean;
  fechaVencimiento?: string | null;
}
