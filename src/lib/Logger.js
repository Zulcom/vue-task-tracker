import buildTimeConfig from '@/config/default.json'

const bgColorStyle = (color) => `color: white; background: ${color}; padding: 4px; font-weight: bold; font-size: 0.8em'`

/**  message logger. By default works only on dev mode */
class Logger {
  /**
   * Logger constructor
   *
   * @param verbosityLevel
   * @param showErrorOnProduction
   */
  constructor (verbosityLevel = 'display-everything', showErrorOnProduction = false) {
    this.verbosityLevel = verbosityLevel
    this.showErrorOnProduction = showErrorOnProduction
  }
  /**
   * Inform about debug events happening in the app
   * Don't forget to invoke created function after passing arguments to keep context
   * `Logger.debug(...args)()`
   * @param message
   * @param tag short tag specifying area where message was spawned (eg. cart, sync, module)
   * @param context meaningful data related to this message
   */
  debug (message, tag = null, context = null) {
    if (tag) {
      return console.debug.bind(window.console, '%cTT%c %c' + tag + '%c ' + message, bgColorStyle('grey'), 'color: inherit', bgColorStyle('gray'), 'font-weight: normal', context)
    } else {
      return console.debug.bind(window.console, '%cTT%c ' + message, bgColorStyle('white'), 'font-weight: normal', context)
    }
  }

  /**
   * Inform about log events happening in the app
   * Don't forget to invoke created function after passing arguments to keep context
   * `Logger.log(...args)()`
   * @param message
   * @param tag short tag specifying area where message was spawned (eg. cart, sync, module)
   * @param context meaningful data related to this message
   */
  log (message, tag = null, context = null) {
    return this.info(message, tag, context)
  }

  /**
   * Inform about succesful events happening in the app
   * Don't forget to invoke created function after passing arguments to keep context
   * `Logger.info(...args)()`
   * @param message
   * @param tag short tag specifying area where message was spawned (eg. cart, sync, module)
   * @param context meaningful data related to this message
   */
  info (message, tag = null, context = null) {
    if (tag) {
      return console.log.bind(window.console, '%cTT%c %c' + tag + '%c ' + message, bgColorStyle('green'), 'color: inherit', bgColorStyle('gray'), 'font-weight: bold', context)
    } else {
      return console.log.bind(window.console, '%cTT%c ' + message, bgColorStyle('green'), 'font-weight: bold', context)
    }
  }

  /**
   * Inform about potential problems that may be a cause of app break
   * Don't forget to invoke created function after passing arguments to keep context
   * `Logger.warn(...args)()`
   * @param message
   * @param tag short tag specifying area where message was spawned (eg. cart, sync, module)
   * @param context meaningful data related to this message
   */
  warn (message, tag = null, context = null) {
    if (tag) {
      return console.warn.bind(window.console, '%cTT%c %c' + tag + '%c ' + message, bgColorStyle('orange'), 'color: inherit', bgColorStyle('gray'), 'font-weight: bold', context)
    } else {
      return console.warn.bind(window.console, '%cTT%c ' + message, bgColorStyle('orange'), 'font-weight: bold', context)
    }
  }

  /**
   * Inform about errors that will break the app
   * Don't forget to invoke created function after passing arguments to keep context
   * `Logger.error(...args)()`
   * @param message
   * @param tag short tag specifying area where message was spawned (eg. cart, sync, module)
   * @param context meaningful data related to this message
   */
  error (message, tag = null, context = null) {
    if (tag) {
      return console.error.bind(window.console, '%cTT%c %c' + tag + '%c ' + message, bgColorStyle('red'), 'color: inherit', bgColorStyle('gray'), 'font-weight: bold', context)
    } else {
      return console.error.bind(window.console, '%cTT%c ' + message, bgColorStyle('red'), 'font-weight: bold', context)
    }
  }
}

const logger = new Logger(buildTimeConfig.console.verbosityLevel)
export { logger as Logger }
