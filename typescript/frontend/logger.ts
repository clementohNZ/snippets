export enum LoggingColor {
  GREY = `#bababa`,
  BLUE = `#4fc1ff`,
  ORANGE = `#ffb04f`,
  RED = `#f84546`,
  PURPLE = `#967ecb`,
}

export enum LoggingType {
  DEBUG = `lube - Debugging`,
  TRACE = `lube - Trace`,
  INFO = `lube - Information`,
  WARNING = `lube - Warning`,
  CRITICAL = `lube - Error`,
}

/**
 * Generates style that wraps {@link LoggingType} in the console
 *
 * @param {LoggingColor} color - The color the logger should have.
 * @returns {string} The css string required to style the logger.
 */
function generateStyle(color: LoggingColor): string {
  // 10/10/2019 - issue inserting enum directly into return string. Have to place in variable first.
  const convertedColor = `${color}`

  return `padding:0.2em 6px;border-radius:4px;background-color:${convertedColor};font-weight:600;color:#333`
}

/**
 * Higher-order function used to generate loggers with their respective styles.
 *
 * @param {LoggingType} type - The type of error. This does not need to match the methods
 * available on DOM {@link Console}.
 * @param {LoggingColor} color - The color the logger should have.
 * @returns {(...thingsToLog: any[]) => void} A wrapped console log function that
 * will have custom styling.
 */
function generateLogger(type: LoggingType, color: LoggingColor = LoggingColor.GREY): (...thingsToLog: any[]) => void {
  // eslint-disable-next-line no-console
  return console.log.bind(null, `%c${type}`, generateStyle(color))
}

const debugLogger = generateLogger(LoggingType.DEBUG, LoggingColor.GREY)
const traceLogger = generateLogger(LoggingType.TRACE, LoggingColor.GREY)
const infoLogger = generateLogger(LoggingType.INFO, LoggingColor.BLUE)
const warningLogger = generateLogger(LoggingType.WARNING, LoggingColor.ORANGE)
const errorLogger = generateLogger(LoggingType.CRITICAL, LoggingColor.RED)

/**
 * Determines the numeric logging level and will enable/disable relevant loggers.
 *
 * @returns {number} The minimum logging level that should be logged out.
 */
/* eslint-disable indent */
function getLoggingLevel(): number {
  const LOG_LEVEL_KEY = `LOG_LEVEL`
  if (localStorage != null) {
    return Number(localStorage.getItem(LOG_LEVEL_KEY)?.toUpperCase())
  } else {
    return 2
  }
}

const info = (message = ``, ...extraThingsToLog: any[]): void => {
  if (getLoggingLevel() <= 2) {
    infoLogger(`${message}\n`, ...extraThingsToLog)
  }
}

const trace = (message = ``, ...extraThingsToLog: any[]): void => {
  if (getLoggingLevel() === 0) {
    traceLogger(`${message}\n`, ...extraThingsToLog)
  }
}

const warn = (message = ``, ...extraThingsToLog: any[]): void => {
  if (getLoggingLevel() <= 3) {
    warningLogger(`${message}\n`, ...extraThingsToLog)
  }
}

const error = (message = ``, exception?: Error | unknown, ...extraThingsToLog: any[]): void => {
  if (getLoggingLevel() <= 4) {
    if (exception) {
      errorLogger(`${message}`, exception, ...extraThingsToLog)
    } else {
      errorLogger(`${message}`, ...extraThingsToLog)
    }
  }
}

const debug = (message = ``, ...extraThingsToLog: any[]): void => {
  if (getLoggingLevel() <= 1) {
    debugLogger(`${message}\n`, ...extraThingsToLog)
  }
}

const Logger = {
  debug,
  trace,
  info,
  warn,
  error,
}

export default Logger
