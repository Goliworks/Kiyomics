import {LsReader} from "./ls-reader";

export default class Container extends HTMLElement {

    frames: string[] = [];

    constructor() {
        super();
        this.innerHTML = "<span>Playmics container</span>";

        const lsUrl = this.getAttribute("src");
        if (lsUrl) {
            LsReader.parse(lsUrl).then(frames => {
                this.frames = frames;
                console.log(this.frames);
            });
        }
    }
}
