import { countReset } from "console";
import Sprite from "../core/sprite";
import { Counter, Glyph, MetaGlyph, Parameter, Prim, Rule } from "../lsys";
import ParameterPrim from "../prims/parameterPrim";



class Accumulator extends Sprite {

	private prefix: string = '=';
	private count: number = 0;

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

		params.split(',').forEach( (p: string) => {

			if ( this.prefix === p.charAt(0) ) {
				
				this.count = Number.parseInt(p.substring(1));
			}
		})

		return params;
	}

	protected process(stream: MetaGlyph[]): MetaGlyph[] | null {

	    if ( this.prim ) {

	    	this.prim.cast( this.count + 1 );

	    } else {

	    	throw new Error(`ERROR @ Accumulator: missing required prim`);
	    }
		
		return stream;
	}

	run(stream: MetaGlyph[]): MetaGlyph[] {

		let sequence: MetaGlyph[] | null = [];

		sequence = this.process(stream);
		
		if ( sequence && sequence.length ) {

			return sequence;

		} else {

			return stream;
		}   
	}
}



export default Accumulator;