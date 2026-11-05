---
name: crear-feature
description: Implementa una funcionalidad nueva siguiendo pruebas primero y verificación al final.
---

# Crear feature

## Cuándo usarla

Cuando se pide una funcionalidad nueva o un cambio de comportamiento.

## Pasos

1. Escribir la prueba que describe el comportamiento esperado (RED).
2. Revisar la prueba antes de implementar.
3. Implementar lo mínimo para que pase (GREEN).
4. Ejecutar `npm run verificar`.
5. Corregir solo los errores detectados.
6. Ejecutar `npm run verificar:todo` antes de terminar.

## Qué significa "terminada"

Pruebas en verde y `verificar:todo` sin errores. No se modifican las pruebas
para ocultar un fallo.
