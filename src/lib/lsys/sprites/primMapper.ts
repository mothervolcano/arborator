import Sprite from "../core/sprite";
import { Glyph, MetaGlyph, Prim, Rule } from "../lsys";
import BaseSprite from "./baseSprite";



class PrimMapper extends BaseSprite {


	private prim: Prim;
	private target: Glyph;
	private position: number;
	private targetGlyphs: Glyph[] = [];

	constructor( prim: Prim, target: Glyph, position: number = 1 ) {

		super();

		this.prim = prim;
		this.target = target;

		this.position = position;
	}


	public implant(directory: Map<number, MetaGlyph>, dialect: Glyph[]): Prim[] {
	 	
		
		this.targetGlyphs = []

		for ( const [ i, metaGlyph ] of directory ) {

			if ( metaGlyph.glyph.symbol === this.target.symbol  ) {

				this.targetGlyphs.push( metaGlyph.glyph );
			}
		}	

		// this.prim.places = [ this.targetGlyphs[this.position-1].id ];

		// this.prim.places = rule.map((g, i) => {

		// 	if (g.symbol === this.target.symbol) {

		// 		return g.id;
		// 	}

		// }).filter(n => n !== undefined) as number[];

		return [this.prim];
	}

	public sow() {

		// return [ 'We need to covert Glyphs to strings of its symbols here' ];
	}

	public update( params: string ): string {

		// directory.forEach( (glyphData) => {

		// 	const glyph = glyphData.glyph;
			
		// });

		return params;
	}


	protected process(stream: MetaGlyph[]): MetaGlyph[] | null {

		for ( const metaGlyph of stream ) {

		}

		return null;
	}


	public run(stream: MetaGlyph[], context?: any): MetaGlyph[] {
	  	
		this.process(stream)

		return stream;
	}
}

export default PrimMapper;

