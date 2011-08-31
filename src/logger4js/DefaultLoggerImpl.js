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