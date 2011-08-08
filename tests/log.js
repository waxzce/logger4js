$(function() {
	var log = require('logger4js');
	
    log.log(log.levels.info(), 'something string');
    log.log(log.levels.warning(), 'something with object', {
        fabuleux: 'object',
        nb: 2
    });
    log.error('some error');

	log.anotherLogger = new log.Logger(0 , new log.DefaultLoggerImpl() , new log.Levels(['one', 'two', 'tree']));
	log.anotherLogger.two('log from another log');
	log.info('restrict some log to error');
	log.actualLvl = log.levels.error();
	log.debug('do not show');
	log.info('do not show');
	log.error('an error logged');

});