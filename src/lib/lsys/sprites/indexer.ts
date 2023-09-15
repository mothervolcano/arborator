import Sprite from "../core/sprite";
import { Glyph, Id, MetaGlyph, Prim, Rule } from "../lsys";
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


	public implant(directory: Map<number, MetaGlyph>, head: Rule): Prim[] {

	    directory.forEach((glyphData)=>{

	    	const glyph = glyphData.glyph;

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


	public update( directory: Map<number, MetaGlyph> ): number[] {

		directory.forEach( (glyphData, i) => {

			const glyph = glyphData.glyph;
			
		});

		return []
	}


	public sow() {

		return [{ targets: [ this.targetGlyph ], prim: new IdPrim(1) }] ;
	}


	protected process(stream: MetaGlyph[]): MetaGlyph[] | null {

		for ( const prim of this.prims ) {

			prim.process();
			prim.process();
		}
	    
		return null
	};


	run(stream: MetaGlyph[], params?: any): MetaGlyph[] {

		if ( params ) {

			params.split(',').forEach((p: string) => {

			})
		}

		this.process(stream);
	    
		return stream;
	};
}


export default Indexer