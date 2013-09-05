importScripts('http://jdataview.github.io/dist/jdataview.js');
importScripts('../../../../ttf.js');
importScripts('./readfont.js');

var onmessage = function(e) {

  // read buffer
  try {
    var fontInfo = readFont(e.data.buffer);
    postMessage(fontInfo);
  } catch(e) {
    postMessage({error: 'error: this is not TrueType font.'});
  }

};

