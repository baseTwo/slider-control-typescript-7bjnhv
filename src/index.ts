// Import stylesheets
// import 'style.css';

console.log('Starting ', new Date(Date.now()).toISOString());

// Write TypeScript code!
window.onload = () => {
    console.log('Window OnLoad');
    const appDiv: HTMLElement = document.getElementById('app');
    appDiv.innerHTML = `<h2>The script worked</h2>`;
}
