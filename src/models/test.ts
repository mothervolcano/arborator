import Command from "../lib/lsys/core/command";
import Model from "../lib/lsys/core/model";
import { IAlphabet, IProduction } from "../lib/lsys/lsys";
import IRule from "../test-productions/IRule";
import YRule from "../test-productions/YRule";
import BRule from "../test-productions/BRule";
import RRule from "../test-productions/RRule";
import KRule from "../test-productions/KRule";
import ParameterPrim from "../lib/lsys/prims/parameterPrim";
import ImperativePrim from "../lib/lsys/prims/imperativePrim";
import GlyphSwapper from "../lib/lsys/sprites/glyphSwapper";
import IncognitoPerpetuator from "../lib/lsys/sprites/incognitoPerpetuator";
import CounterPrim from "../lib/lsys/prims/counterPrim";
import PrimMapper from "../lib/lsys/sprites/primMapper";
import Escalator from "../lib/lsys/sprites/escalator";
import IncognitoDiscloser from "../lib/lsys/sprites/incognitoDiscloser";
import Indexer from "../lib/lsys/sprites/indexer";
import Doppelganger from "../lib/lsys/sprites/doppelganger";
import Replicator from "../lib/lsys/sprites/replicator";
import Propagator from "../lib/lsys/sprites/propagator";

class Test extends Model {
	private states: any[];

	private scale: number;
	private length: number;
	private lengthReduction: number;
	private lengthReductionFactor: number;
	private lengthReductionUnit: number;
	private angle: number;
	private angleRotationStep: number;
	private turnDirection: string | undefined;
	private radius: number;

