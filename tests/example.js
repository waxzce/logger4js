$(function() {
    // welcomme to this example of logger4js classic usage
    // First, logger4js is design to work with require()
    // the module name is "logger4js"
    var log = require('logger4js').named('app.management');
    log.info('is it working ?');



    var logger4js = require('logger4js');

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
                console.log('AnnotherLoggerImpl -- ' + logger.name + ' :: ' + logger.levels.getName(lvl) + ' : ' + what);
                if (obj != null) {
                    console.log(obj);
                    console.log('--^--^--^--^--')
                }
            }
        };
        return AnnotherLoggerImpl;
    })();


    logger4js.loadConf({
        'app.ponctualEvent': {
            loggerimpl: new AnnotherLoggerImpl()
        }
    });

    var log2 = logger4js.named('app.ponctualEvent');
    log2.error('this is sparta');
});