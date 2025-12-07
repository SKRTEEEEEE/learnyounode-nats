HOLA NATS — Teoría

NATS es un sistema de mensajería liviano enfocado en la simplicidad y el rendimiento. En este primer ejercicio nos centramos en:

- Conectarse a un servidor NATS.
- Cerrar correctamente la conexión (drain/close).
- Manejar errores de conexión.

Recursos

- Sitio oficial: https://nats.io
- Paquete npm: `nats`

Ejemplo mínimo:

```js
const {connect} = require('nats')

;(async () => {
  const nc = await connect({servers: 'localhost:4222'})
  console.log('Connected to NATS')
  await nc.drain()
  await nc.close()
})().catch(err => {
  console.error(err)
  process.exit(1)
})
```