	constructor(alphabet: IAlphabet, axiom: string, iterationsNum?: number) {
		super(alphabet, axiom);

		// const O: IProduction = new IRule( alphabet.rule('O'), alphabet.collect('O*') ).compose('O');

		const I: IProduction = new IRule(
			alphabet.rule("I"),
			alphabet.collect("[]+-IYf*"),
		).compose("IY");
		const Y: IProduction = new IRule(
			alphabet.rule("Y"),
			alphabet.collect("[]+-IBKf*"),
		).compose("f[*B][*B]");

		const B: IProduction = new IRule(
			alphabet.rule("B"),
			alphabet.collect("[]+-=±BKfx*"),
		).compose("K");

		const K: IProduction = new IRule(
			alphabet.rule("K"),
			alphabet.collect("[]+-=±Kfx.*"),
		).compose("f[=f][±f]");

		// const R: IProduction = new BRule(
		// 	alphabet.rule("R"),
		// 	alphabet.collect("[]+-=±RKfx.*"),
		// ).compose("f[±R]");

		Y.addPrim(new ParameterPrim(1));
		// Y.addSprite(new Indexer(alphabet.rule("B"), 1));
		Y.addSprite(
			new Replicator(alphabet.glyph("f"), new ParameterPrim(), null),
		);
		Y.addSprite(
			new GlyphSwapper(alphabet.glyph("*"), alphabet.collect("-+")),
		);
		// Y.addSprite(
		// 	new IncognitoPerpetuator(alphabet.glyph("*"), alphabet.rule("B")),
		// );

		B.addSprite(
			new IncognitoDiscloser(alphabet.glyph("*"), new ImperativePrim()),
		);
		B.addSprite(new Escalator(1, 1));
		B.addSprite(
			new Replicator(
				alphabet.glyph("K"),
				new CounterPrim(),
				new ParameterPrim(),
			),
		);

		K.addPrim(new ParameterPrim(1));
		K.addSprite(
			new Replicator(alphabet.glyph("f"), new ParameterPrim(), null, 2),
		);

		// this.addProduction(O);
		this.addProduction(I);
		this.addProduction(Y);
		this.addProduction(B);
		// this.addProduction(R);
		this.addProduction(K);
		// this.addProduction(T);

		// ---------------------------------------------------------------------

		this.states = [];

		this.scale = 1;
		this.length = 20;
		this.lengthReduction = 1;
		this.lengthReductionUnit = 4 / 5;
		this.lengthReductionFactor = 1;

		this.angle = -90;
		this.angleRotationStep = 45;

		this.radius = 10;

		// ---------------------------------------------------------------------
		// DEBUG

		const showInfo = (tool: any, context?: any) => {
			// if (!positions.has(tool.position())) {
			// 	positions.set(tool.position(), {
			// 		x: tool.position().x + 5,
			// 		y: tool.position().y - 5,
			// 	});
			// }

			// const pos = positions.get(tool.position());

			// const text = new PointText( [ pos.x, pos.y ] );
			// text.style = { fillColor: new Color('red'), fontFamily: 'Helvetica', fontWeight: 'normal', fontSize: 12 } as any
			// text.content =  context.params ? `[ ${context.params[0]} ]` : `?`;
			// text.content = `[${'!!!'}]`;

			// pos.x += 15
			// pos.y -= 11;
		};

		const addMark = (tool: any, context?: any) => {
			// console.log(`ADD MARK: ${context.params}`)
			const pos = tool.position();
			tool.context.fillStyle = "green";
			tool.context.strokeStyle = "green";
			// tool.context.lineWidth = 0;
			tool.context.moveTo(pos.x, pos.y);
			tool.context.beginPath();
			tool.context.arc(pos.x, pos.y, 5, 0, Math.PI * 2);
			tool.context.fill();
			tool.context.stroke();
			// tool.context.closePath();
			tool.context.moveTo(pos.x, pos.y);
			tool.context.strokeStyle = "black";
			// tool.context.fillStyle = "none";
		};

		this.addCommand(new Command("i", showInfo));
		this.addCommand(new Command("x", addMark));

		// ----------------------------------------------------
		// COMMANDS

		const moveForward = (tool: any, context?: any) => {
			// console.log(`MOVE FORWARD: f --> ${this.length}`, context);

			tool.forward(this.length * this.lengthReduction * context.length);

			this.lengthReduction = 1;
		};

		const inchForward = (tool: any, context?: any) => {
			this.lengthReduction *= this.lengthReductionUnit;

			// console.log(`LENGTH REDUCTION: ${this.lengthReduction}`);
		};

		const turnLeft = (tool: any, context?: any) => {
			this.angleRotationStep = context
				? context.angle
				: this.angleRotationStep;

			// console.log(`TURN LEFT: + --> ${this.turnDirection}`)

			this.turnDirection = "LEFT";

			tool.left(this.angleRotationStep);
		};

		const turnRight = (tool: any, context?: any) => {
			this.angleRotationStep = context
				? context.angle
				: this.angleRotationStep;

			// console.log(`TURN RIGHT: - --> ${this.turnDirection}`)

			this.turnDirection = "RIGHT";

			tool.right(this.angleRotationStep);
		};

		const turn = (tool: any, context?: any) => {
			this.angleRotationStep = context
				? context.angle
				: this.angleRotationStep;

			// console.log(`KEEP THE TURN: - --> ${this.turnDirection}`)

			if (this.turnDirection === "LEFT") {
				tool.left(this.angleRotationStep);
			} else if (this.turnDirection === "RIGHT") {
				tool.right(this.angleRotationStep);
			} else {
				// DO NOTHING
			}
		};

		const turnOpposite = (tool: any, context?: any) => {
			this.angleRotationStep = context
				? context.angle
				: this.angleRotationStep;

			// console.log(`TURN THE OPPOSITE WAY to: ${this.turnDirection}`);

			if (this.turnDirection === "LEFT") {
				tool.right(this.angleRotationStep);
			} else if (this.turnDirection === "RIGHT") {
				tool.left(this.angleRotationStep);
			} else {
				// DO NOTHING
			}
		};

		const saveState = (tool: any, context?: any) => {
			// console.log(`SAVE: [ --> ${this.states}`)

			this.states.push({
				position: tool.position(),
				length: this.length,
				angle: tool.angle(),
				scale: this.scale,
				// radius: this.radius
			});
		};

		const restoreState = (tool: any, context?: any) => {
			// console.log(`RESTORE: ] --> ${this.states}`)

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
		this.addCommand(new Command(".", inchForward));
		this.addCommand(new Command("+", turnRight));
		this.addCommand(new Command("-", turnLeft));
		this.addCommand(new Command("=", turn));
		this.addCommand(new Command("±", turnOpposite));
		this.addCommand(new Command("[", saveState));
		this.addCommand(new Command("]", restoreState));
		// this.addCommand( new Command('B', addMark ));
	}

	public reset() {}
}

export default Test;
