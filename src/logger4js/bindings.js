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

