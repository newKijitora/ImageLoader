// ImageLoaderクラス
// 画像データを内部に保持して外部のcanvasコンテキストに出力する
class ImageLoader {
    
    // 初期化
    constructor() {
        this.imageWidth = 0; // 画像の幅
        this.imageHeight = 0; // 画像の高さ
        this.pixelArray = undefined; // 画素の配列
        this.canvas = undefined; // 内部のcanvas
        this.context = undefined; // 内部のコンテキスト
    }

    // 画像のデータを読み込む
    loadImage(image) {
        // 画像の幅と高さを格納
        this.imageWidth = image.width;
        this.imageHeight = image.height;

        // 内部的なcanvasで画像の情報を取得
        let canvas = document.createElement("canvas");
        
        if (!canvas.getContext) {
            console.log("CanvasAPIが使用できません");
            return;
        }
        
        canvas.width = this.imageWidth;
        canvas.height = this.imageHeight;

        let context = canvas.getContext("2d");
        context.drawImage(image, 0, 0);

        // 画素オブジェクトに画素情報を格納
        this.pixelArray = new Array(this.imageHeight);
        
        for (let y = 0; y < this.imageHeight; y++) {
            this.pixelArray[y] = new Array(this.imageWidth);
            
            for (let x = 0; x < this.imageWidth; x++) {
                this.pixelArray[y][x] = new Pixel(x, y, context.getImageData(x, y, 1, 1));
            }
        }
    }

    // 描画（画素オブジェクトによる塗りつぶし）
    draw(canvas, dotString) {
        if (!canvas.getContext) {
            console.log("CanvasAPIが使用できません");
            return;
        }

        let dot = parseInt(dotString);

        // 画像の情報でcanvas要素を初期化
        canvas.width = this.imageWidth;
        canvas.height = this.imageHeight;
        
        var context = canvas.getContext("2d");

        // 要求されたドットの大きさに応じて画素オブジェクトが描画
        let rows = Math.floor(this.pixelArray.length / dot);
        let rowLack = this.pixelArray.length % dot; // 余りピクセル
        let center = dot != 1 ? Math.floor(dot / 2) : 0;

        for (let i = 0; i < rows; i++) {
            let columns = Math.floor(this.pixelArray[i].length / dot);
            let columnLack = this.pixelArray[i].length % dot; // 余りピクセル（列）

            for (let j = 0; j < columns; j++) {
                let rgba = this.pixelArray[i * dot + center][j * dot + center].rgba;
                this.pixelArray[i * dot][j * dot].fill(context, dot, dot, rgba);

                // 余りピクセル（列）がある場合
                if (j == columns - 1 && columnLack > 0) {
                    let rgba = this.pixelArray[i * dot + center][j * dot + (dot + columnLack - 1)].rgba;
                    this.pixelArray[i * dot][j * dot + dot].fill(context, dot, dot, rgba);
                }
            }

            // 余りピクセル（行）がある場合
            if (i == rows - 1 && rowLack > 0) {
                for (let j = 0; j < columns; j++) {
                    let rgba = this.pixelArray[i * dot + dot + rowLack - 1][j * dot + center].rgba;
                    this.pixelArray[i * dot + dot][j * dot].fill(context, dot, dot, rgba);
    
                    // 余りピクセル（列）がある場合
                    if (j == columns - 1 && columnLack > 0) {
                        let rgba = this.pixelArray[i * dot + dot + rowLack - 1][j * dot + dot + columnLack - 1].rgba;
                        this.pixelArray[i * dot + dot][j * dot + dot].fill(context, dot, dot, rgba);
                    }
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
        this.rgba = "rgba(" + this.data[0] + "," + this.data[1] + "," + this.data[2] + "," + this.data[3] + ")";
    }
    
    // 塗りつぶし
    fill(context, width, height, rgba) {
        // 塗りつぶし色の設定
        context.fillStyle = rgba;
        context.fillRect(this.posX, this.posY, width, height);
    }
}
