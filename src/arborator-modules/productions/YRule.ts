import Production from "../../lib/lsys/core/production";
import { Glyph, ImperativeType, ParameterType, Prim, Rule } from "../../lib/lsys/lsys";
import Imperative from "../../lib/lsys/prims/imperative";
import Parameter from "../../lib/lsys/prims/parameter";


// [+B][-B]

class YRule extends Production {

	private prims: Prim[] = [];
	private countPrim: ParameterType;
	private accPrim: ParameterType;
	private dirPrim: ImperativeType;

	constructor( glyph: Rule, dialect: Glyph[] ) {

		super( glyph, dialect );

		this.countPrim = this.addPrim<ParameterType>(new Parameter(1));
		this.accPrim = this.addPrim<ParameterType>(new Parameter(3));
		this.dirPrim = this.addPrim<ImperativeType>( new Imperative() );
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

