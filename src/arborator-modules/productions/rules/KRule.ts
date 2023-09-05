import ProductionRule from '../../../lib/lsys/core/productionRule'

import { genRandom, genRandomDec } from '../../../lib/lsys/tools/randomGenerators'

const S = require('string')

class KRule extends ProductionRule {


	constructor( defaultValue: number, iterations: number ) {

		super( 'K', defaultValue, iterations )

		this.direction = null

	}

	protected preProcess() {

	}

	protected postProcess( values: Array<any> ) {

		if ( values[2] !== undefined || values[2] !== '' ) {

			// this.direction = S( values[2] ).toInt() === 1 ? '+' : '-'
			this.direction = S( values[2] ).toInt()

		} else {

			this.direction = null
		}


		if ( values[3] !== undefined || values[3] !== '' ) {

			// this.id = S(`${values[3]}`).right(3);
		}

	}


	protected preSequence() {

		let sequence = '';

		return sequence
	}

	protected sequence() {

		// console.log(`B n: ${this.n}`)

		let sequence = '';

		sequence += `K(${this.n},${this.t},${this.direction})`;
		sequence += `f(${this.n},${this.t})`;

		// sequence += `i(${ this.n })`;

		
		return sequence

	}

	protected postSequence() {

		let sequence = ''

		// sequence += `K(${this.n},${this.t},${this.direction})`
		

		return sequence
	}

	protected nRule( value: any ) {

		return value
	}

	protected tRule( value: any ) {

		if ( this.sucessor.label === 'B' ) {

			return 0;

		} else {

			return 44;
		}
	}

}


export default KRule