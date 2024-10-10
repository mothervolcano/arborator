import Production from "../lib/lsys/core/production";
import {
	Glyph,
	Imperative,
	MetaGlyph,
	Parameter,
	Prim,
	Rule,
} from "../lib/lsys/lsys";
import ImperativePrim from "../lib/lsys/prims/imperativePrim";
import ParameterPrim from "../lib/lsys/prims/parameterPrim";

// K[K]B

class YRule extends Production {
	constructor(glyph: Rule, dialect: Glyph[]) {
		super(glyph, dialect);
	}

	public compose(brackets: string, antipodes: string, rule: string) {
		this.cast(
			this.decode(
				`${brackets[0]}${rule}${brackets[1]}${brackets[0]}${rule}${brackets[1]}`,
			),
		);

		return this;
	}

	public process(params?: string) {
		// --------------------------------------------------------
		// 1  Start the stream

		let stream: MetaGlyph[] = this.sequence.slice();

		// ---------------------------------------------------------------------------
		// 3  Run the sprites (if any)

		if (this.sprites.length) {
			for (const sprite of this.sprites) {
				stream = sprite.run(stream, params);
			}
		}

		// const debugMark: Rule = { type: 'Rule', symbol: 'x', params: [] }
		// const debugInfo: Rule = { type: 'Rule', symbol: 'i', params: [] }

		// const debugGlyph = sequence.find( (g) => g.symbol === 'T');

		// if ( debugGlyph && debugGlyph.type === 'Rule' ) {

		// 	debugInfo.params = [ ...debugGlyph.params ];

		// 	sequence.push(...[ debugMark, debugInfo ]);
		// }

		const sequence: string[] = stream.map((metaGlyph) => {
			return this.encodeGlyph(metaGlyph.glyph);
		});

		this.printSequence(sequence);
	}
}

export default YRule;
