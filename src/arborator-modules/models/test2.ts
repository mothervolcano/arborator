import { Path, Color, PointText } from 'paper';

import Command from "../../lib/lsys/core/command";
import Model from "../../lib/lsys/core/model";
import { IAlphabet, IProduction } from "../../lib/lsys/lsys";
import IRule from "../test-productions/IRule";
import YRule from "../test-productions/YRule";
import BRule from "../test-productions/BRule";
import RRule from "../test-productions/RRule";
import KRule from "../test-productions/KRule";
import ParameterPrim from "../../lib/lsys/prims/parameterPrim";
import ImperativePrim from "../../lib/lsys/prims/imperativePrim";
import GlyphSwapper from '../../lib/lsys/sprites/glyphSwapper';
import IncognitoPerpetuator from '../../lib/lsys/sprites/incognitoPerpetuator';
import CounterPrim from '../../lib/lsys/prims/counterPrim';
import PrimMapper from '../../lib/lsys/sprites/primMapper';
import Escalator from '../../lib/lsys/sprites/escalator';
import IncognitoDiscloser from '../../lib/lsys/sprites/incognitoDiscloser';
import Indexer from '../../lib/lsys/sprites/indexer';
import Doppelganger from '../../lib/lsys/sprites/doppelganger';
import Replicator from '../../lib/lsys/sprites/replicator';
import Perpetuator from '../../lib/lsys/sprites/perpetuator';
import Generator from '../../lib/lsys/sprites/generator';
import Accumulator from '../../lib/lsys/sprites/accumulator';


class Test2 extends Model {


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
	

	constructor( alphabet: IAlphabet, axiom: string ) {

		super( alphabet, axiom );


		const O: IProduction = new IRule( alphabet.rule('O'), alphabet.collect('[]+-IOf*') ).compose('IO'); 
		const I: IProduction = new IRule( alphabet.rule('I'), alphabet.collect('[]+-IYf*') ).compose('Y'); 
		const Y: IProduction = new IRule( alphabet.rule('Y'), alphabet.collect('[]+-IBKf*') ).compose('ff[-B][+B]f'); 
		const B: IProduction = new BRule( alphabet.rule('B'), alphabet.collect('[]+-=±BKfx*') ).compose('ffB');

		// O.addSprite( new Escalator(1,1) );
		// O.addSprite( new Perpetuator( alphabet.rule('I'), '+' ));

		Y.addPrim( new ParameterPrim(1) );
		Y.addSprite( new Accumulator( '=' ))
		// I.addSprite( new Perpetuator( alphabet.rule('Y'), '=' ))
		// I.addSprite( new Generator( alphabet.rule('Y'), new CounterPrim(), new ParameterPrim() ))

		
		this.addProduction(I);
		this.addProduction(Y);
		this.addProduction(B);
		this.addProduction(O);



		// ---------------------------------------------------------------------

		this.states = [];

		this.scale = 1;
		this.length = 10;
		this.lengthReduction = 1;
		this.lengthReductionUnit = 4/5;
		this.lengthReductionFactor = 1;
		
		this.angle = -90
		this.angleRotationStep = 45;

		this.radius = 10


		// ---------------------------------------------------------------------
		// DEBUG

		const positions = new Map();


		const showInfo = ( tool: any, context?: any ) => {


			if ( !positions.has( tool.position() )) {

				positions.set( tool.position(), { x: tool.position().x + 5, y: tool.position().y - 5  })
			}

			const pos = positions.get( tool.position() )

			const text = new PointText( [ pos.x, pos.y ] );
        	text.style = { fillColor: new Color('red'), fontFamily: 'Helvetica', fontWeight: 'normal', fontSize: 12 } as any
        	text.content =  context.params ? `[ ${context.params[0]} ]` : `?`;
        	// text.content = `[${'!!!'}]`;

        	// pos.x += 15
        	pos.y -= 11
   
		};


		const addMark = ( tool: any, context?: any  ) => { 

			// console.log(`ADD MARK: ${context.params}`)

			this.addMark( tool.position() );

		};


		this.addCommand( new Command('i', showInfo ) );
		this.addCommand( new Command('x', addMark ) );



		// ----------------------------------------------------
		// COMMANDS

		const moveForward = (tool: any, context?: any) => {

			// console.log(`MOVE FORWARD: f --> ${this.length} / ${tool.position()}`);

			tool.forward( this.length * this.lengthReduction * context.length );

			this.lengthReduction = 1;
		};


		const inchForward = (tool: any, context?: any) => {

			this.lengthReduction *= this.lengthReductionUnit;

			console.log(`LENGTH REDUCTION: ${this.lengthReduction}`)
		};


		const turnLeft = (tool: any, context?: any) => {

			this.angleRotationStep = context ? context.angle : this.angleRotationStep

			// console.log(`TURN LEFT: + --> ${this.turnDirection}`)

			this.turnDirection = 'LEFT';

			tool.left(this.angleRotationStep)
		};


		const turnRight = (tool: any, context?: any) => {

			this.angleRotationStep = context ? context.angle : this.angleRotationStep

			// console.log(`TURN RIGHT: - --> ${this.turnDirection}`)

			this.turnDirection = 'RIGHT';

			tool.right(this.angleRotationStep)
		};

		
		const turn = (tool: any, context?: any) => {

			this.angleRotationStep = context ? context.angle : this.angleRotationStep

			// console.log(`KEEP THE TURN: - --> ${this.turnDirection}`)

			if ( this.turnDirection === 'LEFT' ) {

				tool.left(this.angleRotationStep)

			} else if ( this.turnDirection === 'RIGHT') {

				tool.right(this.angleRotationStep)

			} else {

				// DO NOTHING
			}
		};


		const turnOpposite = (tool: any, context?: any) => {

			this.angleRotationStep = context ? context.angle : this.angleRotationStep

			console.log(`TURN THE OPPOSITE WAY to: ${this.turnDirection}`)

			if ( this.turnDirection === 'LEFT' ) {

				tool.right(this.angleRotationStep)

			} else if ( this.turnDirection === 'RIGHT') {

				tool.left(this.angleRotationStep)

			} else {

				// DO NOTHING
			}
		}


		const saveState = (tool: any, context?: any ) => {

			// console.log(`SAVE: [ --> ${this.states}`)

			this.states.push( { 

				position: tool.position(), 
				length: this.length, 
				angle: tool.angle(),
				scale: this.scale,
				// radius: this.radius 
			}) 
		};

		const restoreState = ( tool: any, context?: any ) => {

			// console.log(`RESTORE: ] --> ${this.states}`)

			let state = this.states.pop()
			this.length = state.length
			this.scale = state.scale
			// this.radius = state.radius
			tool.up()
			tool.rotate( state.angle )
			tool.goto( state.position.x, state.position.y )
			tool.down()
		}


		this.addCommand( new Command('f', moveForward) );
		this.addCommand( new Command('.', inchForward) );
		this.addCommand( new Command('+', turnRight) );
		this.addCommand( new Command('-', turnLeft) );
		this.addCommand( new Command('=', turn) );
		this.addCommand( new Command('±', turnOpposite) );
		this.addCommand( new Command('[', saveState) );
		this.addCommand( new Command(']', restoreState) );
		// this.addCommand( new Command('B', addMark ));


	}

	private addMark( position: any ) {

		const mark = new Path.Circle({center: position, radius: this.radius * this.scale, fillColor: 'green', opacity: 0.25})
	}

}


export default Test2

