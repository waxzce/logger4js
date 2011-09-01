$(function() {
    // welcomme to this example of logger4js classic usage
    // STEP 1 :
    // First, logger4js is design to work with require()
    // the module name is "logger4js"
    // if you require logger4js, you can work with it immediately
    // this is the default logger
    var logger4js = require('logger4js');
    logger4js.info('log from default logger');
    logger4js.debug('another log');
    // and log complex object
    logger4js.trace('an object logged', {
        v: 'i\'m an object',
        numbers: [3, 6, 4]
    });
    // it's mandatory to use 2 params 2 log an object, the first params explain what is log
    // ----------------------------
    // STEP 2 :
    // use a named logger
    // the design of logger4js is managing a lot of logs, and allow filters and configuration by logger, so you can have named logger
    // just call named function on the module, with a string param : the name
    var log = require('logger4js').named('app.management');
    log.info('is it working ?');
    log.warning('log from a named logger');
    // consideration about name for logger :
    // use a name design for different configuration, like <framework_name>.<functional_part>
    // ----------------------------
    // STEP 3 :
    // logger configuration
    // you can params logs : optional param to the named function
    // NB : later we see a list of params possible
    var clog = logger4js.named('app.clog', {
        // levels of logging
        levels: ['alot', 'some', 'little']
    });
    clog.alot('a lot log');
    clog.some('some log');
    clog.little('little log');
    // the problem with this method is about app design : configuration and code are mix :(
    // so we can add configuration independently	
    logger4js.loadConf({
        'app.clog2': {
            levels: ['_1st', '_2de', 'third']
        }
    });
    // the logger configuration is retrieve when you get the named logger
    // THIS IS THE GOOD WAY
    var clog2 = logger4js.named('app.clog2');
    clog2._1st('log from clog2');
    // ----------------------------
    // STEP 4 : custom logger implementation
    // logger4js is design to provide logger infrasructure for all js project, so you can write your own loggerimpl
    // basicly is just an object with a log function and 4 params :
    // what : text of the log
    // lvl : number, the lvl of the log
    // object : an object to log, can be null
    // logger : Logger who call the log
    // this is a dummy loggerimpl just for demo
    var AnnotherLoggerImpl = (function() {
        AnnotherLoggerImpl = function() {
            this.initialize();
        }
        var pp = AnnotherLoggerImpl.prototype;
        pp.initialize = function() {
            };
        pp.log = function(what, lvl, obj, logger) {
            if (console != undefined) {
                if (obj != null) {
                    console.log('--------------')
                }
                console.log('CUSTOM LOGGER IMPLEMENTATION -- ' + logger.name + ' :: ' + logger.levels.getName(lvl) + ' : ' + what);
                if (obj != null) {
                    console.log(obj);
                    console.log('--^--^--^--^--')
                }
            }
        };
        return AnnotherLoggerImpl;
    })();
    // we load a conf for add this logger implementation to a named logger
    logger4js.loadConf({
        'app.customloggerimpl': {
            loggerimpl: new AnnotherLoggerImpl()
        }
    });
    var log2 = logger4js.named('app.customloggerimpl');
    log2.error('this is sparta');
    // ----------------------------
    // STEP 5 : learn about default conf
    // this is the default conf :
    var conf = {
        'default': {
            loggerimpl: new logger4js.DefaultLoggerImpl(), // The logger implementation you want to use
            levels: ['trace', 'debug', 'info', 'warning', 'error'], // the levels of logging (can be a Levels intance or an array of string)
            actualLvl:  0, // the actual logging visibility (can be string of number)
            noprint: false // set to true to disable logging for this log (use for production)
        }
    };

});