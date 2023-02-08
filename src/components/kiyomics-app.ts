import {Gesture} from "../utils/gesture";
import {EventsEnum} from "../utils/enums";
import {Utils} from "../utils/utils";

export default class KiyomicsApp extends HTMLElement {

    width: string;
    height: string;

    phoneStarterGesture: Gesture | undefined;

    container: HTMLElement | undefined;
    phoneStarter: HTMLElement | undefined;

    constructor() {
        super();
        this.width = this.getAttribute('width') ?? '0';
        this.height = this.getAttribute('height') ?? '0';
        this.style.width = `${this.width}px`;
        this.style.height = `${this.height}px`;

        this.initContainer();

        const orientationMessage = document.createElement('kiyomics-orientation-message');
        this.appendChild(orientationMessage);

        const resizeObserver = new ResizeObserver((entries) => {
            const width = entries[0].contentRect.width + 'px';
            const height = entries[0].contentRect.height + 'px';
            this.resizeContainer(width, height);
            if (Utils.isFullscreen() && this.phoneStarter) {
                this.phoneStarter.style.display = 'none';
            } else if (this.phoneStarter) {
                this.phoneStarter.style.display = 'flex';
            }
        });
        resizeObserver.observe(this);

        if (Utils.isMobileDevice()) {
            this.phoneStarter = document.createElement('kiyomics-phone-starter');
            this.appendChild(this.phoneStarter);
            this.phoneStarterGesture = new Gesture(this.phoneStarter);
            this.initTouch();
        }
        // Add loading screen
        const loadingScreen = document.createElement('kiyomics-loading');
        this.appendChild(loadingScreen);
        // Remove loading screen when all images are loaded.
        document.addEventListener(EventsEnum.LOADING_END, () => {

            if (this.phoneStarter) {
                const firstImg = this.container?.getElementsByTagName('img')[0] as HTMLImageElement;
                this.phoneStarter.getElementsByTagName('div')[0].style.backgroundImage = `url(${firstImg.src})`;
            }

            setTimeout(() => {
                loadingScreen.classList.add("disabled");
                setTimeout(() => {
                    this.removeChild(loadingScreen)
                }, 600); // same value in ms than css fade out.
            }, 300); // same value in ms than css progress animation + 100ms.
        });
    }

    private initContainer() {
        this.container = document.createElement("kiyomics-container");
        this.resizeContainer(this.style.width, this.style.height);
        this.container.setAttribute("src", this.getAttribute("src") ?? '');
        this.appendChild(this.container);
    }

    private initTouch() {
        if (this.phoneStarterGesture) {
            this.phoneStarterGesture.onClick = () => {
                this.setFullScreen();
            }
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
            if (this.requestFullscreen) {
                this.requestFullscreen().finally();
            } else if ((<any>this).webkitRequestFullscreen) {
                // for Apple devices.
                (<any>this).webkitRequestFullscreen();
            }

        } else {
            document.exitFullscreen().finally();
        }
    }
}
