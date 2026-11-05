---
name: pruebas-regresion
description: Añade una prueba que protege un comportamiento que se rompió.
---

# Pruebas de regresión

## Cuándo usarla

Cuando se corrige un bug o se detecta que una funcionalidad rompió otra.

## Pasos

1. Identificar el comportamiento que dejó de funcionar.
2. Escribir una prueba que lo describa.
3. Verificar que la prueba falla con el código actual.
4. Corregir el código.
5. Verificar que la prueba pasa.
6. Ejecutar la suite completa.

## Qué significa "terminada"

El comportamiento protegido por una prueba que pasa, y la suite completa en verde.
