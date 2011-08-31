/**
 * @module logger4js
 */
var MainLogger = {
    loggers: {},
    named: function(name, options) {
        if (MainLogger.loggers[name] == undefined) {
            if (MainLogger.conf[name] == undefined) {
                return MainLogger.named('default');
            }
            new Logger(MainLogger.conf[name]);
        }
        return MainLogger.loggers[name];
    },
    conf: {}
};