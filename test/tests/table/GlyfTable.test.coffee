fs = require 'fs'
jDataView = require 'jdataview'
TTFDataView = require '../../../src/TTFDataView'
GlyfTable = require '../../../src/table/GlyfTable'
ttf1Loca = {offsets: require '../../resources/SourceCodePro/SourceCodePro-Medium.loca.json'}
ttf1Glyf = require '../../resources/SourceCodePro/SourceCodePro-Medium.ttx.glyf.json'

# test data
view = new TTFDataView new jDataView fs.readFileSync __dirname + '/../../resources/SourceCodePro/SourceCodePro-Medium.ttf'
ttf1 = GlyfTable.createFromTTFDataView(view, 9396, {loca: ttf1Loca})

# test
exports.GlyfTableTest =
  
  'test GlyfTable is Constructor': (test) ->
    test.strictEqual typeof GlyfTable, 'function'
    head = new GlyfTable()
    test.ok head instanceof GlyfTable
    test.done()

exports.GlyfTable_createFromTTFDataView =
  
  'GlyfTable#createFromTTFDataView() is function': (test) ->
    test.strictEqual typeof GlyfTable.createFromTTFDataView, 'function'
    test.ok ttf1 instanceof GlyfTable
    test.strictEqual ttf1.glyphs.length, 965

    # glyf
    for glyph, i in ttf1.glyphs
      
      testGlyph = ttf1Glyf[i]

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


    test.done()

