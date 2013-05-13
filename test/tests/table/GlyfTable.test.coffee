fs = require 'fs'
jDataView = require 'jdataview'
TTFDataView = require '../../../src/TTFDataView'
GlyfTable = require '../../../src/table/GlyfTable'
ttf1Loca = {offsets: require '../../resources/SourceCodePro/SourceCodePro-Medium.loca.json'}
ttf1Glyphs = require '../../resources/SourceCodePro/SourceCodePro-Medium.ttx.glyf.json'
ttf1Glyf = ttf1Glyphs.glyphOrder
ttf1Svg = require '../../resources/SourceCodePro/SourceCodePro-Medium.svg.json'

# test data
view = new TTFDataView fs.readFileSync __dirname + '/../../resources/SourceCodePro/SourceCodePro-Medium.ttf'
ttf1 = GlyfTable.createFromTTFDataView(view, 9396, {loca: ttf1Loca})

# test
exports.GlyfTableTest =
  
  'test GlyfTable is Constructor': (test) ->
    test.strictEqual typeof GlyfTable, 'function'
    head = new GlyfTable()
    test.ok head instanceof GlyfTable
    test.done()

exports.GlyfTable_getGlyphById =
  
  'test GlyfTable#getGlyphById' : (test) ->
    test.strictEqual typeof ttf1.getGlyphById, 'function'
    test.strictEqual ttf1.getGlyphById(24), ttf1.glyphs[24]
    test.strictEqual ttf1.getGlyphById(24).GID, 24
    test.strictEqual ttf1.getGlyphById(-24), false
    test.strictEqual ttf1.getGlyphById(8928), false
    test.done()

