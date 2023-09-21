import Sprite from "../core/sprite";
import { Glyph, Rule, Id, Counter, Prim, MetaGlyph } from "../lsys";
import BaseSprite from "./baseSprite";




class Doppelganger extends BaseSprite {

	private sourcePrims: Prim[] = [];
	// private workingPrims: Prim[] = [];
	private imagePrims: Map<number, Prim[]> = new Map();

	private head: Rule | undefined;
	private directory: Map<number, MetaGlyph> | undefined;

	constructor() {

		super();

	}

	public implant(directory: Map<number, MetaGlyph>, dialect: Glyph[]): void {


		this.directory = directory;
	}


	public sow(): void {

		// nothing to sow here
	}


	public update( params: string ): string {

		let id: number | undefined;
		let updatedParams: string | undefined;

		params.split(',').forEach((p: string) => {

			if ( p.charAt(0) === '#' ) {
				
				id = Number.parseInt(p.substring(1));
			}
		});
	
		if ( id ) {

			console.log('')
			console.log(`............................................`)
			console.log(`!!! DOPPELGANGER DETECTED! ${id}`);


			if ( this.imagePrims.has(id) ) {


			} else {

				const prims: Prim[] = [];

				// params.split(',').forEach((p: string) => {

				// 	let prim: Prim;

				// 	switch (p.charAt(0)) {

				// 		case '#':

				// 			break;

				// 		case '!':

				// 			prim = new ImperativePrim() as Imperative;
				// 			break;

				// 		case '=':

				// 			prim = new ParameterPrim() as Parameter;
				// 			break;

				// 		case '+':
							
				// 			break

				// 		default: throw new Error(`ERROR @ Doppelganger: Failed to recreate Prims from input. ${p.charAt(0)} doesn't match the prefix of any valid Prim`);
				// 	}

				// });

				const image = prims;
				
				this.imagePrims.set( id, image );
			}


			this.workingPrims = this.imagePrims.get(id)!;
	

		} else {

			throw new Error(`ERROR! Doppelganger Sprite requires an IdPrim`);
		}


		return updatedParams ? updatedParams : params;
	}


	protected process(stream: MetaGlyph[], idString: string): MetaGlyph[] | null {


	   return null; 
	}


	run(stream: MetaGlyph[], params?: any): MetaGlyph[] {


		return stream;
	}
}

export default Doppelganger;

