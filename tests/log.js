$(function() {
    var log = require('logger4js');

    log.log(log.levels.info(), 'something string');
    log.log(log.levels.warning(), 'something with object', {
        fabuleux: 'object',
        nb: 2
    });
    log.error('some error');

    var anotherLogger = new log.Logger({
        name: "123Logger",
        levels: new log.Levels(['one', 'two', 'tree'])
    });
    anotherLogger.two('log from another log');

    var floorLogger = new log.Logger({
        name: "floorLogger",
        levels: ['1stfloor', '2floor', 'topfloor']
    });
    floorLogger.topfloor('log from another log again');

    log.info('restrict some log to error');
    log.actualLvl = log.levels.error();
    log.debug('do not show');
    log.info('do not show');
    log.error('an error logged');
    log.actualLvl = 0;
    log.info('now try to work with configuration');

    log.loadConfiguration({
        'default': {
            name: 'default',
            levels: ['trace', 'debug', 'info', 'warning', 'error']
        }
    });
    var logfromname = log.named('piano');

	logfromname.info('log from log for name');
});