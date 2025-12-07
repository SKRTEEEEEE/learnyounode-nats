HOLA NATS

Objective

Connect to a NATS server and close the connection cleanly. The script should print a success message to the console and exit without errors.

Instructions

1. Create a file named `program.js` that connects to a NATS server at `nats://localhost:4222`.
2. When the connection is established, print `Connected to NATS` to stdout and then close the connection.
3. Handle connection errors and exit with a non-zero status if an error occurs.

Hints

You can use the official `nats` package. Example:

```js
const { connect } = require('nats')

;(async () => {
  try {
    const nc = await connect({ servers: 'localhost:4222' })
    console.log('Connected to NATS')
    await nc.drain()
    await nc.close()
  } catch (err) {
    console.error(err)
    process.exit(1)
  }
})()
```
