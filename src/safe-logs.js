/* eslint-disable import/no-extraneous-dependencies, import/no-unresolved */
import fs from 'fs-extra';
import url from 'url';
import path from 'path';
/* eslint-disable import/no-extraneous-dependencies, import/no-unresolved */
import { protocol } from 'electron';
import safeApp from '@maidsafe/safe-node-app';
import safeCss from './safe-pages.css';

import logListTemplate  from './log-list-template.ejs';
import logTemplate  from './log-template.ejs';
import errorTemplate  from './error-template.ejs';

let appObj = null;


/**
 * Get the browser logfile from appObj
 * @param  {Object} appObj safeAppp instance
 * @return {Promise} resolves to the app log path
 */
export const getLogs = (appObj) => {
  return new Promise((resolve, reject) => {
    if (appObj) {
      return appObj.logPath()
        .then(resolve)
        .catch(reject);
    } else {
      return reject(new Error('Unexpected error. SAFE App connection not ready'));
    }
  });
};


/**
 * Return the size of the log file given
 * @param  {String} filePath full system path to the log filePath
 * @return {Int} logfile size in MB
 */
function getLogSize(filePath) {
  const stats = fs.statSync(filePath);
  const fileSizeInBytes = stats["size"];
  // Convert the file size to megabytes (optional)
  return fileSizeInBytes;
}

/**
 * Get the list of all logs stored on the file system, uses safeApp to get log folder from
 * the default log file.
 * @param  {String} appObj safeApp instance
 * @return {Array} all log files
 */
function getLogsList(appObj) {
  return getLogs(appObj)
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
        .sort( (a, b) =>  fs.statSync( a ).mtime.getTime() -  fs.statSync( b ).mtime.getTime() )
        .forEach((file) => {
          const name = path.basename(file);
          const size = getLogSize( file );

          const logFile = {
            file,
            name,
            size
          };

          logFiles.push(logFile);
        });

      resolve(logFiles);
    });
  })
}


/**
 * Renders the log list using the log template
 * @param  {Object} appObj safeApp instance
 * @param  {Function} cb protocol request callback
 * @return {[type]}           the callback
 */
function showLogList(appObj, cb) {
  getLogsList(appObj)
  .then((logList) => {

    const page = logListTemplate({ logList, css: safeCss });

    return cb({ mimeType: 'text/html', data: Buffer.from(page) });
  })
  .catch(console.error);
}


/**
 * Setup the protocol for logs, and if needed, retrieve all logs / return
 * the log page.
 * @param  {Object} appObj safeApp instance
 */
export function setupSafeLogProtocol(appObj) {
  protocol.registerBufferProtocol('safe-logs', (request, cb) => {
    const fileName = request.url.split('safe-logs:')[1];

    if (fileName === 'list') {
      showLogList(appObj, cb);
    } else {
      getLogs(appObj)
      .then((defaultLog) => {
        const logsDir = path.dirname(defaultLog);
        const logFile = path.resolve(logsDir, fileName);

        fs.readFile(logFile, 'utf-8', (err, logString ) => {
          if (err) {

            //show error page
            throw err;
          }

          if( logString  )
          {
            const page = logTemplate({
              title: `${fileName}:`,
              css: safeCss,
              body: logString
            });
            cb( { mimeType: 'text/html', data: Buffer.from ( page ) } );
          }
          else
          {
            const page = errorTemplate({ message: 'Logfile is empty.', css: safeCss });
            cb( { mimeType: 'text/html', data: Buffer.from ( page ) } );
          }
        });
      });
    }
  });
}
