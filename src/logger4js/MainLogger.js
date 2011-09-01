/**
 * @module logger4js
 */


var MainLogger = {
    loggers: {},
    named: function(name, options) {
        if (options != undefined) {
            MainLogger.conf[name] = (MainLogger.conf[name] == undefined ? options: mergeConf(options, MainLogger.conf[name]));
        }
        if (MainLogger.loggers[name] == undefined) {
            if (MainLogger.conf[name] == undefined) {
                new Logger({
                    'name': name
                });
            } else {
                new Logger(mergeConf(MainLogger.conf[name], {
                    'name': name
                }));
            }
        }
        return MainLogger.loggers[name];
    },
    loadConfiguration: function(conf) {
        for (var n in conf) {
            var name = n;
			var options = conf[n];
            MainLogger.conf[name] = (MainLogger.conf[name] == undefined ? options: mergeConf(options, MainLogger.conf[name]));
        }
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

MainLogger.loadConf = MainLogger.loadConfiguration;
