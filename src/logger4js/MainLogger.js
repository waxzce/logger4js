/**
 * @module logger4js
 */
var MainLogger = {
	loggers : {},
    named : function(name, options){
		return MainLogger.loggers[name];
	},

};