import {LsReader} from "./ls-reader";
import {Utils} from "./utils";

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
                    url = await Utils.generateArrayBuffer(e);
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

    private displayFrame(previousFrame: number | null = null) {
        console.log(this.frames[this.currentFrame].src);
        if (previousFrame !== null) {
            // Avoid possible blinking.
            setTimeout(() => {
                this.removeChild(this.frames[previousFrame]);
            }, 10);
        }
        const frame = this.frames[this.currentFrame];
        if (frame.src.includes('blob:')) {
            setTimeout(() => {
                frame.src = frame.src;
            })
        }
        this.appendChild(frame);
        // Force gif replay.
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
