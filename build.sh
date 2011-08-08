#!/bin/bash
# write by @waxzce
echo "building logger4js"
echo "if you provide yuicompressor path, minified files will generated in the same time"
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

if [ ! -z $1 ] 
	then
	YUIC_PATH=$1
	for i in `ls $BUILD_DIR`; do
		match=".js"
		replacement=".min.js"
		TARGET_FILE=$BUILD_DIR/$i
		TARGET_FILE=`echo $TARGET_FILE | sed 's/js$/min.js/'`
		cat legal/intro.js > $TARGET_FILE
		echo " " >> $TARGET_FILE
		java -jar $YUIC_PATH $BUILD_DIR/$i --charset utf-8 >> $TARGET_FILE
	done
fi
