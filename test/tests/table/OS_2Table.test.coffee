fs = require 'fs'
jDataView = require 'jdataview'
TTFDataView = require '../../../src/TTFDataView'
OS_2Table = require '../../../src/table/OS_2Table'

# test data
view = new TTFDataView fs.readFileSync __dirname + '/../../resources/SourceCodePro/SourceCodePro-Medium.ttf'
ttf1 = OS_2Table.createFromTTFDataView(view, 440)

# test
exports.OS_2TableTest =
  
  'test OS_2Table is Constructor': (test) ->
    test.strictEqual typeof OS_2Table, 'function'
    head = new OS_2Table()
    test.ok head instanceof OS_2Table
    test.done()

exports.OS_2Table_getUsWeightClassString =
  
  'OS_2Table#getUsWeightClassString() is function': (test) ->
    test.strictEqual typeof ttf1.getUsWeightClassString, 'function'
    test.done()

  'OS_2Table#getUsWeightClassString() returns usWeightClass String.': (test) ->
    test.strictEqual ttf1.getUsWeightClassString(), 'Medium'
    test.done()

exports.OS_2Table_getUsWidthClassString =
  
  'OS_2Table#getUsWidthClassString() is function': (test) ->
    test.strictEqual typeof ttf1.getUsWidthClassString, 'function'
    test.done()

  'OS_2Table#getUsWidthClassString() returns usWidthClass String.': (test) ->
    test.strictEqual ttf1.getUsWidthClassString(), 'Medium'
    test.done()

exports.OS_2Table_getFamilyClass =
  
  'OS_2Table#getFamilyClass() is function': (test) ->
    test.strictEqual typeof ttf1.getFamilyClass, 'function'
    test.done()

  'OS_2Table#getFamilyClass() returns Family Class.': (test) ->
    test.strictEqual ttf1.getFamilyClass(), 'No Classification'
    test.done()

exports.OS_2Table_getFamilySubclass =
  
  'OS_2Table#getFamilySubclass() is function': (test) ->
    test.strictEqual typeof ttf1.getFamilySubclass, 'function'
    test.done()

  'OS_2Table#getFamilySubclass() returns Family Subclass.': (test) ->
    test.strictEqual ttf1.getFamilySubclass(), false
    test.done()


exports.OS_2Table_US_WEIGHT_CLASS =
  
  'OS_2Table.US_WEIGHT_CLASS is Object': (test) ->
    test.strictEqual typeof OS_2Table.US_WEIGHT_CLASS, 'object'
    test.done()

  'test OS_2Table.US_WEIGHT_CLASS': (test) ->
    test.strictEqual OS_2Table.US_WEIGHT_CLASS[100], 'Thin'
    test.strictEqual OS_2Table.US_WEIGHT_CLASS[200], 'Extra-light'
    test.strictEqual OS_2Table.US_WEIGHT_CLASS[300], 'Light'
    test.strictEqual OS_2Table.US_WEIGHT_CLASS[400], 'Normal'
    test.strictEqual OS_2Table.US_WEIGHT_CLASS[500], 'Medium'
    test.strictEqual OS_2Table.US_WEIGHT_CLASS[600], 'Semi-bold'
    test.strictEqual OS_2Table.US_WEIGHT_CLASS[700], 'Bold'
    test.strictEqual OS_2Table.US_WEIGHT_CLASS[800], 'Extra-bold'
    test.strictEqual OS_2Table.US_WEIGHT_CLASS[900], 'Black'
    test.done()

exports.OS_2Table_US_WIDTH_CLASS =
  
  'OS_2Table.US_WIDTH_CLASS is Object': (test) ->
    test.strictEqual typeof OS_2Table.US_WIDTH_CLASS, 'object'
    test.done()

  'test OS_2Table.US_WIDTH_CLASS': (test) ->
    test.strictEqual OS_2Table.US_WIDTH_CLASS[1], 'Ultra-condensed'
    test.strictEqual OS_2Table.US_WIDTH_CLASS[2], 'Extra-condensed'
    test.strictEqual OS_2Table.US_WIDTH_CLASS[3], 'Condensed'
    test.strictEqual OS_2Table.US_WIDTH_CLASS[4], 'Semi-condensed'
    test.strictEqual OS_2Table.US_WIDTH_CLASS[5], 'Medium'
    test.strictEqual OS_2Table.US_WIDTH_CLASS[6], 'Semi-expanded'
    test.strictEqual OS_2Table.US_WIDTH_CLASS[7], 'Expanded'
    test.strictEqual OS_2Table.US_WIDTH_CLASS[8], 'Extra-expanded'
    test.strictEqual OS_2Table.US_WIDTH_CLASS[9], 'Ultra-expanded'
    test.done()


