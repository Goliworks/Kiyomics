export default class OrientationMessage extends HTMLElement {
    constructor() {
        super();
        this.innerHTML = `<span>Please, change screen orientation to landscape</span>`;
    }
}
