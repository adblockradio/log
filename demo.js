const { log, flushLog } = require("./log.js")("demo");
log.info('info');
log.warn('warn');
log.error('error');
log.debug('alert');
flushLog(() => console.log('flushed'));