/**
 * ttf.js - JavaScript TrueType Font library
 *
 * Copyright (C) 2012 by ynakajima
 *
 * License : New BSD License require : jDataView
 *
 */
/*
 * Redistribution and use in source and binary forms, with or without
 * modification, are permitted provided that the following conditions are met:
 *
 * Redistributions of source code must retain the above copyright notice, this
 * list of conditions and the following disclaimer.
 *
 * Redistributions in binary form must reproduce the above copyright notice,
 * this list of conditions and the following disclaimer in the documentation
 * and/or other materials provided with the distribution.
 *
 * The name of the author may not be used to endorse or promote products derived
 * from this software without specific prior written permission.
 *
 * THIS SOFTWARE IS PROVIDED BY THE AUTHOR ``AS IS'' AND ANY EXPRESS OR IMPLIED
 * WARRANTIES, INCLUDING, BUT NOT LIMITED TO, THE IMPLIED WARRANTIES OF
 * MERCHANTABILITY AND FITNESS FOR A PARTICULAR PURPOSE ARE DISCLAIMED. IN NO
 * EVENT SHALL THE AUTHOR BE LIABLE FOR ANY DIRECT, INDIRECT, INCIDENTAL,
 * SPECIAL, EXEMPLARY, OR CONSEQUENTIAL DAMAGES (INCLUDING, BUT NOT LIMITED TO,
 * PROCUREMENT OF SUBSTITUTE GOODS OR SERVICES; LOSS OF USE, DATA, OR PROFITS;
 * OR BUSINESS INTERRUPTION) HOWEVER CAUSED AND ON ANY THEORY OF LIABILITY,
 * WHETHER IN CONTRACT, STRICT LIABILITY, OR TORT (INCLUDING NEGLIGENCE OR
 * OTHERWISE) ARISING IN ANY WAY OUT OF THE USE OF THIS SOFTWARE, EVEN IF
 * ADVISED OF THE POSSIBILITY OF SUCH DAMAGE.
 */

