import {LsReader} from "./ls-reader";
import {Utils, ChangeFrameEnum} from "./utils";

export default class Container extends HTMLElement {

    frames: HTMLImageElement[] = [];
    currentFrame = 0;

    constructor() {
        super();
        const lsUrl = this.getAttribute("src");
        if (lsUrl) {
            this.preloadImages(lsUrl);
        }
        this.initKeyboard();
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
                        this.initTouch();
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
        // Force gif replay.
        if (frame.src.includes('blob:') && previousFrame && previousFrame < this.currentFrame) {
            setTimeout(() => {
                frame.src = frame.src;
            })
        }
        this.appendChild(frame);
    }

    private initKeyboard() {
        document.addEventListener('keydown', (e) => {
            switch (e.key) {
                case "ArrowLeft":
                    this.changeFrame(ChangeFrameEnum.LEFT);
                    break;
                case "ArrowRight":
                    this.changeFrame(ChangeFrameEnum.RIGHT);
                    break;
            }
        })
    }

    private initTouch() {
        this.onclick = (e) => {
            //  Click left
            if (e.offsetX < this.offsetWidth / 2) {
                this.changeFrame(ChangeFrameEnum.LEFT);

            } else { // click right
                this.changeFrame(ChangeFrameEnum.RIGHT);
            }
        }
    }

    private changeFrame(change: ChangeFrameEnum) {
        let previous = null;
        switch (change) {
            case ChangeFrameEnum.LEFT:
                if (this.currentFrame !== 0) {
                    previous = this.currentFrame;
                    this.currentFrame--;
                }
                break;
            case ChangeFrameEnum.RIGHT:
                if (this.currentFrame !== this.frames.length - 1) {
                    previous = this.currentFrame;
                    this.currentFrame++;
                }
                break;
        }
        this.displayFrame(previous);
    }
}
