/**
 * @module logger4js
 */
var MainLogger = {
    loggers: {},
    named: function(name, options) {
        if (MainLogger.loggers[name] == undefined) {
            if (MainLogger.conf[name] == undefined) {
                new Logger({
                    'name': name
                });
            } else {
                new Logger(MainLogger.conf[name]);
            }
        }
        return MainLogger.loggers[name];
    },
    conf: {
        'default': {
            loggerimpl: new DefaultLoggerImpl(),
            levels: ['trace', 'debug', 'info', 'warning', 'error'],
            actualLvl:  0,
            noprint: false
        }
    }
};