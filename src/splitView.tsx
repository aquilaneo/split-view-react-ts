import React, {DetailedReactHTMLElement, ReactNode} from "react";

export class SplitView extends React.Component<{ children: ReactNode[] }> {
	state: { offsets: number[] };
	draggingIndex = -1;
	oldMousePosition = -1;
	myRef: React.RefObject<HTMLDivElement>;
	width = 0;

	constructor (props: { children: ReactNode[] }) {
		super (props);
		this.state = {
			offsets: new Array (2 * this.props.children.length - 1).fill (0),
		};

		this.myRef = React.createRef ();

		this.startDragging = this.startDragging.bind (this);
		this.continueDragging = this.continueDragging.bind (this);
		this.stopDragging = this.stopDragging.bind (this);
		this.onResize = this.onResize.bind (this);
		window.onresize = this.onResize;
	}

	// パネル幅を変更
	resizePanels (index: number, delta: number) {
		const offsets = [...this.state.offsets];
		offsets[index - 1] += delta;
		offsets[index + 1] -= delta;
		this.setState ({...this.state, offsets: offsets});
	}

	// ドラッグ開始
	startDragging (startMousePosition: number, index: number) {
		this.draggingIndex = index;
		this.oldMousePosition = startMousePosition;
	}

	// ドラッグ継続
	continueDragging (e: React.MouseEvent<HTMLDivElement>) {
		if (this.draggingIndex >= 0) {
			const delta = e.pageX - this.oldMousePosition;
			this.resizePanels (this.draggingIndex, delta);
			this.oldMousePosition = e.pageX;
		}
	}

	// ドラッグ終了
	stopDragging () {
		this.draggingIndex = -1;
		this.oldMousePosition = -1;
	}

	onResize () {
		if (this.myRef.current) {
			this.width = this.myRef.current.clientWidth;
			console.log (this.width);
		}
	}

	render () {
		const style = {
			display: "flex",
			height: "100%"
		};

		// SplitSeparatorを挿入
		const elements = [];
		let keyCounter = 0;
		for (let i = 0; i < this.props.children.length - 1; i++) {
			const element = this.props.children[i] as DetailedReactHTMLElement<any, HTMLElement>;
			elements.push (React.cloneElement (element, {
				offset: this.state.offsets[keyCounter],
				key: keyCounter,
			}));
			keyCounter++;
			elements.push (<SplitSeparator key={keyCounter} index={keyCounter} parent={this}/>);
			keyCounter++;
		}
		const element = this.props.children[this.props.children.length - 1] as DetailedReactHTMLElement<any, HTMLElement>
		elements.push (React.cloneElement (element, {
			offset: this.state.offsets[keyCounter],
			key: keyCounter,
		}));

		return (
			<div style={style} ref={this.myRef}
				 onMouseMove={this.continueDragging} onMouseUp={this.stopDragging} onMouseLeave={this.stopDragging}>
				{elements}
			</div>
		);
	}
}

export class SplitPanel extends React.Component<{ width: string, offset: number }> {
	render () {
		const style = {
			width: `calc(${this.props.width} + ${this.props.offset}px)`,
			height: "100%",
		}

		return (
			<div style={style}>{this.props.children}</div>
		);
	}
}

export class SplitSeparator extends React.Component<{ index: number, parent: SplitView }> {
	constructor (props: { index: number, parent: SplitView }) {
		super (props);

		this.onMouseDown = this.onMouseDown.bind (this);
	}

	onMouseDown (e: React.MouseEvent<HTMLDivElement>) {
		this.props.parent.startDragging (e.pageX, this.props.index);
	}

	render () {
		const style = {
			width: "2px",
			height: "100%",
			backgroundColor: "lightgray",
			cursor: "col-resize"
		};

		return (
			<div style={style} onMouseDown={this.onMouseDown}></div>
		);
	}
}
