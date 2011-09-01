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
        if (MainLogger.loggers[this.name] != undefined) {
            return MainLogger.loggers[this.name];
        } else {
            MainLogger.loggers[this.name] = this;
        }
        /*
        var o = {};
        var d = MainLogger.conf['default'];
        for (var p in d) {
            o[p] = options[p] || d[p];
        }
*/
        var o = mergeConf(options, MainLogger.conf['default']);
        this.loggerimpl = o.loggerimpl;
        this.levels = (o.levels.lvls == undefined ? new Levels(o.levels) : o.levels);
        this.actualLvl = o.actualLvl;

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
	* @description get the configuration of the logger
	* @method getConf
	* @return {object} the configuration of the logger
	**/
    p.getConf = function() {
        return MainLogger.conf[this.name];
    }

    return Logger;
})();