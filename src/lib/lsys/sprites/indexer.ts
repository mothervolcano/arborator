import Sprite from "../core/sprite";
import { Glyph, Id, MetaGlyph, Prim, Rule } from "../lsys";
import IdPrim from "../prims/idPrim";




class Indexer extends Sprite {

	private targetGlyph: Glyph;
	private targetGlyphIDs: number[] = [];
	private id: number;
	private prims: Id[];
	// private spots: number[] = [];

	constructor( targetGlyph: Glyph, id: number ) {

		super();

		this.targetGlyph = targetGlyph;
		this.id = id;

		this.prims = [];
	};


	public implant( directory: Map<number, MetaGlyph>, head: Rule ): void {

	    directory.forEach((metaGlyph)=>{

	    	if ( metaGlyph.glyph.symbol === this.targetGlyph.symbol ) {

	    		if (metaGlyph.glyph.type==='Rule') {

					this.targetGlyphIDs.push(metaGlyph.id);
	    		}
	    	}
	    });
	};


	public update( directory: Map<number, MetaGlyph> ): number[] {

		// directory.forEach( (glyphData, i) => {

		// 	const glyph = glyphData.glyph;
			
		// });

		return []
	}


	public sow() {

		return [{ targets: [ this.targetGlyph ], prim: new IdPrim(this.id) }] ;
	}


	protected process(stream: MetaGlyph[]): MetaGlyph[] | null {

		let id = this.id;

		stream.map((metaGlyph)=>{

			if ( this.targetGlyphIDs.includes(metaGlyph.id) ) {

				const prim = new IdPrim(id);

    			if ( metaGlyph.data.prims ) {

					metaGlyph.data.prims.push(prim);

				} else { 

					metaGlyph.data.prims = [prim];
				}

				id++;
			}

		});
		
		this.id = id;

		return null;
	};


	run(stream: MetaGlyph[], params?: any): MetaGlyph[] {

		this.process( stream );

		return stream;

		// if ( sequence ) {

		// 	return sequence;

		// } else {

		// 	return stream;
		// } 
	};
}


export default Indexer