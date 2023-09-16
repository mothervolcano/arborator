import Sprite from "../core/sprite";
import { Counter, Glyph, MetaGlyph, Prim, Rule } from "../lsys";
import CounterPrim from "../prims/counterPrim";



class Accumulator extends Sprite {

	private start: number;
	private step: number;
	private prim: Counter;

	constructor( start: number = 0, step: number = 1 ) {

		super();

		this.start = start;
		this.step = step;
		this.prim = new CounterPrim(this.start, this.step);

	};


	public implant(directory: Map<number, MetaGlyph>, head: Rule): Prim[] {
	 
		return [ this.prim ];
	};


	public sow(): void {

		// nothing to sow here
	}


	public update( directory: Map<number, MetaGlyph>): number[] {

		// directory.forEach( (glyphData, i) => {

		// 	const glyph = glyphData.glyph;
			
		// });

		return [];
	};


	protected process(stream: MetaGlyph[]): MetaGlyph[] | null {

		
		return stream;
	};


	public run(stream: MetaGlyph[], params?: any): MetaGlyph[] {

		if ( params ) {

			params.split(',').forEach((p: string) => {

				if (this.prim.prefix === p.charAt(0)) {
					
					this.prim.process();
				}
			})
		}
	  	
		const sequence = this.process(stream)

		if ( sequence ) {

			return sequence;

		} else {

			return stream;
		} 
	}
}

export default Accumulator;


