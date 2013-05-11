#!/bin/bash

# Compile
./node_modules/.bin/coffee -c --join ttf.tmp.js src/

# Remove unnecessary statement.
sed -i "" -e "/module.exports = [^t]/d" -e "/require('\./d" ttf.tmp.js

# minimam
./node_modules/.bin/uglifyjs ttf.tmp.js > ttf.min.tmp.js

# add header
cat build/header.js > ttf.js
cat ttf.tmp.js >> ttf.js
cat build/header.js > ttf.min.js
cat ttf.min.tmp.js >> ttf.min.js

rm ttf.tmp.js ttf.min.tmp.js
