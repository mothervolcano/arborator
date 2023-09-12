import Sprite from "../core/sprite";
import { Glyph, Prim } from "../lsys";



class PrimMapper extends Sprite {


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


	public implant(rule: Glyph[], prims: Prim[]): void {
	 	
		
		this.targetGlyphs = rule.filter((g) => g.symbol === this.target.symbol );	

		this.prim.places = [ this.targetGlyphs[this.position-1].id ];

		// this.prim.places = rule.map((g, i) => {

		// 	if (g.symbol === this.target.symbol) {

		// 		return g.id;
		// 	}

		// }).filter(n => n !== undefined) as number[];

		prims.push(this.prim);
	}


	protected process(stream: Glyph[]): Glyph[] | null {

		for ( const glyph of stream ) {

		}

		return null;
	}


	public run(stream: Glyph[], context?: any): Glyph[] {
	  	
		this.process(stream)

		return stream;
	}
}

export default PrimMapper;