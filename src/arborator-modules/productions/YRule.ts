import Production from "../../lib/lsys/core/production";
import { Glyph, Prim, Rule } from "../../lib/lsys/lsys";
import Imperative from "../../lib/lsys/prims/imperative";
import Parameter from "../../lib/lsys/prims/parameter";


// [+B][-B]

class YRule extends Production {

	private prims: Prim[] = [];
	private countPrim: Prim;
	private accPrim: Prim;
	private dirPrim: Prim;

	constructor( glyph: Rule, dialect: Glyph[] ) {

		super( glyph, dialect );

		this.countPrim = this.addPrim(new Parameter(1));
		this.accPrim = this.addPrim(new Parameter(3));
		this.dirPrim = this.addPrim( new Imperative() );
	}


	private addPrim(prim: any & Prim) {

		this.prims.push(prim);

		return prim;
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
				if ( substitute ) this.dirPrim.set( this.dialect.find( (g) => g.symbol === symbolToggle ) );
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

