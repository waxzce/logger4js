/**
 * @module logger4js
 */
var MainLogger = {
	loggers : {},
    named : function(name, options){
		if(loggers[name] == undefined){
			new Logger(conf[name] || conf['default']);
		}
		return MainLogger.loggers[name];
	},
	conf : {}
};