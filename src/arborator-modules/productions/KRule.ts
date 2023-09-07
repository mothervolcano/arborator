import Production from "../../lib/lsys/core/production";
import { Glyph, Rule } from "../../lib/lsys/lsys";




class KRule extends Production {


	constructor( glyph: Rule, dialect: Glyph[] ) {

		super( glyph, dialect );

	}

	public compose( rule: string ) {

		this._rule = this.decode( rule );

		return this;
	}

	public process( params?: string ) {

		// console.log(`PROCESSING K RULE... ${params}`)

		if ( params ) {

			const _params = params.split(',').map( (p) => Number.parseFloat(p) );

		} else {

			this._output = this.encode( this._rule );
		}
	}
}

export default KRule;