HOLA NATS

Objetivo

Conectarse a un servidor NATS y cerrar la conexión correctamente. El script debe imprimir un mensaje de éxito en consola y finalizar sin errores.

Instrucciones

1. Crea un archivo `program.js` que se conecte a un servidor NATS escuchando en `nats://localhost:4222`.
2. Una vez establecida la conexión, imprime en consola `Conectado a NATS` y cierra la conexión.
3. Asegúrate de manejar errores de conexión.

Pistas

Puedes usar el paquete oficial `nats`:

```js
const {connect} = require('nats')

;(async () => {
  const nc = await connect({servers: 'localhost:4222'})
  console.log('Conectado a NATS')
  await nc.drain()
  await nc.close()
})().catch(err => {
  console.error(err)
  process.exit(1)
})
```
