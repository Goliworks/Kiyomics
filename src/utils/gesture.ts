type gestureFunction = (e: TouchEvent) => void;
type clickFunction = (e: MouseEvent) => void;

export class Gesture {

    tapDelay = 200

    onTap: gestureFunction | undefined;
    onDoubleTap: gestureFunction | undefined;

    onClick: clickFunction | undefined;

    private tapedTwice = false;
    private tapTimeout: number | undefined;

    constructor(element: HTMLElement, type = 'click') {
        if (type === 'tap') {
            element.addEventListener("touchend", (e) => {
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
        event.preventDefault();
        if (!this.tapedTwice) {
            this.tapedTwice = true;
            this.tapTimeout = setTimeout(() => {
                if (single) {
                    single(event);
                }
                this.tapedTwice = false;
            }, this.tapDelay);
        } else {
            clearTimeout(this.tapTimeout);
            if (double) {
                double(event);
            }
            this.tapedTwice = false;
        }
    }
}
