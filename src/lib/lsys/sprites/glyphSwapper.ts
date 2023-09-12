import Sprite from "../core/sprite";
import { Glyph, Prim } from "../lsys";




class GlyphSwapper extends Sprite {

	private spots: number[] = [];
	private subIndex: number = 0;

	private target:Glyph;
	private sub:Glyph | Glyph[];

	constructor( target: Glyph, sub: Glyph | Glyph[] ) {

		super();

		this.target = target;
		this.sub = sub;
	}

	public implant(rule: Glyph[], prims: Prim[]): void {
	 			
		rule.forEach((glyph, i)=>{

			if ( glyph.symbol === this.target.symbol ) {

				this.spots.push(i);
				// this.target.id = i;

				if ( Array.isArray(this.sub) ) {

					this.sub[this.subIndex].id = i;
					
					if ( this.subIndex + 1 >= this.sub.length ) {

						this.subIndex = 0;

					} else {

						this.subIndex++;
					}

				} else {

					this.sub.id = i;
				}
			}
		});
	}

	protected process(stream: Glyph[]): Glyph[] | null {


		const workingSequence = stream.map((glyph)=>{

			if ( this.spots.includes(glyph.id) ) {

				if ( Array.isArray(this.sub) ) {

					// console.log(`!!!! SWAP: ${this.sub[this.subIndex].symbol}`)

					const sub = this.sub[this.subIndex];

					if ( this.subIndex + 1 >= this.sub.length ) {

						this.subIndex = 0;
						
					} else {

						this.subIndex++;
					}

					return sub;

				} else {

					return this.sub;
				}

			} else {

				return glyph;
			}
		});

		// console.log(`!!!! FINISHED SWAPPING`)

		return workingSequence;
	}

	public run(stream: Glyph[], context?: any): Glyph[] {
	  	
		const processedSequence = this.process(stream)

		if ( processedSequence ) {

			return processedSequence;

		} else {

			return stream;
		}
	}
}

export default GlyphSwapper;