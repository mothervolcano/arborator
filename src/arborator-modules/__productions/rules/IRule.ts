import ProductionRule from '../../../lib/lsys/core/productionRule'

const S = require('string')

class IRule extends ProductionRule {

	constructor( defaultValue: number, iterations: number ) {

		super( 'I', defaultValue, iterations )

	}

	protected preSequence(): string {

		let sequence = ''

		// sequence += `i(${this.n})`;

		// sequence += `x(${this.t})`;

		// sequence += `I(${this.n},${this.t})`

		return sequence;
	}


	protected sequence() {

		let sequence = ''

		// if ( this.sucessor ) {

		// 	sequence += `i(${this.sucessor.label}:${this.sucessor.t})`
		// }

		// sequence += `f(${this.n},${this.t})`;


		sequence += `T(${this.n},${this.t},${0})`;


		// if ( this.predecessor.label === 'T' ) {

		// 	sequence += `${ this.predecessor.writeDirection(-1) }T(${ this.n },${ this.t },${ (this.predecessor.direction === 0 ? 1 : 0) })`;

		// 	sequence += `[ ${ this.predecessor.writeDirection(-1) }`;
		// 	sequence += `T(${ this.n },${ this.t },${ (this.predecessor.direction === 0 ? 1 : 0) }`
		// 	sequence += `]`

		// } else {

		// 	sequence += `T(${this.n},${this.t},${0})`;
		// }


		sequence += `Y(${this.n},${0},${0})`


		// sequence += `[+++`

		// sequence += `f(${this.n},${this.t})`;

		// sequence += `Y(${this.n},${this.t},${1})]`;
		
		// sequence += `[---`;

		// sequence += `f(${this.n},${this.t})`;

		// sequence += `Y(${this.n},${this.t},${0})]`;

		return sequence;
	}


	protected postSequence() {

		let sequence = '';

		sequence += `I(${this.n},${this.t})`;

		return sequence;
	}


	protected nRule( value: any ) {

		// this.count()
		
		return this.n + 1;
	}

	protected tRule( value: any ) {

		return value + 1;
	} 

}


export default IRule


