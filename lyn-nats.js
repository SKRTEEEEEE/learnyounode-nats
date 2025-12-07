const path = require('path')
const fs = require('fs')
const readline = require('readline')

const appDir = __dirname
const exerciseDir = path.join(appDir, 'exercises', 'lyn-nats')

const lynNats = require('workshopper-adventure')({
  appDir: appDir,
  exerciseDir: exerciseDir,
  languages: ['en', 'es', 'fr', 'it'],
  header: require('workshopper-adventure/default/header'),
  footer: require('workshopper-adventure/default/footer'),
  fail: require('workshopper-adventure/default/fail'),
  pass: require('workshopper-adventure/default/pass')
})

// Function to get theory content for an exercise
function getTheoryContent (exerciseName, lang) {
  const exerciseDirName = exerciseName.toLowerCase().replace(/\s+/g, '_')
  const exercisePath = path.join(appDir, 'exercises', 'lyn-nats', exerciseDirName)

  const theoryFile = path.join(exercisePath, `theory.${lang}.md`)
  const theoryFileEn = path.join(exercisePath, 'theory.en.md')

  if (fs.existsSync(theoryFile)) {
    return fs.readFileSync(theoryFile, 'utf8')
  } else if (fs.existsSync(theoryFileEn)) {
    return fs.readFileSync(theoryFileEn, 'utf8')
  }

  return null
}

// Function to display theory in a formatted way
function displayTheory (exerciseName, lang) {
  const theoryContent = getTheoryContent(exerciseName, lang)

  if (!theoryContent) {
    console.log('Theory not found for this exercise.')
    return
  }

  console.log('\n')
  console.log('   ')
  console.log(' # LEARN YOU THE NATS!')
  console.log('   ')
  console.log(' ## ' + exerciseName.toUpperCase() + ' - THEORY')
  console.log('   ')
  theoryContent.split('\n').forEach(line => {
    console.log('  ' + line)
  })
  console.log('   ')
  console.log(' ─────────────────────────────────────────────────────────────────────────────')
  console.log('   ')
  console.log(' » To see the problem again, run: lyn-nats select ' + exerciseName.toLowerCase().replace(/\s+/g, '-'))
  console.log(' » To execute your program, run: lyn-nats run program.js')
  console.log(' » To verify your program, run: lyn-nats verify program.js')
  console.log(' » For help run: lyn-nats help')
  console.log('   ')
}

// Store reference to original execute
const originalExecute = lynNats.execute.bind(lynNats)

// Override execute to intercept 'print' command and show menu
lynNats.execute = function (args) {
  if (args && args[0] === 'print') {
    // Get the current exercise name
    const currentExerciseName = lynNats.appStorage.get('current')

    if (currentExerciseName) {
      // Show menu to choose between problem and theory
      const rl = readline.createInterface({
        input: process.stdin,
        output: process.stdout
      })

      // Display styled menu
      console.log('   ')
      console.log(' ─────────────────────────────────────────────────────────────────────────────')
      console.log('   ')
      console.log(' What would you like to see?')
      console.log('   ')
      console.log('  problem: See the exercise problem')
      console.log('  theory:  Read the theoretical content first')
      console.log('   ')
      console.log(' ─────────────────────────────────────────────────────────────────────────────')
      console.log('   ')

      rl.question(' Choose (problem/theory): ', (choice) => {
        rl.close()

        const input = choice.toLowerCase().trim()

        if (input === 'problem' || input === 'p' || input === '1' || input === '') {
          // Show problem - call original execute
          return originalExecute(['print'])
        } else if (input === 'theory' || input === 't' || input === '2') {
          // Show theory
          const lang = lynNats.i18n && lynNats.i18n.lang ? lynNats.i18n.lang() : 'en'
          displayTheory(currentExerciseName, lang)
          process.exit(0)
        } else {
          console.log('\n Invalid choice. Exiting.\n')
          process.exit(0)
        }
      })
      return
    }
  }

  // Otherwise use original execute
  return originalExecute(args)
}

// Register exercises. Start with HELLO NATS
lynNats.addAll([
  'HELLO NATS'
])

module.exports = lynNats
