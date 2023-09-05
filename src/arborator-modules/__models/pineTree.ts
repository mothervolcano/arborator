// // import {  Point, Segment, Path, Group, Color } from 'paper'

// import Turtle from '../tools/turtle'

// import Sequencer from '../core/sequencer'

// import IComp from '../productions/compositions/IComp'
// import YNode from '../productions/nodes/YNode'

// import BRule from '../productions/rules/BRule'
// import XRule from '../productions/rules/XRule'
// import FRule from '../productions/rules/FRule'


// import { ProductionType, RuleSetType } from '../types'


// const DEBUG_GREEN = '#10FF0C';
// const GUIDES = '#06E7EF';


// class PineTree {


// 	public rules: any
// 	public actions: any
// 	private states: any[]
	
	
// 	constructor( origin: any, p1: number, p2: number, p3: number, p4: number, p5: number ) {

		
// 		this.rules = new Map()
// 		this.actions = new Map()

// 		this.states = []


// 		// ----------------------------------------------------------------------

// 		const F = new FRule( 1 )
// 		const X = new XRule( 1 )
// 		const B = new BRule( 1 )
// 		const Y = new YNode( 1, p5 )
// 		const I = new IComp( 1, p4 ).addSequence( [ F, X, Y, B ], 'I' )

// 		this.rules.set( 'F', F )
// 		this.rules.set( 'X', X )
// 		this.rules.set( 'B', B )
		
// 		this.rules.set( 'Y', Y )
// 		this.rules.set( 'I', I )


// 		// ---------------------------------------------------------------------

// 		this.distance = 100 * p1
		
// 		this.radius = 25

// 		this.angle = -90
// 		this.angleStep = 90 * p3
// 		this.angleCtrl = p3

// 		this.scale = p1
// 		this.scaleCtrl = p2


// 		// ---------------------------------------------------------------------


// 		this.pen = new Turtle()
// 		this.pen.init( origin.x, origin.y, this.angle )

		

// 		// ---------------------------------------------------------------------


// 		this.actions.set( 'X', ( params ) => { 


// 			this.addMark( this.pen.position(), params[1] );

// 		})

		
// 		this.actions.set( 'F', ( params ) => { 

// 			this.pen.forward( this.distance * params[0]/5 ); 
// 		})


// 		this.actions.set( 'B', ( params ) => {

// 			// console.log(`B PARAMS: ${params}`)

// 			this.pen.forward( this.distance * params[1] * this.scaleCtrl )

// 		})	

// 		this.actions.set( 'L', ( params ) => { 

// 			this.pen.rotate(90)
// 			this.pen.forward( this.distance * params[1] * this.scaleCtrl ); 
// 		})

		
// 		this.actions.set('O', ( params ) => {

// 			new Path.Circle({ center: this.pen.position(), radius: 10 * params[1] * this.scaleCtrl, fillColor: 'green' })
// 		})



// 		this.actions.set( 'Y', ( params ) => { 


// 			// console.log(`Y VALUE: ${ params[1] }`)
// 			// this.pen.forward( this.distance * params[1] * this.scaleCtrl ); 

// 		})

// 		this.actions.set( 'I', () => { 

// 			// this.pen.forward( this.distance * this.scaleCtrl ); 
// 		})

// 		this.actions.set( '+', () => { this.pen.left( this.angleStep ) })
// 		this.actions.set( '-', () => { this.pen.right( this.angleStep ) })

// 		this.actions.set( '>', () => { this.scale *= ( 1 + this.scaleCtrl ) })
// 		this.actions.set( '<', () => { this.scale *= this.scaleCtrl } )

// 		this.actions.set( '[', () => { 
			
// 			this.states.push( { 

// 				position: this.pen.position(), 
// 				distance: this.distance, 
// 				angle: this.pen.angle(),
// 				scale: this.scale,
// 				// radius: this.radius 
// 			}) 
// 		})
		
// 		this.actions.set( ']', () => { 

// 			let state = this.states.pop()
// 			this.distance = state.distance
// 			this.scale = state.scale
// 			// this.radius = state.radius
// 			this.pen.up()
// 			this.pen.rotate( state.angle )
// 			this.pen.goto( state.position.x, state.position.y )
// 			this.pen.down()

// 		})

// 		// ----------------------------------------------------------------------------


		
// 		this.sequencer = new Sequencer( this.rules, this.actions, 'I' )



// 	}


// 	private addMark( position: any, p1: number ) {

// 		const mark = new Path.Circle({center: position, radius: this.radius * this.scale * p1, strokeColor: 'green', opacity: 0.25})
// 	}


// 	generate( iterations ) {

// 		this.sequencer.run( iterations )
// 	}

// }


// export default PineTree


export {}



