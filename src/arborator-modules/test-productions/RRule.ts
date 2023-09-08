import Production from "../../lib/lsys/core/production";
import { Glyph, Imperative, Prim, Rule } from "../../lib/lsys/lsys";
import ImperativePrim from "../../lib/lsys/prims/imperativePrim";
import ParameterPrim from "../../lib/lsys/prims/parameterPrim";


// K[K]B

class RRule extends Production {


	constructor(glyph: Rule, dialect: Glyph[]) {

		super(glyph, dialect);

		// this.addPrim(new ParameterPrim(1));
		// this.addPrim(new ParameterPrim(1));
		// this.addPrim(new ImperativePrim( dialect[2] ));
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
			
			console.log(`PROCESSING R RULE... ${params}`)

			parsedParams = params.split(',').map((s) => { 

				return this.addPrim(s.charAt(0), false).recast(s);

			});	
		}

		// --------------------------------------------------------
		// 2  Create the rule sequence


		let sequence: Glyph[] = [];

		sequence = this._rule.map( (glyph) =>  {

			if (glyph.type === 'Marker' && glyph.symbol === '*' ) {

				const prim = parsedParams.find( (p) => p.type === 'Imperative' )

				if ( prim && prim.type === 'Imperative' ) {

					return prim.value;

				} else {

					throw new Error("R Rule requires an imperative as parameter");
				}
			}

			return glyph;
		});

		
		sequence = sequence.map( (glyph) => { 

			if (glyph.type === 'Rule' && glyph.symbol === this.glyph.symbol) {

				if ( parsedParams.length ) {

					return { ...glyph, params: [...parsedParams] };

				} else {

					return { ...glyph, params: [] };
				}
			}

			return glyph;
		});


		// const direction = this.dirPrim.value as Glyph;

		// if (direction) sequence.unshift(direction);
		
		this._output = this.encode(sequence);
	}
}

export default RRule;

