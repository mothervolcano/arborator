import Sprite from "../core/sprite";
import { Glyph, Prim } from "../lsys";




class GlyphSwapper extends Sprite {

	private target:Glyph;
	private sub:Glyph;

	constructor( target: Glyph, sub: Glyph ) {

		super();

		this.target = target;
		this.sub = sub;
	}

	public employ(rule: Glyph[], prims: Prim[]): void {
	 	
		rule.forEach((glyph, i)=>{

			if ( glyph.symbol === this.target.symbol ) {

				this.target.id = i;
				this.sub.id = i;
			}
		});
	}

	protected process(sequence: Glyph[]): Glyph[] | null {

		const workingSequence = sequence.map((glyph)=>{

			if ( glyph.id === this.target.id ) {

				return this.sub;

			} else {

				return glyph;
			}
		});

		return workingSequence;
	}

	public run(sequence: Glyph[], context?: any): Glyph[] {
	  	
		const processedSequence = this.process(sequence)

		if ( processedSequence ) {

			return processedSequence;

		} else {

			return sequence;
		}
	}
}

export default GlyphSwapper;