exports.OS_2Table_createFromTTFDataView =
  
  'OS_2Table#createFromTTFDataView() is function': (test) ->
    test.strictEqual typeof OS_2Table.createFromTTFDataView, 'function'
    test.ok ttf1 instanceof OS_2Table
    test.done()

  'test OS_2Table#version': (test) ->
    test.strictEqual ttf1.version, 3, 'version'
    test.done()

  'test OS_2Table#xAvgCharWidth': (test) ->
    test.strictEqual ttf1.xAvgCharWidth, 599, 'xAvgCharWidth'
    test.done()

  'test OS_2Table#usWeightClass': (test) ->
    test.strictEqual ttf1.usWeightClass, 500, 'usWeightClass'
    test.done()

  'test OS_2Table#usWidthClass': (test) ->
    test.strictEqual ttf1.usWidthClass, 5, 'usWidthClass'
    test.done()

  'test OS_2Table#fsType': (test) ->
    test.deepEqual ttf1.fsType, [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0], 'fsType'
    test.done()

  'test OS_2Table#ySubscriptXSize': (test) ->
    test.strictEqual ttf1.ySubscriptXSize, 650, 'ySubscriptXSize'
    test.done()

  'test OS_2Table#ySubscriptXSize': (test) ->
    test.strictEqual ttf1.ySubscriptXSize, 650, 'ySubscriptXSize'
    test.done()

  'test OS_2Table#ySubscriptYSize': (test) ->
    test.strictEqual ttf1.ySubscriptYSize, 600, 'ySubscriptYSize'
    test.done()

  'test OS_2Table#ySubscriptXOffset': (test) ->
    test.strictEqual ttf1.ySubscriptXOffset, 0, 'ySubscriptXOffset'
    test.done()

  'test OS_2Table#ySubscriptYOffset': (test) ->
    test.strictEqual ttf1.ySubscriptYOffset, 75, 'ySubscriptYOffset'
    test.done()

  'test OS_2Table#ySuperscriptXSize': (test) ->
    test.strictEqual ttf1.ySuperscriptXSize, 650, 'ySuperscriptXSize'
    test.done()

  'test OS_2Table#ySuperscriptYSize': (test) ->
    test.strictEqual ttf1.ySuperscriptYSize, 600, 'ySuperscriptYSize'
    test.done()

  'test OS_2Table#ySuperscriptXOffset': (test) ->
    test.strictEqual ttf1.ySuperscriptXOffset, 0, 'ySuperscriptXOffset'
    test.done()

  'test OS_2Table#ySuperscriptYOffset': (test) ->
    test.strictEqual ttf1.ySuperscriptYOffset, 350, 'ySuperscriptYOffset'
    test.done()

  'test OS_2Table#yStrikeoutSize': (test) ->
    test.strictEqual ttf1.yStrikeoutSize, 50, 'yStrikeoutSize'
    test.done()

  'test OS_2Table#yStrikeoutPosition': (test) ->
    test.strictEqual ttf1.yStrikeoutPosition, 288, 'yStrikeoutPosition'
    test.done()

  'test OS_2Table#sFamilyClass': (test) ->
    test.strictEqual ttf1.sFamilyClass.class, 0, 'sFamilyClass.class'
    test.strictEqual ttf1.sFamilyClass.subclass, 0, 'sFamilyClass.subclass'
    test.done()

  'test OS_2Table#panose': (test) ->
    test.strictEqual ttf1.panose.bFamilyType, 2, 'panose.bFamilyType'
    test.strictEqual ttf1.panose.bSerifStyle, 11, 'panose.bSerifStyle'
    test.strictEqual ttf1.panose.bWeight, 5, 'panose.bWeight'
    test.strictEqual ttf1.panose.bProportion, 9, 'panose.bProportion'
    test.strictEqual ttf1.panose.bContrast, 3, 'panose.bContrast'
    test.strictEqual ttf1.panose.bStrokeVariation, 4, 'panose.bStrokeVariation'
    test.strictEqual ttf1.panose.bArmStyle, 3, 'panose.bArmStyle'
    test.strictEqual ttf1.panose.bLetterForm, 2, 'panose.bLetterForm'
    test.strictEqual ttf1.panose.bMidline, 2, 'panose.bMidline'
    test.strictEqual ttf1.panose.bXHeight, 4, 'panose.bXHeight'
    test.done()

  'test OS_2Table unicode range': (test) ->
    test.deepEqual ttf1.ulUnicodeRange1, [1, 1, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0,
                                          0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 0, 0] , 'ulUnicodeRange1'
    test.deepEqual ttf1.ulUnicodeRange2, [1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 1, 0, 0, 0,
                                          0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0] , 'ulUnicodeRange2'
    test.deepEqual ttf1.ulUnicodeRange3, [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0,
                                          0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0] , 'ulUnicodeRange3'
    test.deepEqual ttf1.ulUnicodeRange4, [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0,
                                          0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0] , 'ulUnicodeRange4'
    test.done()

  'test OS_2Table#achVendID': (test) ->
    test.strictEqual ttf1.achVendID, 'ADBE', 'achVendID'
    test.done()

  'test OS_2Table#fsSelection': (test) ->
    test.deepEqual ttf1.fsSelection, [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0], 'fsSelection'
    test.done()

  'test OS_2Table#usFirstCharIndex': (test) ->
    test.strictEqual ttf1.usFirstCharIndex, 0, 'usFirstCharIndex'
    test.done()

  'test OS_2Table#fsLastCharIndex': (test) ->
    test.strictEqual ttf1.usLastCharIndex, 64258, 'usLastCharIndex'
    test.done()

  'test OS_2Table#sTypoAscender': (test) ->
    test.strictEqual ttf1.sTypoAscender, 750, 'sTypoAscender'
    test.done()

  'test OS_2Table#sTypoDescender': (test) ->
    test.strictEqual ttf1.sTypoDescender, -250, 'sTypoDescender'
    test.done()

  'test OS_2Table#sTypoLineGap': (test) ->
    test.strictEqual ttf1.sTypoLineGap, 0, 'sTypoLineGap'
    test.done()

  'test OS_2Table#usWinAscent': (test) ->
    test.strictEqual ttf1.usWinAscent, 984, 'usWinAscent'
    test.done()

  'test OS_2Table#usWinDescent': (test) ->
    test.strictEqual ttf1.usWinDescent, 273, 'usWinDescent'
    test.done()

  'test OS_2Table CodePageRange': (test) ->
    test.deepEqual ttf1.ulCodePageRange1, [1, 1, 0, 0, 1, 0, 0, 1, 1, 0, 0, 0, 0, 0, 0, 0,
                                           0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 1, 0] , 'ulCodePageRange1'
    test.deepEqual ttf1.ulCodePageRange2, [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0,
                                           0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0] , 'ulCodePageRange2'
    test.done()
  
  'test OS_2Table#sxHeight': (test) ->
    test.strictEqual ttf1.sxHeight, 480, 'sxHeight'
    test.done()

  'test OS_2Table#sCapHeight': (test) ->
    test.strictEqual ttf1.sCapHeight, 660, 'sCapHeight'
    test.done()

  'test OS_2Table#usDefaultChar': (test) ->
    test.strictEqual ttf1.usDefaultChar, 0, 'usDefaultChar'
    test.done()

  'test OS_2Table#usBreakChar': (test) ->
    test.strictEqual ttf1.usBreakChar, 32, 'usBreakChar'
    test.done()

  'test OS_2Table#usMaxContext': (test) ->
    test.strictEqual ttf1.usMaxContext, 3, 'usMaxContext'
    test.done()






