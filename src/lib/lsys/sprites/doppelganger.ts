import Sprite from "../core/sprite";
import { Glyph, Rule, Prim } from "../lsys";




class Doppelganger extends Sprite {

	private sourcePrims: Prim[] = [];
	private workingPrims: Prim[] = [];
	private imagePrims: Map<number, Prim[]> = new Map();

	constructor() {

		super();
	}

	implant(rule: Glyph[], head: Rule): void {

		this.sourcePrims = head.prims;
		this.workingPrims = head.prims.slice();
	}


	protected process(stream: Glyph[], idString: string): Glyph[] | null {
	   
		
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

	public sow(): void {

		// nothing to sow here
	}


	run(stream: Glyph[], params?: any): Glyph[] {


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