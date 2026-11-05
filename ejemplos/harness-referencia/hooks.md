# Hooks (Módulo 3)

Un hook es un script que se ejecuta cuando ocurre un evento del flujo de
trabajo. La señal de control es el **código de salida**:

```text
exit code 0    → todo bien
exit code ≠ 0  → fallo: avisar al agente (o bloquear la operación)
```

## Tipos de hooks

```text
Hook del agente   → trabaja DURANTE la sesión (tras editar, antes de terminar).
Git hook          → trabaja ALREDEDOR del commit (pre-commit, pre-push).
```

No compiten: protegen momentos distintos.

## Ejemplo 1 · Hook del agente: validar tras editar un `.ts`

El evento "se editó un archivo" dispara un chequeo de tipos **solo de ese
archivo** (Módulo 3.2: filtrar para no validar de más).

```bash
#!/usr/bin/env bash
# hook-tras-editar.sh <archivo>
archivo="$1"
case "$archivo" in
  *.ts|*.tsx) npx tsc --noEmit --pretty false ;;  # falla → código ≠ 0
  *) exit 0 ;;
esac
```

## Ejemplo 2 · Hook del agente: bloqueo de operación prohibida

Antes de ejecutar un comando destructivo, se intercepta (Módulo 3.2).

```bash
#!/usr/bin/env bash
# hook-antes-comando.sh <comando>
case "$1" in
  *"rm -rf"*migrations*) echo "BLOCKED: migraciones protegidas"; exit 1 ;;
  *) exit 0 ;;
esac
```

## Ejemplo 3 · Git hook (pre-commit)

```bash
#!/usr/bin/env bash
# .git/hooks/pre-commit
npm run verificar || { echo "Verificación fallida. Corrige antes de commitear."; exit 1; }
```

## Reglas de diseño (Módulos 3.2 y 3.3)

- **Filtra por archivo**: no ejecutes la suite completa tras cada cambio.
- **Comunica**: el mensaje debe decir qué falló, en qué archivo y qué hacer.
- **Evita ciclos**: si una corrección vuelve a disparar el hook, pon un límite
  (por ejemplo, 3 intentos) y después escala.
