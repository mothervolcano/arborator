import Production from "../../lib/lsys/core/production";
import { Glyph, Imperative, Prim, Rule } from "../../lib/lsys/lsys";
import ImperativePrim from "../../lib/lsys/prims/imperativePrim";
import ParameterPrim from "../../lib/lsys/prims/parameterPrim";


// K[K]B

class BRule extends Production {


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


		// let parsedParams: Prim[] = []

		// if ( params ) {

		// 	params.split(',').forEach((p)=>{

		// 		for ( const prim of this.prims ) {

		// 			if (prim.prefix===p.charAt(0)){

		// 				prim.process(p);
		// 			}
		// 		}
		// 	})
		// };
		
		// if (params) {

		console.log(``)
		console.log(`...........................................`)
			
		console.log(`${this.head.symbol} RULE PARAMS: ${params}`)

		// 	parsedParams = params.split(',').map((s) => { 

		// 		return this.addPrim(s.charAt(0), 'B', false).recast(s);

		// 	});	
		// }

		// --------------------------------------------------------
		// 2  Create the rule sequence


		let sequence: Glyph[] = this._rule.slice();

		// sequence = sequence.map((glyph,i)=>{

		// 	for ( const prim of this.prims ) {

		// 		if ( prim.places.includes(i) && prim.type === 'Imperative' ){

		// 			// return prim.getValue();
		// 		}
		// 	}

		// 	return glyph;

		// });

		// sequence = this._rule.map( (glyph) =>  {

		// 	if (glyph.type === 'Marker' && glyph.symbol === '*' ) {

		// 		const prim = this.prims.find( (p) => p.type === 'Imperative' )

		// 		if ( prim && prim.type === 'Imperative' ) {

		// 			return prim.getValue();

		// 		} else {

		// 			throw new Error("B Rule requires an imperative as parameter");
		// 		}
		// 	}

		// 	return glyph;
		// });


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

		sequence = sequence.map( (glyph, i) =>{

			// console.log(`YRule processing ${glyph.symbol}`);

			let updatedParams: Prim[] = [];
			
			for ( const prim of this.head.prims ) {

				// console.log(`Reading ${this.glyph.symbol}' Prims: ${prim.getValue()} [ ${prim.places} ]`)

				if ( glyph.type === 'Rule' ) {

					if ( prim.places.includes(glyph.id) ) {

						// console.log(`${glyph.symbol} says: this ${prim.type} prim is for me!`);

						updatedParams.push( prim ); 
					}	
				}
			}

			if ( updatedParams.length && glyph.type==='Rule' ) { 

				glyph.prims = updatedParams;
				return  glyph;
			}

			return glyph;
		});


		
		// sequence = sequence.map( (glyph) => { 

		// 	if ( glyph.type === 'Rule' ) {

		// 		if ( glyph.symbol === this.glyph.symbol ) {

		// 			if ( parsedParams.length ) {

		// 				if (parsedParams[0].type === 'Parameter') {

		// 					// parsedParams[0].value += 1;		
		// 				}  

		// 				return { ...glyph, params: [...parsedParams] };

		// 			} else {

		// 				return { ...glyph, params: [] };
		// 			}
		// 		}


		// 		if ( glyph.symbol === 'R' ) {

		// 			if ( parsedParams.length ) {

		// 				if (parsedParams[0].type === 'Parameter') {

		// 				 	parsedParams[0].setValue(1);		
		// 				}  

		// 				return { ...glyph, params: [...parsedParams] };

		// 			} else {

		// 				return { ...glyph, params: [] };
		// 			}
		// 		}
		// 	}

		// 	return glyph;
		// });


		// --------------------------------------------------------------
		// DEBUG 

		// const debugMark: Rule = { id: 0, type: 'Rule', symbol: 'x', params: [] }
		// const debugInfo: Rule = { id: 0, type: 'Rule', symbol: 'i', params: [] }

		// const debugGlyph = sequence.find( (g) => g.symbol === 'f');

		// // sequence.slice().forEach((glyph,i)=>{    

		// // 	if ( debugGlyph!.symbol === glyph.symbol ) {

		// // 		debugInfo.params = [ this.prims[0]];

		// // 		sequence.splice( i, 0, ...[ debugMark, debugInfo ]);
		// // 	}
		// // });


		// debugInfo.params = [ this.prims[0] ];

		// sequence.push( ...[ debugMark, debugInfo ]);

		
		this._output = this.encode(sequence);
	}
}

export default BRule;

