import Production from "../../lib/lsys/core/production";
import { Glyph, Imperative, Parameter, Prim, Rule } from "../../lib/lsys/lsys";
import ImperativePrim from "../../lib/lsys/prims/imperativePrim";
import ParameterPrim from "../../lib/lsys/prims/parameterPrim";


// K[K]B

class YRule extends Production {


	constructor(glyph: Rule, dialect: Glyph[]) {

		super(glyph, dialect);

	}


	public compose( brackets: string, antipodes: string, rule: string, ) {

		this.cast( this.decode(`${brackets[0]}${rule}${brackets[1]}${brackets[0]}${rule}${brackets[1]}`) );
		
		return this;
	};


	public process(params?: string) {


		// --------------------------------------------------------
		// 1 Parse the parameters


		// let parsedParams: Prim[] = []
		
		// if (params) {
			
		// 	console.log(`PROCESSING ${this.head.symbol} RULE... ${params}`)

		// 	parsedParams = params.split(',').map((s, i) => { 

		// 		return this.addPrim(s.charAt(0), 'Y', false);

		// 	});
		// }

		// --------------------------------------------------------
		// 2  Create the rule sequence


		let sequence: Glyph[] = this._rule.slice();


		// ---------------------------------------------------------------------------
		// 3  Run the sprites (if any)

		if ( this.sprites.length ) {

			for ( const sprite of this.sprites ) {

				sequence = sprite.run( sequence, params );
			}
		}


		// -------------------------------------------------------------
		// 4 Apply the prims

		sequence = sequence.map( (glyph, i) =>{

			console.log(`YRule processing ${glyph.symbol}`);

			let updatedParams: Prim[] = [];
			
			for ( const prim of this.head.prims ) {

				if ( prim.places.includes(i) ) {

					console.log(`${glyph.symbol} says: this ${prim.type} prim is for me!`);

					updatedParams.push( prim ); 

				}
			}

			if ( updatedParams.length && glyph.type==='Rule' ) { 

				glyph.prims = updatedParams;
				return  glyph;
			}


			return glyph;

		});

		// const debugMark: Rule = { type: 'Rule', symbol: 'x', params: [] }
		// const debugInfo: Rule = { type: 'Rule', symbol: 'i', params: [] }

		// const debugGlyph = sequence.find( (g) => g.symbol === 'T');

		// if ( debugGlyph && debugGlyph.type === 'Rule' ) {

		// 	debugInfo.params = [ ...debugGlyph.params ];

		// 	sequence.push(...[ debugMark, debugInfo ]);
		// }
		
		const sequenceSeries: string[] = sequence.map( (glyph) => {

			return this.encodeGlyph(glyph);
		});

		this._output = sequenceSeries.join('');
	}
}

export default YRule;

