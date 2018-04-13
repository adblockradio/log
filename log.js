var chalk = require('chalk');
var moment = require('moment');

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
require('winston-daily-rotate-file');

var transport = new (winston.transports.DailyRotateFile)({
    filename: 'log/%DATE%',
    datePattern: 'MM-DD',
});

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
            new winston.transports.Console(),
            new winston.transports.File({ filename: 'log/error.log', level: 'error' }),
            transport
        ]
    });

    return {
        log: logger,
        flushLog: function(callback) {
            // TODO
            callback();
        }
    }
}
