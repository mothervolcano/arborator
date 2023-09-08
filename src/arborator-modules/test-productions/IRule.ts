import Production from "../../lib/lsys/core/production";
import { Glyph, Prim, Rule } from "../../lib/lsys/lsys";
import ImperativePrim from "../../lib/lsys/prims/imperativePrim";
import ParameterPrim from "../../lib/lsys/prims/parameterPrim";


// K[K]B

class IRule extends Production {


	constructor(glyph: Rule, dialect: Glyph[]) {

		super(glyph, dialect);

	}


	public compose(rule: string) {

		this._rule = this.decode(rule);

		return this;
	}


	public process(params?: string) {


		// --------------------------------------------------------
		// 1 Parse the parameters


		let parsedParams: Prim[] = []
		
		if (params) {
			
			console.log(`PROCESSING I RULE... ${params}`)

			// parsedParams = params.split(',').map((s, i) => { 

			// 	if (this.prims[i].read(s)) {

			// 		this.prims[i].recast(s);

			// 		return this.prims[i];

			// 	} else {

			// 		throw new Error(`Production is unable to process ${s} parameter`)
			// 	}

			// })	
		}

		// --------------------------------------------------------
		// 2  Create the rule sequence

		
		const sequence = this._rule.slice();

		for (const glyph of this._rule) {

			if (glyph.type === 'Rule' && glyph.symbol === this.glyph.symbol) {

				if ( parsedParams.length ) {

					glyph.params = [...parsedParams];

				} else {

					glyph.params = [...this.prims];
				}
			}
		}

		// const direction = this.dirPrim.value as Glyph;

		// if (direction) sequence.unshift(direction);
		
		this._output = this.encode(sequence);
	}
}

export default IRule;

