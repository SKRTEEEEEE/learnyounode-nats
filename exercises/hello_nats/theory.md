HELLO NATS — Theory

NATS is a lightweight messaging system focused on simplicity and performance. In this first exercise we focus on:

- Connecting to a NATS server.
- Closing the connection cleanly (drain/close).
- Handling connection errors.

Resources

- Official site: https://nats.io
- npm package: `nats`

Minimal example:

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
