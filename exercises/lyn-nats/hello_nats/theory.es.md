# Introducción a NATS

## ¿Qué es NATS?

NATS es un sistema de mensajería ligero y de alto rendimiento diseñado para aplicaciones cloud-native. Proporciona un modelo pub/sub simple que escala desde un único servidor hasta una malla global.

## Conceptos Fundamentales

### Conexión
Antes de comunicarte con NATS, necesitas establecer una conexión a un servidor NATS. El servidor generalmente corre en `localhost:4222`.

### Cierre Limpio
Cuando termines con tu conexión, siempre ciérrala correctamente usando `drain()` o `close()`. Esto asegura:
- Los mensajes pendientes se envíen
- Las suscripciones se cierren correctamente
- Los recursos se liberen adecuadamente

## Primeros Pasos

Instala el cliente NATS:
```sh
npm install nats
```

Inicia un servidor NATS (usando Docker):
```sh
docker run --rm -p 4222:4222 -p 8222:8222 nats:latest -js
```

## Patrón Básico de Conexión

El patrón estándar con async/await:
```js
const { connect } = require('nats')

;(async () => {
  try {
    const nc = await connect()
    // Usa la conexión aquí
    await nc.close()
  } catch (err) {
    console.error(err)
  }
})()
```

Para más información, visita: https://docs.nats.io/
