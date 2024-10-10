import Production from "../lib/lsys/core/production";
import { Glyph, Imperative, MetaGlyph, Prim, Rule } from "../lib/lsys/lsys";
import ImperativePrim from "../lib/lsys/prims/imperativePrim";
import ParameterPrim from "../lib/lsys/prims/parameterPrim";

// K[K]B

class RRule extends Production {
	constructor(glyph: Rule, dialect: Glyph[]) {
		super(glyph, dialect);

		// this.addPrim(new ParameterPrim(1));
		// this.addPrim(new ParameterPrim(1));
		// this.addPrim(new ImperativePrim( dialect[2] ));
	}

	public compose(rule: string) {
		this.cast(this.decode(rule));

		return this;
	}

	public process(params?: string) {
		const stream = this.sequence.slice();

		// ---------------------------------------
		// DEBUG

		// const debugMark: Rule = { type: 'Rule', symbol: 'x', params: [] }
		// const debugInfo: Rule = { type: 'Rule', symbol: 'i', params: [] }

		// const debugGlyph = sequence.find( (g) => g.symbol === 'R');

		// if ( debugGlyph && debugGlyph.type === 'Rule') {

		// 	debugInfo.params = [ ...parsedParams ];

		// 	sequence.push(...[ debugMark, debugInfo ]);
		// }

		const sequence: string[] = stream.map((metaGlyph) => {
			return this.encodeGlyph(metaGlyph.glyph);
		});

		this.printSequence(sequence);
	}
}

export default RRule;
