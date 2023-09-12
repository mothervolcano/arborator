import Sprite from "../core/sprite";
import { Accumulator, Glyph, Prim } from "../lsys";
import AccumulatorPrim from "../prims/accumulatorPrim";



class GlyphAccumulator extends Sprite {


	private places: number[] = [];

	private i: number | null;
	private prim: Accumulator;
	private target: Glyph;


	constructor( target: Glyph, i?: number) {

		super();

		this.i = i || null;
		this.target = target;
		this.prim = new AccumulatorPrim(1);

	};


	public implant(rule: Glyph[], prims: Prim[]): void {
	 	
		// if ( this.i && prims[this.i] ) {

		// 	this.prim = prims[this.i];

		// } else {

		// 	this.prim = prims.find((p) => p.prefix === '+')! || null;

		// 	if ( this.prim === null ) {

		// 		throw new Error(`The Accumulator Sprite requires the Production host to receive an Accumulator Prim input`);
		// 	}
		// }

		
		
		this.places = rule.map((g, i) => {

			if (g.symbol === this.target.symbol) {

				return i;
			}

		}).filter(n => n !== undefined) as number[];

		prims.push( this.prim );
	};


	protected process(stream: Glyph[]): Glyph[] | null {

		const glyphs: Glyph[] = [];
		
		const workingSequence = stream.map((glyph)=>{

			// console.log(`ACCUMULATOR: ${this.prim?.getValue()}`)

			
			if ( glyph.symbol === this.target.symbol && this.prim?.getValue() !== null && this.prim?.getValue() !== undefined && this.prim.getValue() > 0 ) {

				// console.log(`ACCUMULATING... ${this.target.symbol}`)

				// return this.target;

				for ( let i=0; i < this.prim.getValue(); i++ ) {

					glyphs.push( this.target );
				}

				return glyphs;
			}


			return glyph;

		})

		return workingSequence.flat();
	};


	public run(stream: Glyph[], params?: any): Glyph[] {

		if ( params ) {

			params.split(',').forEach((p: string) => {

				if (this.prim.prefix === p.charAt(0)) {
					
					this.prim.process();
				}
			})
		}
	  	
		const processedSequence = this.process(stream)

		if ( processedSequence ) {

			return processedSequence;

		} else {

			return stream;
		} 
	}
}

export default GlyphAccumulator;