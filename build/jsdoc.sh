#!/bin/sh

if [ $# -lt 1 ]; then
  echo 'usage: jsdoc.sh outputdirectory [clear]'
  exit 1
fi

# init
jsdoc_dir=$1
cd `dirname $0`/../
src_dir=src/

# init jsdoc
mkdir -p $jsdoc_dir

# reconstruct jsdoc
if [ "$2" = "clear" ]; then
  rm -rf ${jsdoc_dir}/*
fi
jsdoc -r -d $jsdoc_dir $src_dir

