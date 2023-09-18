import Sprite from "../core/sprite";
import { Counter, Glyph, Id, MetaGlyph, Parameter, Prim, Rule } from "../lsys";


class Generator extends Sprite {


	private sourceGlyph: Rule;
	private seedPrim: Parameter | Counter | Id;

	private headGlyph: Glyph | undefined;


	constructor( sourceGlyph: Rule, seedPrim: Parameter | Counter | Id ) {

		super();

		this.sourceGlyph = sourceGlyph;
		this.seedPrim = seedPrim;

	};


	implant(directory: Map<number, any>, dialect: Glyph[]): void {

		const validatedGlyph = dialect.find((glyph)=>glyph.symbol === this.sourceGlyph.symbol )

	    if ( validatedGlyph ) {


	    	if ( validatedGlyph.type==='Rule') {

	    		this.sourceGlyph = validatedGlyph;

	    	} else {

	    		throw new Error(`ERROR @ Bootstrapper: Input Glyph must be of type Rule. Instead got ${this.sourceGlyph.symbol}`);
	    	}


	    } else {

	    	throw new Error(`ERROR @ Generator: ${this.sourceGlyph.symbol} is not part of this Production Rule dialect`);
	    }

	    this.headGlyph = directory.get(0).glyph;
	    
	}


	sow(targets?: string[] | undefined): void | { targets: Glyph[]; prim: Prim; }[] {
	    
	    return [{ targets: [ this.sourceGlyph, this.headGlyph! ], prim: this.seedPrim }];  
	};


	update(params: string): string {
	    
	    return params;
	};


	protected process(stream: MetaGlyph[], countString?: any): MetaGlyph[] | null {
	    
	    const sequence: MetaGlyph[] = [];

	    // ------------------------------------------------

	    const count = Number.parseInt(countString) - 1;

    	const prim = this.seedPrim.clone();
		prim.cast(count);

    	const newMetaGlyph = {

			glyph: this.sourceGlyph,
			id: 900,
			data: { prims: [ prim ] }
		}

		sequence.push( newMetaGlyph );
	    
	    // ------------------------------------------------

		if ( sequence.length ) { 
			
			stream.unshift( ...sequence );
		}

		return stream;
	};


	run(stream: MetaGlyph[], params?: any): MetaGlyph[] {

		let sequence: MetaGlyph[] | null = [];

		if ( params ) {

			params.split(',').forEach( (p: string) => {

				if ( p.charAt(0) === this.seedPrim.prefix ) {
					
					sequence = this.process(stream, p.substring(1));
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


export default Generator;