import Production from "../../lib/lsys/core/production";
import { Glyph, Imperative, Parameter, Prim, Rule } from "../../lib/lsys/lsys";
import ImperativePrim from "../../lib/lsys/prims/imperativePrim";
import ParameterPrim from "../../lib/lsys/prims/parameterPrim";


// [+B][-B]

class YRule extends Production {

	private prims: Prim[] = [];
	private countPrim: Parameter;
	private accPrim: Parameter;
	private dirPrim: Imperative;

	constructor( glyph: Rule, dialect: Glyph[] ) {

		super( glyph, dialect );

		this.countPrim = this.addPrim<Parameter>(new ParameterPrim(1));
		this.accPrim = this.addPrim<Parameter>(new ParameterPrim(3));
		this.dirPrim = this.addPrim<Imperative>( new ImperativePrim() );
	}


	private addPrim<T>(prim: Prim ) {

		this.prims.push(prim);

		return prim as T;
	}


	public compose( rule: string ) {

		this._rule = this.decode( rule );

		return this;
	}

	public process( params?: string ) {

		console.log(`PROCESSING Y RULE... ${params}`)


		// --------------------------------------------------------
		// 1 Parse the parameters


		let parsedParams: Prim[] = []

		if ( params ) {

			// const _params = params.split(',').map( (p) => Number.parseFloat(p) );

		}

		// --------------------------------------------------------
		// 2  Create the rule sequence

		
		let sequence: Glyph[] = [];

		let symbolToggle: string = '+';

		for ( const g of this._rule ) {

			if ( g.type === 'Marker' && g.symbol === '*' ) {

				const substitute = this.dialect.find( (g) => g.symbol === symbolToggle );

				if ( substitute ) sequence.push( substitute );

			} else if ( g.type === 'Rule' ) {

				const substitute = this.dialect.find( (g) => g.symbol === symbolToggle );
				if ( substitute ) this.dirPrim.set( substitute );
				// else this.dirPrim.set();

				g.params = [ this.countPrim, this.accPrim, this.dirPrim.clone() ];
				
				symbolToggle = symbolToggle === '+' ? '-' : '+'; 
				
				sequence.push( {...g} );

			} else {

				sequence.push( g );
			}
		}
		
		this._output = this.encode( sequence );
	}
}

export default YRule;

