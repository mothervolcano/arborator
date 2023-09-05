import Production from "../../lib/lsys/core/production";
import { Glyph, Rule } from "../../lib/lsys/lsys";





// [+B][-B]
// [+B]-


class YRule extends Production {

	private l: Glyph;
	private r: Glyph;
	private g: Glyph;
	private open: Glyph;
	private close: Glyph;

	private chart: any = {

		'+': null,
		'-': null,
		'[': null,
		']': null
	}

	constructor( glyph: Rule, base: Glyph[] ) {

		super( glyph, base );

		this.chart['+'] = base[1]

		this.l = base[1];
		this.r = base[4];
		this.g = base[2];
		this.open = base[0];
		this.close = base[3];

	}

	public process( params: Array<number> ) {



	}

}

export default YRule;