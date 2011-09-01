var mergeConf = function(no, oo) {
    //var o = {};
    for (var p in oo) {
        no[p] = no[p] || oo[p];
    }
    return no;
};