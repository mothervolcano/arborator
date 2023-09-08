import Production from "../../lib/lsys/core/production";
import { Glyph, Imperative, Parameter, Prim, Rule } from "../../lib/lsys/lsys";
import ImperativePrim from "../../lib/lsys/prims/imperativePrim";
import ParameterPrim from "../../lib/lsys/prims/parameterPrim";


// K[K]B

class YRule extends Production {


	private antipodes: Array<Glyph> = [];

	constructor(glyph: Rule, dialect: Glyph[]) {

		super(glyph, dialect);

	}


	public compose( brackets: string, antipodes: string, rule: string, ) {

		this._rule = this.decode(`${brackets[0]}${rule}${brackets[1]}${brackets[0]}${rule}${brackets[1]}`);
		
		this.antipodes = this.decode(antipodes);
		
		return this;
	};


	public process(params?: string) {


		// --------------------------------------------------------
		// 1 Parse the parameters


		let parsedParams: Prim[] = []
		
		if (params) {
			
			console.log(`PROCESSING Y RULE... ${params}`)

			parsedParams = params.split(',').map((s, i) => { 

				return this.addPrim(s.charAt(0), false);

			});
		}

		// --------------------------------------------------------
		// 2  Create the rule sequence

		let prim: Imperative;
		let acc: Parameter;
		const antipodes = this.antipodes.slice();

		let sequence: Glyph[] = []

		// 1st Pass

		sequence = this._rule.map( (glyph) =>  {

			if (glyph.type === 'Marker' && glyph.symbol === '*' ) {

				const g = antipodes.shift();

				if ( g ) {

					return g;

				} else {

					throw new Error("Y RULE requires a pair of glyphs and a pair of '*' symbols. There must be a matching Glyph for each '*' symbol pair. Make sure both elements of each pair are present.");
				}
			}

			return glyph;
		});

		// 2nd pass

		sequence = sequence.map( (glyph, i) => {

			if ( glyph.type === 'Marker' && glyph.symbol === '!' ) { // if this marker is found it means the rule requires an imperative which will operate on the previous Glyph;

				prim = new ImperativePrim(sequence[i-1]);
			}

			if ( glyph.type === 'Marker' && glyph.symbol === '_' ) { // if this marker is found it means the rule requires an imperative which will operate on the previous Glyph;

				acc = new ParameterPrim(9);
			}

			if ( glyph.type === 'Rule' ) {

				if ( parsedParams.length ) {

					return { ...glyph, params: [ ...(acc != null ? [acc] : []), ...parsedParams, ...(prim != null ? [prim] : []) ] };

				} else {

					return { ...glyph, params: [ ...(acc != null ? [acc] : []), ...this.prims, ...(prim != null ? [prim] : []) ] };
				}
			}

			return glyph;

		});

		// const direction = this.dirPrim.value as Glyph;
 
		// if (direction) sequence.unshift(direction);
		
		this._output = this.encode(sequence);
	}
}

export default YRule;

