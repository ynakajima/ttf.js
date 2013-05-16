var glyphWrapper = $('<li><dl><dt></dt><dd><svg width="100" height="150" xmlns="http://www.w3.org/2000/svg"><path /></svg></dd></dl></li>'),
    font = {};

$(function () {
  var readbutton = document.getElementById('read');
  readbutton.addEventListener('change', onReadFile, false);
  readbutton.addEventListener('click', function(){

    // show loading...
    $('#loading').show();

    // hide glyphList
    $('#glyphList').fadeOut(1000, function(){
      $('#glyphList').html("");
    });

  }, false);
});

// read font file
function onReadFile(e) {
  
  // init
  var file = e.target.files[0];
  var reader = new FileReader();
  
  // onload
  reader.onload = function(e) {

    $("#loading").hide();
    
    // read font
    var buffer = e.target.result;
    font = new ttfjs.TrueType.createFromBuffer(buffer);
    
    // check ttf
    if (!font.isTTF()) {
      alert('error: this is not TrueType font.');
    } else {
      var advanceWidth = 0;
        
      // render glyph
      for ( var i = 0, l = font.getNumGlyphs(); i < l; i++) {
        var glyph = font.getGlyphById(i),
            lsb = 0;

        if (i < font.hmtx.hMetrics.length) {
          hmtx = font.hmtx.hMetrics[i];
          lsb = hmtx.lsb;
          advanceWidth =  hmtx.advanceWidth;
        }

        var svg =  glyphWrapper.clone(true);
        svg.find("dt").html(i);

        var d = glyph.toSVGPathString({
          relative: true,
          matrix: {
            a: 1, c:  0, e: 0,
            b: 0, d: -1, f: 0
          }
        });

        if (d === '') {
          d = 'M0,0';
        }

        var width = glyph.xMax - glyph.xMin;
            scale = (font.head.unitsPerEm > width) ? 100 / font.head.unitsPerEm : 100 / width,
            left = (font.head.unitsPerEm > width) ? (font.head.unitsPerEm * 1  - advanceWidth) / 2 : -glyph.xMin;
        
        // render glyph
        svg.find('path').attr('d', d).attr('stroke-width', 1 / scale).attr('transform', 'translate(0, 100) scale(' + scale + ') translate(' + left + ', 0)');
        $('#glyphList').append(svg);

      }

      $('#glyphList').fadeIn(2000);
      
    }
  };

  // onerror
  reader.onerror = function(e) {
    alert("err: ", e);
  };

  // read file
  reader.readAsArrayBuffer(file);
}
