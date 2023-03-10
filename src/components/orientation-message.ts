export default class OrientationMessage extends HTMLElement {
    constructor() {
        super();
        this.innerHTML = `
            <button class="exit-fullscreen">Exit fullscreen</button>
            <div class="phone-icon">
                <div class="arrow">
                    <div class="arrow-line"></div>
                    <div class="arrow-head"></div>
                </div>
                <div class="phone">
                    <div class="phone-mic"></div>
                    <div class="phone-glass"></div>
                    <div class="phone-button"></div>
                </div>
            </div>
        `;
    }
}
