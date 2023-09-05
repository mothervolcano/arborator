const S = require('string')

class Production {

	public label: string
	public n: number
	public t: number;
	public direction: number | null;
	public _predecessor: string
	public _sucessor: any;
	public iteration: number
	public iterations: number | undefined;
	protected _sequence: string
	public counter: number
	private _probability: number

	
	constructor( label: string, iterations?: number | undefined ) {

		this.label = label || ''
		this._predecessor = ''
		this._sucessor = ''
		this.iterations = iterations 
		this.iteration = 0
		this._sequence = ''
		this.counter = 0
		this._probability = 1
		this.direction = null;
		this.n = 0
		this.t = 0
	}


	set sucessor( value: any ) {

		this._sucessor = value
	}


	get sucessor(): any {

		return this._sucessor
	}


	set predecessor( value: any ) {

		this._predecessor = value
	}

	get predecessor(): any {

		return this._predecessor
	}


	set probability( value: number ) {

		this._probability = value
	}


	get probability(): number {

		return this._probability
	}


	protected nRule( value: string ): any {};

	protected tRule( value: string ): any {};

	protected postProcess( values: string[] ): void {};

	protected preProcess( values: string[] ): void {};

	protected preSequence(): void {};

	protected sequence(): void {};

	protected postSequence(): void {};

	protected generateSequence() {

		this._sequence = `${this.preSequence()}${this.sequence()}${this.postSequence()}`

		return this._sequence;
	}

	protected writeDirection(repeatCount?: number): string {

		const validRepeatCount = Number.isInteger(repeatCount) && repeatCount !== 0 ? repeatCount : 1;

		const direction = this.direction === 1 ? '+' : '-';
		const reversedDirection = this.direction === 1 ? '-' : '+';

		if (validRepeatCount !== undefined && validRepeatCount > 0) {

	    	return S(direction).repeat(validRepeatCount).toString();

		} else if (validRepeatCount !== undefined && validRepeatCount < 0) {

	    	return S(reversedDirection).repeat(-validRepeatCount).toString();

		} else {

	    	return '';
		}
	}

	protected encodeDirection(): string {

		if ( this.direction !== null && Number.isInteger(this.direction) ) {

			return `${this.direction}`

		} else {

			return ''
		}
	}


	public process( values: string[], iteration: number ): void {};


	public seed( nValue: number, tValue: number ): void {

		this.n = nValue || this.n;
		this.t = tValue || this.t;

	}


	public count(): void {

		this.counter++
	}


	public wrap( input: string ) {

		this._sequence = input.charAt(0) + this._sequence + ( input.charAt(1) ? input.charAt(1) : input.charAt(0) )

		return this
	}

	public prepend( input: string ) {

		this._sequence = input + this._sequence

		return this
	}

	public append( input: string ) {

		this._sequence += input

		return this
	}

	public scramble(): void {

		// TODO

	}

	public output(): string {

		return this.generateSequence()
	}
}


export default Production


