export default class PhoneStarter extends HTMLElement {
    constructor() {
        super();
        this.innerHTML = `
            <div></div>
            <button></button>
        `;
    }
}
