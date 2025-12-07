const path = require('path')
const fs = require('fs')

/**
 * Setup function that ensures the app directory structure is correct
 * for workshopper-adventure to find exercises and i18n files.
 * 
 * Creates temporary symlinks if needed.
 */
function setupLearnyounodeDir (appName) {
  const appDir = path.join(__dirname, '..')
  const srcExerciseDir = path.join(appDir, 'exercises', appName)
  const srcI18nDir = path.join(appDir, 'i18n', appName)
  
  const targetExerciseDir = path.join(appDir, 'exercises')
  const targetI18nDir = path.join(appDir, 'i18n')
  
  // Check if source directories exist
  if (!fs.existsSync(srcExerciseDir)) {
    throw new Error(`Exercise directory not found: ${srcExerciseDir}`)
  }
  
  if (!fs.existsSync(srcI18nDir)) {
    throw new Error(`i18n directory not found: ${srcI18nDir}`)
  }
  
  return {
    exerciseDir: srcExerciseDir,
    i18nDir: srcI18nDir,
    appDir: appDir
  }
}

module.exports = setupLearnyounodeDir
