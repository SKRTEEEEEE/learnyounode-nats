# Introduction to NATS

## What is NATS?

NATS is a lightweight, high-performance messaging system designed for cloud-native applications. It provides a simple pub/sub model that scales from a single server to a global mesh of servers.

## Core Concepts

### Connection
Before you can communicate with NATS, you need to establish a connection to a NATS server. The server is usually running on `localhost:4222`.

### Graceful Shutdown
When you're done with your connection, always close it properly using `drain()` or `close()`. This ensures:
- Pending messages are sent
- Subscriptions are cleanly terminated
- Resources are properly released

## Getting Started

Install the NATS client:
```sh
npm install nats
```

Start a NATS server (using Docker):
```sh
docker run --rm -p 4222:4222 -p 8222:8222 nats:latest -js
```

## Basic Connection Pattern

The standard async/await pattern:
```js
const { connect } = require('nats')

;(async () => {
  try {
    const nc = await connect()
    // Use the connection here
    await nc.close()
  } catch (err) {
    console.error(err)
  }
})()
```

For more info, visit: https://docs.nats.io/
