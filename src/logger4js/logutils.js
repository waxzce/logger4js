var mergeConf = function(no, oo) {
    var o = {};
	for(var p in no){
		o[p] = no[p];
	}
    for (var p in oo) {
        o[p] = (no[p] != undefined ? no[p] : oo[p]);
    }
    return o;
};