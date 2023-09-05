import ProductionRule from '../../../lib/lsys/core/productionRule';

const S = require('string')

class YRule extends ProductionRule {

	constructor( defaultValue: number, iterations: number ) {

		super( 'Y', defaultValue, iterations );



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
		
		// sequence += `i(${this.n})`;


		// if ( this.t > 3 ) {

		// 	sequence += `>>>>>>>>`
		// }

		for ( let i=0; i<this.n; i++ ) {

			sequence += `>`
		}


		// Create 2nd order axis branches up to this apex

		if ( this.t <= 9 ) {

			sequence += `[+++`;

			// for ( let i=0; i< Math.min(this.t, 4); i++ ) {

			// 	sequence += `f(${this.n},${0},${1})`;
			// }

			let orientation;
			let direction;

			if ( this.t > 1 ) {

				orientation = 1;
				direction = 0;

			} else {

				orientation = 0;
				direction = 1;
			}

			sequence += `B${this.t}(${this.n},${0},${1},${orientation})`;


			sequence += `]`

			// -----------------------------------------------------------

			sequence += `[---`;

			// for ( let i=0; i< Math.min(this.t, 4); i++ ) {

			// 	sequence += `f(${this.n},${0},${1})`;
			// }


			sequence += `B${this.t+1}(${this.n},${0},${0},${orientation})`;


			sequence += `]`

		// Create branches from this point upwards

		} else {


		}

		

		// sequence += `f(${this.n},${this.t})`
		// sequence += `f(${this.n},${this.t})`

		return sequence;
	}

	protected postSequence() {

		let sequence = '';

		// sequence += `Y(${this.n},${this.t},${this.encodeDirection()})`;

		return sequence;
	}

	protected nRule( value: any ) {

		// Inherited from I	
		return value;
	}

	protected tRule( value: any ) {

		// Dependent on the number of branches created on each iteration. Fixed for now at 2.
		return this.t+2;

	} 
}


export default YRule