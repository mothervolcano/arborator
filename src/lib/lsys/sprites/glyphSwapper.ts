import Sprite from "../core/sprite";
import { Glyph, MetaGlyph, Prim, Rule } from "../lsys";
import ImperativePrim from "../prims/imperativePrim";




class GlyphSwapper extends Sprite {

	private stubs:Glyph[] = [];

	private targetGlyph:Glyph;
	private targetGlyphIDs: number[] = [];
	private subs:Glyph[];


	constructor( target: Glyph, subs: Glyph | Glyph[] ) {

		super();

		this.targetGlyph = target;
		this.subs = Array.isArray(subs) ? subs : [ subs ];
	};


	public implant(directory: Map<number, MetaGlyph>, head: Rule): void {
	 			

		directory.forEach( (metaGlyph) => {

			if ( metaGlyph.glyph.symbol === this.targetGlyph.symbol ) {

				console.log(`-----------------------------------------`)
				console.log(`IMPLANTING GLYPH SWAPPER IN: ${head.symbol}`)
				// console.log(`--> ${directory.map((g)=>g.symbol).join('')}`)
				console.log(``)
				console.log(`TARGET: ${metaGlyph.glyph.symbol}`)
				// console.log(`ID: ${glyph.id}`)
				console.log(``)

				this.targetGlyphIDs.push(metaGlyph.id);

			}
		});
	};


	public sow(): void {

		// nothing to sow here
	};


	public update( directory: Map<number, MetaGlyph> ): number[] {

		// console.log(`UPDATING GLYPH SWAPPER: ${directory.size}`)

		// let subIndex: number = 0;

		// for ( const i of this.targetGlyphIDs ) {

		// 	const glyphMirror = directory.get(i);

		// 	if ( glyphMirror ) {
				
		// 		console.log(`Replacing Glyph in directory with: ${this.subs[subIndex]}`)

		// 		glyphMirror.glyph = this.subs[subIndex];

		// 		subIndex = (subIndex + 1 >= this.subs.length) ? 0 : subIndex + 1;

		// 	} else {

		// 		throw new Error(`ERROR @ GlyphSwapper: ${this.targetGlyph.symbol} could not be found in the Production Rule library`);
		// 	}
		// }

		return [];
	};


	protected process(stream: MetaGlyph[]): MetaGlyph[] | null {

		let subIndex: number = 0;

		const workingSequence = stream.map((metaGlyph)=>{

			if ( metaGlyph.glyph.symbol === this.targetGlyph.symbol ) {

				const sub = this.subs[subIndex];

				metaGlyph.glyph = sub;

				subIndex = (subIndex + 1 >= this.subs.length) ? 0 : subIndex + 1;
			}

			return metaGlyph;

		});

		console.log(`!!!! FINISHED SWAPPING`);
		console.log('');

		return workingSequence;
	};



	public run(stream: MetaGlyph[], params?: any ): MetaGlyph[] {
	  	
		const sequence = this.process(stream)

		if ( sequence ) {

			return sequence;

		} else {

			return stream;
		}
	}
}

export default GlyphSwapper;

