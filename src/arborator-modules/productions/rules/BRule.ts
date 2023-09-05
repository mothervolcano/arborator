import ProductionRule from '../../../lib/lsys/core/productionRule'
import { genRandom, genRandomDec } from '../../../lib/lsys/tools/randomGenerators'

const S = require('string')

class BRule extends ProductionRule {


	private orientation: number;

	constructor( label: string = 'B', defaultValue: number, iterations: number ) {

		super( label, defaultValue, iterations )

		this.orientation = 0;

		this.iterations = iterations;
	}

	protected preProcess() {

	}

	protected postProcess( values: Array<any> ) {

		if ( values[2] !== undefined || values[2] !== '' ) {

			this.direction = S( values[2] ).toInt() === 0 ? 1 : 0;

		} else {

			this.direction = null
		}


		if ( values[3] !== undefined || values[3] !== '' ) {

			// this.direction = S( values[3] ).toInt() === 0 ? 1 : 0;

			this.orientation = S( values[3] ).toInt() === 0 ? -1 : 1;
		}

	}


	protected preSequence() {

		let sequence = ''

		// sequence += `${this.label}(${this.n},${this.t},${this.direction})`;

		sequence +=  `i(${this.n})`;

		return sequence
	}

	protected sequence() {

		// console.log(`B n: ${this.n}`)

		let sequence = '';


		if ( this.n === 3 ) {

		}


		if ( this.t === 3 ) {

			sequence += `${ this.writeDirection(-1) }`;	
		}

		if ( this.t === 4 ) {

			sequence += `${ this.writeDirection(-1) }`;	
		}

		sequence += `K(${this.n},${this.t},${this.direction})`;

		
		sequence += `[`

		if ( this.n >= 1 ) {

			sequence += `${ this.writeDirection(this.orientation*2) }`;
		}

		sequence += `K(${ this.n },${ this.t },${ this.direction })`
		// sequence += `x(${this.t})`;
		sequence += `]`


		// sequence +=  `i(${this.n})`;

		
		return sequence

	}

	protected postSequence() {

		let sequence = '';

		sequence += `${this.label}(${this.n},${this.t},${this.direction})`;

		return sequence
	}

	protected nRule( value: any ) {

		return value + 1;
		// return this.n + 1;
	}

	protected tRule( value: any ) {

		// if ( this.sucessor.label === 'Y' ) {

		// 	return 0;

		// } else {

		// 	return 4
		// }

		return this.t + 1;
	}

}


export default BRule


