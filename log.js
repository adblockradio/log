//var log = require("loglevel");
//log.setLevel("debug");
//var prefix = require('loglevel-plugin-prefix');
var chalk = require('chalk');
//var fs = require('fs');
//var util = require('util');
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

//prefix.reg(log);
//log.enableAll();

/*prefix.apply(log, {
    format(level, name, timestamp) {
        return `${chalk.gray(`[${timestamp}]`)} ${colors[level.toUpperCase()](level)} ${chalk.green(`${name}:`)}`;
    },
});*/



const WRITE_LOG = true;

/*var logBuf = "";
function writeLog(callback) {
    if (logBuf && WRITE_LOG) {
        fs.appendFile("log/" + moment(new Date()).format("MM-DD"), logBuf, function(err) {
            if (err) console.log("ERROR, could not write log to file log/" + moment(new Date()).format("MM-DD") + " : " + err);
            if (callback) callback();
        });
        logBuf = "";
    } else if (callback) {
        callback();
    }
}*/
/*if (WRITE_LOG) { = setInterval(writeLog, 1000);
}*/

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
        format: alignedWithColorsAndTime, //winston.format.json(),
        transports: [
            new winston.transports.Console(), //{ format: winston.format.simple() }),
            new winston.transports.File({ filename: 'error.log', level: 'error' }),
            transport
        ]
    });


    return {
        log: logger,
        flushLog: function(callback) {
            // TODO
            callback();
        }
        /*) {
            //clearInterval(writeLogInterval);
            writeLog(callback);
        }*/
    }
}
