import Production from "../../lib/lsys/core/production";
import { Glyph, Imperative, MetaGlyph, Prim, Rule } from "../../lib/lsys/lsys";
import ImperativePrim from "../../lib/lsys/prims/imperativePrim";
import ParameterPrim from "../../lib/lsys/prims/parameterPrim";




class KRule extends Production {


	constructor(glyph: Rule, dialect: Glyph[]) {

		super(glyph, dialect);

		// this.addPrim(new ParameterPrim(1));
		// this.addPrim(new ParameterPrim(1));
		// this.addPrim(new ImperativePrim( dialect[2] ));
	}
	

	public compose(rule: string) {

		this.cast( this.decode(rule) );

		return this;
	}


	public process(params?: string) {


		// --------------------------------------------------------
		// 1 Parse the parameters



		console.log(``)
		console.log(`...........................................`)
			
		console.log(`${this.head.symbol} RULE PARAMS: ${params}`)


		// --------------------------------------------------------
		// 2  Create the rule sequence


		let stream: MetaGlyph[] = this.sequence.slice();


		// ---------------------------------------------------------------------------
		// 3  Run the sprites (if any)

		if ( this.sprites.length ) {

			for ( const sprite of this.sprites ) {

				params = params ? sprite.update(params) : params;
				stream = sprite.run( stream, params, this.head.symbol );
			}

		} else {

			// ? If there are no sprites, is it to be assumed/allowed that the production has set its own Prims
			// and if so this is where we process them? 

			// what if we have a mix of both?? 
		}


		// -------------------------------------------------------------
		// 4 Apply the prims



		// --------------------------------------------------------------
		// DEBUG 

		// const debugMark: Rule = { id: 0, type: 'Rule', symbol: 'x', params: [] }
		// const debugInfo: Rule = { id: 0, type: 'Rule', symbol: 'i', params: [] }

		// const debugGlyph = stream.find( (g) => g.symbol === 'f');

		// stream.slice().forEach((glyph,i)=>{    

		// 	if ( debugGlyph!.symbol === glyph.symbol ) {

		// 		debugInfo.params = [ this.prims[0] ];

		// 		stream.splice( i, 0, ...[ debugMark, debugInfo ]);
		// 	}
		// });


		
		const sequence: string[] = stream.map( (metaGlyph) => {

			return this.encodeGlyph(metaGlyph.glyph);
		});

		this.printSequence(sequence);
	}
}

export default KRule;

