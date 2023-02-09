export default class PhoneStarter extends HTMLElement {
    constructor() {
        super();
        this.innerHTML = `
            <div></div>
            <button></button>
            <span>Powered by <b>Kiyomics</b></span>
        `;
    }
}
