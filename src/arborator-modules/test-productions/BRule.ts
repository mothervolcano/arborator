import Production from "../../lib/lsys/core/production";
import { Glyph, Imperative, MetaGlyph, Prim, Rule } from "../../lib/lsys/lsys";
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
		// 1 Start the stream


		let stream: MetaGlyph[] = this.sequence.slice();
		

		// ---------------------------------------------------------------------------
		// 3  Run the sprites (if any)

		if ( this.sprites.length ) {

			for ( const sprite of this.sprites ) {

				sprite.update( this.directory );

				stream = sprite.run( stream, params, this.head.symbol );
			}

		} else {

			// ? If there are no sprites, is it to be assumed/allowed that the production has set its own Prims
			// and if so this is where we process them? 

			// what if we have a mix of both?? 
		}


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

		
		console.log('')
		console.log(`ENCODING ${this.head.symbol} RULE sequence...`)


		const sequence: string[] = stream.map( (metaGlyph) => {

			console.log(`. Processing ${metaGlyph.glyph.type} ${metaGlyph.glyph.symbol}`)

			if ( metaGlyph.glyph.type==='Rule' ) {

				console.log(`. Checking updates for Rule Glyph ${metaGlyph.glyph.symbol}`)
				console.log(`. Data: ${Object.keys( metaGlyph.data )}`)

				if ( metaGlyph.data.prims && metaGlyph.data.prims.length ) {

					console.log(`. ${metaGlyph.data.prims.length} New prims found!`)

					for ( const primUpdate of metaGlyph.data.prims ) {

						const prim = metaGlyph.glyph.prims.find((p) => p.prefix === primUpdate.prefix );

						if ( prim ) {

							prim.cast( primUpdate.getValue() );

						} else {
							
							throw new Error(`Processing ERROR @ ${this.head.symbol} RULE: ${ primUpdate.prefix } Prim not found on ${metaGlyph.glyph.symbol}. `)
						}
					}

					metaGlyph.data = {};

					console.log(`.. Encoding ${metaGlyph.glyph.symbol}`)
					return this.encodeGlyph(metaGlyph.glyph);
				}
			}

			console.log(`... Encoding ${metaGlyph.glyph.symbol} ....`)
			return this.encodeGlyph(metaGlyph.glyph);

		});

		this.printSequence(sequence);

	}
}

export default BRule;

