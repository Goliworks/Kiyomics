import {LsReader} from "./ls-reader";

export default class Container extends HTMLElement {

    frames: HTMLImageElement[] = [];
    currentFrame = 0;
    imgFrame: HTMLDivElement;

    constructor() {
        super();
        // this.innerHTML = "<span>Playmics container</span>";
        const lsUrl = this.getAttribute("src");
        this.imgFrame = document.createElement("div");
        this.imgFrame.setAttribute("id", "img-frame");
        this.appendChild(this.imgFrame);
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
                    }
                }
                this.frames.push(img);
            })
        });
    }

    private displayFrame() {
        console.log(this.frames[this.currentFrame].src);
        this.imgFrame.style.backgroundImage = `url(${this.frames[this.currentFrame].src})`;
    }
}
