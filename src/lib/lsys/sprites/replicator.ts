import Sprite from "../core/sprite";
import { Glyph, MetaGlyph, Rule } from "../lsys";




class Replicator extends Sprite {


	private prefix: string = '+';

	private i: number | null;
	private targetGlyph: Glyph;
	private targetGlyphIDs: number[] = [];


	constructor( targetSymbol: Glyph, i?: number ) {

		super();

		this.i = i || null;
		this.targetGlyph = targetSymbol;

	};


	public implant(directory: Map<number, MetaGlyph>, head: Rule): void {
	    	
		for ( const [ i, metaGlyph ] of directory ) {
			
			if ( metaGlyph.glyph.symbol === this.targetGlyph.symbol ) {

				this.targetGlyphIDs.push(metaGlyph.id);
			}
		}

	};


	public sow(): void {

		// no Prims to sow here
	};


	public update( directory: Map<number, MetaGlyph> ): number[] {


		return [];
	}


	protected process(stream: MetaGlyph[], countString: string): MetaGlyph[] | null {

		const count = Number.parseInt(countString);

		const workingSequence = stream.map((metaGlyph) => {

			if ( this.targetGlyphIDs.includes( metaGlyph.id) ) {

				const sequence: MetaGlyph[] = [];

				// ---------------------------------------
				
				for ( let i=0; i<count; i++ ) {

					sequence.push( metaGlyph );
				}

				// ---------------------------------------

				if ( sequence.length ) { return sequence }
		
			}

			return metaGlyph;

		});	
		
		return workingSequence.flat();
	};


	public run(stream: MetaGlyph[], params?: any): MetaGlyph[] {

		let sequence: MetaGlyph[] | null = [];

		if ( params ) {

			params.split(',').forEach( (p: string) => {

				if ( this.prefix === p.charAt(0) ) {
					
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

