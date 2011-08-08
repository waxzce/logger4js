#!/bin/bash
# write by @waxzce
echo "building logger4js"
# vars
SRC_DIR="src"
BUILD_DIR="build"
# empty the future dir
rm -rf $BUILD_DIR/*
# now building the sources
for i in `ls $SRC_DIR`; do
	echo "build $i"
	TARGET_FILE="$BUILD_DIR/$i.js"
	cat legal/intro.js > $TARGET_FILE
	echo "if(modules === undefined){modules = {};}" >> $TARGET_FILE
	echo " " >> $TARGET_FILE
	echo "modules['$i'] = function(require, exports) {" >> $TARGET_FILE
	echo " " >> $TARGET_FILE
	for ii in `cat $SRC_DIR/$i/files.order`; do
		cat $SRC_DIR/$i/$ii >> $TARGET_FILE
		echo " " >> $TARGET_FILE
	done
	echo " " >> $TARGET_FILE
	echo "};" >> $TARGET_FILE
	echo " " >> $TARGET_FILE
done