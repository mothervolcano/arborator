import Sprite from "../core/sprite";
import { Counter, Glyph, Id, MetaGlyph, Parameter, Prim, Rule } from "../lsys";
import BaseSprite from "./baseSprite";

class Generator extends BaseSprite {
	private count: number = 0;

	private sourceGlyph: Rule;
	private seedPrim: Parameter | Counter | Id;

	private headGlyph: Glyph | undefined;

	constructor(sourceGlyph: Rule, seedPrim: Parameter | Counter | Id) {
		super();

		this.sourceGlyph = sourceGlyph;
		this.seedPrim = seedPrim;
		this.count = seedPrim.getValue();
	}

	implant(directory: Map<number, any>, dialect: Glyph[]): void {
		const validatedGlyph = dialect.find(
			(glyph) => glyph.symbol === this.sourceGlyph.symbol,
		);

		if (validatedGlyph) {
			if (validatedGlyph.type === "Rule") {
				this.sourceGlyph = validatedGlyph;
			} else {
				throw new Error(
					`ERROR @ Bootstrapper: Input Glyph must be of type Rule. Instead got ${this.sourceGlyph.symbol}`,
				);
			}
		} else {
			throw new Error(
				`ERROR @ Generator: ${this.sourceGlyph.symbol} is not part of this Production Rule dialect`,
			);
		}

		this.headGlyph = directory.get(0).glyph;
	}

	sow(
		targets?: string[] | undefined,
	): void | { targets: Glyph[]; prim: Prim }[] {
		return [
			{
				targets: [this.sourceGlyph, this.headGlyph!],
				prim: this.seedPrim,
			},
		];
	}

	update(params: string): string {
		super.update(params);

		const prim = this.workingPrims.find(
			(prim) => prim?.prefix === this.seedPrim.prefix,
		) as Parameter | Counter | Id;

		this.count = prim ? prim.getValue() - 1 : 0;

		return params;
	}

	protected process(stream: MetaGlyph[]): MetaGlyph[] | null {
		const sequence: MetaGlyph[] = [];

		// ------------------------------------------------

		const prim = this.seedPrim.clone();
		prim.cast(this.count);

		const newMetaGlyph = {
			glyph: this.sourceGlyph,
			id: 900,
			data: { prims: [prim] },
		};

		sequence.push(newMetaGlyph);

		// ------------------------------------------------

		if (sequence.length) {
			stream.unshift(...sequence);
		}

		return stream;
	}

	run(stream: MetaGlyph[]): MetaGlyph[] {
		let sequence: MetaGlyph[] | null = [];

		sequence = this.process(stream);

		if (sequence && sequence.length) {
			return sequence;
		} else {
			return stream;
		}
	}
}

export default Generator;