exports.GlyfTable_createFromTTFDataView =
  
  'GlyfTable#createFromTTFDataView() is function': (test) ->
    test.strictEqual typeof GlyfTable.createFromTTFDataView, 'function'
    test.ok ttf1 instanceof GlyfTable
    test.strictEqual ttf1.glyphs.length, 965

    # toSVGPathString
    test.strictEqual ttf1.glyphs[20].toSVGPathString(),'M 148,330 Q 148,272 158.5,225 T 188.5,144.5 T 235.5,92.5 T 298,74 Q 333,74 360.5,92.5 T 407.5,144.5 T 437.5,225 T 448,330 Q 448,388 437.5,434.5 T 407.5,513.5 T 360.5,563.5 T 298,581 Q 263,581 235.5,563.5 T 188.5,513.5 T 158.5,434.5 T 148,330 Z M 560,-151 Q 544,-158 524,-162.5 T 480,-167 Q 436,-167 399.5,-155 T 334,-121.5 T 284,-71 T 250,-7 Q 203,2 165.5,29.5 T 101.5,100.5 T 60.5,202 T 46,330 Q 46,409 64.5,472 T 116,578.5 T 195.5,645 T 298,668 Q 354,668 400.5,644.5 T 480,577.5 T 531.5,471.5 T 550,330 Q 550,262 536,205 T 496.5,105.5 T 435.5,34.5 T 356,-5 Q 373,-46 408.5,-64.5 T 492,-83 Q 522,-83 542,-73 Z'
    test.strictEqual ttf1.glyphs[660].toSVGPathString(), 'M 73,415 Q 90,398 112,386.5 T 163,375 Q 189,375 206,388.5 T 223,427 Q 223,453 206.5,466 T 162,479 Q 144,479 130,473.5 T 101,458 L 68,480 L 83,637 H 279 V 574 H 141 L 133,513 Q 155,524 186,524 Q 236,524 266.5,498.5 T 297,425 Q 297,377 261,347.5 T 170,318 Q 131,318 99.5,330.5 T 39,369 Z M 25,83 L 209,268 L 247,233 L 81,31 Z M 575,572 L 391,387 L 353,422 L 519,624 Z M 373,82 Q 373,63 390.5,51 T 433,39 Q 456,39 474.5,50.5 T 493,80 Q 493,104 469.5,115.5 T 415,136 Q 373,116 373,82 Z M 451,181 Q 468,192 475.5,203.5 T 483,229 Q 483,246 470,256.5 T 433,267 Q 411,267 397.5,257 T 384,231 Q 384,211 403.5,200.5 T 451,181 Z M 305,77 Q 305,108 325,126.5 T 369,157 V 161 Q 347,175 331.5,190 T 316,233 Q 316,252 325.5,268 T 351,295 T 388,312.5 T 433,319 Q 484,319 517.5,295 T 551,233 Q 551,205 534.5,189.5 T 498,163 V 159 Q 524,147 542.5,129 T 561,77 Q 561,39 524.5,13.5 T 433,-12 Q 376,-12 340.5,14.5 T 305,77 Z'
    test.strictEqual ttf1.glyphs[533].toSVGPathString(), 'M 547,100 H 490 L 482,156 H 478 Q 457,128 422.5,108 T 349,88 Q 322,88 298.5,97.5 T 257.5,124.5 T 230,167 T 220,222 Q 220,299 288,338 T 481,393 V 407 Q 481,441 472.5,471 T 446.5,524 T 401.5,560.5 T 336,574 Q 294,574 254.5,554 T 184.5,493.5 T 135.5,391.5 T 117,248 Q 117,168 135,106.5 T 183.5,3.5 T 255,-59.5 T 343,-81 Q 388,-81 420.5,-69.5 T 482,-38 L 514,-90 Q 474,-116 432.5,-130.5 T 340,-145 Q 281,-145 227.5,-120 T 133.5,-45 T 69,79 T 45,251 Q 45,348 68,420.5 T 130.5,541.5 T 224,614 T 340,638 Q 393,638 432,619.5 T 496.5,568.5 T 534.5,492.5 T 547,398 Z M 297,224 Q 297,192 316.5,174 T 370,156 Q 421,156 472,213 V 330 Q 425,323 391.5,313.5 T 337,291.5 T 306.5,262 T 297,224 Z'

    # glyf
    for glyph, i in ttf1.glyphs
      
      testGlyph = ttf1Glyf[i]

      # glyphID
      test.strictEqual glyph.GID, i

      if typeof testGlyph.xMin is 'undefined'
        # NULL Glyph
        test.strictEqual glyph.type, 'simple'
        test.strictEqual glyph.numberOfContours, 0 , 'null glyph: [' + i + '] ' + glyph.numberOfContours

      else if typeof testGlyph.contour isnt 'undefined' # test Simple Glyph
        # simple glyph
        test.strictEqual glyph.type, 'simple'
        
        
        # numberOfCoordinates
        test.equal glyph.numberOfContours, testGlyph.contour.length,
          'numberOfContours: [' + i + '] ' + [glyph.numberOfContours, testGlyph.contour.length].join(' == ')
        
        # xMin, yMin, xMax, yMax
        test.equal glyph.xMin, testGlyph.xMin, 'xMin: [' + i + '] ' + [glyph.xMin, testGlyph.xMin].join(' == ')
        test.equal glyph.yMin, testGlyph.yMin, 'yMin: [' + i + '] ' + [glyph.yMin, testGlyph.yMin].join(' == ')
        test.equal glyph.xMax, testGlyph.xMax, 'xMax: [' + i + '] ' + [glyph.xMax, testGlyph.xMax].join(' == ')
        test.equal glyph.yMax, testGlyph.yMax, 'yMax: [' + i + '] ' + [glyph.yMax, testGlyph.yMax].join(' == ')

        # outline
        for contour, j in testGlyph.contour
          for pt, k in contour.pt
            coordinate = glyph.getOutline()[j][k]
            test.equal coordinate.x, pt.x, 'x[' + j + '][' + k + ']: [' + i + '] ' + [coordinate.x, pt.x].join(' == ')
            test.equal coordinate.y, pt.y, 'y[' + j + '][' + k + ']: [' + i + '] ' + [coordinate.y, pt.y].join(' == ')
            test.equal coordinate.on, pt.on, 'on[' + j + '][' + k + ']: [' + i + '] ' + [coordinate.on, pt.on].join(' == ')

      else # test Composite Glyph
        # Composite glyph
        test.strictEqual glyph.type, 'composite', 'composite: : [' + i + '] ' + glyph.type + ' == composite'

        # numberOfCoordinates
        test.strictEqual glyph.numberOfContours, -1

        # xMin, yMin, xMax, yMax
        test.equal glyph.xMin, testGlyph.xMin, 'xMin: [' + i + '] ' + [glyph.xMin, testGlyph.xMin].join(' == ')
        test.equal glyph.yMin, testGlyph.yMin, 'yMin: [' + i + '] ' + [glyph.yMin, testGlyph.yMin].join(' == ')
        test.equal glyph.xMax, testGlyph.xMax, 'xMax: [' + i + '] ' + [glyph.xMax, testGlyph.xMax].join(' == ')
        test.equal glyph.yMax, testGlyph.yMax, 'yMax: [' + i + '] ' + [glyph.yMax, testGlyph.yMax].join(' == ')

        # componets
        for testComponent, j in testGlyph.component
          component = glyph.components[j]

          # flags
          # TODO: Research is needed because it seems there is a problem with the test data.
          #test.equal '0x' + component.flags.toString(16), testComponent.flags, 'flags:  [' + i + '][' + j + ']'
          
          # glyphIndex
          test.equal component.glyphIndex, ttf1Glyphs.glyphs[testComponent.glyphName].glyfIndex

          # offset
          test.equal component.offsetX, testComponent.x, 'offsetX: [' + i + '][' + j + ']: ' + [component.offsetX, testComponent.x].join(' == ')
          test.equal component.offsetY, testComponent.y, 'offsetY: [' + i + '][' + j + ']: ' + [component.offsetY, testComponent.y].join(' == ')
          
    test.done()