(function(global) {

	// import jDataView
	if (typeof global.jDataView === 'undefined'
			&& typeof require === 'function') {
		var jDataView = require('jDataView');
	} else {
		var jDataView = global.jDataView;
	}

	/**
	 * TrueTypeFont Constructor
	 * @param {ArrayBuffer} ttf
	 */
	var TTF = function(ttf) {
		this.ttf = ttf;
		this.view = null;
		this._readTables();
	};

	/**
	 * TrueTypeFontの各テーブルを読み込む
	 */
	TTF.prototype._readTables = function() {

		// view作成
		var view = new jDataView(this.ttf, 0, this.ttf.byteLength, false); // bigEndian
		this.view = view;

		// version
		this.version = view.getFixed(0, false);

		// num tables
		this.numTables = view.getUint16(4, false);

		// searchRenge
		this.searchRenge = view.getUint16(6, false);

		// entrySelector
		this.entrySelector = view.getUint16(8, false);

		// rengeShift
		this.rengeShift = view.getUint16(10, false);

		// tableDirectoryの取得と各テーブルの初期化
		this.tableDirectory = new TTFTableDirectory(view, view.tell(), this.numTables);

		//各種テーブルの初期化
		for (var tag in this.tableDirectory) {
			this[tag] = {};
		}

		// head
		var headOffset = this.tableDirectory.head.offset;
		this.head.version = view.getFixed(headOffset);
		this.head.fontRevision = view.getFixed(headOffset + 4);
		this.head.checkSumAdjustment = view.getUint32(headOffset + 8, false)
				.toString(16);
		this.head.magickNumber = view.getUint32(headOffset + 12, false)
				.toString(16);
		this.head.flags = padZero(view.getUint16(headOffset + 16, false)
				.toString(2), 16);
		this.head.unitsPerEm = view.getUint16(headOffset + 18, false);
		this.head.created = view.getLongDateTime(headOffset + 20, false);
		this.head.modified = view.getLongDateTime(headOffset + 28, false);
		this.head.xMin = view.getInt16(headOffset + 36, false);
		this.head.yMin = view.getInt16(headOffset + 38, false);
		this.head.xMax = view.getInt16(headOffset + 40, false);
		this.head.yMax = view.getInt16(headOffset + 42, false);
		this.head.macStyle = padZero(view.getUint16(headOffset + 44, false)
				.toString(2), 16);
		this.head.lowestRecPPEM = view.getUint16(headOffset + 46, false);
		this.head.fontDirectionHint = view.getInt16(headOffset + 48, false);
		this.head.indexToLocFormat = view.getInt16(headOffset + 50, false);
		this.head.glyphDataFormat = view.getInt16(headOffset + 52, false);

		// maxp
		var maxpOffset = this.tableDirectory.maxp.offset;
		this.maxp.version = view.getFixed(maxpOffset);
		this.maxp.numGlyphs = view.getUint16(maxpOffset + 4, false);
		this.maxp.maxPoints = view.getUint16(maxpOffset + 6, false);
		this.maxp.maxCompositePoints = view.getUint16(maxpOffset + 8, false);
		this.maxp.maxCompositeContours = view.getUint16(maxpOffset + 10, false);
		this.maxp.maxZones = view.getUint16(maxpOffset + 12, false);
		this.maxp.maxTwilightPoints = view.getUint16(maxpOffset + 14, false);
		this.maxp.maxStorage = view.getUint16(maxpOffset + 16, false);
		this.maxp.maxFunctionDefs = view.getUint16(maxpOffset + 18, false);
		this.maxp.maxInstructionDefs = view.getUint16(maxpOffset + 20, false);
		this.maxp.maxStackElements = view.getUint16(maxpOffset + 22, false);
		this.maxp.maxSizeOfInstructions = view.getUint16(maxpOffset + 26, false);
		this.maxp.maxComponentElements = view.getUint16(maxpOffset + 28, false);
		this.maxp.maxComponentDepth = view.getUint16(maxpOffset + 30, false);

		// loca
		var locaOffset = this.tableDirectory.loca.offset;
		this.loca = [];
		this.locaOffsetSize = [];

		var locaType = (this.head.indexToLocFormat === 0) ? "Uint16" : "Uint32";
		var locaSize = (this.head.indexToLocFormat === 0) ? 2 : 4;
		var locaRatio = (this.head.indexToLocFormat === 0) ? 2 : 1;

		for ( var i = 0; i < this.maxp.numGlyphs; i++) {
			this.loca.push(view["get" + locaType](locaOffset, false)
					* locaRatio); // locaのタイプがshortだった場合、2で割った値が記録されている為2をかけて値を戻す
			this.locaOffsetSize.push(locaOffset);
			locaOffset += locaSize;
		}

		// glyf
		var glyfOffset = this.tableDirectory.glyf.offset;
		this._glyfDataList = {};
		this.glyf = [];

		// グリフデータリストを作成
		for ( var i = 0, l = this.loca.length; i < l; i++) {
			var offset = this.tableDirectory.glyf.offset + this.loca[i];
			if (typeof this._glyfDataList[offset] == "undefined") {
				// 次のグリフと同じオフセット値だった場合は空のグリフとして処理
				var isNull = (i + 1 < l && this.loca[i] === this.loca[i + 1]);
				this._glyfDataList[offset] = new TTFGlyf(view, offset, isNull);
			}
			this.glyf[i] = this._glyfDataList[offset];
		}

        // cmap
        var cmapOffset = this.tableDirectory.cmap.offset;

        this.cmap.version = view.getUint16( cmapOffset , false );
        this.cmap.numberSubtables = view.getUint16(cmapOffset + 2 , false );
        this.cmap.tables = [];
        for( var i =0 ; i < this.cmap.numberSubtables; i++){
            var table = {};
            table.platformID = view.getUint16( cmapOffset + 8*i + 4 , false );
            table.platformSpecificID = view.getUint16( cmapOffset + 8*i + 6, false );
            table.offset = view.getUint32( cmapOffset + 8*i + 8, false );

            //table.format = view.getUint16( cmapOffset + table.offset, false );
            table.data = new TTFCmap( view, cmapOffset + table.offset );

            this.cmap.tables.push( table );
        }

        var self = this;
        this.cmap.getGlyphIndex = function ( c ) {
            return self.cmap.tables.map( function ( item ) {
                return item.data._getGlyphIndex( c );
            });
        }

	};

	/**
	 * グリフインデックス値でグリフデータを取得
	 * @param {Number} glyfIndex
	 */
	TTF.prototype.getGlyfByIndex = function(glyfIndex) {
		return this.glyf[glyfIndex];
	};


	/**
	 * TableDirectory Constructor
	 * @param {jDataView} view
	 * @param {Number} offset
	 */
	function TTFTableDirectory (view, offset, numTables) {
		this.init(view, offset, numTables);
	};

	/**
	 * 初期化
	 * @param {jDataView} view
	 * @param {Number} offset
	 */
	TTFTableDirectory.prototype.init = function(view, offset, numTables) {
		for ( var i = offset, l = numTables * 16; i < l; i += 16) {

			var tag = view.getString(4, i);
			var checkSum = padZero(view.getUint32(i + 4, false).toString(16), 8);
			var offset = view.getUint32(i + 8, false);
			var length = view.getUint32(i + 12, false);

			this[tag] = {
				tag : tag,
				checkSum : checkSum,
				offset : offset,
				length : length
			};

		}
	};

    /**
     * cmap Constructor
     * @param {jDataView} view
     * @param {Number} offset
     */
    function TTFCmap( view, offset ) {
        this.format = view.getUint16(offset, false );
        if( this['_initFormat'+this.format] ){
            this['_initFormat'+this.format]( view, offset );
        }else{
            throw 'Not support cmap format'+format+' yet! Please submit an issue at github';
        }
    }

    /**
     * init format 0
     */
    TTFCmap.prototype._initFormat0 = function ( view, offset ) {
        this.length = view.getUint16( offset+2, false );
        this.language = view.getUint16( offset+4, false );
        this.glyphIndexArray = [];
        this.offset = offset;
        for( var i = 6 ; i< this.length ; i++ ){
            this.glyphIndexArray.push( view.getUint8( offset + i ) );
        }

        this._getGlyphIndex = function ( c ) {
            var code = c.charCodeAt(0);
            if( code < 256 ){
                return this.glyphIndexArray[code];
            }else{
                return 0;
            }
        }
    };

    TTFCmap.prototype._initFormat4 = function ( view, offset ) {
        this.length = view.getUint16( offset+2, false );
        this.language = view.getUint16( offset+4, false );
        this.segCount = view.getUint16( offset + 6 , false )/2;
        this.searchRange = view.getUint16( offset + 8 , false );
        this.entrySelector = view.getUint16( offset + 10, false );
        this.rangeShift = view.getUint16( offset + 12 , false );

        this.endCode = [];
        this.startCode = [];
        this.idDelta = [];
        this.idRangeOffset = [];
        for(var i = 0; i < this.segCount ; i++ ){
            this.endCode.push( view.getUint16( offset + 14 + 2*i , false ) );
            this.startCode.push( view.getUint16( offset + 16 + this.segCount*2 + 2*i, false ) );
            this.idDelta.push( view.getInt16( offset + 16 + this.segCount*4 + 2*i, false ) );
            this.idRangeOffset.push( view.getUint16( offset + 16 + this.segCount*6 + 2*i, false ) );
        }
        this.reservedPad = view.getUint16( offset + 14 + this.segCount * 2 , false);

        this.glyphIndexArray = [];
        for( var i = offset + 16 + this.segCount*8 ; i < ( offset + this.length) ; i+=2){
            this.glyphIndexArray.push( view.getUint16( i ,false ));
        }

        this._getGlyphIndex = function ( c ) {
            var code = c.charCodeAt(0);
            var segmentIndex = 0;
            this.endCode.some( function ( item ,i ) {
                if( code <= item ){
                    segmentIndex = i;
                    return true;
                }
            });
            var idRangeOffset = this.idRangeOffset[segmentIndex];
            var idDelta = this.idDelta[segmentIndex];
            var startCode = this.startCode[segmentIndex];
            var endCode = this.endCode[segmentIndex];

            if( idRangeOffset === 0 ){
                if( code >= startCode && code <= endCode ){
                    return code += idDelta;
                }else{
                    return 0;
                }
            }else{
                throw 'Not support cmap format4 with idRangeOffset is not zero yet! Please submit an issue at github';
                // Not implement yet
            }
        }
    };



	/**
	 * Glyph Constructor
	 * @param {jDataView} view
	 * @param {Number} offset
	 * @param {Boolean} isNull
	 */
	function TTFGlyf(view, offset, isNull) {
		// 各種初期化
		this.view = view;
		this.offset = offset;
		this.isNull = isNull;
		this.flags = [];
		this.flagsOrig = [];
		this.totalOfCoordinates = 0;
		this.coordinates = [];
		this.xCoorinateOffset = 0;
		this.xCoordinates = [];
		this.yCoorinateOffset = 0;
		this.yCoordinates = [];
		this.pathArray = [];
		this.path = "";

		// グリフの内容があれば初期化を行う
		if (!isNull) {
			this.init();
		}
	};

	/**
	 * グリフの初期化
	 */
	TTFGlyf.prototype.init = function() {
		var view = this.view;
		var offset = this.offset;

		// 各種設定値
		this.numberOfContours = view.getInt16(offset, false);
		offset += 2;
		this.xMin = view.getInt16(offset, false);
		offset += 2;
		this.yMin = view.getInt16(offset, false);
		offset += 2;
		this.xMax = view.getInt16(offset, false);
		offset += 2;
		this.yMax = view.getInt16(offset, false);
		offset += 2;

		// endPtsOfConturs
		this.endPtsOfContours = [];
		if (this.numberOfContours >= 0) {
			for ( var i = 0; i < this.numberOfContours; i++) {
				this.endPtsOfContours.push(view.getUint16(offset, false));
				offset += 2;
			}
		}

		// instructions
		this.instructionLength = view.getUint16(offset, false);
		offset += 2;
		this.instructions = [];
		for ( var i = 0; i < this.instructionLength; i++) {
			// this.instructions.push(view.getUint8(offset));
			offset++;
		}

		// flagオフセット値
		this.flagsOffset = offset;

		// 座標データを読み込み
		this._readGlyfCoordinates();
	};

	/**
	 * グリフの座標データを読み込む
	 */
	TTFGlyf.prototype._readGlyfCoordinates = function() {
		// コンポジットの場合は処理せず
		/** @TODO コンポジットの処理を実装する */
		if (this.numberOfContours >= 0) {
			this._readSimpleGlyf();
		}
	};

	/**
	 * 単体のグリフの座標データを読み込む
	 */
	TTFGlyf.prototype._readSimpleGlyf = function() {
		var view = this.view;
		var offset = this.flagsOffset;

		// 総座標数を取得
		var totalOfCoordinates = this.endPtsOfContours[this.endPtsOfContours.length - 1] + 1;
		this.totalOfCoordinates = totalOfCoordinates;

		// flagを取得
		var i = 0;
		while (i < totalOfCoordinates) {
			var flag = view.getUint8(offset);
			this.flags.push(flag);
			offset++;
			i++;

			// 3bit目が立っていた場合は繰り返し命令
			if (flag & 8 && i < totalOfCoordinates) {
				// 繰り返し回数(次のフラグの値)
				var repeat = view.getUint8(offset);
				offset++;
				this.flagsOrig.push(repeat);
				for ( var j = 0; j < repeat; j++) {
					this.flags.push(flag);
					i++;
				}
			}
		}

		// xCoordinates
		this.xCoorinateOffset = offset;
		var prevX = 0;
		for ( var i = 0, l = this.flags.length; i < l; i++) {
			var x = 0;
			var flag = this.flags[i];

			// 座標の型がBYTEの場合
			if (flag & 2) {
				x = view.getUint8(offset);
				offset += 1;

				// 値の正負
				x = (flag & 16) ? x : -1 * x;
			} else if (flag & 16) {
				// 前の値と同じ
				x = 0;
			} else {
				// 値を取得
				x = view.getInt16(offset, false);
				offset += 2;
			}

			prevX += x;
			this.xCoordinates[i] = prevX;
			this.coordinates[i] = {
				x : prevX,
				y : 0,
				isOnCurve : Boolean(flag & 1)
			};
		}

		// yCoordinates
		this.yCoorinateOffset = offset;
		var prevY = 0;
		for ( var i = 0, l = this.flags.length; i < l; i++) {
			var y = 0;
			var flag = this.flags[i];

			// 座標の型がSHORTの場合
			if (flag & 4) {
				y = view.getUint8(offset);
				offset++;

				// 値の正負
				y = (flag & 32) ? y : -1 * y;
			} else if (flag & 32) {
				// 前の値と同じ
				y = 0;
			} else {
				// 値を取得
				y = view.getInt16(offset, false);
				offset += 2;
			}

			prevY += y;
			this.yCoordinates[i] = prevY;
			if (typeof this.coordinates[i] !== 'undefined') {
				this.coordinates[i].y = prevY;
			}
		}

		// path用のデータを初期化
		var pathArray = [];
		var startPts = 0;
		var currentPts = 0;

		try {
			// 各輪郭毎に処理
			for ( var i = 0, l = this.endPtsOfContours.length; i < l; i++) {
				// 各輪郭内の座標処理
				for ( var endPts = this.endPtsOfContours[i]; currentPts < endPts + 1; currentPts++) {
					var path = "";
					var currentPoint = this.coordinates[currentPts];
					var prevPoint = (currentPts === startPts) ? this.coordinates[endPts]
							: this.coordinates[currentPts - 1];
					var nextPoint = (currentPts === endPts) ? this.coordinates[startPts]
							: this.coordinates[currentPts + 1];

					if (typeof currentPoint === 'undefined') {
						continue;
					}

					if (currentPts === startPts) { // 輪郭の開始点
						if (currentPoint.isOnCurve) {
							path += "M" + currentPoint.x + "," + currentPoint.y + " ";
						} else { // 開始点が曲線上になかった場合

							// 中間点
							var midPoint = {
								x : (prevPoint.x + currentPoint.x) / 2,
								y : (prevPoint.y + currentPoint.y) / 2
							};
							path += "M" + midPoint.x + "," + midPoint.y + " Q"
									+ currentPoint.x + "," + currentPoint.y
									+ " ";
						}
					} else {
						// pathの制御情報
						if (typeof currentPoint !== 'undefined'
								&& typeof currentPoint.isOnCurve === 'boolean'
								&& currentPoint.isOnCurve
								&& typeof prevPoint !== 'undefined'
								&& typeof prevPoint.isOnCurve === 'boolean'
								&& prevPoint.isOnCurve) { // 直線の場合
							path += " L";
						} else if (currentPoint.isOnCurve === false
								&& typeof prevPoint !== 'undefined'
								&& typeof prevPoint.isOnCurve === 'boolean'
								&& prevPoint.isOnCurve === false) { // 現在の座標と直前の座標が曲線上になかった場合

							// 中間点
							var midPoint = {
								x : (prevPoint.x + currentPoint.x) / 2,
								y : (prevPoint.y + currentPoint.y) / 2
							};
							path += midPoint.x + "," + midPoint.y + " ";
						} else if (!currentPoint.isOnCurve) { // 現在の座標が曲線上にない場合
							path += " Q";
						}

						// 現在の座標を追加
						path += currentPoint.x + "," + currentPoint.y + " ";
					}
					pathArray.push(path);
				}

				// 輪郭の終点が曲線上にない場合の処理
				if (!currentPoint.isOnCurve
						&& typeof this.coordinates[startPts] !== 'undefined') {

					// 輪郭の開始点が曲線上にあった場合
				  if (this.coordinates[startPts].isOnCurve) {
						pathArray.push(this.coordinates[startPts].x + ","
								+ this.coordinates[startPts].y + " ");
					} else {
						var midPoint = {
								x : (currentPoint.x + this.coordinates[startPts].x) / 2,
								y : (currentPoint.y + this.coordinates[startPts].y) / 2
							};
						pathArray.push(midPoint.x + "," + midPoint.y + " ");
					}
				}

				// パスを閉じる
				pathArray.push(" Z ");

				// 次の輪郭の開始点
				startPts = this.endPtsOfContours[i] + 1;
			}
		} catch (e) {
			//エラー処理
			console.log(e);
			console.log(currentPoint, prevPoint, nextPoint, this);
		}
		this.pathArray = pathArray;
		this.path = pathArray.join(" ");
	};

	/**
	 * 補助関数
	 */

	// ゼロパディング
	function padZero(_char, width) {
		return ("0000000000000000000000000000000000000000000000000000000000000000" + _char)
				.slice(-1 * width);
	}

	/**
	 * jDataView拡張
	 */

	// jDataViewにgetFiexedメソッドを追加
	jDataView.prototype.getFixed = function(byteOffset) {
		/** 暫定 */
		var val = this.getInt32(byteOffset, false) / 65536.0;
		return Math.ceil(val * 100000) / 100000;
	};

	// jDataViewにgetLongDateTimeメソッドを追加
	jDataView.prototype.getLongDateTime = function(byteOffset) {
		/** @TODO 完成させる */
		// 1970.1.1 - 1904.1.1
		var delta = -2080198800000;// (new Date(1904, 1, 1)).getTime();
		var date = new Date();
		date.setTime(this.getUint32(byteOffset + 4, false));
		return date;
	};

	// export
	var ttfjs = {
		TTF : TTF,
		TTFTableDirectory: TTFTableDirectory,
		TTFGlyf : TTFGlyf
	};

	global.ttfjs = (global.module || {}).exports = ttfjs;
	if (typeof module !== 'undefined') {
		module.exports = ttfjs;
	}

})(this);
