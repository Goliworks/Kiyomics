export default class PlaymicsApp extends HTMLElement {

    width: string;
    height: string;

    constructor() {
        super();
        this.width = this.getAttribute('width') ?? '0';
        this.height = this.getAttribute('height') ?? '0';
        this.style.width = `${this.width}px`;
        this.style.height = `${this.height}px`;

        this.intContainer();
    }

    private intContainer() {
        const container = document.createElement("playmics-container");
        container.style.width = this.style.width;
        container.style.height = this.style.height;
        container.setAttribute("src", this.getAttribute("src") ?? '');
        this.appendChild(container);
    }
}
