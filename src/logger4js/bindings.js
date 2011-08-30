var log = new Logger({name:"DefaultLogger"});

for (var y in log){
	exports[y] = log[y];
}

exports.Logger = Logger;
exports.Levels = Levels;
exports.DefaultLoggerImpl = DefaultLoggerImpl;

