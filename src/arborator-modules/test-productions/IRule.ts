import Production from "../../lib/lsys/core/production";
import { Glyph, Prim, Rule } from "../../lib/lsys/lsys";
import ImperativePrim from "../../lib/lsys/prims/imperativePrim";
import ParameterPrim from "../../lib/lsys/prims/parameterPrim";


// K[K]B

class IRule extends Production {


	constructor(glyph: Rule, dialect: Glyph[]) {

		super(glyph, dialect);

	}


	public compose(rule: string) {

		this.cast( this.decode(rule) );

		return this;
	}


	public process(params?: string) {


		// --------------------------------------------------------
		// 1 Parse the parameters

		console.log(`PROCESSING ${this.head.symbol} RULE... ${params}`)

		// let parsedParams: Prim[] = []
		
		// if (params) {
			

		// 	// parsedParams = params.split(',').map((s, i) => { 

		// 	// 	if (this.prims[i].read(s)) {

		// 	// 		this.prims[i].recast(s);

		// 	// 		return this.prims[i];

		// 	// 	} else {

		// 	// 		throw new Error(`Production is unable to process ${s} parameter`)
		// 	// 	}

		// 	// })	
		// }

		// --------------------------------------------------------
		// 2  Create the rule sequence

		let sequence: Glyph[] = this._rule.slice();


		// ---------------------------------------------------------------------------
		// 3  Run the sprites (if any)

		if ( this.sprites.length ) {

			for ( const sprite of this.sprites ) {

				sequence = sprite.run( sequence, params, this.head.symbol );
			}

		} else {

			// ? If there are no sprites, is it to be assumed/allowed that the production has set its own Prims
			// and if so this is where we process them? 

			// what if we have a mix of both?? 
		}


		// -------------------------------------------------------------
		// 4 Apply the prims

		sequence = sequence.map( (glyph) =>{

			// console.log(`YRule processing ${glyph.symbol}`);

			let updatedParams: Prim[] = [];
			
			for ( const prim of this.head.prims ) {

				// console.log(`Reading ${this.glyph.symbol}' Prims: ${prim.getValue()}`)

				if ( prim.places.includes(glyph.id) ) {

					// console.log(`${glyph.symbol} says: this ${prim.type} prim is for me!`);

					updatedParams.push( prim ); 
				}
			}

			if ( updatedParams.length && glyph.type==='Rule' ) { 

				glyph.prims = updatedParams;
				return  glyph;
			}

			return glyph;
		});



		// const debugMark: Rule = { id: 0, type: 'Rule', symbol: 'x', params: [] }
		// const debugInfo: Rule = { id: 0, type: 'Rule', symbol: 'i', params: [] }

		// const debugGlyph = sequence.find( (g) => g.symbol === 'B');

		// sequence.slice().forEach((glyph,i)=>{    

		// 	if ( debugGlyph!.symbol === glyph.symbol ) {

		// 		debugInfo.params = [ this.prims[1]];

		// 		sequence.splice( i, 0, ...[ debugMark, debugInfo ]);
		// 	}
		// });



		
		this._output = this.encode(sequence);
	}
}

export default IRule;

