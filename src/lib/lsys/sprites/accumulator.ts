import Sprite from "../core/sprite";
import { Counter, Glyph, Prim, Rule } from "../lsys";
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


	public implant(rule: Glyph[], head: Rule): Prim[] {
	 
		return [ this.prim ];
	};


	protected process(stream: Glyph[]): Glyph[] | null {

		
		const workingSequence = stream.map((glyph)=>{


			return glyph;

		});

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
	  	
		const sequence = this.process(stream)

		if ( sequence ) {

			return sequence;

		} else {

			return stream;
		} 
	}
}

export default Accumulator;


