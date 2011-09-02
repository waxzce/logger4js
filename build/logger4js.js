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
        o[p] = (no[p] != undefined ? no[p] : oo[p]);
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
    noprint: function() {
        MainLogger.loadConf({
            'default': {
                noprint: true
            }
        });
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
 
/**
 * @module logger4js
 */
var Logger = (function() {


    /**
	* class for managing logs
	* <br/> NB : some method are generated 
	* <br/> method name : level (like info, warning, error...)
	* <br/> 2 params : txt to log, obj, to log
	* @class Logger
	* @param options {object} an object with all the params of logger
	* @constructor
	**/
    var Logger = function(options) {
        this.initialize(options);
    }
    var p = Logger.prototype;

    // constructor:
    /** 
	* @description Initialization method.
	* @method initialize
	* @param options {object} an object with all the params of logger
	* @protected
	**/
    p.initialize = function(options) {
        this.name = options.name ||  'AnonymousLogger';
        this.loggerimpl = options.loggerimpl;
        this.levels = (options.levels.lvls == undefined ? new Levels(options.levels) : options.levels);
        this.actualLvl = (typeof options.actualLvl == 'number' ? options.actualLvl: this.levels[options.actualLvl]());
        this.noprint = options.noprint;
        if (this.noprint) {
            this.log = function() {};
            for (var f in this.levels) {
                this[f] = function() {};
            }
        } else {
            for (var f in this.levels) {
                this[f] = this._log_wrapper(this.levels[f]);
            }
        }
    };
    // public methods:
    /**
	* @description log something - NB : use the generated log level named mathod in the most case
	* @param lvl {number} the level of the log. normal way is using the Levels function.
	* @param what {string} the content you want to log
	* @param obj {object} content you want to log -> an object
	* @method log
	**/
    p.log = function(lvl, what, obj) {
        if (lvl >= this.actualLvl) {
            this.loggerimpl.log(what, lvl, (obj ? obj: null), this);
        }
    };
    /**
	* @description wrapper for logging - private
	* @param lvl {function} the level of the wrapper function (usualy a function of Levels)
	* @method _log_wrapper
	* @private
	* @return {function} a generated function for logging with the good level
	**/
    p._log_wrapper = function(lvl) {
        var lvl = lvl;
        return function(what, obj) {
            this.log(lvl(), what, obj);
        }
    };
    /**
	* @description get the configuration of the logger
	* @method getConf
	* @return {object} the configuration of the logger
	**/
    p.getConf = function() {
        return MainLogger.conf[this.name];
    }
    /**
	* @description get the computed configuration of the logger - use this to know the real configuration
	* @method getCConf
	* @return {object} the real configuration of the logger
	**/
    p.getCConf = function() {
        return MainLogger.getComputedConf(this.name);
    }

    /**
	* @description shortcut to load a configuration as a mainLogger
	* @method loadConf
	* @param conf {object} conf object you want to load
	**/
    p.loadConf = function(conf) {
        return MainLogger.loadConfiguration(conf);
    }

    /**
	* @description shortcut for loadConf
	* @method loadConfiguration
	* @param conf {object} conf object you want to load
	**/
    p.loadConfiguration = p.loadConf;
    /**
	* @description change current logger for another - private
	* @param l {object} the new Logger
	* @method switchwith
	* @private
	**/
    p.switchwith = function(l) {
        for (var f in this) {
            delete this[f];
        }
        for (var f in l) {
            this[f] = l[f];
        }
    }

    p.killLogger = function() {
        this.log = function() {};
    }

    return Logger;
})(); 
/**
 * @module logger4js
 */
var Levels = (function() {


    /**
	* class for levels of logging management. like info, error, warning...
	* @class Levels
	* @param lvls {array} an array of string names of the logging level in the good order
	* @constructor
	**/
    var Levels = function(lvls) {
        this.initialize(lvls);
    }
    var pl = Levels.prototype;

    // constructor:
    /** 
	* @description Initialization method.
	* @method initialize
	* @param lvls {array} an array of string names of the logging level in the good order
	* @protected
	**/
    pl.initialize = function(lvls) {
        this.lvls = lvls;
        var dfnct = function(a) {
            return a;
        };
        for (var l in lvls) {
            this[lvls[l]] = this._log_wrapper(l);
        }
    };
    // public methods:
    /**
	* @description compute name of logger lvl
	* @param lvl {number} lvl you want the name
	* @method getName
	* @return {string} the name of the level
	**/
    pl.getName = function(lvl) {
        return this.lvls[lvl];
    };
    /**
	* @description wrapper for levels - private
	* @param lvl {number} the level of the wrapper function 
	* @method _log_wrapper
	* @private
	* @return {function} a generated function returning the number of the logging level
	**/
    pl._log_wrapper = function(lvl) {
        var lvl = lvl;
        return function() {
            return lvl;
        }
    };
    return Levels;
})(); 
exports.DefaultLogger = MainLogger.named("DefaultLogger");

for (var y in exports.DefaultLogger) {
    if (typeof exports.DefaultLogger[y] == 'function') {
        exports[y] = function() {
			var member = y;
			return function(){		
				exports.DefaultLogger[member].apply(exports.DefaultLogger,arguments);
			}
        }();
    }
}

for (var y in MainLogger) {
    exports[y] = MainLogger[y];
}

exports.Logger = Logger;
exports.Levels = Levels;
exports.DefaultLoggerImpl = DefaultLoggerImpl;

 
 
};
 
