import ProductionRule from '../../../lib/lsys/core/productionRule'

const S = require('string')

class GRule extends ProductionRule {

	constructor( defaultValue: number, iterations: number ) {

		super( 'G', defaultValue, iterations )

	}

	protected sequence() {

		let sequence = ''

		// sequence += `i(${this.t})`
		sequence += `G(${this.n},${this.t})`

		return sequence;
	}

	protected postSequence() {

		let sequence = '';

		// sequence += `f(${this.n},${this.t})`;

		return sequence;
	}

	protected nRule( value: any ) {

		// this.count()
		
		return value + 1
	}

	protected tRule( value: any ) {

		return value + 1;
	} 

}


export default GRule