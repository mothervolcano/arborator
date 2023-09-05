import Command from "../../lib/lsys/core/command";
import Model from "../../lib/lsys/core/model";
import { IAlphabet } from "../../lib/lsys/lsys";
import GRule from "../productions/GRule"
import IRule from "../productions/IRule"
import YRule from "../productions/YRule"



class Tree extends Model {

	

	constructor( alphabet: IAlphabet, axiom: string ) {

		super( alphabet, axiom );


		const G: IProduction = new GRule( alphabet.rule('G') );
		const I: IProduction = new IRule( alphabet.rule('I'), alphabet.sequence('TYI') ); 
		const Y: IProduction = new YRule( alphabet.rule('Y'), alphabet.sequence('[+B][-B]') );


		// ---------------------------------------------------------------------

		this.scale = 1;
		this.lengthReductionFactor = 1;
		this.length = 10;
		
		this.angle = -90
		this.angleRotationStep = 45;

		this.radius = 10



		// ----------------------------------------------------
		// COMMANDS

		const moveForward = (tool: any, context?: any) => {

			tool.forward(this.distance * this.lengthCtrl1);
		};


		const turnLeft = (tool: any, context?: any) => {

			tool.left(this.angleRotationStep)
		};


		const turnRight = (tool: any, context?: any) => {

			tool.right(this.angleRotationStep)
		};

		const saveState = (tool: any, context?: any ) => {

			this.states.push( { 

				position: tool.position(), 
				length: this.length, 
				angle: tool.angle(),
				scale: this.scale,
				// radius: this.radius 
			}) 
		};

		const restoreState = ( tool: any, context?: any ) => {

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
		this.addCommand( new Command('+', turnLeft) );
		this.addCommand( new Command('-', turnRight) );
		this.addCommand( new Command('[', saveState) );
		this.addCommand( new Command('[', restoreState) );


	}

}


export default Tree