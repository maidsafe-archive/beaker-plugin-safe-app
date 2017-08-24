/* eslint-disable import/no-extraneous-dependencies, import/no-unresolved */
import fs from 'fs-extra';
import url from 'url';
import path from 'path';
/* eslint-disable import/no-extraneous-dependencies, import/no-unresolved */
import { protocol } from 'electron';
import safeApp from 'safe-app';
import safeCss from './safe-pages.css';

const logListTemplate = require('./log-list-template.ejs');

let appObj = null;


/**
 * Get the browser logfile from appObj
 * @param  { String } appToken app token
 * @return { Promise }        resolves to the app log path
 */
export const getLogs = (appInfo, attempt = 0) => {

  return new Promise((resolve, reject) => {
    if (appObj) {
      appObj.logPath()
      .then(resolve)
      .catch(reject);
    } else {
      safeApp.initializeApp(appInfo)
      .then((app) => {
        appObj = app;
        return getLogs();
      })
      .catch(reject);
    }
  });
};


/**
 * Get the list of all logs stored on the file system, uses safeApp to get log folder from
 * the default log file.
 * @param  {String}   appInfo safe app info
 * @return {Array}    all log files
 */
function getLogsList(appInfo) {

  return getLogs(appInfo)
  .then((defaultLog) => {
    const logsDir = path.dirname(defaultLog);
    const logFiles = [];

    return new Promise((resolve, reject) => {
      const files = fs.readdirSync(logsDir, 'utf-8');
      files.map((file) => path.join(logsDir, file) )
        .filter((file) => {
          const ext = path.extname(file);
          return ext === '.log';
        })
        .forEach((file) => {
          const name = path.basename(file);
          const logFile = {
            file,
            name
          };
          logFiles.push(logFile);
        });

      resolve(logFiles);
    });
  })
}

/**
 * Renders the log list using the log template
 * @param  { Object }   appInfo safe app ingo
 * @param  {Function} cb      protocol request callback
 * @return {[type]}           the callback
 */
function showLogList(appInfo, cb) {
  getLogsList(appInfo)
  .then((logList) => {

    const page = logListTemplate({ logList, css: safeCss });

    return cb({ mimeType: 'text/html', data: Buffer.from(page) });
  })
  .catch(console.error);
}


/**
 * Setup the protocol for logs, and if needed, retrieve all logs / return
 * the log page.
 * @param  {Object} appInfo safe app ingo
 */
export function setupSafeLogProtocol(appInfo) {
  getLogs(appInfo);

  protocol.registerBufferProtocol('safe-logs', (request, cb) => {
    const fileName = request.url.split('safe-logs:')[1];

    if (fileName === 'list') {
      showLogList(appInfo, cb);
    } else {
      getLogs(appInfo)
      .then((defaultLog) => {
        const logsDir = path.dirname(defaultLog);
        const logFile = path.resolve(logsDir, fileName);

        fs.readFile(logFile, (err, logBuffer) => {
          if (err) {
            throw err;
          }
          cb(logBuffer);
        });
      });
    }
  });
}
