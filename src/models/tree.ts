import Command from "../lib/lsys/core/command";
import Model from "../lib/lsys/core/model";
import { IAlphabet, IProduction } from "../lib/lsys/lsys";

class Tree extends Model {
	private states: any[];

	private scale: number;
	private lengthReductionFactor: number;
	private length: number;
	private angle: number;
	private angleRotationStep: number;
	private radius: number;

	constructor(alphabet: IAlphabet, axiom: string) {
		super(alphabet, axiom);

		// ---------------------------------------------------------------------

		this.states = [];

		this.scale = 1;
		this.lengthReductionFactor = 1;
		this.length = 10;

		this.angle = -90;
		this.angleRotationStep = 45;

		this.radius = 10;

		// ----------------------------------------------------
		// COMMANDS

		const moveForward = (tool: any, context?: any) => {
			// console.log(`COMMAND: f --> ${this.length} / ${tool.position()}`);

			tool.forward(this.length);
		};

		const turnLeft = (tool: any, context?: any) => {
			tool.left(this.angleRotationStep);
		};

		const turnRight = (tool: any, context?: any) => {
			tool.right(this.angleRotationStep);
		};

		const saveState = (tool: any, context?: any) => {
			console.log(`SAVE: [ --> ${this.states}`);

			this.states.push({
				position: tool.position(),
				length: this.length,
				angle: tool.angle(),
				scale: this.scale,
				// radius: this.radius
			});
		};

		const restoreState = (tool: any, context?: any) => {
			console.log(`RESTORE: ] --> ${this.states}`);

			let state = this.states.pop();
			this.length = state.length;
			this.scale = state.scale;
			// this.radius = state.radius
			tool.up();
			tool.rotate(state.angle);
			tool.goto(state.position.x, state.position.y);
			tool.down();
		};

		this.addCommand(new Command("f", moveForward));
		this.addCommand(new Command("+", turnLeft));
		this.addCommand(new Command("-", turnRight));
		this.addCommand(new Command("[", saveState));
		this.addCommand(new Command("]", restoreState));
	}
}

export default Tree;
