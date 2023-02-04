import {Gesture} from "./gesture";

export default class KiyomicsApp extends HTMLElement {

    width: string;
    height: string;

    gesture: Gesture;

    container: HTMLElement | undefined;

    constructor() {
        super();
        this.width = this.getAttribute('width') ?? '0';
        this.height = this.getAttribute('height') ?? '0';
        this.style.width = `${this.width}px`;
        this.style.height = `${this.height}px`;

        this.initContainer();
        this.gesture = new Gesture(this);
        this.initTouch();

        const resizeObserver = new ResizeObserver((entries) => {
            const width = entries[0].contentRect.width + 'px';
            const height = entries[0].contentRect.height + 'px';
            this.resizeContainer(width, height)
        })
        resizeObserver.observe(this);
    }

    private initContainer() {
        this.container = document.createElement("kiyomics-container");
        this.resizeContainer(this.style.width, this.style.height);
        this.container.setAttribute("src", this.getAttribute("src") ?? '');
        this.appendChild(this.container);
    }

    private initTouch() {
        this.gesture.onDoubleTap = () => {
            this.setFullScreen()
        }
    }

    private resizeContainer(width: string, height: string) {
        if (this.container) {
            this.container.style.width = width;
            this.container.style.height = height;
        }
    }

    private setFullScreen() {
        if (!document.fullscreenElement) {
            this.requestFullscreen().finally();
        } else {
            document.exitFullscreen().finally();
        }
    }
}
