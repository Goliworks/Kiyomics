import './style.scss'
import KiyomicsApp from "./components/kiyomics-app";
import Container from "./components/container";
import OrientationMessage from "./components/orientation-message";
import Loading from "./components/loading";

customElements.define('kiyomics-app', KiyomicsApp);
customElements.define('kiyomics-container', Container);
customElements.define('kiyomics-orientation-message', OrientationMessage);
customElements.define('kiyomics-loading', Loading);
