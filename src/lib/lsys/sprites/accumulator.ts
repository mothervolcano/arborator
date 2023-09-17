import { countReset } from "console";
import Sprite from "../core/sprite";
import { Counter, Glyph, MetaGlyph, Parameter, Prim, Rule } from "../lsys";
import ParameterPrim from "../prims/parameterPrim";



class Accumulator extends Sprite {

	private prefix: string = '=';

	private targetGlyph: Glyph | undefined;
	private prim: Parameter | Counter | undefined;

	constructor( prefix: string ) {

		super();

		this.prefix = prefix;

	}

	implant(directory: Map<number, any>, dialect: Glyph[]): void {

		this.targetGlyph = directory.get(0).glyph as Rule;

		if ( this.targetGlyph ) {
			
			this.prim = this.targetGlyph.prims.find((p) => p.prefix === this.prefix ) as Parameter | Counter;

		} else {

			throw new Error(`ERROR @ Accumulator: head glyph not found`);
		}


		// directory.forEach((metaGlyph)=> {

		// 	// Find the ids of each incognito in the directory so we can track them if the sequence changes or mutates

		// 	if (metaGlyph.glyph.symbol === this.targetGlyph.symbol ) {

		// 		this.targetGlyphIDs.push(metaGlyph.id);
		// 	}

		// });    
	};


	sow(targets?: string[] | undefined): void | { targets: Glyph[]; prim: Prim; }[] {
	    
	}

	update(params: string): string {

		return params;
	}

	protected process(stream: MetaGlyph[], countString: string): MetaGlyph[] | null {
	    
	    const count = Number.parseInt(countString.substring(1));

	    if ( this.prim ) {

	    	this.prim.cast( count + 1 );

	    } else {

	    	throw new Error(`ERROR @ Accumulator: missing required prim`);
	    }


		const workingSequence = stream.map((metaGlyph) => {

			// if ( this.targetGlyphIDs.includes( metaGlyph.id) ) {

			// 	const prim = count ? new ParameterPrim( count + 1 ) : new ParameterPrim(1);

			// 	if ( metaGlyph.data.prims ) {

			// 		metaGlyph.data.prims.push(prim);

			// 	} else { 

			// 		metaGlyph.data.prims = [prim];
			// 	}
		
			// }	

			return metaGlyph;

		});	
		
		return workingSequence;
	}

	run(stream: MetaGlyph[], params?: any): MetaGlyph[] {

		let sequence: MetaGlyph[] | null = [];

		if ( params ) {

			params.split(',').forEach( (p: string) => {

				if ( this.prefix === p.charAt(0) ) {
					
					sequence = this.process(stream, p );
				}
			})
		}

		if ( sequence && sequence.length ) {

			return sequence;

		} else {

			return stream;
		}   
	}
}



export default Accumulator;