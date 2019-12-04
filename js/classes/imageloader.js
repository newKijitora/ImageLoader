// ImageLoaderクラス
// 画像データを内部に保持して外部のcanvasコンテキストに出力する
class ImageLoader {
    
    // 初期化
    constructor() {
        this.width = 0; // 横幅
        this.height = 0; // 縦幅
        this.array = undefined; // 配列
        this.canvas = undefined; // 内部のcanvas
        this.context = undefined; // 内部のコンテキスト
    }

    // 画像のデータを読み込む
    loadImage(image) {
        this.width = image.width; // 画像の横幅
        this.height = image.height; // 画像の縦幅
        // 内部のcanvasとコンテキストを生成
        let canvas = document.createElement("canvas");
        canvas.width = this.width;
        canvas.height = this.height;
        let context = canvas.getContext("2d");
        // 画像情報のコピー
        context.drawImage(image, 0, 0);
        this.array = new Array(this.height); // 配列の行（高さ）
        for (let i = 0; i < this.height; i++) {
            this.array[i] = new Array(this.width); // 配列の列（幅）
            for (let j = 0; j < this.width; j++) {
                this.array[i][j] = new Pixel(j, i, context.getImageData(j, i, 1, 1));
            }
        }
    }

    // 描画（保持する画素配列による塗りつぶし）
    draw(canvas, dot) {
        if (canvas.getContext) {
            canvas.width = this.width;
            canvas.height = this.height;
            var context = canvas.getContext("2d");
            for (let i = 0; i < this.array.length / dot; i++) {
                for (let j = 0; j < this.array[i].length / dot; j++) {
                    let o = 0;
                    if (dot / 2 != 0) {
                        o = (dot / 2) + (dot % 2);
                    }
                    let style = "rgba(" + this.array[i * dot + o][j * dot+ o].data[0] + "," + this.array[i * dot + o][j * dot + o].data[1] + "," + this.array[i * dot + o][j * dot + o].data[2] + "," + this.array[i * dot + o][j * dot + o].data[3] + ")"; // 塗りつぶし色
                    this.array[i * dot][j * dot].fill(context, dot, style);
                }
            }
        }
    }
}

// 画素クラス
class Pixel {

    // 初期化
    constructor(x, y, imageData) {
        this.posX = x; // 位置X
        this.posY = y; // 位置Y
        this.data = imageData.data; // ピクセルデータ
    }
    
    // 塗りつぶし
    fill(context, dot, rgba) {
        context.fillStyle = rgba; // 塗りつぶし色
        context.fillRect(this.posX, this.posY, dot, dot); // 塗りつぶしの実行
    }
}
