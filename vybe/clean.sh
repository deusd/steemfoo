#!/bin/sh

watchman watch-del-all
trash ./node_modules
npm cache clean --force
yarn cache clean
rm -rf $TMPDIR/react-*
yarn install
npm cache clean --force
yarn cache clean