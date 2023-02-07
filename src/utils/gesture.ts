import {Utils} from "./utils";

type gestureFunction = (e: TouchEvent) => void;
type clickFunction = (e: MouseEvent) => void;

export class Gesture {

    tapDelay = 200

    onTap: gestureFunction | undefined;
    onDoubleTap: gestureFunction | undefined;

    onClick: clickFunction | undefined;

    private tapedTwice = false;
    private tapTimeout: number | undefined;

    constructor(element: HTMLElement) {
        if (!Utils.isAppleMobileDevice()) {
            element.addEventListener("touchstart", (e) => {
                this.detectDouble(e, this.onTap, this.onDoubleTap);
            });
        }
        element.addEventListener("click", (e) => {
            if (this.onClick) {
                this.onClick(e);
            }
        });
    }

    private detectDouble(event: TouchEvent, single: gestureFunction | undefined, double: gestureFunction | undefined) {
        if (!this.tapedTwice) {
            this.tapedTwice = true;
            this.tapTimeout = setTimeout(() => {
                if (single) {
                    single(event);
                }
                this.tapedTwice = false;
            }, this.tapDelay);
        } else {
            event.preventDefault();
            clearTimeout(this.tapTimeout);
            if (double) {
                double(event);
            }
            this.tapedTwice = false;
        }
    }
}
