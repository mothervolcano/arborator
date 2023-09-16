import Sprite from "../core/sprite";
import { Glyph, MetaGlyph, Prim, Rule } from "../lsys";
import ParameterPrim from "../prims/parameterPrim";






class Perpetuator extends Sprite {

	private prefix: string = '#';

	private targetGlyph: Glyph;
	private targetGlyphIDs: number[] = [];

	constructor( targetGlyph: Glyph ) {

		super();

		this.targetGlyph = targetGlyph;

	};


	public implant(directory: Map<number, any>, head: Rule): void {


		directory.forEach((metaGlyph)=> {

			// Find the ids of each incognito in the directory so we can track them if the sequence changes or mutates

			if (metaGlyph.glyph.symbol === this.targetGlyph.symbol ) {

				console.log(`-----------------------------------------`)
				console.log(`IMPLANTING INCOGNITO PERPETUATOR IN: ${head.symbol}`)
				// console.log(`--> ${directory.map((g)=>g.symbol).join('')}`)
				console.log(``)
				console.log(`TARGET: ${metaGlyph.glyph.symbol}`)
				// console.log(`ID: ${glyph.id}`)
				console.log(``)


				this.targetGlyphIDs.push(metaGlyph.id);
			}

		});
	    
	};


	public sow(targets?: string[] | undefined): void | { targets: Glyph[]; prim: Prim; }[] {

		return [{ targets: [ this.targetGlyph ], prim: new ParameterPrim() }] ;  
	};


	update( params: string ): string {
	    
	    return params;
	};


	protected process(stream: MetaGlyph[], countString: string): MetaGlyph[] | null {

		const count = Number.parseInt(countString.substring(1));

		const workingSequence = stream.map((metaGlyph) => {

			if ( this.targetGlyphIDs.includes( metaGlyph.id) ) {

				const prim = count ? new ParameterPrim( count ) : new ParameterPrim();

				if ( metaGlyph.data.prims ) {

					metaGlyph.data.prims.push(prim);

				} else { 

					metaGlyph.data.prims = [prim];
				}
		
			}	

			return metaGlyph;

		});	
		
		return workingSequence;
	    
	};


	public run(stream: MetaGlyph[], params?: any): MetaGlyph[] {

		let sequence: MetaGlyph[] | null = [];

		if ( params ) {

			params.split(',').forEach( (p: string) => {

				if ( this.prefix === p.charAt(0) ) {
					
					sequence = this.process(stream, p );
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


export default Perpetuator;