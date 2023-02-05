import './style.css'
import KiyomicsApp from "./kiyomics-app";
import Container from "./container";
import OrientationMessage from "./orientation-message";

customElements.define('kiyomics-app', KiyomicsApp);
customElements.define('kiyomics-container', Container);
customElements.define('kiyomics-orientation-message', OrientationMessage);
