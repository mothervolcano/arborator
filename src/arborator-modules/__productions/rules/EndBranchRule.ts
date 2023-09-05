import ProductionRule from '../../../lib/lsys/core/productionRule'

const S = require('string');


class EndBranchRule extends ProductionRule {

	constructor( defaultValue?: number, iterations?: number ) {

		super( ']', defaultValue, iterations )

	}

	protected sequence() {

		let sequence = ''

		// sequence += `i(${this.predecessor.label})`
		sequence += `]`

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


export default EndBranchRule;