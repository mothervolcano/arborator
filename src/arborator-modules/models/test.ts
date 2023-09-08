import { Path, Color, PointText } from 'paper';

import Command from "../../lib/lsys/core/command";
import Model from "../../lib/lsys/core/model";
import { IAlphabet, IProduction } from "../../lib/lsys/lsys";
import IRule from "../test-productions/IRule";
import YRule from "../test-productions/YRule";
import BRule from "../test-productions/BRule";
import RRule from "../test-productions/RRule";
import ParameterPrim from "../../lib/lsys/prims/parameterPrim";
import ImperativePrim from "../../lib/lsys/prims/imperativePrim";


class Test extends Model {


	private states: any[];

	private scale: number;
	private lengthReductionFactor: number;
	private length: number;
	private angle: number;
	private angleRotationStep: number;
	private radius: number;
	

	constructor( alphabet: IAlphabet, axiom: string ) {

		super( alphabet, axiom );


		const I: IProduction = new IRule( alphabet.rule('I'), alphabet.collect('[]+-IYf') ).compose('ffffffffYI'); 
		const Y: IProduction = new YRule( alphabet.rule('Y'), alphabet.collect('[]+-B*!_') ).compose('[]','-+','*!_B');
		const K: IProduction = new YRule( alphabet.rule('K'), alphabet.collect('[]+-f*!') ).compose('[]','-+','*!fff');
		// const B: IProduction = new BRule( alphabet.rule('B'), alphabet.collect('[]+-BRYf*') ).compose('RB[*ff]ffff[*fff]');
		const B: IProduction = new BRule( alphabet.rule('B'), alphabet.collect('[]+-BRKf*') ).compose('RKB');
		const R: IProduction = new RRule( alphabet.rule('R'), alphabet.collect('[]+-RYf!*') ).compose('fff');

		Y.addPrim( new ParameterPrim(1) );

		this.addProduction(I);
		this.addProduction(Y);
		this.addProduction(B);
		this.addProduction(R);
		this.addProduction(K);


		// ---------------------------------------------------------------------

		this.states = [];

		this.scale = 1;
		this.lengthReductionFactor = 1;
		this.length = 10;
		
		this.angle = -90
		this.angleRotationStep = 45;

		this.radius = 10


		// ---------------------------------------------------------------------
		// DEBUG

		const positions = new Map();


		const showInfo = ( tool: any, value: any ) => {


			if ( !positions.has( tool.position() )) {

				positions.set( tool.position(), { x: tool.position().x, y: tool.position().y - 5  })
			}

			const pos = positions.get( tool.position() )

			const text = new PointText( [ pos.x, pos.y ] );
        	text.style = { fillColor: new Color('green'), fontFamily: 'Helvetica', fontWeight: 'normal', fontSize: 10 } as any
        	text.content = `[${value}]`;
        	// text.content = `[${'!!!'}]`;

        	// pos.x += 15
        	pos.y -= 11
   
		};


		const addMark = ( tool: any, context?: any  ) => { 

			this.addMark( tool.position() );

		};


		this.addCommand( new Command('i', showInfo ) );
		this.addCommand( new Command('x', addMark ) );



		// ----------------------------------------------------
		// COMMANDS

		const moveForward = (tool: any, context?: any) => {

			console.log(`MOVE FORWARD: f --> ${this.length} / ${tool.position()}`);

			tool.forward( this.length );
		};


		const turnLeft = (tool: any, context?: any) => {

			this.angleRotationStep = context ? context : this.angleRotationStep

			console.log(`TURN LEFT: + --> ${this.angleRotationStep}`)

			tool.left(this.angleRotationStep)
		};


		const turnRight = (tool: any, context?: any) => {

			this.angleRotationStep = context ? context : this.angleRotationStep

			console.log(`TURN RIGHT: - --> ${this.angleRotationStep}`)

			tool.right(this.angleRotationStep)
		};

		const saveState = (tool: any, context?: any ) => {

			console.log(`SAVE: [ --> ${this.states}`)

			this.states.push( { 

				position: tool.position(), 
				length: this.length, 
				angle: tool.angle(),
				scale: this.scale,
				// radius: this.radius 
			}) 
		};

		const restoreState = ( tool: any, context?: any ) => {

			console.log(`RESTORE: ] --> ${this.states}`)

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
		this.addCommand( new Command('+', turnRight) );
		this.addCommand( new Command('-', turnLeft) );
		this.addCommand( new Command('[', saveState) );
		this.addCommand( new Command(']', restoreState) );


	}

	private addMark( position: any ) {

		const mark = new Path.Circle({center: position, radius: this.radius * this.scale, fillColor: 'green', opacity: 0.25})
	}

}


export default Test

