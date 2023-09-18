import Sprite from "../core/sprite";
import { Counter, Glyph, MetaGlyph, Prim, Rule } from "../lsys";
import CounterPrim from "../prims/counterPrim";



class Escalator extends Sprite {

	private start: number;
	private step: number;
	private prim: Counter;

	constructor( start: number = 0, step: number = 1 ) {

		super();

		this.start = start;
		this.step = step;
		this.prim = new CounterPrim(this.start, this.step);

	};


	public implant(directory: Map<number, MetaGlyph>, dialect: Glyph[]): Prim[] {
	 
		return [ this.prim ];
	};


	public sow(): void {

		// nothing to sow here
	}


	public update( params: string ): string {

		params.split(',').forEach((p: string) => {

			if (this.prim.prefix === p.charAt(0)) {
				
				this.prim.process();
			}
		})

		return params;
	};


	protected process(stream: MetaGlyph[]): MetaGlyph[] | null {

		
		return stream;
	};


	public run(stream: MetaGlyph[], params?: any): MetaGlyph[] {
	  	
		const sequence = this.process(stream)

		if ( sequence ) {

			return sequence;

		} else {

			return stream;
		} 
	}
}

export default Escalator;


