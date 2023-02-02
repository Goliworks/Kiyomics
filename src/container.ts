import {LsReader} from "./ls-reader";

export default class Container extends HTMLElement {

    frames: HTMLImageElement[] = [];
    currentFrame = 0;

    constructor() {
        super();
        const lsUrl = this.getAttribute("src");
        if (lsUrl) {
            this.preloadImages(lsUrl);
        }
    }

    private preloadImages(url: string) {
        LsReader.parse(url).then(frames => {
            frames.forEach(async (e, i) => {
                const img = new Image();
                let url = e;
                // Create an arraybuffer if the image is a gif.
                if (e.includes('.gif')) {
                    url = await this.generateArrayBuffer(e);
                }
                img.src = url;
                img.onload = () => {
                    if (frames.length - 1 === i) {
                        console.log(this.frames)
                        this.displayFrame();
                        this.changeFrame();
                    }
                }
                this.frames[i] = img;
            })
        });
    }

    async generateArrayBuffer(url: string): Promise<string> {
        return new Promise((resolve) => {
            const xhr = new XMLHttpRequest();
            xhr.onload = () => {
                const arrayBuffer = xhr.response;
                console.log(arrayBuffer.byteLength);
                const blob = new Blob([arrayBuffer]);
                const imgUrl = URL.createObjectURL(blob);
                resolve(imgUrl);
            }
            xhr.open('GET', url);
            xhr.responseType = "arraybuffer";
            xhr.send();
        });
    }

    private displayFrame(previousFrame: number | null = null) {
        console.log(this.frames[this.currentFrame].src);
        if (previousFrame !== null) {
            this.removeChild(this.frames[previousFrame]);
        }
        const frame = this.frames[this.currentFrame];
        this.appendChild(frame);
        // Force gif replay.
        if (frame.src.includes('blob:')) {
            setTimeout(() => {
                frame.src = frame.src;
            })
        }
    }

    private changeFrame() {
        this.onclick = (e) => {
            //  Click left
            let previous = null;
            if (e.offsetX < this.offsetWidth / 2) {
                if (this.currentFrame !== 0) {
                    previous = this.currentFrame;
                    this.currentFrame--;
                }
            } else { // click right
                if (this.currentFrame !== this.frames.length - 1) {
                    previous = this.currentFrame;
                    this.currentFrame++;
                }
            }
            this.displayFrame(previous);
        }
    }
}
