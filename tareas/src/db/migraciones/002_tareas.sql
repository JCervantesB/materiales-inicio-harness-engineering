CREATE TABLE tareas (
  id INTEGER PRIMARY KEY AUTOINCREMENT,
  usuario_id INTEGER NOT NULL REFERENCES usuarios(id) ON DELETE CASCADE,
  titulo TEXT NOT NULL,
  descripcion TEXT,
  completada INTEGER NOT NULL DEFAULT 0,
  fecha_vencimiento TEXT,
  creada_en TEXT NOT NULL
);
