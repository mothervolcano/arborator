import Sprite from "../core/sprite";
import { Glyph, Id, Prim, Rule } from "../lsys";
import IdPrim from "../prims/idPrim";




class Indexer extends Sprite {

	private targetGlyph: Glyph;
	private id: number;
	private prims: Id[];
	// private spots: number[] = [];

	constructor( targetGlyph: Glyph, id: number ) {

		super();

		this.targetGlyph = targetGlyph;
		this.id = id;

		this.prims = [];
	};


	implant(rule: Glyph[], head: Rule): Prim[] {

	    rule.forEach((glyph)=>{

	    	if ( glyph.symbol === this.targetGlyph.symbol ) {

	    		if (glyph.type==='Rule') {

	    			// this.spots.push(glyph.id)

	    			const prim = new IdPrim( this.id )
	    			prim.places = [ glyph.id ];

	    			this.prims.push(prim);

	    			this.id++
	    		}
	    	}
	    });

	    // return this.prims;
	    return [new IdPrim( this.id )];
	};


	public sow() {

		return [{ targets: [ this.targetGlyph ], prim: new IdPrim(1) }] ;
	}


	protected process(stream: Glyph[]): Glyph[] | null {

		for ( const prim of this.prims ) {

			prim.process();
			prim.process();
		}
	    
		return null
	};


	run(stream: Glyph[], params?: any): Glyph[] {

		if ( params ) {

			params.split(',').forEach((p: string) => {

			})
		}

		this.process(stream);
	    
		return stream;
	};
}


export default Indexer