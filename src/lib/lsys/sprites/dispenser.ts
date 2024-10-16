import Sprite from "../core/sprite";
import { Counter, Glyph, Id, MetaGlyph, Parameter, Prim, Rule } from "../lsys";
import BaseSprite from "./baseSprite";

class Dispenser extends BaseSprite {
	private count: number = 0;

	private sourceGlyph: Glyph;

	private readerPrim: Counter | Parameter | Id;
	private writerPrim: Counter | Parameter | Id | null;

	constructor(
		sourceGlyph: Glyph,
		readerPrim: Counter | Parameter | Id,
		writerPrim: Counter | Parameter | Id | null = null,
	) {
		super();

		this.sourceGlyph = sourceGlyph;

		this.readerPrim = readerPrim;
		this.writerPrim = writerPrim || readerPrim;
	}

	public implant(directory: Map<number, any>, dialect: Glyph[]): void {
		const validatedGlyph = dialect.find(
			(glyph) => glyph.symbol === this.sourceGlyph.symbol,
		);

		if (validatedGlyph) {
			this.sourceGlyph = validatedGlyph;
		} else {
			throw new Error(
				`ERROR @ Generator: ${this.sourceGlyph.symbol} is not part of this Production Rule dialect`,
			);
		}
	}

	public sow(
		targets?: string[] | undefined,
	): void | { targets: Glyph[]; prim: Prim }[] {}

	public update(params: string): string {
		params.split(",").forEach((p: string) => {
			if (p.charAt(0) === this.readerPrim.prefix) {
				this.count = Number.parseInt(p.substring(1));
			}
		});

		return params;
	}

	protected process(stream: MetaGlyph[]): MetaGlyph[] | null {
		const sequence: MetaGlyph[] = [];

		// ---------------------------------------

		for (let i = this.count; i >= 0; i--) {
			// for ( let i=0; i<=count; i++ ) {

			const newMetaGlyph = {
				glyph: this.sourceGlyph,
				id: 900,
				data: {},
			};

			if (this.sourceGlyph.type === "Rule") {
				const prim = this.writerPrim!.clone();
				prim.cast(i + 1);

				newMetaGlyph.data = { prims: [prim] };
			}

			sequence.push(newMetaGlyph);
		}

		// ---------------------------------------

		if (sequence.length) {
			// sequence.reverse()

			stream.push(...sequence);
		}

		return stream;
	}

	public run(stream: MetaGlyph[]): MetaGlyph[] {
		let sequence: MetaGlyph[] | null = [];

		sequence = this.process(stream);

		if (sequence && sequence.length) {
			return sequence;
		} else {
			return stream;
		}
	}
}

export default Dispenser;
