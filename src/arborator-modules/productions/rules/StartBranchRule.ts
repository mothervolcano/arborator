import ProductionRule from '../../../lib/lsys/core/productionRule'

const S = require('string')

class StartBranchRule extends ProductionRule {

	constructor( defaultValue?: number, iterations?: number ) {

		super( '[', defaultValue, iterations )

	}

	protected preProcess() {

	}

	protected sequence() {

		let sequence = ''

		// sequence += `i(${this.n})`
		sequence += `[`

		return sequence;
	}

	protected postSequence() {

		let sequence = '';

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


export default StartBranchRule