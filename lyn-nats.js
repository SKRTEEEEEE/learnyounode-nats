const path = require('path')
const fs = require('fs')

const appDir = __dirname
const exerciseDir = path.join(appDir, 'exercises', 'lyn-nats')
const i18nDir = path.join(appDir, 'i18n', 'lyn-nats')

const lynNats = require('workshopper-adventure')({
  appDir: appDir,
  exerciseDir: exerciseDir,
  languages: ['en', 'es', 'fr', 'it'],
  header: require('workshopper-adventure/default/header'),
  footer: require('workshopper-adventure/default/footer'),
  fail: require('workshopper-adventure/default/fail'),
  pass: require('workshopper-adventure/default/pass')
})

// Patch i18n to prefer translations under i18n/lyn-nats when available
if (fs.existsSync(i18nDir)) {
  try {
    const i18nCore = require('i18n-core')
    const i18nFs = require('i18n-core/lookup/fs')

    const lookup = i18nFs(i18nDir)
    const i18nInstance = i18nCore(lookup)

    const originalPrint = lynNats.print
    lynNats.print = function (stream, context) {
      if (context) {
        const currentLang = lynNats.i18n && lynNats.i18n.lang ? lynNats.i18n.lang() : 'en'
        const newI18n = i18nInstance.section(currentLang, true)
        const originalTranslate = context.__
        context.__ = function (key, values) {
          const result = newI18n(key, values)
          return result !== key ? result : originalTranslate(key, values)
        }
      }
      return originalPrint.call(this, stream, context)
    }
  } catch (e) {
    // continue with defaults if patch fails
    console.warn('lyn-nats: could not setup custom i18n:', e.message)
  }
}

// Register exercises. Start with HELLO NATS
lynNats.addAll([
  'HELLO NATS'
])

module.exports = lynNats
