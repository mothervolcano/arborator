import Production from "../../lib/lsys/core/production";
import { Glyph, Imperative, Prim, Rule } from "../../lib/lsys/lsys";
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

		this._rule = this.decode(rule);

		return this;
	}


	public process(params?: string) {


		// --------------------------------------------------------
		// 1 Parse the parameters


		let parsedParams: Prim[] = []
		
		if (params) {
			
			console.log(`PROCESSING ${this.head.symbol} RULE... ${params}`)

			parsedParams = params.split(',').map((s) => { 

				return this.addPrim(s.charAt(0), 'T', false).recast(s);

			});	
		}

		// --------------------------------------------------------
		// 2  Create the rule sequence


		let sequence: Glyph[] = [];

		sequence = this._rule.map( (glyph) =>  {

			if (glyph.type === 'Marker' && glyph.symbol === '*' ) {

				const prim = parsedParams.find( (p) => p.type === 'Imperative' )

				if ( prim && prim.type === 'Imperative' ) {

					return prim.getValue();

				} else {

					throw new Error("R Rule requires an imperative as parameter");
				}
			}

			return glyph;
		});

		
		sequence = sequence.map( (glyph) => { 

			if (glyph.type === 'Rule' && glyph.symbol === 'R') {

				if ( parsedParams.length ) {

					if (parsedParams[0].type === 'Parameter') {

						parsedParams[0].setValue(1);		
					} 

					return { ...glyph, prims: [...parsedParams] };

				} else {

					return { ...glyph, prims: [] };
				}
			}

			return glyph;
		});

		// ---------------------------------------
		// DEBUG

		const debugMark: Rule = { id: 0, type: 'Rule', symbol: 'x', prims: [] }
		const debugInfo: Rule = { id: 0, type: 'Rule', symbol: 'i', prims: [] }

		const debugGlyph = sequence.find( (g) => g.symbol === 'R');

		if ( debugGlyph && debugGlyph.type === 'Rule') {

			debugInfo.prims = [ ...parsedParams ];

			sequence.push(...[ debugMark, debugInfo ]);
		}
		
		
		this._output = this.encode(sequence);
	}
}

export default TRule;
