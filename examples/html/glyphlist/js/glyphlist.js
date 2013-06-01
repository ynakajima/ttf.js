var glyphWrapper = $('<li><dl><dt></dt><dd><svg class="glyph" width="100" height="150" xmlns="http://www.w3.org/2000/svg"><path /></svg></dd></dl></li>'),
    font = {},
    headerHeight = 53,
    tabId = 0;

$(function () {

  // Check for the various File API support.
  if (window.File && window.FileReader && window.FileList && window.Blob) {
    // Great success! All the File APIs are supported.
    var readbutton = document.getElementById('read');
    readbutton.addEventListener('change', onReadFile, false);

    $('#fileName').click(function() {
      $(readbutton).trigger('click');
    });

    onWindowReisze();
  } else {
    alert('The File APIs are not fully supported in this browser.');
  }

  // tab
  $('#tabMenu').bind('click', function(e) {
    // select
    if ($(e.target).hasClass('tag')) {
      var tab = $(e.target).attr('title');
      $('#tabMenu .current').removeClass('current');
      $('#tabs .tab').hide();
      var tab = $(e.target).addClass('current').attr('title');
      $('#' + tab).show();
    }

    // close
    if ($(e.target).hasClass('close')) {
      var tab = $(e.target).parent().attr('title');
      if ($(e.target).parent().hasClass('current')) {
        var next = $(e.target).parent().next();
        var active;

        if (next.length > 0) {
          active = next.get(0);
        } else {
          active = $(e.target).parent().prev().get(0);
        }

        $('#' + $(active).attr('title')).show();
        $(active).addClass('current');

      }
      $('#' + tab).remove();
      $(e.target).parent().remove();

      if ($('#tabMenu ol li').length === 1) {
        headerHeight = 53;
        $('#tabs').stop().animate({top: headerHeight}, 300);
        onWindowReisze();
      }
    }
  });

  
  $(window).resize(function(){
    onWindowReisze();
  });
  
});

function onWindowReisze() {
  var windowHeight = $(window).height();
  $('.tab').height(windowHeight - headerHeight);
  
  var glyphListWidth = $('#glyphList').width();
  var glyphWidth = 108 + (glyphListWidth % 110) / (glyphListWidth / 110);
  $('#glyphList li').css({width: glyphWidth});
}

// create new tab
function createNewTab(title, content, callback) {
  headerHeight = 53 + 25;
  $('#tabs').append($('<section id="tab_' + tabId + '" class="tab"><div class="">' + content + '</div></section>'));
  $('#tabMenu ol').find('.current').removeClass('current').end().
    append($('<li class="tag current" title="tab_' + tabId + '">' + title + '<span class="close">+</span></li>'));
  $('#tabs').stop().animate({top: headerHeight}, 300);
  if (typeof callback === 'function') {
    callback(tabId);
  }
  tabId++
  onWindowReisze();
}

// glyph tab
function createGlyphTab(id) {
  var _id = parseInt(id.split('_')[1], 10);
  var d = $('#' + id).find('path').attr('d');
  var transform = $('#' + id).find('path').attr('transform');

  var ascender = -1 * font.hhea.ascender;
  var descender = -1 * font.hhea.descender;
  var lineGap = font.hhea.lineGap;
  var baseLine = 0;

  var svg = '<svg class="glyphView" width="100%" height="100%" viewBox="0 0 100 150" preserveAspectRatio="xMidYMid" xmlns="http://www.w3.org/2000/svg">';
  svg += '<g transform="' + transform + '" >';
  svg += '<line x1="-5000" y1="' + ascender + '" x2="5000" y2="' + ascender + '" opacity="0.5" stroke="#00f" stroke-width="2" />';
  svg += '<line x1="-5000" y1="' + descender + '" x2="5000" y2="' + descender + '" opacity="0.5" stroke="#00f" stroke-width="2" />';
  svg += '<line x1="-5000" y1="' + baseLine + '" x2="5000" y2="' + baseLine + '" opacity="0.5" stroke="#f00" stroke-width="2" />';
  svg += '<path class="glyph" d="' + d + '" />';
  svg += '</g></svg>';

  createNewTab(id, svg);
}


// read font file
function onReadFile(e) {

  if (e.target.files.length === 0) {
    return;
  }

  // close tabs
  $('#tabMenu li .close').trigger('click');

  // show loading...
  $('#loading').stop().fadeIn();

  // hide glyphList
  $('#glyphList').stop().fadeOut(600, function(){
    $('#glyphList').html("");
     // init
    var file = e.target.files[0];
    $('#fileName').html(file.name).fadeIn(600);
    var reader = new FileReader();
    reader.onload = onLoadFile
    reader.onerror = onErrorFile

    // read file
    reader.readAsArrayBuffer(file);
  });
 
}

// onload
function onLoadFile(e) {

  console.time('read TTF');

  if (location.protocol.match(/^http/) !== null && window.Worker) {
    var worker = new Worker("./js/worker.js");      

    // handling
    worker.onmessage = renderFontList;

    // post
    worker.postMessage({buffer: e.target.result});

  } else {
    // read font
    var buffer = e.target.result;
    try {
      var fontInfo = readFont(buffer);
      renderFontList({data: fontInfo})
    } catch (e) {
      renderFontList({data: {error: 'error: this is not TrueType font.'}});
    }

  }

  // glyph detail
  $('#glyphList svg').click(function(e){
    createGlyphTab($(this).attr('id'));
  });

  console.timeEnd('read TTF');

}

function renderFontList(e) {
  if (typeof e.data.error !== 'undefined') {
    $('#loading').stop().hide();
    alert(e.data.error);
    return;
  }

  font = ttfjs.TrueType.createFromJSON(e.data.font);

  // show glyphlist
  $("#loading").stop().fadeOut(200, function(){
    $('#glyphList').stop().html(e.data.html).fadeIn(2000);
    // glyph detail
    $('#glyphList svg').click(function(e){
      createGlyphTab($(this).attr('id'));
    });

    onWindowReisze();

  });
};

// onerror
function onErrorFile(e) {
  alert("err: ", e);
};
