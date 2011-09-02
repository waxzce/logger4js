/* 
 * Logger4js is a javascript logging library writte by Quentin ADAM - @waxzce
 * MIT licence
**/
if(modules === undefined){modules = {};}
 
modules['logger4js'] = function(require, exports) {
 
/**
 * @module logger4js
 */
var DefaultLoggerImpl = (function() {



    /**
	* class LoggerImpl : log with console.log
	* @class DefaultLoggerImpl
	* @constructor
	**/
    DefaultLoggerImpl = function() {
        this.initialize();
    }
    var pp = DefaultLoggerImpl.prototype;
    // constructor:
    /** 
	* @description Initialization method.
	* @method initialize
	* @protected
	**/
    pp.initialize = function() {
        };
    // public methods:
    /**
	* @description log something
	* @param what {string} the content you want to log
	* @param lvl {number} the level of the log. normal way is using the Levels function.
	* @param obj {object} content you want to log -> an object
	* @param logger {object} the Logger occurence -> use to know
	* @method log
	**/
    pp.log = function(what, lvl, obj, logger) {
        if (console != undefined) {
            if (obj != null) {
                console.log('--------------')
            }
            console.log(logger.name + ' :: ' + logger.levels.getName(lvl) + ' : ' + what);
            if (obj != null) {
                console.log(obj);
                console.log('--^--^--^--^--')
            }
        }
    };
    return DefaultLoggerImpl;
})(); 
var mergeConf = function(no, oo) {
    var o = {};
	for(var p in no){
		o[p] = no[p];
	}
    for (var p in oo) {
        o[p] = no[p] || oo[p];
    }
    return o;
}; 
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
            MainLogger.loggers[name] = new Logger(MainLogger.getComputedConf(name, {
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
            var isdefault = (name == 'default');
            for (var l in MainLogger.loggers) {
                if (l.indexOf(name) == 0 || isdefault) {
                    MainLogger.loggers[l].switchwith(new Logger(MainLogger.getComputedConf(l, {
                        'name': l
                    })));
                }
            }
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
