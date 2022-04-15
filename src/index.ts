window.onload = () => {
    const dateString = new Date(Date.now()).toLocaleString();
    const appDiv: HTMLElement = document.getElementById('app');
    appDiv.innerHTML = `<h2>Reloaded at ${dateString}</h2>`;

    appDiv.append(_.join(['Hi', 'Paul'], ', '));

    /*const sliders: HTMLCollectionOf<Element> = document.getElementsByTagName('slider');
    console.log(sliders);*/
    /*for (const slider of sliders)
        console.log(slider);*/
}
