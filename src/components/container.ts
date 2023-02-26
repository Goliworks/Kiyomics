import {LsReader} from "../utils/ls-reader";
import {Utils} from "../utils/utils";
import {ChangeFrameEnum, EventsEnum} from "../utils/enums";

export default class Container extends HTMLElement {

    frames: HTMLImageElement[] = [];
    currentFrame = 0;

    replay = document.createElement('kiyomics-replay');
    replayDisplayed = false;

    constructor() {
        super();
        const lsUrl = this.getAttribute("src");

        if (lsUrl) {
            this.preloadImages(lsUrl);
        }

        if (!Utils.isMobileDevice()) {
            this.initFullscreenBtn();
        }
    }

    private preloadImages(url: string) {
        LsReader.parse(url).then(frames => {
            let loadedFrames = 0;
            frames.forEach(async (e, i) => {
                const img = new Image();
                let url = e;
                // Create an arraybuffer if the image is a gif.
                if (e.includes('.gif')) {
                    url = await Utils.generateArrayBuffer(e);
                }
                img.src = url;
                img.onload = () => {
                    loadedFrames++;
                    const percentage = (100 / frames.length) * loadedFrames;
                    const event = new CustomEvent(EventsEnum.LOADED_IMG, {detail: {percentage}});
                    document.dispatchEvent(event);
                    if (frames.length - 1 === loadedFrames) {
                        this.displayFrame();
                        this.initTouch();
                        this.initKeyboard();
                        const event = new Event(EventsEnum.LOADING_END);
                        document.dispatchEvent(event);
                    }
                }
                this.frames[i] = img;
            })
        }).catch(() => {
            const errorEvent = new Event(EventsEnum.LOADING_ERROR);
            document.dispatchEvent(errorEvent);
        });
    }

    private displayFrame(previousFrame: number | null = null) {
        const frame = this.frames[this.currentFrame];
        if (previousFrame !== null) {
            // Avoid possible blinking on some navigators.
            this.frames[previousFrame].style.zIndex = "2";
            setTimeout(() => {
                this.removeChild(this.frames[previousFrame]);
                this.frames[previousFrame].style.zIndex = "1";
            }, 20);
        }
        this.appendChild(frame);
        // Force gif replay.
        if (frame.src.includes('blob:') && previousFrame && previousFrame < this.currentFrame) {
            setTimeout(() => {
                frame.src = frame.src;
            }, 15);
        }
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
            e.preventDefault();
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
                    if (this.replayDisplayed) {
                        this.removeChild(this.replay)
                        this.replayDisplayed = false;
                    } else {
                        previous = this.currentFrame;
                        this.currentFrame--;
                        this.displayFrame(previous);
                    }
                }
                break;
            case ChangeFrameEnum.RIGHT:
                if (this.currentFrame !== this.frames.length - 1) {
                    previous = this.currentFrame;
                    this.currentFrame++;
                    this.displayFrame(previous);
                } else {
                    if (!this.replayDisplayed) {
                        this.appendChild(this.replay);
                        this.replayDisplayed = true;
                        console.log(this.replay.shadowRoot?.getElementById("replay-button"));
                        const replayButton = this.replay.shadowRoot?.getElementById("replay-button");
                        if (replayButton) {
                            replayButton.onclick = (e) => {
                                e.stopPropagation();
                                e.preventDefault();
                                previous = this.currentFrame;
                                this.currentFrame = 0;
                                this.displayFrame(previous);
                                this.removeChild(this.replay);
                                this.replayDisplayed = false;
                            }
                        }
                    }
                }
                break;
        }
    }

    private initFullscreenBtn() {
        const fullscreenBtn = document.createElement('button');
        fullscreenBtn.innerText = "Fullscreen";
        fullscreenBtn.classList.add("fullscreen");
        this.appendChild(fullscreenBtn);
        let timeout: number;
        this.onmousemove = (e) => {
            const rect = this.getBoundingClientRect()
            const y = e.clientY - rect.top;
            if (y >= rect.height - 80) {
                if (timeout) {
                    clearTimeout(timeout);
                }
                fullscreenBtn.classList.add('display');
                timeout = setTimeout(() => {
                    fullscreenBtn.classList.remove('display');
                }, 2000);
            } else {
                fullscreenBtn.classList.remove('display')
            }
        }
        fullscreenBtn.onclick = (e) => {
            e.stopPropagation();
            e.preventDefault();
            const event = new Event(EventsEnum.FULLSCREEN);
            document.dispatchEvent(event);
        }

        document.addEventListener('fullscreenchange', () => {
            if (Utils.isFullscreen()) {
                fullscreenBtn.innerText = "Exit fullscreen";
            } else {
                fullscreenBtn.innerText = "Fullscreen";
            }
        })
    }
}
