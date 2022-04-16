export type NodeTypes = HTMLElement | NodeWrapper;
export type NodeTypesOrString = NodeTypes | string;
export type AttributesType = Record<string, string | number>;
export type StylesType = Record<string, string|number>;

export type SvgRoundRectPath = {
    x?: number,
    y?: number,
    width?: number,
    height?: number,
    cornerRadius?: number
};

export type SvgRoundRect = SvgRoundRectPath & {
    fill?: string,
    stroke?: string,
};

export class NodeBuilder {

    private nsSvg = 'http://www.w3.org/2000/svg';
    public wrappers : NodeWrapper[] = [];
    private initializers = [];

	done() {
		for (const initializer of this.initializers)
			initializer();
		this.wrappers = null;
		this.initializers = null;
	}

	tag(name : string, attr : AttributesType, ...children) {
		const node = document.createElement(name);
		const nodeWrapper = new NodeWrapper(this, node);
		nodeWrapper.attr(attr);
		return nodeWrapper.appendChildren(...children);
	}

	tagns(namespace : string, name : string, attr : AttributesType, ...children : NodeTypesOrString[]) {
		const node = document.createElementNS(namespace, name);
		const nodeWrapper = new NodeWrapper(this, node);
		nodeWrapper.attr(attr);
		return nodeWrapper.appendChildren(...children);
	}

	div(attr : AttributesType, ...children : NodeTypesOrString[]) { return this.tag('div', attr, ...children); }
	h1(attr : AttributesType, ...children : NodeTypesOrString[]) { return this.tag('h1', attr, ...children); }
	h2(attr : AttributesType, ...children : NodeTypesOrString[]) { return this.tag('h2', attr, ...children); }
	h3(attr : AttributesType, ...children : NodeTypesOrString[]) { return this.tag('h3', attr, ...children); }
	p(attr : AttributesType, ...children : NodeTypesOrString[]) { return this.tag('p', attr, ...children); }
	pre(attr : AttributesType, ...children : NodeTypesOrString[]) { return this.tag('pre', attr, ...children); }
	svg(attr : AttributesType, ...children : NodeTypesOrString[]) { return this.tagsvg('svg', attr, ...children); }

	tagsvg(name : string, attr, ...children : NodeTypesOrString[]) {
		return this.tagns(this.nsSvg, name, attr, ...children);
	}
	svgRect(attr : AttributesType, ...children : NodeTypesOrString[]) { return this.tagsvg('rect', attr, ...children); }
	svgPath(attr : AttributesType, ...children : NodeTypesOrString[]) { return this.tagsvg('path', attr, ...children); }

	// NOT A FLUENT METHOD. Move to another class?
	_svgRoundRectPath(attr : SvgRoundRectPath) {
		const x = attr.x || 0;
		const y = attr.y || 0;
		const w = attr.width || 0;
		const h = attr.height || 0;
		const r = attr.cornerRadius || 0;
		const cw = w - r - r;
		const ch = h - r - r;
		return `
m ${x+r} ${y}
a ${r} ${r} 0 0 0 ${-r} ${r}
v ${ch}
a ${r} ${r} 0 0 0 ${r} ${r}
h ${cw}
a ${r} ${r} 0 0 0 ${r} ${-r}
v ${-ch}
a ${r} ${r} 0 0 0 ${-r} ${-r}
z`;
	}

	svgRoundRect(attr: SvgRoundRect, ...children : NodeTypesOrString[]) {
		const path = this._svgRoundRectPath(attr);
		const attr2 = {d:path, ...attr};
		delete attr2.x;
		delete attr2.y;
		delete attr2.width;
		delete attr2.height;
		delete attr2.cornerRadius;
		return this.svgPath(attr2, ...children);
	}
}

function getNode(obj: NodeTypes) : HTMLElement {
    if (obj instanceof Node)
        return obj;
    else if (obj instanceof NodeWrapper)
        return obj.node;
    else
        throw new Error('Not a valid type.');
}

function getOrCreateNode(obj: NodeTypesOrString) : HTMLElement|Text {
    if (typeof obj === 'string')
        return document.createTextNode(obj);
    else
        return getNode(obj);
}



export class NodeWrapper {
	constructor(private _nodeBuilder, public node) {
	    this._nodeBuilder.wrappers.push(this);
    }

	with(handler) {
		handler(this);
		return this;
	}

	attr(attr: AttributesType) {
        for (const key in attr) {
            this.node.setAttribute(key, attr[key]);
        }

        return this;
	}

	style(style: StylesType) {
		Object.assign(this.node.style, style);
		return this;
	}

	event(...args) {
		this.node.addEventListener(...args);
		return this;
	}

	innerHTML(html : string) {
		this.node.innerHTML = html;
		return this;
	}

	onDone(fn)
	{
		if (typeof fn !== 'function')
			throw Error('Function expected');
		this._nodeBuilder.initializers.push(fn);
		return this;
	}

    appendChildren(...children: NodeTypesOrString[]) {
        const childNodes = children.map(child => getOrCreateNode(child));
        childNodes.forEach(childNode => this.node.appendChild(childNode));
		return this;
	}

    appendTo(parent : NodeTypes) {
        const parentNode = getNode(parent);
        parentNode.appendChild(this.node);
		return this;
	}

    replaceTo(parent : NodeTypes) {
        const parentNode = getNode(parent);
        if (parentNode.hasChildNodes())
            parentNode.innerHTML = '';
        parentNode.appendChild(this.node);
		return this;
	}
}