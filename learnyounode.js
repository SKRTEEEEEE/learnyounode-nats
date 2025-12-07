const path = require('path')
const fs = require('fs')

const appDir = __dirname
const exerciseDir = path.join(appDir, 'exercises', 'learnyounode')
const i18nDir = path.join(appDir, 'i18n', 'learnyounode')

const learnyounode = require('workshopper-adventure')({
  appDir: appDir,
  exerciseDir: exerciseDir,
  languages: ['en', 'es', 'fr', 'ja', 'zh-cn', 'zh-tw', 'pt-br', 'ru', 'uk', 'vi', 'ko', 'nb-no', 'it', 'tr'],
  header: require('workshopper-adventure/default/header'),
  footer: require('workshopper-adventure/default/footer'),
  fail: require('workshopper-adventure/default/fail'),
  pass: require('workshopper-adventure/default/pass')
})

// Patch the i18n loading to use the custom i18nDir
if (fs.existsSync(i18nDir)) {
  try {
    const i18nCore = require('i18n-core')
    const i18nFs = require('i18n-core/lookup/fs')
    const i18nExtend = require('i18n-core/lookup/extend')
    
    // Create a new i18n instance with the custom directory
    const lookup = i18nFs(i18nDir)
    const i18nInstance = i18nCore(lookup)
    
    // Replace the print function to use the new i18n
    const originalPrint = learnyounode.print
    learnyounode.print = function (stream, context) {
      // Inject custom i18n into context
      if (context) {
        const currentLang = learnyounode.i18n.lang()
        const newI18n = i18nInstance.section(currentLang, true)
        
        // Override the __ function in context
        const originalTranslate = context.__
        context.__ = function (key, values) {
          const result = newI18n(key, values)
          return result !== key ? result : originalTranslate(key, values)
        }
      }
      return originalPrint.call(this, stream, context)
    }
  } catch (e) {
    // If custom i18n setup fails, continue with defaults
    console.warn('Warning: Could not setup custom i18n:', e.message)
  }
}

learnyounode.addAll([
  'HELLO WORLD',
  'BABY STEPS',
  'MY FIRST I/O!',
  'MY FIRST ASYNC I/O!',
  'FILTERED LS',
  'MAKE IT MODULAR',
  'HTTP CLIENT',
  'HTTP COLLECT',
  'JUGGLING ASYNC',
  'TIME SERVER',
  'HTTP FILE SERVER',
  'HTTP UPPERCASERER',
  'HTTP JSON API SERVER'
])

module.exports = learnyounode
