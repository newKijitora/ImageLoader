// もとになる画像
var image = new Image();
image.src = "images/kijitora.png";

var loaded = false;

// キャンバス要素の取得
var canvas = document.getElementById("canvas");

if (canvas.getContext) {
    
    // 描画オブジェクト
    var imageLoader = new ImageLoader();

    // 画像ロード時のイベント
    image.onload = function(event) {
        imageLoader.loadImage(image);
        imageLoader.draw(canvas, 1);
        console.log("done");
        loaded = true;
    }

    // レンジの初期化
    var range = document.getElementById("range");
    range.addEventListener("input", function() {
        if (loaded) {
            imageLoader.draw(canvas, range.value);
        }
    });
}
