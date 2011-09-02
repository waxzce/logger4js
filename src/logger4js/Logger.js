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