const chalk = require('chalk');
const moment = require('moment');

// #### logging decoration ####
// see https://github.com/kutuluk/loglevel-plugin-prefix
/*const colors = {
  TRACE: chalk.magenta,
  DEBUG: chalk.cyan,
  INFO: chalk.blue,
  WARN: chalk.yellow,
  ERROR: chalk.red,
};*/

const WRITE_LOG = true;
const winston = require("winston");
const { format } = require('logform');
const DailyRotateFile = require('winston-daily-rotate-file');

const transportConsole = new winston.transports.Console();
const transportFileError = new winston.transports.File({ filename: 'log/error.log', level: 'error' });
const transportFileRegular = new DailyRotateFile({ filename: 'log/%DATE%', datePattern: 'MM-DD' });

// to avoid annoying warnings such as
// (node:3666) MaxListenersExceededWarning: Possible EventEmitter memory leak detected. 11 unpipe listeners added. Use emitter.setMaxListeners() to increase limit
// when log is used in a project with more than 10 modules.
transportConsole.setMaxListeners(100);
transportFileError.setMaxListeners(100);
transportFileRegular.setMaxListeners(100);

module.exports = function(moduleName) {

    const alignedWithColorsAndTime = format.combine(
        format.colorize(),
        format.timestamp(),
        format.align(),
        format.printf(info => `${chalk.gray(`[${info.timestamp}]`)} ${info.level} ${chalk.cyan(`${moduleName}`)}: ${info.message}`)
    );

    const logger = winston.createLogger({
        level: 'debug',
        format: alignedWithColorsAndTime,
        transports: [
            transportConsole,
            transportFileError,
            transportFileRegular
        ]
    });

    return {
        log: logger,
        flushLog: function(callback) {
            // TODO https://github.com/winstonjs/winston#awaiting-logs-to-be-written-in-winston
            callback();
        }
    }
}
