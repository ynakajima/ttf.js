# # ttf.js - JavaScript TrueType Font library
#
# Copyright (C) 2013 by ynakajima (https://github.com/ynakajima)
#
# Released under the MIT license.

# ## OS_2 table Class
class OS_2Table
  constructor: () ->
    @version = 0
    @xAvgCharWidth = 0
    @usWeightClass = 400 # Normal
    @usWidthClass = 5 # Medium
    @fsType = [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0]
    @ySubscriptXSize = 0
    @ySubscriptYSize = 0
    @ySubscriptXOffset = 0
    @ySubscriptYOffset = 0
    @ySuperscriptXSize = 0
    @ySuperscriptYSize = 0
    @ySuperscriptXOffset = 0
    @ySuperscriptYOffset = 0
    @yStrikeoutSize = 0
    @yStrikeoutPosition = 0
    @sFamilyClass = {
      class: 0,
      subclass: 0
    }
    @panose = {
      bFamilyType: 0
      bSerifStyle: 0
      bWeight: 0
      bProportion: 0
      bContrast: 0
      bStrokeVariation: 0
      bArmStyle: 0
      bLetterForm: 0
      bMidline: 0
      bXHeight: 0
    }
    @ulUnicodeRange1 = [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0,
                        0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0]
    @ulUnicodeRange2 = [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0,
                        0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0]
    @ulUnicodeRange3 = [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0,
                        0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0]
    @ulUnicodeRange4 = [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0,
                        0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0]
    @achVendID = ''
    @fsSelection = [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0]
    @usFirstCharIndex = 0
    @usLastCharIndex = 0
    @sTypoAscender = 0
    @sTypoDescender = 0
    @sTypoLineGap = 0
    @usWinAscent = 0
    @usWinDescent = 0
    @ulCodePageRange1 = [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0,
                        0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0]
    @ulCodePageRange2 = [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0,
                        0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0]

  getUsWeightClassString: () ->
    OS_2Table.US_WEIGHT_CLASS[@usWeightClass]

  getUsWidthClassString: () ->
    OS_2Table.US_WIDTH_CLASS[@usWidthClass]

  getFamilyClass: () ->
    if typeof OS_2Table.IBM_FONT_CLASS[@sFamilyClass.class] != 'undefined'
      OS_2Table.IBM_FONT_CLASS[@sFamilyClass.class].name
    else
      false

  getFamilySubclass: () ->
    if typeof OS_2Table.IBM_FONT_CLASS[@sFamilyClass.class] != 'undefined' and typeof OS_2Table.IBM_FONT_CLASS[@sFamilyClass.class].subclass != 'undefined'
      if typeof OS_2Table.IBM_FONT_CLASS[@sFamilyClass.class].subclass[@sFamilyClass.subclass] != 'undefined'
        OS_2Table.IBM_FONT_CLASS[@sFamilyClass.class].subclass[@sFamilyClass.subclass]
      else
        false
    else
      false

  # US_WEIGHT_CLASS
  @US_WEIGHT_CLASS: {
    100: 'Thin'
    200: 'Extra-light'
    300: 'Light'
    400: 'Normal'
    500: 'Medium'
    600: 'Semi-bold'
    700: 'Bold'
    800: 'Extra-bold'
    900: 'Black'
  }

  # US_WIDTH_CLASS
  @US_WIDTH_CLASS: {
    1: 'Ultra-condensed'
    2: 'Extra-condensed'
    3: 'Condensed'
    4: 'Semi-condensed'
    5: 'Medium'
    6: 'Semi-expanded'
    7: 'Expanded'
    8: 'Extra-expanded'
    9: 'Ultra-expanded'
  }

  # IBM_FONT_CLASS
  @IBM_FONT_CLASS: {
    0: {name: 'No Classification'}
    1: {
        name: 'Oldstyle Serifs',
        subclass: {
          0: 'No Classification'
          1: 'IBM Rounded Legibility'
          2: 'Garalde'
          3: 'Venetian'
          4: 'Modified Venetian'
          5: 'Dutch Modern'
          6: 'Dutch Traditional'
          7: 'Contemporary'
          8: 'Calligraphic'
          9: '(reserved for future use)'
          10: '(reserved for future use)'
          11: '(reserved for future use)'
          12: '(reserved for future use)'
          13: '(reserved for future use)'
          14: '(reserved for future use)'
          15: 'Miscellaneous'
        }
    }
    2: {
        name: 'Transitional Serifs',
        subclass: {
          0: 'No Classification'
          1: 'Direct Line'
          2: 'Script'
          3: '(reserved for future use)'
          4: '(reserved for future use)'
          5: '(reserved for future use)'
          6: '(reserved for future use)'
          7: '(reserved for future use)'
          8: '(reserved for future use)'
          9: '(reserved for future use)'
          10: '(reserved for future use)'
          11: '(reserved for future use)'
          12: '(reserved for future use)'
          13: '(reserved for future use)'
          14: '(reserved for future use)'
          15: 'Miscellaneous'
        }
    }
    3: {
        name: 'Modern Serifs',
        subclass: {
          0: 'No Classification'
          1: 'Italian'
          2: 'Script'
          3: '(reserved for future use)'
          4: '(reserved for future use)'
          5: '(reserved for future use)'
          6: '(reserved for future use)'
          7: '(reserved for future use)'
          8: '(reserved for future use)'
          9: '(reserved for future use)'
          10: '(reserved for future use)'
          11: '(reserved for future use)'
          12: '(reserved for future use)'
          13: '(reserved for future use)'
          14: '(reserved for future use)'
          15: 'Miscellaneous'
        }
    }
    4: {
        name: 'Clarendon Serifs',
        subclass: {
          0: 'No Classification'
          1: 'Clarendon'
          2: 'Modern'
          3: 'Traditional'
          4: 'Newspaper'
          5: 'Stub Serif'
          6: 'Monotone'
          7: 'Typewriter'
          8: '(reserved for future use)'
          9: '(reserved for future use)'
          10: '(reserved for future use)'
          11: '(reserved for future use)'
          12: '(reserved for future use)'
          13: '(reserved for future use)'
          14: '(reserved for future use)'
          15: 'Miscellaneous'
        }
    }
    5: {
        name: 'Slab Serifs',
        subclass: {
          0: 'No Classification'
          1: 'Monotone'
          2: 'Humanist'
          3: 'Geometric'
          4: 'Swiss'
          5: 'Typewriter'
          6: '(reserved for future use)'
          7: '(reserved for future use)'
          8: '(reserved for future use)'
          9: '(reserved for future use)'
          10: '(reserved for future use)'
          11: '(reserved for future use)'
          12: '(reserved for future use)'
          13: '(reserved for future use)'
          14: '(reserved for future use)'
          15: 'Miscellaneous'
        }
    }
    6: {name: '(reserved for future use)'}
    7: {
        name: 'Freeform Serifs',
        subclass: {
          0: 'No Classification'
          1: '(reserved for future use)'
          2: '(reserved for future use)'
          3: '(reserved for future use)'
          4: '(reserved for future use)'
          5: '(reserved for future use)'
          6: '(reserved for future use)'
          7: '(reserved for future use)'
          8: '(reserved for future use)'
          9: '(reserved for future use)'
          10: '(reserved for future use)'
          11: '(reserved for future use)'
          12: '(reserved for future use)'
          13: '(reserved for future use)'
          14: '(reserved for future use)'
          15: 'Miscellaneous'
        }
    }
    8: {
        name: 'Sans Serifs',
        subclass: {
          0: 'No Classification'
          1: 'IBM Neo-grotesque Gothic'
          2: 'Humanist'
          3: 'Low-x Round Geometric'
          4: 'High-x Round Geometric'
          5: 'Neo-grotesque Gothic'
          6: 'Modified Neo-grotesque Gothic'
          7: '(reserved for future use)'
          8: '(reserved for future use)'
          9: 'Typewriter Gothic'
          10: 'Matrix'
          11: '(reserved for future use)'
          12: '(reserved for future use)'
          13: '(reserved for future use)'
          14: '(reserved for future use)'
          15: 'Miscellaneous'
        }
    }
    9: {
        name: 'Ornamentals',
        subclass: {
          0: 'No Classification'
          1: 'Engraver'
          2: 'Black Letter'
          3: 'Decorative'
          4: 'Three Dimensional'
          5: '(reserved for future use)'
          6: '(reserved for future use)'
          7: '(reserved for future use)'
          8: '(reserved for future use)'
          9: '(reserved for future use)'
          10: '(reserved for future use)'
          11: '(reserved for future use)'
          12: '(reserved for future use)'
          13: '(reserved for future use)'
          14: '(reserved for future use)'
          15: 'Miscellaneous'
        }
    }
    10: {
        name: 'Scripts',
        subclass: {
          0: 'No Classification'
          1: 'Uncial'
          2: 'Brush Joined'
          3: 'Formal Joined'
          4: 'Monotone Joined'
          5: 'Calligraphic'
          6: 'Brush Unjoined'
          7: 'Formal Unjoined'
          8: 'Monotone Unjoined'
          9: '(reserved for future use)'
          10: '(reserved for future use)'
          11: '(reserved for future use)'
          12: '(reserved for future use)'
          13: '(reserved for future use)'
          14: '(reserved for future use)'
          15: 'Miscellaneous'
        }
    }
    11: {name: '(reserved for future use)'}
    12: {
        name: 'Symbolic',
        subclass: {
          0: 'No Classification'
          1: '(reserved for future use)'
          2: '(reserved for future use)'
          3: 'Mixed Serif'
          4: '(reserved for future use)'
          5: '(reserved for future use)'
          6: 'Oldstyle Serif'
          7: 'Neo-grotesque Sans Serif'
          8: '(reserved for future use)'
          9: '(reserved for future use)'
          10: '(reserved for future use)'
          11: '(reserved for future use)'
          12: '(reserved for future use)'
          13: '(reserved for future use)'
          14: '(reserved for future use)'
          15: 'Miscellaneous'
        }
    }
    13: {name: 'Reserved'}
    14: {name: 'Reserved'}
  }

  # PANOSE
  @PANOSE: {
    FAMILY_TYPE: {
      0: 'Any'
      1: 'No Fit'
      2: 'Text and Display'
      3: 'Script'
      4: 'Decorative'
      5: 'Pictorial'
    }
    SERIF_STYLE: {
      0: 'Any'
      1: 'No Fit'
      2: 'Cove'
      3: 'Obtuse Cove'
      4: 'Square Cove'
      5: 'Obtuse Square Cove'
      6: 'Square'
      7: 'Thin'
      8: 'Bone'
      9: 'Exaggerated'
      10: 'Triangle'
      11: 'Normal Sans'
      12: 'Obtuse Sans'
      13: 'Perp Sans'
      14: 'Flared'
      15: 'Rounded'
    }
    WEIGHT: {
      0: 'Any'
      1: 'No Fit'
      2: 'Very Light'
      3: 'Light'
      4: 'Thin'
      5: 'Book'
      6: 'Medium'
      7: 'Demi'
      8: 'Bold'
      9: 'Heavy'
      10: 'Black'
      11: 'Nord'
    }
    PROPORTION: {
      0: 'Any'
      1: 'No Fit'
      2: 'Old Style'
      3: 'Modern'
      4: 'Even Width'
      5: 'Expanded'
      6: 'Condensed'
      7: 'Very Expanded'
      8: 'Very Condensed'
      9: 'Monospaced'
    }
    CONTRAST: {
      0: 'Any'
      1: 'No Fit'
      2: 'None'
      3: 'Very Low'
      4: 'Low'
      5: 'Medium Low'
      6: 'Medium'
      7: 'Medium High'
      8: 'High'
      9: 'Very High'
    }
    STROKE_VARIATION: {
      0: 'Any'
      1: 'No Fit'
      2: 'Gradual/Diagonal'
      3: 'Gradual/Transitional'
      4: 'Gradual/Vertical'
      5: 'Gradual/Horizontal'
      6: 'Rapid/Vertical'
      7: 'Rapid/Horizontal'
      8: 'Instant/Vertical'
    }
    ARM_STYLE: {
      0: 'Any'
      1: 'No Fit'
      2: 'Straight Arms/Horizontal'
      3: 'Straight Arms/Wedge'
      4: 'Straight Arms/Vertical'
      5: 'Straight Arms/Single Serif'
      6: 'Straight Arms/Double Serif'
      7: 'Non-Straight Arms/Horizontal'
      8: 'Non-Straight Arms/Wedge'
      9: 'Non-Straight Arms/Vertical'
      10: 'Non-Straight Arms/Single Serif'
      11: 'Non-Straight Arms/Double Serif'
    }
    LETTERFORM: {
      0: 'Any'
      1: 'No Fit'
      2: 'Normal/Contact'
      3: 'Normal/Weighted'
      4: 'Normal/Boxed'
      5: 'Normal/Flattened'
      6: 'Normal/Rounded'
      7: 'Normal/Off Center'
      8: 'Normal/Square'
      9: 'Oblique/Contact'
      10: 'Oblique/Weighted'
      11: 'Oblique/Boxed'
      12: 'Oblique/Flattened'
      13: 'Oblique/Rounded'
      14: 'Oblique/Off Center'
      15: 'Oblique/Square'
    }
    MIDLINE: {
      0: 'Any'
      1: 'No Fit'
      2: 'Standard/Trimmed'
      3: 'Standard/Pointed'
      4: 'Standard/Serifed'
      5: 'High/Trimmed'
      6: 'High/Pointed'
      7: 'High/Serifed'
      8: 'Constant/Trimmed'
      9: 'Constant/Pointed'
      10: 'Constant/Serifed'
      11: 'Low/Trimmed'
      12: 'Low/Pointed'
      13: 'Low/Serifed'
    }
    X_HEIGHT: {
      0: 'Any'
      1: 'No Fit'
      2: 'Constant/Small'
      3: 'Constant/Standard'
      4: 'Constant/Large'
      5: 'Ducking/Small'
      6: 'Ducking/Standard'
      7: 'Ducking/Large'
    }
  }

  # UNICODE_RANGE
  @UNICODE_RANGE: {
    0: 'Basic Latin'
    1: 'Latin-1 Supplement'
    2: 'Latin Extended-A'
    3: 'Latin Extended-B'
    4: 'IPA Extensions'
    5: 'Spacing Modifier Letters'
    6: 'Combining Diacritical Marks'
    7: 'Basic Greek'
    8: 'Greek Symbols and Coptic'
    9: 'Cyrillic'
    10: 'Armenian'
    11: 'Basic Hebrew'
    12: 'Hebrew Extended (A and B blocks combined)'
    13: 'Basic Arabic'
    14: 'Arabic Extended'
    15: 'Devanagari'
    16: 'Bengali'
    17: 'Gurmukhi'
    18: 'Gujarati'
    19: 'Oriya'
    20: 'Tamil'
    21: 'Telugu'
    22: 'Kannada'
    23: 'Malayalam'
    24: 'Thai'
    25: 'Lao'
    26: 'Basic Georgian'
    27: 'Georgian Extended'
    28: 'Hangul Jamo'
    29: 'Latin Extended Additional'
    30: 'Greek Extended'
    31: 'General Punctuation'
    32: 'Superscripts And Subscripts'
    33: 'Currency Symbols'
    34: 'Combining Diacritical Marks For Symbols'
    35: 'Letterlike Symbols'
    36: 'Number Forms'
    37: 'Arrows'
    38: 'Mathematical Operators'
    39: 'Miscellaneous Technical'
    40: 'Control Pictures'
    41: 'Optical Character Recognition'
    42: 'Enclosed Alphanumerics'
    43: 'Box Drawing'
    44: 'Block Elements'
    45: 'Geometric Shapes'
    46: 'Miscellaneous Symbols'
    47: 'Dingbats'
    48: 'CJK Symbols And Punctuation'
    49: 'Hiragana'
    50: 'Katakana'
    51: 'Bopomofo'
    52: 'Hangul Compatibility Jamo'
    53: 'CJK Miscellaneous'
    54: 'Enclosed CJK Letters And Months'
    55: 'CJK Compatibility'
    56: 'Hangul'
    57: 'Reserved for Unicode SubRanges'
    58: 'Reserved for Unicode SubRanges'
    59: 'CJK Unified Ideographs'
    60: 'Private Use Area'
    61: 'CJK Compatibility Ideographs'
    62: 'Alphabetic Presentation Forms'
    63: 'Arabic Presentation Forms-A'
    64: 'Combining Half Marks'
    65: 'CJK Compatibility Forms'
    66: 'Small Form Variants'
    67: 'Arabic Presentation Forms-B'
    68: 'Halfwidth And Fullwidth Forms'
    69: 'Specials'
  }

  # UL_CODE_PAGE_RANGE
  @UL_CODE_PAGE_RANGE: {
    0: {codePage: 1252, description: 'Latin 1'}
    1: {codePage: 1250, description: 'Latin 2: Eastern Europe'}
    2: {codePage: 1251, description: 'Cyrillic'}
    3: {codePage: 1253, description: 'Greek'}
    4: {codePage: 1254, description: 'Turkish'}
    5: {codePage: 1255, description: 'Hebrew'}
    6: {codePage: 1256, description: 'Arabic'}
    7: {codePage: 1257, description: 'Windows Baltic'}
    # 8-15: 'Reserved for Alternate ANSI'
    16: {codePage:  874, description: 'Thai'}
    17: {codePage:  932, description: 'JIS/Japan'}
    18: {codePage:  936, description: 'Chinese: Simplified chars--PRC and Singapore'}
    19: {codePage:  949, description: 'Korean Wansung'}
    20: {codePage:  950, description: 'Chinese: Traditional chars--Taiwan and Hong Kong'}
    21: {codePage: 1361, description: 'Korean Johab'}
    # 22-28: 'Reserved for Alternate ANSI &amp; OEM'
    29: {codePage: null, description: 'Macintosh Character Set (US Roman)'}
    30: {codePage: null, description: 'OEM Character Set'}
    31: {codePage: null, description: 'Symbol Character Set'}
    # 32-47: 'Reserved for OEM'
    48: {codePage:  869, description: 'IBM Greek'}
    49: {codePage:  866, description: 'MS-DOS Russian'}
    50: {codePage:  865, description: 'MS-DOS Nordic'}
    51: {codePage:  864, description: 'Arabic'}
    52: {codePage:  863, description: 'MS-DOS Canadian French'}
    53: {codePage:  862, description: 'Hebrew'}
    54: {codePage:  861, description: 'MS-DOS Icelandic'}
    55: {codePage:  860, description: 'MS-DOS Portuguese'}
    56: {codePage:  857, description: 'IBM Turkish'}
    57: {codePage:  855, description: 'IBM Cyrillic; primarily Russian'}
    58: {codePage:  852, description: 'Latin 2'}
    59: {codePage:  775, description: 'MS-DOS Baltic'}
    60: {codePage:  737, description: 'Greek; former 437 G'}
    61: {codePage:  708, description: 'Arabic; ASMO 708'}
    62: {codePage:  850, description: 'WE/Latin 1'}
    63: {codePage:  437, description: 'US'}
  }

  # Create OS_2Table instance from TTFDataView
  # @param {TTFDataView} view
  # @param {Number} offset 
  # @param {TrueType} ttf
  # @return {OS_2Table}
  @createFromTTFDataView: (view, offset, ttf) ->
    view.seek offset
    OS2 = new OS_2Table()

    OS2.version = view.getUshort()
    OS2.xAvgCharWidth = view.getShort()
    OS2.usWeightClass = view.getUshort()
    OS2.usWidthClass = view.getUshort()
    OS2.fsType = view.getUshortFlags()
    OS2.ySubscriptXSize = view.getShort()
    OS2.ySubscriptYSize = view.getShort()
    OS2.ySubscriptXOffset = view.getShort()
    OS2.ySubscriptYOffset = view.getShort()
    OS2.ySuperscriptXSize = view.getShort()
    OS2.ySuperscriptYSize = view.getShort()
    OS2.ySuperscriptXOffset = view.getShort()
    OS2.ySuperscriptYOffset = view.getShort()
    OS2.yStrikeoutSize = view.getShort()
    OS2.yStrikeoutPosition = view.getShort()

    # sFamilyClass
    OS2.sFamilyClass.class = view.getByte()
    OS2.sFamilyClass.subclass = view.getByte()

    # panose
    OS2.panose.bFamilyType = view.getByte()
    OS2.panose.bSerifStyle = view.getByte()
    OS2.panose.bWeight = view.getByte()
    OS2.panose.bProportion = view.getByte()
    OS2.panose.bContrast = view.getByte()
    OS2.panose.bStrokeVariation = view.getByte()
    OS2.panose.bArmStyle = view.getByte()
    OS2.panose.bLetterForm = view.getByte()
    OS2.panose.bMidline = view.getByte()
    OS2.panose.bXHeight = view.getByte()

    # UnicodeRange
    OS2.ulUnicodeRange1 = view.getUlongFlags()
    if OS2.version > 0 
      OS2.ulUnicodeRange2 = view.getUlongFlags()
      OS2.ulUnicodeRange3 = view.getUlongFlags()
      OS2.ulUnicodeRange4 = view.getUlongFlags()
   
    OS2.achVendID = view.getString(4)
    OS2.fsSelection = view.getUshortFlags()
    OS2.usFirstCharIndex = view.getUshort()
    OS2.usLastCharIndex = view.getUshort()
    OS2.sTypoAscender = view.getShort()
    OS2.sTypoDescender = view.getShort()
    OS2.sTypoLineGap = view.getShort()
    OS2.usWinAscent = view.getUshort()
    OS2.usWinDescent = view.getUshort()

    if OS2.version > 0
      OS2.ulCodePageRange1 = view.getUlongFlags()
      OS2.ulCodePageRange2 = view.getUlongFlags()

    if OS2.version > 1
      OS2.sxHeight = view.getShort()
      OS2.sCapHeight = view.getShort()
      OS2.usDefaultChar = view.getUshort()
      OS2.usBreakChar = view.getUshort()
      OS2.usMaxContext = view.getUshort()

    # return OS2
    OS2

# exports
module.exports = OS_2Table
