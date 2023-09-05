import ProductionRule from '../../../lib/lsys/core/productionRule'

const S = require('string')

class TRule extends ProductionRule {

	constructor( defaultValue: number, iterations: number ) {

		super( 'T', defaultValue, iterations )

	}

	protected postProcess( values: any ) {

		if ( values[2] !== undefined || values[2] !== '' ) {

			this.direction = S( values[2] ).toInt()

		} else {

			this.direction = null
		}
	}

	protected sequence() {

		let sequence = ''

		sequence += `T(${this.n},${this.t},${this.direction})f(${this.n},${this.t})`;
		// sequence += `i(${this.t})`


		return sequence;
	}

	protected postSequence() {

		let sequence = '';

		// sequence += `f(${this.n},${this.t})`;

		if ( this.t === 0 ) {

			// sequence += `x(${this.t})`
		}

		return sequence;
	}

	protected nRule( value: any ) {

		// this.count()
		
		return value;
	}

	protected tRule( value: any ) {

		if ( this.sucessor.label === 'T' ) {

			if ( this.n === this.sucessor.n ) {

				return value + 1;

			} else {

				return 0;
			}

		} else {

			return 0;
		}

	} 

}

export default TRule

