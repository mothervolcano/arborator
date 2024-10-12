import React, { Dispatch, ReactNode, SetStateAction } from "react";

import StageManager from "./StageManager";
import { ParamSet } from "./types";

interface StageProps {
	children: ReactNode;
	setStageManager: any;
	setParams: Dispatch<SetStateAction<ParamSet>>;
	model: any;
	params: any;
	style: object;
}

interface StageState {
}

export default class Stage extends React.Component<StageProps, StageState> {
	canvasRef: React.RefObject<HTMLCanvasElement>;
	stageManager: StageManager | null;
	mouseDown: boolean = false;

	constructor(props: StageProps) {
		super(props);
		this.canvasRef = React.createRef();
		this.stageManager = null;

		this.handleKeyDown = this.handleKeyDown.bind(this);
		this.handleKeyUp = this.handleKeyUp.bind(this);	
		this.handleMouseDown = this.handleMouseDown.bind(this);
		this.handleMouseUp = this.handleMouseUp.bind(this);
		this.handleMouseMove = this.handleMouseMove.bind(this);
		this.handleResize = this.handleResize.bind(this);
	}

	componentDidMount(): void {
		console.log("... MOUNT STAGE");
		
		const canvas = this.canvasRef.current;
		const canvasCtx = canvas?.getContext("2d");

		if (canvas && canvasCtx) {
			const dpr = window.devicePixelRatio;
			const rect = canvas.getBoundingClientRect();

			canvas.width = rect.width * dpr;
			canvas.height = rect.height * dpr;

			canvasCtx.scale(dpr, dpr);

			canvas.style.width = `${rect.width}px`;
			canvas.style.height = `${rect.height}px`;

			this.stageManager = new StageManager(canvasCtx, this.props.model);
			this.stageManager.configure(this.props.params);
			this.stageManager.update(canvasCtx, this.props.params);
			this.props.setStageManager(this.stageManager);

			window.addEventListener("keydown", this.handleKeyDown);
			window.addEventListener("keyup", this.handleKeyUp);
			window.addEventListener("resize", this.handleResize);
			canvas.addEventListener("mousemove", this.handleMouseMove);
			canvas.addEventListener("mousedown", this.handleMouseDown);
			canvas.addEventListener("mouseup", this.handleMouseUp);
		}
	}

	componentDidUpdate(
		prevProps: Readonly<StageProps>,
		prevState: Readonly<{}>,
		snapshot?: any,
	): void {
		console.log("... UPDATE STAGE!");
		
		if (this.stageManager && this.canvasRef.current && this.canvasRef.current.getContext("2d")) {
			if (prevProps.model === this.props.model) {
				this.stageManager.update(this.canvasRef.current.getContext("2d")!, this.props.params);
				// if (this.stageManager.updatedParams) {
				// 	const updatedParams = this.props.params.map( (p: any) => {
				// 		if (this.stageManager!.updatedParams[p.id]) {
				// 			return { ...p, value: this.stageManager!.updatedParams[p.id]}
				// 		} else {
				// 			return p;
				// 		}
				// 	})
				// 	// console.log("UPDATED PARAMS: ", this.props.params, updatedParams);
				// }

			} else {
				this.stageManager.reset();
				this.stageManager = new StageManager(this.canvasRef.current.getContext("2d")!, this.props.model);
				this.stageManager.configure(this.props.params);
				this.stageManager.update(this.canvasRef.current.getContext("2d")!, this.props.params);
				this.props.setStageManager(this.stageManager);

			}
		}
	}

	componentWillUnmount(): void {
		console.log("... UNMOUNT STAGE!");
		
		const canvas = this.canvasRef.current;

		if (canvas) {
			window.addEventListener("keydown", this.handleKeyDown);
			window.removeEventListener("resize", this.handleResize);
			canvas.removeEventListener("mousedown", this.handleMouseDown);
			canvas.removeEventListener("mouseup", this.handleMouseUp);
			canvas.removeEventListener("mousemove", this.handleMouseMove);
		}
	}

	handleMouseMove(e: MouseEvent) {
		if (this.stageManager) {
			if (this.mouseDown) {
				this.stageManager.onMouseDrag(e.offsetX, e.offsetY);
			} else {
				this.stageManager.onMouseMove(e.offsetX, e.offsetY);
			}
		}
	}

	handleMouseDown(e: MouseEvent) {
		if (this.stageManager) {
			this.stageManager.onMouseDown(e.offsetX, e.offsetY);
			this.mouseDown = true;
		}
	}

	handleMouseUp(e: MouseEvent) {
		if (this.stageManager) {
			this.stageManager.onMouseUp(e.offsetX, e.offsetY);
			this.mouseDown = false;
		}
	}

	handleKeyDown(e: KeyboardEvent) {
		if (this.stageManager) {
			this.stageManager.onKeyDown(e.code);
		}
	} 

	handleKeyUp(e: KeyboardEvent) {
		if (this.stageManager) {
			this.stageManager.onKeyUp(e.code);
		}
	} 

	handleResize() {
		const canvas = this.canvasRef.current;

		if (canvas && canvas.getContext("2d") && this.stageManager) {
			canvas.style.width = "100%";
			canvas.style.height = "100%";

			canvas.width = canvas.offsetWidth;
			canvas.height = canvas.offsetHeight;

			this.stageManager.onResize(canvas);
			this.stageManager.update(canvas.getContext("2d")!, this.props.params);

		}
	}

	render() {
		return (
			<div style={this.props.style}>
				<canvas
					ref={this.canvasRef}
					style={{ position: "relative", width: "100%", height: "100%" }}
				></canvas>
				{this.props.children}
			</div>
		);
	}
}
