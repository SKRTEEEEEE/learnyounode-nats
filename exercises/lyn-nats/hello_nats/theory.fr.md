# Introduction à NATS

## Qu'est-ce que NATS?

NATS est un système de messagerie léger et haute performance conçu pour les applications cloud-native. Il fournit un modèle pub/sub simple qui s'étend d'un seul serveur à une maille mondiale.

## Concepts Fondamentaux

### Connexion
Avant de communiquer avec NATS, vous devez établir une connexion à un serveur NATS. Le serveur s'exécute généralement sur `localhost:4222`.

### Fermeture Propre
Lorsque vous avez terminé avec votre connexion, fermez-la toujours correctement en utilisant `drain()` ou `close()`. Cela assure:
- Les messages en attente sont envoyés
- Les souscriptions sont fermées correctement
- Les ressources sont libérées correctement

## Premiers Pas

Installez le client NATS:
```sh
npm install nats
```

Démarrez un serveur NATS (avec Docker):
```sh
docker run --rm -p 4222:4222 -p 8222:8222 nats:latest -js
```

## Modèle de Connexion de Base

Le modèle standard avec async/await:
```js
const { connect } = require('nats')

;(async () => {
  try {
    const nc = await connect()
    // Utilisez la connexion ici
    await nc.close()
  } catch (err) {
    console.error(err)
  }
})()
```

Pour plus d'informations, visitez: https://docs.nats.io/
