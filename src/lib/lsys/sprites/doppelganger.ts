import Sprite from "../core/sprite";
import { Glyph, Rule, Id, Counter, Prim, MetaGlyph } from "../lsys";




class Doppelganger extends Sprite {

	private sourcePrims: Prim[] = [];
	private workingPrims: Prim[] = [];
	private imagePrims: Map<number, Prim[]> = new Map();

	private head: Rule | null;

	constructor() {

		super();

		this.head = null;
	}

	public implant(directory: Map<number, MetaGlyph>, head: Rule): void {

		this.sourcePrims = head.prims;
		this.workingPrims = head.prims.slice();

		this.head = head;
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
	   
		console.log('')
		console.log(`............................................`)
		console.log(`!!! DOPPELGANGER DETECTED! ${idString}`);
		

		const id = Number.parseInt(idString.substring(1));

		const idPrim = this.sourcePrims.find( (p) => p.prefix === '#' ) as Id;
		idPrim?.cast(id);


		if ( this.imagePrims.has(id) ) {

			this.workingPrims = this.imagePrims.get(id)!;

		} else {

			console.log(`new prims image: ${ this.sourcePrims.map((p)=>p.prefix).join(' / ') }`)
			
			const image = this.sourcePrims.map( p => p.clone() );
			
			this.imagePrims.set( id, image );
		}


		stream.forEach((metaGlyph) => {

			if ( metaGlyph.glyph.symbol === this.head!.symbol && metaGlyph.glyph.type==='Rule' ) {

				metaGlyph.glyph.prims = this.imagePrims.get(id)!.map( p => p.clone() );

		// const counterPrim = metaGlyph.glyph.prims.find( (p) => p.prefix === '+' ) as Counter;

		// if( id === 4) {

		// 	counterPrim.process()
		// 	counterPrim.process()
		// 	counterPrim.process()
		// }

				console.log(`${metaGlyph.glyph.symbol} prims: ${metaGlyph.glyph.prims.map( p => `${p.prefix}${p.getValue()}` ).join(' ') }`)
			}
		})


	   return null; 
	}


	run(stream: MetaGlyph[], params?: any): MetaGlyph[] {


		if ( params ) {

			params.split(',').forEach((p: string) => {

				if ( p.charAt(0) === '#' ) {
					
					this.process(stream, p);
				}

			})
		}

		return stream;
	}
}

export default Doppelganger;

