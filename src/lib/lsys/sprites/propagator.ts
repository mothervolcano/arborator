import Sprite from "../core/sprite";
import { Glyph, MetaGlyph, Prim, Rule } from "../lsys";
import ParameterPrim from "../prims/parameterPrim";



class Propagator extends Sprite {

	private count: number = 0;

	private prefix: string = '+';

	private targetGlyph: Glyph;
	private targetGlyphIDs: number[] = [];

	constructor( targetGlyph: Glyph, prefix: string ) {

		super();

		this.targetGlyph = targetGlyph;
		this.prefix = prefix;
	};


	public implant(directory: Map<number, any>, dialect: Glyph[]): void {

		directory.forEach((metaGlyph)=> {

			// Find the ids of each incognito in the directory so we can track them if the sequence changes or mutates

			if (metaGlyph.glyph.symbol === this.targetGlyph.symbol ) {

				console.log(`-----------------------------------------`)
				console.log(`IMPLANTING PROPAGATOR IN: ${dialect}`)
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

		return [{ targets: [ this.targetGlyph ], prim: new ParameterPrim() }];  
	};


	update( params: string ): string {

		params.split(',').forEach( (p: string) => {

			if ( this.prefix === p.charAt(0) ) {
				
				this.count = Number.parseInt(p.substring(1));
			}
		})
   
	    return params;
	};


	protected process(stream: MetaGlyph[]): MetaGlyph[] | null {

		const workingSequence = stream.map((metaGlyph) => {

			if ( this.targetGlyphIDs.includes( metaGlyph.id) ) {

				const prim = this.count ? new ParameterPrim( this.count ) : new ParameterPrim();

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
			
		sequence = this.process(stream);

		if ( sequence && sequence.length ) {

			return sequence;

		} else {

			return stream;
		}
	    
	};
}


export default Propagator;

