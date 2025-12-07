HELLO NATS

Obiettivo

Connettersi a un server NATS e chiudere correttamente la connessione. Lo script deve stampare un messaggio di successo sulla console e terminare senza errori.

Istruzioni

1. Crea un file `program.js` che si connetta a un server NATS in `nats://localhost:4222`.
2. Una volta stabilita la connessione, stampa `Connesso a NATS` sulla console e chiudi la connessione.
3. Gestisci gli errori di connessione.

Suggerimento

Puoi usare il pacchetto ufficiale `nats`:

```js
const {connect} = require('nats')

;(async () => {
  const nc = await connect({servers: 'localhost:4222'})
  console.log('Connesso a NATS')
  await nc.drain()
  await nc.close()
})().catch(err => {
  console.error(err)
  process.exit(1)
})
```
