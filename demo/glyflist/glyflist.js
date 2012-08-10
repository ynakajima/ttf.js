var font;
var glyfSVG = $('<li class="glyf"><div><h3></h3><p><svg class="glyfSVG" viewBox="-100 -100 1200 2000"><g transform="translate(1000, 0) scale(-1, 1) rotate(180, 500, 500)"><path class="path" d="M 0,0" /></g></svg></p></div></li>');

$(function () {
    var readbutton = document.getElementById("read");
    readbutton.addEventListener("change", onReadFile, false);
});

// フォントファイルを読み込み
function onReadFile(e) {
        
        $("#loading").show();
                
        var file = e.target.files[0];

        if (true || file.type == "application/x-font-ttf") {
                
                $('#glyfList').html("");
                
                var reader = new FileReader();
                
                // ロード完了後処理
                reader.onload = function(e) {
                    
                        $("#loading").hide();
                        
                        font = new ttfjs.TTF(e.target.result);
                        
                        /** 各glyf描画 */
                        for ( var i = 0, l = font.glyf.length; i < l; i++) {
                            var glyf = font.glyf[i];
                            var svg =  glyfSVG.clone(true);
                            svg.find("h3").html(i);
                            if (glyf.path !== '') {
                                var scale = 1000/font.head.unitsPerEm;
                                svg.find(".path").attr('d', glyf.path).attr('transform', 'scale(' + scale + ',' + scale + ')');
                            }
                            $('#glyfList').append(svg);
                        }
                        
                        $("li.glyf p").hover(
                            function () {
                                $(this).addClass('hover');
                            },
                            function () {
                                $(this).removeClass('hover');
                            }
                        );
                };

                // エラー処理
                reader.onerror = function(e) {
                        console.log("err", e);
                };

                // ファイル読み込み
                reader.readAsArrayBuffer(file);
        }
}