export default class PhoneStarter extends HTMLElement {
    constructor() {
        super();
        this.innerHTML = `
            <div></div>
            <button class="start-btn"></button>
            <span>Powered by <b>Kiyomics</b></span>
        `;
    }
}
