'use strict'
let exercise = require('workshopper-exercise/basic')
const comparestdout = require('workshopper-exercise/comparestdout')

// Execute the solution and submission, comparing stdout
const execute = require('workshopper-exercise/execute')
exercise = execute(exercise)
exercise = comparestdout(exercise)

// Setup: no special setup needed for basic NATS test
exercise.addSetup(function (mode, callback) {
  // mode == 'run' || 'verify'
  // NATS exercise is simple - just execute and check output
  process.nextTick(callback)
})

module.exports = exercise

// Setup: no special setup needed for basic NATS test
exercise.addSetup(function (mode, callback) {
  // mode == 'run' || 'verify'
  // NATS exercise is simple - just execute and check output
  process.nextTick(callback)
})

module.exports = exercise
