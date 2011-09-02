/**
 * @module logger4js
 */


var MainLogger = {
    loggers: {},
    named: function(name, options) {
        if (options != undefined) {
            var o = {};
            o[name] = options;
            MainLogger.loadConfiguration(o);
        }
        if (MainLogger.loggers[name] == undefined) {
            new Logger(MainLogger.getComputedConf(name, {
                'name': name
            }));
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
    getComputedConf: function(name, moreoptions) {
        var name_parts = name.split('.');
        var cconf = {};
        for (var i = 1; i <= name_parts.length; i++) {
            var aname = name_parts.slice(0, i).join('.');
            cconf = mergeConf((MainLogger.conf[aname] == undefined ? {}: MainLogger.conf[aname]), cconf);
        }
        if (moreoptions != undefined) {
            cconf = mergeConf(moreoptions, cconf);
        }
        cconf = mergeConf(cconf, MainLogger.conf['default']);
        return cconf;
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
