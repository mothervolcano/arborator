import Sprite from "../core/sprite";
import { Glyph, Imperative, MetaGlyph, Prim, Rule } from "../lsys";
import ImperativePrim from "../prims/imperativePrim";
import BaseSprite from "./baseSprite";

class IncognitoPerpetuator extends BaseSprite {
	// private primIndex: number = 0;

	// private prims: Imperative[] = [];
	private incognito: Glyph;
	private incognitoIDs: number[] = [];
	// private targetSymbol: string;
	private targetGlyph: Glyph;
	private targetGlyphIDs: number[] = [];

	private place: number | undefined;

	/**
	 *
	 * Locates each Incognito Glyph in the Production Rule directory and saves its index key
	 * to be used later once, and if, the Incognito is replaced by a designated Glyph.
	 *
	 * This Sprite is often used together with GlyphSwapper.
	 *
	 *
	 */

	constructor(incognito: Glyph, targetGlyph: Glyph, place?: number) {
		super();

		this.incognito = incognito;
		this.targetGlyph = targetGlyph;

		this.place = place;
	}

	public implant(directory: Map<number, MetaGlyph>, dialect: Glyph[]): void {
		directory.forEach((metaGlyph) => {
			// Find the ids of each incognito in the directory so we can track them if the sequence changes or mutates

			if (metaGlyph.glyph.symbol === this.incognito.symbol) {
				this.incognitoIDs.push(metaGlyph.id);
			}

			// Find the ids of each incognito in the directory so we can track them if the sequence changes or mutates

			if (metaGlyph.glyph.symbol === this.targetGlyph.symbol) {
				console.log(`-----------------------------------------`);
				console.log(`IMPLANTING INCOGNITO PERPETUATOR IN: ${dialect}`);
				// console.log(`--> ${directory.map((g)=>g.symbol).join('')}`)
				console.log(``);
				console.log(`TARGET: ${metaGlyph.glyph.symbol}`);
				// console.log(`ID: ${glyph.id}`)
				console.log(``);

				this.targetGlyphIDs.push(metaGlyph.id);
			}
		});
	}

	/**
	 *
	 * The sow method is being used here to add an ImperativePrim to the Production Rule we want to
	 * perpetuate the Glyph through. Then it's up to the recipient Production Rule to determine
	 * how the ImperativeRule will be interpreted.
	 *
	 *
	 */

	public sow() {
		return [{ targets: [this.targetGlyph], prim: new ImperativePrim() }];
	}

	public update(params: string): string {
		// console.log(`UPDATING INCOGNITO PERPETUATOR: ${directory.size}`)

		/**
		 *
		 * Use the stored IDs to locate the target Glyphs in case their position in the sequence has changed.
		 * Now that the incognitos have been revealed we are able to use the disclosed Glyph to updated the target's ImperativePrims
		 *
		 * We do that by retrieving the disclosed Glyph and storing it as data of each target's MetaGlyph.
		 * Later, during encoding, that data is read and used to encode each target with the right Glyph Value.
		 *
		 * But now we're working with MetaGlyphs. We can achieve all this in the implant stage. Regardless if the incognito has
		 * been disclosed or not by that time we can already save their references in each target's data object.
		 *
		 * Then when this Sprite is processed it will be able to handle it all internally.
		 * So the Production will only need to iterate the sequence once at the end. All the updated data it requires to sucessfully encode
		 * each glpyph should be available in each MetaGlyph.
		 *
		 *
		 */

		// let incognitoIndex: number = 0;

		// for ( const i of this.targetGlyphIDs ) {

		// 	const metaGlyph = directory.get(i);

		// 	if ( metaGlyph ) {

		// 		const glyph = directory.get( this.incognitoIDs[incognitoIndex] )?.glyph

		// 		console.log(`Glyph in directory @ Sprite: ${glyph?.symbol}`)

		// 		metaGlyph.data.prims.push( glyph ? new ImperativePrim( glyph ) : new ImperativePrim() );

		// 		console.log(`#Prims: ${metaGlyph.data.prims.length}`)

		// 		incognitoIndex = (incognitoIndex + 1 >= this.incognitoIDs.length) ? 0 : incognitoIndex + 1;

		// 	} else {

		// 		throw new Error(`ERROR @ IncognitoPerpetuator: ${this.targetGlyph.symbol} could not be found in the Production Rule library`);
		// 	}
		// }

		// return this.targetGlyphIDs;

		return params;
	}

	protected process(stream: MetaGlyph[]): MetaGlyph[] | null {
		console.log(
			`. stream: ${stream.map((mg) => mg.glyph.symbol).join("")}`,
		);

		const glyphs = stream
			.filter((mg) => this.incognitoIDs.includes(mg.id))
			.map((mg) => mg.glyph);

		console.log(`.. glyphs: ${glyphs.map((g) => g.symbol).join("")}`);

		let incognitoIndex: number = this.place ? this.place - 1 : 0;

		const workingSequence = stream.map((metaGlyph) => {
			if (this.targetGlyphIDs.includes(metaGlyph.id)) {
				const glyph = glyphs[incognitoIndex];
				const prim = glyph
					? new ImperativePrim(glyph)
					: new ImperativePrim();

				if (metaGlyph.data.prims) {
					metaGlyph.data.prims.push(prim);
				} else {
					metaGlyph.data.prims = [prim];
				}

				if (!this.place) {
					incognitoIndex =
						incognitoIndex + 1 >= glyphs.length
							? 0
							: incognitoIndex + 1;
				}
			}

			return metaGlyph;
		});

		return workingSequence;
	}

	public run(stream: MetaGlyph[], params?: any, context?: any): MetaGlyph[] {
		console.log(``);
		console.log(`RUNNING INCOGNITO PERPETUATOR FOR: ${context}`);

		const sequence = this.process(stream);

		if (sequence) {
			return sequence;
		} else {
			return stream;
		}
	}
}

export default IncognitoPerpetuator;
