export default class Loading extends HTMLElement {
    constructor() {
        super();
        this.innerHTML = `
        <svg id="kiyomi-fruit" width="100" height="100" version="1.1" viewBox="0 0 100 100" xmlns="http://www.w3.org/2000/svg">
            <g transform="translate(-98, 0)">
                <circle cx="148.24" cy="63.797" r="30.658" fill="#ee7100" stroke-width=".81646"/>
                <circle transform="rotate(-13.875)" cx="130.82" cy="93.091" r="25.362" fill="#f88d1b" stroke-width=".6754"/>
                <circle transform="rotate(-13.875)" cx="134.05" cy="90.333" r="20.559" fill="#fda62b" stroke-width=".54751"/>
                <g fill="#f88d1b">
                <circle transform="rotate(170.99)" cx="-146.25" cy="-69.573" r="2.1142" stroke-width=".056304"/>
                <circle transform="rotate(170.99)" cx="-146.04" cy="-63.3" r="2.3436" stroke-width=".062411"/>
                <circle transform="rotate(170.99)" cx="-153.44" cy="-68.918" r="2.9002" stroke-width=".077234"/>
                <circle transform="rotate(170.99)" cx="-150.78" cy="-74.575" r="1.9302" stroke-width=".051404"/>
                </g>
                <path d="m161.64 33.897c-8.6775-4.1936-15.478-20.307-7.1109-29.446 10.482 6.6642 15.184 21.011 7.1109 29.446z" fill="#34921f" stroke-width="1.0159"/>
                <path d="m160.71 31.226c0.12052-5.9491-1.5533-12.18-4.7678-20.209 7.3336 5.6403 6.2764 12.018 4.7678 20.209z" fill="#60d346" stroke-width=".44684"/>
                <path d="m164.47 34.58c2.1835-6.7379 13.233-13.304 20.725-8.1279-3.8013 8.2995-13.775 13.16-20.725 8.1279z" fill="#34921f" stroke-width=".74661"/>
                <path d="m166.79 34.39c3.2561-2.5012 7.6433-4.1291 13.87-5.6437-7.1281-1.7325-10.115 1.4603-13.87 5.6437z" fill="#60d346" stroke-width=".32521"/>
            </g>
        </svg>
        `;
    }
}
