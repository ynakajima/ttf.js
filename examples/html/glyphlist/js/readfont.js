function readFont(buffer) {
  // read buffer
  var font = new ttfjs.TrueType.createFromBuffer(buffer);

  // check ttf
  if (!font.isTTF()) {
   throw 'error: this is not TrueType font.'; 
  } else {
    var advanceWidth = 0,
        html = [];
      
    // render glyph
    for ( var i = 0, l = font.getNumGlyphs(); i < l; i++) {
      var glyph = font.getGlyphById(i),
          lsb = 0;

      if (i < font.hmtx.hMetrics.length) {
        hmtx = font.hmtx.hMetrics[i];
        lsb = hmtx.lsb;
        advanceWidth =  hmtx.advanceWidth;
      }
      
      var width = glyph.xMax - glyph.xMin;
          scale = (font.head.unitsPerEm > width) ? 100 / font.head.unitsPerEm : 100 / width,
          left = (font.head.unitsPerEm > width) ? (font.head.unitsPerEm * 1  - advanceWidth) / 2 : -glyph.xMin,
          strokeWidth = 1 / scale,
          _html = [];

      var d = glyph.toSVGPathString({
        relative: false,
        matrix: {
          a: 1, c:  0, e: 0,
          b: 0, d: -1, f: 0
        }
      });

      if (d === '') {
        d = 'M0,0';
      }

      //render glyph
      _html.push(['<li><dl><dt>', i, '</dt>'].join(''));
      _html.push('<dd> <svg id="glyph_' + glyph.GID + '" class="glyph" width="100" height="150" xmlns="http://www.w3.org/2000/svg"><path ');
      _html.push(['transform="translate(0, 100) scale(' + scale + ') translate(' + left + ', 0)" '].join(''));
      _html.push(['d="', d, '" stroke-width="' + strokeWidth + '" /></dd></dl></li>'].join(''));
      
      html.push(_html.join(''));

    }
    return {font: font.toJSONString(), html: html.join('')};
  }
}
