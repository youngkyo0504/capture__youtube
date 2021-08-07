export class SketchBook {
    constructor() {
        this.canvas = document.createElement('canvas');
        this.pencil = this.canvas.getContext('2d');
    }
    toDataURI(image, width, height) {
        //캔버스에 image를 그려주고 데이터 URI로 반환한다.
        this.pencil.drawImage(image, 0, 0, width, height);
        const dataURI = this.canvas.toDataURL('image/png');
        return { dataURI, width, height };
    }
    toImgElement(data) {
        const img = document.createElement('img');
        img.src = data.dataURI;
        img.classList.add('img');
        img.style.width = `${data.width * 0.27}px`;
        img.style.height = `${data.height * 0.27}px`;
        img.style.display = 'block';
        img.style.position = 'relative';
        return img;
    }
}
