import { error } from "console";
import Production from "../../lib/lsys/core/production";
import { Glyph, MetaGlyph, Prim, Rule } from "../../lib/lsys/lsys";
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

		// console.log(`PROCESSING ${this.head.symbol} RULE... ${params}`)

		let updateIndex: number[] = [];
		let stream: MetaGlyph[] = this.sequence.slice();


		// stream = this.processPrims( stream, params );

		
		// ---------------------------------------------------------------------------
		// 3  Run the sprites (if any)

		if ( this.sprites.length ) {

			for ( const sprite of this.sprites ) {

				params = params ? sprite.update( params ) : params;
				stream = sprite.run( stream, params, this.head.symbol );
			}

		} else {

			// ? If there are no sprites, is it to be assumed/allowed that the production has set its own Prims
			// and if so this is where we process them? 

			// what if we have a mix of both?? 
		}



		// -------------------------------------------------------------
		// 4 Apply the prims


		// const debugMark: Rule = { id: 0, type: 'Rule', symbol: 'x', prims: [] }
		// const debugInfo: Rule = { id: 0, type: 'Rule', symbol: 'i', prims: [] }

		// if ( this.head.symbol === 'I' && params ) {

		// 	const prim = new ParameterPrim();

		// 	params.split(',').forEach( (p: string) => {

		// 		if ( p.charAt(0) === '=') {
					
		// 			prim.cast( Number.parseInt(p.substring(1)) )
		// 		}
		// 	})

		// 	debugInfo.prims = [ prim ];

		// 	// debugInfo.prims = [ this.head.prims[0] ];
		// 	stream.push( ...[ { glyph: debugMark, id: 99, data: {} }, { glyph: debugInfo, id: 99, data: { } } ]);
		// 	// stream.unshift( ...[ { glyph: debugMark, id: 99, data: {} } ]);


		// 	// const debugGlyph = stream.find( (g) => g.glyph.symbol === 'K');

		// 	// stream.slice().forEach((mg) => {

		// 	// 	if ( mg.glyph.symbol === 'f' ) {

		// 	// 		debugInfo.prims = [ this.head.prims[0] ];
		// 	// 		stream.unshift( ...[ { glyph: debugMark, id: 99, data: {} }, { glyph: debugInfo, id: 99, data: {} } ]);

		// 	// 	}
		// 	// })			
		// }
		




		// console.log('')
		// console.log(`ENCODING ${this.head.symbol} RULE sequence...`)


		const sequence: string[] = stream.map( (metaGlyph) => {

			// console.log(`. Processing ${metaGlyph.glyph.type} ${metaGlyph.glyph.symbol}`)

			if ( metaGlyph.glyph.type==='Rule' ) {

				// console.log(`. Checking updates for Rule Glyph ${metaGlyph.glyph.symbol}`)
				// console.log(`. Data: ${Object.keys( metaGlyph.data )}`)

				if ( metaGlyph.data.prims && metaGlyph.data.prims.length ) {

					// console.log(`. ${metaGlyph.data.prims.length} New prims found!`)

					for ( const primUpdate of metaGlyph.data.prims ) {

						const prim = metaGlyph.glyph.prims.find((p) => p.prefix === primUpdate.prefix );

						if ( prim ) {

							prim.cast( primUpdate.getValue() );

						} else {
							
							throw new Error(`Processing ERROR @ ${this.head.symbol} RULE: ${ primUpdate.prefix } Prim not found on ${metaGlyph.glyph.symbol}. `)
						}
					}

					metaGlyph.data = {};

					// console.log(`.. Encoding ${metaGlyph.glyph.symbol}`)
					return this.encodeGlyph(metaGlyph.glyph);
				}
			}

			// console.log(`... Encoding ${metaGlyph.glyph.symbol} ....`)
			return this.encodeGlyph(metaGlyph.glyph);

		});


		this.printSequence(sequence);
	}
}

export default IRule;

