# Introduzione a NATS

## Cos'è NATS?

NATS è un sistema di messaggistica leggero e ad alte prestazioni progettato per applicazioni cloud-native. Fornisce un semplice modello pub/sub che scala da un singolo server a una mesh globale.

## Concetti Fondamentali

### Connessione
Prima di comunicare con NATS, devi stabilire una connessione a un server NATS. Il server generalmente gira su `localhost:4222`.

### Chiusura Pulita
Quando hai finito con la tua connessione, chiudila sempre correttamente usando `drain()` o `close()`. Questo assicura:
- I messaggi in sospeso vengono inviati
- Le sottoscrizioni vengono chiuse correttamente
- Le risorse vengono rilasciate correttamente

## Primi Passi

Installa il client NATS:
```sh
npm install nats
```

Avvia un server NATS (usando Docker):
```sh
docker run --rm -p 4222:4222 -p 8222:8222 nats:latest -js
```

## Modello di Connessione di Base

Lo schema standard con async/await:
```js
const { connect } = require('nats')

;(async () => {
  try {
    const nc = await connect()
    // Usa la connessione qui
    await nc.close()
  } catch (err) {
    console.error(err)
  }
})()
```

Per maggiori informazioni, visita: https://docs.nats.io/
