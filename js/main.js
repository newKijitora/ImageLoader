// もとになる画像
var image = new Image();
image.src = "images/totoro1.jpg";

var loaded = false;

// キャンバス要素の取得
var canvas = document.getElementById("canvas");

if (canvas.getContext) {
    // コンテキストの取得    
    var context = canvas.getContext("2d");

    // 描画オブジェクト
    var imageLoader = new ImageLoader();

    // 画像ロード時のイベント
    image.onload = function(event) {
        imageLoader.loadImage(image);
        imageLoader.draw(context, 1);
        loaded = true;
    }

    // レンジの初期化
    var range = document.getElementById("range");
    range.addEventListener("input", function() {
        if (loaded) {
            imageLoader.draw(context, range.value);
        }
    });
}
