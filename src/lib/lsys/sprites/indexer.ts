import Sprite from "../core/sprite";
import { Glyph, Id, MetaGlyph, Prim, Rule } from "../lsys";
import IdPrim from "../prims/idPrim";
import BaseSprite from "./baseSprite";

class Indexer extends BaseSprite {
	private targetGlyph: Glyph;
	private targetGlyphIDs: number[] = [];
	private id: number;
	private prims: Id[];
	// private spots: number[] = [];

	constructor(targetGlyph: Glyph, id: number) {
		super();

		this.targetGlyph = targetGlyph;
		this.id = id;

		this.prims = [];
	}

	public implant(directory: Map<number, MetaGlyph>, dialect: Glyph[]): void {
		directory.forEach((metaGlyph) => {
			if (metaGlyph.glyph.symbol === this.targetGlyph.symbol) {
				if (metaGlyph.glyph.type === "Rule") {
					this.targetGlyphIDs.push(metaGlyph.id);
				}
			}
		});
	}

	public update(params: string): string {
		// directory.forEach( (glyphData, i) => {

		// 	const glyph = glyphData.glyph;

		// });

		return params;
	}

	public sow() {
		return [{ targets: [this.targetGlyph], prim: new IdPrim(this.id) }];
	}

	protected process(stream: MetaGlyph[]): MetaGlyph[] | null {
		let id = this.id;

		stream.map((metaGlyph) => {
			if (this.targetGlyphIDs.includes(metaGlyph.id)) {
				const prim = new IdPrim(id);

				if (metaGlyph.data.prims) {
					metaGlyph.data.prims.push(prim);
				} else {
					metaGlyph.data.prims = [prim];
				}

				id++;
			}
		});

		this.id = id;

		return null;
	}

	run(stream: MetaGlyph[], params?: any): MetaGlyph[] {
		this.process(stream);

		return stream;

		// if ( sequence ) {

		// 	return sequence;

		// } else {

		// 	return stream;
		// }
	}
}

export default Indexer;
