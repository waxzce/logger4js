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
	* @param lvl {number} the actual level of logging
	* @param loggerimpl {object} an implementation of LoggerImpl : the object use to log
	* @param levels {object} an occurence of Levels : the definition of logging level
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
	* @param lvl {number} the actual level of logging
	* @param loggerimpl {object} an implementation of LoggerImpl : the object use to log
	* @param levels {object} an occurence of Levels : the definition of logging level
	* @protected
	**/
    p.initialize = function(options) {
        this.loggerimpl = options.loggerimpl || new DefaultLoggerImpl();
        this.levels = options.levels || new Levels(['trace', 'debug', 'info', 'warning', 'error']); 
        this.actualLvl = options.actualLvl || 0;
		this.name = options.name || 'AnonimousLogger';

        for (var f in this.levels) {
            this[f] = this._log_wrapper(this.levels[f]);
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
	* @description load a configuration part for the logger
	* @param conf {object} an object show the configuration
	* @method loadConfiguration
	**/
    p.loadConfiguration = function(conf) {
        // actual level
		// noup
		// loggerimpl
    };

    return Logger;
})();