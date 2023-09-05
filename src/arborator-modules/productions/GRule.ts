import Production from "../../lib/lsys/core/production";
import { Glyph, Rule } from "../../lib/lsys/lsys";





class GRule extends Production {

	constructor( glyph: Rule ) {

		super( glyph, [ glyph ] );
	}

	public process() {


	}

}

export default GRule;