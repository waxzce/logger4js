var log = new Logger(0, new DefaultLoggerImpl(), new Levels(['debug', 'info', 'warning', 'error', 'none']));

for (var y in log){
	exports[y] = log[y];
}

exports.Logger = Logger;
exports.Levels = Levels;
exports.DefaultLoggerImpl = DefaultLoggerImpl;

