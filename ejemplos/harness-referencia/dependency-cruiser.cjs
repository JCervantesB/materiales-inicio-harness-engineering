// Regla arquitectónica (Módulo 2.2).
// La capa de interfaz no debe acceder directamente a la base de datos:
// debe pasar por `services/`.
//
// Uso: `depcruise src` (o `npm run dep-cruiser`).

module.exports = {
  forbidden: [
    {
      name: 'componentes-no-tocan-db',
      comment: 'Los componentes de interfaz no deben importar desde la capa de datos.',
      severity: 'error',
      from: { path: '^src/components' },
      to: { path: '^src/db' },
    },
    // Opcional: extender la frontera también a las páginas y rutas de la API.
    // {
    //   name: 'app-no-toca-db',
    //   comment: 'Las páginas y rutas no deben importar desde la capa de datos.',
    //   severity: 'error',
    //   from: { path: '^src/app' },
    //   to: { path: '^src/db' },
    // },
  ],
  options: {
    doNotFollow: { path: 'node_modules' },
    tsPreCompilationDeps: true,
    tsConfig: { fileName: 'tsconfig.json' },
  },
};
