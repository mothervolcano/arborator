import Production from "../../lib/lsys/core/production";
import { Glyph, Prim, Rule } from "../../lib/lsys/lsys";
import Imperative from "../../lib/lsys/prims/imperative";
import Parameter from "../../lib/lsys/prims/parameter";


// K[K]B

class BRule extends Production {


	private prims: Array<Prim> = [];

	private dirPrim: Prim;

	constructor(glyph: Rule, dialect: Glyph[]) {

		super(glyph, dialect);

		this.addPrim(new Parameter());
		this.addPrim(new Parameter());
		this.dirPrim = this.addPrim(new Imperative( dialect[2] ));
	}


	private addPrim(prim: any & Prim) {

		this.prims.push(prim);

		return prim;
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
			
			console.log(`PROCESSING B RULE... ${params}`)

			parsedParams = params.split(',').map((s, i) => { 

				if (this.prims[i].read(s)) {

					this.prims[i].recast(s);

					return this.prims[i];

				} else {

					throw new Error(`Production is unable to process ${s} parameter`)
				}

			})	
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

		const direction = this.dirPrim.value as Glyph;

		if (direction) sequence.unshift(direction);
		
		this._output = this.encode(sequence);
	}
}

export default BRule;