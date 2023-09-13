import Sprite from "../core/sprite";
import { Glyph, Id, Prim, Rule } from "../lsys";
import IdPrim from "../prims/idPrim";




class Indexer extends Sprite {

	private targetSymbol: string;
	private id: number;
	private prims: Id[];
	// private spots: number[] = [];

	constructor( targetSymbol: string, id: number ) {

		super();

		this.targetSymbol = targetSymbol;
		this.id = id;

		this.prims = [];
	};


	implant(rule: Glyph[], head: Rule): void {

	    rule.forEach((glyph)=>{

	    	if ( glyph.symbol === this.targetSymbol ) {

	    		if (glyph.type==='Rule') {

	    			// this.spots.push(glyph.id)

	    			const prim = new IdPrim( this.id )
	    			prim.places = [ glyph.id ];

	    			head.prims.push( prim );

	    			this.prims.push(prim);

	    			this.id++
	    		}
	    	}
	    });
	};


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