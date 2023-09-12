import Production from "../../lib/lsys/core/production";
import { Glyph, Prim, Rule } from "../../lib/lsys/lsys";





class GRule extends Production {


	constructor( glyph: Rule ) {

		super( glyph );
	}


	public compose( rule: string ) {

		this._rule = this.decode( rule );

		return this;

	}

	public process() {


		this._output = this.encode( this._rule );
	}

}

export default GRule;