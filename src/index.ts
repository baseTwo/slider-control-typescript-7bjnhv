import { NodeBuilder, NodeWrapper } from './node-builder'
import './style.css';
import 'core-js/actual';

window.onload = () => {
    const appDiv: HTMLElement = document.getElementById('app');
    appDiv.innerHTML = '';

    const nb = new NodeBuilder();
    const values = [0, 50, 100];
    let thumbWrappers: NodeWrapper[] = [];
    let rangeWrapper: NodeWrapper;
    const unit = 'px';
    nb.div({ class: 'slider-container' },
        nb.div({ class: 'slider-client' },
            // rail
            nb.div({ class: 'slider-rail' }),
            // track
            rangeWrapper = nb.div({ class: 'slider-range' })
                .style({ left: `${values[0]}${unit}`, width: `${values[1] - values[0]}${unit}` }),
            // v[0]
            thumbWrappers[0] = nb.div({ class: 'slider-thumb slider-thumb-0' })
                .style({ left: `${values[0]}${unit}` }),
            // v[1]
            thumbWrappers[1] = nb.div({ class: 'slider-thumb slider-thumb-1' })
                .style({ left: `${values[1]}${unit}` }),
            // v[1]
            thumbWrappers[2] = nb.div({ class: 'slider-thumb slider-thumb-2' })
                .style({ left: `${values[2]}${unit}` })
        )
            .style({ width: '400px' })
    ).replaceTo(appDiv);

    const range = rangeWrapper.node;
    for (const thumbWrapper of thumbWrappers) {
        const thumb = thumbWrapper.node;
        let mouseDown: {clientX?:any,thumbX?:any} = {};
        thumb.onpointerdown = (e: PointerEvent) => {
            mouseDown = { clientX: e.clientX, thumbX: thumb.offsetLeft };
            (<any>e.currentTarget).setPointerCapture(e.pointerId);
        };
        thumb.onpointermove = (e: PointerEvent) => {
            if (mouseDown.clientX) {
                Object.assign((<any>e.currentTarget).style, {
                    left: `${mouseDown.thumbX + e.clientX - mouseDown.clientX}${unit}`
                });

                const v0 = parseInt((<string>thumbWrappers[0].node.style.left).replace(unit, ''));
                const v1 = parseInt((<string>thumbWrappers[1].node.style.left).replace(unit, ''));
                console.log([v0, v1]);
                Object.assign(
                    range.style,
                    {
                        left: `${v0}${unit}`,
                        width: `${v1 - v0}${unit}`,
                    });
            }
        };
        thumb.onpointerup = (e: PointerEvent) => {
            mouseDown = {};
            (<any>e.currentTarget).releasePointerCapture(e.pointerId);
        };
    };
}
