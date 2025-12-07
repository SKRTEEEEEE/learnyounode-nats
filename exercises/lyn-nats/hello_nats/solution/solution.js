'use strict'
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
