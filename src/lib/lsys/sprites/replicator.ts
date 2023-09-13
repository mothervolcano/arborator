import Sprite from "../core/sprite";
import { Glyph, Rule } from "../lsys";




class Replicator extends Sprite {


	private prefix: string = '+';

	private i: number | null;
	private targetSymbol: string;
	private targetIds: number[] = [];


	constructor( targetSymbol: string, i?: number ) {

		super();

		this.i = i || null;
		this.targetSymbol = targetSymbol;

	};


	public implant(rule: Glyph[], head: Rule): void {
	    
		
		this.targetIds = rule.map((glyph) => {

			if ( glyph.symbol === this.targetSymbol ) {

				return glyph.id;
			}

		}).filter(n => n !== undefined ) as number[];

	};


	protected process(stream: Glyph[], countString: string): Glyph[] | null {

		const count = Number.parseInt(countString);

		const workingSequence = stream.map((glyph) => {

			if ( this.targetIds.includes(glyph.id) ) {

				const sequence: Glyph[] = [];
				
				for ( let i=0; i<count; i++ ) {

					sequence.push( glyph );
				}

				if ( sequence.length ) { return sequence }
		
			}

			return glyph;

		});	
		
		return workingSequence.flat();	    
	};


	public run(stream: Glyph[], params?: any): Glyph[] {

		let sequence: Glyph[] | null = [];

		if ( params ) {

			params.split(',').forEach((p: string) => {

				if (this.prefix === p.charAt(0)) {
					
					sequence = this.process(stream, p.substring(1));
				}
			})
		}

		if ( sequence && sequence.length ) {

			return sequence;

		} else {

			return stream;
		} 
	    
	};


}

export default Replicator