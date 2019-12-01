// ImageLoaderクラス
// 画像データを内部に保持して外部のcanvasコンテキストに出力する
var ImageLoader = class {
    
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
                this.array[i][j] = new Pixel(j, i, 1, 1, context.getImageData(j, i, 1, 1));
            }
        }
    }

    // 描画（保持する画素配列による塗りつぶし）
    draw(context, dot) {
        for (let i = 0; i < this.array.length / dot; i++) {
            for (let j = 0; j < this.array[i].length / dot; j++) {
                this.array[i * dot][j * dot].draw(context, dot);
            }
        }
    }
}

// 画素クラス
var Pixel = class {
    
    // 初期化
    constructor(x, y, width, height, pix) {
        this.posX = x; // 位置X
        this.posY = y; // 位置Y
        this.width = width; // 画素横幅
        this.height = height; // 画素縦幅
        this.data = pix.data; // ピクセルデータ
        this.rgba = "rgba(" + this.data[0] + "," + this.data[1] + "," + this.data[2] + "," + this.data[3] + ")"; // RGBA値
    }
    
    // 塗りつぶし
    draw(context, dot) {
        context.fillStyle = this.rgba; // 塗りつぶし色
        context.fillRect(this.posX, this.posY, dot, dot); // 塗りつぶしの実行
    }
}
