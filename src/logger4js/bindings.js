var log = new Logger({name:"DefaultLogger"});

for (var y in log){
	exports[y] = log[y];
}

for (var y in MainLogger){
	exports[y] = MainLogger[y];
}

exports.Logger = Logger;
exports.Levels = Levels;
exports.DefaultLoggerImpl = DefaultLoggerImpl;

