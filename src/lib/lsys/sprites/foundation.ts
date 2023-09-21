import Sprite from "../core/sprite";
import { Counter, Glyph, Id, MetaGlyph, Parameter, Prim, Rule } from "../lsys";
import BaseSprite from "./baseSprite";



class Foundation extends BaseSprite {


	private sourceGlyph: Rule;
	private seedPrim: Parameter | Counter | Id;
	private writerPrim: Counter | Parameter | Id | null;


	constructor( sourceGlyph: Rule, seedPrim: Parameter | Counter | Id, writerPrim: Counter | Parameter | Id | null = null ) {

		super();

		this.sourceGlyph = sourceGlyph;
		this.seedPrim = seedPrim;

		this.writerPrim = writerPrim || seedPrim;

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

	    	throw new Error(`ERROR @ Foundation: ${this.sourceGlyph.symbol} is not part of this Production Rule dialect`);
	    }    
	}


	sow(targets?: string[] | undefined): void | { targets: Glyph[]; prim: Prim; }[] {
	    
	    // return [{ targets: [ this.sourceGlyph ], prim: this.seedPrim }];  
	};


	update(params: string): string {
	    
	    return params;
	};


	protected process(stream: MetaGlyph[]): MetaGlyph[] | null {
	    
	    const sequence: MetaGlyph[] = [];
   
	    // ---------------------------------------

	    const count = this.seedPrim.getValue();

	    for ( let i=count; i>0; i-- ) {

	    	const prim = this.writerPrim!.clone();
			prim.cast(i);

	    	const newMetaGlyph = {

				glyph: this.sourceGlyph,
				id: 900,
				data: { prims: [ prim ] }
			}

			sequence.push( newMetaGlyph );
	    }

	    // ---------------------------------------

		if ( sequence.length ) { 
			
			stream.unshift( ...sequence );
		}

		return stream;
	};


	run(stream: MetaGlyph[]): MetaGlyph[] {

		let sequence: MetaGlyph[] | null = [];
		
		sequence = this.process(stream);

		if ( sequence && sequence.length ) {

			return sequence;

		} else {

			return stream;
		} 
	    
	};

}


export default Foundation;