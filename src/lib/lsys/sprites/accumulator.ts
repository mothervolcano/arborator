import { countReset } from "console";
import Sprite from "../core/sprite";
import { Counter, Glyph, MetaGlyph, Parameter, Prim, Rule } from "../lsys";
import CounterPrim from "../prims/counterPrim";
import ParameterPrim from "../prims/parameterPrim";
import BaseSprite from "./baseSprite";

class Accumulator extends BaseSprite {
	private count: number;

	private targetGlyph: Glyph | undefined;
	private inputPrim: Parameter | Counter;
	private prim: Counter;

	constructor(prim?: Parameter | Counter) {
		super();

		this.count = prim?.getValue() || 1;
		this.prim = new CounterPrim(this.count, 1);

		this.inputPrim = prim ? prim : this.prim;
	}

	implant(directory: Map<number, any>, dialect: Glyph[]): void {
		this.targetGlyph = directory.get(0).glyph as Rule;

		if (this.targetGlyph) {
			// Check to see if the host Production has a compatible prim already in use

			const presentInputPrim = this.targetGlyph.prims.find(
				(p) => p.prefix === this.inputPrim.prefix,
			);

			if (
				presentInputPrim &&
				(presentInputPrim.type === "Counter" ||
					presentInputPrim.type === "Parameter")
			) {
				this.inputPrim = presentInputPrim;
			}

			// Check to see if the host Production has a compatible prim already in use

			const presentPrim = this.targetGlyph.prims.find(
				(p) => p.prefix === this.prim.prefix,
			);

			if (presentPrim && presentPrim.type === "Counter") {
				this.prim = presentPrim;
				// this.prim.cast( this.inputPrim.getValue() );
			}

			// If no compatible Prim is found then sow the one that is provided as master.
		} else {
			throw new Error(`ERROR @ Accumulator: head glyph not found`);
		}

		// directory.forEach((metaGlyph)=> {

		// 	// Find the ids of each incognito in the directory so we can track them if the sequence changes or mutates

		// 	if (metaGlyph.glyph.symbol === this.targetGlyph.symbol ) {

		// 		this.targetGlyphIDs.push(metaGlyph.id);
		// 	}

		// });
	}

	sow(
		targets?: string[] | undefined,
	): void | { targets: Glyph[]; prim: Prim }[] {
		return [{ targets: [this.targetGlyph!], prim: this.prim }];
	}

	update(params: string): string {
		params.split(",").forEach((p: string) => {
			if (this.inputPrim.prefix === p.charAt(0)) {
				this.count = Number.parseInt(p.substring(1));
			}
		});

		return params;
	}

	protected process(stream: MetaGlyph[]): MetaGlyph[] | null {
		const workingSequence = stream.map((metaGlyph) => {
			if (this.targetGlyph!.symbol === metaGlyph.glyph.symbol) {
				const prim = new CounterPrim(this.count);
				prim.process();

				if (metaGlyph.data.prims) {
					metaGlyph.data.prims.push(prim);
				} else {
					metaGlyph.data.prims = [prim];
				}
			}

			return metaGlyph;
		});

		return workingSequence;
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

export default Accumulator;
