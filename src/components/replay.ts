export default class Replay extends HTMLElement {
    constructor() {
        super();
        const shadowRoot = this.attachShadow({mode: 'open'});
        shadowRoot.innerHTML = `<button part="replay-button" id="replay-button">Replay</button>`;
    }
}
