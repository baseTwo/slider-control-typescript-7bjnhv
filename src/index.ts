import { appName } from './node-builder'
import './style.css';

window.onload = () => {
    const dateString = new Date(Date.now()).toLocaleString();
    const appDiv: HTMLElement = document.getElementById('app');
    appDiv.innerHTML = `<h2>${appName()} reloaded at ${dateString}</h2>`;
    appDiv.children[0].classList.add('red');
}
