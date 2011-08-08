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