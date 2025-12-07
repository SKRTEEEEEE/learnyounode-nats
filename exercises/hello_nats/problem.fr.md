HELLO NATS

Objectif

Se connecter à un serveur NATS et fermer correctement la connexion. Le script doit afficher un message de succès dans la console et se terminer sans erreur.

Instructions

1. Créez un fichier `program.js` qui se connecte à un serveur NATS écoutant sur `nats://localhost:4222`.
2. Une fois la connexion établie, affichez `Connecté à NATS` dans la console et fermez la connexion.
3. Gérez les erreurs de connexion.

Astuce

Vous pouvez utiliser le paquet officiel `nats` :

```js
const {connect} = require('nats')

;(async () => {
  const nc = await connect({servers: 'localhost:4222'})
  console.log('Connecté à NATS')
  await nc.drain()
  await nc.close()
})().catch(err => {
  console.error(err)
  process.exit(1)
})
```
