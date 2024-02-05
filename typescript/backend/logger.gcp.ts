/* eslint-disable no-console */
import { LoggingBunyan } from "@google-cloud/logging-bunyan"
import * as bunyan from "bunyan"
import { Stream } from "bunyan"

const streams: Stream[] = []

// If we are running in the development environment, use a normal stdout log that is
// formatted for short output instead of printing out the full json
if (process.env.NODE_ENV !== `development`) {
  // Create a Bunyan logger that streams to Cloud Logging
  // Logs will be written to: "projects/YOUR_PROJECT_ID/logs/bunyan_log"
  const loggingBunyan = new LoggingBunyan()

  // Log to the console at 'info' and above
  streams.push({ stream: process.stdout, level: `info` })
  // And log to Cloud Logging, logging at 'info' and above
  streams.push(loggingBunyan.stream(`info`))
} else {
  streams.push({ type: `raw`, stream: localShortOutputStream(), level: `debug` })
}

/* eslint-disable indent */
/**
 * Create a logging stream for local development.
 *
 * We don't want to instantiate the Google Cloud Bunyan instance locally
 * because it immediately tries to connect to the GCP API, which fails locally if you
 * don't have the Service Account Credentials configured.
 *
 * This stream also formats the output such that it no longer prints json, but a more
 * readable output.
 *
 * @returns {any} valid stream for bunyan
 */
function localShortOutputStream(): any {
  return {
    write: (log: any): any => {
      log.time = new Date().valueOf()
      log._timeStamp = new Date().toLocaleDateString()

      let logLevel = `info`

      switch (log.level) {
        case 20:
          logLevel = `debug`
          break
        case 50:
          logLevel = `error`
          break
        case 60:
          logLevel = `fatal`
          break
      }

      // format local log output
      const time = new Date().toLocaleString()
      const logMsg = `${time} | ${logLevel} ====> ${log.msg}`

      // use appropriate console logger based on the log level
      if (log.level === 20) console.debug(logMsg)
      if (log.level < 50) console.info(logMsg)
      if (log.level >= 50) console.error(logMsg)
    },
  }
}

const logger = bunyan.createLogger({
  // The JSON payload of the log as it appears in Cloud Logging
  // will contain "name": "lube-be"
  name: `lube-be`,
  streams,
})

export default logger
