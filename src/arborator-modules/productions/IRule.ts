import Production from "../../lib/lsys/core/production";
import { Glyph, Rule } from "../../lib/lsys/lsys";





class IRule extends Production {


	constructor( glyph: Rule, rule: Glyph[] ) {

		super( glyph, rule );
	}

	process() {


	}
}

export default IRule;