# Feedback loops y evaluación (Módulo 7)

## Condiciones de parada

Un ciclo de corrección necesita tanto una forma de continuar como una de
detenerse (Módulo 7.2):

```text
máximo 5 iteraciones por fallo
estado repetido dos veces  →  detener
se supera el presupuesto   →  detener
```

Al detenerse, se escala a una persona con:

```text
evidencia
pruebas en conflicto
historial de intentos
```

## Señales de un ciclo improductivo

- El mismo error reaparece.
- Los mismos estados se repiten.
- Los cambios no reducen el número de archivos tocados.

## Métricas (Módulo 7.3)

Registra la misma tarea en cada configuración del harness:

```text
correcto al final      sí / no
errores detectados     número
regresiones            número
intervenciones humanas número
iteraciones            número
tiempo                 minutos
tokens                 miles
```

## Hoja de comparación (experimento A/B)

```text
                   A (sin harness)   B (con harness)
Tiempo             menor             mayor
Tokens             menor             mayor
Regresiones        ?                 ?
Intervenciones     ?                 ?
Errores tardíos    ?                 ?
```

La conclusión no es "B gana siempre", sino: **este costo adicional compró estas
garantías concretas**.
