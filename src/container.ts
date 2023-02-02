import {LsReader} from "./ls-reader";

export default class Container extends HTMLElement {

    frames: HTMLImageElement[] = [];
    currentFrame = 0;

    constructor() {
        super();
        // this.innerHTML = "<span>Playmics container</span>";
        const lsUrl = this.getAttribute("src");
        if (lsUrl) {
            this.preloadImages(lsUrl);
        }
    }

    private preloadImages(url: string) {
        LsReader.parse(url).then(frames => {
            frames.forEach((e, i) => {
                const img = new Image();
                img.src = e;
                img.onload = () => {
                    if (frames.length - 1 === i) {
                        console.log(this.frames)
                        this.displayFrame();
                        this.changeFrame();
                    }
                }
                this.frames.push(img);
            })
        });
    }

    private displayFrame(previousFrame: number | null = null) {
        console.log(this.frames[this.currentFrame].src);
        if (previousFrame !== null) {
            this.removeChild(this.frames[previousFrame]);
        }
        this.appendChild(this.frames[this.currentFrame]);
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
