import { NodeBuilder, NodeWrapper } from './node-builder'
import './style.css';
import 'core-js/actual';

const minmax = function (value: number, limit1: number, limit2: number): number {
    if (limit1 > limit2) {
        return minmax(value, limit2, limit1);
    }
    if (value < limit1) return limit1;
    if (value > limit2) return limit2;
    return value;
}

window.onload = () => {
    const appDiv: HTMLElement = document.getElementById('app');
    appDiv.innerHTML = '';

    const nb = new NodeBuilder();
    const width = 500;
    const values = [0.50*width, 0.10*width, 0.80*width];
    let thumbWrappers: NodeWrapper[] = [];
    let rangeWrapper: NodeWrapper;
    const unit = 'px';
    nb.div({ class: 'slider-container' },
        nb.div({ class: 'slider-client' },
            // rail
            nb.div({ class: 'slider-rail' }),
            // track
            rangeWrapper = nb.div({ class: 'slider-range' })
                .style({ left: `${values[1]}${unit}`, width: `${values[2] - values[1]}${unit}` }),
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
            .style({ width: `${width}${unit}` })
    ).replaceTo(appDiv);

    const range = rangeWrapper.node;
    let mouseDown: {target?:'range'|'thumb', clientX?:any, thumbX?:any} = {};
    range.onpointerdown = (e: PointerEvent) => {
        mouseDown = { target:'range', clientX: e.clientX, thumbX: (<any>e.currentTarget).offsetLeft };
        (<any>e.currentTarget).setPointerCapture(e.pointerId);
    };
    range.onpointerup = (e: PointerEvent) => {
        mouseDown = {};
        (<any>e.currentTarget).releasePointerCapture(e.pointerId);
    };
    range.onpointermove = (e: PointerEvent) => {
        if (mouseDown.target === 'range') {
            const rangeWidth = parseInt((<string>range.style.width).replace(unit, ''));
            const left = minmax(mouseDown.thumbX + e.clientX - mouseDown.clientX, 0, width - rangeWidth);
            Object.assign(
                range.style,
                {
                    left: `${left}${unit}`,
                });
            Object.assign(
                thumbWrappers[1].node.style,
                {
                    left: `${left}${unit}`,
                });
            Object.assign(
                thumbWrappers[2].node.style,
                {
                    left: `${left + rangeWidth}${unit}`,
                });
        }
    };

    for (const thumbWrapper of thumbWrappers) {
        const thumb = thumbWrapper.node;
        thumb.onpointerdown = (e: PointerEvent) => {
            mouseDown = { target:'thumb', clientX: e.clientX, thumbX: thumb.offsetLeft };
            (<any>e.currentTarget).setPointerCapture(e.pointerId);
        };
        thumb.onpointerup = (e: PointerEvent) => {
            mouseDown = {};
            (<any>e.currentTarget).releasePointerCapture(e.pointerId);
        };
        thumb.onpointermove = (e: PointerEvent) => {
            if (mouseDown.target === 'thumb') {
                const left = minmax(mouseDown.thumbX + e.clientX - mouseDown.clientX, 0, width);
                Object.assign((<any>e.currentTarget).style, {
                    left: `${left}${unit}`
                });

                const v0 = parseInt((<string>thumbWrappers[1].node.style.left).replace(unit, ''));
                const v1 = parseInt((<string>thumbWrappers[2].node.style.left).replace(unit, ''));
                console.log([v0, v1]);
                Object.assign(
                    range.style,
                    {
                        left: `${Math.min(v0, v1)}${unit}`,
                        width: `${Math.abs(v1 - v0)}${unit}`,
                    });
            }
        };
    };
}
