// Import stylesheets
// import 'style.css';
import _ from 'lodash';

console.log('Starting ', new Date(Date.now()).toISOString());

// Write TypeScript code!
window.onload = () => {
    const arr : string[] = _.concat([], "Hello", "World");
    console.log(arr);
    const appDiv: HTMLElement = document.getElementById('app');
    appDiv.innerHTML = `<h2>The script worked</h2>`;
}
