import Sprite from "../core/sprite";
import { Glyph, Rule, Prim, MetaGlyph } from "../lsys";




class Doppelganger extends Sprite {

	private sourcePrims: Prim[] = [];
	private workingPrims: Prim[] = [];
	private imagePrims: Map<number, Prim[]> = new Map();

	constructor() {

		super();
	}

	public implant(directory: Map<number, MetaGlyph>, head: Rule): void {

		this.sourcePrims = head.prims;
		this.workingPrims = head.prims.slice();
	}


	public sow(): void {

		// nothing to sow here
	}


	public update( directory: Map<number, MetaGlyph> ): number[] {

		// directory.forEach( (glyphData, i) => {

		// 	const glyph = glyphData.glyph;
			
		// });

		return [];
	}


	protected process(stream: MetaGlyph[], idString: string): MetaGlyph[] | null {
	   
		
		console.log(`............................................`)
		console.log(`!!! DOPPELGANGER DETECTED! #${idString}`);
		

		const id = Number.parseInt(idString);

		if ( this.imagePrims.has(id) ) {

			this.workingPrims = this.imagePrims.get(id)!;

		} else {

			const image = this.sourcePrims.slice();

			console.log(`new prims image: ${ this.sourcePrims.map((p)=>p.prefix).join(' / ') }`)
			
			this.imagePrims.set( id, image );
		}


	   return null; 
	}




	run(stream: MetaGlyph[], params?: any): MetaGlyph[] {


		if ( params ) {

			params.split(',').forEach((p: string) => {

				if ( p.charAt(0) === '#' ) {
					
					this.process(stream, p.substring(1));
				}

			})
		}

		return stream;
	}
}

export default Doppelganger;

