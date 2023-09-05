import {  Point, Segment, Path, Group, Color, PointText } from 'paper'


import Turtle from '../../lib/lsys/tools/turtle'

import IRule from '../productions/rules/IRule'
import TRule from '../productions/rules/TRule'
import YRule from '../productions/rules/YRule'
import BRule from '../productions/rules/BRule'
import KRule from '../productions/rules/KRule'
import GRule from '../productions/rules/GRule'
import StartBranchRule from '../productions/rules/StartBranchRule'
import EndBranchRule from '../productions/rules/EndBranchRule'


import { ProductionType, RuleSetType } from '../../lib/lsys/types';

import { genRandom, genRandomDec } from '../../lib/lsys/tools/randomGenerators'

const DEBUG_GREEN = '#10FF0C';
const GUIDES = '#06E7EF';


class Tree {
	
	public rules: any
	public actions: any
	public states: any[]

	private pen: any

	public axiom: string

	public length: number
	public scale: number
	public lengthReductionFactor: number
	
	public angle: number
	public angleRotationStep: number
	
	public radius: number

	private positions: any // Used for the debbuging text boxes
	

	constructor( origin: any, iterations: number ) {

		
		this.rules = new Map();
		this.actions = new Map();

		this.states = [];

		/* DEBUG */  this.positions = new Map();


		// ----------------------------------------------------------------------


		this.axiom = 'I'


		this.rules.set( 'G', new GRule( 1, iterations ));
		this.rules.set('T', new TRule( 1, iterations ));

		this.rules.set( 'I', new IRule( 1, iterations ));
		
		this.rules.set( 'Y', new YRule( -2, iterations ));
		this.rules.set( 'K', new KRule( 1, iterations ));
		
		this.rules.set( 'B0', new BRule( 'B0', 1, iterations ));
		this.rules.set( 'B1', new BRule( 'B1', 1, iterations ));
		this.rules.set( 'B2', new BRule( 'B2', 1, iterations ));
		this.rules.set( 'B3', new BRule( 'B3', 1, iterations ));
		this.rules.set( 'B4', new BRule( 'B4', 1, iterations ));
		this.rules.set( 'B5', new BRule( 'B5', 1, iterations ));
		this.rules.set( 'B6', new BRule( 'B6', 1, iterations ));
		this.rules.set( 'B7', new BRule( 'B7', 1, iterations ));
		this.rules.set( 'B8', new BRule( 'B8', 1, iterations ));
		this.rules.set( 'B9', new BRule( 'B9', 1, iterations ));
		
		this.rules.set( '[', new StartBranchRule() );
		this.rules.set( ']', new EndBranchRule() );


		// ---------------------------------------------------------------------

		this.scale = 1;
		this.lengthReductionFactor = 1;
		this.length = 10;
		
		this.angle = -90
		this.angleRotationStep = 45;

		this.radius = 10


		// ---------------------------------------------------------------------


		this.pen = new Turtle()
		// this.pen.init( origin.x, origin.y, this.angle )
		this.pen.init( 250, 200, this.angle )

		

		// ---------------------------------------------------------------------


		this.actions.set( 'i', ( value: any ) => {


			if ( !this.positions.has( this.pen.position() )) {

				this.positions.set( this.pen.position(), { x: this.pen.position().x, y: this.pen.position().y - 5  })
			}

			const pos = this.positions.get( this.pen.position() )

			const text = new PointText( [ pos.x, pos.y ] );
        	text.style = { fillColor: new Color(DEBUG_GREEN), fontFamily: 'Helvetica', fontWeight: 'normal', fontSize: 10 } as any
        	text.content = `[${value}]`;
        	// text.content = `[${'!!!'}]`;

        	// pos.x += 15
        	pos.y -= 11
   
		});


		this.actions.set( 'x', ( params: any ) => { 

			this.addMark( this.pen.position() );

		});


		this.actions.set( 'f', ( params: any ) => { 

			// console.log(`f ACTION:`)
			// console.log({params});

			// this.pen.forward( this.length * params[1] ); 
			this.pen.forward( this.length ); 
		});


		// ---------------------------------------------------------------------------

		
		this.actions.set( 'I', () => { 

			// this.pen.forward( this.length * this.scaleCtrl ); 

		});


		this.actions.set( 'T', ( params: any ) => { 

			// console.log(`F DISTANCE: ${this.length * params[1] }`)

			// this.pen.forward( this.length * params[1] ); 
			// this.pen.forward( this.length * params[1] ); 
		});
		

		this.actions.set( 'Y', ( params: any ) => { 


			// console.log(`Y VALUE: ${ params[1] }`)
			// this.pen.forward( this.length * params[1] * this.scaleCtrl ); 

		});


		this.actions.set( 'B', ( params: any ) => {

			// console.log(`B PARAMS: ${params}`)

			// this.pen.forward( this.length * params[1] * this.scaleCtrl )

			// if ( genRandomDec(0,1) > 0.5 ) {

			// 	this.pen.left( genRandom( 0, 15 ) );

			// } else {

			// 	this.pen.right( genRandom( 0, 15 ) );

			// }


		});


		this.actions.set( 'K', ( params: any ) => { 

			// this.pen.rotate(90)
			// this.pen.forward( this.length * params[1] * this.scaleCtrl ); 
		})



		this.actions.set( 'G', () => {

			// console.log(`debu(G): ${ this.length }`)

			// this.pen.forward( this.length * 10 );
		});
		


		this.actions.set( 'L', ( params: any ) => { 

			// this.pen.forward( this.length * params[1] * this.scaleCtrl ); 
		})

		
		this.actions.set('O', ( params: any ) => {

			new Path.Circle({ center: this.pen.position(), radius: 10 * params[1], fillColor: 'green' })
		})



		this.actions.set( '+', () => { this.pen.left( this.angleRotationStep ) })
		this.actions.set( '-', () => { this.pen.right( this.angleRotationStep ) })

		this.actions.set( '>', () => { this.length += 1 })
		this.actions.set( '<', () => { this.length -= 1 })

		this.actions.set( '[', () => { 
			
			this.states.push( { 

				position: this.pen.position(), 
				length: this.length, 
				angle: this.pen.angle(),
				scale: this.scale,
				// radius: this.radius 
			}) 
		})
		
		this.actions.set( ']', () => { 

			let state = this.states.pop()
			this.length = state.length
			this.scale = state.scale
			// this.radius = state.radius
			this.pen.up()
			this.pen.rotate( state.angle )
			this.pen.goto( state.position.x, state.position.y )
			this.pen.down()

		})

		// ----------------------------------------------------------------------------


	}


	private addMark( position: any ) {

		const mark = new Path.Circle({center: position, radius: this.radius * this.scale, fillColor: 'green', opacity: 0.25})
	}


	public reconfigure( origin: any, scaleCtrl: number = 1, lengthReductionFactor: number = 1, angleRotationStep: number = 45 ) {

		this.lengthReductionFactor = lengthReductionFactor;
		this.angleRotationStep = angleRotationStep;

		this.pen.init( origin.x, origin.y, this.angle );

		this.scale = 1 * scaleCtrl;
		this.length = 10;

	}

}


export default Tree



