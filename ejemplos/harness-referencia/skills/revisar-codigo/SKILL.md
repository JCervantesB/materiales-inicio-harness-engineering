---
name: revisar-codigo
description: Revisa un cambio de código contra las convenciones y herramientas del proyecto.
---

# Revisar código

## Cuándo usarla

Antes de dar una tarea por terminada.

## Pasos

1. Ejecutar `npm run verificar`.
2. Analizar el `diff` del cambio.
3. Revisar las decisiones que no se pueden automatizar (nombres, claridad, alcance).
4. Devolver los hallazgos clasificados por severidad.

## Qué significa "terminada"

Un informe con hallazgos clasificados en: `bloqueante`, `mejora` e `info`.
