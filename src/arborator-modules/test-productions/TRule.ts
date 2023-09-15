import Production from "../../lib/lsys/core/production";
import { Glyph, Imperative, MetaGlyph, Prim, Rule } from "../../lib/lsys/lsys";
import ImperativePrim from "../../lib/lsys/prims/imperativePrim";
import ParameterPrim from "../../lib/lsys/prims/parameterPrim";


// K[K]B

class TRule extends Production {


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

		// const debugMark: Rule = { id: 0, type: 'Rule', symbol: 'x', prims: [] }
		// const debugInfo: Rule = { id: 0, type: 'Rule', symbol: 'i', prims: [] }

		// const debugGlyph = stream.find( (g) => g.symbol === 'R');

		// if ( debugGlyph && debugGlyph.type === 'Rule') {

		// 	debugInfo.prims = [ ...parsedParams ];

		// 	stream.push(...[ debugMark, debugInfo ]);
		// }
		
		
		const sequence: string[] = stream.map( (metaGlyph) => {

			return this.encodeGlyph(metaGlyph.glyph);
		});

		this.printSequence(sequence);
		
	}
}

export default TRule;

